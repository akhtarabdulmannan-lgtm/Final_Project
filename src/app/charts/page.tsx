'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { currencies } from '@/data/currencies';
import { formatRate } from '@/lib/rates';
import { useLiveRates, useHistoricalSeries } from '@/hooks/useLiveRates';
import ApiStatusBanner from '@/components/ui/ApiStatusBanner';
import { Download, Share2, Info, Loader2, Check } from 'lucide-react';

type TimeRange = '1W' | '1M' | '3M' | '6M' | '1Y' | '5Y';

export default function ChartsPage() {
  const [fromCode, setFromCode] = useState('USD');
  const [toCode, setToCode] = useState('EUR');
  const [range, setRange] = useState<TimeRange>('1M');
  const [copied, setCopied] = useState(false);

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
  };

  const handleShare = async () => {
    if (typeof window === 'undefined') return;
    const shareUrl = `${window.location.origin}${window.location.pathname}?from=${fromCode}&to=${toCode}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback ignored
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 py-10 sm:py-16">
      <div className="container-vx">
        {/* Header */}
        <div className="mb-6">
          <span className="badge-brand">Forex Intelligence</span>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-surface-900 mt-2">
            Interactive FX Currency Charts
          </h1>
          <p className="text-sm text-surface-500 mt-1">
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
              <label className="text-xs font-semibold text-surface-500 block mb-1">Base Currency (From)</label>
              <select
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
              <label className="text-xs font-semibold text-surface-500 block mb-1">Quote Currency (To)</label>
              <select
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
                onClick={() => {
                  const temp = fromCode;
                  setFromCode(toCode);
                  setToCode(temp);
                }}
                className="btn-secondary w-full justify-center text-xs py-3"
              >
                Swap Currencies
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/send" className="btn-primary w-full justify-center text-xs py-3">
                Send {toCode} Now
              </Link>
            </div>
          </div>
        </div>

        {/* Main Chart Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-9 card p-6 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-surface-100 gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-surface-900">
                  1 {fromCode} = {formatRate(currentRate)} <span className="text-brand-500">{toCode}</span>
                </div>
                <div className="text-xs text-surface-400 mt-1 flex items-center gap-2">
                  <span className={stats.changePct >= 0 ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold'}>
                    {stats.changePct >= 0 ? '+' : ''}
                    {stats.changePct.toFixed(2)}% ({range})
                  </span>
                  <span>• {seriesSource}</span>
                </div>
              </div>

              {/* Time Range Tabs */}
              <div className="flex flex-wrap rounded-xl bg-surface-100 p-1 text-xs">
                {(['1W', '1M', '3M', '6M', '1Y', '5Y'] as const).map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setRange(t)}
                    className={`px-3 py-1.5 font-bold rounded-lg transition-all ${
                      range === t ? 'bg-white text-brand-600 shadow-sm' : 'text-surface-600 hover:text-surface-900'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {seriesNotice && (
              <div className="mt-4 rounded-xl bg-surface-50 border border-surface-200 px-3 py-2 text-xs text-surface-600">
                {seriesNotice}
              </div>
            )}

            {/* Recharts Area */}
            <div className="h-96 w-full pt-6 relative">
              {seriesLoading ? (
                <div className="h-full flex items-center justify-center gap-2 text-sm text-surface-500">
                  <Loader2 className="w-5 h-5 animate-spin text-brand-500" />
                  Loading historical series from API...
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0052FF" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#0052FF" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#64748B', fontSize: 11 }}
                      tickFormatter={(d) => d.slice(5)}
                    />
                    <YAxis
                      domain={['auto', 'auto']}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#64748B', fontSize: 11 }}
                      tickFormatter={(v) => formatRate(v)}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0A1628', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                      formatter={(v: number) => [`${formatRate(v)} ${toCode}`, 'Rate']}
                    />
                    <Area
                      type="monotone"
                      dataKey="rate"
                      stroke="#0052FF"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#chartColor)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-surface-100 text-xs text-surface-400">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5" /> Period statistics computed across {chartData.length} daily observations
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleExportCsv}
                  className="flex items-center gap-1 hover:text-brand-500 font-semibold text-surface-600"
                >
                  <Download className="w-3.5 h-3.5" /> Export CSV
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-1 hover:text-brand-500 font-semibold text-surface-600 ml-3"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied Link
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" /> Share
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <div className="card p-5 bg-white space-y-4">
              <h3 className="font-heading font-bold text-base text-surface-900 border-b border-surface-100 pb-2">
                {range} Period Summary
              </h3>
              <div>
                <span className="text-xs text-surface-400 block">Period High</span>
                <span className="text-lg font-bold font-mono text-surface-900">{formatRate(stats.high)}</span>
              </div>
              <div>
                <span className="text-xs text-surface-400 block">Period Low</span>
                <span className="text-lg font-bold font-mono text-surface-900">{formatRate(stats.low)}</span>
              </div>
              <div>
                <span className="text-xs text-surface-400 block">Period Average</span>
                <span className="text-lg font-bold font-mono text-surface-900">{formatRate(stats.avg)}</span>
              </div>
              <div>
                <span className="text-xs text-surface-400 block">Inverse (1 {toCode} =)</span>
                <span className="text-lg font-bold font-mono text-surface-900">
                  {formatRate(currentRate > 0 ? 1 / currentRate : 0)} {fromCode}
                </span>
              </div>
              <div className="pt-2">
                <Link href="/alerts" className="btn-primary w-full justify-center text-xs">
                  Set Free Rate Alert
                </Link>
              </div>
            </div>

            <div className="card p-5 bg-gradient-to-br from-brand-900 to-brand-950 text-white space-y-3">
              <h4 className="font-bold text-sm">Transferring {fromCode}?</h4>
              <p className="text-xs text-surface-300">
                Lock in this rate before markets shift. Fast delivery to 190+ countries with $0 fees on transfers of $5,000+.
              </p>
              <Link href="/send" className="btn-teal btn-sm w-full justify-center">
                Send Money Abroad
              </Link>
            </div>
          </div>
        </div>

        {/* Historical Table Preview */}
        <div className="card p-6 bg-white">
          <h3 className="font-heading font-bold text-lg text-surface-900 mb-4">
            Recent {fromCode} to {toCode} Daily Close Rates
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-surface-50 text-xs font-semibold text-surface-500 uppercase border-b border-surface-200">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Close Rate</th>
                  <th className="py-3 px-4">100 {fromCode} Equivalent</th>
                  <th className="py-3 px-4">Inverse Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 font-mono text-xs">
                {chartData
                  .slice(-7)
                  .reverse()
                  .map((row) => (
                    <tr key={row.date} className="hover:bg-surface-50">
                      <td className="py-3 px-4 font-medium text-surface-900">{row.date}</td>
                      <td className="py-3 px-4 font-bold text-surface-900">{formatRate(row.rate)}</td>
                      <td className="py-3 px-4 text-surface-600">
                        {formatRate(100 * row.rate)} {toCode}
                      </td>
                      <td className="py-3 px-4 text-surface-500">
                        {formatRate(row.rate > 0 ? 1 / row.rate : 0)} {fromCode}
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
