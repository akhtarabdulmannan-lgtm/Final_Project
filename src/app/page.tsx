'use client';

import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Star,
} from 'lucide-react';
import CurrencyConverter from '@/components/sections/CurrencyConverter';
import ApiStatusBanner from '@/components/ui/ApiStatusBanner';
import {
  CountUpAmount,
  LiveTimestamp,
  RateFlash,
  RevealCard,
  RevealSection,
  Skeleton,
  StepConnector,
  useHydrated,
} from '@/components/ui/MotionPrimitives';
import { currencies, popularPairs } from '@/data/currencies';
import { formatRate, get24hChange } from '@/lib/rates';
import { useLiveRates } from '@/hooks/useLiveRates';
import { useState } from 'react';

export default function HomePage() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [isInverse, setIsInverse] = useState(false);
  const hydrated = useHydrated();
  const { data, isLoading, error, source, lastUpdated, refresh, getLivePairRate } = useLiveRates(baseCurrency);

  const previewCurrencies = currencies.slice(1, 11);
  const showTableSkeleton = hydrated && isLoading && !data;

  return (
    <div className="flex flex-col min-h-screen bg-page">
      {/* Hero Section — Flat Navy #0B1B33 */}
      <section className="bg-navy text-white border-b border-navy-border pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="container-vx">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <span className="badge-brand">Live Mid-Market Exchange Rates</span>
                <LiveTimestamp timestamp={lastUpdated ?? undefined} inverse />
              </div>
              <h1 className="type-h1 text-white">
                Global Currency Intelligence &amp; Analytics
              </h1>
              <p className="type-body text-[#C9D3E3] mx-auto lg:mx-0">
                Compare real-time institutional consensus rates across 200+ world currencies, inspect official central-bank historical trends, and automate cloud rate alerts with zero markup.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-2">
                <div className="flex items-center gap-2 type-caption text-[#DBE6FD]">
                  <ShieldCheck className="w-4 h-4 text-[#DBE6FD]" aria-hidden="true" /> FinCEN Registered &amp; SOC 2 Certified
                </div>
                <div className="flex items-center gap-2 type-caption text-[#DBE6FD] tabular-nums">
                  <Star className="w-4 h-4 text-[#DBE6FD]" aria-hidden="true" /> 4.8/5 Institutional Rating
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
      <section className="py-16 bg-page border-b border-surface-200">
        <RevealSection className="container-vx">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="badge-brand mb-2">Live Market Monitor</span>
              <h2 className="type-h2 text-navy mt-1">Popular Currency Pairs</h2>
            </div>
            <Link
              href="/rates"
              className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-semibold text-primary hover:text-primary-hover group"
            >
              View all 100+ live rates{' '}
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150 ease-fintech"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {popularPairs.slice(0, 8).map(([from, to], idx) => {
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
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-heading font-semibold text-lg text-navy group-hover:text-primary transition-colors duration-150 ease-fintech">
                        {from} / {to}
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
                    <div className="text-2xl font-heading font-semibold text-navy tabular-nums mb-1">
                      {showTableSkeleton ? (
                        <Skeleton className="h-7 w-24" />
                      ) : (
                        <RateFlash value={rate} ready={Boolean(data)}>
                          {formatRate(rate)}
                        </RateFlash>
                      )}
                    </div>
                    <div className="flex items-center justify-between type-caption text-caption">
                      <span>Mid-market rate</span>
                      <span className="text-primary font-semibold group-hover:underline">Convert &rsaquo;</span>
                    </div>
                  </Link>
                </RevealCard>
              );
            })}
          </div>
        </RevealSection>
      </section>

      {/* Core Personal Features: Multi-Currency Account */}
      <section className="section-padding bg-white border-b border-surface-200">
        <RevealSection className="container-vx">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="badge-brand">Multi-Currency Account</span>
              <h2 className="type-h2 text-navy">
                Track &amp; Manage Multi-Currency Balances
              </h2>
              <p className="type-body text-body">
                Monitor reference balances across USD, GBP, EUR, AUD, CAD, and more in one unified workspace. Compare 18 major reserve currencies in milliseconds at genuine mid-market rates.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-page border border-surface-200">
                  <div className="w-10 h-10 rounded-xl bg-primary-pale border border-primary-border text-primary flex items-center justify-center flex-shrink-0 font-semibold tabular-nums">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-navy">Hold 18+ Reserve Currencies</h3>
                    <p className="text-sm text-body mt-1">
                      Organize multi-currency positions across global reserve currencies without hidden account maintenance fees.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-page border border-surface-200">
                  <div className="w-10 h-10 rounded-xl bg-primary-pale border border-primary-border text-primary flex items-center justify-center flex-shrink-0 font-semibold tabular-nums">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-navy">Instant Rate Valuation</h3>
                    <p className="text-sm text-body mt-1">
                      Evaluate currency exposures in real time whenever market exchange rates reach your target threshold.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-page border border-surface-200">
                  <div className="w-10 h-10 rounded-xl bg-primary-pale border border-primary-border text-primary flex items-center justify-center flex-shrink-0 font-semibold tabular-nums">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-navy">Transparent Mid-Market Benchmarks</h3>
                    <p className="text-sm text-body mt-1">
                      Benchmark against institutional consensus feeds from global markets and central banks with zero spread distortion.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/register" className="btn-primary">
                  Open a Multi-Currency Workspace <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Balances Card — Flat #F6F8FB surface, White cards, Navy balances counting up over 400ms */}
            <div className="lg:col-span-6 bg-page p-6 sm:p-10 rounded-2xl border border-surface-200">
              <div className="space-y-3.5">
                {[
                  { code: 'USD', name: 'US Dollar', flag: '🇺🇸', prefix: '$', amount: 24580.0 },
                  { code: 'EUR', name: 'Euro', flag: '🇪🇺', prefix: '€', amount: 18240.5 },
                  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', prefix: '£', amount: 12410.2 },
                  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺', prefix: 'A$', amount: 15800.0 },
                  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', prefix: 'C$', amount: 9350.0 },
                ].map((item) => (
                  <div
                    key={item.code}
                    className="bg-white p-4 rounded-xl border border-surface-200 flex items-center justify-between transition-colors duration-150 ease-fintech hover:border-surface-300"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" aria-hidden="true">
                        {item.flag}
                      </span>
                      <div>
                        <div className="font-semibold text-navy text-sm">{item.name}</div>
                        <div className="type-caption text-caption">{item.code} Balance</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-navy text-sm tabular-nums">
                        <CountUpAmount value={item.amount} prefix={item.prefix} decimals={2} />
                      </div>
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gain-bg text-gain-text border border-gain-border uppercase">
                        Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* 3-Step Currency Intelligence Workflow (with animated connector line) */}
      <section className="section-padding bg-page border-b border-surface-200">
        <RevealSection className="container-vx">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="badge-brand">Institutional FX Workflow</span>
            <h2 className="type-h2 text-navy mt-2">
              Master Currency Markets in 3 Simple Steps
            </h2>
            <p className="type-body text-body mt-3 mx-auto">
              Multi-source consensus data combining live global market feeds with official central-bank benchmarks.
            </p>
          </div>

          <div className="relative">
            {/* Connector line between step badges (draws in once when entering view) */}
            <div className="hidden md:block absolute top-12 left-[18%] right-[18%] z-0 pointer-events-none">
              <StepConnector />
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <RevealCard index={0}>
                <div className="card text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary-pale border border-primary-border text-primary flex items-center justify-center mx-auto mb-5 text-lg font-semibold tabular-nums">
                    1
                  </div>
                  <h3 className="type-h3 text-navy mb-2">Compare Live Consensus Rates</h3>
                  <p className="text-sm text-body mx-auto">
                    Select any currency pair and compare real-time institutional consensus rates alongside ECB, SBP, Currency-API, and Open Exchange Rates feeds.
                  </p>
                </div>
              </RevealCard>

              <RevealCard index={1}>
                <div className="card text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary-pale border border-primary-border text-primary flex items-center justify-center mx-auto mb-5 text-lg font-semibold tabular-nums">
                    2
                  </div>
                  <h3 className="type-h3 text-navy mb-2">Inspect Historical Trends</h3>
                  <p className="text-sm text-body mx-auto">
                    Explore 1-week to 5-year interactive Recharts visualizations backed by official European Central Bank time-series and export CSV datasets.
                  </p>
                </div>
              </RevealCard>

              <RevealCard index={2}>
                <div className="card text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary-pale border border-primary-border text-primary flex items-center justify-center mx-auto mb-5 text-lg font-semibold tabular-nums">
                    3
                  </div>
                  <h3 className="type-h3 text-navy mb-2">Automate Cloud Rate Alerts</h3>
                  <p className="text-sm text-body mx-auto">
                    Save custom target-rate triggers directly to your Supabase cloud watchlist and monitor live market distance in real time.
                  </p>
                </div>
              </RevealCard>
            </div>
          </div>

          {/* Alerts Callout — Flat Navy #0B1B33 */}
          <div className="mt-12 bg-navy border border-navy-border rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="badge-brand">Cloud Rate Watchlist</span>
              <h3 className="type-h3 text-white">
                Never Miss Your Target Exchange Rate Again
              </h3>
              <p className="text-sm text-[#C9D3E3]">
                Create unlimited custom rate alerts synced to your VectisX cloud profile with live threshold tracking.
              </p>
            </div>
            <Link href="/alerts" className="btn-primary whitespace-nowrap">
              Create Free Rate Alert
            </Link>
          </div>
        </RevealSection>
      </section>

      {/* Live Rates Table Preview */}
      <section className="section-padding bg-white border-b border-surface-200">
        <RevealSection className="container-vx">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="badge-brand">Exchange Matrix</span>
              <h2 className="type-h2 text-navy mt-2">
                Live Rates for World Currencies
              </h2>
              <p className="type-caption text-caption mt-1">
                Updated asynchronously from institutional and central-bank foreign exchange feeds.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <label htmlFor="home-base-currency" className="form-label whitespace-nowrap">
                  Base Currency:
                </label>
                <select
                  id="home-base-currency"
                  value={baseCurrency}
                  onChange={(e) => setBaseCurrency(e.target.value)}
                  className="min-h-[44px] rounded-xl border border-surface-300 px-3.5 py-2 text-sm font-semibold bg-white text-navy outline-none focus:border-primary focus:ring-2 focus:ring-primary-border"
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
                className={`min-h-[44px] type-caption font-semibold px-4 py-2 rounded-xl border transition-colors duration-150 ease-fintech ${
                  isInverse
                    ? 'bg-primary-pale border-primary-border text-primary'
                    : 'bg-white border-surface-300 text-navy hover:border-primary hover:text-primary'
                }`}
              >
                Inverse: {isInverse ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <ApiStatusBanner
              isLoading={isLoading}
              error={error}
              source={source}
              lastUpdated={lastUpdated}
              onRefresh={refresh}
            />
          </div>

          <div className="overflow-x-auto rounded-2xl border border-surface-200 bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-page type-caption font-semibold text-caption uppercase border-b border-surface-200">
                  <th className="py-4 px-6">Currency</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6 text-right">
                    {isInverse ? `Units per ${baseCurrency}` : `${baseCurrency} per Unit`}
                  </th>
                  <th className="py-4 px-6 text-right">24h Change</th>
                  <th className="py-4 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200">
                {previewCurrencies.map((c) => {
                  const rawRate = getLivePairRate(baseCurrency, c.code);
                  const displayRate = isInverse ? 1 / rawRate : rawRate;
                  const change = get24hChange(baseCurrency, c.code);
                  const isPositive = change >= 0;

                  return (
                    <tr key={c.code} className="hover:bg-page transition-colors duration-150 ease-fintech">
                      <td className="py-3.5 px-6 font-semibold text-navy">
                        <span className="inline-flex items-center gap-2">
                          <span className="text-xl" aria-hidden="true">
                            {c.flag}
                          </span>
                          <span>{c.code}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-body">{c.name}</td>
                      <td className="py-3.5 px-6 text-right font-semibold text-navy tabular-nums">
                        {showTableSkeleton ? (
                          <Skeleton className="h-5 w-20" />
                        ) : (
                          <RateFlash value={displayRate} ready={Boolean(data)}>
                            {formatRate(displayRate)}
                          </RateFlash>
                        )}
                      </td>
                      <td className="py-3.5 px-6 text-right font-semibold">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full type-caption border tabular-nums ${
                            isPositive
                              ? 'bg-gain-bg text-gain-text border-gain-border'
                              : 'bg-loss-bg text-loss-text border-loss-border'
                          }`}
                        >
                          {isPositive ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-center">
                        <Link
                          href={`/converter/${baseCurrency.toLowerCase()}-to-${c.code.toLowerCase()}`}
                          aria-label={`Convert ${baseCurrency} to ${c.code}`}
                          className="inline-flex items-center justify-center min-h-[44px] px-3 type-caption font-semibold text-primary hover:text-primary-hover hover:underline"
                        >
                          Convert &rsaquo;
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-wrap justify-between items-center gap-3">
            <Link
              href="/rates"
              className="inline-flex items-center min-h-[44px] text-sm font-semibold text-primary hover:text-primary-hover hover:underline"
            >
              Browse complete list of 100+ global currencies &rarr;
            </Link>
            <Link
              href="/alerts"
              className="inline-flex items-center min-h-[44px] text-sm font-semibold text-primary hover:text-primary-hover hover:underline"
            >
              Set custom rate triggers &rarr;
            </Link>
          </div>
        </RevealSection>
      </section>

      {/* Business Features — Flat Navy #0B1B33 */}
      <section className="section-padding bg-navy text-white border-b border-navy-border">
        <RevealSection className="container-vx">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="badge-brand">VectisX Business Treasury</span>
              <h2 className="type-h2 text-white">
                Institutional Treasury &amp; FX Risk Infrastructure
              </h2>
              <p className="type-body text-[#C9D3E3]">
                Equip your finance team with multi-currency corporate analytics, forward hedging models, role-based approvals, and seamless ERP data synchronization.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-navy-elevated border border-navy-border">
                  <h3 className="font-heading font-semibold text-white text-lg">Batch FX Analytics</h3>
                  <p className="type-caption text-[#C9D3E3] mt-1">
                    Model multi-currency invoice exposures across 190+ jurisdictions from structured CSV ledgers.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-navy-elevated border border-navy-border">
                  <h3 className="font-heading font-semibold text-white text-lg">Forward Contracts</h3>
                  <p className="type-caption text-[#C9D3E3] mt-1">
                    Evaluate forward FX curves up to 24 months ahead to protect balance sheets against volatility.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-navy-elevated border border-navy-border">
                  <h3 className="font-heading font-semibold text-white text-lg">Role-Based Governance</h3>
                  <p className="type-caption text-[#C9D3E3] mt-1">
                    Tiered permissions across Creator, Verifier, Approver, and Auditor roles with full audit trails.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-navy-elevated border border-navy-border">
                  <h3 className="font-heading font-semibold text-white text-lg">ERP Integrations</h3>
                  <p className="type-caption text-[#C9D3E3] mt-1">
                    Native FX feed connectors for Microsoft Dynamics 365, Sage Intacct, Xero, and REST webhooks.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <Link href="/business" className="btn-primary">
                  Explore Business Suite <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl border border-navy-border bg-navy-elevated px-6 py-2.5 text-sm font-semibold text-white hover:border-[#DBE6FD] transition-colors duration-150 ease-fintech"
                >
                  Contact Treasury Desk
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 bg-navy-elevated p-8 rounded-2xl border border-navy-border space-y-6">
              <h3 className="type-h3 text-white mb-2">Institutional Scale</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl sm:text-4xl font-heading font-semibold text-white tabular-nums">
                    <CountUpAmount value={17000} suffix="+" decimals={0} />
                  </div>
                  <div className="type-caption text-[#C9D3E3] mt-1">Active Enterprise Teams</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-heading font-semibold text-white tabular-nums">
                    <CountUpAmount value={17} prefix="$" suffix="B+" decimals={0} />
                  </div>
                  <div className="type-caption text-[#C9D3E3] mt-1">Annual FX Volume Benchmarked</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-heading font-semibold text-white tabular-nums">
                    <CountUpAmount value={190} suffix="+" decimals={0} />
                  </div>
                  <div className="type-caption text-[#C9D3E3] mt-1">Supported Jurisdictions</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-heading font-semibold text-white tabular-nums">
                    <CountUpAmount value={30} suffix="+" decimals={0} />
                  </div>
                  <div className="type-caption text-[#C9D3E3] mt-1">Years Historical FX Archives</div>
                </div>
              </div>

              <div className="pt-4 border-t border-navy-border">
                <span className="type-caption text-[#C9D3E3] block mb-3 font-semibold uppercase tracking-wider">
                  Trusted by Industry Leaders
                </span>
                <div className="flex flex-wrap gap-2.5 items-center">
                  {['ShopFlow', 'CloudBooks', 'VistaCore', 'PayStream', 'GlobalTech', 'NexaPay'].map((client) => (
                    <span
                      key={client}
                      className="px-3 py-1.5 rounded-lg bg-navy border border-navy-border type-caption font-semibold text-[#DBE6FD]"
                    >
                      {client}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Developer API Section */}
      <section className="section-padding bg-white border-b border-surface-200">
        <RevealSection className="container-vx">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="badge-brand">Developer Platform</span>
              <h2 className="type-h2 text-navy">
                VectisX Currency Data API
              </h2>
              <p className="type-body text-body">
                Connect your platforms to our Rate Blender engine aggregating 100+ global data sources with real-time anomaly filtering across 220+ currencies, precious metals, and digital assets.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-body">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                  <span>
                    Single endpoint:{' '}
                    <code className="bg-page border border-surface-200 px-2 py-0.5 rounded type-caption text-navy">
                      GET /v1/convert_from
                    </code>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-body">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                  <span>SDKs ready for Java, Node.js, PHP, and Python with full OpenAPI spec</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-body">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                  <span>Historical records dating back to 1998, volatility indices &amp; monthly averages</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-body tabular-nums">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                  <span>Transparent tiers: Core ($599/yr), Intermediate ($1,799/yr), Prime ($4,499/yr)</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link href="/api-platform" className="btn-primary">
                  Explore API Docs &amp; SDKs &rarr;
                </Link>
                <Link href="/api-platform/pricing" className="btn-secondary">
                  View API Pricing
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 bg-navy text-white p-6 rounded-2xl border border-navy-border type-caption overflow-x-auto">
              <div className="flex items-center justify-between pb-3 border-b border-navy-border text-[#C9D3E3]">
                <span>cURL Request</span>
                <span className="px-2 py-0.5 rounded-full bg-gain-bg text-gain-text font-semibold text-[11px] tabular-nums">
                  200 OK · 24ms
                </span>
              </div>
              <pre className="py-4 text-[#DBE6FD]">
{`curl -X GET "https://api.vectisx.com/v1/convert_from?from=USD&to=EUR&amount=1000" \\
  -H "Authorization: Bearer vx_live_secret_key"`}
              </pre>
              <div className="pt-3 border-t border-navy-border text-[#C9D3E3]">
                <span className="text-[#C9D3E3] block mb-1">{'// JSON Response payload'}</span>
                <pre className="text-white">
{`{
  "terms": "https://vectisx.com/legal/privacy",
  "privacy": "https://vectisx.com/legal/privacy",
  "from": "USD",
  "amount": 1000.00,
  "timestamp": "2026-11-08T22:59:00Z",
  "to": [
    {
      "quotecurrency": "EUR",
      "mid": 0.8958,
      "bid": 0.8956,
      "ask": 0.8960,
      "high24h": 0.8982,
      "low24h": 0.8934,
      "change24h_pct": "+0.28"
    }
  ]
}`}
                </pre>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* A-Z Honest Directory */}
      <section className="section-padding bg-page">
        <RevealSection className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="type-h2 text-navy">The VectisX A–Z Honest Directory</h2>
            <p className="type-caption text-caption mt-2 mx-auto">
              Every currency intelligence tool, chart, benchmark, and integration available across our platform.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 type-caption text-body">
            {[
              ['A', 'Alerts, Accounts, API, Analytics'],
              ['B', 'Business, Benchmarks'],
              ['C', 'Converter, Charts, Tables, Central Bank Rates'],
              ['D', 'Dashboard, Data Feeds, Docs'],
              ['E', 'Email Updates, ERP Integrations'],
              ['F', 'Forward Contracts, FX Risk'],
              ['G', 'Global Benchmarks, GitHub SDKs'],
              ['H', 'Historical Rates, Hedging'],
              ['I', 'Institutional Feeds, Integrations'],
              ['L', 'Limit Orders, Live Rates, Licenses'],
              ['M', 'Multi-Currency, Mid-Market Rate'],
              ['O', 'Options, OpenAPI Spec'],
              ['P', 'Partner Program, Pricing Plans'],
              ['R', 'Rate Alerts, Referral, Rate Blender'],
              ['S', 'Security, Sitemap, SOC 2'],
              ['T', 'Tools, Tables, Time-Frame Queries'],
              ['U', 'User Roles, Units-per-Base'],
              ['V', 'Volatility Indices, Vaults'],
            ].map(([letter, desc], idx) => (
              <RevealCard key={letter} index={idx}>
                <div className="card p-4 bg-white h-full">
                  <strong className="text-navy font-semibold block mb-1">{letter}</strong>
                  <span>{desc}</span>
                </div>
              </RevealCard>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/sitemap-page"
              className="inline-flex items-center min-h-[44px] type-caption text-primary font-semibold hover:text-primary-hover hover:underline"
            >
              View comprehensive sitemap and all URL routes &rarr;
            </Link>
          </div>
        </RevealSection>
      </section>
    </div>
  );
}
