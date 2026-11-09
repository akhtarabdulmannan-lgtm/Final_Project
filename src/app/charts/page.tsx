'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { currencies } from '@/data/currencies';
import { getTickedRate, formatRate, get24hChange, getHistoricalRates, get24hHigh, get24hLow } from '@/lib/rates';
import { useLiveTick } from '@/hooks';
import { wait } from '@/lib/utils';
import { Download, Share2, Info, ArrowLeftRight } from 'lucide-react';
import LiveRateValue from '@/components/ui/LiveRateValue';
import LiveUpdatedBadge from '@/components/ui/LiveUpdatedBadge';
import DeltaChip from '@/components/ui/DeltaChip';
import ActionButton from '@/components/ui/ActionButton';
import { ChartSkeleton } from '@/components/ui/Skeleton';

export default function ChartsPage() {
  const [fromCode, setFromCode] = useState('USD');
  const [toCode, setToCode] = useState('EUR');
  const [range, setRange] = useState<'1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | '5Y' | '10Y'>('1M');
  const [swapCount, setSwapCount] = useState(0);
  const [isLoadingChart, setIsLoadingChart] = useState(false);

  const { tick, utcTime } = useLiveTick(7000);

  const rangeDays: Record<string, number> = {
    '1D': 1,
    '1W': 7,
    '1M': 30,
    '3M': 90,
    '6M': 180,
    '1Y': 365,
    '5Y': 1825,
    '10Y': 3650,
  };

  const currentRate = getTickedRate(fromCode, toCode, tick);
  const change = get24hChange(fromCode, toCode);
  const high24h = get24hHigh(fromCode, toCode);
  const low24h = get24hLow(fromCode, toCode);

  const chartData = useMemo(() => {
    return getHistoricalRates(fromCode, toCode, rangeDays[range]);
  }, [fromCode, toCode, range]);

  const triggerLoading = async (updateFn: () => void) => {
    setIsLoadingChart(true);
    updateFn();
    await wait(240);
    setIsLoadingChart(false);
  };

  const handleSwap = () => {
    setSwapCount((c) => c + 1);
    triggerLoading(() => {
      setFromCode(toCode);
      setToCode(fromCode);
    });
  };

  const handleExportCsv = async () => {
    const rows = ['date,rate', ...chartData.map((r) => `${r.date},${formatRate(r.rate)}`)].join('\n');
    const blob = new Blob([rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fromCode}-${toCode}-${range}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    await wait(300);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    await navigator.clipboard?.writeText(shareUrl);
    await wait(250);
  };

  return (
    <div className="min-h-screen bg-bg py-10 sm:py-16">
      <div className="container-vx">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="badge-neutral">Forex Intelligence</span>
            <LiveUpdatedBadge utcTime={utcTime} />
          </div>
          <h1>Interactive FX Currency Charts</h1>
          <p className="text-ink-500">
            Historical exchange rate trends spanning up to 10 years, built on mid-market tick data.
          </p>
        </div>

        {/* Currency Pair Picker */}
        <div className="card p-4 sm:p-6 bg-surface mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label htmlFor="charts-from" className="block mb-1.5">
                Base Currency (From)
              </label>
              <select
                id="charts-from"
                value={fromCode}
                onChange={(e) => triggerLoading(() => setFromCode(e.target.value))}
                className="select-field text-[14px] font-medium"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="charts-to" className="block mb-1.5">
                Quote Currency (To)
              </label>
              <select
                id="charts-to"
                value={toCode}
                onChange={(e) => triggerLoading(() => setToCode(e.target.value))}
                className="select-field text-[14px] font-medium"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleSwap}
              className="btn-secondary w-full justify-center"
            >
              <ArrowLeftRight
                aria-hidden="true"
                className="w-4 h-4 transition-transform duration-200 ease-fintech"
                style={{ transform: `rotate(${swapCount * 180}deg)` }}
              />
              <span>Swap Currencies</span>
            </button>

            <Link href="/send" className="btn-primary w-full justify-center">
              Send {toCode} Now
            </Link>
          </div>
        </div>

        {/* Main Chart & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-9">
            {isLoadingChart ? (
              <ChartSkeleton />
            ) : (
              <div className="card p-6 bg-surface">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-line gap-4">
                  <div>
                    <div className="text-[24px] sm:text-[32px] leading-[36px] font-heading font-semibold text-ink tabular-nums">
                      1 {fromCode} ={' '}
                      <LiveRateValue
                        value={currentRate}
                        pairKey={`${fromCode}-${toCode}`}
                        formatted={formatRate(currentRate)}
                      />{' '}
                      {toCode}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-caption text-ink-500">
                      <DeltaChip change={change} suffix="past 24h" />
                      <span>• Mid-market rate</span>
                    </div>
                  </div>

                  {/* Time Range Tabs */}
                  <div className="flex flex-wrap rounded-xl bg-surface-subtle p-1 gap-1" role="group" aria-label="Chart period">
                    {(['1D', '1W', '1M', '3M', '6M', '1Y', '5Y', '10Y'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => triggerLoading(() => setRange(t))}
                        aria-pressed={range === t}
                        className={`px-3 min-h-[44px] text-[13px] font-medium rounded-lg transition-colors duration-150 tabular-nums ${
                          range === t
                            ? 'bg-surface text-ink border border-line'
                            : 'text-ink-500 hover:text-ink'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recharts Area */}
                <div className="h-96 w-full pt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E1E5EC" />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: '#4B5565', fontSize: 12, fontFamily: 'var(--font-inter)' }}
                        tickFormatter={(d) => d.slice(5)}
                      />
                      <YAxis
                        domain={['auto', 'auto']}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: '#4B5565', fontSize: 12, fontFamily: 'var(--font-inter)' }}
                        tickFormatter={(v) => formatRate(v)}
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
                        formatter={(v: number) => [`${formatRate(v)} ${toCode}`, 'Rate']}
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

                <div className="flex flex-wrap justify-between items-center pt-4 border-t border-line gap-3 text-caption text-ink-500">
                  <span className="flex items-center gap-1.5">
                    <Info className="w-4 h-4" aria-hidden="true" />
                    <span>Highs and lows are based on mid-market rates</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <ActionButton variant="ghost" onAction={handleExportCsv} successLabel="Downloaded" className="btn-sm">
                      <span className="inline-flex items-center gap-1.5">
                        <Download className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Export CSV</span>
                      </span>
                    </ActionButton>
                    <ActionButton variant="ghost" onAction={handleShare} successLabel="Copied Link" className="btn-sm">
                      <span className="inline-flex items-center gap-1.5">
                        <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Share</span>
                      </span>
                    </ActionButton>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <div className="card p-5 bg-surface space-y-4">
              <h3 className="text-[18px] leading-[24px] border-b border-line pb-2">Rate Overview</h3>
              <div>
                <span className="text-caption text-ink-500 block">24h High</span>
                <span className="text-[18px] font-semibold text-ink tabular-nums">
                  {formatRate(high24h)}
                </span>
              </div>
              <div>
                <span className="text-caption text-ink-500 block">24h Low</span>
                <span className="text-[18px] font-semibold text-ink tabular-nums">
                  {formatRate(low24h)}
                </span>
              </div>
              <div>
                <span className="text-caption text-ink-500 block">Inverse (1 {toCode} =)</span>
                <span className="text-[18px] font-semibold text-ink tabular-nums">
                  {formatRate(1 / currentRate)} {fromCode}
                </span>
              </div>
              <div className="pt-2">
                <Link href="/alerts" className="btn-primary w-full justify-center btn-sm">
                  Set Free Rate Alert
                </Link>
              </div>
            </div>

            <div className="card-invert p-5 space-y-3">
              <h3 className="text-[18px] leading-[24px] text-ink-invert">Transferring {fromCode}?</h3>
              <p className="text-[14px] leading-[22px] text-ink-invert-muted">
                Lock in this rate before markets shift. Fast delivery to 190+ countries with $0 fees on qualifying transfers.
              </p>
              <Link href="/send" className="btn-invert btn-sm w-full justify-center">
                Send Money Abroad
              </Link>
            </div>
          </div>
        </div>

        {/* Historical Table Preview */}
        <div className="card p-6 bg-surface">
          <h3 className="mb-4">
            Recent {fromCode} to {toCode} Historical Close Rates
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-subtle text-caption font-medium text-ink-500 uppercase border-b border-line">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Close Rate</th>
                  <th className="py-3 px-4">Estimated 100 {fromCode}</th>
                  <th className="py-3 px-4">Inverse Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line tabular-nums">
                {chartData.slice(-7).reverse().map((row) => (
                  <tr key={row.date} className="hover:bg-surface-subtle/60">
                    <td className="py-3 px-4 font-medium text-ink">{row.date}</td>
                    <td className="py-3 px-4 font-semibold text-ink">{formatRate(row.rate)}</td>
                    <td className="py-3 px-4 text-ink-700">
                      {formatRate(100 * row.rate)} {toCode}
                    </td>
                    <td className="py-3 px-4 text-ink-500">
                      {formatRate(1 / row.rate)} {fromCode}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
