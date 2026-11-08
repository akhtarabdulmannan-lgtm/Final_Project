'use client';

import Link from 'next/link';
import { Smartphone, Star, ShieldCheck, Zap, Bell, Send, ArrowRight, QrCode } from 'lucide-react';

export default function MobileAppsPage() {
  return (
    <div className="min-h-screen bg-surface-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800 text-white py-14 sm:py-20">
        <div className="container-vx">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="badge-teal">iOS & Android App</span>
              <h1 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight">
                VectisX in Your Pocket
              </h1>
              <p className="text-surface-300 text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                Experience real-time currency conversions, instant international money transfers with fees from $0, and custom rate alert triggers from anywhere in the world.
              </p>

              {/* Ratings Badges */}
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 pt-2">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-left">
                  <div className="flex items-center gap-1 text-amber-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <div className="text-xl font-extrabold text-white">4.8 / 5.0</div>
                  <div className="text-xs text-surface-300 mt-0.5">App Store (118k reviews)</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-left">
                  <div className="flex items-center gap-1 text-amber-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <div className="text-xl font-extrabold text-white">4.8 / 5.0</div>
                  <div className="text-xs text-surface-300 mt-0.5">Google Play (380k reviews)</div>
                </div>
              </div>

              {/* Store Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                <button className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white text-surface-900 font-bold hover:bg-surface-100 transition-all shadow-lg text-left">
                  <span className="text-2xl"></span>
                  <div>
                    <div className="text-[10px] text-surface-500 uppercase leading-none">Download on the</div>
                    <div className="text-sm leading-tight">Apple App Store</div>
                  </div>
                </button>

                <button className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white text-surface-900 font-bold hover:bg-surface-100 transition-all shadow-lg text-left">
                  <span className="text-2xl">▶</span>
                  <div>
                    <div className="text-[10px] text-surface-500 uppercase leading-none">Get it on</div>
                    <div className="text-sm leading-tight">Google Play</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Mockup Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-72 h-[480px] rounded-[48px] border-8 border-surface-800 bg-surface-950 p-4 shadow-2xl relative flex flex-col justify-between">
                <div className="w-24 h-4 bg-surface-800 rounded-full mx-auto" />
                <div className="space-y-4 my-auto">
                  <div className="bg-brand-900 p-4 rounded-2xl text-white">
                    <span className="text-[10px] text-teal-300 font-semibold uppercase">Instant Convert</span>
                    <div className="text-2xl font-bold font-mono mt-1">$1,000.00 USD</div>
                    <div className="text-lg font-bold font-mono text-teal-400 mt-1">&asymp; €853.40 EUR</div>
                  </div>
                  <div className="bg-white/10 p-3.5 rounded-2xl text-white text-xs space-y-1">
                    <div className="text-teal-300 font-bold">Transfer Dispatched</div>
                    <div className="text-surface-200">Arrived in beneficiary account in 4 minutes.</div>
                  </div>
                </div>
                <div className="w-16 h-1 bg-surface-700 rounded-full mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="section-padding bg-white">
        <div className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-heading font-bold text-surface-900">
              Engineered for Complete Financial Mobility
            </h2>
            <p className="text-sm text-surface-500 mt-2">
              Everything you expect from VectisX desktop, optimized for mobile efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center mb-4">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-surface-900 text-lg mb-2">Send Money Abroad</h3>
              <p className="text-xs text-surface-600 leading-relaxed">
                Send to 190+ countries straight from your saved contacts list with biometric Face ID or fingerprint sign-off.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center mb-4">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-surface-900 text-lg mb-2">Live Push Triggers</h3>
              <p className="text-xs text-surface-600 leading-relaxed">
                Set custom push notifications so your phone alerts you the second exchange rates hit your desired mark.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 rounded-2xl bg-accent-100 text-accent-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-surface-900 text-lg mb-2">Biometric Vault</h3>
              <p className="text-xs text-surface-600 leading-relaxed">
                Manage your multi-currency balances securely with multi-factor authentication and real-time fraud protection.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
