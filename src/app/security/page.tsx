'use client';

import Link from 'next/link';
import { ShieldCheck, Lock, CheckCircle2, Award, FileText, ArrowRight } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Trust & Governance</span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-surface-900 mt-2">
            Bank-Grade Security & Regulatory Licensing
          </h1>
          <p className="text-surface-600 text-base mt-3 leading-relaxed">
            Your funds and financial data are protected by multi-tier encryption, continuous third-party compliance audits, and full regulatory oversight across all operating jurisdictions.
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="card p-8 bg-white space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-heading text-surface-900">Regulatory Registration & MSB Status</h3>
            <p className="text-xs text-surface-600 leading-relaxed">
              VectisX is registered with the Financial Crimes Enforcement Network (FinCEN) as a Money Services Business (MSB Registration #310001849204) and holds individual state money transmitter licenses across the United States.
            </p>
            <Link href="/licenses" className="text-xs font-bold text-brand-500 hover:underline inline-block">
              View all state & global licenses &rarr;
            </Link>
          </div>

          <div className="card p-8 bg-white space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center font-bold">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-heading text-surface-900">SOC 2 Type II Certified</h3>
            <p className="text-xs text-surface-600 leading-relaxed">
              Independently audited annually by Big Four assurance firms under the American Institute of CPAs (AICPA) trust services criteria for security, availability, and confidential processing integrity.
            </p>
            <span className="text-xs font-semibold text-teal-600 block">
              Annual SOC 2 Type II audit report available for enterprise NDA review.
            </span>
          </div>

          <div className="card p-8 bg-white space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-accent-100 text-accent-600 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-heading text-surface-900">Segregated Tier-1 Bank Accounts</h3>
            <p className="text-xs text-surface-600 leading-relaxed">
              Client funds are held strictly segregated from corporate operating capital inside safeguarded accounts at top-rated global tier-1 banking institutions (including JPMorgan Chase and Barclays).
            </p>
          </div>

          <div className="card p-8 bg-white space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-heading text-surface-900">256-Bit TLS 1.3 & AES Encryption</h3>
            <p className="text-xs text-surface-600 leading-relaxed">
              All communications between your browser or application and VectisX servers are encrypted using TLS 1.3 with Perfect Forward Secrecy. Data at rest is encrypted with military-grade AES-256.
            </p>
          </div>
        </div>

        {/* Responsible Disclosure */}
        <div className="card p-8 bg-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold font-heading text-surface-900">Responsible Security Disclosure</h3>
            <p className="text-xs text-surface-500 mt-1">
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
