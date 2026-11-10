import Link from '@/router/Link';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function SitemapVisualPage() {
  const sections = [
    {
      title: 'Personal & FX Tools',
      links: [
        { label: 'Homepage', href: '/' },
        { label: 'Currency Converter', href: '/converter' },
        { label: 'Live Exchange Rates', href: '/rates' },
        { label: 'Currency Charts', href: '/charts' },
        { label: 'Rate Alerts', href: '/alerts' },
        { label: 'FX Tools Suite', href: '/tools' },
        { label: 'Historical Rates Lookup', href: '/historical' },
        { label: 'Currency Tables', href: '/tables' },
        { label: 'IBAN Validator', href: '/tools/iban' },
        { label: 'Daily Email Updates', href: '/tools/email-updates' },
      ],
    },
    {
      title: 'Business & Treasury',
      links: [
        { label: 'Business Overview', href: '/business' },
        { label: 'FX Risk Management', href: '/business/fx-risk' },
        { label: 'Multi-User Roles', href: '/business/team' },
        { label: 'ERP Integrations', href: '/business/integrations' },
      ],
    },
    {
      title: 'Company & Legal',
      links: [
        { label: 'About VectisX', href: '/about' },
        { label: 'Help Center', href: '/help' },
        { label: 'Security & Trust', href: '/security' },
        { label: 'Regulatory Licenses', href: '/licenses' },
        { label: 'Pressroom', href: '/press' },
        { label: 'Careers', href: '/careers' },
        { label: 'Partnerships', href: '/partners' },
        { label: 'Referral Program', href: '/referral' },
        { label: 'Currency Blog', href: '/blog' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">Platform Directory</span>
          <h1>VectisX Complete Sitemap</h1>
          <p className="text-ink-500">
            Browse every personal currency tool, corporate treasury product, API developer document, and legal resource across VectisX.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((s, idx) => (
            <ScrollReveal key={s.title} delay={idx * 50}>
              <div className="card p-6 bg-surface h-full space-y-3">
                <h3 className="text-[18px] leading-[24px] pb-2 border-b border-line">{s.title}</h3>
                <ul className="space-y-1">
                  {s.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="inline-flex items-center min-h-[36px] text-[14px] text-ink-500 hover:text-ink font-medium transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
