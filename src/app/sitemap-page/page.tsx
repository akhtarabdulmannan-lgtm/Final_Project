'use client';

import Link from 'next/link';
import { footerLinks } from '@/data/navigation';

export default function SitemapPage() {
  const azMap = [
    { letter: 'A', items: [{ label: 'Rate Alerts', href: '/alerts' }, { label: 'Multi-Currency Account', href: '/register' }, { label: 'API Platform', href: '/api-platform' }] },
    { letter: 'B', items: [{ label: 'Business Account', href: '/business' }, { label: 'Batch Payments', href: '/business/batch' }, { label: 'Blog', href: '/blog' }] },
    { letter: 'C', items: [{ label: 'Currency Converter', href: '/converter' }, { label: 'Live Charts', href: '/charts' }, { label: 'Currency Tables', href: '/tables' }, { label: 'Contact Us', href: '/contact' }] },
    { letter: 'D', items: [{ label: 'Dealing Desk', href: '/contact' }, { label: 'Developer API Docs', href: '/api-platform/docs' }] },
    { letter: 'E', items: [{ label: 'Email Market Updates', href: '/tools/email-updates' }, { label: 'ERP Integrations', href: '/business/integrations' }] },
    { letter: 'F', items: [{ label: 'Forward Contracts', href: '/business/fx-risk' }, { label: 'FX Risk Management', href: '/business/fx-risk' }] },
    { letter: 'G', items: [{ label: 'Global Payments', href: '/business/payments' }, { label: 'GitHub SDKs', href: '/api-platform' }] },
    { letter: 'H', items: [{ label: 'Historical Rates', href: '/historical' }, { label: 'Help Center', href: '/help' }] },
    { letter: 'I', items: [{ label: 'Integrations', href: '/business/integrations' }, { label: 'Institutional FX API', href: '/api-platform' }] },
    { letter: 'L', items: [{ label: 'Limit Orders', href: '/business/fx-risk' }, { label: 'Live Rate Tables', href: '/rates' }, { label: 'Licenses & Regulations', href: '/licenses' }] },
    { letter: 'M', items: [{ label: 'Multi-Currency Vault', href: '/register' }, { label: 'Mid-Market Rates Explained', href: '/about' }] },
    { letter: 'P', items: [{ label: 'Partner Program', href: '/api-platform/partners' }, { label: 'API Pricing', href: '/api-platform/pricing' }, { label: 'Privacy Policy', href: '/privacy' }] },
    { letter: 'R', items: [{ label: 'Rate Alerts', href: '/alerts' }, { label: 'Rate Blender Technology', href: '/api-platform' }, { label: 'Referral Program', href: '/referral' }] },
    { letter: 'S', items: [{ label: 'Scheduled Payments', href: '/business/scheduled' }, { label: 'Security & SOC 2', href: '/security' }] },
    { letter: 'T', items: [{ label: 'Terms of Service', href: '/terms' }, { label: 'Team Roles & Permissions', href: '/business/team' }] },
  ];

  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Directory</span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-surface-900 mt-2">
            VectisX Sitemap & A–Z Honest Directory
          </h1>
          <p className="text-surface-600 text-base mt-3 leading-relaxed">
            Every feature, page, utility tool, and corporate documentation route available across VectisX.
          </p>
        </div>

        {/* A-Z Map */}
        <div className="card p-8 bg-white mb-12 shadow-sm">
          <h2 className="text-2xl font-bold font-heading text-surface-900 mb-8">A–Z Topic Index</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {azMap.map(entry => (
              <div key={entry.letter} className="p-4 rounded-2xl bg-surface-50 border border-surface-100 space-y-2">
                <span className="text-xl font-extrabold text-brand-600 font-mono block">{entry.letter}</span>
                <ul className="space-y-1.5 text-xs text-surface-700">
                  {entry.items.map(item => (
                    <li key={item.label}>
                      <Link href={item.href} className="hover:text-brand-500 hover:underline">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Structured Sitemap Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-surface-900 text-sm mb-3">Consumer Tools</h3>
            <ul className="space-y-2 text-xs text-surface-600">
              {footerLinks.product.map(l => (
                <li key={l.href}><Link href={l.href} className="hover:text-brand-500">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-surface-900 text-sm mb-3">Business Platform</h3>
            <ul className="space-y-2 text-xs text-surface-600">
              {footerLinks.business.map(l => (
                <li key={l.href}><Link href={l.href} className="hover:text-brand-500">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-surface-900 text-sm mb-3">Developer & API</h3>
            <ul className="space-y-2 text-xs text-surface-600">
              {footerLinks.developers.map(l => (
                <li key={l.href}><Link href={l.href} className="hover:text-brand-500">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-surface-900 text-sm mb-3">Corporate & Legal</h3>
            <ul className="space-y-2 text-xs text-surface-600">
              {footerLinks.company.concat(footerLinks.legal).map(l => (
                <li key={l.href}><Link href={l.href} className="hover:text-brand-500">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
