'use client';

import Link from 'next/link';
import { ShieldCheck, Zap, Lock } from 'lucide-react';
import CurrencyConverter from '@/components/sections/CurrencyConverter';
import Accordion from '@/components/ui/Accordion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StepConnector from '@/components/ui/StepConnector';
import LiveRateValue from '@/components/ui/LiveRateValue';
import LiveUpdatedBadge from '@/components/ui/LiveUpdatedBadge';
import { getTickedRate, formatRate, formatAmount } from '@/lib/rates';
import { useLiveTick } from '@/hooks';

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
    answer:
      'Over 85% of transfers to major corridors (such as UK, Eurozone, India, and Mexico) arrive within minutes. Delivery to smaller corridors typically takes 1 to 2 business days.',
  },
  {
    question: 'Are there any hidden exchange rate markups?',
    answer:
      'No. VectisX operates on transparent mid-market rates plus a low flat fee shown explicitly before you send.',
  },
  {
    question: 'How does the $100 promo code VXNEW100 work?',
    answer:
      'When you transfer $3,000 or more on your first transaction, enter code VXNEW100 during checkout to apply a $100 fee credit.',
  },
  {
    question: 'Is my money secure during transit?',
    answer:
      'Yes. VectisX is registered with FinCEN as a Money Services Business, holds state money transmitter licenses, and maintains SOC 2 Type II compliance.',
  },
];

