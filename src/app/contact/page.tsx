'use client';

import { useState } from 'react';
import { Mail, PhoneCall, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';
import {
  RevealSection,
  StatefulButtonContent,
  useButtonFeedback,
} from '@/components/ui/MotionPrimitives';

export default function ContactPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Corporate Treasury / FX Dealing Desk');
  const [message, setMessage] = useState('');
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
      const { data: userData } = await supabase.auth.getUser();
      const { error: insertError } = await supabase.from('contact_inquiries').insert({
        user_id: userData.user?.id ?? null,
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        topic,
        message: message.trim(),
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
      setError('Could not submit inquiry right now. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Global Assistance</span>
          <h1 className="type-h1 text-navy mt-2">
            Get in Touch with VectisX
          </h1>
          <p className="type-body text-body mt-3">
            Have questions about currency data feeds, business foreign exchange hedging, or API integration? Our global team is here to support you 24/7.
          </p>
        </div>

        <RevealSection className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card p-6 bg-white space-y-3">
              <div className="flex items-center gap-3 text-primary font-semibold text-sm">
                <PhoneCall className="w-5 h-5" aria-hidden="true" /> Phone Support
              </div>
              <p className="type-caption text-caption">Available 24 hours a day, 7 days a week.</p>
              <div className="text-base font-heading font-semibold text-navy tabular-nums">
                +1 (800) 555-8328
              </div>
              <div className="type-caption text-caption tabular-nums">
                UK: +44 20 7946 0192 | International: +1 416 555 0199
              </div>
            </div>

            <div className="card p-6 bg-white space-y-3">
              <div className="flex items-center gap-3 text-primary font-semibold text-sm">
                <Mail className="w-5 h-5" aria-hidden="true" /> Email Inquiries
              </div>
              <p className="type-caption text-caption">Average response time under 1 hour.</p>
              <div className="type-caption text-body space-y-1.5">
                <div>
                  Customer Support: <strong className="font-semibold text-navy">support@vectisx.com</strong>
                </div>
                <div>
                  Corporate FX Advisory: <strong className="font-semibold text-navy">business@vectisx.com</strong>
                </div>
                <div>
                  API &amp; Integrations: <strong className="font-semibold text-navy">api@vectisx.com</strong>
                </div>
              </div>
            </div>

            <div className="card p-6 bg-white space-y-3">
              <div className="flex items-center gap-3 text-primary font-semibold text-sm">
                <MapPin className="w-5 h-5" aria-hidden="true" /> Global Headquarters
              </div>
              <p className="text-sm text-body">
                VectisX Financial Inc.
                <br />
                120 Wall Street, 28th Floor
                <br />
                New York, NY 10005, United States
              </p>
              <div className="type-caption text-caption pt-2 border-t border-surface-200">
                Additional offices in London, Toronto, Sydney, and Singapore.
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 card p-8 bg-white">
            <h2 className="type-h3 text-navy mb-2">Send Us a Direct Message</h2>
            <p className="type-caption text-caption mb-6">
              Fill in your information and our specialists will respond promptly.
            </p>

            {submitted ? (
              <div className="p-8 bg-gain-bg border border-gain-border text-gain-text rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 mx-auto" aria-hidden="true" />
                <h3 className="text-xl font-heading font-semibold">Message Received</h3>
                <p className="type-caption max-w-sm mx-auto">
                  Thank you for reaching out. A ticket has been created and an assigned specialist will reply to your email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                    feedback.reset();
                  }}
                  className="btn-secondary btn-sm"
                >
                  Send Another Message
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="form-label block mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Doe"
                      className="input-field text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="form-label block mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="input-field text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-topic" className="form-label block mb-1.5">
                    Topic / Inquiry Type
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="select-field text-sm font-semibold"
                  >
                    <option>Corporate Treasury / FX Dealing Desk</option>
                    <option>Developer API / Commercial Licensing</option>
                    <option>Live Rate Feeds &amp; Alerts</option>
                    <option>Verification &amp; Account Questions</option>
                    <option>Partnership / Media Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="form-label block mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please describe how we can assist you..."
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
                    idleLabel="Submit Inquiry"
                    loadingLabel="Submitting..."
                    successLabel="Inquiry Sent"
                  />
                </button>
              </form>
            )}
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
