'use client';

import Link from 'next/link';
import { Cpu, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

export default function BusinessIntegrationsPage() {
  const erps = [
    {
      name: 'Microsoft Dynamics 365',
      desc: 'Native bidirectional data connector. Sync purchase orders, accounts payable ledgers, and foreign currency payment execution directly inside Dynamics 365 Business Central and Finance.',
      status: 'Certified Native Connector',
      features: ['Automated bank reconciliation', 'Real-time multi-currency ledger posting', 'Zero manual entry']
    },
    {
      name: 'Sage Intacct',
      desc: 'Connect your cloud accounting workflow to VectisX wholesale FX liquidity. Push cross-border bills to VectisX for bulk settlement and pull cleared transaction details automatically.',
      status: 'Sage Verified Integration',
      features: ['Automated vendor payout matching', 'Foreign currency loss/gain journal entries', 'Scheduled AP dispatches']
    },
    {
      name: 'Oracle NetSuite',
      desc: 'Seamlessly automate high-volume supplier disbursements across overseas subsidiaries with NetSuite multi-entity consolidation.',
      status: 'Supported Partner Integration',
      features: ['Subsidiary intercompany settlement', 'Live mid-market currency revaluation', 'Custom batch export mappings']
    },
    {
      name: 'SAP S/4HANA',
      desc: 'Enterprise treasury integration supporting high-throughput SWIFT ISO 20022 and proprietary VectisX API hooks.',
      status: 'Enterprise Certified',
      features: ['Global liquidity aggregation', 'Host-to-host encrypted SFTP & REST', 'Multi-tier segregation of duty rules']
    }
  ];

  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Seamless Connectivity</span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-surface-900 mt-2">
            ERP & Enterprise Accounting Integrations
          </h1>
          <p className="text-surface-600 text-base mt-3 leading-relaxed">
            Eliminate double data entry. Connect VectisX directly to your enterprise resource planning (ERP) and accounting software to automate foreign exchange payments and accounts payable reconciliation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {erps.map(erp => (
            <div key={erp.name} className="card p-6 bg-white space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                  {erp.status}
                </span>
                <Cpu className="w-5 h-5 text-brand-500" />
              </div>
              <h3 className="font-bold text-surface-900 text-xl font-heading">{erp.name}</h3>
              <p className="text-xs text-surface-600 leading-relaxed">{erp.desc}</p>
              <div className="space-y-1.5 pt-2 border-t border-surface-100">
                {erp.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-surface-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Custom API Hook Callout */}
        <div className="card p-8 bg-gradient-to-r from-brand-900 to-brand-950 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold font-heading">Need a custom enterprise integration?</h3>
            <p className="text-xs text-surface-300 mt-1">Our REST API and webhooks let you integrate custom proprietary accounting software in days.</p>
          </div>
          <Link href="/api-platform" className="btn-teal whitespace-nowrap">
            View API Documentation <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
