import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getRate, get24hChange, get24hHigh, get24hLow, formatRate } from '@/lib/rates';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const from = (searchParams.get('from') || 'USD').toUpperCase();
  const toParam = searchParams.get('to') || 'EUR';
  const amount = Number(searchParams.get('amount')) || 1.0;

  const toCurrencies = toParam.split(',').map((s) => s.trim().toUpperCase()).filter(Boolean);

  // Attempt to load live rates from Supabase currencies table (fast timeout fallback)
  let dbRates: Record<string, number> | null = null;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: {
          fetch: (url, init) =>
            fetch(url, {
              ...init,
              signal: AbortSignal.timeout(2500),
            }),
        },
      });
      const neededCodes = Array.from(new Set([from, ...toCurrencies]));
      const { data, error } = await supabase
        .from('currencies')
        .select('code, rate_to_usd')
        .in('code', neededCodes);

      if (!error && data && data.length > 0) {
        dbRates = {};
        for (const row of data) {
          dbRates[row.code] = Number(row.rate_to_usd);
        }
      }
    } catch {
      dbRates = null;
    }
  }

  const results = toCurrencies.map((quoteCurrency) => {
    const mid =
      dbRates && dbRates[from] && dbRates[quoteCurrency]
        ? dbRates[quoteCurrency] / dbRates[from]
        : getRate(from, quoteCurrency);
    const change24h = get24hChange(from, quoteCurrency);
    const high = get24hHigh(from, quoteCurrency);
    const low = get24hLow(from, quoteCurrency);

    return {
      quotecurrency: quoteCurrency,
      mid: Number(formatRate(mid)),
      bid: Number(formatRate(mid * 0.9998)),
      ask: Number(formatRate(mid * 1.0002)),
      high24h: Number(formatRate(high)),
      low24h: Number(formatRate(low)),
      change24h_pct: (change24h >= 0 ? '+' : '') + change24h.toFixed(2),
      converted_amount: Number((amount * mid).toFixed(2)),
    };
  });

  return NextResponse.json({
    terms: 'https://vectisx.com/terms',
    privacy: 'https://vectisx.com/privacy',
    from,
    amount,
    timestamp: new Date().toISOString(),
    engine: dbRates ? 'Rate Blender v3.2 (Supabase Live)' : 'Rate Blender v3.2',
    to: results,
  });
}
