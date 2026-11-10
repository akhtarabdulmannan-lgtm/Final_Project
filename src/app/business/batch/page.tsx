'use client';

import Link from 'next/link';
import { FileSpreadsheet, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function BusinessBatchPage() {
  const features = [
    {
      Icon: FileSpreadsheet,
      title: 'CSV / Excel Upload',
      desc: 'Drag and drop standard CSV or XLSX files exported from Workday, Deel, Gusto, or QuickBooks. Our parser verifies routing numbers instantly.',
    },
    {
      Icon: Users,
      title: 'Multi-Currency Settle',
      desc: 'Pay European developers in EUR, Asian suppliers in JPY or INR, and Latin American agencies in MXN from a single USD treasury balance.',
    },
    {
      Icon: CheckCircle2,
      title: 'Approval Matrices',
      desc: 'Batch files over your defined risk thresholds automatically pause for dual-signoff authorization from your CFO or finance controller.',
    },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">High-Volume Disbursement</span>
          <h1>Batch &amp; Multi-Recipient Payments</h1>
          <p className="text-ink-500">
            Pay thousands of overseas employees, international contractors, and global suppliers in one execution. Upload your payroll file, review consolidated conversions, and disburse cleanly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map(({ Icon, title, desc }, idx) => (
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
            <h2 className="text-ink-invert">Simplify global payroll and contractor payouts</h2>
            <p className="text-ink-invert-muted">
              Join 17,000+ businesses streamlining international cash flow.
            </p>
          </div>
          <Link href="/register" className="btn-invert whitespace-nowrap">
            <span>Start Batch Disbursements</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
