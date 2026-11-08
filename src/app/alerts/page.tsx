'use client';

import { useState, useEffect, useCallback } from 'react';
import { Bell, CheckCircle2, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import { currencies } from '@/data/currencies';
import { getRate, formatRate } from '@/lib/rates';
import { getSupabaseClient } from '@/lib/supabase';
import Accordion from '@/components/ui/Accordion';

interface SavedAlert {
  id: string;
  from_currency: string;
  to_currency: string;
  direction: 'above' | 'below';
  target_rate: number;
  email: string;
  is_active: boolean;
  created_at: string;
}

const alertFaqs = [
  {
    question: 'How do VectisX rate alerts work?',
    answer: 'You choose a currency pair (e.g. USD to EUR) and your target exchange rate threshold. Our live monitoring engine continuously checks market fluctuations 24/7. As soon as the rate hits or exceeds your target, we trigger an immediate alert via email and mobile push notification.'
  },
  {
    question: 'Are VectisX rate alerts free?',
    answer: 'Yes! Personal rate alerts are 100% free with no hidden charges, subscription fees, or limits on standard pairs.'
  },
  {
    question: 'Can I set multiple alerts simultaneously?',
    answer: 'Absolutely. You can monitor up to 20 currency pairs at the same time and configure both "rise above" and "drop below" triggers.'
  },
  {
    question: 'How fast will I receive the notification?',
    answer: 'Alerts are dispatched within seconds of the threshold being reached on interbank trading networks.'
  }
];

export default function AlertsPage() {
  const [fromCode, setFromCode] = useState('USD');
  const [toCode, setToCode] = useState('EUR');
  const [direction, setDirection] = useState<'above' | 'below'>('above');
  const [targetRate, setTargetRate] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [savedAlerts, setSavedAlerts] = useState<SavedAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const currentRate = getRate(fromCode, toCode);

  const loadAlerts = useCallback(async () => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) {
      setUserId(null);
      setSavedAlerts([]);
      return;
    }

    setUserId(user.id);
    if (user.email) {
      setEmail((prev) => prev || user.email || '');
    }

    const { data } = await supabase
      .from('rate_alerts')
      .select('id, from_currency, to_currency, direction, target_rate, email, is_active, created_at')
      .order('created_at', { ascending: false });

    if (data) {
      setSavedAlerts(data as SavedAlert[]);
    }
  }, []);

  useEffect(() => {
    loadAlerts();
    const supabase = getSupabaseClient();
    if (!supabase) return;
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadAlerts();
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [loadAlerts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !targetRate) return;

    const numericRate = Number(targetRate);
    if (!Number.isFinite(numericRate) || numericRate <= 0) {
      setError('Please enter a valid positive target rate.');
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      setIsSuccess(true);
      return;
    }

    setLoading(true);
    try {
      const { error: insertError } = await supabase.from('rate_alerts').insert({
        user_id: userId,
        email: email.trim().toLowerCase(),
        from_currency: fromCode,
        to_currency: toCode,
        direction,
        target_rate: numericRate,
      });

      if (insertError) {
        setError(insertError.message);
        return;
      }

      setIsSuccess(true);
      if (userId) {
        await loadAlerts();
      }
    } catch {
      setError('Could not save your rate alert right now. Please try again.');
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
    <div className="min-h-screen bg-surface-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800 text-white py-14 sm:py-20">
        <div className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="badge-teal mb-3">24/7 Exchange Rate Triggers</span>
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight">
              Never Miss the Ideal Exchange Rate
            </h1>
            <p className="text-surface-300 mt-3 text-base">
              Set automated notifications for any currency pair. Get notified by email or mobile push the second markets reach your target.
            </p>
          </div>

          {/* Alert Form Card */}
          <div className="max-w-xl mx-auto card p-6 sm:p-8 bg-white text-surface-900 shadow-2xl">
            {isSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-surface-900">Rate Alert Activated!</h3>
                <p className="text-sm text-surface-600">
                  We will notify <strong className="text-surface-900">{email}</strong> immediately when <strong>{fromCode}/{toCode}</strong> goes {direction} <strong>{targetRate}</strong>.
                </p>
                <button
                  onClick={() => { setIsSuccess(false); setTargetRate(''); }}
                  className="btn-primary btn-sm"
                >
                  Create Another Alert
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-surface-600 block mb-1">From</label>
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
                    <label className="text-xs font-semibold text-surface-600 block mb-1">To</label>
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
                </div>

                <div className="p-3 bg-surface-50 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-surface-500">Current live rate:</span>
                  <span className="font-mono font-bold text-surface-900">
                    1 {fromCode} = {formatRate(currentRate)} {toCode}
                  </span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-surface-600 block mb-1">Notify me when rate goes</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDirection('above')}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        direction === 'above' ? 'bg-brand-500 text-white border-brand-500' : 'bg-surface-50 border-surface-200 text-surface-700'
                      }`}
                    >
                      Above or equal to &uarr;
                    </button>
                    <button
                      type="button"
                      onClick={() => setDirection('below')}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        direction === 'below' ? 'bg-brand-500 text-white border-brand-500' : 'bg-surface-50 border-surface-200 text-surface-700'
                      }`}
                    >
                      Below or equal to &darr;
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-surface-600 block mb-1">Target Rate</label>
                  <input
                    type="number"
                    step="0.0001"
                    placeholder={`e.g. ${(currentRate * 1.02).toFixed(4)}`}
                    value={targetRate}
                    onChange={(e) => setTargetRate(e.target.value)}
                    required
                    className="input-field text-base font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-surface-600 block mb-1">Notification Email</label>
                  <input
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
                  disabled={loading}
                  className="btn-primary w-full justify-center btn-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Saving Alert...
                    </>
                  ) : (
                    <>
                      <Bell className="w-4 h-4" /> Activate Free Rate Alert
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Saved Alerts for Authenticated Users */}
      {userId && savedAlerts.length > 0 && (
        <section className="py-12 bg-white border-b border-surface-200">
          <div className="container-vx max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="badge-teal mb-1">Synced with Account</span>
                <h2 className="text-2xl font-heading font-bold text-surface-900">Your Active Rate Alerts</h2>
              </div>
              <span className="text-xs font-semibold text-surface-500">{savedAlerts.length} active</span>
            </div>

            <div className="space-y-3">
              {savedAlerts.map((alertItem) => (
                <div
                  key={alertItem.id}
                  className="flex items-center justify-between p-4 rounded-2xl border border-surface-200 bg-surface-50"
                >
                  <div>
                    <div className="font-bold text-sm text-surface-900">
                      {alertItem.from_currency} / {alertItem.to_currency}{' '}
                      <span className="text-xs font-semibold text-brand-600">
                        ({alertItem.direction === 'above' ? '≥' : '≤'} {Number(alertItem.target_rate).toFixed(4)})
                      </span>
                    </div>
                    <div className="text-xs text-surface-500 mt-0.5">
                      Notifying {alertItem.email}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteAlert(alertItem.id)}
                    className="p-2 rounded-xl text-surface-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    aria-label="Delete alert"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="section-padding bg-white border-b border-surface-200">
        <div className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-heading font-bold text-surface-900">How Rate Alerts Work</h2>
            <p className="text-sm text-surface-500 mt-2">Effortless automated monitoring while you go about your day.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center p-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                1
              </div>
              <h3 className="font-bold text-surface-900 text-base mb-2">Configure Your Target</h3>
              <p className="text-xs text-surface-500 leading-relaxed">
                Choose any pair and input your desired conversion threshold based on historical market trends.
              </p>
            </div>

            <div className="card text-center p-6">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                2
              </div>
              <h3 className="font-bold text-surface-900 text-base mb-2">We Watch 24/7</h3>
              <p className="text-xs text-surface-500 leading-relaxed">
                Our automated algorithms poll continuous live feeds from global interbank markets without interruption.
              </p>
            </div>

            <div className="card text-center p-6">
              <div className="w-12 h-12 rounded-2xl bg-accent-100 text-accent-600 flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                3
              </div>
              <h3 className="font-bold text-surface-900 text-base mb-2">Receive Instant Notification</h3>
              <p className="text-xs text-surface-500 leading-relaxed">
                Receive instant emails and mobile push pings with direct one-click buttons to lock in your transfer rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-surface-50">
        <div className="container-vx max-w-4xl">
          <div className="text-center mb-10">
            <span className="badge-brand">Assistance</span>
            <h2 className="text-3xl font-heading font-bold text-surface-900 mt-2">Frequently Asked Questions</h2>
          </div>
          <Accordion items={alertFaqs} />
        </div>
      </section>
    </div>
  );
}
