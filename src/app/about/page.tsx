'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { RevealCard, RevealSection } from '@/components/ui/MotionPrimitives';

export default function AboutPage() {
  const leadership = [
    {
      name: 'Marcus Vance',
      role: 'Chief Executive Officer',
      bio: 'Former Managing Director of Global Forex Liquidity at Barclays with 24 years in international FX markets.',
    },
    {
      name: 'Dr. Elena Rostova',
      role: 'Chief Technology Officer',
      bio: 'PhD in Distributed Systems from MIT; architected high-frequency algorithmic matching engines for global exchanges.',
    },
    {
      name: 'Jonathan Pierce',
      role: 'Head of Global Compliance',
      bio: 'Former FinCEN regulatory advisor with two decades specializing in AML/BSA bank compliance.',
    },
    {
      name: 'Aisha Al-Mansoor',
      role: 'VP of Institutional Treasury',
      bio: 'Spearheaded corporate cross-border payments for Fortune 500 multinationals across EMEA and APAC.',
    },
  ];

  const milestones = [
    {
      year: '1993',
      event: 'VectisX founded as one of the internet’s earliest currency information websites.',
    },
    {
      year: '2001',
      event: 'Launched the proprietary Rate Blender engine, aggregating interbank liquidity.',
    },
    {
      year: '2010',
      event: 'Acquired by Meridian Financial Corporation (NASDAQ: MRDN) to expand global reach.',
    },
    {
      year: '2018',
      event: 'Introduced institutional multi-source FX consensus analytics and automated cloud alerts.',
    },
    {
      year: '2024',
      event: 'Surpassed $17B in annual benchmarked FX flow with 17,000+ active enterprise clients.',
    },
  ];

  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx">
        {/* Hero */}
        <div className="max-w-3xl mb-16">
          <span className="badge-brand">Our Legacy &amp; Mission</span>
          <h1 className="type-h1 text-navy mt-2">
            Thirty Years of Global Currency Intelligence
          </h1>
          <p className="type-body text-body mt-4">
            Founded in 1993, VectisX has spent over three decades democratizing foreign exchange. From displaying the world&apos;s first digital currency conversion rates to powering commercial treasury intelligence, our commitment remains steadfast: absolute transparency, certified mid-market rates, and institutional security.
          </p>
        </div>

        {/* Corporate Profile Card */}
        <RevealSection className="card-dark p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="badge-brand">A Meridian Financial Company</span>
              <h2 className="type-h3 text-white">
                Backed by Global Financial Infrastructure
              </h2>
              <p className="text-sm text-[#C9D3E3]">
                VectisX operates as a wholly owned subsidiary of Meridian Financial Corporation (NASDAQ: MRDN), an international financial data leader serving consumer and enterprise analytics across 190+ jurisdictions.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center tabular-nums">
              <div className="p-4 rounded-2xl bg-navy-elevated border border-navy-border">
                <div className="text-2xl font-heading font-semibold text-white">1993</div>
                <div className="type-caption text-[#C9D3E3] mt-1">Established</div>
              </div>
              <div className="p-4 rounded-2xl bg-navy-elevated border border-navy-border">
                <div className="text-2xl font-heading font-semibold text-white">190+</div>
                <div className="type-caption text-[#C9D3E3] mt-1">Countries</div>
              </div>
              <div className="p-4 rounded-2xl bg-navy-elevated border border-navy-border">
                <div className="text-2xl font-heading font-semibold text-white">220+</div>
                <div className="type-caption text-[#C9D3E3] mt-1">Currencies</div>
              </div>
              <div className="p-4 rounded-2xl bg-navy-elevated border border-navy-border">
                <div className="text-2xl font-heading font-semibold text-white">SOC 2</div>
                <div className="type-caption text-[#C9D3E3] mt-1">Type II Certified</div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Timeline */}
        <RevealSection className="card p-8 bg-white mb-16">
          <h2 className="type-h2 text-navy mb-8">Three Decades of Milestones</h2>
          <div className="space-y-6">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="flex items-start gap-4 pb-6 border-b border-surface-200 last:border-0 last:pb-0"
              >
                <div className="font-heading font-semibold text-primary text-lg w-16 flex-shrink-0 tabular-nums">
                  {m.year}
                </div>
                <p className="text-sm text-body">{m.event}</p>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* Leadership */}
        <RevealSection className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="type-h2 text-navy">Executive Leadership</h2>
            <p className="type-caption text-caption mt-2">
              Seasoned finance veterans and distributed systems pioneers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {leadership.map((l, idx) => (
              <RevealCard key={l.name} index={idx}>
                <div className="card p-6 bg-white space-y-2 h-full">
                  <div className="w-12 h-12 rounded-full bg-primary-pale border border-primary-border text-primary font-semibold flex items-center justify-center text-lg mb-3">
                    {l.name[0]}
                  </div>
                  <h3 className="font-heading font-semibold text-navy text-lg">{l.name}</h3>
                  <div className="type-caption font-semibold text-primary">{l.role}</div>
                  <p className="type-caption text-body pt-1">{l.bio}</p>
                </div>
              </RevealCard>
            ))}
          </div>
        </RevealSection>

        {/* CTA */}
        <div className="card-dark p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="type-h3 text-white">Experience the VectisX difference</h2>
            <p className="type-caption text-[#C9D3E3] mt-1">
              Explore institutional consensus exchange rates, historical ECB charts, and cloud alerts.
            </p>
          </div>
          <Link href="/register" className="btn-primary whitespace-nowrap">
            Open Free Account <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
