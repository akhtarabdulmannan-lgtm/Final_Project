import { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import ActionButton from '@/components/ui/ActionButton';
import DeltaChip from '@/components/ui/DeltaChip';
import { wait } from '@/lib/utils';

export default function EmailUpdatesPage() {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitStatus === 'loading') return;
    setSubmitStatus('loading');
    await wait(300);
    setSubmitStatus('success');
    window.setTimeout(() => {
      setIsSubscribed(true);
      setSubmitStatus('idle');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-bg py-10 sm:py-16">
      <div className="container-vx">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="badge-neutral">Market Insights</span>
          <h1>Daily Currency Market Analysis</h1>
          <p className="text-ink-500 mx-auto">
            Join 350,000+ traders and businesses receiving curated daily exchange rate movements, central bank forecasts, and macroeconomic briefings.
          </p>
        </div>

        <div className="max-w-xl mx-auto card p-6 sm:p-8 bg-surface mb-12">
          {isSubscribed ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-gain-bg border border-gain-border text-gain rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
              </div>
              <h3>Subscription Confirmed</h3>
              <p className="text-ink-500 mx-auto">
                You will receive your first briefing at <strong className="text-ink font-semibold">{email}</strong> before tomorrow’s market open.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubscribed(false);
                  setEmail('');
                }}
                className="btn-secondary btn-sm"
              >
                Change Preferences
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="newsletter-email" className="block mb-1.5">
                  Your Work or Personal Email
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="input-field"
                />
              </div>

              <div>
                <span className="block text-[13px] leading-[18px] font-medium text-ink-700 mb-1.5">
                  Briefing Cadence
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFrequency('daily')}
                    aria-pressed={frequency === 'daily'}
                    className={`min-h-[44px] px-4 text-[13px] font-medium rounded-xl border transition-colors duration-150 ${
                      frequency === 'daily'
                        ? 'bg-primary text-primary-fg border-primary'
                        : 'bg-surface border-line-strong text-ink-700 hover:bg-surface-subtle'
                    }`}
                  >
                    Daily Morning Pulse (Mon–Fri)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('weekly')}
                    aria-pressed={frequency === 'weekly'}
                    className={`min-h-[44px] px-4 text-[13px] font-medium rounded-xl border transition-colors duration-150 ${
                      frequency === 'weekly'
                        ? 'bg-primary text-primary-fg border-primary'
                        : 'bg-surface border-line-strong text-ink-700 hover:bg-surface-subtle'
                    }`}
                  >
                    Weekly Macro Roundup (Sundays)
                  </button>
                </div>
              </div>

              <ActionButton
                type="submit"
                status={submitStatus}
                successLabel="Subscribed"
                className="w-full justify-center btn-lg"
              >
                <span className="inline-flex items-center gap-2">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <span>Subscribe to Market Pulse</span>
                </span>
              </ActionButton>

              <p className="text-caption text-ink-500 text-center mx-auto">
                Unsubscribe with one click anytime. We never share or sell your email address.
              </p>
            </form>
          )}
        </div>

        {/* Sample Newsletter Preview */}
        <div className="max-w-2xl mx-auto card p-6 bg-surface">
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-line text-caption text-ink-500 gap-2">
            <span>Sample Edition: VectisX Daily Currency Morning Pulse</span>
            <span className="tabular-nums">08:00:00 UTC</span>
          </div>
          <div className="pt-4 space-y-3">
            <h3>US Dollar Steady Ahead of Federal Reserve Minutes</h3>
            <p className="text-ink-500">
              The US Dollar Index consolidated near 104.20 as currency traders weighed upcoming inflation indicators against European Central Bank commentary.
            </p>
            <div className="p-3.5 rounded-xl bg-surface-subtle border border-line flex flex-wrap justify-between items-center gap-3 text-[14px] tabular-nums">
              <span className="inline-flex items-center gap-2">
                <strong className="font-medium text-ink">EUR/USD: 1.1718</strong>
                <DeltaChip change={-0.12} />
              </span>
              <span className="inline-flex items-center gap-2">
                <strong className="font-medium text-ink">GBP/USD: 1.2852</strong>
                <DeltaChip change={0.24} />
              </span>
              <span className="inline-flex items-center gap-2">
                <strong className="font-medium text-ink">USD/JPY: 149.50</strong>
                <DeltaChip change={0.05} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
