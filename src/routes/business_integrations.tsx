import Link from '@/router/Link';
import { Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function BusinessIntegrationsPage() {
  const erps = [
    {
      name: 'Microsoft Dynamics 365',
      desc: 'Native bidirectional data connector. Sync purchase orders, accounts payable ledgers, and foreign currency payment execution inside Dynamics 365.',
      status: 'Certified Native Connector',
      features: ['Automated bank reconciliation', 'Real-time multi-currency ledger posting', 'Zero manual entry'],
    },
    {
      name: 'Sage Intacct',
      desc: 'Connect your cloud accounting workflow to VectisX wholesale FX liquidity. Push cross-border bills for bulk settlement and pull cleared details automatically.',
      status: 'Sage Verified Integration',
      features: ['Automated vendor payout matching', 'Foreign currency gain/loss journal entries', 'Scheduled AP dispatches'],
    },
    {
      name: 'Oracle NetSuite',
      desc: 'Automate high-volume supplier disbursements across overseas subsidiaries with NetSuite multi-entity consolidation.',
      status: 'Supported Partner Integration',
      features: ['Subsidiary intercompany settlement', 'Live mid-market currency revaluation', 'Custom batch export mappings'],
    },
    {
      name: 'SAP S/4HANA',
      desc: 'Enterprise treasury integration supporting high-throughput SWIFT ISO 20022 and proprietary VectisX API hooks.',
      status: 'Enterprise Certified',
      features: ['Global liquidity aggregation', 'Host-to-host encrypted SFTP & REST', 'Multi-tier segregation of duty rules'],
    },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">Seamless Connectivity</span>
          <h1>ERP &amp; Enterprise Accounting Integrations</h1>
          <p className="text-ink-500">
            Eliminate double data entry. Connect VectisX directly to your ERP and accounting software to automate foreign exchange payments and reconciliation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {erps.map((erp, idx) => (
            <ScrollReveal key={erp.name} delay={idx * 50}>
              <div className="card p-6 bg-surface space-y-4 h-full">
                <div className="flex items-center justify-between gap-2">
                  <span className="badge-neutral">{erp.status}</span>
                  <Cpu className="w-5 h-5 text-ink" aria-hidden="true" />
                </div>
                <h3>{erp.name}</h3>
                <p className="text-[15px] leading-[24px] text-ink-500">{erp.desc}</p>
                <div className="space-y-2 pt-3 border-t border-line">
                  {erp.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-[14px] text-ink-700">
                      <CheckCircle2 className="w-4 h-4 text-ink flex-shrink-0" aria-hidden="true" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="card-invert p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-ink-invert">Need a custom enterprise integration?</h2>
            <p className="text-ink-invert-muted">
              Our REST API and webhooks let you integrate proprietary accounting software in days.
            </p>
          </div>
          <Link href="/api-platform" className="btn-invert whitespace-nowrap">
            <span>View API Documentation</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
