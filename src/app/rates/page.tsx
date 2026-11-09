'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowUpDown, Plus, ExternalLink, Star, X } from 'lucide-react';
import { currencies } from '@/data/currencies';
import { formatRate, get24hChange } from '@/lib/rates';
import { useLiveRates } from '@/hooks/useLiveRates';
import ApiStatusBanner from '@/components/ui/ApiStatusBanner';
import {
  RateFlash,
  RevealSection,
  Skeleton,
  useHydrated,
} from '@/components/ui/MotionPrimitives';

export default function RatesPage() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInverse, setIsInverse] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [pinnedCodes, setPinnedCodes] = useState<string[]>(['EUR', 'GBP', 'JPY', 'PKR']);
  const [showAddModal, setShowAddModal] = useState(false);

  const hydrated = useHydrated();
  const { data, isLoading, error, source, lastUpdated, refresh, getLivePairRate } = useLiveRates(baseCurrency);
  const showSkeleton = hydrated && isLoading && !data;

  const regions = [
    'All',
    'Europe',
    'Asia',
    'North America',
    'South America',
    'Middle East',
    'Africa',
    'Oceania',
    'Metals',
    'Crypto',
  ];

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
    <div className="min-h-screen bg-page py-10 sm:py-16">
      <div className="container-vx">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <span className="badge-brand">Market Intelligence</span>
            <h1 className="type-h1 text-navy mt-2">
              Live Currency Exchange Rates
            </h1>
            <p className="type-body text-body mt-2">
              Real-time mid-market rates fetched asynchronously from public foreign exchange REST APIs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsInverse(!isInverse)}
              className={`inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl type-caption font-semibold border transition-colors duration-150 ease-fintech ${
                isInverse
                  ? 'bg-primary-pale text-primary border-primary-border'
                  : 'bg-white text-navy border-surface-300 hover:border-primary hover:text-primary'
              }`}
            >
              <ArrowUpDown className="w-4 h-4" aria-hidden="true" />
              Inverse Rates: {isInverse ? 'ON' : 'OFF'}
            </button>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="btn-primary btn-sm"
            >
              <Plus className="w-4 h-4" aria-hidden="true" /> Pin Currency
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
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-caption"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search by currency code or country"
                placeholder="Search by currency code or country (e.g. EUR, Yen, Rupee)..."
                className="input-field pl-10 text-sm"
              />
            </div>

            {/* Base Currency Selector */}
            <div className="flex items-center gap-2 sm:w-64">
              <label htmlFor="rates-base-select" className="form-label whitespace-nowrap">
                Base:
              </label>
              <select
                id="rates-base-select"
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
          <div
            className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide"
            role="tablist"
            aria-label="Filter by region"
          >
            {regions.map((r) => (
              <button
                type="button"
                role="tab"
                aria-selected={selectedRegion === r}
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`min-h-[44px] px-3.5 py-2 rounded-xl type-caption whitespace-nowrap border transition-colors duration-150 ease-fintech ${
                  selectedRegion === r
                    ? 'bg-primary-pale text-primary border-primary-border font-semibold'
                    : 'border-transparent text-caption hover:text-navy hover:bg-page font-medium'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <RevealSection className="bg-white rounded-2xl border border-surface-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-page type-caption font-semibold text-caption uppercase border-b border-surface-200 tracking-wider">
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
              <tbody className="divide-y divide-surface-200">
                {filteredCurrencies.map((c) => {
                  const rawRate = getLivePairRate(baseCurrency, c.code);
                  const displayRate = isInverse ? (rawRate > 0 ? 1 / rawRate : 0) : rawRate;
                  const change = get24hChange(baseCurrency, c.code);
                  const isPositive = change >= 0;
                  const isPinned = pinnedCodes.includes(c.code);

                  return (
                    <tr key={c.code} className="hover:bg-page transition-colors duration-150 ease-fintech">
                      <td className="py-3 px-4 sm:px-6 font-semibold">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => togglePin(c.code)}
                            title={isPinned ? 'Unpin currency' : 'Pin currency to top'}
                            aria-label={isPinned ? `Unpin ${c.code}` : `Pin ${c.code}`}
                            className="inline-flex items-center justify-center w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl text-caption hover:text-primary hover:bg-primary-pale transition-colors duration-150 ease-fintech"
                          >
                            <Star
                              className={`w-4 h-4 ${isPinned ? 'text-primary fill-primary' : ''}`}
                              aria-hidden="true"
                            />
                          </button>
                          <span className="text-xl" aria-hidden="true">
                            {c.flag}
                          </span>
                          <span className="text-navy">{c.code}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-body font-medium">{c.name}</td>
                      <td className="py-3 px-6 text-caption type-caption">{c.region}</td>
                      <td className="py-3 px-6 text-right font-semibold text-navy tabular-nums">
                        {showSkeleton ? (
                          <Skeleton className="h-5 w-20" />
                        ) : (
                          <RateFlash value={displayRate} ready={Boolean(data)}>
                            {formatRate(displayRate)}
                          </RateFlash>
                        )}
                      </td>
                      <td className="py-3 px-6 text-right font-semibold">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full type-caption border tabular-nums ${
                            isPositive
                              ? 'bg-gain-bg text-gain-text border-gain-border'
                              : 'bg-loss-bg text-loss-text border-loss-border'
                          }`}
                        >
                          {isPositive ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/charts?from=${baseCurrency}&to=${c.code}`}
                            aria-label={`View ${baseCurrency} to ${c.code} chart`}
                            className="inline-flex items-center justify-center gap-1 min-h-[44px] px-3 rounded-xl text-primary hover:bg-primary-pale transition-colors duration-150 ease-fintech type-caption font-semibold"
                          >
                            Chart <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          </Link>
                          <Link
                            href={`/converter/${baseCurrency.toLowerCase()}-to-${c.code.toLowerCase()}`}
                            aria-label={`Convert ${baseCurrency} to ${c.code}`}
                            className="inline-flex items-center justify-center min-h-[44px] px-3.5 rounded-xl bg-white border border-surface-300 text-navy hover:border-primary hover:text-primary hover:bg-primary-pale transition-colors duration-150 ease-fintech type-caption font-semibold"
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
        </RevealSection>

        {/* Modal for pinning currency */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/50">
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Pin watchlist currency"
              className="bg-white rounded-2xl border border-surface-200 p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="type-h3 text-navy">Pin Watchlist Currency</h3>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  aria-label="Close pin currency dialog"
                  className="inline-flex items-center justify-center w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl text-navy hover:bg-page"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <p className="type-caption text-caption mb-4">
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
                        className="w-full min-h-[44px] flex items-center justify-between p-2.5 rounded-xl hover:bg-page text-left text-sm"
                      >
                        <span className="flex items-center gap-2 font-medium text-navy">
                          <span aria-hidden="true">{c.flag}</span> {c.code} - {c.name}
                        </span>
                        <span className="type-caption text-primary font-semibold">
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
