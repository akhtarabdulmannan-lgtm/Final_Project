'use client';

import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase';

export default function ApiPartnersPage() {
  const [companyName, setCompanyName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [track, setTrack] = useState('ISV & SaaS Embedded Integration');
  const [estimatedVolume, setEstimatedVolume] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const supabase = getSupabaseClient();
    if (!supabase) {
      setSubmitted(true);
      return;
    }

    setLoading(true);
    try {
      const { error: insertError } = await supabase.from('partner_applications').insert({
        company_name: companyName.trim(),
        business_email: businessEmail.trim().toLowerCase(),
        track,
        estimated_volume: estimatedVolume.trim() || null,
      });

      if (insertError) {
        setError(insertError.message);
        return;
      }

      setSubmitted(true);
    } catch {
      setError('Could not submit partner application right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Ecosystem Partnerships</span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-surface-900 mt-2">
            VectisX Partner Program
          </h1>
          <p className="text-surface-600 text-base mt-3 leading-relaxed">
            Collaborate with the world&apos;s trusted currency data authority. Earn recurring revenue shares, deliver white-label FX modules, and co-brand seamless international payment experiences.
          </p>
        </div>

        {/* 3 Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="card p-6 bg-white space-y-3">
            <span className="badge-teal">Track 1</span>
            <h3 className="font-bold text-surface-900 text-xl font-heading">ISV &amp; SaaS Providers</h3>
            <p className="text-xs text-surface-600 leading-relaxed">
              Embed VectisX real-time FX data and cross-border payment rails directly into your billing, ERP, or e-commerce software.
            </p>
            <ul className="text-xs text-surface-500 space-y-1.5 pt-2 border-t border-surface-100">
              <li>• Up to 25% recurring net revenue share</li>
              <li>• Dedicated developer sandboxes</li>
              <li>• Co-marketing in our integration directory</li>
            </ul>
          </div>

          <div className="card p-6 bg-white space-y-3">
            <span className="badge-brand">Track 2</span>
            <h3 className="font-bold text-surface-900 text-xl font-heading">IT Services &amp; System Integrators</h3>
            <p className="text-xs text-surface-600 leading-relaxed">
              Implement VectisX enterprise treasury connectors into client deployments of Microsoft Dynamics 365, Sage, and SAP.
            </p>
            <ul className="text-xs text-surface-500 space-y-1.5 pt-2 border-t border-surface-100">
              <li>• Direct access to partner solution architects</li>
              <li>• Implementation bounties &amp; commissions</li>
              <li>• Certified Partner credentials</li>
            </ul>
          </div>

          <div className="card p-6 bg-white space-y-3">
            <span className="badge-accent">Track 3</span>
            <h3 className="font-bold text-surface-900 text-xl font-heading">Referral &amp; Affiliate Network</h3>
            <p className="text-xs text-surface-600 leading-relaxed">
              Introduce enterprise clients requiring high-volume commercial payments or forward contracts to our dealing desk.
            </p>
            <ul className="text-xs text-surface-500 space-y-1.5 pt-2 border-t border-surface-100">
              <li>• Generous lifetime spread share on client volume</li>
              <li>• Dedicated partner portal &amp; real-time analytics</li>
              <li>• Turnkey marketing collateral</li>
            </ul>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-xl mx-auto card p-8 bg-white shadow-xl">
          <h3 className="text-2xl font-bold font-heading text-surface-900 mb-2">Apply to the Partner Network</h3>
          <p className="text-xs text-surface-500 mb-6">Our partner alliances team will review your application within 2 business days.</p>

          {submitted ? (
            <div className="p-6 bg-emerald-50 text-emerald-800 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <div className="font-bold">Application Received!</div>
              <p className="text-xs">We look forward to collaborating. An alliance manager will contact you shortly.</p>
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
                <label className="text-xs font-semibold text-surface-600 block mb-1">Company / Organization</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Acme Software Corp"
                  className="input-field text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-surface-600 block mb-1">Business Email</label>
                <input
                  type="email"
                  required
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  placeholder="partners@acme.com"
                  className="input-field text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-surface-600 block mb-1">Desired Partnership Track</label>
                <select
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
                <label className="text-xs font-semibold text-surface-600 block mb-1">Estimated Annual Volume / Users</label>
                <input
                  type="text"
                  value={estimatedVolume}
                  onChange={(e) => setEstimatedVolume(e.target.value)}
                  placeholder="e.g. 50,000 monthly active users"
                  className="input-field text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center btn-lg"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Submitting Application...</>
                ) : (
                  'Submit Partner Application'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
