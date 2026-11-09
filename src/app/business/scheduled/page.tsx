'use client';

import Link from 'next/link';
import { Calendar, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';
import { RevealCard, RevealSection } from '@/components/ui/MotionPrimitives';

export default function BusinessScheduledPage() {
  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Automated Accounts Payable</span>
          <h1 className="type-h1 text-navy mt-2">
            Scheduled &amp; Recurring Business Payments
          </h1>
          <p className="type-body text-body mt-3">
            Eliminate manual payment handling for recurring vendor contracts, international rent, and scheduled subscriptions. Set auto-pilot transfers that execute precisely when needed.
          </p>
        </div>

        <RevealSection className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <RevealCard index={0}>
            <div className="card p-6 bg-white h-full">
              <div className="w-10 h-10 rounded-xl bg-primary-pale text-primary border border-primary-border flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 className="type-h3 text-navy mb-2">Flexible Cadence</h2>
              <p className="text-sm text-body">
                Configure weekly, bi-weekly, monthly, or quarterly benchmark schedules with customized date anchors and automated treasury notifications.
              </p>
            </div>
          </RevealCard>

          <RevealCard index={1}>
            <div className="card p-6 bg-white h-full">
              <div className="w-10 h-10 rounded-xl bg-primary-pale text-primary border border-primary-border flex items-center justify-center mb-4">
                <RefreshCw className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 className="type-h3 text-navy mb-2">Automated Rate Snapshots</h2>
              <p className="text-sm text-body">
                Rate snapshots capture certified mid-market fixings automatically without requiring repetitive manual exports for recurring contracts.
              </p>
            </div>
          </RevealCard>

          <RevealCard index={2}>
            <div className="card p-6 bg-white h-full">
              <div className="w-10 h-10 rounded-xl bg-primary-pale text-primary border border-primary-border flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 className="type-h3 text-navy mb-2">Audit Reconciliation</h2>
              <p className="text-sm text-body">
                All FX rate records sync directly with your ERP ledgers with timestamped benchmark certificates and invoice reference metadata.
              </p>
            </div>
          </RevealCard>
        </RevealSection>

        <div className="card-dark p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="type-h3 text-white">Automate your international FX audit workflows</h2>
            <p className="type-caption text-[#C9D3E3] mt-1">
              Set up automated rate schedules in your VectisX Business workspace.
            </p>
          </div>
          <Link href="/register" className="btn-primary whitespace-nowrap">
            Open Business Workspace <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
