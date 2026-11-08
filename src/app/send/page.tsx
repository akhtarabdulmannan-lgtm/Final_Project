'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2, ShieldCheck, Zap, Globe2, ArrowRight, Clock, DollarSign, Lock } from 'lucide-react';
import CurrencyConverter from '@/components/sections/CurrencyConverter';
import Accordion from '@/components/ui/Accordion';
import { currencies } from '@/data/currencies';
import { getRate, formatRate, formatAmount } from '@/lib/rates';

const corridors = [
  { country: 'India', flag: '🇮🇳', currency: 'INR', speed: 'Within minutes', minFee: '$0' },
  { country: 'Mexico', flag: '🇲🇽', currency: 'MXN', speed: 'Same day', minFee: '$0' },
  { country: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', speed: 'Instant / Minutes', minFee: '$0' },
  { country: 'Eurozone', flag: '🇪🇺', currency: 'EUR', speed: 'SEPA Instant', minFee: '$0' },
  { country: 'Philippines', flag: '🇵🇭', currency: 'PHP', speed: 'Within minutes', minFee: '$0' },
  { country: 'Canada', flag: '🇨🇦', currency: 'CAD', speed: '1 business day', minFee: '$0' },
  { country: 'Australia', flag: '🇦🇺', currency: 'AUD', speed: 'Same day', minFee: '$0' },
  { country: 'Pakistan', flag: '🇵🇰', currency: 'PKR', speed: 'Within minutes', minFee: '$0' },
];

const sendFaqs = [
  {
    question: 'How fast will my international transfer arrive?',
    answer: 'Over 85% of transfers to major corridors (such as UK, Eurozone, India, and Mexico) arrive within minutes. Delivery to smaller corridors or specific banking institutions typically takes 1 to 2 business days.'
  },
  {
    question: 'Are there any hidden exchange rate markups?',
    answer: 'No. VectisX operates on guaranteed mid-market rates plus a transparent, low flat fee shown explicitly before you send. You will never encounter unexpected receiving bank deductions.'
  },
  {
    question: 'How does the $100 promo code VXNEW100 work?',
    answer: 'When you transfer $3,000 or more on your first transaction, simply enter code VXNEW100 during checkout. A $100 discount is automatically applied to reduce your total amount payable.'
  },
  {
    question: 'Is my money secure during transit?',
    answer: 'Yes. VectisX is registered with FinCEN as a Money Services Business, holds money transmitter licenses across US states, and uses AES-256 bank-level encryption with SOC 2 Type II compliance.'
  }
];

export default function SendMoneyPage() {
  const [sendAmount, setSendAmount] = useState(2500);
  const [recipientCurrency, setRecipientCurrency] = useState('EUR');

  const rate = getRate('USD', recipientCurrency);
  const recipientGets = sendAmount * rate;
  const transferFee = sendAmount >= 5000 ? 0 : sendAmount >= 1000 ? 3.99 : 5.99;

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800 text-white py-14 sm:py-20">
        <div className="container-vx">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="badge-teal">Fast & Transparent</span>
              <h1 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight">
                Send Money Worldwide with Bank-Beating Rates
              </h1>
              <p className="text-surface-300 text-base leading-relaxed">
                Transfer funds to 190+ countries in 145+ currencies. Enjoy instant delivery, zero hidden markups, and end-to-end payment tracking.
              </p>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between">
                <div>
                  <div className="text-xs text-teal-300 font-bold uppercase tracking-wider">Special First-Time Offer</div>
                  <div className="text-sm font-extrabold text-white mt-0.5">Save $100 with promo code: <span className="bg-teal-400 text-brand-950 px-2 py-0.5 rounded font-mono">VXNEW100</span></div>
                  <div className="text-[11px] text-surface-300">Valid on initial transfers of $3,000+</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-surface-300">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-teal-400" /> FinCEN Licensed</span>
                <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-teal-400" /> Instant Rail Delivery</span>
                <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-teal-400" /> 256-Bit SSL Protection</span>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <CurrencyConverter initialTab="send" defaultAmount={2500} defaultFrom="USD" defaultTo="EUR" />
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="section-padding bg-white border-b border-surface-200">
        <div className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-heading font-bold text-surface-900">
              The 3-Step Seamless Send Flow
            </h2>
            <p className="text-sm text-surface-500 mt-2">
              From calculation to bank account deposit in three transparent steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center p-6 border-brand-100">
              <div className="w-12 h-12 bg-brand-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-lg shadow-md">
                1
              </div>
              <h3 className="font-bold text-surface-900 text-lg mb-2">1. Enter Amount</h3>
              <p className="text-xs text-surface-600 leading-relaxed">
                Choose how much you want to send. View guaranteed live rates, low flat fees, and arrival times upfront.
              </p>
            </div>

            <div className="card text-center p-6 border-teal-100">
              <div className="w-12 h-12 bg-teal-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-lg shadow-md">
                2
              </div>
              <h3 className="font-bold text-surface-900 text-lg mb-2">2. Choose Recipient</h3>
              <p className="text-xs text-surface-600 leading-relaxed">
                Enter recipient details: bank account number, IBAN, mobile wallet, or cash pickup station.
              </p>
            </div>

            <div className="card text-center p-6 border-accent-100">
              <div className="w-12 h-12 bg-accent-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-lg shadow-md">
                3
              </div>
              <h3 className="font-bold text-surface-900 text-lg mb-2">3. Send & Track</h3>
              <p className="text-xs text-surface-600 leading-relaxed">
                Fund via debit card, bank wire, or multi-currency vault. Monitor progress with real-time tracking links.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Corridors Grid */}
      <section className="section-padding bg-surface-50 border-b border-surface-200">
        <div className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge-brand">Global Coverage</span>
            <h2 className="text-3xl font-heading font-bold text-surface-900 mt-2">
              Popular Money Transfer Corridors
            </h2>
            <p className="text-sm text-surface-500 mt-1">Connecting loved ones and businesses across 190+ countries.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {corridors.map((c) => {
              const liveRate = getRate('USD', c.currency);
              return (
                <div key={c.country} className="card p-5 bg-white space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{c.flag}</span>
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">{c.speed}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-surface-900 text-base">{c.country}</h4>
                    <div className="text-xs text-surface-400 mt-0.5">1 USD = {formatRate(liveRate)} {c.currency}</div>
                  </div>
                  <div className="pt-2 border-t border-surface-100 flex items-center justify-between text-xs">
                    <span className="text-surface-500">Fees from <strong>{c.minFee}</strong></span>
                    <Link href="/register" className="font-bold text-brand-500 hover:underline">
                      Send now &rsaquo;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fee Comparison Table vs Traditional Banks */}
      <section className="section-padding bg-white">
        <div className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-heading font-bold text-surface-900">
              Why Pay Up to 8x More with Traditional Banks?
            </h2>
            <p className="text-sm text-surface-500 mt-2">Comparison based on sending $2,500 USD to Europe (EUR).</p>
          </div>

          <div className="max-w-3xl mx-auto rounded-2xl border border-surface-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-50 text-xs font-bold text-surface-500 uppercase border-b border-surface-200">
                <tr>
                  <th className="py-4 px-6">Provider</th>
                  <th className="py-4 px-6">Exchange Rate</th>
                  <th className="py-4 px-6">Transfer Fee</th>
                  <th className="py-4 px-6 text-right">Recipient Gets</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                <tr className="bg-brand-50/50 font-bold text-brand-900">
                  <td className="py-4 px-6 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                    VectisX (Guaranteed)
                  </td>
                  <td className="py-4 px-6 font-mono text-emerald-600">{formatRate(rate)} (Mid-market)</td>
                  <td className="py-4 px-6 text-emerald-600">$3.99</td>
                  <td className="py-4 px-6 text-right font-mono text-base font-extrabold text-brand-600">
                    €{formatAmount(recipientGets)}
                  </td>
                </tr>
                <tr className="text-surface-600">
                  <td className="py-4 px-6">Major Retail Banks</td>
                  <td className="py-4 px-6 font-mono text-rose-500">{formatRate(rate * 0.95)} (3-5% markup)</td>
                  <td className="py-4 px-6 text-rose-500">$35.00</td>
                  <td className="py-4 px-6 text-right font-mono font-medium">
                    €{formatAmount(recipientGets * 0.935)}
                  </td>
                </tr>
                <tr className="text-surface-600">
                  <td className="py-4 px-6">Legacy Wire Agencies</td>
                  <td className="py-4 px-6 font-mono text-rose-500">{formatRate(rate * 0.97)} (2-3% markup)</td>
                  <td className="py-4 px-6 text-rose-500">$18.00</td>
                  <td className="py-4 px-6 text-right font-mono font-medium">
                    €{formatAmount(recipientGets * 0.96)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-surface-50 border-t border-surface-200">
        <div className="container-vx max-w-4xl">
          <div className="text-center mb-10">
            <span className="badge-brand">Transfer Questions</span>
            <h2 className="text-3xl font-heading font-bold text-surface-900 mt-2">
              Money Transfer FAQ
            </h2>
          </div>
          <Accordion items={sendFaqs} />
        </div>
      </section>
    </div>
  );
}
