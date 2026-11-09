'use client';

import { useState, useMemo } from 'react';
import { ArrowLeftRight, Check, Download } from 'lucide-react';
import { currencies } from '@/data/currencies';
import { getRate, formatRate, getHistoricalRates } from '@/lib/rates';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import {
  RevealSection,
  useButtonFeedback,
  usePrefersReducedMotion,
} from '@/components/ui/MotionPrimitives';

export default function HistoricalRatesPage() {
  const [fromCode, setFromCode] = useState('USD');
  const [toCode, setToCode] = useState('EUR');
  const [selectedDays, setSelectedDays] = useState(90);
  const [swapCount, setSwapCount] = useState(0);

  const reducedMotion = usePrefersReducedMotion();
  const csvFeedback = useButtonFeedback();

  const chartData = useMemo(() => {
    return getHistoricalRates(fromCode, toCode, selectedDays);
  }, [fromCode, toCode, selectedDays]);

  const currentRate = getRate(fromCode, toCode);

  const handleDownloadCsv = () => {
    const header = `Date,${fromCode}_to_${toCode}_Rate,100_${fromCode}_in_${toCode},Inverse_${toCode}_to_${fromCode}\n`;
    const rows = chartData
      .map(
        (row) =>
          `${row.date},${formatRate(row.rate)},${formatRate(100 * row.rate)},${formatRate(1 / row.rate)}`
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fromCode}-${toCode}-historical-${selectedDays}d.csv`;
    link.click();
    URL.revokeObjectURL(url);
    csvFeedback.triggerSuccess();
  };

  const handleInvert = () => {
    setSwapCount((c) => c + 1);
    setFromCode(toCode);
    setToCode(fromCode);
  };

  return (
    <div className="min-h-screen bg-page py-10 sm:py-16">
      <div className="container-vx">
        {/* Header */}
        <div className="mb-8">
          <span className="badge-brand">Archive Intelligence</span>
          <h1 className="type-h1 text-navy mt-2">
            Historical Currency Exchange Rates
          </h1>
          <p className="type-body text-body mt-2">
            Access reliable historical FX closing prices, monthly averages, and volatility data dating back to 1998.
          </p>
        </div>

        {/* Controls */}
        <div className="card p-6 bg-white mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
            <div>
              <label htmlFor="hist-from" className="form-label block mb-1.5">
                From Currency
              </label>
              <select
                id="hist-from"
                value={fromCode}
                onChange={(e) => setFromCode(e.target.value)}
                className="select-field text-sm font-semibold"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="hist-to" className="form-label block mb-1.5">
                To Currency
              </label>
              <select
                id="hist-to"
                value={toCode}
                onChange={(e) => setToCode(e.target.value)}
                className="select-field text-sm font-semibold"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="hist-horizon" className="form-label block mb-1.5">
                Time Horizon
              </label>
              <select
                id="hist-horizon"
                value={selectedDays}
                onChange={(e) => setSelectedDays(Number(e.target.value))}
                className="select-field text-sm font-semibold"
              >
                <option value={30}>Last 30 Days</option>
                <option value={90}>Last 90 Days</option>
                <option value={180}>Last 6 Months</option>
                <option value={365}>Last 1 Year</option>
                <option value={1825}>Last 5 Years</option>
                <option value={3650}>Last 10 Years</option>
              </select>
            </div>

            <div>
              <button
                type="button"
                onClick={handleInvert}
                className="btn-secondary w-full justify-center"
              >
                <ArrowLeftRight
                  className="w-4 h-4 transition-transform duration-200 ease-fintech"
                  style={reducedMotion ? undefined : { transform: `rotate(${swapCount * 180}deg)` }}
                  aria-hidden="true"
                />
                Invert Currency Pair
              </button>
            </div>
          </div>
        </div>

        {/* Chart View */}
        <div className="card p-6 bg-white mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-surface-200 gap-4">
            <div>
              <span className="type-caption text-caption font-semibold uppercase">Historical Closing Rate</span>
              <div className="text-2xl font-heading font-semibold text-navy tabular-nums mt-1">
                1 {fromCode} = {formatRate(currentRate)} {toCode}
              </div>
            </div>
            <button
              type="button"
              onClick={handleDownloadCsv}
              className="btn-secondary btn-sm self-start sm:self-auto"
            >
              {csvFeedback.status === 'success' ? (
                <>
                  <Check className="w-4 h-4 text-gain-text" aria-hidden="true" /> CSV Downloaded
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" aria-hidden="true" /> Download Historical CSV
                </>
              )}
            </button>
          </div>

          <div className="h-80 w-full pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
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
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#1D4ED8"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={!reducedMotion}
                  animationDuration={250}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Historical Table (14px table text + tabular-nums) */}
        <RevealSection className="card p-6 bg-white">
          <h3 className="type-h3 text-navy mb-4">Daily Closing Rates Ledger</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-page type-caption font-semibold text-caption uppercase border-b border-surface-200">
                <tr>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Daily Rate</th>
                  <th className="py-3.5 px-4">
                    100 {fromCode} in {toCode}
                  </th>
                  <th className="py-3.5 px-4">Inverse Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 tabular-nums">
                {chartData
                  .slice(-15)
                  .reverse()
                  .map((item) => (
                    <tr key={item.date} className="hover:bg-page transition-colors duration-150 ease-fintech">
                      <td className="py-3.5 px-4 font-medium text-navy">{item.date}</td>
                      <td className="py-3.5 px-4 font-semibold text-navy">{formatRate(item.rate)}</td>
                      <td className="py-3.5 px-4 text-navy font-medium">
                        {formatRate(100 * item.rate)} {toCode}
                      </td>
                      <td className="py-3.5 px-4 text-caption">
                        {formatRate(1 / item.rate)} {fromCode}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
