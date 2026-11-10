'use client';

import Link from 'next/link';
import { Calendar, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function BusinessScheduledPage() {
  const items = [
    {
      Icon: Calendar,
      title: 'Flexible Cadence',
      desc: 'Configure weekly, bi-weekly, monthly, or quarterly payment schedules with customized date anchors and pre-funding notifications.',
    },
    {
      Icon: RefreshCw,
      title: 'Automated Execution',
      desc: 'Payments execute seamlessly from your multi-currency balance vaults without repetitive approvals for fixed agreements.',
    },
    {
      Icon: CheckCircle2,
      title: 'Audit Reconciliation',
      desc: 'All transactions sync directly with your ERP records with timestamped payment receipts and invoice metadata.',
    },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">Automated Accounts Payable</span>
          <h1>Scheduled &amp; Recurring Business Payments</h1>
          <p className="text-ink-500">
            Eliminate manual payment handling for recurring vendor contracts, international rent, and scheduled subscriptions. Set automated transfers that execute on schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {items.map(({ Icon, title, desc }, idx) => (
            <ScrollReveal key={title} delay={idx * 50}>
              <div className="card p-6 bg-surface h-full space-y-3">
                <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-line flex items-center justify-center">
                  <Icon className="w-5 h-5 text-ink" aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p className="text-[15px] leading-[24px] text-ink-500">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="card-invert p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-ink-invert">Automate your international AP workflows</h2>
            <p className="text-ink-invert-muted">
              Set up automated schedules in your VectisX Business dashboard.
            </p>
          </div>
          <Link href="/register" className="btn-invert whitespace-nowrap">
            <span>Schedule a Payment</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
