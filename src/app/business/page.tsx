'use client';

import Link from 'next/link';
import { 
  Building2, Globe2, ShieldCheck, ArrowRight, CheckCircle2, 
  TrendingUp, Users, Calendar, Layers, Cpu, PhoneCall, Award
} from 'lucide-react';

export default function BusinessHomePage() {
  return (
    <div className="min-h-screen bg-surface-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800 text-white py-16 sm:py-24">
        <div className="container-vx">
          <div className="max-w-3xl space-y-6">
            <span className="badge-teal">Enterprise Cross-Border Solutions</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-tight">
              Institutional FX & Global Payments for Modern Business
            </h1>
            <p className="text-surface-300 text-lg leading-relaxed">
              Empower your treasury with multi-currency accounts, automated bulk payments, and bespoke FX hedging. Trusted by 17,000+ corporations moving over $17B+ annually.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/register" className="btn-teal btn-lg">
                Open Free Business Account <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link href="/contact" className="btn-ghost text-white border border-white/20 hover:bg-white/10 btn-lg">
                Talk to an FX Specialist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-brand-900 text-white border-y border-white/10">
        <div className="container-vx">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-extrabold text-teal-400 font-heading">17,000+</div>
              <div className="text-xs text-surface-300 mt-1">Corporate Clients</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-brand-400 font-heading">$17B+</div>
              <div className="text-xs text-surface-300 mt-1">Annual FX Flow</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-accent-400 font-heading">190+</div>
              <div className="text-xs text-surface-300 mt-1">Payment Destinations</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-teal-300 font-heading">$0</div>
              <div className="text-xs text-surface-300 mt-1">Setup or Monthly Fees</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="section-padding bg-white">
        <div className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-heading font-bold text-surface-900">
              The Complete Commercial FX Toolkit
            </h2>
            <p className="text-sm text-surface-500 mt-2">
              Engineered to eliminate foreign exchange friction from international finance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center font-bold">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-surface-900 text-lg">Global Payments</h3>
              <p className="text-xs text-surface-600 leading-relaxed">
                Execute one-off or bulk vendor disbursements to 190+ countries in 145+ currencies with competitive institutional margins.
              </p>
              <Link href="/business/payments" className="text-xs font-bold text-brand-500 flex items-center gap-1 hover:underline pt-2">
                Learn more &rsaquo;
              </Link>
            </div>

            <div className="card p-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-surface-900 text-lg">FX Risk Management</h3>
              <p className="text-xs text-surface-600 leading-relaxed">
                Protect operating margins with forward contracts, limit orders, and bespoke hedging strategies locked up to 24 months.
              </p>
              <Link href="/business/fx-risk" className="text-xs font-bold text-brand-500 flex items-center gap-1 hover:underline pt-2">
                Explore risk tools &rsaquo;
              </Link>
            </div>

            <div className="card p-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-accent-100 text-accent-600 flex items-center justify-center font-bold">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-surface-900 text-lg">Batch & Payroll Payments</h3>
              <p className="text-xs text-surface-600 leading-relaxed">
                Upload a single payroll or supplier CSV to pay thousands of international beneficiaries in their local currencies at once.
              </p>
              <Link href="/business/batch" className="text-xs font-bold text-brand-500 flex items-center gap-1 hover:underline pt-2">
                Explore batch payouts &rsaquo;
              </Link>
            </div>

            <div className="card p-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-surface-900 text-lg">Scheduled Auto-Pay</h3>
              <p className="text-xs text-surface-600 leading-relaxed">
                Automate recurring cross-border vendor retainers and subscription payouts on specified settlement dates.
              </p>
              <Link href="/business/scheduled" className="text-xs font-bold text-brand-500 flex items-center gap-1 hover:underline pt-2">
                View scheduling &rsaquo;
              </Link>
            </div>

            <div className="card p-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-surface-900 text-lg">Team Roles & Permissions</h3>
              <p className="text-xs text-surface-600 leading-relaxed">
                Segregate duties with Creator, Verifier, and Approver authorization tiers, multi-signature rules, and audit logs.
              </p>
              <Link href="/business/team" className="text-xs font-bold text-brand-500 flex items-center gap-1 hover:underline pt-2">
                View team permissions &rsaquo;
              </Link>
            </div>

            <div className="card p-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-surface-900 text-lg">ERP & Accounting Sync</h3>
              <p className="text-xs text-surface-600 leading-relaxed">
                Direct integration connectors for Microsoft Dynamics 365, Sage Intacct, and custom enterprise REST API webhooks.
              </p>
              <Link href="/business/integrations" className="text-xs font-bold text-brand-500 flex items-center gap-1 hover:underline pt-2">
                Explore integrations &rsaquo;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dealer Desk Callout */}
      <section className="section-padding bg-surface-50 border-t border-surface-200">
        <div className="container-vx">
          <div className="bg-gradient-to-r from-brand-900 to-brand-950 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="badge-teal">Dedicated FX Dealing Desk</span>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold">
                Transferring more than $100,000 per month?
              </h3>
              <p className="text-sm text-surface-300">
                Connect with our rate-beating dealer desk for tailored corporate spreads, bespoke hedging execution, and dedicated treasury consultation.
              </p>
            </div>
            <Link href="/contact" className="btn-teal btn-lg whitespace-nowrap">
              <PhoneCall className="w-4 h-4 mr-1" /> Contact Dealer Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
