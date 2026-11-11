import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { fetchLiveRates, formatDisplayDate, PROVIDER_LABELS, toErrorShape } from './client';
import { fetchReferenceDays } from './history';
import type { FxApiErrorShape, LiveRateSnapshot, RateStatus } from './types';
import {
  FALLBACK_RATES,
  SNAPSHOT_DATE,
  formatRate,
  get24hChange,
  get24hHigh,
  get24hLow,
  getRate,
  type RateMap,
} from '@/lib/rates';

/**
 * Single owner of exchange-rate state for the whole app.
 *
 * Screens read rates through `useLiveRates()` instead of importing the table
 * directly, which keeps one request (and one source of truth) per session.
 */

interface RateContextValue {
  status: RateStatus;
  /** Live map when ready, the bundled snapshot when offline. */
  rates: RateMap;
  /** Previous snapshot, used for day-over-day movement. */
  previousRates: RateMap | null;
  /** Provider publication date of `previousRates`, e.g. "10 Nov 2026". */
  previousDate: string | null;
  /** Provider label for the UI, e.g. "open.er-api.com". */
  sourceLabel: string;
  /** ISO timestamp/date string reported by the provider. */
  updatedAt: string;
  /** True when the numbers came from the bundled fallback, not the API. */
  isOffline: boolean;
  error: FxApiErrorShape | null;
  base: string;
  refresh: () => void;
  // Rate helpers bound to the current data, so call sites stay terse.
  rate: (from: string, to: string) => number;
  change: (from: string, to: string) => number;
  high: (from: string, to: string) => number;
  low: (from: string, to: string) => number;
  format: (value: number) => string;
}

const RateContext = createContext<RateContextValue | null>(null);

function snapshotKey(snapshot: LiveRateSnapshot): string {
  return `${snapshot.date}:${snapshot.fetchedAt}`;
}

export function RateProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<RateStatus>('loading');
  const [snapshot, setSnapshot] = useState<LiveRateSnapshot | null>(null);
  const [previousRates, setPreviousRates] = useState<RateMap | null>(null);
  const [error, setError] = useState<FxApiErrorShape | null>(null);
  const [previousDate, setPreviousDate] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const lastKey = useRef<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    setStatus('loading');
    setError(null);

    (async () => {
      // A real day-over-day figure needs a genuinely earlier publication, not
      // the previous page load. Fetched independently so a failure here only
      // costs the change column, never the live rates.
      try {
        const fresh = await fetchLiveRates(controller.signal);
        if (!active) return;

        // Keep the prior snapshot so we can show real day-over-day movement.
        setSnapshot((old) => {
          if (old && snapshotKey(old) !== snapshotKey(fresh)) {
            lastKey.current = snapshotKey(old);
            // Only fall back to the previous page load when the provider gave
            // us no published reference day to compare against.
            setPreviousRates((existing) => existing ?? old.rates);
          }
          return fresh;
        });
        setStatus('ready');

        // Baseline for the 24h change: the published day immediately before
        // the one the live feed is quoting. Comparing a snapshot with itself is
        // what produced an identical +0.00% on every row.
        const reference = await fetchReferenceDays(controller.signal).catch(() => null);
        if (!active || !reference) return;

        const liveDate = fresh.date;
        const baseline =
          formatDisplayDate(reference.latest.date) === liveDate
            ? reference.previous
            : reference.latest;

        if (baseline) {
          setPreviousRates((existing) => existing ?? (baseline.rates as RateMap));
          setPreviousDate(formatDisplayDate(baseline.date));
        }
      } catch (err) {
        if (!active || controller.signal.aborted) return;
        // Fully offline: still render the app, clearly labelled as a snapshot.
        setSnapshot({
          base: 'USD',
          rates: FALLBACK_RATES,
          date: SNAPSHOT_DATE,
          source: 'cache',
          fetchedAt: Date.now(),
        });
        setError(toErrorShape(err));
        setStatus('error');
      }
    })();

    return () => {
      active = false;
      controller.abort();
    };
  }, [attempt]);

  const refresh = useCallback(() => setAttempt((n) => n + 1), []);

  const value = useMemo<RateContextValue>(() => {
    const rates = snapshot?.rates ?? FALLBACK_RATES;
    const isOffline = status === 'error';
    const sourceLabel = snapshot
      ? isOffline
        ? 'Bundled snapshot (offline)'
        : PROVIDER_LABELS[snapshot.source]
      : 'Loading…';

    return {
      status,
      rates,
      previousRates,
      previousDate,
      sourceLabel,
      updatedAt: snapshot?.date ?? SNAPSHOT_DATE,
      isOffline,
      error,
      base: snapshot?.base ?? 'USD',
      refresh,
      rate: (from: string, to: string) => getRate(from, to, rates),
      change: (from: string, to: string) => get24hChange(from, to, rates, previousRates),
      high: (from: string, to: string) => get24hHigh(from, to, rates, previousRates),
      low: (from: string, to: string) => get24hLow(from, to, rates, previousRates),
      format: formatRate,
    };
  }, [status, snapshot, previousRates, previousDate, error, refresh]);

  return <RateContext.Provider value={value}>{children}</RateContext.Provider>;
}

export function useLiveRates(): RateContextValue {
  const ctx = useContext(RateContext);
  if (!ctx) {
    throw new Error('useLiveRates must be used inside <RateProvider>');
  }
  return ctx;
}
