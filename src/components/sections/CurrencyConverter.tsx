'use client';

import { useState } from 'react';
import { ArrowLeftRight, TrendingUp, Bell, Send, ChevronDown, Search, X, CheckCircle2, Loader2 } from 'lucide-react';
import { currencies, getCurrency, searchCurrencies } from '@/data/currencies';
import { formatRate, formatAmount, get24hChange } from '@/lib/rates';
import { getSupabaseClient } from '@/lib/supabase';
import { useLiveRates } from '@/hooks/useLiveRates';
import ApiStatusBanner from '@/components/ui/ApiStatusBanner';
import Link from 'next/link';

type Tab = 'convert' | 'send' | 'charts' | 'alerts';

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
  const [isSwapping, setIsSwapping] = useState(false);
  const [pickerOpen, setPickerOpen] = useState<'from' | 'to' | null>(null);
  const [pickerSearch, setPickerSearch] = useState('');

  // Live REST API rates via async/await fetch
  const { isLoading, error, source, lastUpdated, refresh, getLivePairRate } = useLiveRates(fromCode);

  // Quick alert state
  const [alertTarget, setAlertTarget] = useState('');
  const [alertEmail, setAlertEmail] = useState('');
  const [alertSaving, setAlertSaving] = useState(false);
  const [alertSaved, setAlertSaved] = useState(false);
  const [alertError, setAlertError] = useState<string | null>(null);

  const rate = getLivePairRate(fromCode, toCode);
  const result = amount * rate;
  const inverseRate = rate > 0 ? 1 / rate : 0;
  const change = get24hChange(fromCode, toCode);
  const fromCurrency = getCurrency(fromCode);
  const toCurrency = getCurrency(toCode);

  const handleSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setFromCode(toCode);
      setToCode(fromCode);
      setIsSwapping(false);
    }, 200);
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
      setAlertSaved(true);
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
      setAlertSaved(true);
    } catch {
      setAlertError('Could not save alert right now.');
    } finally {
      setAlertSaving(false);
    }
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'convert', label: 'Convert', icon: <ArrowLeftRight className="w-4 h-4" /> },
    { key: 'send', label: 'Send', icon: <Send className="w-4 h-4" /> },
    { key: 'charts', label: 'Charts', icon: <TrendingUp className="w-4 h-4" /> },
    { key: 'alerts', label: 'Alerts', icon: <Bell className="w-4 h-4" /> },
  ];

  const filteredCurrencies = pickerSearch
    ? searchCurrencies(pickerSearch)
    : currencies;

  return (
    <div className={`bg-white rounded-3xl shadow-2xl shadow-brand-900/10 border border-surface-200 overflow-hidden text-surface-900 ${compact ? '' : 'max-w-xl w-full'}`}>
      {/* Tabs */}
      <div className="flex border-b border-surface-100">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 text-sm font-medium transition-all duration-200 border-b-2 ${
              activeTab === tab.key
                ? 'text-brand-500 border-brand-500 bg-brand-50/50'
                : 'text-surface-500 border-transparent hover:text-surface-700 hover:bg-surface-50'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
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
              <label className="text-xs font-medium text-surface-500 mb-1.5 block">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400 font-medium">
                  {fromCurrency?.symbol}
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                  className="input-field pl-10 text-lg font-semibold"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* From / To with swap */}
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label className="text-xs font-medium text-surface-500 mb-1.5 block">From</label>
                <button
                  type="button"
                  onClick={() => { setPickerOpen('from'); setPickerSearch(''); }}
                  className="input-field flex items-center gap-2 text-left"
                >
                  <span className="text-lg">{fromCurrency?.flag}</span>
                  <span className="font-semibold">{fromCode}</span>
                  <span className="text-surface-400 text-xs hidden sm:inline truncate">{fromCurrency?.name}</span>
                  <ChevronDown className="w-4 h-4 text-surface-400 ml-auto flex-shrink-0" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleSwap}
                className={`mb-0.5 w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center hover:bg-brand-100 transition-all duration-200 flex-shrink-0 ${
                  isSwapping ? 'animate-swap-rotate' : ''
                }`}
                aria-label="Swap currencies"
              >
                <ArrowLeftRight className="w-4 h-4 text-brand-500" />
              </button>

              <div className="flex-1">
                <label className="text-xs font-medium text-surface-500 mb-1.5 block">To</label>
                <button
                  type="button"
                  onClick={() => { setPickerOpen('to'); setPickerSearch(''); }}
                  className="input-field flex items-center gap-2 text-left"
                >
                  <span className="text-lg">{toCurrency?.flag}</span>
                  <span className="font-semibold">{toCode}</span>
                  <span className="text-surface-400 text-xs hidden sm:inline truncate">{toCurrency?.name}</span>
                  <ChevronDown className="w-4 h-4 text-surface-400 ml-auto flex-shrink-0" />
                </button>
              </div>
            </div>

            {/* Result */}
            <div className="bg-surface-50 rounded-2xl p-4 mt-2">
              <div className="text-xs text-surface-500 mb-1">
                {formatAmount(amount)} {fromCurrency?.name} =
              </div>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-surface-900">
                {formatAmount(result)} <span className="text-brand-500">{toCode}</span>
              </div>
              <div className="flex items-center gap-3 mt-2 text-xs text-surface-500">
                <span>1 {fromCode} = {formatRate(rate)} {toCode}</span>
                <span className="text-surface-300">|</span>
                <span>1 {toCode} = {formatRate(inverseRate)} {fromCode}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-xs font-medium ${change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(2)}% (24h)
                </span>
                <span className="badge-teal text-[10px]">Live Mid-Market Rate</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-2">
              <Link href="/charts" className="btn-primary flex-1 justify-center">
                View Full Chart
              </Link>
              <Link href="/send" className="btn-secondary flex-1 justify-center">
                Send {toCode}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Send Tab */}
      {activeTab === 'send' && (
        <div className="p-5 sm:p-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-surface-500 mb-1.5 block">You send</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400 font-medium">
                    {fromCurrency?.symbol}
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value) || 0)}
                    className="input-field pl-10 text-lg font-semibold"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => { setPickerOpen('from'); setPickerSearch(''); }}
                  className="input-field w-28 flex items-center gap-1.5 justify-center"
                >
                  <span>{fromCurrency?.flag}</span>
                  <span className="font-semibold text-sm">{fromCode}</span>
                  <ChevronDown className="w-3 h-3 text-surface-400" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-2 text-xs text-surface-500">
              <span>Send rate: {formatRate(rate)}</span>
              <span>Fee: {amount >= 5000 ? 'FREE' : amount >= 1000 ? '$3.99' : '$5.99'}</span>
            </div>

            <div>
              <label className="text-xs font-medium text-surface-500 mb-1.5 block">Recipient gets</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400 font-medium">
                    {toCurrency?.symbol}
                  </span>
                  <input
                    type="number"
                    value={Number(result.toFixed(2))}
                    readOnly
                    className="input-field pl-10 text-lg font-semibold bg-surface-50"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => { setPickerOpen('to'); setPickerSearch(''); }}
                  className="input-field w-28 flex items-center gap-1.5 justify-center"
                >
                  <span>{toCurrency?.flag}</span>
                  <span className="font-semibold text-sm">{toCode}</span>
                  <ChevronDown className="w-3 h-3 text-surface-400" />
                </button>
              </div>
            </div>

            <div className="bg-surface-50 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-surface-500">Total to pay</span>
                <span className="font-bold text-surface-900">{fromCurrency?.symbol}{formatAmount(amount + (amount >= 5000 ? 0 : amount >= 1000 ? 3.99 : 5.99))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-surface-500">Delivery</span>
                <span className="font-medium text-emerald-600">1-2 business days</span>
              </div>
            </div>

            <Link href="/send" className="btn-primary w-full justify-center btn-lg">
              <Send className="w-4 h-4" /> Get Started — Send {toCode}
            </Link>
          </div>
        </div>
      )}

      {/* Charts Tab */}
      {activeTab === 'charts' && (
        <div className="p-5 sm:p-6 text-center">
          <div className="py-8">
            <TrendingUp className="w-12 h-12 text-brand-200 mx-auto mb-3" />
            <h3 className="text-lg font-heading font-bold text-surface-900 mb-2">
              {fromCode}/{toCode} Charts
            </h3>
            <p className="text-sm text-surface-500 mb-4">
              Track live and historical exchange rate trends spanning 1 week to 10 years.
            </p>
            <Link
              href={`/charts?from=${fromCode}&to=${toCode}`}
              className="btn-primary"
            >
              <TrendingUp className="w-4 h-4" /> View Full Charts
            </Link>
          </div>
        </div>
      )}

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <div className="p-5 sm:p-6">
          <div className="py-2 text-center">
            <Bell className="w-10 h-10 text-brand-300 mx-auto mb-2" />
            <h3 className="text-lg font-heading font-bold text-surface-900 mb-1">
              Set a {fromCode}/{toCode} Rate Alert
            </h3>
            <p className="text-xs text-surface-500 mb-4">
              Live rate: 1 {fromCode} = {formatRate(rate)} {toCode}. Get notified when markets hit your target.
            </p>

            {alertSaved ? (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 space-y-2 max-w-xs mx-auto">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 mx-auto" />
                <div className="text-sm font-bold">Alert Activated!</div>
                <p className="text-xs">We&apos;ll email {alertEmail} when {fromCode}/{toCode} reaches {alertTarget}.</p>
                <button
                  type="button"
                  onClick={() => { setAlertSaved(false); setAlertTarget(''); }}
                  className="btn-primary btn-sm"
                >
                  Set Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickAlert} className="space-y-3 text-left max-w-xs mx-auto text-surface-900">
                {alertError && (
                  <div className="p-2 rounded-lg bg-rose-50 text-rose-700 text-xs">{alertError}</div>
                )}
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1 block">Target rate</label>
                  <input
                    type="number"
                    required
                    value={alertTarget}
                    onChange={(e) => setAlertTarget(e.target.value)}
                    className="input-field"
                    placeholder={formatRate(rate)}
                    step="0.0001"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1 block">Email</label>
                  <input
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
                  disabled={alertSaving}
                  className="btn-primary w-full justify-center"
                >
                  {alertSaving ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                  ) : (
                    <><Bell className="w-4 h-4" /> Create Alert</>
                  )}
                </button>
                <div className="text-center pt-1">
                  <Link href="/alerts" className="text-xs text-brand-500 hover:underline font-medium">
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
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 text-surface-900">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setPickerOpen(null)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[70vh] flex flex-col animate-scale-in">
            <div className="p-4 border-b border-surface-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-surface-900">
                  Select {pickerOpen === 'from' ? 'source' : 'target'} currency
                </h3>
                <button type="button" onClick={() => setPickerOpen(null)} className="p-1 hover:bg-surface-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                <input
                  type="text"
                  value={pickerSearch}
                  onChange={(e) => setPickerSearch(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Search currency or country..."
                  autoFocus
                />
              </div>
            </div>
            <div className="overflow-y-auto flex-1 p-2">
              {filteredCurrencies.map((c) => (
                <button
                  type="button"
                  key={c.code}
                  onClick={() => {
                    if (pickerOpen === 'from') setFromCode(c.code);
                    else setToCode(c.code);
                    setPickerOpen(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    (pickerOpen === 'from' ? fromCode : toCode) === c.code
                      ? 'bg-brand-50 text-brand-600'
                      : 'hover:bg-surface-50'
                  }`}
                >
                  <span className="text-xl">{c.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{c.code}</div>
                    <div className="text-xs text-surface-500 truncate">{c.name}</div>
                  </div>
                  <span className="text-xs text-surface-400">{c.region}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
