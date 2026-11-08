'use client';

import Link from 'next/link';
import { Layers, FileSpreadsheet, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function BusinessBatchPage() {
  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">High-Volume Disbursement</span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-surface-900 mt-2">
            Batch & Multi-Recipient Payments
          </h1>
          <p className="text-surface-600 text-base mt-3 leading-relaxed">
            Pay thousands of overseas employees, international contractors, and global suppliers in one single execution. Upload your payroll file, review consolidated FX conversions, and disburse with one click.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6 bg-white">
            <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center font-bold mb-4">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-surface-900 text-lg mb-2">CSV / Excel Upload</h3>
            <p className="text-xs text-surface-600 leading-relaxed">
              Drag and drop standard CSV or XLSX files exported from Workday, Deel, Gusto, or QuickBooks. Our parser verifies routing numbers instantly.
            </p>
          </div>

          <div className="card p-6 bg-white">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center font-bold mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-surface-900 text-lg mb-2">Multi-Currency Settle</h3>
            <p className="text-xs text-surface-600 leading-relaxed">
              Pay European developers in EUR, Asian suppliers in JPY or INR, and Latin American agencies in MXN—all funded from a single USD treasury balance.
            </p>
          </div>

          <div className="card p-6 bg-white">
            <div className="w-10 h-10 rounded-xl bg-accent-100 text-accent-600 flex items-center justify-center font-bold mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-surface-900 text-lg mb-2">Approval Matrices</h3>
            <p className="text-xs text-surface-600 leading-relaxed">
              Batch files over your defined risk thresholds automatically pause for dual-signoff authorization from your CFO or finance controller.
            </p>
          </div>
        </div>

        <div className="card p-8 bg-gradient-to-r from-brand-900 to-brand-950 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold font-heading">Simplify global payroll and contractor payouts</h3>
            <p className="text-xs text-surface-300 mt-1">Join 17,000+ businesses streamlining international cash flow.</p>
          </div>
          <Link href="/register" className="btn-teal whitespace-nowrap">
            Start Batch Disbursements <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
