import { useState } from 'react';
import { Bell, CheckCircle2 } from 'lucide-react';
import { currencies } from '@/data/currencies';
import { formatRate } from '@/lib/rates';
import { useLiveRates } from '@/lib/fx/RateProvider';
import { wait } from '@/lib/utils';
import Accordion from '@/components/ui/Accordion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StepConnector from '@/components/ui/StepConnector';
import LiveRateValue from '@/components/ui/LiveRateValue';
import LiveUpdatedBadge from '@/components/ui/LiveUpdatedBadge';
import ActionButton from '@/components/ui/ActionButton';
import { Skeleton } from '@/components/ui/Skeleton';

const alertFaqs = [
  {
    question: 'How do VectisX rate alerts work?',
    answer:
      'You choose a currency pair and your target exchange rate threshold. Our live monitoring engine checks market fluctuations 24/7 and notifies you immediately via email and push alert.',
  },
  {
    question: 'Are VectisX rate alerts free?',
    answer:
      'Yes. Personal rate alerts are 100% free with no hidden charges, subscription fees, or limits on standard pairs.',
  },
  {
    question: 'Can I set multiple alerts simultaneously?',
    answer:
      'Yes. You can monitor up to 20 currency pairs at the same time and configure both rise-above and drop-below triggers.',
  },
  {
    question: 'How fast will I receive the notification?',
    answer: 'Alerts are dispatched within seconds of the threshold being reached on interbank networks.',
  },
];

