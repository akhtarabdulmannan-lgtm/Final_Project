import Link from '@/router/Link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

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
        '64 currencies, including metals',
        'Standard Email Developer Support',
        'JSON REST API Format',
        'Standard reference-rate feed',
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
        '64 currencies, metals and selected crypto',
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
      desc: 'High-frequency transactional systems, automated trading workflows, and mid-tier multi-entity ERPs.',
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
    { name: 'Central Bank Reference Rates', price: '+$199/yr', desc: 'Direct feeds from ECB, Federal Reserve, Bank of England, Bank of Canada, and RBI.' },
    { name: 'Alternative Source Feeds', price: '+$299/yr', desc: 'Custom secondary liquidity feeds for parallel audit verification.' },
    { name: 'Custom Margin Layer', price: '+$99/yr', desc: 'Automatically embed custom corporate spread markups in output API JSON responses.' },
    { name: 'Extended Entity Allowance', price: '+$149/yr', desc: 'Extend API licensing across multiple subsidiary corporate parent entities.' },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="badge-neutral">Commercial API Licensing</span>
          <h1>Predictable, Transparent API Pricing</h1>
          <p className="text-ink-500 mx-auto">
            This is a coursework project, so nothing here is billable. The rates are free public data; the plans below are illustrative and describe how a commercial wrapper of these feeds might be priced.
          </p>
        </div>

        {/* 4 Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tiers.map((t, idx) => (
            <ScrollReveal key={t.name} delay={idx * 50}>
              <div
                className={`rounded-2xl p-6 flex flex-col justify-between h-full border transition-[border-color] duration-150 ${
                  t.highlighted
                    ? 'bg-surface-invert text-ink-invert border-line-invert'
                    : 'bg-surface text-ink border-line hover:border-line-strong'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center gap-2 mb-3">
                    <h3 className={t.highlighted ? 'text-ink-invert' : 'text-ink'}>{t.name}</h3>
                    {t.highlighted && <span className="badge-invert">Most Popular</span>}
                  </div>
                  <div className="mb-3 tabular-nums">
                    <span className="text-[30px] leading-[36px] font-heading font-semibold">{t.price}</span>
                    <span className={`text-caption ml-1.5 ${t.highlighted ? 'text-ink-invert-muted' : 'text-ink-500'}`}>
                      {t.period}
                    </span>
                  </div>
                  <div
                    className={`text-caption font-medium px-3 py-1 rounded-lg mb-4 inline-block tabular-nums ${
                      t.highlighted ? 'bg-[#1A1F26] text-ink-invert border border-line-invert' : 'bg-surface-subtle text-ink-700 border border-line'
                    }`}
                  >
                    {t.requests}
                  </div>
                  <p className={`text-[14px] leading-[22px] mb-5 ${t.highlighted ? 'text-ink-invert-muted' : 'text-ink-500'}`}>
                    {t.desc}
                  </p>

                  <div className={`space-y-2.5 border-t pt-4 text-[13px] leading-[18px] ${t.highlighted ? 'border-line-invert' : 'border-line'}`}>
                    {t.features.map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <CheckCircle2
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${t.highlighted ? 'text-ink-invert' : 'text-ink'}`}
                          aria-hidden="true"
                        />
                        <span className={t.highlighted ? 'text-ink-invert-muted' : 'text-ink-700'}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href={t.name === 'Enterprise' ? '/contact' : '/register'}
                    className={`w-full justify-center ${t.highlighted ? 'btn-invert' : 'btn-primary'}`}
                  >
                    {t.cta}
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Add-ons */}
        <div className="card p-8 bg-surface mb-12">
          <div className="max-w-xl mb-6 space-y-2">
            <span className="badge-neutral">Modular Capabilities</span>
            <h2>Enterprise Add-On Options</h2>
            <p className="text-ink-500">
              Enhance any tier with specialized regulatory rate data and subsidiary licensing rights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {addons.map((a) => (
              <div key={a.name} className="p-4 rounded-xl bg-surface-subtle border border-line space-y-2">
                <div className="font-semibold text-ink text-[15px]">{a.name}</div>
                <div className="text-ink font-semibold text-[14px] tabular-nums">{a.price}</div>
                <p className="text-caption text-ink-500">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Free Sandbox CTA */}
        <div className="card-invert p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-ink-invert">Start with a 14-day free developer trial</h2>
            <p className="text-ink-invert-muted">
              Get immediate test credentials. No credit card required.
            </p>
          </div>
          <Link href="/register" className="btn-invert whitespace-nowrap">
            <span>Generate Free Sandbox Key</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
