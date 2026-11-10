'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import CountUpValue from '@/components/ui/CountUpValue';

export default function AboutPage() {
  const leadership = [
    { name: 'Marcus Vance', role: 'Chief Executive Officer', bio: 'Former Managing Director of Global Forex Liquidity at Barclays with 24 years in international FX markets.' },
    { name: 'Dr. Elena Rostova', role: 'Chief Technology Officer', bio: 'PhD in Distributed Systems from MIT; architected high-frequency algorithmic matching engines for global exchanges.' },
    { name: 'Jonathan Pierce', role: 'Head of Global Compliance', bio: 'Former FinCEN regulatory advisor with two decades specializing in AML/BSA bank compliance.' },
    { name: 'Aisha Al-Mansoor', role: 'VP of Institutional Treasury', bio: 'Spearheaded corporate cross-border payments for Fortune 500 multinationals across EMEA and APAC.' },
  ];

  const milestones = [
    { year: '1993', event: 'VectisX founded as one of the internet’s earliest currency information websites.' },
    { year: '2001', event: 'Launched the proprietary Rate Blender engine, aggregating interbank liquidity.' },
    { year: '2010', event: 'Acquired by Meridian Financial Corporation (NASDAQ: MRDN) to expand global reach.' },
    { year: '2018', event: 'Introduced zero-fee consumer remittances and the VectisX Multi-Currency Account.' },
    { year: '2024', event: 'Surpassed $17B in annual transaction flow with 17,000+ active enterprise clients.' },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        {/* Hero */}
        <div className="max-w-3xl mb-14 space-y-4">
          <span className="badge-neutral">Our Legacy &amp; Mission</span>
          <h1>Thirty Years of Global Currency Intelligence</h1>
          <p className="text-ink-500">
            Founded in 1993, VectisX has spent over three decades democratizing foreign exchange. From displaying digital conversion rates to orchestrating multi-billion dollar commercial payments, our focus remains transparency, mid-market accuracy, and institutional security.
          </p>
        </div>

        {/* Corporate Profile Card */}
        <div className="card-invert p-8 rounded-2xl mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <span className="badge-invert">A Meridian Financial Company</span>
              <h2 className="text-ink-invert">Backed by Global Financial Infrastructure</h2>
              <p className="text-ink-invert-muted">
                VectisX operates as a wholly owned subsidiary of Meridian Financial Corporation (NASDAQ: MRDN), an international payments organization processing over $120B annually across 190+ jurisdictions.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-xl bg-[#1A1F26] border border-line-invert">
                <div className="text-[24px] font-heading font-semibold text-ink-invert tabular-nums">
                  1993
                </div>
                <div className="text-caption text-ink-invert-muted mt-1">Established</div>
              </div>
              <div className="p-4 rounded-xl bg-[#1A1F26] border border-line-invert">
                <div className="text-[24px] font-heading font-semibold text-ink-invert">
                  <CountUpValue value={190} suffix="+" duration={400} />
                </div>
                <div className="text-caption text-ink-invert-muted mt-1">Countries</div>
              </div>
              <div className="p-4 rounded-xl bg-[#1A1F26] border border-line-invert">
                <div className="text-[24px] font-heading font-semibold text-ink-invert">
                  <CountUpValue value={220} suffix="+" duration={400} />
                </div>
                <div className="text-caption text-ink-invert-muted mt-1">Currencies</div>
              </div>
              <div className="p-4 rounded-xl bg-[#1A1F26] border border-line-invert">
                <div className="text-[24px] font-heading font-semibold text-ink-invert tabular-nums">
                  SOC 2
                </div>
                <div className="text-caption text-ink-invert-muted mt-1">Type II Certified</div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="card p-8 bg-surface mb-14">
          <h2 className="mb-8">Three Decades of Milestones</h2>
          <div className="space-y-6">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 pb-6 border-b border-line last:border-0 last:pb-0"
              >
                <div className="font-heading font-semibold text-ink text-[20px] w-20 flex-shrink-0 tabular-nums">
                  {m.year}
                </div>
                <p className="text-ink-700">{m.event}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div className="mb-14">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2>Executive Leadership</h2>
            <p className="text-ink-500 mx-auto">
              Seasoned finance veterans and distributed systems pioneers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((l, idx) => (
              <ScrollReveal key={l.name} delay={idx * 50}>
                <div className="card p-6 bg-surface space-y-2 h-full">
                  <div className="w-11 h-11 rounded-full bg-surface-subtle border border-line text-ink font-semibold flex items-center justify-center text-[16px] mb-3">
                    {l.name[0]}
                  </div>
                  <h3 className="text-[18px] leading-[24px]">{l.name}</h3>
                  <div className="text-caption font-medium text-ink-500">{l.role}</div>
                  <p className="text-[14px] leading-[22px] text-ink-500 pt-1">{l.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card-invert p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-ink-invert">Experience the VectisX difference</h2>
            <p className="text-ink-invert-muted">
              Start converting or sending money today with guaranteed mid-market rates.
            </p>
          </div>
          <Link href="/register" className="btn-invert whitespace-nowrap">
            <span>Open Free Account</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
