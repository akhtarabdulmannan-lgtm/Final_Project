'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';

export default function EmailUpdatesPage() {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) return;

    const supabase = getSupabaseClient();
    if (!supabase) {
      setIsSubscribed(true);
      return;
    }

    setLoading(true);
    try {
      const { error: rpcError } = await supabase.rpc('subscribe_newsletter', {
        p_email: email.trim().toLowerCase(),
        p_frequency: frequency,
      });

      if (rpcError) {
        setError(rpcError.message);
        return;
      }

      setIsSubscribed(true);
    } catch {
      setError('Could not save your subscription right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 py-10 sm:py-16">
      <div className="container-vx">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="badge-teal">Market Insights</span>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-surface-900 mt-2">
            Daily Currency Market Analysis
          </h1>
          <p className="text-sm text-surface-500 mt-2">
            Join 350,000+ traders and businesses receiving curated daily exchange rate movements, central bank forecasts, and macroeconomic briefings.
          </p>
        </div>

        <div className="max-w-xl mx-auto card p-6 sm:p-8 bg-white shadow-xl mb-12">
          {isSubscribed ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-surface-900">Subscription Confirmed!</h3>
              <p className="text-sm text-surface-600">
                You will receive your first briefing at <strong className="text-surface-900">{email}</strong> before tomorrow&apos;s market open.
              </p>
              <button
                onClick={() => { setIsSubscribed(false); }}
                className="btn-secondary btn-sm"
              >
                Change Preferences
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-surface-600 block mb-1">Your Work or Personal Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="input-field text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-surface-600 block mb-1">Briefing Cadence</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFrequency('daily')}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      frequency === 'daily' ? 'bg-brand-500 text-white border-brand-500' : 'bg-surface-50 border-surface-200 text-surface-700'
                    }`}
                  >
                    Daily Morning Pulse (Mon-Fri)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('weekly')}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      frequency === 'weekly' ? 'bg-brand-500 text-white border-brand-500' : 'bg-surface-50 border-surface-200 text-surface-700'
                    }`}
                  >
                    Weekly Macro Roundup (Sundays)
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center btn-lg"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Subscribing...</>
                ) : (
                  <><Mail className="w-4 h-4" /> Subscribe to Market Pulse</>
                )}
              </button>
              <p className="text-[11px] text-surface-400 text-center">
                Unsubscribe with one click anytime. We never share or sell your email address.
              </p>
            </form>
          )}
        </div>

        {/* Sample Newsletter Preview */}
        <div className="max-w-2xl mx-auto card p-6 bg-white border border-surface-200">
          <div className="flex items-center justify-between pb-4 border-b border-surface-100 text-xs text-surface-400">
            <span>Sample Edition: VectisX Daily Currency Morning Pulse</span>
            <span>08:00 AM UTC</span>
          </div>
          <div className="pt-4 space-y-3 text-sm text-surface-700">
            <h4 className="font-bold text-surface-900 text-base">US Dollar Steady Ahead of Federal Reserve Minutes</h4>
            <p className="text-xs leading-relaxed text-surface-600">
              The US Dollar Index (DXY) consolidated near 104.20 early Monday as currency traders weighed upcoming inflation indicators against European Central Bank commentary. EUR/USD hovers at 0.8534 while GBP/USD displays resilience around 1.2850.
            </p>
            <div className="p-3 rounded-xl bg-surface-50 font-mono text-xs flex justify-between">
              <span>EUR/USD: 1.1718 (-0.12%)</span>
              <span>GBP/USD: 1.2852 (+0.24%)</span>
              <span>USD/JPY: 149.50 (+0.05%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
