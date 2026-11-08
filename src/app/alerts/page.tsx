'use client';

import { useState } from 'react';
import { Bell, ArrowRight, CheckCircle2, ShieldCheck, Mail, Zap, TrendingUp } from 'lucide-react';
import { currencies } from '@/data/currencies';
import { getRate, formatRate } from '@/lib/rates';
import Accordion from '@/components/ui/Accordion';

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
  const [isSuccess, setIsSuccess] = useState(false);

  const currentRate = getRate(fromCode, toCode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !targetRate) return;
    setIsSuccess(true);
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

                <button type="submit" className="btn-primary w-full justify-center btn-lg">
                  <Bell className="w-4 h-4" /> Activate Free Rate Alert
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

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
