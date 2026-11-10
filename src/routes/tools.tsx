import Link from '@/router/Link';
import { ShieldCheck, Mail, Table, Calendar, Smartphone, ArrowLeftRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function ToolsHubPage() {
  const tools = [
    {
      title: 'Currency Converter',
      desc: 'Convert between global currencies, precious metals, and selected digital assets at live mid-market rates.',
      href: '/converter',
      Icon: ArrowLeftRight,
    },
    {
      title: 'IBAN Calculator & Validator',
      desc: 'Verify International Bank Account Numbers, extract routing codes, and confirm ISO checksum formats.',
      href: '/tools/iban',
      Icon: ShieldCheck,
    },
    {
      title: 'Daily Market Email Updates',
      desc: 'Subscribe to daily or weekly macroeconomic briefings and central bank currency digests.',
      href: '/tools/email-updates',
      Icon: Mail,
    },
    {
      title: 'Cross-Rate Currency Matrix',
      desc: 'Compare live multi-lateral conversion rates across the ten most liquid world currencies.',
      href: '/tables',
      Icon: Table,
    },
    {
      title: 'Historical Exchange Archives',
      desc: 'Inspect daily closing prices, CSV exports, and volatility series dating back to 1998.',
      href: '/historical',
      Icon: Calendar,
    },
    {
      title: 'VectisX Mobile Apps',
      desc: 'Track live exchange rates, set instant alerts, and authorize transfers from iOS and Android.',
      href: '/apps',
      Icon: Smartphone,
    },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">Financial Utilities</span>
          <h1>Currency Tools &amp; Calculators</h1>
          <p className="text-ink-500">
            Free institutional utilities for validating banking details, tracking historical FX series, and planning cross-border transfers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(({ title, desc, href, Icon }, index) => (
            <ScrollReveal key={href} delay={index * 50}>
              <Link
                href={href}
                aria-label={`Open ${title}`}
                className="card-interactive p-6 h-full flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-surface-subtle border border-line flex items-center justify-center">
                    <Icon className="w-5 h-5 text-ink" aria-hidden="true" />
                  </div>
                  <h3>{title}</h3>
                  <p className="text-[15px] leading-[24px] text-ink-500">{desc}</p>
                </div>
                <span className="text-[14px] font-medium text-ink">Open tool &rarr;</span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
