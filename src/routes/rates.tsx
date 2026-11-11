import { useState, useMemo } from 'react';
import Link from '@/router/Link';
import { Search, ArrowUpDown, Plus, ExternalLink, RefreshCw } from 'lucide-react';
import { currencies } from '@/data/currencies';
import { formatRate, get24hChange } from '@/lib/rates';
import { useLiveRates } from '@/lib/fx/RateProvider';
import { wait } from '@/lib/utils';
import LiveRateValue from '@/components/ui/LiveRateValue';
import LiveUpdatedBadge from '@/components/ui/LiveUpdatedBadge';
import DeltaChip from '@/components/ui/DeltaChip';
import ActionButton from '@/components/ui/ActionButton';
import { RatesTableSkeleton } from '@/components/ui/Skeleton';

export default function RatesPage() {
  const fx = useLiveRates();
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInverse, setIsInverse] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

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

  const handleBaseChange = async (code: string) => {
    setIsLoadingTable(true);
    setBaseCurrency(code);
    await wait(240);
    setIsLoadingTable(false);
  };

  const handleRefresh = async () => {
    setIsLoadingTable(true);
    await wait(250);
    fx.refresh();
    setIsLoadingTable(false);
  };

  const filteredCurrencies = useMemo(() => {
    return currencies.filter((c) => {
      if (c.code === baseCurrency) return false;
      const matchesSearch =
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [baseCurrency, searchQuery, selectedRegion]);

  return (
    <div className="min-h-screen bg-bg py-10 sm:py-16">
      <div className="container-vx">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge-neutral">Market Intelligence</span>
              <LiveUpdatedBadge utcTime={fx.updatedAt} />
            </div>
            <h1>Live Currency Exchange Rates</h1>
            <p className="text-ink-500">
              Real-time mid-market rates for global currencies, precious metals, and selected digital assets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ActionButton
              variant="secondary"
              onAction={handleRefresh}
              successLabel="Refreshed"
              className="btn-sm"
            >
              <span className="inline-flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Refresh Rates</span>
              </span>
            </ActionButton>

            <button
              type="button"
              onClick={() => setIsInverse(!isInverse)}
              aria-pressed={isInverse}
              className={`inline-flex items-center gap-1.5 px-4 min-h-[44px] rounded-xl text-[13px] font-medium border transition-colors duration-150 ${
                isInverse
                  ? 'bg-primary text-primary-fg border-primary'
                  : 'bg-surface text-ink border-line-strong hover:bg-surface-subtle'
              }`}
            >
              <ArrowUpDown className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Inverse Rates: {isInverse ? 'ON' : 'OFF'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="btn-primary btn-sm"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Switch Base</span>
            </button>
          </div>
        </div>

        {/* Filter & Controls Bar */}
        <div className="card p-4 bg-surface mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search currencies by code or country"
                placeholder="Search by currency code or country (e.g. EUR, Yen, Peso)..."
                className="input-field pl-10"
              />
            </div>

            <div className="flex items-center gap-2 sm:w-72">
              <label htmlFor="rates-base-currency" className="whitespace-nowrap">
                Base:
              </label>
              <select
                id="rates-base-currency"
                value={baseCurrency}
                onChange={(e) => handleBaseChange(e.target.value)}
                className="select-field text-[14px] font-medium"
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
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {regions.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setSelectedRegion(r)}
                aria-pressed={selectedRegion === r}
                className={`px-3.5 min-h-[44px] rounded-xl whitespace-nowrap text-[13px] font-medium transition-colors duration-150 ${
                  selectedRegion === r
                    ? 'bg-primary text-primary-fg'
                    : 'text-ink-500 hover:text-ink hover:bg-surface-subtle'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Table or Skeleton */}
        {isLoadingTable ? (
          <RatesTableSkeleton rows={10} />
        ) : (
          <div className="bg-surface rounded-2xl border border-line overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-subtle text-caption font-medium text-ink-500 uppercase border-b border-line">
                    <th className="py-3.5 px-6">Currency</th>
                    <th className="py-3.5 px-6">Name</th>
                    <th className="py-3.5 px-6">Region</th>
                    <th className="py-3.5 px-6 text-right">
                      {isInverse ? `Units per 1 ${baseCurrency}` : `1 ${baseCurrency} in Unit`}
                    </th>
                    <th className="py-3.5 px-6 text-right">24h Change</th>
                    <th className="py-3.5 px-6 text-center">Charts &amp; Tools</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {filteredCurrencies.map((c) => {
                    const rawRate = fx.rate(baseCurrency, c.code);
                    const displayRate = isInverse ? 1 / rawRate : rawRate;
                    const change = fx.change(baseCurrency, c.code);

                    return (
                      <tr key={c.code} className="hover:bg-surface-subtle/60 transition-colors duration-150">
                        <td className="py-3.5 px-6 font-semibold text-ink">
                          <span className="inline-flex items-center gap-2.5">
                            <span className="text-[18px]" aria-hidden="true">{c.flag}</span>
                            <span>{c.code}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-6 text-ink-700">{c.name}</td>
                        <td className="py-3.5 px-6 text-ink-500 text-caption">{c.region}</td>
                        <td className="py-3.5 px-6 text-right font-semibold text-ink tabular-nums">
                          <LiveRateValue
                            value={displayRate}
                            pairKey={`${baseCurrency}-${c.code}-${isInverse ? 'inv' : 'dir'}`}
                            formatted={formatRate(displayRate)}
                          />
                        </td>
                        <td className="py-3.5 px-6 text-right">
                          <DeltaChip change={change} hasData={Boolean(fx.previousRates)} comparedTo={fx.previousDate} />
                        </td>
                        <td className="py-3.5 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              href={`/converter/${baseCurrency.toLowerCase()}-to-${c.code.toLowerCase()}`}
                              aria-label={`Convert ${baseCurrency} to ${c.code}`}
                              className="min-h-[44px] px-3 rounded-xl text-ink hover:bg-surface-subtle transition-colors text-caption font-medium inline-flex items-center gap-1"
                            >
                              <span>Chart</span>
                              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                            </Link>
                            <Link
                              href={`/converter/usd-to-${c.code.toLowerCase()}`}
                              aria-label={`Convert USD to ${c.code}`}
                              className="min-h-[44px] px-3.5 rounded-xl bg-surface-subtle border border-line text-ink hover:border-ink transition-colors text-caption font-medium inline-flex items-center"
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
        )}

        {/* Modal for selecting base currency */}
        {showAddModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40"
            role="dialog"
            aria-modal="true"
            aria-label="Select base currency"
          >
            <div className="bg-surface rounded-2xl border border-line p-6 max-w-md w-full">
              <h3 className="mb-1">Select Base Currency</h3>
              <p className="text-caption text-ink-500 mb-4">
                Choose any currency to anchor the live exchange rate table.
              </p>
              <div className="max-h-64 overflow-y-auto space-y-1 mb-4">
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      handleBaseChange(c.code);
                    }}
                    className="w-full flex items-center justify-between px-3 min-h-[44px] rounded-xl hover:bg-surface-subtle text-left text-[14px]"
                  >
                    <span className="flex items-center gap-2 font-medium text-ink">
                      <span aria-hidden="true">{c.flag}</span>
                      <span>
                        {c.code} - {c.name}
                      </span>
                    </span>
                    <span className="text-caption text-ink-500 font-medium">Select</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="btn-secondary w-full justify-center"
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
