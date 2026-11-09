'use client';

import Link from 'next/link';
import CurrencyConverter from '@/components/sections/CurrencyConverter';
import ApiStatusBanner from '@/components/ui/ApiStatusBanner';
import {
  RateFlash,
  RevealCard,
  RevealSection,
  Skeleton,
  useHydrated,
  usePrefersReducedMotion,
} from '@/components/ui/MotionPrimitives';
import { getCurrency, currencies } from '@/data/currencies';
import { formatRate } from '@/lib/rates';
import { useLiveRates, useHistoricalSeries } from '@/hooks/useLiveRates';
import { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function DynamicPairClient({ pair }: { pair: string }) {
  const parts = (pair || 'usd-to-eur').split('-to-');
  const fromCode = (parts[0] || 'USD').toUpperCase();
  const toCode = (parts[1] || 'EUR').toUpperCase();

  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');
  const hydrated = useHydrated();
  const reducedMotion = usePrefersReducedMotion();

  const daysMap = {
    '7D': 7,
    '30D': 30,
    '90D': 90,
    '1Y': 365,
  };

  const fromCurrency = getCurrency(fromCode) || {
    code: fromCode,
    name: fromCode,
    symbol: '$',
    flag: '🌐',
    region: 'Global',
  };
  const toCurrency = getCurrency(toCode) || {
    code: toCode,
    name: toCode,
    symbol: '€',
    flag: '🌐',
    region: 'Global',
  };

  const {
    data: spotData,
    isLoading: spotLoading,
    error,
    source,
    lastUpdated,
    refresh,
    getLivePairRate,
  } = useLiveRates(fromCode);
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
    <div className="min-h-screen bg-page pb-20">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-surface-200">
        <div className="container-vx py-1.5 flex items-center gap-2 type-caption text-caption">
          <Link href="/" className="inline-flex items-center min-h-[44px] hover:text-primary">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/converter" className="inline-flex items-center min-h-[44px] hover:text-primary">
            Converter
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-navy">
            {fromCode} to {toCode}
          </span>
        </div>
      </div>

      {/* Header & Converter — Flat Navy #0B1B33 */}
      <section className="bg-navy text-white border-b border-navy-border py-12">
        <div className="container-vx">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-pale border border-primary-border text-primary type-caption font-semibold mb-3 tabular-nums">
              <span aria-hidden="true">{fromCurrency.flag}</span>
              <span>
                1 {fromCode} = {formatRate(currentRate)} {toCode}
              </span>
              <span aria-hidden="true">{toCurrency.flag}</span>
            </div>
            <h1 className="type-h1 text-white">
              Convert {fromCurrency.name} to {toCurrency.name}
            </h1>
            <p className="type-body text-[#C9D3E3] mt-2">
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-surface-200 gap-4">
              <div>
                <span className="badge-brand">Historical Trend</span>
                <h2 className="type-h2 text-navy mt-2">
                  {fromCode} to {toCode} Exchange Rate Chart
                </h2>
              </div>

              {/* Time Range Selector (>= 44px touch targets) */}
              <div
                className="flex flex-wrap rounded-xl bg-page border border-surface-200 p-1 gap-1"
                role="tablist"
                aria-label="Time range"
              >
                {(['7D', '30D', '90D', '1Y'] as const).map((range) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={timeRange === range}
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`min-h-[44px] min-w-[44px] px-3.5 py-2 type-caption font-semibold rounded-lg border transition-colors duration-150 ease-fintech ${
                      timeRange === range
                        ? 'bg-primary-pale text-primary border-primary-border'
                        : 'border-transparent text-caption hover:text-navy'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart Area — Flat Pale-Blue Fill (#EFF4FF) & Primary Stroke (#1D4ED8), Zero Gradients */}
            <div className="h-80 w-full pt-6">
              {hydrated && seriesLoading ? (
                <div
                  className="h-full w-full flex flex-col justify-between p-4 rounded-2xl border border-surface-200 bg-page"
                  aria-busy="true"
                  aria-label="Loading historical chart"
                >
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3E8F0" />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#5B6B82', fontSize: 12 }}
                      tickFormatter={(str) => str.slice(5)}
                    />
                    <YAxis
                      domain={['auto', 'auto']}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#5B6B82', fontSize: 12 }}
                      tickFormatter={(val) => formatRate(val)}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0B1B33',
                        border: '1px solid #223859',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        fontSize: '13px',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                      formatter={(val: number) => [`${formatRate(val)} ${toCode}`, 'Rate']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="rate"
                      stroke="#1D4ED8"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="#EFF4FF"
                      isAnimationActive={!reducedMotion}
                      animationDuration={250}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Rate Statistics — Navy Rates with tabular-nums */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card p-4 bg-white">
              <span className="type-caption text-caption block mb-1">Current Mid-Market</span>
              <span className="text-xl font-heading font-semibold text-navy tabular-nums">
                <RateFlash value={currentRate} ready={Boolean(spotData)}>
                  {formatRate(currentRate)}
                </RateFlash>
              </span>
              <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gain-bg text-gain-text border border-gain-border">
                Live REST API
              </span>
            </div>
            <div className="card p-4 bg-white">
              <span className="type-caption text-caption block mb-1">Period High</span>
              <span className="text-xl font-heading font-semibold text-navy tabular-nums">
                {formatRate(high)}
              </span>
              <span className="type-caption text-caption block mt-1">{timeRange} peak</span>
            </div>
            <div className="card p-4 bg-white">
              <span className="type-caption text-caption block mb-1">Period Low</span>
              <span className="text-xl font-heading font-semibold text-navy tabular-nums">
                {formatRate(low)}
              </span>
              <span className="type-caption text-caption block mt-1">{timeRange} floor</span>
            </div>
            <div className="card p-4 bg-white">
              <span className="type-caption text-caption block mb-1">Inverse Rate</span>
              <span className="text-xl font-heading font-semibold text-navy tabular-nums">
                {formatRate(inverseRate)}
              </span>
              <span className="type-caption text-caption block mt-1 tabular-nums">
                1 {toCode} = {fromCode}
              </span>
            </div>
          </div>

          {/* Related Currency Pairs */}
          <RevealSection className="card p-6 bg-white">
            <h3 className="type-h3 text-navy mb-4">More {fromCode} Conversions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {relatedPairs.map(([f, t], idx) => (
                <RevealCard key={`${f}-${t}`} index={idx}>
                  <Link
                    href={`/converter/${f.toLowerCase()}-to-${t.toLowerCase()}`}
                    aria-label={`Convert ${f} to ${t}`}
                    className="min-h-[48px] p-3.5 rounded-xl border border-surface-200 hover:border-primary hover:bg-primary-pale flex items-center justify-between transition-colors duration-150 ease-fintech group"
                  >
                    <span className="font-semibold text-sm text-navy group-hover:text-primary">
                      {f} to {t}
                    </span>
                    <span className="type-caption text-navy font-semibold tabular-nums">
                      {formatRate(getLivePairRate(f, t))}
                    </span>
                  </Link>
                </RevealCard>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
