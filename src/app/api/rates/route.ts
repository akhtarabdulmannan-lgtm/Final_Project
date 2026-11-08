import { NextRequest, NextResponse } from 'next/server';
import { getRate, get24hChange, get24hHigh, get24hLow, formatRate } from '@/lib/rates';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const from = (searchParams.get('from') || 'USD').toUpperCase();
  const toParam = searchParams.get('to') || 'EUR';
  const amount = Number(searchParams.get('amount')) || 1.0;

  const toCurrencies = toParam.split(',').map(s => s.trim().toUpperCase());

  const results = toCurrencies.map(quoteCurrency => {
    const mid = getRate(from, quoteCurrency);
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
    engine: 'Rate Blender v3.2',
    to: results,
  });
}
