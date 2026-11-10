'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function BusinessPaymentsPage() {
  const pillars = [
    {
      title: 'Same-Day Local Rails',
      desc: 'Connect to domestic ACH, SEPA Instant, Faster Payments, and UPI clearing networks to deliver funds in minutes without intermediary deductions.',
    },
    {
      title: 'Guaranteed Quote Lock',
      desc: 'Lock in your exchange rate for up to 48 hours while internal authorization and payment clearing occur.',
    },
    {
      title: 'End-to-End Tracking',
      desc: 'Automated webhook triggers and recipient notification emails keep your accounts payable team and suppliers synchronized.',
    },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">Corporate Treasury</span>
          <h1>Global Payments for Commercial Scale</h1>
          <p className="text-ink-500">
            Disburse vendor payments, overseas subsidiary transfers, and client payouts across 190+ countries in 145+ local currencies with institutional execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pillars.map((item, idx) => (
            <ScrollReveal key={item.title} delay={idx * 50}>
              <div className="card p-6 bg-surface h-full space-y-2">
                <h3>{item.title}</h3>
                <p className="text-[15px] leading-[24px] text-ink-500">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="card-invert p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-ink-invert">Ready to optimize corporate payments?</h2>
            <p className="text-ink-invert-muted">
              Open an account in under 10 minutes with zero setup fees.
            </p>
          </div>
          <Link href="/register" className="btn-invert whitespace-nowrap">
            <span>Open Business Account</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
