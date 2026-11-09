'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowUpDown, Plus, ExternalLink, Star } from 'lucide-react';
import { currencies } from '@/data/currencies';
import { formatRate, get24hChange } from '@/lib/rates';
import { useLiveRates } from '@/hooks/useLiveRates';
import ApiStatusBanner from '@/components/ui/ApiStatusBanner';

export default function RatesPage() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInverse, setIsInverse] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [pinnedCodes, setPinnedCodes] = useState<string[]>(['EUR', 'GBP', 'JPY', 'PKR']);
  const [showAddModal, setShowAddModal] = useState(false);

  const { isLoading, error, source, lastUpdated, refresh, getLivePairRate } = useLiveRates(baseCurrency);

  const regions = ['All', 'Europe', 'Asia', 'North America', 'South America', 'Middle East', 'Africa', 'Oceania', 'Metals', 'Crypto'];

  const togglePin = (code: string) => {
    setPinnedCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [code, ...prev]
    );
  };

  const filteredCurrencies = useMemo(() => {
    const list = currencies.filter((c) => {
      if (c.code === baseCurrency) return false;
      const matchesSearch =
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });

    return [...list].sort((a, b) => {
      const aPinned = pinnedCodes.includes(a.code) ? 0 : 1;
      const bPinned = pinnedCodes.includes(b.code) ? 0 : 1;
      return aPinned - bPinned;
    });
  }, [baseCurrency, searchQuery, selectedRegion, pinnedCodes]);

  return (
    <div className="min-h-screen bg-surface-50 py-10 sm:py-16">
      <div className="container-vx">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <span className="badge-brand">Market Intelligence</span>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-surface-900 mt-2">
              Live Currency Exchange Rates
            </h1>
            <p className="text-sm text-surface-500 mt-1">
              Real-time mid-market rates fetched asynchronously from public foreign exchange REST APIs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsInverse(!isInverse)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isInverse
                  ? 'bg-brand-500 text-white border-brand-500'
                  : 'bg-white text-surface-700 border-surface-300 hover:bg-surface-100'
              }`}
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              Inverse Rates: {isInverse ? 'ON' : 'OFF'}
            </button>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="btn-primary btn-sm flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Pin Currency
            </button>
          </div>
        </div>

        <div className="mb-6">
          <ApiStatusBanner
            isLoading={isLoading}
            error={error}
            source={source}
            lastUpdated={lastUpdated}
            onRefresh={refresh}
          />
        </div>

        {/* Filter & Controls Bar */}
        <div className="card p-4 bg-white mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by currency code or country (e.g. EUR, Yen, Rupee)..."
                className="input-field pl-10 text-sm"
              />
            </div>

            {/* Base Currency Selector */}
            <div className="flex items-center gap-2 sm:w-64">
              <span className="text-xs font-bold text-surface-500 whitespace-nowrap">Base:</span>
              <select
                value={baseCurrency}
                onChange={(e) => setBaseCurrency(e.target.value)}
                className="select-field text-sm font-semibold"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide text-xs">
            {regions.map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                  selectedRegion === r ? 'bg-brand-50 text-brand-600 font-bold' : 'text-surface-600 hover:bg-surface-100'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-50 text-[11px] font-bold text-surface-500 uppercase border-b border-surface-200 tracking-wider">
                  <th className="py-4 px-6">Currency</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Region</th>
                  <th className="py-4 px-6 text-right">
                    {isInverse ? `1 Unit in ${baseCurrency}` : `Units per 1 ${baseCurrency}`}
                  </th>
                  <th className="py-4 px-6 text-right">24h Change</th>
                  <th className="py-4 px-6 text-center">Charts &amp; Tools</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 text-sm">
                {filteredCurrencies.map((c) => {
                  const rawRate = getLivePairRate(baseCurrency, c.code);
                  const displayRate = isInverse ? (rawRate > 0 ? 1 / rawRate : 0) : rawRate;
                  const change = get24hChange(baseCurrency, c.code);
                  const isPositive = change >= 0;
                  const isPinned = pinnedCodes.includes(c.code);

                  return (
                    <tr key={c.code} className="hover:bg-surface-50/70 transition-colors">
                      <td className="py-4 px-6 font-bold flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => togglePin(c.code)}
                          title={isPinned ? 'Unpin currency' : 'Pin currency to top'}
                          className="text-surface-300 hover:text-amber-400 transition-colors"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              isPinned ? 'text-amber-400 fill-amber-400' : ''
                            }`}
                          />
                        </button>
                        <span className="text-xl">{c.flag}</span>
                        <span className="font-mono text-surface-900">{c.code}</span>
                      </td>
                      <td className="py-4 px-6 text-surface-700 font-medium">{c.name}</td>
                      <td className="py-4 px-6 text-surface-400 text-xs">{c.region}</td>
                      <td className="py-4 px-6 text-right font-mono font-bold text-surface-900">
                        {formatRate(displayRate)}
                      </td>
                      <td className="py-4 px-6 text-right font-semibold">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                            isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                          }`}
                        >
                          {isPositive ? '▲ +' : '▼ '}
                          {change.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/charts?from=${baseCurrency}&to=${c.code}`}
                            className="p-1.5 rounded-lg text-brand-500 hover:bg-brand-50 transition-colors text-xs font-semibold flex items-center gap-1"
                          >
                            Chart <ExternalLink className="w-3 h-3" />
                          </Link>
                          <Link
                            href={`/converter/${baseCurrency.toLowerCase()}-to-${c.code.toLowerCase()}`}
                            className="px-2.5 py-1 rounded-lg bg-surface-100 text-surface-700 hover:bg-brand-500 hover:text-white transition-all text-xs font-semibold"
                          >
                            Convert
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for pinning currency */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
              <h3 className="text-lg font-bold font-heading text-surface-900 mb-2">Pin Watchlist Currency</h3>
              <p className="text-xs text-surface-500 mb-4">
                Select any currency to pin to the top of your live exchange rate monitor.
              </p>
              <div className="max-h-60 overflow-y-auto space-y-1 mb-4">
                {currencies
                  .filter((c) => c.code !== baseCurrency)
                  .map((c) => {
                    const pinned = pinnedCodes.includes(c.code);
                    return (
                      <button
                        type="button"
                        key={c.code}
                        onClick={() => {
                          togglePin(c.code);
                          setShowAddModal(false);
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-50 text-left text-sm"
                      >
                        <span className="flex items-center gap-2 font-medium">
                          <span>{c.flag}</span> {c.code} - {c.name}
                        </span>
                        <span className="text-xs text-brand-500 font-semibold">
                          {pinned ? 'Unpin' : 'Pin to Top'}
                        </span>
                      </button>
                    );
                  })}
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="btn-secondary w-full justify-center btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
