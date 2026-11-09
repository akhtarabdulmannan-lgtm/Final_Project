'use client';

import Link from 'next/link';
import { Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { RevealCard, RevealSection } from '@/components/ui/MotionPrimitives';

export default function BusinessIntegrationsPage() {
  const erps = [
    {
      name: 'Microsoft Dynamics 365',
      desc: 'Native bidirectional data connector. Sync purchase orders, accounts payable ledgers, and foreign currency payment execution directly inside Dynamics 365 Business Central and Finance.',
      status: 'Certified Native Connector',
      features: [
        'Automated bank reconciliation',
        'Real-time multi-currency ledger posting',
        'Zero manual entry',
      ],
    },
    {
      name: 'Sage Intacct',
      desc: 'Connect your cloud accounting workflow to VectisX wholesale FX liquidity. Push cross-border bills to VectisX for bulk settlement and pull cleared transaction details automatically.',
      status: 'Sage Verified Integration',
      features: [
        'Automated vendor payout matching',
        'Foreign currency loss/gain journal entries',
        'Scheduled AP dispatches',
      ],
    },
    {
      name: 'Oracle NetSuite',
      desc: 'Seamlessly automate high-volume supplier disbursements across overseas subsidiaries with NetSuite multi-entity consolidation.',
      status: 'Supported Partner Integration',
      features: [
        'Subsidiary intercompany settlement',
        'Live mid-market currency revaluation',
        'Custom batch export mappings',
      ],
    },
    {
      name: 'SAP S/4HANA',
      desc: 'Enterprise treasury integration supporting high-throughput SWIFT ISO 20022 and proprietary VectisX API hooks.',
      status: 'Enterprise Certified',
      features: [
        'Global liquidity aggregation',
        'Host-to-host encrypted SFTP & REST',
        'Multi-tier segregation of duty rules',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Seamless Connectivity</span>
          <h1 className="type-h1 text-navy mt-2">
            ERP &amp; Enterprise Accounting Integrations
          </h1>
          <p className="type-body text-body mt-3">
            Eliminate double data entry. Connect VectisX directly to your enterprise resource planning (ERP) and accounting software to automate foreign exchange payments and accounts payable reconciliation.
          </p>
        </div>

        <RevealSection className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {erps.map((erp, idx) => (
            <RevealCard key={erp.name} index={idx}>
              <div className="card p-6 bg-white space-y-4 h-full">
                <div className="flex items-center justify-between">
                  <span className="badge-brand">{erp.status}</span>
                  <Cpu className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <h2 className="type-h3 text-navy">{erp.name}</h2>
                <p className="text-sm text-body">{erp.desc}</p>
                <div className="space-y-2 pt-2 border-t border-surface-200">
                  {erp.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 type-caption text-body">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" aria-hidden="true" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealCard>
          ))}
        </RevealSection>

        {/* Custom API Hook Callout */}
        <div className="card-dark p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="type-h3 text-white">Need a custom enterprise integration?</h2>
            <p className="type-caption text-[#C9D3E3] mt-1">
              Our REST API and webhooks let you integrate custom proprietary accounting software in days.
            </p>
          </div>
          <Link href="/api-platform" className="btn-primary whitespace-nowrap">
            View API Documentation <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
