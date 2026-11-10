import { NavItem } from '@/types';

export const personalNav: NavItem[] = [
  {
    label: 'Send',
    href: '/send',
    children: [
      { label: 'Send Money', href: '/send', description: 'Transfer money to 190+ countries' },
      { label: 'Track Transfer', href: '/send/track', description: 'Check your transfer status' },
      { label: 'Fees & Pricing', href: '/send/fees', description: 'Transparent fee calculator' },
    ],
  },
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
      { label: 'IBAN Calculator', href: '/tools/iban', description: 'Validate any IBAN instantly' },
      { label: 'Rate Email Updates', href: '/tools/email-updates', description: 'Daily market analysis' },
      { label: 'Mobile Apps', href: '/apps', description: 'iOS & Android apps' },
    ],
  },
];

export const businessNav: NavItem[] = [
  {
    label: 'Payments',
    href: '/business/payments',
    children: [
      { label: 'Global Payments', href: '/business/payments', description: 'Send to 190+ countries' },
      { label: 'Batch Payments', href: '/business/batch', description: 'Pay multiple recipients' },
      { label: 'Scheduled Payments', href: '/business/scheduled', description: 'Automate recurring payments' },
    ],
  },
  {
    label: 'FX Risk',
    href: '/business/fx-risk',
    children: [
      { label: 'Forward Contracts', href: '/business/fx-risk', description: 'Lock in rates for the future' },
      { label: 'Limit Orders', href: '/business/fx-risk#limit-orders', description: 'Set target rates' },
      { label: 'FX Options', href: '/business/fx-risk#options', description: 'Flexible hedging' },
    ],
  },
  {
    label: 'Team',
    href: '/business/team',
  },
  {
    label: 'Integrations',
    href: '/business/integrations',
  },
  {
    label: 'API',
    href: '/api-platform',
    children: [
      { label: 'API Overview', href: '/api-platform', description: 'Currency data API' },
      { label: 'Pricing', href: '/api-platform/pricing', description: 'Plans from $599/yr' },
      { label: 'Documentation', href: '/api-platform/docs', description: 'Full API reference' },
      { label: 'Partner Program', href: '/api-platform/partners', description: 'ISV & referral programs' },
    ],
  },
];

export const footerLinks = {
  product: [
    { label: 'Currency Converter', href: '/converter' },
    { label: 'Send Money', href: '/send' },
    { label: 'Live Rates', href: '/rates' },
    { label: 'Charts', href: '/charts' },
    { label: 'Rate Alerts', href: '/alerts' },
    { label: 'Historical Rates', href: '/historical' },
    { label: 'IBAN Calculator', href: '/tools/iban' },
    { label: 'Mobile Apps', href: '/apps' },
  ],
  business: [
    { label: 'Business Account', href: '/business' },
    { label: 'Global Payments', href: '/business/payments' },
    { label: 'Batch Payments', href: '/business/batch' },
    { label: 'FX Risk Management', href: '/business/fx-risk' },
    { label: 'Integrations', href: '/business/integrations' },
    { label: 'Team Roles', href: '/business/team' },
  ],
  developers: [
    { label: 'API Overview', href: '/api-platform' },
    { label: 'API Pricing', href: '/api-platform/pricing' },
    { label: 'Documentation', href: '/api-platform/docs' },
    { label: 'Partner Program', href: '/api-platform/partners' },
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
