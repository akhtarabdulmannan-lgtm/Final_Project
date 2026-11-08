'use client';

import Link from 'next/link';
import { ArrowLeftRight, CheckCircle2, TrendingUp, HelpCircle, ArrowRight } from 'lucide-react';
import CurrencyConverter from '@/components/sections/CurrencyConverter';
import Accordion from '@/components/ui/Accordion';
import { popularPairs } from '@/data/currencies';
import { getRate, formatRate, get24hChange } from '@/lib/rates';

const faqs = [
  {
    question: 'What is a mid-market exchange rate?',
    answer: 'The mid-market exchange rate is the exact midpoint between the global "buy" and "sell" transaction rates on international financial markets. It is the real, un-marked-up rate you find on independent financial sources. VectisX displays true mid-market rates for maximum transparency.'
  },
  {
    question: 'How often are VectisX exchange rates updated?',
    answer: 'Our live converter rates are updated every 60 seconds during live market trading hours, pulling from over 100 liquidity providers and central bank feeds via our proprietary Rate Blender technology.'
  },
  {
    question: 'Can I send money at the exact rate displayed on the converter?',
    answer: 'Yes! When you initiate a money transfer through VectisX, you lock in a guaranteed exchange rate with no surprise markup fees. You will see the exact total to pay and recipient payout before confirming.'
  },
  {
    question: 'Why do bank rates differ from the VectisX rate?',
    answer: 'Traditional retail banks typically add a hidden markup of 3% to 6% onto the real mid-market exchange rate, in addition to outbound international wire fees. VectisX gives you direct access to the live interbank rate with transparent flat fees.'
  }
];

export default function ConverterPage() {
  return (
    <div className="min-h-screen bg-surface-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800 text-white py-14 sm:py-20">
        <div className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="badge-teal mb-3">Live Currency Calculator</span>
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight">
              Universal Currency Converter
            </h1>
            <p className="text-surface-300 mt-3 text-base">
              Check live foreign exchange rates with guaranteed mid-market accuracy across 220+ global currencies.
            </p>
          </div>

          <div className="flex justify-center">
            <CurrencyConverter defaultAmount={1000} defaultFrom="USD" defaultTo="EUR" />
          </div>
        </div>
      </section>

      {/* How to Convert */}
      <section className="section-padding bg-white border-b border-surface-200">
        <div className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-surface-900">
              How to Convert Currencies with VectisX
            </h2>
            <p className="text-surface-600 mt-2 text-sm">
              Calculate accurate real-time currency conversions in three intuitive steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                1
              </div>
              <h3 className="font-bold text-surface-900 mb-2">Select Your Currencies</h3>
              <p className="text-sm text-surface-600">
                Choose the source currency you hold and the target currency you wish to receive from 220+ available options.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                2
              </div>
              <h3 className="font-bold text-surface-900 mb-2">Input Any Amount</h3>
              <p className="text-sm text-surface-600">
                Type the amount you want to convert. The calculation updates instantly using real-time mid-market rates.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 rounded-xl bg-accent-100 text-accent-600 flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                3
              </div>
              <h3 className="font-bold text-surface-900 mb-2">Analyze or Transfer</h3>
              <p className="text-sm text-surface-600">
                Inspect 10-year historical charts, set free target rate notifications, or proceed directly to send funds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Conversions Table */}
      <section className="section-padding bg-surface-50">
        <div className="container-vx">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-heading font-bold text-surface-900">
                Popular Currency Conversions
              </h2>
              <p className="text-sm text-surface-500 mt-1">Live mid-market rates for the most traded currency pairs.</p>
            </div>
            <Link href="/rates" className="text-sm font-semibold text-brand-500 hover:underline">
              View all 100+ live currency rates &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularPairs.map(([from, to]) => {
              const rate = getRate(from, to);
              const change = get24hChange(from, to);
              const isPositive = change >= 0;

              return (
                <Link
                  key={`${from}-${to}`}
                  href={`/converter/${from.toLowerCase()}-to-${to.toLowerCase()}`}
                  className="card p-4 hover:border-brand-500/40 bg-white"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-surface-900 text-base">{from} to {to}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      {isPositive ? '+' : ''}{change.toFixed(2)}%
                    </span>
                  </div>
                  <div className="text-xl font-extrabold text-surface-900 font-mono">
                    1 {from} = {formatRate(rate)} {to}
                  </div>
                  <div className="text-[11px] text-surface-400 mt-2 flex justify-between items-center">
                    <span>100 {from} = {formatRate(100 * rate)} {to}</span>
                    <span className="text-brand-500 font-semibold">Chart &rarr;</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white border-t border-surface-200">
        <div className="container-vx max-w-4xl">
          <div className="text-center mb-12">
            <span className="badge-brand">Got Questions?</span>
            <h2 className="text-3xl font-heading font-bold text-surface-900 mt-2">
              Currency Conversion FAQs
            </h2>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>
    </div>
  );
}