export default function AlertsPage() {
  const fx = useLiveRates();
  const [fromCode, setFromCode] = useState('USD');
  const [toCode, setToCode] = useState('EUR');
  const [direction, setDirection] = useState<'above' | 'below'>('above');
  const [targetRate, setTargetRate] = useState('');
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUpdatingPair, setIsUpdatingPair] = useState(false);
  const currentRate = fx.rate(fromCode, toCode);

  const handlePairChange = async (setter: (v: string) => void, val: string) => {
    setIsUpdatingPair(true);
    setter(val);
    await wait(200);
    setIsUpdatingPair(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !targetRate || submitStatus === 'loading') return;
    setSubmitStatus('loading');
    await wait(350);
    setSubmitStatus('success');
    window.setTimeout(() => {
      setIsSuccess(true);
      setSubmitStatus('idle');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="bg-surface border-b border-line py-12 sm:py-16">
        <div className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="flex justify-center">
              <span className="badge-neutral">
                <LiveUpdatedBadge utcTime={fx.updatedAt} />
              </span>
            </div>
            <h1>Never Miss the Ideal Exchange Rate</h1>
            <p className="text-ink-500 mx-auto">
              Set automated notifications for any currency pair. Get notified by email or push the second markets reach your target.
            </p>
          </div>

          {/* Alert Form Card */}
          <div className="max-w-xl mx-auto card p-6 sm:p-8 bg-surface">
            {isSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 bg-gain-bg border border-gain-border text-gain rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3>Rate Alert Activated</h3>
                <p className="text-ink-500 mx-auto">
                  We will notify <strong className="text-ink font-semibold">{email}</strong> when{' '}
                  <strong className="text-ink font-semibold">
                    {fromCode}/{toCode}
                  </strong>{' '}
                  goes {direction}{' '}
                  <strong className="text-ink font-semibold tabular-nums">{targetRate}</strong>.
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="alert-from" className="block mb-1.5">
                      From
                    </label>
                    <select
                      id="alert-from"
                      value={fromCode}
                      onChange={(e) => handlePairChange(setFromCode, e.target.value)}
                      className="select-field text-[14px] font-medium"
                    >
                      {currencies.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code} - {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="alert-to" className="block mb-1.5">
                      To
                    </label>
                    <select
                      id="alert-to"
                      value={toCode}
                      onChange={(e) => handlePairChange(setToCode, e.target.value)}
                      className="select-field text-[14px] font-medium"
                    >
                      {currencies.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code} - {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {isUpdatingPair ? (
                  <div className="p-3 bg-surface-subtle rounded-xl border border-line">
                    <Skeleton className="h-5 w-48" />
                  </div>
                ) : (
                  <div className="p-3.5 bg-surface-subtle rounded-xl border border-line flex items-center justify-between text-[14px]">
                    <span className="text-ink-500">Current live rate:</span>
                    <span className="font-semibold text-ink tabular-nums">
                      1 {fromCode} ={' '}
                      <LiveRateValue
                        value={currentRate}
                        pairKey={`${fromCode}-${toCode}`}
                        formatted={formatRate(currentRate)}
                      />{' '}
                      {toCode}
                    </span>
                  </div>
                )}

                <div>
                  <span className="block text-[13px] leading-[18px] font-medium text-ink-700 mb-1.5">
                    Notify me when rate goes
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDirection('above')}
                      aria-pressed={direction === 'above'}
                      className={`min-h-[44px] px-4 text-[13px] font-medium rounded-xl border transition-colors duration-150 ${
                        direction === 'above'
                          ? 'bg-primary text-primary-fg border-primary'
                          : 'bg-surface border-line-strong text-ink-700 hover:bg-surface-subtle'
                      }`}
                    >
                      Above or equal to &uarr;
                    </button>
                    <button
                      type="button"
                      onClick={() => setDirection('below')}
                      aria-pressed={direction === 'below'}
                      className={`min-h-[44px] px-4 text-[13px] font-medium rounded-xl border transition-colors duration-150 ${
                        direction === 'below'
                          ? 'bg-primary text-primary-fg border-primary'
                          : 'bg-surface border-line-strong text-ink-700 hover:bg-surface-subtle'
                      }`}
                    >
                      Below or equal to &darr;
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="alert-target-rate" className="block mb-1.5">
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
                    className="input-field font-semibold tabular-nums"
                  />
                </div>

                <div>
                  <label htmlFor="alert-email" className="block mb-1.5">
                    Notification Email
                  </label>
                  <input
                    id="alert-email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-field"
                  />
                </div>

                <ActionButton
                  type="submit"
                  status={submitStatus}
                  successLabel="Alert Activated"
                  className="w-full justify-center btn-lg"
                >
                  <span className="inline-flex items-center gap-2">
                    <Bell className="w-4 h-4" aria-hidden="true" />
                    <span>Activate Free Rate Alert</span>
                  </span>
                </ActionButton>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-bg border-b border-line">
        <div className="container-vx">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <h2>How Rate Alerts Work</h2>
              <p className="text-ink-500 mx-auto">
                Effortless automated monitoring while you go about your day.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <StepConnector />

            {[
              {
                step: '1',
                title: 'Configure Your Target',
                desc: 'Choose any pair and input your desired conversion threshold based on historical market trends.',
              },
              {
                step: '2',
                title: 'We Watch 24/7',
                desc: 'Our automated algorithms poll continuous live feeds from global interbank markets without interruption.',
              },
              {
                step: '3',
                title: 'Receive Instant Notification',
                desc: 'Receive instant emails and push pings with direct links to lock in your transfer rate.',
              },
            ].map((item, idx) => (
              <ScrollReveal key={item.step} delay={idx * 50} className="relative z-10">
                <div className="card text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary text-primary-fg flex items-center justify-center mx-auto mb-4 font-semibold text-[18px] tabular-nums">
                    {item.step}
                  </div>
                  <h3 className="mb-2">{item.title}</h3>
                  <p className="text-ink-500 mx-auto text-[15px] leading-[24px]">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-surface">
        <div className="container-vx max-w-4xl">
          <div className="text-center mb-10 space-y-2">
            <span className="badge-neutral">Assistance</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <Accordion items={alertFaqs} />
        </div>
      </section>
    </div>
  );
}
