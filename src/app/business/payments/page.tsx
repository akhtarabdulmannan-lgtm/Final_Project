'use client';

import Link from 'next/link';
import { Globe2, Zap, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function BusinessPaymentsPage() {
  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Corporate Treasury</span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-surface-900 mt-2">
            Global Payments for Commercial Scale
          </h1>
          <p className="text-surface-600 text-base mt-3 leading-relaxed">
            Disburse vendor payments, overseas subsidiary transfers, and client payouts across 190+ countries in 145+ local currencies with guaranteed institutional execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6 bg-white">
            <h3 className="font-bold text-surface-900 text-lg mb-2">Same-Day Local Rails</h3>
            <p className="text-xs text-surface-600 leading-relaxed">
              Connect to domestic ACH, SEPA Instant, Faster Payments, and UPI clearing networks to deliver funds in minutes without intermediary bank deduction fees.
            </p>
          </div>
          <div className="card p-6 bg-white">
            <h3 className="font-bold text-surface-900 text-lg mb-2">Guaranteed Quote Lock</h3>
            <p className="text-xs text-surface-600 leading-relaxed">
              Lock in your exchange rate for up to 48 hours while internal authorization and payment clearing occur.
            </p>
          </div>
          <div className="card p-6 bg-white">
            <h3 className="font-bold text-surface-900 text-lg mb-2">End-to-End Tracking</h3>
            <p className="text-xs text-surface-600 leading-relaxed">
              Automated webhook triggers and recipient notification emails keep your accounts payable team and suppliers synchronized.
            </p>
          </div>
        </div>

        <div className="card p-8 bg-gradient-to-r from-brand-900 to-brand-950 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold font-heading">Ready to optimize corporate payments?</h3>
            <p className="text-xs text-surface-300 mt-1">Open an account in under 10 minutes with zero setup fees.</p>
          </div>
          <Link href="/register" className="btn-teal whitespace-nowrap">
            Open Business Account <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
