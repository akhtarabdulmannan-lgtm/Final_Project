'use client';

import Link from 'next/link';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

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
        'Standard Rate Blender Filtering'
      ],
      highlighted: false,
      cta: 'Choose Core'
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
        'Priority Technical Support'
      ],
      highlighted: true,
      cta: 'Choose Intermediate'
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
        '99.9% Uptime Guarantee'
      ],
      highlighted: false,
      cta: 'Choose Prime'
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
        'Direct Engineering Phone Support & Slack'
      ],
      highlighted: false,
      cta: 'Contact Sales'
    }
  ];

  const addons = [
    { name: 'Central Bank Reference Rates', price: '+$199/yr', desc: 'Direct feeds from ECB, Federal Reserve, Bank of England, Bank of Canada, and RBI.' },
    { name: 'Alternative Source Feeds', price: '+$299/yr', desc: 'Custom secondary liquidity feeds for parallel audit verification.' },
    { name: 'Custom Margin Layer', price: '+$99/yr', desc: 'Automatically embed custom corporate spread markups in output API JSON responses.' },
    { name: 'Extended Entity Allowance', price: '+$149/yr', desc: 'Extend API licensing across multiple subsidiary corporate parent entities.' },
  ];

  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="badge-brand">Commercial API Licensing</span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-surface-900 mt-2">
            Predictable, Transparent API Pricing
          </h1>
          <p className="text-surface-600 text-sm mt-3 leading-relaxed">
            Choose the update frequency and query quota tailored for your application. All plans include full SDK access and proprietary Rate Blender filtering.
          </p>
        </div>

        {/* 4 Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tiers.map(t => (
            <div 
              key={t.name}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all ${
                t.highlighted 
                  ? 'bg-brand-900 text-white shadow-2xl ring-2 ring-brand-500 scale-105' 
                  : 'bg-white text-surface-900 border border-surface-200 shadow-sm'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg font-heading">{t.name}</h3>
                  {t.highlighted && (
                    <span className="text-[10px] font-bold text-teal-300 bg-teal-900/60 px-2 py-0.5 rounded-full uppercase">
                      Most Popular
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-extrabold font-mono">{t.price}</span>
                  <span className={`text-xs ml-1 ${t.highlighted ? 'text-surface-300' : 'text-surface-500'}`}>{t.period}</span>
                </div>
                <div className={`text-xs font-semibold px-2.5 py-1 rounded-lg mb-4 inline-block ${
                  t.highlighted ? 'bg-white/10 text-teal-300' : 'bg-surface-100 text-surface-700'
                }`}>
                  {t.requests}
                </div>
                <p className={`text-xs mb-6 leading-relaxed ${t.highlighted ? 'text-surface-300' : 'text-surface-600'}`}>
                  {t.desc}
                </p>

                <div className="space-y-2.5 border-t pt-4 border-surface-100/20 text-xs">
                  {t.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${t.highlighted ? 'text-teal-400' : 'text-brand-500'}`} />
                      <span className={t.highlighted ? 'text-surface-200' : 'text-surface-700'}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href={t.name === 'Enterprise' ? '/contact' : '/register'}
                  className={`w-full justify-center btn-sm ${
                    t.highlighted ? 'btn-teal' : 'btn-primary'
                  }`}
                >
                  {t.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="card p-8 bg-white mb-16">
          <div className="max-w-xl mb-6">
            <span className="badge-teal">Modular Capabilities</span>
            <h3 className="text-2xl font-bold font-heading text-surface-900 mt-1">
              Enterprise Add-On Options
            </h3>
            <p className="text-xs text-surface-500 mt-1">
              Enhance any tier with specialized regulatory rate data and subsidiary licensing rights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {addons.map(a => (
              <div key={a.name} className="p-4 rounded-2xl bg-surface-50 border border-surface-200 space-y-2">
                <div className="font-bold text-surface-900 text-sm">{a.name}</div>
                <div className="text-brand-600 font-bold font-mono text-xs">{a.price}</div>
                <p className="text-[11px] text-surface-500 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Free Sandbox CTA */}
        <div className="card p-8 bg-gradient-to-r from-brand-900 to-brand-950 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold font-heading">Start with a 14-day free developer trial</h3>
            <p className="text-xs text-surface-300 mt-1">Get immediate test credentials. No credit card required.</p>
          </div>
          <Link href="/register" className="btn-teal whitespace-nowrap">
            Generate Free Sandbox Key <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
