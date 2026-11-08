'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calendar, Download, RefreshCw, ArrowRight, TrendingUp } from 'lucide-react';
import { currencies } from '@/data/currencies';
import { getRate, formatRate, getHistoricalRates } from '@/lib/rates';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function HistoricalRatesPage() {
  const [fromCode, setFromCode] = useState('USD');
  const [toCode, setToCode] = useState('EUR');
  const [selectedDays, setSelectedDays] = useState(90);

  const chartData = useMemo(() => {
    return getHistoricalRates(fromCode, toCode, selectedDays);
  }, [fromCode, toCode, selectedDays]);

  const currentRate = getRate(fromCode, toCode);

  return (
    <div className="min-h-screen bg-surface-50 py-10 sm:py-16">
      <div className="container-vx">
        {/* Header */}
        <div className="mb-8">
          <span className="badge-brand">Archive Intelligence</span>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-surface-900 mt-2">
            Historical Currency Exchange Rates
          </h1>
          <p className="text-sm text-surface-500 mt-1">
            Access reliable historical FX closing prices, monthly averages, and volatility data dating back to 1998.
          </p>
        </div>

        {/* Controls */}
        <div className="card p-6 bg-white mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="text-xs font-semibold text-surface-600 block mb-1">From Currency</label>
              <select
                value={fromCode}
                onChange={(e) => setFromCode(e.target.value)}
                className="select-field text-sm font-semibold"
              >
                {currencies.map(c => (
                  <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-surface-600 block mb-1">To Currency</label>
              <select
                value={toCode}
                onChange={(e) => setToCode(e.target.value)}
                className="select-field text-sm font-semibold"
              >
                {currencies.map(c => (
                  <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-surface-600 block mb-1">Time Horizon</label>
              <select
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
                onClick={() => {
                  const temp = fromCode;
                  setFromCode(toCode);
                  setToCode(temp);
                }}
                className="btn-secondary w-full justify-center text-xs py-3"
              >
                Invert Currency Pair
              </button>
            </div>
          </div>
        </div>

        {/* Chart View */}
        <div className="card p-6 bg-white mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-surface-100 gap-4">
            <div>
              <span className="text-xs text-surface-400 font-semibold uppercase">Historical Closing Rate</span>
              <div className="text-2xl font-bold font-mono text-surface-900 mt-1">
                1 {fromCode} = {formatRate(currentRate)} {toCode}
              </div>
            </div>
            <button className="btn-secondary btn-sm flex items-center gap-1.5 self-start sm:self-auto">
              <Download className="w-3.5 h-3.5" /> Download Historical CSV
            </button>
          </div>

          <div className="h-80 w-full pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
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
                <Line type="monotone" dataKey="rate" stroke="#0052FF" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Historical Table */}
        <div className="card p-6 bg-white">
          <h3 className="font-heading font-bold text-lg text-surface-900 mb-4">
            Daily Closing Rates Ledger
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-50 text-xs font-bold text-surface-500 uppercase border-b border-surface-200">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Daily Rate</th>
                  <th className="py-3 px-4">100 {fromCode} in {toCode}</th>
                  <th className="py-3 px-4">Inverse Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 font-mono text-xs">
                {chartData.slice(-15).reverse().map((item) => (
                  <tr key={item.date} className="hover:bg-surface-50">
                    <td className="py-3 px-4 font-sans font-medium text-surface-900">{item.date}</td>
                    <td className="py-3 px-4 font-bold text-surface-900">{formatRate(item.rate)}</td>
                    <td className="py-3 px-4 text-surface-600">{formatRate(100 * item.rate)} {toCode}</td>
                    <td className="py-3 px-4 text-surface-500">{formatRate(1 / item.rate)} {fromCode}</td>
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
