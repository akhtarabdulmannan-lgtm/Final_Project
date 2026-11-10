/** Shared types for the live-rate layer. */

export type RateSource = 'er-api' | 'frankfurter' | 'cache';

export interface LiveRateSnapshot {
  /** Base currency the rates are quoted against. */
  base: string;
  /** Units of each currency per 1 unit of `base`. Always includes `base: 1`. */
  rates: Record<string, number>;
  /** ISO date the provider reports for this snapshot (ECB publishes weekdays). */
  date: string;
  /** Which provider answered. */
  source: RateSource;
  /** Epoch ms when this client received the data. */
  fetchedAt: number;
}

export type RateStatus = 'loading' | 'ready' | 'error';

export interface FxApiErrorShape {
  /** Short, user-facing message — safe to render directly. */
  message: string;
  /** Technical detail, shown in a collapsible block for debugging. */
  detail?: string;
  /** True when a retry has a reasonable chance of succeeding. */
  retryable: boolean;
}
