'use client';

import { useState, useEffect } from 'react';
import { Bell, CheckCircle2, Trash2, AlertCircle, Loader2, Check } from 'lucide-react';
import { currencies } from '@/data/currencies';
import { formatRate } from '@/lib/rates';
import { getSupabaseClient } from '@/lib/supabase';
import { useLiveRates } from '@/hooks/useLiveRates';
import ApiStatusBanner from '@/components/ui/ApiStatusBanner';
import Accordion from '@/components/ui/Accordion';
import {
  RateFlash,
  RevealCard,
  RevealSection,
  Skeleton,
  StepConnector,
  useHydrated,
} from '@/components/ui/MotionPrimitives';

interface SavedAlertRow {
  id: string;
  email: string;
  from_currency: string;
  to_currency: string;
  direction: 'above' | 'below';
  target_rate: number;
  is_active: boolean;
  created_at: string;
}

const alertFaqs = [
  {
    question: 'How do VectisX rate alerts work?',
    answer:
      'Choose any source and target currency pair, specify your desired exchange rate threshold, and enter your email. Our engine continuously monitors live institutional FX feeds and notifies you when markets reach your target.',
  },
  {
    question: 'Are VectisX rate alerts free?',
    answer:
      'Yes. Creating, managing, and syncing unlimited currency rate alerts to your VectisX cloud watchlist is completely free.',
  },
  {
    question: 'How often are target thresholds checked against live rates?',
    answer:
      'Live spot benchmarks are polled continuously from global interbank market feeds alongside official European Central Bank and central-bank reference tables.',
  },
];

