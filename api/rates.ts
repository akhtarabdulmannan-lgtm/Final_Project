/**
 * Server-side rate proxy.
 *
 * Runs as a Vercel serverless function at /api/rates. It exists for two reasons:
 *
 *   1. The third-party rate providers do not all send CORS headers, so calling
 *      them straight from the browser is unreliable. A same-origin endpoint has
 *      no such problem.
 *   2. Provider keys, if a keyed plan is used, stay in the Vercel environment and
 *      are never shipped in the client bundle.
 *
 * Configuration (all optional — the free, keyless providers are the default):
 *   FX_API_KEY       key sent to the primary provider
 *   FX_API_URL       full URL of the primary provider's latest-rates endpoint
 *   FX_API_KEY_PARAM query-string name for that key (default: api_key)
 *
 * The response is deliberately normalised to the shape the client already
 * parses: { base_code, time_last_update_utc, rates: { CODE: number } }.
 */

const DEFAULT_PRIMARY = 'https://open.er-api.com/v6/latest/USD';
const FALLBACK = 'https://api.frankfurter.dev/v1/latest?base=USD';
const TIMEOUT_MS = 8000;

interface NormalisedRates {
  base_code: string;
  time_last_update_utc: string;
  rates: Record<string, number>;
  provider: 'primary' | 'fallback';
}

async function fetchJson(url: string): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

function asRates(value: unknown): Record<string, number> | null {
  if (typeof value !== 'object' || value === null) return null;
  const out: Record<string, number> = {};
  for (const [code, rate] of Object.entries(value as Record<string, unknown>)) {
    if (typeof rate === 'number' && Number.isFinite(rate) && rate > 0) {
      out[code.toUpperCase()] = rate;
    }
  }
  return Object.keys(out).length >= 5 ? out : null;
}

/** Accepts er-api, Frankfurter and most "rates" style payloads. */
function normalise(payload: unknown, provider: NormalisedRates['provider']): NormalisedRates | null {
  if (typeof payload !== 'object' || payload === null) return null;
  const body = payload as Record<string, unknown>;

  const rates = asRates(body.rates);
  if (!rates) return null;

  const base = String(body.base_code ?? body.base ?? 'USD').toUpperCase();
  rates[base] = 1;

  const rawDate =
    typeof body.time_last_update_utc === 'string'
      ? body.time_last_update_utc
      : typeof body.date === 'string'
        ? body.date
        : new Date().toISOString();

  return {
    base_code: base,
    time_last_update_utc: rawDate,
    rates,
    provider,
  };
}

function primaryUrl(): string {
  const base = process.env.FX_API_URL || DEFAULT_PRIMARY;
  const key = process.env.FX_API_KEY;
  if (!key) return base;

  const param = process.env.FX_API_KEY_PARAM || 'api_key';
  const separator = base.includes('?') ? '&' : '?';
  return `${base}${separator}${encodeURIComponent(param)}=${encodeURIComponent(key)}`;
}

/**
 * Vercel's Node handler signature. Typed locally so this file needs no extra
 * dependency in package.json.
 */
export default async function handler(
  request: { method?: string },
  response: {
    status: (code: number) => { json: (body: unknown) => void; end: () => void };
    setHeader: (name: string, value: string) => void;
  },
) {
  if (request.method && !['GET', 'HEAD'].includes(request.method)) {
    response.setHeader('Allow', 'GET');
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  for (const provider of ['primary', 'fallback'] as const) {
    try {
      const payload = await fetchJson(provider === 'primary' ? primaryUrl() : FALLBACK);
      const snapshot = normalise(payload, provider);
      if (!snapshot) continue;

      // Rates change slowly; let the CDN serve this for a minute and a stale
      // copy for longer, so a provider hiccup does not reach a visitor.
      response.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
      response.status(200).json(snapshot);
      return;
    } catch {
      // Try the next provider.
    }
  }

  response.setHeader('Cache-Control', 'no-store');
  response.status(502).json({ error: 'Unable to fetch exchange rates right now.' });
}
