'use client';

import Link from 'next/link';
import { Users, ShieldCheck, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function BusinessTeamPage() {
  const roles = [
    {
      name: 'Owner / Administrator',
      desc: 'Full administrative access: add team members, configure bank accounts, manage API keys, and set spending limits.',
      color: 'bg-brand-50 text-brand-600',
    },
    {
      name: 'Finance Approver',
      desc: 'Authorizes outgoing high-value wires and batch payroll uploads. Can configure dual-signoff thresholds.',
      color: 'bg-teal-50 text-teal-600',
    },
    {
      name: 'Payment Creator / Operator',
      desc: 'Sets up individual recipient payments and uploads CSV files. Cannot release funds without Approver signoff.',
      color: 'bg-accent-50 text-accent-600',
    },
    {
      name: 'Read-Only Auditor',
      desc: 'Views payment records, downloads PDF tax statements, and inspects audit trails without transactional authority.',
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  const permissionsMatrix = [
    { feature: 'Initiate Transfer / Draft CSV Batch', admin: true, approver: true, creator: true, auditor: false },
    { feature: 'Release & Authorize Payment Dispatches', admin: true, approver: true, creator: false, auditor: false },
    { feature: 'Book Forward FX Contracts', admin: true, approver: true, creator: false, auditor: false },
    { feature: 'Manage Beneficiary Bank Directory', admin: true, approver: true, creator: true, auditor: false },
    { feature: 'Invite & Manage Team Roles', admin: true, approver: false, creator: false, auditor: false },
    { feature: 'Generate Developer API Secret Keys', admin: true, approver: false, creator: false, auditor: false },
    { feature: 'Export Statement CSVs & Audit Logs', admin: true, approver: true, creator: true, auditor: true },
  ];

  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Corporate Governance</span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-surface-900 mt-2">
            Team Roles & Multi-Level Permissions
          </h1>
          <p className="text-surface-600 text-base mt-3 leading-relaxed">
            Eliminate internal payment fraud and mistakes with strict role segregation. Enforce two-person sign-off policies and maintain immutable audit trails across every corporate transfer.
          </p>
        </div>

        {/* Roles Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {roles.map(r => (
            <div key={r.name} className="card p-6 bg-white space-y-2">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block ${r.color}`}>
                {r.name}
              </span>
              <p className="text-xs text-surface-600 leading-relaxed pt-2">
                {r.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Permissions Table */}
        <div className="card p-6 bg-white mb-12 shadow-sm overflow-hidden">
          <h3 className="font-heading font-bold text-lg text-surface-900 mb-4">
            Role Permission Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-surface-50 text-surface-500 uppercase border-b border-surface-200">
                  <th className="py-3 px-4 font-bold">Action / Feature</th>
                  <th className="py-3 px-4 text-center font-bold">Admin</th>
                  <th className="py-3 px-4 text-center font-bold">Approver</th>
                  <th className="py-3 px-4 text-center font-bold">Creator</th>
                  <th className="py-3 px-4 text-center font-bold">Auditor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 font-medium">
                {permissionsMatrix.map((row, i) => (
                  <tr key={i} className="hover:bg-surface-50">
                    <td className="py-3.5 px-4 font-semibold text-surface-900">{row.feature}</td>
                    <td className="py-3.5 px-4 text-center">{row.admin ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-surface-300">—</span>}</td>
                    <td className="py-3.5 px-4 text-center">{row.approver ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-surface-300">—</span>}</td>
                    <td className="py-3.5 px-4 text-center">{row.creator ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-surface-300">—</span>}</td>
                    <td className="py-3.5 px-4 text-center">{row.auditor ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-surface-300">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="card p-8 bg-gradient-to-r from-brand-900 to-brand-950 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold font-heading">Secure your corporate treasury workflows</h3>
            <p className="text-xs text-surface-300 mt-1">Add unlimited team members with custom security roles for free.</p>
          </div>
          <Link href="/register" className="btn-teal whitespace-nowrap">
            Setup Team Access <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
