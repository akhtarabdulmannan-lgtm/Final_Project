'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { currencies } from '@/data/currencies';
import { getRate, formatRate, get24hChange, getHistoricalRates, get24hHigh, get24hLow } from '@/lib/rates';
import { TrendingUp, Download, Share2, ArrowRight, Calendar, Info } from 'lucide-react';

export default function ChartsPage() {
  const [fromCode, setFromCode] = useState('USD');
  const [toCode, setToCode] = useState('EUR');
  const [range, setRange] = useState<'1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | '5Y' | '10Y'>('1M');

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

  const currentRate = getRate(fromCode, toCode);
  const change = get24hChange(fromCode, toCode);
  const high24h = get24hHigh(fromCode, toCode);
  const low24h = get24hLow(fromCode, toCode);

  const chartData = useMemo(() => {
    return getHistoricalRates(fromCode, toCode, rangeDays[range]);
  }, [fromCode, toCode, range]);

  return (
    <div className="min-h-screen bg-surface-50 py-10 sm:py-16">
      <div className="container-vx">
        {/* Header */}
        <div className="mb-8">
          <span className="badge-brand">Forex Intelligence</span>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-surface-900 mt-2">
            Interactive FX Currency Charts
          </h1>
          <p className="text-sm text-surface-500 mt-1">
            Historical exchange rate trends spanning up to 10 years, built on high-precision mid-market tick data.
          </p>
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
                {currencies.map(c => (
                  <option key={c.code} value={c.code}>{c.flag} {c.code} - {c.name}</option>
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
                {currencies.map(c => (
                  <option key={c.code} value={c.code}>{c.flag} {c.code} - {c.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
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
              <Link
                href={`/send`}
                className="btn-primary w-full justify-center text-xs py-3"
              >
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
                  <span className={change >= 0 ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold'}>
                    {change >= 0 ? '+' : ''}{change.toFixed(2)}% past 24h
                  </span>
                  <span>• Mid-market rate</span>
                </div>
              </div>

              {/* Time Range Tabs */}
              <div className="flex flex-wrap rounded-xl bg-surface-100 p-1 text-xs">
                {(['1D', '1W', '1M', '3M', '6M', '1Y', '5Y', '10Y'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setRange(t)}
                    className={`px-2.5 py-1.5 font-bold rounded-lg transition-all ${
                      range === t ? 'bg-white text-brand-600 shadow-sm' : 'text-surface-600 hover:text-surface-900'
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
                  <Area type="monotone" dataKey="rate" stroke="#0052FF" strokeWidth={2.5} fillOpacity={1} fill="url(#chartColor)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-surface-100 text-xs text-surface-400">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5" /> Highs and lows are based on mid-market rates
              </span>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 hover:text-brand-500 font-semibold">
                  <Download className="w-3.5 h-3.5" /> Export CSV
                </button>
                <button className="flex items-center gap-1 hover:text-brand-500 font-semibold ml-3">
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <div className="card p-5 bg-white space-y-4">
              <h3 className="font-heading font-bold text-base text-surface-900 border-b border-surface-100 pb-2">
                Rate Overview
              </h3>
              <div>
                <span className="text-xs text-surface-400 block">24h High</span>
                <span className="text-lg font-bold font-mono text-surface-900">{formatRate(high24h)}</span>
              </div>
              <div>
                <span className="text-xs text-surface-400 block">24h Low</span>
                <span className="text-lg font-bold font-mono text-surface-900">{formatRate(low24h)}</span>
              </div>
              <div>
                <span className="text-xs text-surface-400 block">Inverse (1 {toCode} =)</span>
                <span className="text-lg font-bold font-mono text-surface-900">{formatRate(1 / currentRate)} {fromCode}</span>
              </div>
              <div className="pt-2">
                <Link href={`/alerts`} className="btn-primary w-full justify-center text-xs">
                  Set Free Rate Alert
                </Link>
              </div>
            </div>

            <div className="card p-5 bg-gradient-to-br from-brand-900 to-brand-950 text-white space-y-3">
              <h4 className="font-bold text-sm">Transferring {fromCode}?</h4>
              <p className="text-xs text-surface-300">
                Lock in this rate before markets shift. Fast delivery to 190+ countries with $0 fees on your first send.
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
            Recent {fromCode} to {toCode} Historical Close Rates
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-surface-50 text-xs font-semibold text-surface-500 uppercase border-b border-surface-200">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Close Rate</th>
                  <th className="py-3 px-4">Estimated 100 {fromCode}</th>
                  <th className="py-3 px-4">Inverse Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 font-mono text-xs">
                {chartData.slice(-7).reverse().map((row) => (
                  <tr key={row.date} className="hover:bg-surface-50">
                    <td className="py-3 px-4 font-sans font-medium text-surface-900">{row.date}</td>
                    <td className="py-3 px-4 font-bold text-surface-900">{formatRate(row.rate)}</td>
                    <td className="py-3 px-4 text-surface-600">{formatRate(100 * row.rate)} {toCode}</td>
                    <td className="py-3 px-4 text-surface-500">{formatRate(1 / row.rate)} {fromCode}</td>
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
