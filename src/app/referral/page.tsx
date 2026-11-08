'use client';

import Link from 'next/link';
import { Gift, Copy, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText('https://vectisx.com/ref/VXNEW100');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge-teal">Refer & Earn</span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-surface-900 mt-2">
            Give $100, Get $100
          </h1>
          <p className="text-surface-600 text-base mt-3">
            Invite friends, colleagues, and business partners to VectisX. When they transfer $3,000 or more, you both receive $100 account credit.
          </p>
        </div>

        {/* Promo Code Box */}
        <div className="max-w-lg mx-auto card p-8 bg-white shadow-xl text-center mb-16 space-y-4">
          <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
            <Gift className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold font-heading text-surface-900">Your Universal Promo Code</h3>
          <div className="flex items-center gap-2 p-3 bg-surface-50 rounded-2xl border border-surface-200">
            <span className="flex-1 font-mono font-extrabold text-brand-600 text-lg">VXNEW100</span>
            <button
              onClick={handleCopy}
              className="btn-primary btn-sm flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" />
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
          <p className="text-xs text-surface-400">
            Valid for new accounts sending an initial international transfer of $3,000 or more.
          </p>
        </div>

        {/* 3 Step Explainer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-6 bg-white text-center">
            <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 font-bold flex items-center justify-center mx-auto mb-4">1</div>
            <h4 className="font-bold text-surface-900 text-base mb-1">Share Your Code</h4>
            <p className="text-xs text-surface-500">Send your referral link or code VXNEW100 to friends or clients.</p>
          </div>
          <div className="card p-6 bg-white text-center">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 font-bold flex items-center justify-center mx-auto mb-4">2</div>
            <h4 className="font-bold text-surface-900 text-base mb-1">They Send $3,000+</h4>
            <p className="text-xs text-surface-500">Your referral enjoys $100 off their transfer fee on checkout.</p>
          </div>
          <div className="card p-6 bg-white text-center">
            <div className="w-10 h-10 rounded-xl bg-accent-100 text-accent-600 font-bold flex items-center justify-center mx-auto mb-4">3</div>
            <h4 className="font-bold text-surface-900 text-base mb-1">You Get $100</h4>
            <p className="text-xs text-surface-500">$100 is credited straight into your VectisX multi-currency balance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
