'use client';

import { useState } from 'react';
import {
  ArrowLeftRight,
  TrendingUp,
  Bell,
  ChevronDown,
  Search,
  X,
  CheckCircle2,
  Loader2,
  Check,
} from 'lucide-react';
import { currencies, getCurrency, searchCurrencies } from '@/data/currencies';
import { formatRate, formatAmount, get24hChange } from '@/lib/rates';
import { getSupabaseClient } from '@/lib/supabase';
import { useLiveRates } from '@/hooks/useLiveRates';
import ApiStatusBanner from '@/components/ui/ApiStatusBanner';
import {
  LiveTimestamp,
  RateFlash,
  Skeleton,
  useHydrated,
  usePrefersReducedMotion,
} from '@/components/ui/MotionPrimitives';
import Link from 'next/link';

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

  const hydrated = useHydrated();
  const reducedMotion = usePrefersReducedMotion();

  // Live REST API rates via async/await fetch
  const { data, isLoading, error, source, lastUpdated, refresh, getLivePairRate } = useLiveRates(fromCode);

  // Quick alert state
  const [alertTarget, setAlertTarget] = useState('');
  const [alertEmail, setAlertEmail] = useState('');
  const [alertSaving, setAlertSaving] = useState(false);
  const [alertJustSucceeded, setAlertJustSucceeded] = useState(false);
  const [alertSaved, setAlertSaved] = useState(false);
  const [alertError, setAlertError] = useState<string | null>(null);

  const rate = getLivePairRate(fromCode, toCode);
  const result = amount * rate;
  const inverseRate = rate > 0 ? 1 / rate : 0;
  const change = get24hChange(fromCode, toCode);
  const isPositive = change >= 0;
  const fromCurrency = getCurrency(fromCode);
  const toCurrency = getCurrency(toCode);
  const showSkeleton = hydrated && isLoading && !data;

  // Motion #10: Swap icon rotates 180deg over 200ms on click
  const handleSwap = () => {
    setSwapCount((c) => c + 1);
    setFromCode(toCode);
    setToCode(fromCode);
  };

  const handleQuickAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlertError(null);
    const numericTarget = Number(alertTarget);
    if (!alertEmail.trim() || !Number.isFinite(numericTarget) || numericTarget <= 0) {
      setAlertError('Enter a valid target rate and email.');
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      setAlertJustSucceeded(true);
      window.setTimeout(() => {
        setAlertJustSucceeded(false);
        setAlertSaved(true);
      }, 800);
      return;
    }

    setAlertSaving(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const { error: insertError } = await supabase.from('rate_alerts').insert({
        user_id: userData.user?.id ?? null,
        email: alertEmail.trim().toLowerCase(),
        from_currency: fromCode,
        to_currency: toCode,
        direction: numericTarget >= rate ? 'above' : 'below',
        target_rate: numericTarget,
      });
      if (insertError) {
        setAlertError(insertError.message);
        return;
      }
      setAlertSaving(false);
      setAlertJustSucceeded(true);
      window.setTimeout(() => {
        setAlertJustSucceeded(false);
        setAlertSaved(true);
      }, 800);
      return;
    } catch {
      setAlertError('Could not save alert right now.');
    } finally {
      setAlertSaving(false);
    }
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'convert', label: 'Convert', icon: <ArrowLeftRight className="w-4 h-4" aria-hidden="true" /> },
    { key: 'charts', label: 'Charts', icon: <TrendingUp className="w-4 h-4" aria-hidden="true" /> },
    { key: 'alerts', label: 'Alerts', icon: <Bell className="w-4 h-4" aria-hidden="true" /> },
  ];

  const filteredCurrencies = pickerSearch ? searchCurrencies(pickerSearch) : currencies;

  return (
    <div
      className={`bg-white rounded-2xl border border-surface-200 overflow-hidden text-navy transition-colors duration-150 ease-fintech ${
        compact ? 'w-full' : 'max-w-xl w-full'
      }`}
    >
      {/* Tabs */}
      <div className="flex border-b border-surface-200 bg-page" role="tablist" aria-label="Converter views">
        {tabs.map((tab) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            aria-label={tab.label}
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 min-h-[48px] flex items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors duration-150 ease-fintech border-b-2 ${
              activeTab === tab.key
                ? 'text-primary border-primary bg-primary-pale font-semibold'
                : 'text-caption border-transparent hover:text-navy hover:bg-white'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Convert Tab */}
      {activeTab === 'convert' && (
        <div className="p-5 sm:p-6">
          <div className="space-y-4">
            <ApiStatusBanner
              isLoading={isLoading}
              error={error}
              source={source}
              lastUpdated={lastUpdated}
              onRefresh={refresh}
              compact
            />

            {/* Amount input */}
            <div>
              <label htmlFor="converter-amount" className="form-label mb-1.5 block">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-caption font-medium">
                  {fromCurrency?.symbol}
                </span>
                <input
                  id="converter-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                  className="input-field pl-10 text-lg font-semibold text-navy tabular-nums"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* From / To with 44px swap button & 180deg icon rotation */}
            <div className="flex items-end gap-2">
              <div className="flex-1 min-w-0">
                <label className="form-label mb-1.5 block">From</label>
                <button
                  type="button"
                  aria-label={`Select source currency, currently ${fromCode} ${fromCurrency?.name ?? ''}`}
                  onClick={() => {
                    setPickerOpen('from');
                    setPickerSearch('');
                  }}
                  className="input-field flex items-center gap-2 text-left"
                >
                  <span className="text-lg" aria-hidden="true">
                    {fromCurrency?.flag}
                  </span>
                  <span className="font-semibold text-navy">{fromCode}</span>
                  <span className="text-caption type-caption hidden sm:inline truncate">
                    {fromCurrency?.name}
                  </span>
                  <ChevronDown className="w-4 h-4 text-caption ml-auto flex-shrink-0" aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleSwap}
                className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl bg-primary-pale border border-primary-border flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-colors duration-150 ease-fintech flex-shrink-0"
                aria-label={`Swap currencies (${fromCode} and ${toCode})`}
              >
                <ArrowLeftRight
                  className="w-4 h-4 transition-transform duration-200 ease-fintech"
                  style={
                    reducedMotion
                      ? undefined
                      : { transform: `rotate(${swapCount * 180}deg)` }
                  }
                  aria-hidden="true"
                />
              </button>

              <div className="flex-1 min-w-0">
                <label className="form-label mb-1.5 block">To</label>
                <button
                  type="button"
                  aria-label={`Select target currency, currently ${toCode} ${toCurrency?.name ?? ''}`}
                  onClick={() => {
                    setPickerOpen('to');
                    setPickerSearch('');
                  }}
                  className="input-field flex items-center gap-2 text-left"
                >
                  <span className="text-lg" aria-hidden="true">
                    {toCurrency?.flag}
                  </span>
                  <span className="font-semibold text-navy">{toCode}</span>
                  <span className="text-caption type-caption hidden sm:inline truncate">
                    {toCurrency?.name}
                  </span>
                  <ChevronDown className="w-4 h-4 text-caption ml-auto flex-shrink-0" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Result — rates and balances strictly navy (#0B1B33) with tabular-nums & live flash */}
            <div className="bg-page rounded-2xl border border-surface-200 p-4 mt-2">
              <div className="type-caption text-caption mb-1 tabular-nums">
                {formatAmount(amount)} {fromCurrency?.name} =
              </div>

              {showSkeleton ? (
                <div className="space-y-2 py-1" aria-busy="true" aria-label="Loading live exchange rate">
                  <Skeleton className="h-9 w-48" />
                  <Skeleton className="h-4 w-64" />
                </div>
              ) : (
                <>
                  <div className="text-2xl sm:text-3xl font-heading font-semibold text-navy tabular-nums">
                    <RateFlash key={`${fromCode}-${toCode}-res`} value={rate} ready={Boolean(data)}>
                      {formatAmount(result)} {toCode}
                    </RateFlash>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-2 type-caption text-navy font-medium tabular-nums">
                    <RateFlash key={`${fromCode}-${toCode}-unit`} value={rate} ready={Boolean(data)}>
                      1 {fromCode} = {formatRate(rate)} {toCode}
                    </RateFlash>
                    <span className="text-surface-300" aria-hidden="true">
                      |
                    </span>
                    <span className="text-caption tabular-nums">
                      1 {toCode} = {formatRate(inverseRate)} {fromCode}
                    </span>
                  </div>
                </>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2.5 border-t border-surface-200">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 type-caption font-semibold border tabular-nums ${
                      isPositive
                        ? 'bg-gain-bg text-gain-text border-gain-border'
                        : 'bg-loss-bg text-loss-text border-loss-border'
                    }`}
                  >
                    {isPositive ? '▲' : '▼'} {Math.abs(change).toFixed(2)}% (24h)
                  </span>
                  <span className="badge-brand">Mid-Market</span>
                </div>
                <LiveTimestamp timestamp={lastUpdated ?? undefined} />
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap sm:flex-nowrap gap-2">
              <Link href="/charts" className="btn-primary flex-1 justify-center">
                View Full Chart
              </Link>
              <Link href="/alerts" className="btn-secondary flex-1 justify-center">
                Set Rate Alert
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Charts Tab */}
      {activeTab === 'charts' && (
        <div className="p-5 sm:p-6 text-center">
          <div className="py-6">
            <div className="w-12 h-12 rounded-xl bg-primary-pale border border-primary-border text-primary flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="type-h3 text-navy mb-2">
              {fromCode}/{toCode} Charts
            </h3>
            <p className="text-sm text-body mb-4 mx-auto">
              Track live and historical exchange rate trends spanning 1 week to 10 years.
            </p>
            <Link href={`/charts?from=${fromCode}&to=${toCode}`} className="btn-primary">
              <TrendingUp className="w-4 h-4" aria-hidden="true" /> View Full Charts
            </Link>
          </div>
        </div>
      )}

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <div className="p-5 sm:p-6">
          <div className="py-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-primary-pale border border-primary-border text-primary flex items-center justify-center mx-auto mb-2">
              <Bell className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="type-h3 text-navy mb-1">
              Set a {fromCode}/{toCode} Rate Alert
            </h3>
            <p className="type-caption text-caption mb-4 mx-auto tabular-nums">
              Live rate: <strong className="text-navy">1 {fromCode} = {formatRate(rate)} {toCode}</strong>. Get notified when markets hit your target.
            </p>

            {alertSaved ? (
              <div className="p-4 rounded-2xl bg-gain-bg border border-gain-border text-gain-text space-y-2 max-w-xs mx-auto">
                <CheckCircle2 className="w-7 h-7 mx-auto" aria-hidden="true" />
                <div className="text-sm font-semibold">Alert Activated!</div>
                <p className="type-caption tabular-nums">
                  We&apos;ll email {alertEmail} when {fromCode}/{toCode} reaches {alertTarget}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setAlertSaved(false);
                    setAlertTarget('');
                  }}
                  className="btn-primary btn-sm"
                >
                  Set Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickAlert} className="space-y-3 text-left max-w-xs mx-auto text-navy">
                {alertError && (
                  <div className="p-2.5 rounded-lg bg-loss-bg border border-loss-border text-loss-text type-caption">
                    {alertError}
                  </div>
                )}
                <div>
                  <label htmlFor="quick-alert-target" className="form-label mb-1 block">
                    Target rate
                  </label>
                  <input
                    id="quick-alert-target"
                    type="number"
                    required
                    value={alertTarget}
                    onChange={(e) => setAlertTarget(e.target.value)}
                    className="input-field tabular-nums"
                    placeholder={formatRate(rate)}
                    step="0.0001"
                  />
                </div>
                <div>
                  <label htmlFor="quick-alert-email" className="form-label mb-1 block">
                    Email
                  </label>
                  <input
                    id="quick-alert-email"
                    type="email"
                    required
                    value={alertEmail}
                    onChange={(e) => setAlertEmail(e.target.value)}
                    className="input-field"
                    placeholder="you@example.com"
                  />
                </div>
                <button
                  type="submit"
                  disabled={alertSaving || alertJustSucceeded}
                  className="btn-primary w-full justify-center"
                >
                  {alertSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Saving...
                    </>
                  ) : alertJustSucceeded ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" /> Saved
                    </>
                  ) : (
                    <>
                      <Bell className="w-4 h-4" aria-hidden="true" /> Create Alert
                    </>
                  )}
                </button>
                <div className="text-center pt-1">
                  <Link
                    href="/alerts"
                    className="inline-flex items-center min-h-[44px] px-2 type-caption text-primary hover:text-primary-hover hover:underline font-medium"
                  >
                    Manage all alerts &rarr;
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Currency Picker Modal */}
      {pickerOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 text-navy">
          <div className="absolute inset-0 bg-navy/50" onClick={() => setPickerOpen(null)} />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Select ${pickerOpen === 'from' ? 'source' : 'target'} currency`}
            className="relative bg-white rounded-2xl border border-surface-200 w-full max-w-md max-h-[75vh] flex flex-col"
          >
            <div className="p-4 border-b border-surface-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="type-h3 text-navy">
                  Select {pickerOpen === 'from' ? 'source' : 'target'} currency
                </h3>
                <button
                  type="button"
                  onClick={() => setPickerOpen(null)}
                  className="inline-flex items-center justify-center w-11 h-11 min-h-[44px] min-w-[44px] hover:bg-page rounded-xl text-navy"
                  aria-label="Close currency picker"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-caption"
                  aria-hidden="true"
                />
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
              {filteredCurrencies.map((c) => {
                const isSelected = (pickerOpen === 'from' ? fromCode : toCode) === c.code;
                return (
                  <button
                    type="button"
                    key={c.code}
                    onClick={() => {
                      if (pickerOpen === 'from') setFromCode(c.code);
                      else setToCode(c.code);
                      setPickerOpen(null);
                    }}
                    className={`w-full min-h-[48px] flex items-center gap-3 px-4 py-2.5 rounded-xl text-left border transition-colors duration-150 ease-fintech ${
                      isSelected
                        ? 'bg-primary-pale border-primary-border text-primary'
                        : 'border-transparent hover:bg-page'
                    }`}
                  >
                    <span className="text-xl" aria-hidden="true">
                      {c.flag}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold text-sm ${isSelected ? 'text-primary' : 'text-navy'}`}>
                        {c.code}
                      </div>
                      <div className="type-caption text-caption truncate">{c.name}</div>
                    </div>
                    <span className="type-caption text-caption">{c.region}</span>
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
