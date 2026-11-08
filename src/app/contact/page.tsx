'use client';

import { useState } from 'react';
import { Mail, PhoneCall, MapPin, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Global Assistance</span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-surface-900 mt-2">
            Get in Touch with VectisX
          </h1>
          <p className="text-surface-600 text-base mt-3 leading-relaxed">
            Have questions about consumer transfers, business foreign exchange hedging, or API integration? Our global team is here to support you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card p-6 bg-white space-y-3">
              <div className="flex items-center gap-3 text-brand-600 font-bold text-sm">
                <PhoneCall className="w-5 h-5" /> Phone Support
              </div>
              <p className="text-xs text-surface-500">Available 24 hours a day, 7 days a week.</p>
              <div className="text-base font-bold font-mono text-surface-900">+1 (800) 555-8328</div>
              <div className="text-xs text-surface-400">UK: +44 20 7946 0192 | International: +1 416 555 0199</div>
            </div>

            <div className="card p-6 bg-white space-y-3">
              <div className="flex items-center gap-3 text-teal-600 font-bold text-sm">
                <Mail className="w-5 h-5" /> Email Inquiries
              </div>
              <p className="text-xs text-surface-500">Average response time under 1 hour.</p>
              <div className="text-xs space-y-1">
                <div>Customer Support: <strong className="text-surface-900">support@vectisx.com</strong></div>
                <div>Corporate FX Dealing: <strong className="text-surface-900">business@vectisx.com</strong></div>
                <div>API & Integrations: <strong className="text-surface-900">api@vectisx.com</strong></div>
              </div>
            </div>

            <div className="card p-6 bg-white space-y-3">
              <div className="flex items-center gap-3 text-accent-600 font-bold text-sm">
                <MapPin className="w-5 h-5" /> Global Headquarters
              </div>
              <p className="text-xs text-surface-700 leading-relaxed">
                VectisX Financial Inc.<br />
                120 Wall Street, 28th Floor<br />
                New York, NY 10005, United States
              </p>
              <div className="text-[11px] text-surface-400 pt-2 border-t border-surface-100">
                Additional offices in London, Toronto, Sydney, and Singapore.
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 card p-8 bg-white shadow-xl">
            <h3 className="text-2xl font-bold font-heading text-surface-900 mb-2">Send Us a Direct Message</h3>
            <p className="text-xs text-surface-500 mb-6">Fill in your information and our specialists will respond promptly.</p>

            {submitted ? (
              <div className="p-8 bg-emerald-50 text-emerald-800 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-xl font-bold">Message Received</h4>
                <p className="text-xs max-w-sm mx-auto">
                  Thank you for reaching out. A ticket has been created and an assigned specialist will reply to your email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-surface-600 block mb-1">Full Name</label>
                    <input type="text" required placeholder="Jane Doe" className="input-field text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-surface-600 block mb-1">Email Address</label>
                    <input type="email" required placeholder="jane@example.com" className="input-field text-sm" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-surface-600 block mb-1">Topic / Inquiry Type</label>
                  <select className="select-field text-sm font-semibold">
                    <option>Personal Money Transfer Inquiry</option>
                    <option>Corporate Treasury / FX Dealing Desk</option>
                    <option>Developer API / Commercial Licensing</option>
                    <option>Verification & KYC Questions</option>
                    <option>Partnership / Media Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-surface-600 block mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Please describe how we can assist you..."
                    className="input-field text-sm"
                  />
                </div>

                <button type="submit" className="btn-primary w-full justify-center btn-lg">
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
