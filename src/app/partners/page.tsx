'use client';

import Link from 'next/link';
import { Building2, ArrowRight } from 'lucide-react';
import { RevealCard, RevealSection } from '@/components/ui/MotionPrimitives';

export default function PartnersPage() {
  const clients = [
    {
      name: 'ShopFlow',
      role: 'Global E-Commerce Platform',
      desc: 'Powers localized currency pricing in 45 countries for over 2M merchants.',
    },
    {
      name: 'CloudBooks',
      role: 'Enterprise Cloud Accounting',
      desc: 'Integrated automated FX bank feed reconciliation for 500,000+ businesses.',
    },
    {
      name: 'VistaCore',
      role: 'Multinational Manufacturing',
      desc: 'Saved $340,000 annually by locking forward contracts on European component imports.',
    },
    {
      name: 'PayStream',
      role: 'Cross-Border Contractor Payroll',
      desc: 'Benchmarks international contractor compensation across 120 countries in real time.',
    },
    {
      name: 'GlobalTech',
      role: 'SaaS Software Enterprise',
      desc: 'Eliminates balance sheet FX risk on overseas subsidiary intercompany charges.',
    },
    {
      name: 'NexaPay',
      role: 'Fintech Payment Gateway',
      desc: 'Utilizes the VectisX Rate Blender API to deliver certified mid-market rates at <30ms latency.',
    },
  ];

  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Client Success &amp; Ecosystem</span>
          <h1 className="type-h1 text-navy mt-2">
            Trusted by World-Class Organizations
          </h1>
          <p className="type-body text-body mt-3">
            From hyper-growth technology scale-ups to multinational enterprises, over 17,000 commercial clients rely on VectisX for dependable currency intelligence.
          </p>
        </div>

        <RevealSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {clients.map((c, idx) => (
            <RevealCard key={c.name} index={idx}>
              <div className="card p-6 bg-white space-y-3 h-full">
                <div className="flex items-center justify-between">
                  <h2 className="type-h3 text-navy">{c.name}</h2>
                  <Building2 className="w-5 h-5 text-caption" aria-hidden="true" />
                </div>
                <div className="type-caption font-semibold text-primary">{c.role}</div>
                <p className="text-sm text-body tabular-nums">{c.desc}</p>
              </div>
            </RevealCard>
          ))}
        </RevealSection>

        <div className="card-dark p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="type-h3 text-white">Partner with VectisX</h2>
            <p className="type-caption text-[#C9D3E3] mt-1">
              Join our technology ecosystem or explore corporate treasury integration.
            </p>
          </div>
          <Link href="/api-platform/partners" className="btn-primary whitespace-nowrap">
            Explore Partner Programs <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
