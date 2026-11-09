'use client';

import Link from 'next/link';
import CurrencyConverter from '@/components/sections/CurrencyConverter';
import Accordion from '@/components/ui/Accordion';
import {
  RateFlash,
  RevealCard,
  RevealSection,
  StepConnector,
} from '@/components/ui/MotionPrimitives';
import { popularPairs } from '@/data/currencies';
import { formatRate, get24hChange } from '@/lib/rates';
import { useLiveRates } from '@/hooks/useLiveRates';

const faqs = [
  {
    question: 'What is a mid-market exchange rate?',
    answer:
      'The mid-market exchange rate is the exact midpoint between the global "buy" and "sell" transaction rates on international financial markets. It is the real, un-marked-up rate you find on independent financial sources. VectisX displays true mid-market rates for maximum transparency.',
  },
  {
    question: 'How often are VectisX exchange rates updated?',
    answer:
      'Our live converter rates are updated continuously from global liquidity providers and central-bank feeds via our multi-source consensus engine.',
  },
  {
    question: 'Why do VectisX rates match institutional benchmarks closely?',
    answer:
      'VectisX blends live global market REST feeds with official central-bank interbank tables (including the European Central Bank and State Bank of Pakistan), giving you institutional consensus mid-market accuracy.',
  },
  {
    question: 'Why do bank rates differ from the VectisX rate?',
    answer:
      'Traditional retail banks typically add a hidden markup of 3% to 6% onto the real mid-market exchange rate. VectisX gives you direct visibility into the true interbank benchmark rate.',
  },
];

export default function ConverterPage() {
  const { data, getLivePairRate } = useLiveRates('USD');

  return (
    <div className="min-h-screen bg-page">
      {/* Hero — Flat Navy #0B1B33 */}
      <section className="bg-navy text-white border-b border-navy-border py-14 sm:py-20">
        <div className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="badge-brand mb-3">Live Currency Calculator</span>
            <h1 className="type-h1 text-white">Universal Currency Converter</h1>
            <p className="type-body text-[#C9D3E3] mt-3 mx-auto">
              Check live foreign exchange rates with institutional mid-market accuracy across 220+ global currencies.
            </p>
          </div>

          <div className="flex justify-center">
            <CurrencyConverter defaultAmount={1000} defaultFrom="USD" defaultTo="EUR" />
          </div>
        </div>
      </section>

      {/* How to Convert (with animated StepConnector) */}
      <section className="section-padding bg-white border-b border-surface-200">
        <RevealSection className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="type-h2 text-navy">How to Convert Currencies with VectisX</h2>
            <p className="type-body text-body mt-2 mx-auto">
              Calculate accurate real-time currency conversions in three simple steps.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-12 left-[18%] right-[18%] z-0 pointer-events-none">
              <StepConnector />
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <RevealCard index={0}>
                <div className="card text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary-pale border border-primary-border text-primary flex items-center justify-center mx-auto mb-4 font-semibold text-lg tabular-nums">
                    1
                  </div>
                  <h3 className="type-h3 text-navy mb-2">Select Your Currencies</h3>
                  <p className="text-sm text-body mx-auto">
                    Choose the source currency and target currency from 220+ supported world currencies, metals, and digital assets.
                  </p>
                </div>
              </RevealCard>

              <RevealCard index={1}>
                <div className="card text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary-pale border border-primary-border text-primary flex items-center justify-center mx-auto mb-4 font-semibold text-lg tabular-nums">
                    2
                  </div>
                  <h3 className="type-h3 text-navy mb-2">Input Any Amount</h3>
                  <p className="text-sm text-body mx-auto">
                    Type the amount you want to convert. Valuations update immediately using live institutional mid-market rates.
                  </p>
                </div>
              </RevealCard>

              <RevealCard index={2}>
                <div className="card text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary-pale border border-primary-border text-primary flex items-center justify-center mx-auto mb-4 font-semibold text-lg tabular-nums">
                    3
                  </div>
                  <h3 className="type-h3 text-navy mb-2">Analyze Trends &amp; Alerts</h3>
                  <p className="text-sm text-body mx-auto">
                    Inspect historical central-bank charts, export CSV series, or configure automated cloud rate alerts.
                  </p>
                </div>
              </RevealCard>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Popular Conversions Grid */}
      <section className="section-padding bg-page">
        <RevealSection className="container-vx">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="type-h2 text-navy">Popular Currency Conversions</h2>
              <p className="type-caption text-caption mt-1">
                Live mid-market rates for the most actively monitored currency pairs.
              </p>
            </div>
            <Link
              href="/rates"
              className="inline-flex items-center min-h-[44px] text-sm font-semibold text-primary hover:text-primary-hover hover:underline"
            >
              View all 100+ live currency rates &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularPairs.map(([from, to], idx) => {
              const rate = getLivePairRate(from, to);
              const change = get24hChange(from, to);
              const isPositive = change >= 0;

              return (
                <RevealCard key={`${from}-${to}`} index={idx}>
                  <Link
                    href={`/converter/${from.toLowerCase()}-to-${to.toLowerCase()}`}
                    aria-label={`Convert ${from} to ${to}`}
                    className="card card-interactive block p-5 bg-white group"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-heading font-semibold text-navy group-hover:text-primary transition-colors duration-150 ease-fintech text-base">
                        {from} to {to}
                      </span>
                      <span
                        className={`type-caption font-semibold px-2.5 py-0.5 rounded-full border tabular-nums ${
                          isPositive
                            ? 'bg-gain-bg text-gain-text border-gain-border'
                            : 'bg-loss-bg text-loss-text border-loss-border'
                        }`}
                      >
                        {isPositive ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
                      </span>
                    </div>
                    <div className="text-xl font-heading font-semibold text-navy tabular-nums">
                      <RateFlash value={rate} ready={Boolean(data)}>
                        1 {from} = {formatRate(rate)} {to}
                      </RateFlash>
                    </div>
                    <div className="type-caption text-caption mt-2 flex justify-between items-center tabular-nums">
                      <span>
                        100 {from} = {formatRate(100 * rate)} {to}
                      </span>
                      <span className="text-primary font-semibold group-hover:underline">Convert &rarr;</span>
                    </div>
                  </Link>
                </RevealCard>
              );
            })}
          </div>
        </RevealSection>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white border-t border-surface-200">
        <RevealSection className="container-vx max-w-4xl">
          <div className="text-center mb-12">
            <span className="badge-brand">Got Questions?</span>
            <h2 className="type-h2 text-navy mt-2">Currency Conversion FAQs</h2>
          </div>
          <Accordion items={faqs} />
        </RevealSection>
      </section>
    </div>
  );
}
