import { useState, useEffect, useCallback } from 'react';
import { ArrowLeftRight, TrendingUp, Bell, ChevronDown, Search, X, RefreshCw } from 'lucide-react';
import { currencies, getCurrency, searchCurrencies } from '@/data/currencies';
import { formatAmount, formatRate } from '@/lib/rates';
import { useLiveRates } from '@/lib/fx/RateProvider';
import { wait } from '@/lib/utils';
import Link from '@/router/Link';
import LiveRateValue from '@/components/ui/LiveRateValue';
import LiveUpdatedBadge from '@/components/ui/LiveUpdatedBadge';
import DeltaChip from '@/components/ui/DeltaChip';
import ActionButton from '@/components/ui/ActionButton';
import { Skeleton } from '@/components/ui/Skeleton';

type Tab = 'convert' | 'charts' | 'alerts';

interface CurrencyConverterProps {
  defaultFrom?: string;
  defaultTo?: string;
  defaultAmount?: number;
  compact?: boolean;
  initialTab?: Tab;
}

export default function CurrencyConverter({
  defaultFrom = 'USD',
  defaultTo = 'EUR',
  defaultAmount = 1000,
  compact = false,
  initialTab = 'convert',
}: CurrencyConverterProps) {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [fromCode, setFromCode] = useState(defaultFrom);
  const [toCode, setToCode] = useState(defaultTo);
  const [amount, setAmount] = useState(defaultAmount);
  const [swapCount, setSwapCount] = useState(0);
  const [pickerOpen, setPickerOpen] = useState<'from' | 'to' | null>(null);
  const [pickerSearch, setPickerSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Alert tab state
  const [alertTarget, setAlertTarget] = useState('');
  const [alertEmail, setAlertEmail] = useState('');
  const [alertStatus, setAlertStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [alertCreated, setAlertCreated] = useState(false);

  const { rate: getLiveRate, change: getChange, status: rateStatus, refresh, updatedAt } = useLiveRates();
  const rate = getLiveRate(fromCode, toCode);
  const result = amount * rate;
  const inverseRate = rate ? 1 / rate : 0;
  const change = getChange(fromCode, toCode);
  const fromCurrency = getCurrency(fromCode);
  const toCurrency = getCurrency(toCode);
  const pairKey = `${fromCode}-${toCode}`;

  const handleSwap = useCallback(() => {
    setSwapCount((c) => c + 1);
    setFromCode(toCode);
    setToCode(fromCode);
  }, [fromCode, toCode]);

  // Rates for every pair arrive in one request, so switching currency is
  // instant; the short delay only lets the skeleton animation be perceived.
  const handleCurrencyChange = async (side: 'from' | 'to', code: string) => {
    setPickerOpen(null);
    setIsRefreshing(true);
    if (side === 'from') setFromCode(code);
    else setToCode(code);
    await wait(180);
    setIsRefreshing(false);
  };

  // Re-reads the live table from the API (RateProvider owns the request).
  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    refresh();
    await wait(400);
    setIsRefreshing(false);
  };

  const handleAlertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail || alertStatus === 'loading') return;
    setAlertStatus('loading');
    await wait(350);
    setAlertStatus('success');
    setAlertCreated(true);
    window.setTimeout(() => {
      setAlertStatus('idle');
    }, 800);
  };

  useEffect(() => {
    if (!pickerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPickerOpen(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [pickerOpen]);

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'convert', label: 'Convert', icon: <ArrowLeftRight className="w-4 h-4" aria-hidden="true" /> },
    { key: 'charts', label: 'Charts', icon: <TrendingUp className="w-4 h-4" aria-hidden="true" /> },
    { key: 'alerts', label: 'Alerts', icon: <Bell className="w-4 h-4" aria-hidden="true" /> },
  ];

  const filteredCurrencies = pickerSearch
    ? searchCurrencies(pickerSearch)
    : currencies;

  return (
    <div className={`bg-surface rounded-2xl border border-line overflow-hidden ${compact ? '' : 'max-w-xl w-full'}`}>
      {/* Tabs */}
      <div role="tablist" aria-label="Currency tools" className="flex border-b border-line">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 min-h-[48px] text-[14px] font-medium transition-colors duration-150 ease-fintech border-b-2 ${
              activeTab === tab.key
                ? 'text-ink border-ink bg-surface-subtle'
                : 'text-ink-500 border-transparent hover:text-ink hover:bg-surface-subtle/60'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Convert Tab */}
      {activeTab === 'convert' && (
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <LiveUpdatedBadge utcTime={updatedAt} />
            <ActionButton
              variant="ghost"
              onAction={handleManualRefresh}
              successLabel="Updated"
              className="btn-sm px-3"
              aria-label="Refresh live exchange rate"
            >
              <span className="inline-flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Refresh</span>
              </span>
            </ActionButton>
          </div>

          {/* Amount input */}
          <div>
            <label htmlFor="converter-amount" className="mb-1.5 block">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-500 font-medium tabular-nums">
                {fromCurrency?.symbol}
              </span>
              <input
                id="converter-amount"
                type="number"
                min="0"
                max="1000000000"
                step="any"
                value={amount}
                onChange={(e) => {
                  // A negative or non-finite amount used to convert silently
                  // into a negative result; clamp it at zero instead.
                  const next = Number(e.target.value);
                  setAmount(Number.isFinite(next) && next > 0 ? next : 0);
                }}
                className="input-field pl-10 text-[18px] font-semibold tabular-nums"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* From / To with swap */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-2">
            <div className="flex-1 min-w-0">
              <label htmlFor="converter-from-btn" className="mb-1.5 block">
                From
              </label>
              <button
                id="converter-from-btn"
                type="button"
                onClick={() => {
                  setPickerOpen('from');
                  setPickerSearch('');
                }}
                aria-label={`Source currency ${fromCode} ${fromCurrency?.name || ''}`}
                className="input-field flex items-center gap-2 text-left"
              >
                <span className="text-[18px]" aria-hidden="true">{fromCurrency?.flag}</span>
                <span className="font-semibold text-ink">{fromCode}</span>
                <span className="text-ink-500 text-caption hidden sm:inline truncate">
                  {fromCurrency?.name}
                </span>
                <ChevronDown className="w-4 h-4 text-ink-500 ml-auto flex-shrink-0" aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleSwap}
              className="self-center sm:self-auto min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl bg-surface-subtle border border-line-strong flex items-center justify-center hover:border-ink transition-colors duration-150 flex-shrink-0"
              aria-label="Swap currencies"
            >
              <ArrowLeftRight
                aria-hidden="true"
                className="w-4 h-4 text-ink transition-transform duration-200 ease-fintech"
                style={{ transform: `rotate(${swapCount * 180}deg)` }}
              />
            </button>

            <div className="flex-1 min-w-0">
              <label htmlFor="converter-to-btn" className="mb-1.5 block">
                To
              </label>
              <button
                id="converter-to-btn"
                type="button"
                onClick={() => {
                  setPickerOpen('to');
                  setPickerSearch('');
                }}
                aria-label={`Target currency ${toCode} ${toCurrency?.name || ''}`}
                className="input-field flex items-center gap-2 text-left"
              >
                <span className="text-[18px]" aria-hidden="true">{toCurrency?.flag}</span>
                <span className="font-semibold text-ink">{toCode}</span>
                <span className="text-ink-500 text-caption hidden sm:inline truncate">
                  {toCurrency?.name}
                </span>
                <ChevronDown className="w-4 h-4 text-ink-500 ml-auto flex-shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Result or Loading Skeleton */}
          {isRefreshing ? (
            <div className="bg-surface-subtle rounded-2xl border border-line p-4 space-y-3" role="status" aria-label="Updating rate">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-8 w-52" />
              <Skeleton className="h-4 w-44" />
            </div>
          ) : (
            <div className="bg-surface-subtle rounded-2xl border border-line p-4">
              <div className="text-caption text-ink-500 mb-1 tabular-nums">
                {formatAmount(amount)} {fromCurrency?.name} =
              </div>
              <div className="text-[24px] sm:text-[30px] leading-[34px] font-heading font-semibold text-ink tabular-nums">
                <LiveRateValue
                  value={result}
                  pairKey={`${pairKey}-amt-${amount}`}
                  formatted={formatAmount(result)}
                />{' '}
                <span className="text-ink-700">{toCode}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-caption text-ink-500 tabular-nums">
                <span>
                  1 {fromCode} ={' '}
                  <LiveRateValue
                    value={rate}
                    pairKey={pairKey}
                    formatted={formatRate(rate)}
                    className="font-medium text-ink"
                  />{' '}
                  {toCode}
                </span>
                <span className="text-line-strong" aria-hidden="true">|</span>
                <span>
                  1 {toCode} = {formatRate(inverseRate)} {fromCode}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <DeltaChip change={change} suffix="(24h)" />
                <span className="badge-neutral">Mid-market rate</span>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              href={`/converter/${fromCode.toLowerCase()}-to-${toCode.toLowerCase()}`}
              className="btn-primary flex-1 justify-center"
            >
              View Full Chart
            </Link>
            <Link
              href={`/alerts?pair=${fromCode.toLowerCase()}-${toCode.toLowerCase()}`}
              className="btn-secondary flex-1 justify-center"
            >
              Set rate alert
            </Link>
          </div>
        </div>
      )}

      {/* Charts Tab */}
      {activeTab === 'charts' && (
        <div className="p-5 sm:p-6 text-center space-y-4">
          <div className="py-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-surface-subtle border border-line flex items-center justify-center mx-auto">
              <TrendingUp className="w-6 h-6 text-ink" aria-hidden="true" />
            </div>
            <h3 className="font-heading font-semibold text-ink">
              {fromCode}/{toCode} Charts
            </h3>
            <p className="text-ink-500 mx-auto">
              Track exchange rate trends with interactive charts spanning 1 day to 10 years.
            </p>
            <div className="pt-2">
              <Link href={`/charts?from=${fromCode}&to=${toCode}`} className="btn-primary">
                <TrendingUp className="w-4 h-4" aria-hidden="true" />
                <span>View Full Charts</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <div className="p-5 sm:p-6">
          <div className="py-2 space-y-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-surface-subtle border border-line flex items-center justify-center mx-auto">
                <Bell className="w-6 h-6 text-ink" aria-hidden="true" />
              </div>
              <h3 className="font-heading font-semibold text-ink">Set a Rate Alert</h3>
              <p className="text-ink-500 mx-auto">
                Get notified when {fromCode}/{toCode} reaches your target rate.
              </p>
            </div>

            {alertCreated ? (
              <div className="p-4 rounded-xl bg-gain-bg border border-gain-border text-gain text-[14px] text-center space-y-2">
                <p className="font-medium mx-auto">
                  Alert active for {fromCode}/{toCode} at{' '}
                  <span className="tabular-nums font-semibold">
                    {alertTarget || formatRate(rate)}
                  </span>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setAlertCreated(false)}
                  className="btn-secondary btn-sm"
                >
                  Create Another Alert
                </button>
              </div>
            ) : (
              <form onSubmit={handleAlertSubmit} className="space-y-3 text-left max-w-xs mx-auto">
                <div>
                  <label htmlFor="widget-alert-rate" className="mb-1 block">
                    Target rate
                  </label>
                  <input
                    id="widget-alert-rate"
                    type="number"
                    className="input-field tabular-nums"
                    placeholder={formatRate(rate)}
                    step="0.0001"
                    value={alertTarget}
                    onChange={(e) => setAlertTarget(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="widget-alert-email" className="mb-1 block">
                    Email
                  </label>
                  <input
                    id="widget-alert-email"
                    type="email"
                    className="input-field"
                    placeholder="you@example.com"
                    value={alertEmail}
                    onChange={(e) => setAlertEmail(e.target.value)}
                    required
                  />
                </div>
                <ActionButton
                  type="submit"
                  status={alertStatus}
                  successLabel="Alert Created"
                  className="w-full justify-center"
                >
                  <span className="inline-flex items-center gap-2">
                    <Bell className="w-4 h-4" aria-hidden="true" />
                    <span>Create Alert</span>
                  </span>
                </ActionButton>
                <div className="text-center pt-1">
                  <Link href="/alerts" className="text-caption font-medium text-ink underline hover:text-ink-700 inline-flex items-center min-h-[44px]">
                    Manage all alert rules
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Currency Picker Modal */}
      {pickerOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Select ${pickerOpen === 'from' ? 'source' : 'target'} currency`}
        >
          <div className="absolute inset-0 bg-ink/40" onClick={() => setPickerOpen(null)} />
          <div className="relative bg-surface rounded-2xl border border-line w-full max-w-md max-h-[75vh] flex flex-col">
            <div className="p-4 border-b border-line">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-semibold text-ink text-[20px] leading-[26px]">
                  Select {pickerOpen === 'from' ? 'source' : 'target'} currency
                </h3>
                <button
                  type="button"
                  onClick={() => setPickerOpen(null)}
                  aria-label="Close currency selector"
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center hover:bg-surface-subtle rounded-xl"
                >
                  <X className="w-5 h-5 text-ink" aria-hidden="true" />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" aria-hidden="true" />
                <input
                  type="text"
                  value={pickerSearch}
                  onChange={(e) => setPickerSearch(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Search currency or country..."
                  aria-label="Search currency or country"
                  autoFocus
                />
              </div>
            </div>
            <div className="overflow-y-auto flex-1 p-2">
              {filteredCurrencies.length === 0 && (
                <p className="px-4 py-8 text-center text-[14px] text-ink-500" role="status">
                  No currencies match “{pickerSearch.trim()}”. Try a different name or code.
                </p>
              )}
              {filteredCurrencies.map((c) => {
                const isSelected = (pickerOpen === 'from' ? fromCode : toCode) === c.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleCurrencyChange(pickerOpen, c.code)}
                    className={`w-full flex items-center gap-3 px-4 min-h-[48px] py-2.5 rounded-xl text-left transition-colors duration-150 ${
                      isSelected ? 'bg-surface-subtle text-ink border border-line' : 'hover:bg-surface-subtle'
                    }`}
                  >
                    <span className="text-[20px]" aria-hidden="true">{c.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[14px] text-ink">{c.code}</div>
                      <div className="text-caption text-ink-500 truncate">{c.name}</div>
                    </div>
                    <span className="text-caption text-ink-500">{c.region}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
