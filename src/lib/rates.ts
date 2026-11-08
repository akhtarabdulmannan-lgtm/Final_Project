// Deterministic mock rate engine — produces consistent rates from currency pairs
// Uses a seeded hash to generate realistic exchange rates

const BASE_RATES: Record<string, number> = {
  USD: 1.0, EUR: 0.8955, GBP: 0.7474, JPY: 158.32, AUD: 1.4541, CAD: 1.4094,
  CHF: 0.8197, CNY: 6.6908, INR: 94.1145, MXN: 18.6524, BRL: 5.5027,
  KRW: 1355.38, SGD: 1.2815, HKD: 7.8396, NOK: 9.4495, SEK: 9.8892,
  DKK: 6.7020, NZD: 1.8050, ZAR: 16.5155, TRY: 50.1720, RUB: 81.7445,
  PLN: 3.9368, THB: 33.5486, IDR: 18097.90, MYR: 4.0559, PHP: 63.0646,
  CZK: 21.7880, ILS: 3.1928, CLP: 974.38, AED: 3.6725, SAR: 3.7500,
  TWD: 32.8470, ARS: 1545.40, COP: 3239.85, EGP: 53.9023, NGN: 1347.74,
  PKR: 276.72, BDT: 124.57, VND: 25602.59, HUF: 325.61, RON: 4.7809,
  BGN: 1.7520, HRK: 6.7493, ISK: 122.56, UAH: 45.3828, PEN: 3.4380,
  KES: 129.92, GHS: 11.7030, MAD: 9.7526, QAR: 3.6400, KWD: 0.3105,
  BHD: 0.3760, OMR: 0.3845, JOD: 0.7090, LKR: 332.42, NPR: 150.58,
  MMK: 2099.76, KHR: 4093.99, LAK: 22331.85, FJD: 2.2406,
  XAU: 0.000246, XAG: 0.0192, BTC: 0.0000132, ETH: 0.000449,
};

export function getRate(from: string, to: string): number {
  const fromRate = BASE_RATES[from] || 1;
  const toRate = BASE_RATES[to] || 1;
  return toRate / fromRate;
}

export function convert(amount: number, from: string, to: string): number {
  return amount * getRate(from, to);
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function get24hChange(from: string, to: string): number {
  const seed = (from + to).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return (seededRandom(seed) - 0.5) * 4; // -2% to +2%
}

export function get24hHigh(from: string, to: string): number {
  const rate = getRate(from, to);
  const seed = (from + to + 'high').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return rate * (1 + seededRandom(seed) * 0.015);
}

export function get24hLow(from: string, to: string): number {
  const rate = getRate(from, to);
  const seed = (from + to + 'low').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return rate * (1 - seededRandom(seed) * 0.015);
}

export function getHistoricalRates(from: string, to: string, days: number): { date: string; rate: number }[] {
  const baseRate = getRate(from, to);
  const data: { date: string; rate: number }[] = [];
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const seed = (from + to + date.toISOString().slice(0, 10)).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const variation = (seededRandom(seed) - 0.5) * 0.1;
    data.push({
      date: date.toISOString().slice(0, 10),
      rate: baseRate * (1 + variation),
    });
  }
  return data;
}

export function getTransferFee(amount: number): number {
  if (amount >= 5000) return 0;
  if (amount >= 1000) return 3.99;
  return 5.99;
}

export function getDeliveryTime(to: string): string {
  const fast = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (fast.includes(to)) return '1-2 business days';
  return '2-4 business days';
}

export function formatRate(rate: number): string {
  if (rate >= 1000) return rate.toFixed(2);
  if (rate >= 100) return rate.toFixed(4);
  if (rate >= 1) return rate.toFixed(4);
  if (rate >= 0.01) return rate.toFixed(6);
  return rate.toFixed(8);
}

export function formatAmount(amount: number, code?: string): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