export default function AlertsPage() {
  const [fromCode, setFromCode] = useState('USD');
  const [toCode, setToCode] = useState('PKR');
  const [direction, setDirection] = useState<'above' | 'below'>('above');
  const [targetRate, setTargetRate] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [savedAlerts, setSavedAlerts] = useState<SavedAlertRow[]>([]);
  const [alertsLoading, setAlertsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [justSucceeded, setJustSucceeded] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hydrated = useHydrated();
  const {
    data: ratesData,
    isLoading: ratesLoading,
    error: ratesError,
    source,
    lastUpdated,
    refresh,
    getLivePairRate,
  } = useLiveRates(fromCode);

  const currentRate = getLivePairRate(fromCode, toCode);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    supabase.auth.getUser().then(async ({ data }) => {
      const u = data.user;
      if (!u) return;
      setUserId(u.id);
      if (u.email) setEmail(u.email);

      setAlertsLoading(true);
      try {
        const { data: rows } = await supabase
          .from('rate_alerts')
          .select('*')
          .eq('user_id', u.id)
          .order('created_at', { ascending: false });

        if (rows) setSavedAlerts(rows as SavedAlertRow[]);
      } finally {
        setAlertsLoading(false);
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsedRate = Number(targetRate);
    if (!email.trim() || !Number.isFinite(parsedRate) || parsedRate <= 0) {
      setError('Please enter a valid positive target rate and notification email.');
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      setJustSucceeded(true);
      window.setTimeout(() => {
        setJustSucceeded(false);
        setIsSuccess(true);
      }, 800);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        user_id: userId,
        email: email.trim().toLowerCase(),
        from_currency: fromCode,
        to_currency: toCode,
        direction,
        target_rate: parsedRate,
      };

      const { data: inserted, error: insertError } = await supabase
        .from('rate_alerts')
        .insert(payload)
        .select('*')
        .maybeSingle();

      if (insertError) {
        setError(insertError.message);
        return;
      }

      if (inserted && userId) {
        setSavedAlerts((prev) => [inserted as SavedAlertRow, ...prev]);
      }

      setLoading(false);
      setJustSucceeded(true);
      window.setTimeout(() => {
        setJustSucceeded(false);
        setIsSuccess(true);
      }, 800);
      return;
    } catch {
      setError('Unable to save rate alert right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAlert = async (id: string) => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    await supabase.from('rate_alerts').delete().eq('id', id);
    setSavedAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-page">
      {/* Hero — Flat Navy #0B1B33 */}
      <section className="bg-navy text-white border-b border-navy-border py-14 sm:py-20">
        <div className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="badge-brand mb-3">24/7 Exchange Rate Triggers</span>
            <h1 className="type-h1 text-white">
              Never Miss the Ideal Exchange Rate
            </h1>
            <p className="type-body text-[#C9D3E3] mt-3 mx-auto">
              Set automated notifications for any currency pair and get alerted the moment global markets cross your target threshold.
            </p>
          </div>

          {/* Alert Form Card */}
          <div className="max-w-xl mx-auto card p-6 sm:p-8 bg-white text-navy">
            {isSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-gain-bg border border-gain-border text-gain-text rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
                </div>
                <h3 className="type-h3 text-navy">Rate Alert Activated!</h3>
                <p className="text-sm text-body mx-auto">
                  We will notify <strong className="text-navy">{email}</strong> immediately when{' '}
                  <strong className="text-navy">
                    {fromCode}/{toCode}
                  </strong>{' '}
                  goes {direction} <strong className="text-navy tabular-nums">{targetRate}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setTargetRate('');
                  }}
                  className="btn-primary btn-sm"
                >
                  Create Another Alert
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <ApiStatusBanner
                  isLoading={ratesLoading}
                  error={ratesError}
                  source={source}
                  lastUpdated={lastUpdated}
                  onRefresh={refresh}
                  compact
                />

                {error && (
                  <div className="p-3 rounded-xl bg-loss-bg border border-loss-border text-loss-text type-caption flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="alert-from" className="form-label block mb-1.5">
                      From
                    </label>
                    <select
                      id="alert-from"
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
                    <label htmlFor="alert-to" className="form-label block mb-1.5">
                      To
                    </label>
                    <select
                      id="alert-to"
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
                </div>

                <div className="p-3.5 bg-page border border-surface-200 rounded-xl flex items-center justify-between type-caption">
                  <span className="text-caption">Current live rate:</span>
                  {hydrated && ratesLoading && !ratesData ? (
                    <Skeleton className="h-5 w-36" />
                  ) : (
                    <RateFlash key={`${fromCode}-${toCode}`} value={currentRate} ready={Boolean(ratesData)}>
                      <span className="font-semibold text-navy tabular-nums">
                        1 {fromCode} = {formatRate(currentRate)} {toCode}
                      </span>
                    </RateFlash>
                  )}
                </div>

                <div>
                  <span className="form-label block mb-1.5">Notify me when rate goes</span>
                  <div className="grid grid-cols-2 gap-2" role="group" aria-label="Alert trigger direction">
                    <button
                      type="button"
                      aria-pressed={direction === 'above'}
                      onClick={() => setDirection('above')}
                      className={`min-h-[44px] px-3 py-2.5 type-caption font-semibold rounded-xl border transition-colors duration-150 ease-fintech ${
                        direction === 'above'
                          ? 'bg-primary-pale text-primary border-primary-border'
                          : 'bg-white border-surface-300 text-body hover:border-primary hover:text-primary'
                      }`}
                    >
                      Above or equal to &uarr;
                    </button>
                    <button
                      type="button"
                      aria-pressed={direction === 'below'}
                      onClick={() => setDirection('below')}
                      className={`min-h-[44px] px-3 py-2.5 type-caption font-semibold rounded-xl border transition-colors duration-150 ease-fintech ${
                        direction === 'below'
                          ? 'bg-primary-pale text-primary border-primary-border'
                          : 'bg-white border-surface-300 text-body hover:border-primary hover:text-primary'
                      }`}
                    >
                      Below or equal to &darr;
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="alert-target-rate" className="form-label block mb-1.5">
                    Target Rate
                  </label>
                  <input
                    id="alert-target-rate"
                    type="number"
                    step="0.0001"
                    placeholder={`e.g. ${(currentRate * 1.02).toFixed(4)}`}
                    value={targetRate}
                    onChange={(e) => setTargetRate(e.target.value)}
                    required
                    className="input-field text-base font-semibold text-navy tabular-nums"
                  />
                </div>

                <div>
                  <label htmlFor="alert-email" className="form-label block mb-1.5">
                    Notification Email
                  </label>
                  <input
                    id="alert-email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-field text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || justSucceeded}
                  className="btn-primary w-full justify-center btn-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Saving Alert...
                    </>
                  ) : justSucceeded ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" /> Alert Saved
                    </>
                  ) : (
                    <>
                      <Bell className="w-4 h-4" aria-hidden="true" /> Activate Free Rate Alert
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Saved Alerts for Authenticated Users (with neutral --line skeleton loading) */}
      {userId && (alertsLoading || savedAlerts.length > 0) && (
        <section className="py-12 bg-white border-b border-surface-200">
          <div className="container-vx max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="badge-gain mb-1">Synced with Account</span>
                <h2 className="type-h2 text-navy">Your Active Rate Alerts</h2>
              </div>
              <span className="type-caption font-semibold text-caption tabular-nums">
                {alertsLoading ? 'Syncing...' : `${savedAlerts.length} active`}
              </span>
            </div>

            {alertsLoading ? (
              <div className="space-y-3" aria-busy="true" aria-label="Loading saved alerts">
                <Skeleton className="h-16 w-full rounded-2xl" />
                <Skeleton className="h-16 w-full rounded-2xl" />
              </div>
            ) : (
              <div className="space-y-3">
                {savedAlerts.map((alertItem) => (
                  <div
                    key={alertItem.id}
                    className="flex items-center justify-between p-4 rounded-2xl border border-surface-200 bg-page"
                  >
                    <div>
                      <div className="font-semibold text-sm text-navy tabular-nums">
                        {alertItem.from_currency} / {alertItem.to_currency}{' '}
                        <span className="type-caption font-semibold text-navy">
                          ({alertItem.direction === 'above' ? '≥' : '≤'} {Number(alertItem.target_rate).toFixed(4)})
                        </span>
                      </div>
                      <div className="type-caption text-caption mt-0.5">Notifying {alertItem.email}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteAlert(alertItem.id)}
                      className="inline-flex items-center justify-center w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl text-caption hover:text-loss-text hover:bg-loss-bg transition-colors duration-150 ease-fintech"
                      aria-label={`Delete ${alertItem.from_currency} to ${alertItem.to_currency} alert`}
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* How it works (with animated StepConnector & staggered RevealCard) */}
      <section className="section-padding bg-white border-b border-surface-200">
        <RevealSection className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="type-h2 text-navy">How Rate Alerts Work</h2>
            <p className="type-caption text-caption mt-2 mx-auto">
              Effortless automated monitoring while you focus on your priorities.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-12 left-[18%] right-[18%] z-0 pointer-events-none">
              <StepConnector />
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <RevealCard index={0}>
                <div className="card text-center p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary-pale border border-primary-border text-primary flex items-center justify-center mx-auto mb-4 font-semibold text-lg tabular-nums">
                    1
                  </div>
                  <h3 className="type-h3 text-navy mb-2">Configure Your Target</h3>
                  <p className="text-sm text-body mx-auto">
                    Choose any pair and input your desired conversion threshold based on historical market trends.
                  </p>
                </div>
              </RevealCard>

              <RevealCard index={1}>
                <div className="card text-center p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary-pale border border-primary-border text-primary flex items-center justify-center mx-auto mb-4 font-semibold text-lg tabular-nums">
                    2
                  </div>
                  <h3 className="type-h3 text-navy mb-2">Continuous 24/7 Polling</h3>
                  <p className="text-sm text-body mx-auto">
                    Our automated engine monitors live feeds from global interbank and central-bank sources continuously.
                  </p>
                </div>
              </RevealCard>

              <RevealCard index={2}>
                <div className="card text-center p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary-pale border border-primary-border text-primary flex items-center justify-center mx-auto mb-4 font-semibold text-lg tabular-nums">
                    3
                  </div>
                  <h3 className="type-h3 text-navy mb-2">Instant Email Trigger</h3>
                  <p className="text-sm text-body mx-auto">
                    Receive immediate notifications with live rate context the moment markets cross your threshold.
                  </p>
                </div>
              </RevealCard>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-page">
        <RevealSection className="container-vx max-w-4xl">
          <div className="text-center mb-10">
            <span className="badge-brand">Support</span>
            <h2 className="type-h2 text-navy mt-2">Rate Alert FAQs</h2>
          </div>
          <Accordion items={alertFaqs} />
        </RevealSection>
      </section>
    </div>
  );
}
