import { NavItem } from '@/types';

export const personalNav: NavItem[] = [
  {
    label: 'Convert',
    href: '/converter',
    children: [
      { label: 'Currency Converter', href: '/converter', description: 'Real-time mid-market rates' },
      { label: 'Live Rate Tables', href: '/rates', description: '64 currencies at a glance' },
      { label: 'Historical Rates', href: '/historical', description: 'Rates back to 1998' },
      { label: 'Currency Tables', href: '/tables', description: 'Cross-rate matrix' },
    ],
  },
  {
    label: 'Charts',
    href: '/charts',
  },
  {
    label: 'Tools',
    href: '/tools',
    children: [
      { label: 'All Financial Tools', href: '/tools', description: 'Calculators, tables, and utilities' },
      { label: 'Currency Tables', href: '/tables', description: 'Cross-rate matrix' },
    ],
  },
];


export const footerLinks = {
  product: [
    { label: 'Currency Converter', href: '/converter' },
    { label: 'Live Rates', href: '/rates' },
    { label: 'Charts', href: '/charts' },
    { label: 'Historical Rates', href: '/historical' },
  ],
  company: [
    { label: 'About the Project', href: '/about' },
    { label: 'How It Was Built', href: '/careers' },
    { label: 'Project Notes', href: '/press' },
    { label: 'Security & Data', href: '/security' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Help Center', href: '/help' },
  ],
  legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Licensing Status', href: '/licenses' },
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
