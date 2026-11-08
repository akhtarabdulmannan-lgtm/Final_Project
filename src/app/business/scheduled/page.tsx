'use client';

import Link from 'next/link';
import { Calendar, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';

export default function BusinessScheduledPage() {
  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Automated Accounts Payable</span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-surface-900 mt-2">
            Scheduled & Recurring Business Payments
          </h1>
          <p className="text-surface-600 text-base mt-3 leading-relaxed">
            Eliminate manual payment handling for recurring vendor contracts, international rent, and scheduled subscriptions. Set auto-pilot transfers that execute precisely when needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6 bg-white">
            <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center font-bold mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-surface-900 text-lg mb-2">Flexible Cadence</h3>
            <p className="text-xs text-surface-600 leading-relaxed">
              Configure weekly, bi-weekly, monthly, or quarterly payment schedules with customized date anchors and automated pre-funding notifications.
            </p>
          </div>

          <div className="card p-6 bg-white">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center font-bold mb-4">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-surface-900 text-lg mb-2">Automated Execution</h3>
            <p className="text-xs text-surface-600 leading-relaxed">
              Payments execute seamlessly from your multi-currency balance vaults without requiring repetitive approval workflows for fixed agreements.
            </p>
          </div>

          <div className="card p-6 bg-white">
            <div className="w-10 h-10 rounded-xl bg-accent-100 text-accent-600 flex items-center justify-center font-bold mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-surface-900 text-lg mb-2">Audit Reconciliation</h3>
            <p className="text-xs text-surface-600 leading-relaxed">
              All transactions sync directly with your ERP records with timestamped payment receipts and invoice reference metadata.
            </p>
          </div>
        </div>

        <div className="card p-8 bg-gradient-to-r from-brand-900 to-brand-950 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold font-heading">Automate your international AP workflows</h3>
            <p className="text-xs text-surface-300 mt-1">Set up automated schedules in your VectisX Business dashboard.</p>
          </div>
          <Link href="/register" className="btn-teal whitespace-nowrap">
            Schedule a Payment <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
