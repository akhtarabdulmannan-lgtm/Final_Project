'use client';

import Link from 'next/link';
import { Star, ShieldCheck, Bell, Send } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function MobileAppsPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="bg-surface border-b border-line py-12 sm:py-16">
        <div className="container-vx">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="badge-neutral">iOS &amp; Android App</span>
              <h1>VectisX in Your Pocket</h1>
              <p className="text-ink-500 mx-auto lg:mx-0">
                Experience real-time currency conversions, instant international money transfers with fees from $0, and custom rate alert triggers from anywhere in the world.
              </p>

              {/* Ratings Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 pt-2">
                <div className="p-4 rounded-2xl bg-surface-subtle border border-line text-left">
                  <div className="flex items-center gap-1 text-ink mb-1" aria-hidden="true">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-ink" />
                    ))}
                  </div>
                  <div className="text-[20px] font-heading font-semibold text-ink tabular-nums">4.8 / 5.0</div>
                  <div className="text-caption text-ink-500 mt-0.5 tabular-nums">
                    App Store (118k reviews)
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-subtle border border-line text-left">
                  <div className="flex items-center gap-1 text-ink mb-1" aria-hidden="true">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-ink" />
                    ))}
                  </div>
                  <div className="text-[20px] font-heading font-semibold text-ink tabular-nums">4.8 / 5.0</div>
                  <div className="text-caption text-ink-500 mt-0.5 tabular-nums">
                    Google Play (380k reviews)
                  </div>
                </div>
              </div>

              {/* Store Links */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
                <Link href="/register" className="btn-primary">
                  Download for iOS App Store
                </Link>
                <Link href="/register" className="btn-secondary">
                  Download on Google Play
                </Link>
              </div>
            </div>

            {/* Mockup Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-72 rounded-2xl border border-line-invert bg-surface-invert p-5 space-y-4">
                <div className="text-caption text-ink-invert-muted">VectisX Mobile</div>
                <div className="bg-[#1A1F26] border border-line-invert p-4 rounded-xl text-ink-invert">
                  <span className="text-caption text-ink-invert-muted uppercase">Instant Convert</span>
                  <div className="text-[20px] font-heading font-semibold mt-1 tabular-nums">$1,000.00 USD</div>
                  <div className="text-[18px] font-semibold text-ink-invert-muted mt-1 tabular-nums">
                    &asymp; €853.40 EUR
                  </div>
                </div>
                <div className="bg-[#1A1F26] border border-line-invert p-4 rounded-xl text-ink-invert space-y-1">
                  <div className="font-semibold text-[14px]">Transfer Dispatched</div>
                  <div className="text-caption text-ink-invert-muted">
                    Arrived in beneficiary account in 4 minutes.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="section-padding bg-bg">
        <div className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2>Engineered for Complete Financial Mobility</h2>
            <p className="text-ink-500 mx-auto">
              Everything you expect from VectisX desktop, optimized for mobile efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                Icon: Send,
                title: 'Send Money Abroad',
                desc: 'Send to 190+ countries straight from your saved contacts list with biometric Face ID or fingerprint sign-off.',
              },
              {
                Icon: Bell,
                title: 'Live Push Triggers',
                desc: 'Set custom push notifications so your phone alerts you the second exchange rates hit your desired mark.',
              },
              {
                Icon: ShieldCheck,
                title: 'Biometric Vault',
                desc: 'Manage your multi-currency balances securely with multi-factor authentication and real-time fraud protection.',
              },
            ].map(({ Icon, title, desc }, idx) => (
              <ScrollReveal key={title} delay={idx * 50}>
                <div className="card p-6 h-full space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-surface-subtle border border-line flex items-center justify-center">
                    <Icon className="w-5 h-5 text-ink" aria-hidden="true" />
                  </div>
                  <h3>{title}</h3>
                  <p className="text-ink-500 text-[15px] leading-[24px]">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
