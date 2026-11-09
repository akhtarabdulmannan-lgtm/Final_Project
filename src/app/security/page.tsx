'use client';

import Link from 'next/link';
import { ShieldCheck, Lock, Award, FileText } from 'lucide-react';
import { RevealCard, RevealSection } from '@/components/ui/MotionPrimitives';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Trust &amp; Governance</span>
          <h1 className="type-h1 text-navy mt-2">
            Bank-Grade Security &amp; Regulatory Licensing
          </h1>
          <p className="type-body text-body mt-3">
            Your workspace and financial data are protected by multi-tier encryption, continuous third-party compliance audits, and full regulatory oversight across all operating jurisdictions.
          </p>
        </div>

        {/* 4 Pillars */}
        <RevealSection className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <RevealCard index={0}>
            <div className="card p-8 bg-white space-y-4 h-full flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-primary-pale text-primary border border-primary-border flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" aria-hidden="true" />
              </div>
              <h2 className="type-h3 text-navy">Regulatory Governance &amp; Compliance</h2>
              <p className="text-sm text-body flex-1">
                VectisX maintains strict institutional data governance and regulatory compliance across operating jurisdictions, backed by continuous independent oversight.
              </p>
              <Link
                href="/licenses"
                className="inline-flex items-center min-h-[44px] type-caption font-semibold text-primary hover:text-primary-hover hover:underline"
              >
                View all global compliance disclosures &rarr;
              </Link>
            </div>
          </RevealCard>

          <RevealCard index={1}>
            <div className="card p-8 bg-white space-y-4 h-full flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-primary-pale text-primary border border-primary-border flex items-center justify-center">
                <Lock className="w-6 h-6" aria-hidden="true" />
              </div>
              <h2 className="type-h3 text-navy">SOC 2 Type II Certified</h2>
              <p className="text-sm text-body flex-1">
                Independently audited annually by Big Four assurance firms under the American Institute of CPAs (AICPA) trust services criteria for security, availability, and confidential processing integrity.
              </p>
              <span className="type-caption font-semibold text-primary block">
                Annual SOC 2 Type II audit report available for enterprise NDA review.
              </span>
            </div>
          </RevealCard>

          <RevealCard index={2}>
            <div className="card p-8 bg-white space-y-4 h-full">
              <div className="w-12 h-12 rounded-2xl bg-primary-pale text-primary border border-primary-border flex items-center justify-center">
                <Award className="w-6 h-6" aria-hidden="true" />
              </div>
              <h2 className="type-h3 text-navy">Row-Level Security &amp; Access Controls</h2>
              <p className="text-sm text-body">
                Workspace records, alerts, and user profiles are isolated with PostgreSQL Row-Level Security (RLS) policies, strict JWT session verification, and role-based permissions.
              </p>
            </div>
          </RevealCard>

          <RevealCard index={3}>
            <div className="card p-8 bg-white space-y-4 h-full">
              <div className="w-12 h-12 rounded-2xl bg-primary-pale text-primary border border-primary-border flex items-center justify-center">
                <FileText className="w-6 h-6" aria-hidden="true" />
              </div>
              <h2 className="type-h3 text-navy">256-Bit TLS 1.3 &amp; AES Encryption</h2>
              <p className="text-sm text-body tabular-nums">
                All communications between your browser or application and VectisX servers are encrypted using TLS 1.3 with Perfect Forward Secrecy. Data at rest is encrypted with AES-256.
              </p>
            </div>
          </RevealCard>
        </RevealSection>

        {/* Responsible Disclosure */}
        <div className="card p-8 bg-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="type-h3 text-navy">Responsible Security Disclosure</h2>
            <p className="type-caption text-caption mt-1">
              Have you identified a potential vulnerability? Our security team operates an active bug bounty program.
            </p>
          </div>
          <a href="mailto:security@vectisx.com" className="btn-secondary whitespace-nowrap">
            Report Vulnerability
          </a>
        </div>
      </div>
    </div>
  );
}
