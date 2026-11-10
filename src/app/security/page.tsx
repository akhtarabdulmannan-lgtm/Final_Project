'use client';

import { ShieldCheck, Lock, Server, FileCheck, EyeOff } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function SecurityPage() {
  const specs = [
    {
      title: 'SOC 2 Type II Audited',
      desc: 'Independent annual audits verify strict adherence to organizational controls for security, availability, and confidentiality.',
      icon: FileCheck,
    },
    {
      title: 'End-to-End Encryption',
      desc: 'All customer records, identity checks, and transfer instructions are protected with AES-256 at rest and TLS 1.3 in transit.',
      icon: Lock,
    },
    {
      title: 'Segregated Client Funds',
      desc: 'Customer settlement balances are held strictly in segregated Tier-1 trust bank accounts, never commingled with corporate assets.',
      icon: ShieldCheck,
    },
    {
      title: '24/7 Anomaly Detection',
      desc: 'Automated ML fraud monitoring evaluates every transaction against real-time behavioral vectors and sanctions watchlists.',
      icon: Server,
    },
    {
      title: 'Zero-Trust Access',
      desc: 'Mandatory hardware security keys and role-based access segmentation restrict production database credentials strictly.',
      icon: EyeOff,
    },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">Institutional Security</span>
          <h1>Bank-Grade Infrastructure Protecting Every Transaction</h1>
          <p className="text-ink-500">
            Security is the foundation of VectisX. We protect millions of dollars daily through rigorous cryptographic standards, regulatory licenses, and segregated asset custody.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {specs.map((s, idx) => (
            <ScrollReveal key={s.title} delay={idx * 50}>
              <div className="card p-6 bg-surface h-full space-y-3">
                <div className="w-11 h-11 rounded-xl bg-surface-subtle border border-line text-ink flex items-center justify-center">
                  <s.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3>{s.title}</h3>
                <p className="text-[15px] leading-[24px] text-ink-500">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="card-invert p-8 text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-ink-invert">Responsible Vulnerability Disclosure</h2>
          <p className="text-ink-invert-muted mx-auto">
            We value the security researcher community. Report potential bugs or protocol issues directly to our infosec incident desk.
          </p>
          <div className="text-[15px] font-semibold text-ink-invert pt-1">security@vectisx.com</div>
        </div>
      </div>
    </div>
  );
}
