'use client';

import Link from 'next/link';
import { ShieldCheck, Globe2, TrendingUp, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function PartnersPage() {
  const models = [
    {
      title: 'Affiliate Publisher Network',
      desc: 'Monetize finance blogs, travel guides, and expat resources with competitive CPA commissions per new user transfer.',
      icon: TrendingUp,
    },
    {
      title: 'Enterprise Bank & SaaS Resellers',
      desc: 'Embed VectisX currency exchange engines and remittance rails natively inside your neobanking or fintech platform.',
      icon: Globe2,
    },
    {
      title: 'Treasury Advisory Channels',
      desc: 'Refer corporate importers and global businesses to our dedicated dealing desk for ongoing revenue share.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">Global Strategic Alliances</span>
          <h1>Partner with the World&apos;s Trusted FX Network</h1>
          <p className="text-ink-500">
            Grow revenue and add world-class currency intelligence and cross-border remittance capabilities to your customer ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {models.map((m, idx) => (
            <ScrollReveal key={m.title} delay={idx * 50}>
              <div className="card p-6 bg-surface h-full space-y-3">
                <div className="w-11 h-11 rounded-xl bg-surface-subtle border border-line text-ink flex items-center justify-center">
                  <m.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3>{m.title}</h3>
                <p className="text-[15px] leading-[24px] text-ink-500">{m.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="card-invert p-8 sm:p-10 text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-ink-invert">Become an Official VectisX Partner</h2>
          <p className="text-ink-invert-muted max-w-lg mx-auto">
            Connect with our partnerships team to explore revenue splits, co-marketing assets, and dedicated technical onboarding.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-invert">
              <span>Apply to Partner Program</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/api-platform/partners" className="btn-secondary bg-transparent text-ink-invert border-line-invert hover:bg-[#1E242C]">
              Developer Partners &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
