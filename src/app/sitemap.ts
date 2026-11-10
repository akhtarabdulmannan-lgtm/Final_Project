import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vectisx.com';

  const corePages = [
    '',
    '/converter',
    '/rates',
    '/charts',
    '/alerts',
    '/send',
    '/send/track',
    '/send/fees',
    '/tools',
    '/historical',
    '/tables',
    '/tools/iban',
    '/tools/email-updates',
    '/apps',
    '/business',
    '/business/payments',
    '/business/batch',
    '/business/scheduled',
    '/business/fx-risk',
    '/business/team',
    '/business/integrations',
    '/api-platform',
    '/api-platform/pricing',
    '/api-platform/docs',
    '/api-platform/partners',
    '/about',
    '/help',
    '/security',
    '/licenses',
    '/press',
    '/careers',
    '/partners',
    '/referral',
    '/blog',
    '/contact',
    '/login',
    '/register',
    '/privacy',
    '/terms',
    '/cookies',
    '/sitemap-page',
  ];

  const popularPairs = [
    'usd-to-eur',
    'usd-to-gbp',
    'usd-to-cad',
    'usd-to-aud',
    'usd-to-jpy',
    'eur-to-usd',
    'gbp-to-usd',
    'eur-to-gbp',
    'usd-to-inr',
    'usd-to-mxn',
    'usd-to-chf',
    'aud-to-usd',
    'cad-to-usd',
  ];

  const coreEntries = corePages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2026-11-09'),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const pairEntries = popularPairs.map((pair) => ({
    url: `${baseUrl}/converter/${pair}`,
    lastModified: new Date('2026-11-09'),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [...coreEntries, ...pairEntries];
}
