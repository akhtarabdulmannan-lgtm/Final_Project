import { useState } from 'react';
import { Mail, PhoneCall, MapPin, CheckCircle2 } from 'lucide-react';
import ActionButton from '@/components/ui/ActionButton';
import { wait } from '@/lib/utils';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success'>('idle');

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
          <span className="badge-neutral">Global Assistance</span>
          <h1>Get in Touch with VectisX</h1>
          <p className="text-ink-500">
            Have questions about consumer transfers, business foreign exchange hedging, or API integration? Our global team is here to support you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card p-6 bg-surface space-y-2">
              <div className="flex items-center gap-2.5 text-ink font-semibold text-[15px]">
                <PhoneCall className="w-4 h-4" aria-hidden="true" />
                <span>Phone Support</span>
              </div>
              <p className="text-caption text-ink-500">Available 24 hours a day, 7 days a week.</p>
              <div className="text-[18px] font-semibold text-ink tabular-nums">+1 (800) 555-8328</div>
              <div className="text-caption text-ink-500 tabular-nums">
                UK: +44 20 7946 0192 | International: +1 416 555 0199
              </div>
            </div>

            <div className="card p-6 bg-surface space-y-2">
              <div className="flex items-center gap-2.5 text-ink font-semibold text-[15px]">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Email Inquiries</span>
              </div>
              <p className="text-caption text-ink-500">Average response time under 1 hour.</p>
              <div className="text-[14px] space-y-1 text-ink-700">
                <div>
                  Customer Support: <strong className="font-semibold text-ink">support@vectisx.com</strong>
                </div>
                <div>
                  Corporate FX Dealing: <strong className="font-semibold text-ink">business@vectisx.com</strong>
                </div>
                <div>
                  API &amp; Integrations: <strong className="font-semibold text-ink">api@vectisx.com</strong>
                </div>
              </div>
            </div>

            <div className="card p-6 bg-surface space-y-2">
              <div className="flex items-center gap-2.5 text-ink font-semibold text-[15px]">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>Global Headquarters</span>
              </div>
              <p className="text-[14px] leading-[22px] text-ink-700">
                VectisX Financial Inc.
                <br />
                120 Wall Street, 28th Floor
                <br />
                New York, NY 10005, United States
              </p>
              <div className="text-caption text-ink-500 pt-2 border-t border-line">
                Additional offices in London, Toronto, Sydney, and Singapore.
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 card p-6 sm:p-8 bg-surface">
            <h2 className="mb-2">Send Us a Direct Message</h2>
            <p className="text-ink-500 mb-6">
              Fill in your information and our specialists will respond promptly.
            </p>

            {submitted ? (
              <div className="p-8 bg-gain-bg border border-gain-border text-gain rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 mx-auto" aria-hidden="true" />
                <h3 className="text-gain">Message Received</h3>
                <p className="text-[14px] max-w-sm mx-auto">
                  Thank you for reaching out. A ticket has been created and an assigned specialist will reply to your email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-topic" className="block mb-1.5">
                    Topic / Inquiry Type
                  </label>
                  <select id="contact-topic" className="select-field text-[14px] font-medium">
                    <option>Personal Money Transfer Inquiry</option>
                    <option>Corporate Treasury / FX Dealing Desk</option>
                    <option>Developer API / Commercial Licensing</option>
                    <option>Verification &amp; KYC Questions</option>
                    <option>Partnership / Media Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    placeholder="Please describe how we can assist you..."
                    className="input-field"
                  />
                </div>

                <ActionButton
                  type="submit"
                  status={submitStatus}
                  successLabel="Message Sent"
                  className="w-full justify-center btn-lg"
                >
                  Submit Inquiry
                </ActionButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
