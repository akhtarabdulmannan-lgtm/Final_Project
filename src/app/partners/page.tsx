'use client';

import Link from 'next/link';
import { Building2, ArrowRight } from 'lucide-react';

export default function PartnersPage() {
  const clients = [
    { name: 'ShopFlow', role: 'Global E-Commerce Platform', desc: 'Powers localized currency pricing in 45 countries for over 2M merchants.' },
    { name: 'CloudBooks', role: 'Enterprise Cloud Accounting', desc: 'Integrated automated FX bank feed reconciliation for 500,000+ businesses.' },
    { name: 'VistaCore', role: 'Multinational Manufacturing', desc: 'Saved $340,000 annually by locking forward contracts on European component imports.' },
    { name: 'PayStream', role: 'Cross-Border Contractor Payroll', desc: 'Disburses international contractor compensation to 120 countries in under 10 minutes.' },
    { name: 'GlobalTech', role: 'SaaS Software Enterprise', desc: 'Eliminates balance sheet FX risk on overseas subsidiary intercompany charges.' },
    { name: 'NexaPay', role: 'Fintech Payment Gateway', desc: 'Utilizes the VectisX Rate Blender API to deliver certified mid-market rates at &lt;30ms latency.' },
  ];

  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Client Success & Ecosystem</span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-surface-900 mt-2">
            Trusted by World-Class Organizations
          </h1>
          <p className="text-surface-600 text-base mt-3 leading-relaxed">
            From hyper-growth technology scale-ups to multinational enterprises, over 17,000 commercial clients rely on VectisX for dependable currency exchange.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {clients.map(c => (
            <div key={c.name} className="card p-6 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold font-heading text-xl text-brand-600">{c.name}</span>
                <Building2 className="w-5 h-5 text-surface-400" />
              </div>
              <div className="text-xs font-semibold text-teal-600">{c.role}</div>
              <p className="text-xs text-surface-600 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="card p-8 bg-gradient-to-r from-brand-900 to-brand-950 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold font-heading">Partner with VectisX</h3>
            <p className="text-xs text-surface-300 mt-1">Join our technology ecosystem or explore corporate treasury integration.</p>
          </div>
          <Link href="/api-platform/partners" className="btn-teal whitespace-nowrap">
            Explore Partner Programs <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
