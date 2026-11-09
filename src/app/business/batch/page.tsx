'use client';

import Link from 'next/link';
import { FileSpreadsheet, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { RevealCard, RevealSection } from '@/components/ui/MotionPrimitives';

export default function BusinessBatchPage() {
  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">High-Volume Disbursement</span>
          <h1 className="type-h1 text-navy mt-2">
            Batch &amp; Multi-Recipient Payments
          </h1>
          <p className="type-body text-body mt-3">
            Pay thousands of overseas employees, international contractors, and global suppliers in one single execution. Upload your payroll file, review consolidated FX conversions, and disburse with one click.
          </p>
        </div>

        <RevealSection className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <RevealCard index={0}>
            <div className="card p-6 bg-white h-full">
              <div className="w-10 h-10 rounded-xl bg-primary-pale text-primary border border-primary-border flex items-center justify-center mb-4">
                <FileSpreadsheet className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 className="type-h3 text-navy mb-2">CSV / Excel Upload</h2>
              <p className="text-sm text-body">
                Drag and drop standard CSV or XLSX files exported from Workday, Deel, Gusto, or QuickBooks to benchmark multi-currency schedules instantly.
              </p>
            </div>
          </RevealCard>

          <RevealCard index={1}>
            <div className="card p-6 bg-white h-full">
              <div className="w-10 h-10 rounded-xl bg-primary-pale text-primary border border-primary-border flex items-center justify-center mb-4">
                <Users className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 className="type-h3 text-navy mb-2">Multi-Currency Valuation</h2>
              <p className="text-sm text-body">
                Benchmark EUR, JPY, INR, and MXN schedules simultaneously against certified institutional mid-market USD rates.
              </p>
            </div>
          </RevealCard>

          <RevealCard index={2}>
            <div className="card p-6 bg-white h-full">
              <div className="w-10 h-10 rounded-xl bg-primary-pale text-primary border border-primary-border flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 className="type-h3 text-navy mb-2">Approval Matrices</h2>
              <p className="text-sm text-body">
                Batch schedules exceeding your defined risk thresholds automatically flag for dual-signoff review from your CFO or finance controller.
              </p>
            </div>
          </RevealCard>
        </RevealSection>

        <div className="card-dark p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="type-h3 text-white">Simplify global payroll and treasury valuation</h2>
            <p className="type-caption text-[#C9D3E3] mt-1">
              Join 17,000+ businesses benchmarking international FX workflows.
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
