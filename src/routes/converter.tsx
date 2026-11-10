import Link from '@/router/Link';
import CurrencyConverter from '@/components/sections/CurrencyConverter';
import Accordion from '@/components/ui/Accordion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StepConnector from '@/components/ui/StepConnector';
import LiveRateValue from '@/components/ui/LiveRateValue';
import LiveUpdatedBadge from '@/components/ui/LiveUpdatedBadge';
import DeltaChip from '@/components/ui/DeltaChip';
import { popularPairs } from '@/data/currencies';
import { formatRate, get24hChange } from '@/lib/rates';
import { useLiveRates } from '@/lib/fx/RateProvider';

const faqs = [
  {
    question: 'What is a mid-market exchange rate?',
    answer:
      'The mid-market exchange rate is the exact midpoint between the global buy and sell transaction rates on international financial markets. It is the benchmark interbank rate with no hidden retail markup.',
  },
  {
    question: 'How often are VectisX exchange rates updated?',
    answer:
      'Our live converter rates refresh continuously during global market trading hours, aggregating feeds from over 100 liquidity providers and central bank sources via our Rate Blender engine.',
  },
  {
    question: 'Can I send money at the exact rate displayed on the converter?',
    answer:
      'Yes. When you initiate a money transfer through VectisX, you lock in a transparent exchange rate and explicit flat fee before confirming.',
  },
  {
    question: 'Why do bank rates differ from the VectisX rate?',
    answer:
      'Traditional retail banks typically add a hidden markup of 3% to 6% onto the mid-market exchange rate, in addition to outbound international wire fees.',
  },
];

export default function ConverterPage() {
  const fx = useLiveRates();

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="bg-surface border-b border-line py-12 sm:py-16">
        <div className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
            <div className="flex justify-center">
              <span className="badge-neutral">
                <LiveUpdatedBadge utcTime={fx.updatedAt} />
              </span>
            </div>
            <h1>Universal Currency Converter</h1>
            <p className="text-ink-500 mx-auto">
              Check live foreign exchange rates with mid-market accuracy across global currencies, precious metals, and digital assets.
            </p>
          </div>

          <div className="flex justify-center">
            <CurrencyConverter defaultAmount={1000} defaultFrom="USD" defaultTo="EUR" />
          </div>
        </div>
      </section>

      {/* How to Convert */}
      <section className="section-padding bg-bg border-b border-line">
        <div className="container-vx">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <h2>How to Convert Currencies with VectisX</h2>
              <p className="text-ink-500 mx-auto">
                Calculate accurate real-time currency conversions in three intuitive steps.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <StepConnector />

            {[
              {
                step: '1',
                title: 'Select Your Currencies',
                desc: 'Choose the source currency you hold and the target currency you wish to receive from global options.',
              },
              {
                step: '2',
                title: 'Input Any Amount',
                desc: 'Type the amount you want to convert. The calculation updates instantly using real-time mid-market rates.',
              },
              {
                step: '3',
                title: 'Analyze or Transfer',
                desc: 'Inspect 10-year historical charts, set free target rate notifications, or proceed directly to send funds.',
              },
            ].map((item, idx) => (
              <ScrollReveal key={item.step} delay={idx * 50} className="relative z-10">
                <div className="card text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary text-primary-fg flex items-center justify-center mx-auto mb-4 font-semibold text-[18px] tabular-nums">
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

      {/* Popular Conversions */}
      <section className="section-padding bg-surface border-b border-line">
        <div className="container-vx">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div className="space-y-1">
              <h2>Popular Currency Conversions</h2>
              <p className="text-ink-500">Live mid-market rates for the most traded currency pairs.</p>
            </div>
            <Link
              href="/rates"
              className="inline-flex items-center min-h-[44px] text-[15px] font-medium text-ink hover:underline"
            >
              View all live currency rates &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularPairs.map(([from, to], idx) => {
              const rate = fx.rate(from, to);
              const change = fx.change(from, to);

              return (
                <ScrollReveal key={`${from}-${to}`} delay={idx * 50}>
                  <Link
                    href={`/converter/${from.toLowerCase()}-to-${to.toLowerCase()}`}
                    aria-label={`Convert ${from} to ${to}`}
                    className="card-interactive p-5 h-full"
                  >
                    <div className="flex justify-between items-center mb-2 gap-2">
                      <span className="font-heading font-semibold text-ink text-[18px]">
                        {from} to {to}
                      </span>
                      <DeltaChip change={change} />
                    </div>
                    <div className="text-[20px] leading-[28px] font-semibold text-ink tabular-nums">
                      1 {from} ={' '}
                      <LiveRateValue
                        value={rate}
                        pairKey={`${from}-${to}`}
                        formatted={formatRate(rate)}
                      />{' '}
                      {to}
                    </div>
                    <div className="text-caption text-ink-500 mt-2 flex justify-between items-center tabular-nums">
                      <span>100 {from} = {formatRate(100 * rate)} {to}</span>
                      <span className="text-ink font-medium">Chart &rarr;</span>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-bg">
        <div className="container-vx max-w-4xl">
          <div className="text-center mb-10 space-y-2">
            <span className="badge-neutral">Got Questions?</span>
            <h2>Currency Conversion FAQs</h2>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>
    </div>
  );
}
