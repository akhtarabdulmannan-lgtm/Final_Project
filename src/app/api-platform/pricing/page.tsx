'use client';

import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { RevealCard, RevealSection } from '@/components/ui/MotionPrimitives';

export default function ApiPricingPage() {
  const tiers = [
    {
      name: 'Core',
      price: '$599',
      period: 'per year',
      requests: '10,000 req / mo',
      desc: 'Ideal for standard corporate website currency displays and basic internal daily accounting valuation.',
      features: [
        'Daily frequency updates (EOD)',
        '1 Base Currency anchor',
        '220+ Currencies & Metals',
        'Standard Email Developer Support',
        'JSON REST API Format',
        'Standard Rate Blender Filtering',
      ],
      highlighted: false,
      cta: 'Choose Core',
    },
    {
      name: 'Intermediate',
      price: '$1,799',
      period: 'per year',
      requests: '50,000 req / mo',
      desc: 'For international e-commerce checkouts and active billing systems needing multi-hour exchange updates.',
      features: [
        'Hourly frequency updates',
        '5 Base Currency anchors',
        '220+ Currencies, Metals & Selected Crypto',
        'Historical Rates back to 1998',
        'Monthly Averages & Volatility Indices',
        'Priority Technical Support',
      ],
      highlighted: true,
      cta: 'Choose Intermediate',
    },
    {
      name: 'Prime',
      price: '$4,499',
      period: 'per year',
      requests: '200,000 req / mo',
      desc: 'High-frequency transactional systems, automated trading bots, and mid-tier multi-entity enterprise ERPs.',
      features: [
        '15-Minute rate frequency updates',
        'Unlimited Base Currency anchors',
        'Bid & Ask Real-Time Spreads (Beta)',
        'Central Bank Benchmark Rate Feeds',
        'Dedicated Technical Account Manager',
        '99.9% Uptime Guarantee',
      ],
      highlighted: false,
      cta: 'Choose Prime',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'tailored annual contract',
      requests: 'Unlimited req / mo',
      desc: 'Mission-critical institutional financial networks, multinational banks, and global market platforms.',
      features: [
        'Live minutely streaming rate feeds',
        'Unlimited high-concurrency requests',
        'Custom Margin & Source Rate Overrides',
        'Multi-Entity License Allowance',
        '99.99% Uptime SLA with Financial Backing',
        'Direct Engineering Phone Support & Slack',
      ],
      highlighted: false,
      cta: 'Contact Sales',
    },
  ];

  const addons = [
    {
      name: 'Central Bank Reference Rates',
      price: '+$199/yr',
      desc: 'Direct feeds from ECB, Federal Reserve, Bank of England, Bank of Canada, and RBI.',
    },
    {
      name: 'Alternative Source Feeds',
      price: '+$299/yr',
      desc: 'Custom secondary liquidity feeds for parallel audit verification.',
    },
    {
      name: 'Custom Margin Layer',
      price: '+$99/yr',
      desc: 'Automatically embed custom corporate spread markups in output API JSON responses.',
    },
    {
      name: 'Extended Entity Allowance',
      price: '+$149/yr',
      desc: 'Extend API licensing across multiple subsidiary corporate parent entities.',
    },
  ];

  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="badge-brand">Commercial API Licensing</span>
          <h1 className="type-h1 text-navy mt-2">
            Predictable, Transparent API Pricing
          </h1>
          <p className="type-body text-body mt-3 mx-auto">
            Choose the update frequency and query quota tailored for your application. All plans include full SDK access and proprietary Rate Blender filtering.
          </p>
        </div>

        {/* 4 Tiers */}
        <RevealSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tiers.map((t, idx) => (
            <RevealCard key={t.name} index={idx}>
              <div
                className={`rounded-2xl p-6 flex flex-col justify-between border transition-colors duration-150 ease-fintech h-full ${
                  t.highlighted
                    ? 'bg-navy text-white border-primary ring-1 ring-primary'
                    : 'bg-white text-navy border-surface-200 hover:border-surface-300'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className={`type-h3 ${t.highlighted ? 'text-white' : 'text-navy'}`}>
                      {t.name}
                    </h2>
                    {t.highlighted && (
                      <span className="badge-brand text-[11px] uppercase">Most Popular</span>
                    )}
                  </div>
                  <div className="mb-4 tabular-nums">
                    <span
                      className={`text-3xl font-heading font-semibold ${
                        t.highlighted ? 'text-white' : 'text-navy'
                      }`}
                    >
                      {t.price}
                    </span>
                    <span
                      className={`type-caption ml-1.5 ${
                        t.highlighted ? 'text-[#C9D3E3]' : 'text-caption'
                      }`}
                    >
                      {t.period}
                    </span>
                  </div>
                  <div
                    className={`type-caption font-semibold px-2.5 py-1 rounded-lg mb-4 inline-block border tabular-nums ${
                      t.highlighted
                        ? 'bg-navy-elevated border-navy-border text-[#DBE6FD]'
                        : 'bg-page border-surface-200 text-navy'
                    }`}
                  >
                    {t.requests}
                  </div>
                  <p
                    className={`text-sm mb-6 ${
                      t.highlighted ? 'text-[#C9D3E3]' : 'text-body'
                    }`}
                  >
                    {t.desc}
                  </p>

                  <div
                    className={`space-y-2.5 border-t pt-4 type-caption ${
                      t.highlighted ? 'border-navy-border' : 'border-surface-200'
                    }`}
                  >
                    {t.features.map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${
                            t.highlighted ? 'text-[#DBE6FD]' : 'text-primary'
                          }`}
                          aria-hidden="true"
                        />
                        <span className={t.highlighted ? 'text-[#E3E8F0]' : 'text-body'}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href={t.name === 'Enterprise' ? '/contact' : '/register'}
                    className={`w-full justify-center btn-sm ${
                      t.highlighted ? 'btn-primary' : 'btn-secondary'
                    }`}
                  >
                    {t.cta}
                  </Link>
                </div>
              </div>
            </RevealCard>
          ))}
        </RevealSection>

        {/* Add-ons */}
        <RevealSection className="card p-8 bg-white mb-16">
          <div className="max-w-xl mb-6">
            <span className="badge-brand">Modular Capabilities</span>
            <h2 className="type-h2 text-navy mt-2">
              Enterprise Add-On Options
            </h2>
            <p className="type-caption text-caption mt-1">
              Enhance any tier with specialized regulatory rate data and subsidiary licensing rights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {addons.map((a) => (
              <div key={a.name} className="p-4 rounded-2xl bg-page border border-surface-200 space-y-2">
                <div className="font-semibold text-navy text-sm">{a.name}</div>
                <div className="text-navy font-semibold tabular-nums type-caption">{a.price}</div>
                <p className="type-caption text-caption">{a.desc}</p>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* Free Sandbox CTA */}
        <div className="card-dark p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="type-h3 text-white">Start with a 14-day free developer trial</h2>
            <p className="type-caption text-[#C9D3E3] mt-1">
              Get immediate test credentials. No credit card required.
            </p>
          </div>
          <Link href="/register" className="btn-primary whitespace-nowrap">
            Generate Free Sandbox Key <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
