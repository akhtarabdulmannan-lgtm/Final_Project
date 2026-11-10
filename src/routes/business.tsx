import Link from '@/router/Link';
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
import ScrollReveal from '@/components/ui/ScrollReveal';
import CountUpValue from '@/components/ui/CountUpValue';

export default function BusinessHomePage() {
  const features = [
    {
      Icon: Globe2,
      title: 'Multi-Currency Accounts',
      desc: 'Hold balances in 30+ currencies and move between them at mid-market rates with institutional spreads.',
      href: '/business/integrations',
      cta: 'See how it connects ›',
    },
    {
      Icon: TrendingUp,
      title: 'FX Risk Management',
      desc: 'Protect operating margins with forward contracts, limit orders, and hedging strategies locked up to 24 months.',
      href: '/business/fx-risk',
      cta: 'Explore risk tools ›',
    },
    {
      Icon: Layers,
      title: 'Bulk Currency Conversion',
      desc: 'Price an entire list of exposures in one pass and export the converted figures as CSV for your ledger.',
      href: '/charts',
      cta: 'Open charts ›',
    },
    {
      Icon: Calendar,
      title: 'Rate Alerts for Teams',
      desc: 'Watch the pairs your business is exposed to and get notified the moment a target level is reached.',
      href: '/alerts',
      cta: 'Create an alert ›',
    },
    {
      Icon: Users,
      title: 'Team Roles & Permissions',
      desc: 'Segregate duties with Creator, Verifier, and Approver authorization tiers, multi-signature rules, and audit logs.',
      href: '/business/team',
      cta: 'View team permissions ›',
    },
    {
      Icon: Cpu,
      title: 'ERP & Accounting Sync',
      desc: 'Direct integration connectors for Microsoft Dynamics 365, Sage Intacct, and custom enterprise REST API webhooks.',
      href: '/business/integrations',
      cta: 'Explore integrations ›',
    },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="bg-surface border-b border-line py-14 sm:py-20">
        <div className="container-vx">
          <div className="max-w-3xl space-y-6">
            <span className="badge-neutral">Enterprise Cross-Border Solutions</span>
            <h1>Institutional FX &amp; Global Payments for Modern Business</h1>
            <p className="text-ink-500">
              Empower your treasury with multi-currency accounts, automated bulk payments, and FX hedging. Trusted by 17,000+ corporations moving over $17B+ annually.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/register" className="btn-primary btn-lg">
                <span>Open Free Business Account</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-secondary btn-lg">
                Talk to an FX Specialist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 bg-surface-invert text-ink-invert border-b border-line-invert">
        <div className="container-vx">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-[28px] sm:text-[32px] font-heading font-semibold text-ink-invert">
                <CountUpValue value={17000} suffix="+" duration={400} />
              </div>
              <div className="text-caption text-ink-invert-muted mt-1">Corporate Clients</div>
            </div>
            <div>
              <div className="text-[28px] sm:text-[32px] font-heading font-semibold text-ink-invert">
                <CountUpValue value={17} prefix="$" suffix="B+" duration={400} />
              </div>
              <div className="text-caption text-ink-invert-muted mt-1">Annual FX Flow</div>
            </div>
            <div>
              <div className="text-[28px] sm:text-[32px] font-heading font-semibold text-ink-invert">
                <CountUpValue value={190} suffix="+" duration={400} />
              </div>
              <div className="text-caption text-ink-invert-muted mt-1">Payment Destinations</div>
            </div>
            <div>
              <div className="text-[28px] sm:text-[32px] font-heading font-semibold text-ink-invert tabular-nums">
                $0
              </div>
              <div className="text-caption text-ink-invert-muted mt-1">Setup or Monthly Fees</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="section-padding bg-bg border-b border-line">
        <div className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <h2>The Complete Commercial FX Toolkit</h2>
            <p className="text-ink-500 mx-auto">
              Engineered to eliminate foreign exchange friction from international finance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(({ Icon, title, desc, href, cta }, index) => (
              <ScrollReveal key={href} delay={index * 50}>
                <Link
                  href={href}
                  aria-label={`${title}: ${cta}`}
                  className="card-interactive p-6 space-y-3 h-full flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-surface-subtle border border-line flex items-center justify-center">
                      <Icon className="w-5 h-5 text-ink" aria-hidden="true" />
                    </div>
                    <h3>{title}</h3>
                    <p className="text-[15px] leading-[24px] text-ink-500">{desc}</p>
                  </div>
                  <span className="text-[14px] font-medium text-ink pt-2">{cta}</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dealer Desk Callout */}
      <section className="section-padding bg-surface">
        <div className="container-vx">
          <div className="bg-surface-invert text-ink-invert border border-line-invert rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="badge-invert">Dedicated FX Dealing Desk</span>
              <h2 className="text-ink-invert">Transferring more than $100,000 per month?</h2>
              <p className="text-ink-invert-muted">
                Connect with our dealing desk for tailored corporate spreads, bespoke hedging execution, and dedicated treasury consultation.
              </p>
            </div>
            <Link href="/contact" className="btn-invert btn-lg whitespace-nowrap">
              <PhoneCall className="w-4 h-4" aria-hidden="true" />
              <span>Contact Dealer Desk</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
