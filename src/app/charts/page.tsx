'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { currencies } from '@/data/currencies';
import { formatRate } from '@/lib/rates';
import { useLiveRates, useHistoricalSeries } from '@/hooks/useLiveRates';
import ApiStatusBanner from '@/components/ui/ApiStatusBanner';
import {
  RateFlash,
  RevealSection,
  Skeleton,
  useButtonFeedback,
  useHydrated,
  usePrefersReducedMotion,
} from '@/components/ui/MotionPrimitives';
import { ArrowLeftRight, Download, Share2, Info, Check } from 'lucide-react';

type TimeRange = '1W' | '1M' | '3M' | '6M' | '1Y' | '5Y';

export default function ChartsPage() {
  const [fromCode, setFromCode] = useState('USD');
  const [toCode, setToCode] = useState('EUR');
  const [range, setRange] = useState<TimeRange>('1M');
  const [swapCount, setSwapCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const hydrated = useHydrated();
  const reducedMotion = usePrefersReducedMotion();
  const exportFeedback = useButtonFeedback();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const f = params.get('from')?.toUpperCase();
    const t = params.get('to')?.toUpperCase();
    if (f && currencies.some((c) => c.code === f)) setFromCode(f);
    if (t && currencies.some((c) => c.code === t)) setToCode(t);
  }, []);

  const rangeDays: Record<TimeRange, number> = {
    '1W': 7,
    '1M': 30,
    '3M': 90,
    '6M': 180,
    '1Y': 365,
    '5Y': 1825,
  };

  const {
    data: spotData,
    isLoading: spotLoading,
    error: spotError,
    source: spotSource,
    lastUpdated,
    refresh,
    getLivePairRate,
  } = useLiveRates(fromCode);

  const {
    points: chartData,
    source: seriesSource,
    isLoading: seriesLoading,
    notice: seriesNotice,
  } = useHistoricalSeries(fromCode, toCode, rangeDays[range]);

  const currentRate = getLivePairRate(fromCode, toCode);

  const stats = useMemo(() => {
    if (!chartData.length) {
      return {
        high: currentRate,
        low: currentRate,
        avg: currentRate,
        changePct: 0,
      };
    }
    const vals = chartData.map((d) => d.rate);
    const high = Math.max(...vals);
    const low = Math.min(...vals);
    const avg = vals.reduce((acc, v) => acc + v, 0) / vals.length;
    const first = vals[0] || currentRate;
    const last = vals[vals.length - 1] || currentRate;
    const changePct = first > 0 ? ((last - first) / first) * 100 : 0;
    return { high, low, avg, changePct };
  }, [chartData, currentRate]);

  const isPositive = stats.changePct >= 0;

  const handleExportCsv = () => {
    if (!chartData.length) return;
    const header = `Date,${fromCode}_to_${toCode}_Rate,Inverse_${toCode}_to_${fromCode}\n`;
    const rows = chartData
      .map((row) => `${row.date},${formatRate(row.rate)},${formatRate(row.rate > 0 ? 1 / row.rate : 0)}`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fromCode}-${toCode}-${range}-rates.csv`;
    link.click();
    URL.revokeObjectURL(url);
    exportFeedback.triggerSuccess();
  };

  const handleShare = async () => {
    if (typeof window === 'undefined') return;
    const shareUrl = `${window.location.origin}${window.location.pathname}?from=${fromCode}&to=${toCode}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 800);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const handleSwap = () => {
    setSwapCount((c) => c + 1);
    setFromCode(toCode);
    setToCode(fromCode);
  };

  return (
    <div className="min-h-screen bg-page py-10 sm:py-16">
      <div className="container-vx">
        {/* Header */}
        <div className="mb-6">
          <span className="badge-brand">Forex Intelligence</span>
          <h1 className="type-h1 text-navy mt-2">
            Interactive FX Currency Charts
          </h1>
          <p className="type-body text-body mt-2">
            Historical exchange rate trends powered by live European Central Bank &amp; Open Exchange REST APIs.
          </p>
        </div>

        <div className="mb-6">
          <ApiStatusBanner
            isLoading={spotLoading || seriesLoading}
            error={spotError}
            source={`${seriesSource} • Spot: ${spotSource}`}
            lastUpdated={lastUpdated}
            onRefresh={refresh}
          />
        </div>

        {/* Currency Pair Picker */}
        <div className="card p-4 sm:p-6 bg-white mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
            <div>
              <label htmlFor="chart-from" className="form-label block mb-1.5">
                Base Currency (From)
              </label>
              <select
                id="chart-from"
                value={fromCode}
                onChange={(e) => setFromCode(e.target.value)}
                className="select-field text-sm font-semibold"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="chart-to" className="form-label block mb-1.5">
                Quote Currency (To)
              </label>
              <select
                id="chart-to"
                value={toCode}
                onChange={(e) => setToCode(e.target.value)}
                className="select-field text-sm font-semibold"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSwap}
                className="btn-secondary w-full justify-center"
              >
                <ArrowLeftRight
                  className="w-4 h-4 transition-transform duration-200 ease-fintech"
                  style={reducedMotion ? undefined : { transform: `rotate(${swapCount * 180}deg)` }}
                  aria-hidden="true"
                />
                Swap Currencies
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/converter/${fromCode.toLowerCase()}-to-${toCode.toLowerCase()}`}
                className="btn-primary w-full justify-center"
              >
                Convert {fromCode}/{toCode}
              </Link>
            </div>
          </div>
        </div>

        {/* Main Chart Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-9 card p-6 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-surface-200 gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-semibold text-navy tabular-nums">
                  <RateFlash key={`${fromCode}-${toCode}`} value={currentRate} ready={Boolean(spotData)}>
                    1 {fromCode} = {formatRate(currentRate)} {toCode}
                  </RateFlash>
                </div>
                <div className="type-caption text-caption mt-2 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold border tabular-nums ${
                      isPositive
                        ? 'bg-gain-bg text-gain-text border-gain-border'
                        : 'bg-loss-bg text-loss-text border-loss-border'
                    }`}
                  >
                    {isPositive ? '▲' : '▼'} {Math.abs(stats.changePct).toFixed(2)}% ({range})
                  </span>
                  <span>• {seriesSource}</span>
                </div>
              </div>

              {/* Time Range Tabs (>= 44px touch targets) */}
              <div
                className="flex flex-wrap rounded-xl bg-page border border-surface-200 p-1 gap-1"
                role="tablist"
                aria-label="Chart time range"
              >
                {(['1W', '1M', '3M', '6M', '1Y', '5Y'] as const).map((t) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={range === t}
                    key={t}
                    onClick={() => setRange(t)}
                    className={`min-h-[44px] min-w-[44px] px-3 py-2 type-caption font-semibold rounded-lg border transition-colors duration-150 ease-fintech ${
                      range === t
                        ? 'bg-primary-pale text-primary border-primary-border'
                        : 'border-transparent text-caption hover:text-navy'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {seriesNotice && (
              <div className="mt-4 rounded-xl bg-page border border-surface-200 px-3.5 py-2.5 type-caption text-body">
                {seriesNotice}
              </div>
            )}

            {/* Recharts Area — Flat Pale-Blue Fill (#EFF4FF) & Primary Stroke (#1D4ED8), Zero Gradients */}
            <div className="h-96 w-full pt-6 relative">
              {hydrated && seriesLoading ? (
                <div
                  className="h-full w-full flex flex-col justify-between p-4 rounded-2xl border border-surface-200 bg-page"
                  aria-busy="true"
                  aria-label="Loading historical exchange rate chart"
                >
                  <div className="flex justify-between gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-56 w-full rounded-xl" />
                  <div className="flex justify-between gap-2">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3E8F0" />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#5B6B82', fontSize: 12 }}
                      tickFormatter={(d) => d.slice(5)}
                    />
                    <YAxis
                      domain={['auto', 'auto']}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#5B6B82', fontSize: 12 }}
                      tickFormatter={(v) => formatRate(v)}
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
                      formatter={(v: number) => [`${formatRate(v)} ${toCode}`, 'Rate']}
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

            <div className="flex flex-wrap justify-between items-center pt-4 border-t border-surface-200 type-caption text-caption gap-2">
              <span className="flex items-center gap-1.5 tabular-nums">
                <Info className="w-4 h-4 flex-shrink-0" aria-hidden="true" /> Period statistics computed across {chartData.length} daily observations
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleExportCsv}
                  className="inline-flex items-center gap-1.5 min-h-[44px] px-3 rounded-xl text-primary hover:bg-primary-pale transition-colors duration-150 ease-fintech font-semibold"
                >
                  {exportFeedback.status === 'success' ? (
                    <>
                      <Check className="w-4 h-4 text-gain-text" aria-hidden="true" /> Exported
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" aria-hidden="true" /> Export CSV
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 min-h-[44px] px-3 rounded-xl text-primary hover:bg-primary-pale transition-colors duration-150 ease-fintech font-semibold"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-gain-text" aria-hidden="true" /> Copied Link
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" aria-hidden="true" /> Share
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <div className="card p-5 bg-white space-y-4">
              <h3 className="type-h3 text-navy border-b border-surface-200 pb-2">
                {range} Period Summary
              </h3>
              <div>
                <span className="type-caption text-caption block">Period High</span>
                <span className="text-lg font-semibold text-navy tabular-nums">
                  {hydrated && seriesLoading ? <Skeleton className="h-6 w-24" /> : formatRate(stats.high)}
                </span>
              </div>
              <div>
                <span className="type-caption text-caption block">Period Low</span>
                <span className="text-lg font-semibold text-navy tabular-nums">
                  {hydrated && seriesLoading ? <Skeleton className="h-6 w-24" /> : formatRate(stats.low)}
                </span>
              </div>
              <div>
                <span className="type-caption text-caption block">Period Average</span>
                <span className="text-lg font-semibold text-navy tabular-nums">
                  {hydrated && seriesLoading ? <Skeleton className="h-6 w-24" /> : formatRate(stats.avg)}
                </span>
              </div>
              <div>
                <span className="type-caption text-caption block">Inverse (1 {toCode} =)</span>
                <span className="text-lg font-semibold text-navy tabular-nums">
                  {formatRate(currentRate > 0 ? 1 / currentRate : 0)} {fromCode}
                </span>
              </div>
              <div className="pt-2">
                <Link href="/alerts" className="btn-primary w-full justify-center">
                  Set Free Rate Alert
                </Link>
              </div>
            </div>

            <div className="card-dark p-5 space-y-3">
              <h4 className="font-heading font-semibold text-base text-white">Comparing {fromCode} Markets?</h4>
              <p className="type-caption text-[#C9D3E3]">
                Inspect regional exchange matrices, pin favorite currencies to your watchlist, and switch between live central-bank and market feeds.
              </p>
              <Link href="/rates" className="btn-primary btn-sm w-full justify-center">
                Explore Live Rate Matrix
              </Link>
            </div>
          </div>
        </div>

        {/* Major Pairs Quick Switch */}
        <RevealSection className="card p-6 bg-white">
          <h3 className="type-h3 text-navy mb-4">Quick Switch Popular Pairs</h3>
          <div className="flex flex-wrap gap-2">
            {[
              ['USD', 'EUR'],
              ['EUR', 'PKR'],
              ['USD', 'PKR'],
              ['GBP', 'USD'],
              ['USD', 'JPY'],
              ['USD', 'CAD'],
              ['AUD', 'USD'],
              ['EUR', 'GBP'],
            ].map(([f, t]) => {
              const active = fromCode === f && toCode === t;
              return (
                <button
                  key={`${f}-${t}`}
                  type="button"
                  aria-label={`View ${f} to ${t} chart`}
                  onClick={() => {
                    setFromCode(f);
                    setToCode(t);
                  }}
                  className={`min-h-[44px] px-4 py-2 rounded-xl type-caption font-semibold border transition-colors duration-150 ease-fintech ${
                    active
                      ? 'bg-primary-pale text-primary border-primary-border'
                      : 'bg-page text-navy border-surface-200 hover:border-primary hover:text-primary'
                  }`}
                >
                  {f} / {t}
                </button>
              );
            })}
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
