'use client';

import Link from 'next/link';
import { Award, ShieldCheck, Globe2, Users, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx">
        {/* Hero */}
        <div className="max-w-3xl mb-16">
          <span className="badge-brand">Our Legacy & Mission</span>
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-surface-900 mt-2">
            Thirty Years of Global Currency Intelligence
          </h1>
          <p className="text-surface-600 text-lg mt-4 leading-relaxed">
            Founded in 1993, VectisX has spent over three decades democratizing foreign exchange. From displaying the world’s first digital currency conversion rates to orchestrating multi-billion dollar commercial payments, our commitment remains steadfast: absolute transparency, guaranteed mid-market rates, and institutional security.
          </p>
        </div>

        {/* Corporate Profile Card */}
        <div className="card p-8 bg-brand-900 text-white rounded-3xl mb-16 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">A Meridian Financial Company</span>
              <h3 className="text-2xl font-bold font-heading">Backed by Global Financial Infrastructure</h3>
              <p className="text-xs text-surface-300 leading-relaxed">
                VectisX operates as a wholly owned subsidiary of Meridian Financial Corporation (NASDAQ: MRDN), an international payments titan processing over $120B in consumer and enterprise transactions annually across 190+ jurisdictions.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-teal-400 font-mono">1993</div>
                <div className="text-[11px] text-surface-300 mt-1">Established</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-brand-400 font-mono">190+</div>
                <div className="text-[11px] text-surface-300 mt-1">Countries</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-accent-400 font-mono">220+</div>
                <div className="text-[11px] text-surface-300 mt-1">Currencies</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-teal-300 font-mono">SOC 2</div>
                <div className="text-[11px] text-surface-300 mt-1">Type II Certified</div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="card p-8 bg-white mb-16">
          <h3 className="text-2xl font-bold font-heading text-surface-900 mb-8">Three Decades of Milestones</h3>
          <div className="space-y-6">
            {milestones.map((m, i) => (
              <div key={i} className="flex items-start gap-4 pb-6 border-b border-surface-100 last:border-0 last:pb-0">
                <div className="font-mono font-extrabold text-brand-600 text-lg w-16 flex-shrink-0">{m.year}</div>
                <p className="text-sm text-surface-700 leading-relaxed">{m.event}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-3xl font-heading font-bold text-surface-900">Executive Leadership</h2>
            <p className="text-xs text-surface-500 mt-1">Seasoned finance veterans and distributed systems pioneers.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {leadership.map(l => (
              <div key={l.name} className="card p-6 bg-white space-y-2">
                <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-600 font-bold flex items-center justify-center text-lg mb-3">
                  {l.name[0]}
                </div>
                <h4 className="font-bold text-surface-900 text-base">{l.name}</h4>
                <div className="text-xs font-semibold text-brand-500">{l.role}</div>
                <p className="text-xs text-surface-500 leading-relaxed pt-1">{l.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card p-8 bg-gradient-to-r from-brand-900 to-brand-950 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold font-heading">Experience the VectisX difference</h3>
            <p className="text-xs text-surface-300 mt-1">Start converting or sending money today with guaranteed mid-market rates.</p>
          </div>
          <Link href="/register" className="btn-teal whitespace-nowrap">
            Open Free Account <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
