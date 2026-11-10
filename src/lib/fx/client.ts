import type { FxApiErrorShape, LiveRateSnapshot, RateSource } from './types';

/**
 * Live exchange rates from a real third-party REST API.
 *
 * Provider order:
 *   1. open.er-api.com  — no key, ~160 currencies, daily ECB-derived update
 *   2. api.frankfurter.dev — ECB reference rates directly, ~30 currencies
 *
 * Both are fetched in the browser with CORS enabled. If both fail (offline,
 * ad-blocker, provider outage) the caller falls back to the bundled snapshot
 * in `src/lib/rates.ts` and the UI labels it as offline.
 */

const PRIMARY_URL = 'https://open.er-api.com/v6/latest/USD';
const FALLBACK_URL = 'https://api.frankfurter.dev/v1/latest?base=USD';

const REQUEST_TIMEOUT_MS = 9000;
const CACHE_KEY = 'vx:rates:v1';
const CACHE_TTL_MS = 15 * 60 * 1000;

export class FxApiError extends Error implements FxApiErrorShape {
  detail?: string;
  retryable: boolean;

  constructor(message: string, detail?: string, retryable = true) {
    super(message);
    this.name = 'FxApiError';
    this.detail = detail;
    this.retryable = retryable;
  }
}

export function toErrorShape(error: unknown): FxApiErrorShape {
  if (error instanceof FxApiError) {
    return { message: error.message, detail: error.detail, retryable: error.retryable };
  }
  if (error instanceof DOMException && error.name === 'AbortError') {
    return {
      message: 'The exchange-rate service took too long to respond.',
      detail: 'Request aborted after timeout.',
      retryable: true,
    };
  }
  return {
    message: 'Something went wrong while loading exchange rates.',
    detail: error instanceof Error ? error.message : String(error),
    retryable: true,
  };
}

/** `fetch` with a hard timeout, so a hung request can't leave the UI spinning. */
async function fetchJson(url: string, signal?: AbortSignal): Promise<unknown> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const onAbort = () => controller.abort();
  signal?.addEventListener('abort', onAbort);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new FxApiError(
        `The exchange-rate service returned an error (HTTP ${response.status}).`,
        `${url} responded with status ${response.status}`
      );
    }

    return await response.json();
  } finally {
    window.clearTimeout(timer);
    signal?.removeEventListener('abort', onAbort);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/** Validates provider payloads instead of trusting the shape blindly. */
function parseRates(payload: unknown, source: RateSource): LiveRateSnapshot {
  if (!isRecord(payload)) {
    throw new FxApiError('The exchange-rate service sent an unexpected response.', 'Payload was not an object.');
  }

  const rawRates = payload.rates;
  if (!isRecord(rawRates)) {
    throw new FxApiError('The exchange-rate service sent malformed rate data.', 'Missing `rates` object.');
  }

  const rates: Record<string, number> = {};
  for (const [code, value] of Object.entries(rawRates)) {
    if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
      rates[code.toUpperCase()] = value;
    }
  }

  const base = String(payload.base_code ?? payload.base ?? 'USD').toUpperCase();
  rates[base] = 1;

  if (Object.keys(rates).length < 5) {
    throw new FxApiError('The exchange-rate service sent incomplete data.', 'Fewer than 5 usable rates.');
  }

  const date = formatDisplayDate(
    typeof payload.time_last_update_utc === 'string'
      ? payload.time_last_update_utc
      : typeof payload.date === 'string'
        ? payload.date
        : new Date().toISOString()
  );

  return { base, rates, date, source, fetchedAt: Date.now() };
}

/** Turns the provider's RFC-1123 date into something readable: "4 Nov 2026". */
export function formatDisplayDate(input: string): string {
  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) return input;
  return parsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function readCache(): LiveRateSnapshot | null {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LiveRateSnapshot;
    if (!parsed?.rates || typeof parsed.fetchedAt !== 'number') return null;
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
    return { ...parsed, source: 'cache' };
  } catch {
    return null;
  }
}

function writeCache(snapshot: LiveRateSnapshot) {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(snapshot));
  } catch {
    /* storage full or blocked — caching is optional */
  }
}

/**
 * Fetches a fresh snapshot. Tries the primary provider, then the fallback,
 * then a cached copy. Throws `FxApiError` only if all three are unavailable.
 */
export async function fetchLiveRates(signal?: AbortSignal): Promise<LiveRateSnapshot> {
  const failures: string[] = [];

  try {
    const payload = await fetchJson(PRIMARY_URL, signal);
    const snapshot = parseRates(payload, 'er-api');
    writeCache(snapshot);
    return snapshot;
  } catch (error) {
    if (signal?.aborted) throw error;
    failures.push(`er-api: ${error instanceof Error ? error.message : String(error)}`);
  }

  try {
    const payload = await fetchJson(FALLBACK_URL, signal);
    const snapshot = parseRates(payload, 'frankfurter');
    writeCache(snapshot);
    return snapshot;
  } catch (error) {
    if (signal?.aborted) throw error;
    failures.push(`frankfurter: ${error instanceof Error ? error.message : String(error)}`);
  }

  const cached = readCache();
  if (cached) return cached;

  throw new FxApiError(
    'Exchange rates are unavailable right now.',
    failures.join(' | ')
  );
}

export const PROVIDER_LABELS: Record<RateSource, string> = {
  'er-api': 'open.er-api.com',
  frankfurter: 'European Central Bank (Frankfurter)',
  cache: 'saved copy from this browser',
};
