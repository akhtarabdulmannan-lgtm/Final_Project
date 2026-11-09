'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { RevealCard, RevealSection } from '@/components/ui/MotionPrimitives';

export default function BusinessPaymentsPage() {
  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Corporate Treasury</span>
          <h1 className="type-h1 text-navy mt-2">
            Global Payments for Commercial Scale
          </h1>
          <p className="type-body text-body mt-3">
            Disburse vendor payments, overseas subsidiary transfers, and client payouts across 190+ countries in 145+ local currencies with guaranteed institutional execution.
          </p>
        </div>

        <RevealSection className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <RevealCard index={0}>
            <div className="card p-6 bg-white h-full">
              <h2 className="type-h3 text-navy mb-2">Same-Day Local Rails</h2>
              <p className="text-sm text-body">
                Connect to domestic ACH, SEPA Instant, Faster Payments, and UPI clearing networks to deliver funds in minutes without intermediary bank deduction fees.
              </p>
            </div>
          </RevealCard>
          <RevealCard index={1}>
            <div className="card p-6 bg-white h-full">
              <h2 className="type-h3 text-navy mb-2">Guaranteed Quote Lock</h2>
              <p className="text-sm text-body">
                Lock in your exchange rate for up to 48 hours while internal authorization and payment clearing occur.
              </p>
            </div>
          </RevealCard>
          <RevealCard index={2}>
            <div className="card p-6 bg-white h-full">
              <h2 className="type-h3 text-navy mb-2">End-to-End Tracking</h2>
              <p className="text-sm text-body">
                Automated webhook triggers and recipient notification emails keep your accounts payable team and suppliers synchronized.
              </p>
            </div>
          </RevealCard>
        </RevealSection>

        <div className="card-dark p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="type-h3 text-white">Ready to optimize corporate FX intelligence?</h2>
            <p className="type-caption text-[#C9D3E3] mt-1">
              Open an account in under 10 minutes with zero setup fees.
            </p>
          </div>
          <Link href="/register" className="btn-primary whitespace-nowrap">
            Open Business Account <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