export default function SendMoneyPage() {
  const sendAmount = 2500;
  const { tick, utcTime } = useLiveTick(7000);
  const rate = getTickedRate('USD', 'EUR', tick);
  const recipientGets = sendAmount * rate;

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="bg-surface border-b border-line py-12 sm:py-16">
        <div className="container-vx">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="badge-neutral">Fast &amp; Transparent</span>
                <LiveUpdatedBadge utcTime={utcTime} />
              </div>
              <h1>Send Money Worldwide with Bank-Beating Rates</h1>
              <p className="text-ink-500">
                Transfer funds to 190+ countries in 145+ currencies. Enjoy fast rail delivery, zero hidden markups, and end-to-end payment tracking.
              </p>

              <div className="p-4 rounded-2xl bg-surface-subtle border border-line space-y-1">
                <div className="text-caption font-medium text-ink-500 uppercase tracking-wider">
                  First-Time Offer
                </div>
                <div className="text-[15px] font-semibold text-ink">
                  Save $100 with promo code:{' '}
                  <span className="bg-primary text-primary-fg px-2 py-0.5 rounded tabular-nums">
                    VXNEW100
                  </span>
                </div>
                <div className="text-caption text-ink-500 tabular-nums">
                  Valid on initial transfers of $3,000+
                </div>
              </div>

              <div className="flex flex-wrap gap-5 text-[14px] text-ink-700">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-ink" aria-hidden="true" />
                  <span>FinCEN Licensed</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-ink" aria-hidden="true" />
                  <span>Instant Rail Delivery</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-ink" aria-hidden="true" />
                  <span>256-Bit SSL Protection</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <CurrencyConverter initialTab="send" defaultAmount={2500} defaultFrom="USD" defaultTo="EUR" />
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="section-padding bg-bg border-b border-line">
        <div className="container-vx">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <h2>The 3-Step Seamless Send Flow</h2>
              <p className="text-ink-500 mx-auto">
                From calculation to bank account deposit in three transparent steps.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <StepConnector />

            {[
              {
                step: '1',
                title: '1. Enter Amount',
                desc: 'Choose how much you want to send. View live rates, low flat fees, and arrival times upfront.',
              },
              {
                step: '2',
                title: '2. Choose Recipient',
                desc: 'Enter recipient details: bank account number, IBAN, mobile wallet, or cash pickup station.',
              },
              {
                step: '3',
                title: '3. Send & Track',
                desc: 'Fund via debit card, bank wire, or multi-currency vault. Monitor progress with real-time tracking links.',
              },
            ].map((item, idx) => (
              <ScrollReveal key={item.step} delay={idx * 50} className="relative z-10">
                <div className="card text-center h-full">
                  <div className="w-12 h-12 bg-primary text-primary-fg rounded-xl flex items-center justify-center mx-auto mb-4 font-semibold text-[18px] tabular-nums">
                    {item.step}
                  </div>
                  <h3 className="mb-2">{item.title}</h3>
                  <p className="text-ink-500 mx-auto text-[15px] leading-[24px]">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Corridors Grid */}
      <section className="section-padding bg-surface border-b border-line">
        <div className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="badge-neutral">Global Coverage</span>
            <h2>Popular Money Transfer Corridors</h2>
            <p className="text-ink-500 mx-auto">
              Connecting individuals and businesses across 190+ countries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {corridors.map((c, idx) => {
              const liveRate = getTickedRate('USD', c.currency, tick);
              return (
                <ScrollReveal key={c.country} delay={idx * 50}>
                  <Link
                    href={`/converter/usd-to-${c.currency.toLowerCase()}`}
                    aria-label={`Send money to ${c.country} in ${c.currency}`}
                    className="card-interactive p-5 space-y-3 h-full"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[24px]" aria-hidden="true">{c.flag}</span>
                      <span className="badge-neutral">{c.speed}</span>
                    </div>
                    <div>
                      <h3 className="text-[18px] leading-[24px] text-ink">{c.country}</h3>
                      <div className="text-caption text-ink-500 mt-1 tabular-nums">
                        1 USD ={' '}
                        <LiveRateValue
                          value={liveRate}
                          pairKey={`USD-${c.currency}`}
                          formatted={formatRate(liveRate)}
                        />{' '}
                        {c.currency}
                      </div>
                    </div>
                    <div className="pt-3 border-t border-line flex items-center justify-between text-caption">
                      <span className="text-ink-500 tabular-nums">
                        Fees from <strong className="text-ink font-semibold">{c.minFee}</strong>
                      </span>
                      <span className="font-medium text-ink">Send now &rsaquo;</span>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fee Comparison Table */}
      <section className="section-padding bg-bg border-b border-line">
        <div className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2>Why Pay Up to 8x More with Traditional Banks?</h2>
            <p className="text-ink-500 mx-auto tabular-nums">
              Comparison based on sending $2,500.00 USD to Europe (EUR).
            </p>
          </div>

          <div className="max-w-3xl mx-auto rounded-2xl border border-line bg-surface overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-subtle text-caption font-medium text-ink-500 uppercase border-b border-line">
                <tr>
                  <th className="py-3.5 px-6">Provider</th>
                  <th className="py-3.5 px-6">Exchange Rate</th>
                  <th className="py-3.5 px-6">Transfer Fee</th>
                  <th className="py-3.5 px-6 text-right">Recipient Gets</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line tabular-nums">
                <tr className="bg-surface-subtle/60 font-semibold text-ink">
                  <td className="py-4 px-6">VectisX (Guaranteed)</td>
                  <td className="py-4 px-6">{formatRate(rate)} (Mid-market)</td>
                  <td className="py-4 px-6">$3.99</td>
                  <td className="py-4 px-6 text-right font-semibold text-ink">
                    €{formatAmount(recipientGets)}
                  </td>
                </tr>
                <tr className="text-ink-700">
                  <td className="py-4 px-6">Major Retail Banks</td>
                  <td className="py-4 px-6 text-loss">{formatRate(rate * 0.95)} (5% markup)</td>
                  <td className="py-4 px-6 text-loss">$35.00</td>
                  <td className="py-4 px-6 text-right">€{formatAmount(recipientGets * 0.935)}</td>
                </tr>
                <tr className="text-ink-700">
                  <td className="py-4 px-6">Legacy Wire Agencies</td>
                  <td className="py-4 px-6 text-loss">{formatRate(rate * 0.97)} (3% markup)</td>
                  <td className="py-4 px-6 text-loss">$18.00</td>
                  <td className="py-4 px-6 text-right">€{formatAmount(recipientGets * 0.96)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/send/fees" className="btn-secondary btn-sm">
              Open Full Fee Calculator
            </Link>
            <Link href="/send/track" className="btn-ghost btn-sm">
              Track an Existing Transfer &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-surface">
        <div className="container-vx max-w-4xl">
          <div className="text-center mb-10 space-y-2">
            <span className="badge-neutral">Transfer Questions</span>
            <h2>Money Transfer FAQ</h2>
          </div>
          <Accordion items={sendFaqs} />
        </div>
      </section>
    </div>
  );
}
