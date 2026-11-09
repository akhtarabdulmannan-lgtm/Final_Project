'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';
import {
  RevealSection,
  StatefulButtonContent,
  useButtonFeedback,
} from '@/components/ui/MotionPrimitives';

export default function EmailUpdatesPage() {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [error, setError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const feedback = useButtonFeedback();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) return;

    const supabase = getSupabaseClient();
    if (!supabase) {
      feedback.triggerSuccess();
      setTimeout(() => setIsSubscribed(true), 800);
      return;
    }

    feedback.startLoading();
    try {
      const { error: rpcError } = await supabase.rpc('subscribe_newsletter', {
        p_email: email.trim().toLowerCase(),
        p_frequency: frequency,
      });

      if (rpcError) {
        feedback.reset();
        setError(rpcError.message);
        return;
      }

      feedback.triggerSuccess();
      setTimeout(() => setIsSubscribed(true), 800);
    } catch {
      feedback.reset();
      setError('Could not save your subscription right now. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-page py-10 sm:py-16">
      <div className="container-vx">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="badge-brand">Market Insights</span>
          <h1 className="type-h1 text-navy mt-2">
            Daily Currency Market Analysis
          </h1>
          <p className="type-body text-body mt-2 mx-auto">
            Join 350,000+ traders and businesses receiving curated daily exchange rate movements, central bank forecasts, and macroeconomic briefings.
          </p>
        </div>

        <div className="max-w-xl mx-auto card p-6 sm:p-8 bg-white mb-12">
          {isSubscribed ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-gain-bg border border-gain-border text-gain-text rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
              </div>
              <h2 className="type-h3 text-navy">Subscription Confirmed!</h2>
              <p className="text-sm text-body mx-auto">
                You will receive your first briefing at{' '}
                <strong className="font-semibold text-navy">{email}</strong> before tomorrow&apos;s market open.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubscribed(false);
                  feedback.reset();
                }}
                className="btn-secondary btn-sm"
              >
                Change Preferences
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-loss-bg border border-loss-border text-loss-text type-caption flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="pulse-email" className="form-label block mb-1.5">
                  Your Work or Personal Email
                </label>
                <input
                  id="pulse-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="input-field text-sm"
                />
              </div>

              <div>
                <span className="form-label block mb-1.5">Briefing Cadence</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="tablist" aria-label="Briefing cadence">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={frequency === 'daily'}
                    onClick={() => setFrequency('daily')}
                    className={`min-h-[44px] px-3 py-2 type-caption font-semibold rounded-xl border transition-colors duration-150 ease-fintech ${
                      frequency === 'daily'
                        ? 'bg-primary text-white border-primary'
                        : 'bg-page border-surface-200 text-navy hover:border-surface-300'
                    }`}
                  >
                    Daily Morning Pulse (Mon-Fri)
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={frequency === 'weekly'}
                    onClick={() => setFrequency('weekly')}
                    className={`min-h-[44px] px-3 py-2 type-caption font-semibold rounded-xl border transition-colors duration-150 ease-fintech ${
                      frequency === 'weekly'
                        ? 'bg-primary text-white border-primary'
                        : 'bg-page border-surface-200 text-navy hover:border-surface-300'
                    }`}
                  >
                    Weekly Macro Roundup (Sundays)
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={feedback.status === 'loading'}
                className="btn-primary w-full justify-center btn-lg"
              >
                <StatefulButtonContent
                  status={feedback.status}
                  idleLabel={
                    <>
                      <Mail className="w-4 h-4" aria-hidden="true" /> Subscribe to Market Pulse
                    </>
                  }
                  loadingLabel="Subscribing..."
                  successLabel="Subscribed"
                />
              </button>
              <p className="type-caption text-caption text-center">
                Unsubscribe with one click anytime. We never share or sell your email address.
              </p>
            </form>
          )}
        </div>

        {/* Sample Newsletter Preview */}
        <RevealSection className="max-w-2xl mx-auto card p-6 bg-white">
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-surface-200 type-caption text-caption gap-2 tabular-nums">
            <span>Sample Edition: VectisX Daily Currency Morning Pulse</span>
            <span>08:00 AM UTC</span>
          </div>
          <div className="pt-4 space-y-3 text-sm text-body">
            <h2 className="type-h3 text-navy">
              US Dollar Steady Ahead of Federal Reserve Minutes
            </h2>
            <p className="text-sm text-body">
              The US Dollar Index (DXY) consolidated near 104.20 early Monday as currency traders weighed upcoming inflation indicators against European Central Bank commentary. EUR/USD hovers at 0.8534 while GBP/USD displays resilience around 1.2850.
            </p>
            <div className="p-3.5 rounded-xl bg-page border border-surface-200 type-caption flex flex-wrap gap-3 justify-between tabular-nums">
              <span className="inline-flex items-center gap-1.5 text-navy font-semibold">
                EUR/USD: 1.1718 <span className="badge-loss text-[11px]">▼ -0.12%</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-navy font-semibold">
                GBP/USD: 1.2852 <span className="badge-gain text-[11px]">▲ +0.24%</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-navy font-semibold">
                USD/JPY: 149.50 <span className="badge-gain text-[11px]">▲ +0.05%</span>
              </span>
            </div>
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
