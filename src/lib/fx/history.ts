import { FxApiError } from './client';

/**
 * Historical rates from the Frankfurter API (ECB reference rates).
 *
 *   GET /v1/2024-01-01..2024-06-01?base=USD&symbols=EUR
 *   -> { base, start_date, end_date, rates: { "2024-01-02": { EUR: 0.91 }, ... } }
 *
 * ECB publishes on business days only, so weekends and holidays are absent
 * from the response — the chart simply skips them.
 */

const TIMEOUT_MS = 12000;
const CACHE_PREFIX = 'vx:history:';

export interface HistoryPoint {
  date: string;
  rate: number;
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

const SNAPSHOT_KEY = 'vx:frankfurter-daily';
const SNAPSHOT_TTL_MS = 6 * 60 * 60 * 1000;

export interface ReferenceDay {
  /** The provider's own publication date, ISO-8601, e.g. "2026-11-10". */
  date: string;
  /** Every quoted rate for that day, expressed against USD. */
  rates: Record<string, number>;
}

export interface ReferenceDays {
  /** Newest publication the provider has. */
  latest: ReferenceDay;
  /** The publication before it. Null when the provider returned only one. */
  previous: ReferenceDay | null;
  savedAt: number;
}

/**
 * The two most recent published reference days, used as the "yesterday" side
 * of the 24h change.
 *
 * The app previously compared the live snapshot against the previous *page
 * load*, so a first visit reported +0.00% for every single pair — which is
 * exactly what a self-comparison must produce. A real figure needs a genuinely
 * earlier publication, so this asks the provider for a short window and keeps
 * the newest two business days.
 *
 * Both days are returned because the caller has to decide which one is
 * "previous": if the live feed is already on `latest`, the earlier one is the
 * baseline; if the live feed is a day behind, `latest` is.
 */
export async function fetchReferenceDays(signal?: AbortSignal): Promise<ReferenceDays | null> {
  try {
    const cached = window.sessionStorage.getItem(SNAPSHOT_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as ReferenceDays;
      if (Date.now() - parsed.savedAt < SNAPSHOT_TTL_MS && parsed.latest?.rates) return parsed;
    }
  } catch {
    /* sessionStorage can be blocked; fall through to the network */
  }

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
  const onAbort = () => controller.abort();
  signal?.addEventListener('abort', onAbort);

  try {
    // A window rather than /latest, because /latest returns a single day and a
    // single day cannot be compared with anything.
    const end = new Date();
    const start = new Date(end);
    start.setUTCDate(start.getUTCDate() - 12);
    const url = `https://api.frankfurter.dev/v1/${isoDate(start)}..${isoDate(end)}?base=USD`;

    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return null;

    const payload = (await response.json()) as { rates?: Record<string, Record<string, number>> };
    const all = payload?.rates ?? {};
    const days = Object.keys(all).sort();
    if (days.length < 1) return null;

    const toDay = (date: string): ReferenceDay => ({
      date,
      rates: all[date] as Record<string, number>,
    });

    const result: ReferenceDays = {
      latest: toDay(days[days.length - 1]),
      previous: days.length > 1 ? toDay(days[days.length - 2]) : null,
      savedAt: Date.now(),
    };

    try {
      window.sessionStorage.setItem(SNAPSHOT_KEY, JSON.stringify(result));
    } catch {
      /* caching is best-effort */
    }

    return result;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
    signal?.removeEventListener('abort', onAbort);
  }
}

export async function fetchHistory(
  from: string,
  to: string,
  days: number,
  signal?: AbortSignal
): Promise<HistoryPoint[]> {
  const end = new Date();
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days);

  const base = from.toUpperCase();
  const symbol = to.toUpperCase();
  const key = `${CACHE_PREFIX}${base}:${symbol}:${days}`;

  try {
    const cached = window.sessionStorage.getItem(key);
    if (cached) {
      const parsed = JSON.parse(cached) as { savedAt: number; points: HistoryPoint[] };
      if (Date.now() - parsed.savedAt < 30 * 60 * 1000 && Array.isArray(parsed.points)) {
        return parsed.points;
      }
    }
  } catch {
    /* sessionStorage can be blocked; history then just refetches */
  }

  const url = `https://api.frankfurter.dev/v1/${isoDate(start)}..${isoDate(end)}?base=${base}&symbols=${symbol}`;

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
  const onAbort = () => controller.abort();
  signal?.addEventListener('abort', onAbort);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    // Frankfurter answers 404 for pairs it does not track (e.g. crypto).
    if (response.status === 404) {
      throw new FxApiError(
        `The European Central Bank does not publish a history for ${base}/${symbol}.`,
        `${url} -> 404`,
        false
      );
    }

    if (!response.ok) {
      throw new FxApiError(
        `Historical rates could not be loaded (HTTP ${response.status}).`,
        `${url} -> ${response.status}`
      );
    }

    const payload = (await response.json()) as { rates?: Record<string, Record<string, number>> };
    const raw = payload?.rates;
    if (!raw || typeof raw !== 'object') {
      throw new FxApiError('The historical rate data was malformed.', 'Missing `rates` object.');
    }

    const points: HistoryPoint[] = Object.entries(raw)
      .map(([date, perCurrency]) => ({ date, rate: perCurrency?.[symbol] }))
      .filter((p): p is HistoryPoint => typeof p.rate === 'number' && Number.isFinite(p.rate) && p.rate > 0)
      .sort((a, b) => a.date.localeCompare(b.date));

    if (points.length === 0) {
      throw new FxApiError(
        `No historical data is available for ${base}/${symbol}.`,
        'Provider returned an empty series.',
        false
      );
    }

    try {
      window.sessionStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), points }));
    } catch {
      /* caching is best-effort */
    }

    return points;
  } finally {
    window.clearTimeout(timer);
    signal?.removeEventListener('abort', onAbort);
    if (!signal?.aborted) {
      /* no-op: timer cleanup only */
    }
  }
}
