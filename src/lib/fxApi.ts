// External REST API integration using fetch and async/await
// Primary live spot rates: Open Exchange Rates Public API (https://open.er-api.com)
// Official ECB reference & historical time-series API: Frankfurter API (https://api.frankfurter.dev)

import { getRate, getHistoricalRates } from '@/lib/rates';

export interface LiveRatesResponse {
  base: string;
  rates: Record<string, number>;
  lastUpdated: string;
  source: string;
  isFallback: boolean;
  errorMessage?: string;
}

export interface HistoricalPoint {
  date: string;
  rate: number;
}

export interface HistoricalSeriesResponse {
  from: string;
  to: string;
  points: HistoricalPoint[];
  source: string;
  isFallback: boolean;
  notice?: string;
}

// Currencies supported by the European Central Bank (Frankfurter API)
const ECB_CURRENCIES = new Set([
  'AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP',
  'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JPY', 'KRW', 'MXN', 'MYR',
  'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR',
]);

// In-memory cache to avoid redundant network requests while navigating screens
const latestRatesCache = new Map<string, { timestamp: number; payload: LiveRatesResponse }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Fetches live exchange rates for a base currency from external JSON REST APIs
 * using fetch and async/await, with graceful error handling and fallback support.
 */
export async function fetchLiveExchangeRates(
  baseCurrency: string,
  forceRefresh = false
): Promise<LiveRatesResponse> {
  const base = baseCurrency.toUpperCase();
  const cached = latestRatesCache.get(base);

  if (!forceRefresh && cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.payload;
  }

  // 1. Primary REST API: Open Exchange Rates Public JSON endpoint (160+ currencies)
  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${encodeURIComponent(base)}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} from Open Exchange Rates API`);
    }

    const data = await response.json();

    if (data && data.result === 'success' && data.rates && typeof data.rates === 'object') {
      const mergedRates: Record<string, number> = { ...data.rates, [base]: 1 };
      const payload: LiveRatesResponse = {
        base,
        rates: mergedRates,
        lastUpdated: data.time_last_update_utc
          ? new Date(data.time_last_update_utc).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'Open Exchange Rates REST API',
        isFallback: false,
      };
      latestRatesCache.set(base, { timestamp: Date.now(), payload });
      return payload;
    }
  } catch {
    // Proceed to secondary ECB Frankfurter REST API
  }

  // 2. Secondary REST API: Frankfurter (European Central Bank JSON REST API)
  if (ECB_CURRENCIES.has(base)) {
    try {
      const response = await fetch(
        `https://api.frankfurter.dev/v1/latest?base=${encodeURIComponent(base)}`,
        {
          method: 'GET',
          headers: { Accept: 'application/json' },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} from Frankfurter ECB API`);
      }

      const data = await response.json();
      if (data && data.rates && typeof data.rates === 'object') {
        const payload: LiveRatesResponse = {
          base,
          rates: { ...data.rates, [base]: 1 },
          lastUpdated: data.date || new Date().toISOString().slice(0, 10),
          source: 'Frankfurter ECB REST API',
          isFallback: false,
        };
        latestRatesCache.set(base, { timestamp: Date.now(), payload });
        return payload;
      }
    } catch {
      // Proceed to offline fallback below
    }
  }

  // 3. Offline / unreachable fallback with clear user-facing error message
  return {
    base,
    rates: { [base]: 1 },
    lastUpdated: 'Offline reference',
    source: 'Reference Fallback Engine',
    isFallback: true,
    errorMessage:
      'Live exchange rate API could not be reached. Showing reference mid-market rates until connection is restored.',
  };
}

/**
 * Helper to resolve a conversion rate using live API rates first,
 * falling back cleanly for non-fiat assets (e.g. XAU, BTC) or offline mode.
 */
export function resolveLiveRate(
  fromCode: string,
  toCode: string,
  liveData: LiveRatesResponse | null
): number {
  const from = fromCode.toUpperCase();
  const to = toCode.toUpperCase();
  if (from === to) return 1;

  if (liveData && !liveData.isFallback) {
    if (liveData.base === from && typeof liveData.rates[to] === 'number') {
      return liveData.rates[to];
    }
    if (
      typeof liveData.rates[from] === 'number' &&
      liveData.rates[from] > 0 &&
      typeof liveData.rates[to] === 'number'
    ) {
      return liveData.rates[to] / liveData.rates[from];
    }
  }

  return getRate(from, to);
}

/**
 * Fetches historical exchange-rate time series from the Frankfurter ECB REST API
 * using fetch and async/await.
 */
export async function fetchHistoricalSeries(
  fromCode: string,
  toCode: string,
  days: number
): Promise<HistoricalSeriesResponse> {
  const from = fromCode.toUpperCase();
  const to = toCode.toUpperCase();
  const clampedDays = Math.max(7, Math.min(days, 3650));

  if (from === to) {
    const today = new Date().toISOString().slice(0, 10);
    return {
      from,
      to,
      points: [{ date: today, rate: 1 }],
      source: 'Direct Parity (1:1)',
      isFallback: false,
    };
  }

  if (ECB_CURRENCIES.has(from) && ECB_CURRENCIES.has(to)) {
    try {
      const end = new Date();
      const start = new Date(end);
      start.setDate(end.getDate() - clampedDays);
      const startStr = start.toISOString().slice(0, 10);

      const url = `https://api.frankfurter.dev/v1/${startStr}..?base=${encodeURIComponent(
        from
      )}&symbols=${encodeURIComponent(to)}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} from Frankfurter historical API`);
      }

      const data = await response.json();
      if (data && data.rates && typeof data.rates === 'object') {
        const points: HistoricalPoint[] = Object.entries(
          data.rates as Record<string, Record<string, number>>
        )
          .map(([date, rateMap]) => ({
            date,
            rate: Number(rateMap[to]),
          }))
          .filter((p) => Number.isFinite(p.rate) && p.rate > 0)
          .sort((a, b) => a.date.localeCompare(b.date));

        if (points.length >= 2) {
          return {
            from,
            to,
            points,
            source: 'Frankfurter ECB Historical REST API',
            isFallback: false,
          };
        }
      }
    } catch {
      return {
        from,
        to,
        points: getHistoricalRates(from, to, clampedDays),
        source: 'Reference Historical Model',
        isFallback: true,
        notice:
          'Unable to reach the Frankfurter ECB historical REST endpoint right now. Showing modeled historical trend.',
      };
    }
  }

  return {
    from,
    to,
    points: getHistoricalRates(from, to, clampedDays),
    source: 'Reference Historical Model',
    isFallback: true,
    notice: `${from}/${to} is outside the European Central Bank daily reference basket; displaying modeled historical series.`,
  };
}
