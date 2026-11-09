'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { RevealCard, RevealSection } from '@/components/ui/MotionPrimitives';

export default function BusinessTeamPage() {
  const roles = [
    {
      name: 'Owner / Administrator',
      desc: 'Full administrative access: add team members, configure treasury workspaces, manage API keys, and set governance rules.',
    },
    {
      name: 'Finance Approver',
      desc: 'Authorizes high-value FX exposure models and batch CSV valuations. Can configure dual-signoff thresholds.',
    },
    {
      name: 'Treasury Analyst / Operator',
      desc: 'Creates multi-currency watchlists, rate alerts, and CSV schedules. Cannot modify governance rules without Approver signoff.',
    },
    {
      name: 'Read-Only Auditor',
      desc: 'Views historical rate records, downloads CSV audit tables, and inspects activity trails with read-only permissions.',
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
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Corporate Governance</span>
          <h1 className="type-h1 text-navy mt-2">
            Team Roles &amp; Multi-Level Permissions
          </h1>
          <p className="type-body text-body mt-3">
            Eliminate internal payment fraud and mistakes with strict role segregation. Enforce two-person sign-off policies and maintain immutable audit trails across every corporate transfer.
          </p>
        </div>

        {/* Roles Cards */}
        <RevealSection className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {roles.map((r, idx) => (
            <RevealCard key={r.name} index={idx}>
              <div className="card p-6 bg-white space-y-2 h-full">
                <span className="badge-brand">{r.name}</span>
                <p className="text-sm text-body pt-2">{r.desc}</p>
              </div>
            </RevealCard>
          ))}
        </RevealSection>

        {/* Permissions Table (14px table text) */}
        <RevealSection className="card p-6 bg-white mb-12 overflow-hidden">
          <h2 className="type-h3 text-navy mb-4">Role Permission Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-page type-caption font-semibold text-caption uppercase border-b border-surface-200">
                  <th className="py-3.5 px-4">Action / Feature</th>
                  <th className="py-3.5 px-4 text-center">Admin</th>
                  <th className="py-3.5 px-4 text-center">Approver</th>
                  <th className="py-3.5 px-4 text-center">Creator</th>
                  <th className="py-3.5 px-4 text-center">Auditor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 font-medium">
                {permissionsMatrix.map((row) => (
                  <tr key={row.feature} className="hover:bg-page transition-colors duration-150 ease-fintech">
                    <td className="py-3.5 px-4 font-semibold text-navy">{row.feature}</td>
                    <td className="py-3.5 px-4 text-center">
                      {row.admin ? (
                        <span className="text-gain font-semibold" aria-label="Included">
                          ✓
                        </span>
                      ) : (
                        <span className="text-caption" aria-label="Not included">
                          —
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {row.approver ? (
                        <span className="text-gain font-semibold" aria-label="Included">
                          ✓
                        </span>
                      ) : (
                        <span className="text-caption" aria-label="Not included">
                          —
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {row.creator ? (
                        <span className="text-gain font-semibold" aria-label="Included">
                          ✓
                        </span>
                      ) : (
                        <span className="text-caption" aria-label="Not included">
                          —
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {row.auditor ? (
                        <span className="text-gain font-semibold" aria-label="Included">
                          ✓
                        </span>
                      ) : (
                        <span className="text-caption" aria-label="Not included">
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealSection>

        {/* CTA */}
        <div className="card-dark p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="type-h3 text-white">Secure your corporate treasury workflows</h2>
            <p className="type-caption text-[#C9D3E3] mt-1">
              Add unlimited team members with custom security roles for free.
            </p>
          </div>
          <Link href="/register" className="btn-primary whitespace-nowrap">
            Setup Team Access <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
