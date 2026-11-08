import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vectisx.com';

  const routes = [
    '',
    '/converter',
    '/rates',
    '/charts',
    '/alerts',
    '/send',
    '/historical',
    '/tables',
    '/tools/iban',
    '/tools/email-updates',
    '/apps',
    '/business',
    '/business/payments',
    '/business/scheduled',
    '/business/batch',
    '/business/fx-risk',
    '/business/team',
    '/business/integrations',
    '/api-platform',
    '/api-platform/pricing',
    '/api-platform/docs',
    '/api-platform/partners',
    '/about',
    '/careers',
    '/press',
    '/security',
    '/help',
    '/contact',
    '/blog',
    '/terms',
    '/privacy',
    '/cookies',
    '/licenses',
    '/referral',
    '/partners',
    '/sitemap-page',
  ];

  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
