'use client';

import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase';
import {
  RevealCard,
  RevealSection,
  StatefulButtonContent,
  useButtonFeedback,
} from '@/components/ui/MotionPrimitives';

export default function ApiPartnersPage() {
  const [companyName, setCompanyName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [track, setTrack] = useState('ISV & SaaS Embedded Integration');
  const [estimatedVolume, setEstimatedVolume] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const feedback = useButtonFeedback();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const supabase = getSupabaseClient();
    if (!supabase) {
      feedback.triggerSuccess();
      setTimeout(() => setSubmitted(true), 800);
      return;
    }

    feedback.startLoading();
    try {
      const { error: insertError } = await supabase.from('partner_applications').insert({
        company_name: companyName.trim(),
        business_email: businessEmail.trim().toLowerCase(),
        track,
        estimated_volume: estimatedVolume.trim() || null,
      });

      if (insertError) {
        feedback.reset();
        setError(insertError.message);
        return;
      }

      feedback.triggerSuccess();
      setTimeout(() => setSubmitted(true), 800);
    } catch {
      feedback.reset();
      setError('Could not submit partner application right now. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Ecosystem Partnerships</span>
          <h1 className="type-h1 text-navy mt-2">
            VectisX Partner Program
          </h1>
          <p className="type-body text-body mt-3">
            Collaborate with the world&apos;s trusted currency data authority. Earn recurring revenue shares, deliver white-label FX modules, and co-brand seamless international payment experiences.
          </p>
        </div>

        {/* 3 Tracks */}
        <RevealSection className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <RevealCard index={0}>
            <div className="card p-6 bg-white space-y-3 h-full">
              <span className="badge-brand">Track 1</span>
              <h2 className="type-h3 text-navy">ISV &amp; SaaS Providers</h2>
              <p className="text-sm text-body">
                Embed VectisX real-time FX data and analytics modules directly into your billing, ERP, or e-commerce software.
              </p>
              <ul className="type-caption text-caption space-y-1.5 pt-2 border-t border-surface-200 tabular-nums">
                <li>• Up to 25% recurring net revenue share</li>
                <li>• Dedicated developer sandboxes</li>
                <li>• Co-marketing in our integration directory</li>
              </ul>
            </div>
          </RevealCard>

          <RevealCard index={1}>
            <div className="card p-6 bg-white space-y-3 h-full">
              <span className="badge-brand">Track 2</span>
              <h2 className="type-h3 text-navy">IT Services &amp; System Integrators</h2>
              <p className="text-sm text-body">
                Implement VectisX enterprise treasury connectors into client deployments of Microsoft Dynamics 365, Sage, and SAP.
              </p>
              <ul className="type-caption text-caption space-y-1.5 pt-2 border-t border-surface-200">
                <li>• Direct access to partner solution architects</li>
                <li>• Implementation bounties &amp; commissions</li>
                <li>• Certified Partner credentials</li>
              </ul>
            </div>
          </RevealCard>

          <RevealCard index={2}>
            <div className="card p-6 bg-white space-y-3 h-full">
              <span className="badge-brand">Track 3</span>
              <h2 className="type-h3 text-navy">Referral &amp; Affiliate Network</h2>
              <p className="text-sm text-body">
                Introduce enterprise clients requiring multi-currency analytics or FX hedging insights to our institutional team.
              </p>
              <ul className="type-caption text-caption space-y-1.5 pt-2 border-t border-surface-200">
                <li>• Generous recurring commission on client subscriptions</li>
                <li>• Dedicated partner portal &amp; real-time analytics</li>
                <li>• Turnkey marketing collateral</li>
              </ul>
            </div>
          </RevealCard>
        </RevealSection>

        {/* Form */}
        <RevealSection className="max-w-xl mx-auto card p-8 bg-white">
          <h2 className="type-h3 text-navy mb-2">Apply to the Partner Network</h2>
          <p className="type-caption text-caption mb-6">
            Our partner alliances team will review your application within 2 business days.
          </p>

          {submitted ? (
            <div className="p-6 bg-gain-bg border border-gain-border text-gain-text rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 mx-auto" aria-hidden="true" />
              <div className="font-semibold text-base">Application Received!</div>
              <p className="type-caption">
                We look forward to collaborating. An alliance manager will contact you shortly.
              </p>
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
                <label htmlFor="partner-company" className="form-label block mb-1.5">
                  Company / Organization
                </label>
                <input
                  id="partner-company"
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Acme Software Corp"
                  className="input-field text-sm"
                />
              </div>
              <div>
                <label htmlFor="partner-email" className="form-label block mb-1.5">
                  Business Email
                </label>
                <input
                  id="partner-email"
                  type="email"
                  required
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  placeholder="partners@acme.com"
                  className="input-field text-sm"
                />
              </div>
              <div>
                <label htmlFor="partner-track" className="form-label block mb-1.5">
                  Desired Partnership Track
                </label>
                <select
                  id="partner-track"
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  className="select-field text-sm font-semibold"
                >
                  <option>ISV &amp; SaaS Embedded Integration</option>
                  <option>IT Services &amp; System Integrator</option>
                  <option>Referral / Affiliate Network</option>
                </select>
              </div>
              <div>
                <label htmlFor="partner-volume" className="form-label block mb-1.5">
                  Estimated Annual Volume / Users
                </label>
                <input
                  id="partner-volume"
                  type="text"
                  value={estimatedVolume}
                  onChange={(e) => setEstimatedVolume(e.target.value)}
                  placeholder="e.g. 50,000 monthly active users"
                  className="input-field text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={feedback.status === 'loading'}
                className="btn-primary w-full justify-center btn-lg"
              >
                <StatefulButtonContent
                  status={feedback.status}
                  idleLabel="Submit Partner Application"
                  loadingLabel="Submitting Application..."
                  successLabel="Application Sent"
                />
              </button>
            </form>
          )}
        </RevealSection>
      </div>
    </div>
  );
}
