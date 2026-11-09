'use client';

import Link from 'next/link';
import { footerLinks } from '@/data/navigation';
import { RevealSection } from '@/components/ui/MotionPrimitives';

export default function SitemapPage() {
  const azMap = [
    {
      letter: 'A',
      items: [
        { label: 'Rate Alerts', href: '/alerts' },
        { label: 'Multi-Currency Account', href: '/register' },
        { label: 'API Platform', href: '/api-platform' },
      ],
    },
    {
      letter: 'B',
      items: [
        { label: 'Business Account', href: '/business' },
        { label: 'Batch Payments', href: '/business/batch' },
        { label: 'Blog', href: '/blog' },
      ],
    },
    {
      letter: 'C',
      items: [
        { label: 'Currency Converter', href: '/converter' },
        { label: 'Live Charts', href: '/charts' },
        { label: 'Currency Tables', href: '/tables' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
    {
      letter: 'D',
      items: [
        { label: 'Dealing Desk', href: '/contact' },
        { label: 'Developer API Docs', href: '/api-platform/docs' },
      ],
    },
    {
      letter: 'E',
      items: [
        { label: 'Email Market Updates', href: '/tools/email-updates' },
        { label: 'ERP Integrations', href: '/business/integrations' },
      ],
    },
    {
      letter: 'F',
      items: [
        { label: 'Forward Contracts', href: '/business/fx-risk' },
        { label: 'FX Risk Management', href: '/business/fx-risk' },
      ],
    },
    {
      letter: 'G',
      items: [
        { label: 'Global Payments', href: '/business/payments' },
        { label: 'GitHub SDKs', href: '/api-platform' },
      ],
    },
    {
      letter: 'H',
      items: [
        { label: 'Historical Rates', href: '/historical' },
        { label: 'Help Center', href: '/help' },
      ],
    },
    {
      letter: 'I',
      items: [
        { label: 'Integrations', href: '/business/integrations' },
        { label: 'Institutional FX API', href: '/api-platform' },
      ],
    },
    {
      letter: 'L',
      items: [
        { label: 'Limit Orders', href: '/business/fx-risk' },
        { label: 'Live Rate Tables', href: '/rates' },
        { label: 'Licenses & Regulations', href: '/licenses' },
      ],
    },
    {
      letter: 'M',
      items: [
        { label: 'Multi-Currency Vault', href: '/register' },
        { label: 'Mid-Market Rates Explained', href: '/about' },
      ],
    },
    {
      letter: 'P',
      items: [
        { label: 'Partner Program', href: '/api-platform/partners' },
        { label: 'API Pricing', href: '/api-platform/pricing' },
        { label: 'Privacy Policy', href: '/privacy' },
      ],
    },
    {
      letter: 'R',
      items: [
        { label: 'Rate Alerts', href: '/alerts' },
        { label: 'Rate Blender Technology', href: '/api-platform' },
        { label: 'Referral Program', href: '/referral' },
      ],
    },
    {
      letter: 'S',
      items: [
        { label: 'Scheduled Payments', href: '/business/scheduled' },
        { label: 'Security & SOC 2', href: '/security' },
      ],
    },
    {
      letter: 'T',
      items: [
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Team Roles & Permissions', href: '/business/team' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Directory</span>
          <h1 className="type-h1 text-navy mt-2">
            VectisX Sitemap &amp; A–Z Directory
          </h1>
          <p className="type-body text-body mt-3">
            Every feature, page, utility tool, and corporate documentation route available across VectisX.
          </p>
        </div>

        {/* A-Z Map */}
        <RevealSection className="card p-8 bg-white mb-12">
          <h2 className="type-h2 text-navy mb-8">A–Z Topic Index</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {azMap.map((entry) => (
              <div
                key={entry.letter}
                className="p-4 rounded-2xl bg-page border border-surface-200 space-y-2"
              >
                <span className="text-xl font-heading font-semibold text-navy block">
                  {entry.letter}
                </span>
                <ul className="space-y-0.5 type-caption text-body">
                  {entry.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="inline-flex items-center min-h-[44px] text-primary hover:text-primary-hover hover:underline font-medium"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* Structured Sitemap Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h2 className="font-heading font-semibold text-navy text-base mb-2">
              FX Tools
            </h2>
            <ul className="space-y-0.5 type-caption text-body">
              {footerLinks.product.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center min-h-[44px] hover:text-primary transition-colors duration-150 ease-fintech"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading font-semibold text-navy text-base mb-2">
              Business Platform
            </h2>
            <ul className="space-y-0.5 type-caption text-body">
              {footerLinks.business.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center min-h-[44px] hover:text-primary transition-colors duration-150 ease-fintech"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading font-semibold text-navy text-base mb-2">
              Developer &amp; API
            </h2>
            <ul className="space-y-0.5 type-caption text-body">
              {footerLinks.developers.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center min-h-[44px] hover:text-primary transition-colors duration-150 ease-fintech"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading font-semibold text-navy text-base mb-2">
              Corporate &amp; Legal
            </h2>
            <ul className="space-y-0.5 type-caption text-body">
              {footerLinks.company.concat(footerLinks.legal).map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center min-h-[44px] hover:text-primary transition-colors duration-150 ease-fintech"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
