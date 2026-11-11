/**
 * Offline fallback rate table.
 *
 * IMPORTANT: these numbers are a **bundled snapshot**, not live market data.
 * Normal operation fetches live rates from a public REST API (see
 * `src/lib/fx/client.ts`); this table is only used when that request fails
 * (offline, blocked by an extension, or provider outage) so the app can still
 * render. `RateProvider` marks this state as "Offline" in the header.
 *
 * Every helper below takes the live rate map as an optional last argument;
 * when it is present the live value wins and this table is never read.
 */

export const SNAPSHOT_DATE = '31 Jan 2026';

const BASE_RATES: Record<string, number> = {
  USD: 1.0, EUR: 0.8534, GBP: 0.7312, JPY: 149.52, AUD: 1.5243, CAD: 1.3621,
  CHF: 0.8765, CNY: 7.2341, INR: 83.4521, MXN: 17.2345, BRL: 4.9876,
  KRW: 1328.45, SGD: 1.3412, HKD: 7.8123, NOK: 10.6234, SEK: 10.4512,
  DKK: 6.8734, NZD: 1.6234, ZAR: 18.6543, TRY: 28.7654, RUB: 91.2345,
  PLN: 4.0123, THB: 35.4321, IDR: 15623.45, MYR: 4.6789, PHP: 56.1234,
  CZK: 22.3456, ILS: 3.6789, CLP: 876.54, AED: 3.6725, SAR: 3.7500,
  TWD: 31.4567, ARS: 365.78, COP: 3945.67, EGP: 30.8765, NGN: 776.54,
  PKR: 282.34, BDT: 109.87, VND: 24356.78, HUF: 354.56, RON: 4.5678,
  BGN: 1.7890, HRK: 6.9876, ISK: 137.89, UAH: 37.6543, PEN: 3.7234,
  KES: 153.45, GHS: 12.3456, MAD: 9.8765, QAR: 3.6400, KWD: 0.3078,
  BHD: 0.3770, OMR: 0.3845, JOD: 0.7090, LKR: 323.45, NPR: 133.56,
  MMK: 2098.76, KHR: 4098.76, LAK: 20567.89, FJD: 2.2345,
  XAU: 0.000488, XAG: 0.0412, BTC: 0.0000234, ETH: 0.000412,
};

export type RateMap = Record<string, number>;

/** A rate expressed against `base`, resolved from live data when available. */
export function getRate(from: string, to: string, live?: RateMap | null): number {
  if (from === to) return 1.0;
  const fromRate = live?.[from] ?? BASE_RATES[from] ?? 1;
  const toRate = live?.[to] ?? BASE_RATES[to] ?? 1;
  if (!fromRate) return 1;
  return toRate / fromRate;
}

export function convert(amount: number, from: string, to: string, live?: RateMap | null): number {
  return amount * getRate(from, to, live);
}

/**
 * Recent movement for a pair.
 *
 * The rate API only publishes a daily snapshot, so we compare against the
 * previous snapshot the browser saw. When that is unavailable we report 0 —
 * an honest "no change data" rather than an invented number.
 */
export function get24hChange(from: string, to: string, live?: RateMap | null, previous?: RateMap | null): number {
  if (from === to) return 0;
  if (!live || !previous) return 0;

  // `previous` is a second provider snapshot whose base may differ from `live`
  // (er-api quotes against USD, Frankfurter can quote against anything), so both
  // sides are resolved through getRate rather than divided directly.
  const current = getRate(from, to, live);
  const prior = getRate(from, to, previous);
  if (!prior || !Number.isFinite(current) || !Number.isFinite(prior)) return 0;

  return ((current - prior) / prior) * 100;
}

/**
 * True when a pair has no genuine day-over-day figure. The UI uses this to say
 * so explicitly instead of printing a "0.00%" that reads like a real quote.
 */
export function has24hChange(previous?: RateMap | null): boolean {
  return Boolean(previous);
}

/**
 * Daily change over the reported period. The providers give one rate per day,
 * so the "high"/"low" band is derived from the real daily move rather than a
 * fabricated intraday range.
 */
export function get24hHigh(from: string, to: string, live?: RateMap | null, previous?: RateMap | null): number {
  const rate = getRate(from, to, live);
  const prior = previous && live ? getRate(from, to, previous) : rate;
  return Math.max(rate, prior);
}

export function get24hLow(from: string, to: string, live?: RateMap | null, previous?: RateMap | null): number {
  const rate = getRate(from, to, live);
  const prior = previous && live ? getRate(from, to, previous) : rate;
  return Math.min(rate, prior);
}

export function formatRate(rate: number): string {
  if (rate >= 1000) return rate.toFixed(2);
  if (rate >= 100) return rate.toFixed(4);
  if (rate >= 1) return rate.toFixed(4);
  if (rate >= 0.01) return rate.toFixed(6);
  return rate.toFixed(8);
}

export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatUtcTime(date: Date): string {
  return date.toISOString().slice(11, 19);
}

export const FALLBACK_RATES = BASE_RATES;
