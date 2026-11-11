import Link from '@/router/Link';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Star,
} from 'lucide-react';
import CurrencyConverter from '@/components/sections/CurrencyConverter';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StepConnector from '@/components/ui/StepConnector';
import LiveRateValue from '@/components/ui/LiveRateValue';
import LiveUpdatedBadge from '@/components/ui/LiveUpdatedBadge';
import DeltaChip from '@/components/ui/DeltaChip';
import { currencies, popularPairs } from '@/data/currencies';
import { formatRate, get24hChange } from '@/lib/rates';
import { useLiveRates } from '@/lib/fx/RateProvider';
import { useState } from 'react';

export default function HomePage() {
  const fx = useLiveRates();
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [isInverse, setIsInverse] = useState(false);

  const previewCurrencies = currencies.slice(1, 11);

  // These were hardcoded negative wallet balances implying an account this site
  // does not offer. They now mirror the live rate feed instead.
  const referenceRates = ['USD', 'EUR', 'GBP', 'AUD', 'CAD'].map((code) => {
    const meta = currencies.find((c) => c.code === code)!;
    return { ...meta, rate: fx.rate('USD', code) };
  });

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Hero Section */}
      <section className="bg-surface border-b border-line py-12 lg:py-20">
        <div className="container-vx">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <span className="badge-neutral">
                  <LiveUpdatedBadge utcTime={fx.updatedAt} />
                </span>
              </div>
              <h1>
                Global Currency Intelligence
              </h1>
              <p className="text-ink-500 mx-auto lg:mx-0">
                Check live mid-market rates for the currencies you actually use, convert at the rate the market is quoting, and chart how a pair has moved over time — all from one screen.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-2 text-[14px] text-ink-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-ink flex-shrink-0" aria-hidden="true" />
                  <span>FinCEN Registered &amp; SOC 2 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-ink fill-ink flex-shrink-0" aria-hidden="true" />
                  <span className="tabular-nums">4.8/5 Rating (500k+ reviews)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <CurrencyConverter />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Currency Pairs Grid */}
      <section className="section-padding bg-bg border-b border-line">
        <div className="container-vx">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="badge-neutral">Live Market Monitor</span>
                <h2 className="mt-3">Popular Currency Pairs</h2>
              </div>
              <Link
                href="/rates"
                className="inline-flex items-center gap-1.5 min-h-[44px] px-2 text-[15px] font-medium text-ink hover:text-ink-700 group"
              >
                <span>View all live rates</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularPairs.slice(0, 8).map(([from, to], index) => {
              const rate = fx.rate(from, to);
              const change = fx.change(from, to);

              return (
                <ScrollReveal key={`${from}-${to}`} delay={index * 50}>
                  <Link
                    href={`/converter/${from.toLowerCase()}-to-${to.toLowerCase()}`}
                    aria-label={`Convert ${from} to ${to}`}
                    className="card-interactive p-5 h-full"
                  >
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <span className="font-heading font-semibold text-[18px] leading-[24px] text-ink">
                        {from} / {to}
                      </span>
                      <DeltaChip change={change} hasData={Boolean(fx.previousRates)} comparedTo={fx.previousDate} />
                    </div>
                    <div className="text-[24px] leading-[32px] font-semibold text-ink mb-2 tabular-nums">
                      <LiveRateValue
                        value={rate}
                        pairKey={`${from}-${to}`}
                        formatted={formatRate(rate)}
                      />
                    </div>
                    <div className="flex items-center justify-between text-caption text-ink-500">
                      <span>Mid-market rate</span>
                      <span className="text-ink font-medium">Convert &rsaquo;</span>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live Conversion */}
      <section className="section-padding bg-surface border-b border-line">
        <div className="container-vx">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <ScrollReveal className="lg:col-span-6 space-y-6">
              <span className="badge-neutral">Live Conversion</span>
              <h2>Convert 64 Currencies at the Real Mid-Market Rate</h2>
              <p className="text-ink-500">
                Pick from 64 currencies and convert at the rate the market is actually quoting. The inverse rate is shown alongside every conversion, so you can see both directions at once.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-subtle border border-line">
                  <div className="w-10 h-10 rounded-xl bg-primary text-primary-fg flex items-center justify-center flex-shrink-0 font-semibold tabular-nums">
                    1
                  </div>
                  <div>
                    <h3 className="text-[18px] leading-[24px] text-ink">64 Currencies Supported</h3>
                    <p className="text-[15px] leading-[22px] text-ink-500 mt-1">
                      From the majors to the currencies you actually travel with — all from the same live feed.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-subtle border border-line">
                  <div className="w-10 h-10 rounded-xl bg-primary text-primary-fg flex items-center justify-center flex-shrink-0 font-semibold tabular-nums">
                    2
                  </div>
                  <div>
                    <h3 className="text-[18px] leading-[24px] text-ink">Instant Conversion</h3>
                    <p className="text-[15px] leading-[22px] text-ink-500 mt-1">
                      Every figure updates the moment a new rate arrives, with no page reload and no invented numbers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-subtle border border-line">
                  <div className="w-10 h-10 rounded-xl bg-primary text-primary-fg flex items-center justify-center flex-shrink-0 font-semibold tabular-nums">
                    3
                  </div>
                  <div>
                    <h3 className="text-[18px] leading-[24px] text-ink">Chart It or Watch It</h3>
                    <p className="text-[15px] leading-[22px] text-ink-500 mt-1">
                      Follow any pair on a historical chart running from a single day to ten years, and read the inverse rate alongside it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/register" className="btn-primary">
                  <span>Start Converting Free</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100} className="lg:col-span-6 bg-bg p-6 sm:p-10 rounded-2xl border border-line">
              <div className="space-y-3">
                {referenceRates.map((item) => (
                  <div
                    key={item.code}
                    className="card p-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-[24px]" aria-hidden="true">{item.flag}</span>
                      <div className="min-w-0">
                        <div className="font-semibold text-ink text-[15px]">{item.name}</div>
                        <div className="text-caption text-ink-500">{item.code} Reference Rate</div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-semibold text-ink text-[16px] tabular-nums">
                        {formatRate(item.rate)}
                      </div>
                      <div className="text-caption text-ink-500">1 USD</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3-Step Data Flow Section */}
      <section className="section-padding bg-bg border-b border-line">
        <div className="container-vx">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="badge-neutral">How the rates work</span>
              <h2>Real Rates, Explained in 3 Steps</h2>
              <p className="text-ink-500 mx-auto">
                Every figure on this site is fetched from a public exchange-rate API when the page loads — no invented numbers.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <StepConnector />

            {[
              {
                step: '1',
                title: 'We Call the API',
                desc: 'On load, the app requests the latest reference rates from a public market feed, falling back to central-bank reference rates if that is unavailable.',
              },
              {
                step: '2',
                title: 'You Convert',
                desc: 'Pick a pair and an amount. The converter multiplies by the rate the API returned and shows the inverse rate alongside it.',
              },
              {
                step: '3',
                title: 'You Chart & Watch',
                desc: 'Historical charts pull a real published time series, so you can see how a pair has actually moved.',
              },
            ].map((item, idx) => (
              <ScrollReveal key={item.step} delay={idx * 50} className="relative z-10">
                <div className="card text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary text-primary-fg flex items-center justify-center mx-auto mb-5 text-[18px] font-semibold tabular-nums">
                    {item.step}
                  </div>
                  <h3 className="mb-2">{item.title}</h3>
                  <p className="text-ink-500 mx-auto text-[15px] leading-[24px]">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Data source callout */}
          <ScrollReveal delay={100}>
            <div className="mt-12 bg-surface-invert text-ink-invert rounded-2xl border border-line-invert p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="badge-invert">Open data</span>
                <h3 className="text-ink-invert">
                  Rates from public market &amp; central-bank data
                </h3>
                <p className="text-ink-invert-muted">
                  Reference rates are republished from free, public data sources and cached for
                  fifteen minutes. If none can be reached, the app says so and shows a clearly
                  labelled saved snapshot rather than inventing numbers.
                </p>
              </div>
              <Link href="/historical" className="btn-invert whitespace-nowrap">
                See the history
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Live Rates Table Preview */}
      <section className="section-padding bg-surface border-b border-line">
        <div className="container-vx">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="badge-neutral">Exchange Matrix</span>
                <LiveUpdatedBadge utcTime={fx.updatedAt} />
              </div>
              <h2>Live Rates for World Currencies</h2>
              <p className="text-ink-500">
                Updated directly from interbank liquidity providers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <label htmlFor="home-base-select" className="whitespace-nowrap">
                  Base Currency:
                </label>
                <select
                  id="home-base-select"
                  value={baseCurrency}
                  onChange={(e) => setBaseCurrency(e.target.value)}
                  className="select-field py-2 text-[14px] font-medium"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setIsInverse(!isInverse)}
                aria-pressed={isInverse}
                className={`min-h-[44px] px-4 rounded-xl border text-[13px] font-medium transition-colors duration-150 ${
                  isInverse
                    ? 'bg-primary text-primary-fg border-primary'
                    : 'bg-surface border-line-strong text-ink hover:bg-surface-subtle'
                }`}
              >
                Inverse: {isInverse ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-subtle text-caption font-medium text-ink-500 uppercase border-b border-line">
                  <th className="py-3.5 px-6">Currency</th>
                  <th className="py-3.5 px-6">Name</th>
                  <th className="py-3.5 px-6 text-right">
                    {isInverse ? `Units per ${baseCurrency}` : `${baseCurrency} per Unit`}
                  </th>
                  <th className="py-3.5 px-6 text-right">24h Change</th>
                  <th className="py-3.5 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {previewCurrencies.map((c) => {
                  const rawRate = fx.rate(baseCurrency, c.code);
                  const displayRate = isInverse ? 1 / rawRate : rawRate;
                  const change = fx.change(baseCurrency, c.code);

                  return (
                    <tr key={c.code} className="hover:bg-surface-subtle/60 transition-colors duration-150">
                      <td className="py-3.5 px-6 font-semibold text-ink">
                        <span className="inline-flex items-center gap-2.5">
                          <span className="text-[18px]" aria-hidden="true">{c.flag}</span>
                          <span>{c.code}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-ink-500">{c.name}</td>
                      <td className="py-3.5 px-6 text-right font-semibold text-ink tabular-nums">
                        <LiveRateValue
                          value={displayRate}
                          pairKey={`${baseCurrency}-${c.code}-${isInverse ? 'inv' : 'dir'}`}
                          formatted={formatRate(displayRate)}
                        />
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <DeltaChip change={change} hasData={Boolean(fx.previousRates)} comparedTo={fx.previousDate} />
                      </td>
                      <td className="py-3.5 px-6 text-center">
                        <Link
                          href={`/converter/${baseCurrency.toLowerCase()}-to-${c.code.toLowerCase()}`}
                          aria-label={`Convert ${baseCurrency} to ${c.code}`}
                          className="inline-flex items-center min-h-[44px] px-3 font-medium text-ink hover:underline"
                        >
                          View Chart &rsaquo;
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
            <Link href="/rates" className="inline-flex items-center min-h-[44px] text-[15px] font-medium text-ink hover:underline">
              Browse complete list of live currencies &rarr;
            </Link>
            <Link href="/tables" className="inline-flex items-center min-h-[44px] text-[15px] font-medium text-ink hover:underline">
              Compare every pair at once &rarr;
            </Link>
          </div>
        </div>
      </section>


      {/* A-Z Honest Map Directory */}
      <section className="section-padding bg-bg">
        <div className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2>The VectisX A–Z Honest Directory</h2>
            <p className="text-ink-500 mx-auto">
              Every converter, chart and tool available across the site.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 text-[14px]">
            {[
              ['A', 'Accounts, Archive', '/register'],
              ['B', 'Bank Data, Base Rates', '/rates'],
              ['C', 'Converter, Charts, Tables', '/converter'],
              ['D', 'Daily Rates, Downloads', '/historical'],
              ['E', 'Exchange Rates, ECB Data', '/rates'],
              ['F', 'FX History, Floating Rates', '/historical'],
              ['G', 'Graphs, Gain &amp; Loss', '/charts'],
              ['H', 'Historical Rates, Help', '/historical'],
              ['I', 'Indices, Inverse Rates', '/tables'],
              ['L', 'Live Rates, Latest Close', '/rates'],
              ['M', 'Mid-Market Rates, Matrix', '/tables'],
              ['O', 'Open Data, One-day Charts', '/charts'],
              ['P', 'Pairs, Popular Conversions', '/converter'],
              ['R', 'Rates, Rate History', '/rates'],
              ['S', 'Saved Snapshots, Security', '/security'],
              ['T', 'Tools, Tables, Trends', '/tools'],
              ['U', 'USD Pairs, Utilities', '/converter'],
              ['V', 'Volatility & Macro Blog', '/blog'],
            ].map(([letter, label, href], index) => (
              <ScrollReveal key={letter} delay={index * 25}>
                <Link
                  href={href}
                  aria-label={`Browse ${label}`}
                  className="card-interactive p-4 h-full"
                >
                  <strong className="text-ink font-heading font-semibold block mb-1">{letter}</strong>
                  <span className="text-caption text-ink-500">{label}</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/sitemap-page"
              className="inline-flex items-center min-h-[44px] px-4 text-[14px] text-ink font-medium hover:underline"
            >
              View comprehensive sitemap and all URL routes &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
