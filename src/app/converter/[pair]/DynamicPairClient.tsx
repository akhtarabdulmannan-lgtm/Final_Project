'use client';

import Link from 'next/link';
import CurrencyConverter from '@/components/sections/CurrencyConverter';
import ApiStatusBanner from '@/components/ui/ApiStatusBanner';
import { getCurrency, currencies } from '@/data/currencies';
import { formatRate } from '@/lib/rates';
import { useLiveRates, useHistoricalSeries } from '@/hooks/useLiveRates';
import { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Loader2 } from 'lucide-react';

export default function DynamicPairClient({ pair }: { pair: string }) {
  const parts = (pair || 'usd-to-eur').split('-to-');
  const fromCode = (parts[0] || 'USD').toUpperCase();
  const toCode = (parts[1] || 'EUR').toUpperCase();

  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');

  const daysMap = {
    '7D': 7,
    '30D': 30,
    '90D': 90,
    '1Y': 365,
  };

  const fromCurrency = getCurrency(fromCode) || { code: fromCode, name: fromCode, symbol: '$', flag: '🌐', region: 'Global' };
  const toCurrency = getCurrency(toCode) || { code: toCode, name: toCode, symbol: '€', flag: '🌐', region: 'Global' };

  const { isLoading: spotLoading, error, source, lastUpdated, refresh, getLivePairRate } = useLiveRates(fromCode);
  const { points: chartData, isLoading: seriesLoading } = useHistoricalSeries(fromCode, toCode, daysMap[timeRange]);

  const currentRate = getLivePairRate(fromCode, toCode);
  const inverseRate = currentRate > 0 ? 1 / currentRate : 0;

  const { high, low } = useMemo(() => {
    if (!chartData.length) {
      return { high: currentRate * 1.008, low: currentRate * 0.992 };
    }
    const vals = chartData.map((d) => d.rate);
    return { high: Math.max(...vals), low: Math.min(...vals) };
  }, [chartData, currentRate]);

  const relatedPairs = currencies
    .filter((c) => c.code !== fromCode && c.code !== toCode)
    .slice(0, 6)
    .map((c) => [fromCode, c.code]);

  return (
    <div className="min-h-screen bg-surface-50 pb-20">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-surface-200">
        <div className="container-vx py-3 flex items-center gap-2 text-xs text-surface-500">
          <Link href="/" className="hover:text-brand-500">Home</Link>
          <span>/</span>
          <Link href="/converter" className="hover:text-brand-500">Converter</Link>
          <span>/</span>
          <span className="font-semibold text-surface-900">{fromCode} to {toCode}</span>
        </div>
      </div>

      {/* Header & Converter */}
      <section className="bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800 text-white py-12">
        <div className="container-vx">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold mb-2">
              <span className="text-xl">{fromCurrency.flag}</span>
              <span>1 {fromCode} = {formatRate(currentRate)} {toCode}</span>
              <span className="text-xl">{toCurrency.flag}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">
              Convert {fromCurrency.name} to {toCurrency.name}
            </h1>
            <p className="text-surface-300 text-sm mt-2">
              Live mid-market exchange rate between {fromCode} and {toCode}, fetched asynchronously from public FX REST APIs.
            </p>
          </div>

          <div className="flex justify-center">
            <CurrencyConverter defaultFrom={fromCode} defaultTo={toCode} defaultAmount={1000} />
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <section className="py-12">
        <div className="container-vx">
          <div className="mb-6">
            <ApiStatusBanner
              isLoading={spotLoading || seriesLoading}
              error={error}
              source={source}
              lastUpdated={lastUpdated}
              onRefresh={refresh}
            />
          </div>

          <div className="card p-6 bg-white mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-surface-100 gap-4">
              <div>
                <span className="text-xs font-semibold text-brand-500 uppercase tracking-wider">Historical Trend</span>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-surface-900 mt-1">
                  {fromCode} to {toCode} Exchange Rate Chart
                </h2>
              </div>

              {/* Time Range Selector */}
              <div className="flex rounded-xl bg-surface-100 p-1">
                {(['7D', '30D', '90D', '1Y'] as const).map((range) => (
                  <button
                    type="button"
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      timeRange === range
                        ? 'bg-white text-brand-500 shadow-sm'
                        : 'text-surface-600 hover:text-surface-900'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart Area */}
            <div className="h-80 w-full pt-6">
              {seriesLoading ? (
                <div className="h-full flex items-center justify-center gap-2 text-sm text-surface-500">
                  <Loader2 className="w-5 h-5 animate-spin text-brand-500" />
                  Loading historical series...
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0052FF" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#0052FF" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#64748B', fontSize: 11 }}
                      tickFormatter={(str) => str.slice(5)}
                    />
                    <YAxis
                      domain={['auto', 'auto']}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#64748B', fontSize: 11 }}
                      tickFormatter={(val) => formatRate(val)}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0A1628', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                      formatter={(val: number) => [formatRate(val) + ` ${toCode}`, 'Rate']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Area type="monotone" dataKey="rate" stroke="#0052FF" strokeWidth={2.5} fillOpacity={1} fill="url(#rateGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Rate Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card p-4 bg-white">
              <span className="text-xs text-surface-400 block mb-1">Current Mid-Market</span>
              <span className="text-xl font-bold font-mono text-surface-900">{formatRate(currentRate)}</span>
              <span className="text-[10px] text-teal-600 block mt-1">Live REST API</span>
            </div>
            <div className="card p-4 bg-white">
              <span className="text-xs text-surface-400 block mb-1">Period High</span>
              <span className="text-xl font-bold font-mono text-surface-900">{formatRate(high)}</span>
              <span className="text-[10px] text-surface-400 block mt-1">{timeRange} peak</span>
            </div>
            <div className="card p-4 bg-white">
              <span className="text-xs text-surface-400 block mb-1">Period Low</span>
              <span className="text-xl font-bold font-mono text-surface-900">{formatRate(low)}</span>
              <span className="text-[10px] text-surface-400 block mt-1">{timeRange} floor</span>
            </div>
            <div className="card p-4 bg-white">
              <span className="text-xs text-surface-400 block mb-1">Inverse Rate</span>
              <span className="text-xl font-bold font-mono text-surface-900">{formatRate(inverseRate)}</span>
              <span className="text-[10px] text-surface-400 block mt-1">1 {toCode} = {fromCode}</span>
            </div>
          </div>

          {/* Related Currency Pairs */}
          <div className="card p-6 bg-white">
            <h3 className="font-heading font-bold text-lg text-surface-900 mb-4">
              More {fromCode} Conversions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {relatedPairs.map(([f, t]) => (
                <Link
                  key={`${f}-${t}`}
                  href={`/converter/${f.toLowerCase()}-to-${t.toLowerCase()}`}
                  className="p-3 rounded-xl border border-surface-100 hover:border-brand-500/30 hover:bg-surface-50 flex items-center justify-between transition-colors"
                >
                  <span className="font-semibold text-sm text-surface-800">{f} to {t}</span>
                  <span className="font-mono text-xs text-surface-500">{formatRate(getLivePairRate(f, t))}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
