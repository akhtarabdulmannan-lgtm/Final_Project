// External REST API integration using fetch and async/await
// Combines multiple keyless CORS-enabled FX JSON feeds for institutional accuracy:
// 1. Currency-API Global CDN (@fawazahmed0/currency-api via jsDelivr / Cloudflare Pages) — 200+ fiat, metals & crypto
// 2. Open Exchange Rates Public API (https://open.er-api.com) — 160+ global currencies
// 3. Frankfurter European Central Bank API (https://api.frankfurter.dev) — Official ECB reference & historical series
// 4. AllRatesToday Open Central Bank API (https://allratestoday.com/api/open/central-bank/sbp) — Official SBP interbank rates

import { getRate, getHistoricalRates } from '@/lib/rates';

export type FxProviderMode = 'consensus' | 'central_bank' | 'currency_api' | 'open_er';

export const FX_PROVIDER_OPTIONS: { id: FxProviderMode; label: string; shortLabel: string }[] = [
  {
    id: 'consensus',
    label: 'Institutional Consensus (Market + Central Bank)',
    shortLabel: 'Consensus Mid-Market',
  },
  {
    id: 'central_bank',
    label: 'Official Central Bank (ECB / SBP)',
    shortLabel: 'Central Bank (ECB/SBP)',
  },
  {
    id: 'currency_api',
    label: 'Currency-API Global Feed (200+ & Metals)',
    shortLabel: 'Currency-API Live',
  },
  {
    id: 'open_er',
    label: 'Open Exchange Rates (24h Spot)',
    shortLabel: 'Open Exchange Rates',
  },
];

export interface LiveRatesResponse {
  base: string;
  rates: Record<string, number>;
  lastUpdated: string;
  source: string;
  providerMode: FxProviderMode;
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

// Global provider selection store so all active components stay synchronized
let currentProviderMode: FxProviderMode = 'consensus';
const providerListeners = new Set<(mode: FxProviderMode) => void>();

export function getFxProviderMode(): FxProviderMode {
  return currentProviderMode;
}

export function setFxProviderMode(mode: FxProviderMode): void {
  if (currentProviderMode === mode) return;
  currentProviderMode = mode;
  providerListeners.forEach((listener) => listener(mode));
}

export function subscribeFxProviderMode(listener: (mode: FxProviderMode) => void): () => void {
  providerListeners.add(listener);
  return () => {
    providerListeners.delete(listener);
  };
}

// In-memory cache keyed by `${mode}:${base}`
const latestRatesCache = new Map<string, { timestamp: number; payload: LiveRatesResponse }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface RawFeedResult {
  rates: Record<string, number>;
  updatedLabel: string;
}

async function fetchCurrencyApiFeed(base: string): Promise<RawFeedResult | null> {
  const lower = base.toLowerCase();
  const urls = [
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${encodeURIComponent(lower)}.json`,
    `https://latest.currency-api.pages.dev/v1/currencies/${encodeURIComponent(lower)}.json`,
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'GET', headers: { Accept: 'application/json' } });
      if (!res.ok) continue;
      const data = await res.json();
      const map = data?.[lower];
      if (map && typeof map === 'object') {
        const normalized: Record<string, number> = { [base]: 1 };
        for (const [k, v] of Object.entries(map)) {
          const num = Number(v);
          if (Number.isFinite(num) && num > 0) {
            normalized[k.toUpperCase()] = num;
          }
        }
        return {
          rates: normalized,
          updatedLabel: typeof data.date === 'string' ? data.date : 'Live CDN',
        };
      }
    } catch {
      // Try mirror URL
    }
  }
  return null;
}

async function fetchOpenErFeed(base: string): Promise<RawFeedResult | null> {
  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${encodeURIComponent(base)}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.result === 'success' && data.rates && typeof data.rates === 'object') {
      const normalized: Record<string, number> = { [base]: 1 };
      for (const [k, v] of Object.entries(data.rates)) {
        const num = Number(v);
        if (Number.isFinite(num) && num > 0) {
          normalized[k.toUpperCase()] = num;
        }
      }
      const updatedLabel = data.time_last_update_utc
        ? new Date(data.time_last_update_utc).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : 'Today';
      return { rates: normalized, updatedLabel };
    }
  } catch {
    // Ignore failure
  }
  return null;
}

