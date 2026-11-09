'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, HelpCircle, ArrowRight, PhoneCall, Mail, MessageCircle } from 'lucide-react';
import Accordion from '@/components/ui/Accordion';

const generalFaqs = [
  {
    question: 'How do I open an account with VectisX?',
    answer: 'Signing up takes under two minutes. Click "Register", enter your email, verify your identity with government-issued photo ID, and your account will be activated immediately.'
  },
  {
    question: 'What documents are required for business account verification?',
    answer: 'Corporate accounts require Certificate of Incorporation, proof of business address (utility bill or bank statement within 90 days), and ID verification for directors holding 25% or more equity.'
  },
  {
    question: 'How do I cancel or amend an international transfer?',
    answer: 'If the transfer has not yet cleared on local rails, you can cancel it directly from your dashboard or call our 24/7 hotline. Once funds have cleared into the beneficiary account, recall requests must be initiated through the receiving institution.'
  },
  {
    question: 'What are the transfer limits for personal accounts?',
    answer: 'Standard verified personal accounts can transfer up to $50,000 USD per day or $200,000 USD per month. Limit increases can be granted upon submitting standard proof of wealth.'
  }
];

export default function HelpPage() {
  const [query, setQuery] = useState('');

  const categories = [
    { title: 'Personal Money Transfers', articles: 18, desc: 'Sending limits, delivery speeds, and tracking corridors.' },
    { title: 'Multi-Currency Account', articles: 12, desc: 'Depositing, holding, and instant conversion between 18 currencies.' },
    { title: 'Business & Treasury Solutions', articles: 24, desc: 'Batch payouts, forward contracts, and ERP connectors.' },
    { title: 'Developer & API Integration', articles: 16, desc: 'API keys, rate limits, webhooks, and SDK troubleshooting.' },
    { title: 'Security & Verification', articles: 9, desc: 'KYC identity verification, 2FA, and fraud prevention.' },
    { title: 'Billing & Fee Inquiries', articles: 14, desc: 'Fee schedules, invoices, and payment receipts.' },
  ];

  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx">
        {/* Hero with Search */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge-brand">Support Center</span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-surface-900 mt-2">
            How Can We Help You Today?
          </h1>
          <p className="text-surface-600 text-sm mt-3">
            Search our knowledge base for instant answers or browse popular guides below.
          </p>

          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by topic, keyword, or feature (e.g., 'rate alerts', 'ECB charts')..."
              className="input-field pl-12 py-4 text-base shadow-lg"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {categories.map(c => (
            <div key={c.title} className="card p-6 bg-white hover:border-brand-500/30 transition-all cursor-pointer">
              <h3 className="font-bold text-surface-900 text-base mb-1">{c.title}</h3>
              <p className="text-xs text-surface-500 mb-3">{c.desc}</p>
              <span className="text-xs font-semibold text-brand-500 hover:underline">
                {c.articles} articles &rarr;
              </span>
            </div>
          ))}
        </div>

        {/* Popular Questions */}
        <div className="card p-8 bg-white mb-16 shadow-sm">
          <h2 className="text-2xl font-bold font-heading text-surface-900 mb-6">Frequently Asked Questions</h2>
          <Accordion items={generalFaqs} />
        </div>

        {/* Contact Strip */}
        <div className="card p-8 bg-gradient-to-r from-brand-900 to-brand-950 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold font-heading">Still have questions?</h3>
            <p className="text-xs text-surface-300 mt-1">Our support agents are available around the clock to assist you.</p>
          </div>
          <Link href="/contact" className="btn-teal whitespace-nowrap">
            Contact Support Team <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
