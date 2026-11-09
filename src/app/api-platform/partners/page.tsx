'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ActionButton from '@/components/ui/ActionButton';
import { wait } from '@/lib/utils';

export default function ApiPartnersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const tracks = [
    {
      badge: 'Track 1',
      title: 'ISV & SaaS Providers',
      desc: 'Embed VectisX real-time FX data and cross-border payment rails directly into your billing, ERP, or e-commerce software.',
      bullets: [
        'Up to 25% recurring net revenue share',
        'Dedicated developer sandboxes',
        'Co-marketing in our integration directory',
      ],
    },
    {
      badge: 'Track 2',
      title: 'IT Services & System Integrators',
      desc: 'Implement VectisX enterprise treasury connectors into client deployments of Microsoft Dynamics 365, Sage, and SAP.',
      bullets: [
        'Direct access to partner solution architects',
        'Implementation bounties & commissions',
        'Certified Partner credentials',
      ],
    },
    {
      badge: 'Track 3',
      title: 'Referral & Affiliate Network',
      desc: 'Introduce enterprise clients requiring high-volume commercial payments or forward contracts to our dealing desk.',
      bullets: [
        'Lifetime spread share on client volume',
        'Dedicated partner portal & real-time analytics',
        'Turnkey marketing collateral',
      ],
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitStatus === 'loading') return;
    setSubmitStatus('loading');
    await wait(300);
    setSubmitStatus('success');
    window.setTimeout(() => {
      setSubmitted(true);
      setSubmitStatus('idle');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">Ecosystem Partnerships</span>
          <h1>VectisX Partner Program</h1>
          <p className="text-ink-500">
            Collaborate with a trusted currency data authority. Earn recurring revenue shares, deliver embedded FX modules, and co-brand international payment experiences.
          </p>
        </div>

        {/* 3 Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {tracks.map((t, idx) => (
            <ScrollReveal key={t.badge} delay={idx * 50}>
              <div className="card p-6 bg-surface space-y-3 h-full">
                <span className="badge-neutral">{t.badge}</span>
                <h3>{t.title}</h3>
                <p className="text-[15px] leading-[24px] text-ink-500">{t.desc}</p>
                <ul className="text-caption text-ink-700 space-y-1.5 pt-3 border-t border-line">
                  {t.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-xl mx-auto card p-8 bg-surface">
          <h2 className="mb-2">Apply to the Partner Network</h2>
          <p className="text-ink-500 mb-6">
            Our partner alliances team will review your application within 2 business days.
          </p>

          {submitted ? (
            <div className="p-6 bg-gain-bg border border-gain-border text-gain rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 mx-auto" aria-hidden="true" />
              <div className="font-semibold text-[16px]">Application Received</div>
              <p className="text-[14px] mx-auto">
                Thank you for applying. An alliance manager will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="partner-company" className="block mb-1.5">
                  Company / Organization
                </label>
                <input
                  id="partner-company"
                  type="text"
                  required
                  placeholder="Acme Software Corp"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="partner-email" className="block mb-1.5">
                  Business Email
                </label>
                <input
                  id="partner-email"
                  type="email"
                  required
                  placeholder="partners@acme.com"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="partner-track" className="block mb-1.5">
                  Desired Partnership Track
                </label>
                <select id="partner-track" className="select-field text-[14px] font-medium">
                  <option>ISV &amp; SaaS Embedded Integration</option>
                  <option>IT Services &amp; System Integrator</option>
                  <option>Referral / Affiliate Network</option>
                </select>
              </div>
              <div>
                <label htmlFor="partner-volume" className="block mb-1.5">
                  Estimated Annual Volume / Users
                </label>
                <input
                  id="partner-volume"
                  type="text"
                  placeholder="e.g. 50,000 monthly active users"
                  className="input-field"
                />
              </div>
              <ActionButton
                type="submit"
                status={submitStatus}
                successLabel="Application Sent"
                className="w-full justify-center btn-lg"
              >
                Submit Partner Application
              </ActionButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
