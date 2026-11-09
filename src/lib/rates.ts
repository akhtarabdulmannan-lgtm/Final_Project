// Deterministic rate engine with optional live micro-tick support for client updates

const BASE_RATES: Record<string, number> = {
  USD: 1.0, EUR: 0.8534, GBP: 0.7312, JPY: 149.52, AUD: 1.5243, CAD: 1.3621,
  CHF: 0.8765, CNY: 7.2341, INR: 83.4521, MXN: 17.2345, BRL: 4.9876,
  KRW: 1328.45, SGD: 1.3412, HKD: 7.8123, NOK: 10.6234, SEK: 10.4512,
  DKK: 6.8734, NZD: 1.6234, ZAR: 18.6543, TRY: 28.7654, RUB: 91.2345,
  PLN: 4.0123, THB: 35.4321, IDR: 15623.45, MYR: 4.6789, PHP: 56.1234,
  CZK: 22.3456, ILS: 3.6789, CLP: 876.54, AED: 3.6725, SAR: 3.7500,
  TWD: 31.4567, ARS: 365.78, COP: 3945.67, EGP: 30.8765, NGN: 776.54,
  PKR: 282.34, BDT: 109.87, VND: 24356.78, HUF: 354.56, RON: 4.5678,
  BGN: 1.7890, HRK: 6.9876, ISK: 137.89, UAH: 37.6543, PEN: 3.7234,
  KES: 153.45, GHS: 12.3456, MAD: 9.8765, QAR: 3.6400, KWD: 0.3078,
  BHD: 0.3770, OMR: 0.3845, JOD: 0.7090, LKR: 323.45, NPR: 133.56,
  MMK: 2098.76, KHR: 4098.76, LAK: 20567.89, FJD: 2.2345,
  XAU: 0.000488, XAG: 0.0412, BTC: 0.0000234, ETH: 0.000412,
};

export function getRate(from: string, to: string): number {
  if (from === to) return 1.0;
  const fromRate = BASE_RATES[from] || 1;
  const toRate = BASE_RATES[to] || 1;
  return toRate / fromRate;
}

export function getTickedRate(from: string, to: string, tick: number): number {
  const base = getRate(from, to);
  if (tick <= 0 || from === to) return base;
  const seed = (from + to).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) + tick * 37;
  const deltaRatio = (seededRandom(seed) - 0.5) * 0.003; // ±0.15% micro tick
  return base * (1 + deltaRatio);
}

export function convert(amount: number, from: string, to: string): number {
  return amount * getRate(from, to);
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function get24hChange(from: string, to: string): number {
  if (from === to) return 0;
  const seed = (from + to).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return (seededRandom(seed) - 0.5) * 4;
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
  // Fixed UTC anchor avoids SSR/client date drift across midnight boundaries
  const anchor = new Date('2026-11-09T12:00:00Z');

  for (let i = days; i >= 0; i--) {
    const date = new Date(anchor);
    date.setUTCDate(date.getUTCDate() - i);
    const iso = date.toISOString().slice(0, 10);
    const seed = (from + to + iso).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const variation = (seededRandom(seed) - 0.5) * 0.1;
    data.push({
      date: iso,
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

export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatUtcTime(date: Date): string {
  return date.toISOString().slice(11, 19);
}
