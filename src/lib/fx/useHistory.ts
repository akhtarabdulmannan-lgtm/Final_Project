import { useEffect, useState } from 'react';
import { fetchHistory, type HistoryPoint } from './history';
import { toErrorShape } from './client';
import type { FxApiErrorShape } from './types';

interface HistoryState {
  points: HistoryPoint[];
  status: 'loading' | 'ready' | 'error';
  error: FxApiErrorShape | null;
}

export interface HistoryResult extends HistoryState {
  /** Re-runs the request after a failure. */
  reload: () => void;
}

/**
 * Loads real ECB historical rates for a pair.
 *
 * Charts therefore show actual published data; the previous implementation
 * generated a plausible-looking series locally.
 */
export function useRateHistory(from: string, to: string, days: number, enabled = true): HistoryResult {
  const [state, setState] = useState<HistoryState>({ points: [], status: 'loading', error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    let active = true;

    setState({ points: [], status: 'loading', error: null });

    (async () => {
      try {
        const points = await fetchHistory(from, to, days, controller.signal);
        if (!active) return;
        setState({ points, status: 'ready', error: null });
      } catch (error) {
        if (!active || controller.signal.aborted) return;
        setState({ points: [], status: 'error', error: toErrorShape(error) });
      }
    })();

    return () => {
      active = false;
      controller.abort();
    };
  }, [from, to, days, enabled, attempt]);

  return { ...state, reload: () => setAttempt((n) => n + 1) };
}
