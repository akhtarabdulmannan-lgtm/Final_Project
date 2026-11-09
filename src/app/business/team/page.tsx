'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function BusinessTeamPage() {
  const roles = [
    {
      name: 'Owner / Administrator',
      desc: 'Full administrative access: add team members, configure bank accounts, manage API keys, and set spending limits.',
    },
    {
      name: 'Finance Approver',
      desc: 'Authorizes outgoing high-value wires and batch payroll uploads. Can configure dual-signoff thresholds.',
    },
    {
      name: 'Payment Creator / Operator',
      desc: 'Sets up individual recipient payments and uploads CSV files. Cannot release funds without Approver signoff.',
    },
    {
      name: 'Read-Only Auditor',
      desc: 'Views payment records, downloads PDF tax statements, and inspects audit trails without transactional authority.',
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
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">Corporate Governance</span>
          <h1>Team Roles &amp; Multi-Level Permissions</h1>
          <p className="text-ink-500">
            Eliminate internal payment fraud and errors with strict role segregation. Enforce two-person sign-off policies and maintain immutable audit trails across every transfer.
          </p>
        </div>

        {/* Roles Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {roles.map((r, idx) => (
            <ScrollReveal key={r.name} delay={idx * 50}>
              <div className="card p-6 bg-surface space-y-3 h-full">
                <span className="badge-neutral">{r.name}</span>
                <p className="text-[15px] leading-[24px] text-ink-500 pt-1">{r.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Permissions Table */}
        <div className="card p-6 bg-surface mb-12 overflow-hidden">
          <h2 className="mb-4">Role Permission Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-subtle text-caption text-ink-500 uppercase border-b border-line">
                  <th className="py-3.5 px-4 font-medium">Action / Feature</th>
                  <th className="py-3.5 px-4 text-center font-medium">Admin</th>
                  <th className="py-3.5 px-4 text-center font-medium">Approver</th>
                  <th className="py-3.5 px-4 text-center font-medium">Creator</th>
                  <th className="py-3.5 px-4 text-center font-medium">Auditor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {permissionsMatrix.map((row) => (
                  <tr key={row.feature} className="hover:bg-surface-subtle/60">
                    <td className="py-3.5 px-4 font-medium text-ink">{row.feature}</td>
                    <td className="py-3.5 px-4 text-center">
                      {row.admin ? <span className="text-gain font-semibold" aria-label="Included">✓</span> : <span className="text-ink-500" aria-label="Not included">—</span>}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {row.approver ? <span className="text-gain font-semibold" aria-label="Included">✓</span> : <span className="text-ink-500" aria-label="Not included">—</span>}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {row.creator ? <span className="text-gain font-semibold" aria-label="Included">✓</span> : <span className="text-ink-500" aria-label="Not included">—</span>}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {row.auditor ? <span className="text-gain font-semibold" aria-label="Included">✓</span> : <span className="text-ink-500" aria-label="Not included">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="card-invert p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-ink-invert">Secure your corporate treasury workflows</h2>
            <p className="text-ink-invert-muted">
              Add unlimited team members with custom security roles for free.
            </p>
          </div>
          <Link href="/register" className="btn-invert whitespace-nowrap">
            <span>Setup Team Access</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
