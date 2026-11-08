'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20 flex items-center justify-center">
      <div className="container-vx max-w-md w-full">
        <div className="card p-8 bg-white shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center mx-auto text-white">
              <Zap className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold font-heading text-surface-900">Create Free VectisX Account</h1>
            <p className="text-xs text-surface-500">Hold, convert, and transfer 220+ currencies instantly.</p>
          </div>

          <div className="flex rounded-xl bg-surface-100 p-1">
            <button
              onClick={() => setAccountType('personal')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                accountType === 'personal' ? 'bg-white text-brand-600 shadow-sm' : 'text-surface-600'
              }`}
            >
              Personal
            </button>
            <button
              onClick={() => setAccountType('business')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                accountType === 'business' ? 'bg-white text-brand-600 shadow-sm' : 'text-surface-600'
              }`}
            >
              Business
            </button>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 text-emerald-800 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <div className="font-bold">Verification Email Sent</div>
              <p className="text-xs">Please check your inbox to activate your multi-currency vault.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-surface-600 block mb-1">
                  {accountType === 'business' ? 'Company Name' : 'Full Legal Name'}
                </label>
                <input type="text" required placeholder={accountType === 'business' ? 'Acme Corp' : 'John Doe'} className="input-field text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-surface-600 block mb-1">Email Address</label>
                <input type="email" required placeholder="you@domain.com" className="input-field text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-surface-600 block mb-1">Password</label>
                <input type="password" required placeholder="••••••••••••" className="input-field text-sm" />
              </div>
              <button type="submit" className="btn-primary w-full justify-center btn-lg">
                Register Free Account
              </button>
            </form>
          )}

          <div className="text-center text-xs text-surface-500 pt-2 border-t border-surface-100">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-brand-500 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
