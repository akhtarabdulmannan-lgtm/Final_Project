'use client';

import Link from 'next/link';
import {
  Globe2,
  ArrowRight,
  TrendingUp,
  Users,
  Calendar,
  Layers,
  Cpu,
  PhoneCall,
} from 'lucide-react';
import { CountUpAmount, RevealCard, RevealSection } from '@/components/ui/MotionPrimitives';

export default function BusinessHomePage() {
  return (
    <div className="min-h-screen bg-page">
      {/* Hero */}
      <section className="bg-navy text-white border-b border-navy-border py-16 sm:py-24">
        <div className="container-vx">
          <div className="max-w-3xl space-y-6">
            <span className="badge-brand">Enterprise Treasury Intelligence</span>
            <h1 className="type-h1 text-white">
              Institutional FX Analytics &amp; Treasury Tools for Business
            </h1>
            <p className="type-body text-[#C9D3E3]">
              Empower your finance team with real-time FX consensus data, exposure calculators, team governance, and ERP rate synchronization across 190+ markets.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/register" className="btn-primary btn-lg">
                Open Free Business Account <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center min-h-[48px] rounded-xl border border-navy-border bg-navy-elevated px-8 py-4 text-base font-semibold text-white hover:border-[#DBE6FD] transition-colors duration-150 ease-fintech"
              >
                Talk to an FX Specialist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-navy-elevated text-white border-b border-navy-border">
        <div className="container-vx">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-semibold text-white font-heading tabular-nums">
                <CountUpAmount value={17000} suffix="+" format={(n) => Math.round(n).toLocaleString()} />
              </div>
              <div className="type-caption text-[#C9D3E3] mt-1">Corporate Clients</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-white font-heading tabular-nums">
                <CountUpAmount value={17} prefix="$" suffix="B+" format={(n) => Math.round(n).toString()} />
              </div>
              <div className="type-caption text-[#C9D3E3] mt-1">Annual FX Benchmarked</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-white font-heading tabular-nums">
                <CountUpAmount value={190} suffix="+" format={(n) => Math.round(n).toString()} />
              </div>
              <div className="type-caption text-[#C9D3E3] mt-1">Global Markets</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-white font-heading tabular-nums">$0</div>
              <div className="type-caption text-[#C9D3E3] mt-1">Setup or Monthly Fees</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="section-padding bg-white">
        <RevealSection className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="type-h2 text-navy">
              The Complete Commercial FX Toolkit
            </h2>
            <p className="type-body text-caption mt-2 mx-auto">
              Engineered to eliminate foreign exchange friction from international finance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <RevealCard index={0}>
              <div className="card p-6 space-y-3 h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-primary-pale text-primary border border-primary-border flex items-center justify-center">
                  <Globe2 className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="type-h3 text-navy">Global FX Valuation</h3>
                <p className="text-sm text-body flex-1">
                  Benchmark cross-currency exposures across 190+ countries and 220+ currencies with certified institutional mid-market rates.
                </p>
                <Link
                  href="/business/payments"
                  className="inline-flex items-center min-h-[44px] type-caption font-semibold text-primary hover:text-primary-hover gap-1 hover:underline"
                >
                  Learn about global payments &rsaquo;
                </Link>
              </div>
            </RevealCard>

            <RevealCard index={1}>
              <div className="card p-6 space-y-3 h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-primary-pale text-primary border border-primary-border flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="type-h3 text-navy">FX Risk Management</h3>
                <p className="text-sm text-body flex-1">
                  Protect operating margins with exposure stress-testing, forward rate modeling, and bespoke hedging analytics.
                </p>
                <Link
                  href="/business/fx-risk"
                  className="inline-flex items-center min-h-[44px] type-caption font-semibold text-primary hover:text-primary-hover gap-1 hover:underline"
                >
                  Explore risk tools &rsaquo;
                </Link>
              </div>
            </RevealCard>

            <RevealCard index={2}>
              <div className="card p-6 space-y-3 h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-primary-pale text-primary border border-primary-border flex items-center justify-center">
                  <Layers className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="type-h3 text-navy">Batch Valuation &amp; Payroll</h3>
                <p className="text-sm text-body flex-1">
                  Validate multi-currency payroll and supplier CSV schedules against real-time mid-market benchmarks in seconds.
                </p>
                <Link
                  href="/business/batch"
                  className="inline-flex items-center min-h-[44px] type-caption font-semibold text-primary hover:text-primary-hover gap-1 hover:underline"
                >
                  Explore batch tools &rsaquo;
                </Link>
              </div>
            </RevealCard>

            <RevealCard index={3}>
              <div className="card p-6 space-y-3 h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-primary-pale text-primary border border-primary-border flex items-center justify-center">
                  <Calendar className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="type-h3 text-navy">Scheduled Rate Reports</h3>
                <p className="text-sm text-body flex-1">
                  Automate recurring treasury FX snapshots and settlement-date benchmark audits across accounting periods.
                </p>
                <Link
                  href="/business/scheduled"
                  className="inline-flex items-center min-h-[44px] type-caption font-semibold text-primary hover:text-primary-hover gap-1 hover:underline"
                >
                  View scheduling &rsaquo;
                </Link>
              </div>
            </RevealCard>

            <RevealCard index={4}>
              <div className="card p-6 space-y-3 h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-primary-pale text-primary border border-primary-border flex items-center justify-center">
                  <Users className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="type-h3 text-navy">Team Roles &amp; Permissions</h3>
                <p className="text-sm text-body flex-1">
                  Segregate duties with Creator, Verifier, and Approver authorization tiers, multi-signature rules, and audit logs.
                </p>
                <Link
                  href="/business/team"
                  className="inline-flex items-center min-h-[44px] type-caption font-semibold text-primary hover:text-primary-hover gap-1 hover:underline"
                >
                  View team permissions &rsaquo;
                </Link>
              </div>
            </RevealCard>

            <RevealCard index={5}>
              <div className="card p-6 space-y-3 h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-primary-pale text-primary border border-primary-border flex items-center justify-center">
                  <Cpu className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="type-h3 text-navy">ERP &amp; Accounting Sync</h3>
                <p className="text-sm text-body flex-1">
                  Direct integration connectors for Microsoft Dynamics 365, Sage Intacct, and custom enterprise REST API webhooks.
                </p>
                <Link
                  href="/business/integrations"
                  className="inline-flex items-center min-h-[44px] type-caption font-semibold text-primary hover:text-primary-hover gap-1 hover:underline"
                >
                  Explore integrations &rsaquo;
                </Link>
              </div>
            </RevealCard>
          </div>
        </RevealSection>
      </section>

      {/* Dealer Desk Callout */}
      <section className="section-padding bg-page border-t border-surface-200">
        <RevealSection className="container-vx">
          <div className="card-dark p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="badge-brand">Dedicated FX Advisory Desk</span>
              <h2 className="type-h3 sm:text-[28px] sm:leading-[36px] text-white">
                Managing over $100,000 in monthly FX exposure?
              </h2>
              <p className="text-sm text-[#C9D3E3]">
                Connect with our institutional FX specialists for tailored rate feeds, bespoke hedging analytics, and dedicated treasury consultation.
              </p>
            </div>
            <Link href="/contact" className="btn-primary btn-lg whitespace-nowrap">
              <PhoneCall className="w-4 h-4 mr-1" aria-hidden="true" /> Contact Advisory Desk
            </Link>
          </div>
        </RevealSection>
      </section>
    </div>
  );
}
