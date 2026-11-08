export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  region: string;
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  change24h: number;
  high24h: number;
  low24h: number;
  timestamp: string;
}

export interface ConversionResult {
  from: Currency;
  to: Currency;
  amount: number;
  result: number;
  rate: number;
  inverseRate: number;
  timestamp: string;
}

export interface HistoricalRate {
  date: string;
  rate: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface RateAlert {
  id: string;
  from: string;
  to: string;
  targetRate: number;
  direction: 'above' | 'below';
  email: string;
  active: boolean;
  createdAt: string;
}

export interface TransferQuote {
  from: string;
  to: string;
  sendAmount: number;
  receiveAmount: number;
  rate: number;
  fee: number;
  totalCost: number;
  deliveryTime: string;
  savings: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  requests: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  description?: string;
  icon?: string;
  badge?: string;
}

export type TimeRange = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | '2Y' | '5Y' | '10Y';
export type UserMode = 'personal' | 'business';
