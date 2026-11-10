'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import CurrencyConverter from '@/components/sections/CurrencyConverter';
import LiveRateValue from '@/components/ui/LiveRateValue';
import LiveUpdatedBadge from '@/components/ui/LiveUpdatedBadge';
import DeltaChip from '@/components/ui/DeltaChip';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { ChartSkeleton } from '@/components/ui/Skeleton';
import { getCurrency, currencies } from '@/data/currencies';
import { getTickedRate, formatRate, get24hChange, getHistoricalRates, get24hHigh, get24hLow } from '@/lib/rates';
import { useLiveTick } from '@/hooks';
import { wait } from '@/lib/utils';
import { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function DynamicPairPage() {
  const params = useParams();
  const pairParam = (params?.pair as string) || 'usd-to-eur';
  const parts = pairParam.split('-to-');
  const fromCode = (parts[0] || 'USD').toUpperCase();
  const toCode = (parts[1] || 'EUR').toUpperCase();

  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');
  const [chartLoading, setChartLoading] = useState(false);
  const { tick, utcTime } = useLiveTick(7000);

  const daysMap = {
    '7D': 7,
    '30D': 30,
    '90D': 90,
    '1Y': 365,
  };

  const fromCurrency = getCurrency(fromCode) || { code: fromCode, name: fromCode, symbol: '$', flag: '🌐', region: 'Global' };
  const toCurrency = getCurrency(toCode) || { code: toCode, name: toCode, symbol: '€', flag: '🌐', region: 'Global' };

  const currentRate = getTickedRate(fromCode, toCode, tick);
  const inverseRate = 1 / currentRate;
  const change24h = get24hChange(fromCode, toCode);
  const high24h = get24hHigh(fromCode, toCode);
  const low24h = get24hLow(fromCode, toCode);

  const chartData = useMemo(() => {
    return getHistoricalRates(fromCode, toCode, daysMap[timeRange]);
  }, [fromCode, toCode, timeRange]);

  const relatedPairs = currencies
    .filter((c) => c.code !== fromCode && c.code !== toCode)
    .slice(0, 6)
    .map((c) => [fromCode, c.code]);

  const handleRangeChange = async (range: '7D' | '30D' | '90D' | '1Y') => {
    setChartLoading(true);
    setTimeRange(range);
    await wait(220);
    setChartLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg pb-16">
      {/* Breadcrumb Bar */}
      <div className="bg-surface border-b border-line">
        <div className="container-vx py-2 flex items-center gap-2 text-caption text-ink-500">
          <Link href="/" className="min-h-[44px] inline-flex items-center hover:text-ink">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/converter" className="min-h-[44px] inline-flex items-center hover:text-ink">
            Converter
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-ink">
            {fromCode} to {toCode}
          </span>
        </div>
      </div>

      {/* Header & Converter */}
      <section className="bg-surface border-b border-line py-12">
        <div className="container-vx">
          <div className="max-w-3xl mb-8 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge-neutral tabular-nums">
                <span aria-hidden="true">{fromCurrency.flag}</span>
                <span>
                  1 {fromCode} ={' '}
                  <LiveRateValue
                    value={currentRate}
                    pairKey={`${fromCode}-${toCode}`}
                    formatted={formatRate(currentRate)}
                  />{' '}
                  {toCode}
                </span>
                <span aria-hidden="true">{toCurrency.flag}</span>
              </span>
              <DeltaChip change={change24h} suffix="(24h)" />
              <LiveUpdatedBadge utcTime={utcTime} />
            </div>
            <h1>
              Convert {fromCurrency.name} to {toCurrency.name}
            </h1>
            <p className="text-ink-500">
              Live mid-market exchange rate between {fromCode} and {toCode}. Updated continuously with transparent transfer options.
            </p>
          </div>

          <div className="flex justify-center">
            <CurrencyConverter defaultFrom={fromCode} defaultTo={toCode} defaultAmount={1000} />
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <section className="py-12">
        <div className="container-vx space-y-8">
          {chartLoading ? (
            <ChartSkeleton />
          ) : (
            <div className="card p-6 bg-surface">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-line gap-4">
                <div>
                  <span className="text-caption font-medium text-ink-500 uppercase tracking-wider">
                    Historical Trend
                  </span>
                  <h2 className="mt-1">
                    {fromCode} to {toCode} Exchange Rate Chart
                  </h2>
                </div>

                {/* Time Range Selector */}
                <div className="flex rounded-xl bg-surface-subtle p-1 gap-1" role="group" aria-label="Chart time range">
                  {(['7D', '30D', '90D', '1Y'] as const).map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => handleRangeChange(range)}
                      aria-pressed={timeRange === range}
                      className={`px-3 min-h-[44px] text-[13px] font-medium rounded-lg transition-colors duration-150 tabular-nums ${
                        timeRange === range
                          ? 'bg-surface text-ink border border-line'
                          : 'text-ink-500 hover:text-ink'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-80 w-full pt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E1E5EC" />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#4B5565', fontSize: 12, fontFamily: 'var(--font-inter)' }}
                      tickFormatter={(str) => str.slice(5)}
                    />
                    <YAxis
                      domain={['auto', 'auto']}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#4B5565', fontSize: 12, fontFamily: 'var(--font-inter)' }}
                      tickFormatter={(val) => formatRate(val)}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#111418',
                        borderRadius: '12px',
                        border: '1px solid #282E38',
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
                      stroke="#111418"
                      strokeWidth={2}
                      fill="#111418"
                      fillOpacity={0.07}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Rate Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card p-4">
              <span className="text-caption text-ink-500 block mb-1">Current Mid-Market</span>
              <span className="text-[20px] leading-[28px] font-semibold text-ink tabular-nums">
                {formatRate(currentRate)}
              </span>
              <span className="text-caption text-ink-500 block mt-1">Live Interbank</span>
            </div>
            <div className="card p-4">
              <span className="text-caption text-ink-500 block mb-1">24h High</span>
              <span className="text-[20px] leading-[28px] font-semibold text-ink tabular-nums">
                {formatRate(high24h)}
              </span>
              <span className="text-caption text-ink-500 block mt-1">Daily peak</span>
            </div>
            <div className="card p-4">
              <span className="text-caption text-ink-500 block mb-1">24h Low</span>
              <span className="text-[20px] leading-[28px] font-semibold text-ink tabular-nums">
                {formatRate(low24h)}
              </span>
              <span className="text-caption text-ink-500 block mt-1">Daily floor</span>
            </div>
            <div className="card p-4">
              <span className="text-caption text-ink-500 block mb-1">Inverse Rate</span>
              <span className="text-[20px] leading-[28px] font-semibold text-ink tabular-nums">
                {formatRate(inverseRate)}
              </span>
              <span className="text-caption text-ink-500 block mt-1">
                1 {toCode} = {fromCode}
              </span>
            </div>
          </div>

          {/* Related Currency Pairs */}
          <div className="card p-6">
            <h3 className="mb-4">More {fromCode} Conversions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {relatedPairs.map(([f, t], index) => (
                <ScrollReveal key={`${f}-${t}`} delay={index * 50}>
                  <Link
                    href={`/converter/${f.toLowerCase()}-to-${t.toLowerCase()}`}
                    aria-label={`Convert ${f} to ${t}`}
                    className="card-interactive p-4 flex items-center justify-between"
                  >
                    <span className="font-medium text-[15px] text-ink">
                      {f} to {t}
                    </span>
                    <span className="text-[14px] text-ink-500 tabular-nums">
                      {formatRate(getTickedRate(f, t, tick))}
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