async function fetchFrankfurterEcbFeed(base: string): Promise<RawFeedResult | null> {
  if (!ECB_CURRENCIES.has(base)) return null;
  try {
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${encodeURIComponent(base)}`,
      { method: 'GET', headers: { Accept: 'application/json' } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.rates && typeof data.rates === 'object') {
      const normalized: Record<string, number> = { [base]: 1 };
      for (const [k, v] of Object.entries(data.rates)) {
        const num = Number(v);
        if (Number.isFinite(num) && num > 0) {
          normalized[k.toUpperCase()] = num;
        }
      }
      return { rates: normalized, updatedLabel: data.date || 'ECB Close' };
    }
  } catch {
    // Ignore failure
  }
  return null;
}

async function fetchSbpCentralBankFeed(base: string): Promise<RawFeedResult | null> {
  try {
    const res = await fetch('https://allratestoday.com/api/open/central-bank/sbp', {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !Array.isArray(data.rates)) return null;

    // SBP quotes how many PKR equal 1 unit of each foreign currency
    const pkrPerUnit: Record<string, number> = { PKR: 1 };
    for (const entry of data.rates) {
      if (
        entry &&
        typeof entry.base === 'string' &&
        entry.quote === 'PKR' &&
        Number.isFinite(Number(entry.value)) &&
        Number(entry.value) > 0
      ) {
        pkrPerUnit[entry.base.toUpperCase()] = Number(entry.value);
      }
    }

    const baseInPkr = pkrPerUnit[base];
    if (!baseInPkr) return null;

    const rebased: Record<string, number> = { [base]: 1 };
    for (const [code, codeInPkr] of Object.entries(pkrPerUnit)) {
      rebased[code] = baseInPkr / codeInPkr;
    }

    return {
      rates: rebased,
      updatedLabel: data.rate_date ? `SBP ${data.rate_date}` : 'SBP Official',
    };
  } catch {
    return null;
  }
}

/**
 * Fetches live exchange rates for a base currency from external JSON REST APIs
 * using fetch and async/await, supporting multi-source institutional consensus
 * as well as individual provider selection.
 */
export async function fetchLiveExchangeRates(
  baseCurrency: string,
  forceRefresh = false,
  modeOverride?: FxProviderMode
): Promise<LiveRatesResponse> {
  const base = baseCurrency.toUpperCase();
  const mode = modeOverride ?? currentProviderMode;
  const cacheKey = `${mode}:${base}`;
  const cached = latestRatesCache.get(cacheKey);

  if (!forceRefresh && cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.payload;
  }

  // Single-provider modes when explicitly selected by the user
  if (mode === 'currency_api') {
    const feed = await fetchCurrencyApiFeed(base);
    if (feed) {
      const payload: LiveRatesResponse = {
        base,
        rates: feed.rates,
        lastUpdated: feed.updatedLabel,
        source: 'Currency-API Global CDN',
        providerMode: mode,
        isFallback: false,
      };
      latestRatesCache.set(cacheKey, { timestamp: Date.now(), payload });
      return payload;
    }
  }

  if (mode === 'open_er') {
    const feed = await fetchOpenErFeed(base);
    if (feed) {
      const payload: LiveRatesResponse = {
        base,
        rates: feed.rates,
        lastUpdated: feed.updatedLabel,
        source: 'Open Exchange Rates API',
        providerMode: mode,
        isFallback: false,
      };
      latestRatesCache.set(cacheKey, { timestamp: Date.now(), payload });
      return payload;
    }
  }

  // Fetch market + central-bank feeds concurrently for Consensus or Central Bank mode
  const [currencyApi, openEr, ecb, sbp] = await Promise.all([
    fetchCurrencyApiFeed(base),
    fetchOpenErFeed(base),
    fetchFrankfurterEcbFeed(base),
    fetchSbpCentralBankFeed(base),
  ]);

  if (mode === 'central_bank') {
    const merged: Record<string, number> = {
      ...(openEr?.rates ?? {}),
      ...(currencyApi?.rates ?? {}),
      ...(sbp?.rates ?? {}),
      ...(ecb?.rates ?? {}),
      [base]: 1,
    };
    // Ensure SBP official PKR parity takes priority for PKR pairs
    if (sbp?.rates?.PKR) {
      merged.PKR = sbp.rates.PKR;
    }
    if (Object.keys(merged).length > 1) {
      const payload: LiveRatesResponse = {
        base,
        rates: merged,
        lastUpdated: ecb?.updatedLabel || sbp?.updatedLabel || currencyApi?.updatedLabel || 'Latest',
        source: 'Central Bank Official (ECB / SBP)',
        providerMode: mode,
        isFallback: false,
      };
      latestRatesCache.set(cacheKey, { timestamp: Date.now(), payload });
      return payload;
    }
  }

  // Default: Institutional Consensus (blends live market feeds with official central-bank interbank parity)
  const allCodes = new Set<string>([
    ...Object.keys(currencyApi?.rates ?? {}),
    ...Object.keys(openEr?.rates ?? {}),
    ...Object.keys(ecb?.rates ?? {}),
    ...Object.keys(sbp?.rates ?? {}),
  ]);

  if (allCodes.size > 1) {
    const consensusRates: Record<string, number> = { [base]: 1 };

    allCodes.forEach((code) => {
      if (code === base) {
        consensusRates[code] = 1;
        return;
      }

      // 1. Compute live market mid-rate across responding market feeds
      const marketSamples: number[] = [];
      if (currencyApi?.rates?.[code]) marketSamples.push(currencyApi.rates[code]);
      if (openEr?.rates?.[code]) marketSamples.push(openEr.rates[code]);
      const marketAvg =
        marketSamples.length > 0
          ? marketSamples.reduce((sum, v) => sum + v, 0) / marketSamples.length
          : null;

      // 2. Compute official central-bank interbank rate where available (ECB / SBP)
      let centralBankRate: number | null = null;
      if (code === 'PKR' || base === 'PKR') {
        centralBankRate = sbp?.rates?.[code] ?? null;
      } else if (ecb?.rates?.[code]) {
        centralBankRate = ecb.rates[code];
      } else if (sbp?.rates?.[code]) {
        centralBankRate = sbp.rates[code];
      }

      if (marketAvg !== null && centralBankRate !== null) {
        // Guard against any anomalous >5% divergence between official peg and market
        const relDiff = Math.abs(marketAvg - centralBankRate) / centralBankRate;
        consensusRates[code] = relDiff <= 0.05 ? (marketAvg + centralBankRate) / 2 : marketAvg;
      } else if (marketAvg !== null) {
        consensusRates[code] = marketAvg;
      } else if (centralBankRate !== null) {
        consensusRates[code] = centralBankRate;
      }
    });

    const activeSources: string[] = [];
    if (currencyApi || openEr) activeSources.push('Market');
    if (ecb || sbp) activeSources.push('Central Bank');

    const payload: LiveRatesResponse = {
      base,
      rates: consensusRates,
      lastUpdated: openEr?.updatedLabel || currencyApi?.updatedLabel || ecb?.updatedLabel || 'Live',
      source: `Institutional Consensus (${activeSources.join(' + ')})`,
      providerMode: 'consensus',
      isFallback: false,
    };
    latestRatesCache.set(cacheKey, { timestamp: Date.now(), payload });
    return payload;
  }

  // Offline / unreachable fallback with clear user-facing error message
  return {
    base,
    rates: { [base]: 1 },
    lastUpdated: 'Offline reference',
    source: 'Reference Fallback Engine',
    providerMode: mode,
    isFallback: true,
    errorMessage:
      'Live exchange rate APIs could not be reached. Showing reference mid-market rates until connection is restored.',
  };
}

/**
 * Helper to resolve a conversion rate using live API rates first,
 * falling back cleanly for offline mode.
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
 * using fetch and async/await, or scales historical series to the live spot anchor
 * for currencies outside the ECB basket (e.g., PKR, AED).
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

  // Anchor non-ECB pairs (such as EUR/PKR or USD/PKR) to the real live consensus spot rate
  const liveSnapshot = await fetchLiveExchangeRates(from, false);
  const liveAnchor = resolveLiveRate(from, to, liveSnapshot);
  const rawSeries = getHistoricalRates(from, to, clampedDays);
  const lastRaw = rawSeries[rawSeries.length - 1]?.rate || 1;
  const scale = lastRaw > 0 ? liveAnchor / lastRaw : 1;
  const anchoredSeries = rawSeries.map((pt, idx) => ({
    date: pt.date,
    rate: idx === rawSeries.length - 1 ? liveAnchor : pt.rate * scale,
  }));

  return {
    from,
    to,
    points: anchoredSeries,
    source: 'Live Spot-Anchored Historical Curve',
    isFallback: true,
    notice: `${from}/${to} is outside the 31-currency ECB basket; historical curve is anchored to today's live ${liveAnchor.toFixed(4)} spot rate.`,
  };
}
