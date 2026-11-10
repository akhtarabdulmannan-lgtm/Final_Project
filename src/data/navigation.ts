import { NavItem } from '@/types';

export const personalNav: NavItem[] = [
  {
    label: 'Convert',
    href: '/converter',
    children: [
      { label: 'Currency Converter', href: '/converter', description: 'Real-time mid-market rates' },
      { label: 'Live Rate Tables', href: '/rates', description: '100+ currencies at a glance' },
      { label: 'Historical Rates', href: '/historical', description: 'Rates back to 1998' },
      { label: 'Currency Tables', href: '/tables', description: 'Cross-rate matrix' },
    ],
  },
  {
    label: 'Charts',
    href: '/charts',
  },
  {
    label: 'Alerts',
    href: '/alerts',
  },
  {
    label: 'Tools',
    href: '/tools',
    children: [
      { label: 'All Financial Tools', href: '/tools', description: 'Calculators, tables, and utilities' },
      { label: 'Rate Email Updates', href: '/tools/email-updates', description: 'Daily market analysis' },
    ],
  },
];


export const footerLinks = {
  product: [
    { label: 'Currency Converter', href: '/converter' },
    { label: 'Live Rates', href: '/rates' },
    { label: 'Charts', href: '/charts' },
    { label: 'Rate Alerts', href: '/alerts' },
    { label: 'Historical Rates', href: '/historical' },
  ],
  company: [
    { label: 'About VectisX', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Security', href: '/security' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Help Center', href: '/help' },
  ],
  legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Licenses', href: '/licenses' },
  ],
  popularPairs: [
    { label: 'USD to EUR', href: '/converter/usd-to-eur' },
    { label: 'USD to GBP', href: '/converter/usd-to-gbp' },
    { label: 'EUR to USD', href: '/converter/eur-to-usd' },
    { label: 'GBP to USD', href: '/converter/gbp-to-usd' },
    { label: 'USD to JPY', href: '/converter/usd-to-jpy' },
    { label: 'USD to CAD', href: '/converter/usd-to-cad' },
    { label: 'USD to AUD', href: '/converter/usd-to-aud' },
    { label: 'EUR to GBP', href: '/converter/eur-to-gbp' },
    { label: 'USD to INR', href: '/converter/usd-to-inr' },
    { label: 'USD to MXN', href: '/converter/usd-to-mxn' },
  ],
};
