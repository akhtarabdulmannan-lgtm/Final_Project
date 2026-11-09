'use client';

import Link from 'next/link';
import { 
  ArrowRight, ShieldCheck, Zap, Globe2, RefreshCw, 
  Building2, CheckCircle2, Star, TrendingUp, Lock, Award, Users, ChevronRight, HelpCircle
} from 'lucide-react';
import CurrencyConverter from '@/components/sections/CurrencyConverter';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ApiStatusBanner from '@/components/ui/ApiStatusBanner';
import { currencies, popularPairs } from '@/data/currencies';
import { formatRate, formatAmount, get24hChange } from '@/lib/rates';
import { useLiveRates } from '@/hooks/useLiveRates';
import { useCountUp } from '@/hooks';
import { useState } from 'react';

export default function HomePage() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [isInverse, setIsInverse] = useState(false);
  const { isLoading, error, source, lastUpdated, refresh, getLivePairRate } = useLiveRates(baseCurrency);

  const { ref: statsRef, value: businessCount } = useCountUp(17000, 2000);
  const { value: volumeCount } = useCountUp(17, 2000);
  const { value: countriesCount } = useCountUp(190, 2000);
  const { value: yearsCount } = useCountUp(30, 2000);

  const previewCurrencies = currencies.slice(1, 11);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800 text-white pt-12 pb-24 lg:pt-20 lg:pb-32">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00D4AA_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="container-vx relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-teal-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                Live Mid-Market Exchange Rates
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-tight">
                Global Currency <br className="hidden sm:inline" />
                <span className="gradient-text">Intelligence & Analytics</span>
              </h1>
              <p className="text-lg text-surface-300 max-w-xl mx-auto lg:mx-0">
                Compare real-time institutional consensus rates across 200+ world currencies, inspect official central-bank historical trends, and automate cloud rate alerts with zero markup.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-surface-300">
                  <ShieldCheck className="w-5 h-5 text-teal-400" /> FinCEN Registered & SOC 2 Certified
                </div>
                <div className="flex items-center gap-2 text-sm text-surface-300">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> 4.8/5 Rating (500k+ reviews)
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
      <section className="py-16 bg-surface-50 border-b border-surface-200">
        <div className="container-vx">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-brand-500 font-semibold text-sm uppercase tracking-wider">Live Market Monitor</span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-surface-900 mt-1">Popular Currency Pairs</h2>
            </div>
            <Link href="/rates" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 hover:text-brand-600 mt-4 md:mt-0 group">
              View all 100+ live rates <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {popularPairs.slice(0, 8).map(([from, to]) => {
              const rate = getLivePairRate(from, to);
              const change = get24hChange(from, to);
              const isPositive = change >= 0;

              return (
                <Link
                  key={`${from}-${to}`}
                  href={`/converter/${from.toLowerCase()}-to-${to.toLowerCase()}`}
                  className="card group hover:border-brand-500/30 transition-all duration-200 p-5 bg-white"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-heading font-bold text-lg text-surface-900 group-hover:text-brand-500 transition-colors">
                      {from} / {to}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {isPositive ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold text-surface-900 mb-1">
                    {formatRate(rate)}
                  </div>
                  <div className="flex items-center justify-between text-xs text-surface-400">
                    <span>Mid-market rate</span>
                    <span className="text-brand-500 font-medium group-hover:underline">Convert &rsaquo;</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Personal Features: Multi-Currency Account */}
      <section className="section-padding bg-white">
        <div className="container-vx">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="badge-brand">Multi-Currency Account</span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-surface-900 tracking-tight">
                Hold, Convert, and Send with Zero Friction
              </h2>
              <p className="text-base text-surface-600 leading-relaxed">
                Hold balances in USD, GBP, EUR, AUD, CAD and more in one universal account. Convert between 18 major currencies in milliseconds at genuine mid-market rates, and send funds from pre-funded balances anytime.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-50 border border-surface-100">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div>
                    <h3 className="font-bold text-surface-900 text-base">Hold 18+ Currencies</h3>
                    <p className="text-sm text-surface-500 mt-1">Safely keep funds in global reserve currencies without international bank account opening fees.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-50 border border-surface-100">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div>
                    <h3 className="font-bold text-surface-900 text-base">Instant Conversion</h3>
                    <p className="text-sm text-surface-500 mt-1">Switch between currencies in real time whenever exchange rates reach your target threshold.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-50 border border-surface-100">
                  <div className="w-10 h-10 rounded-xl bg-accent-100 text-accent-700 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div>
                    <h3 className="font-bold text-surface-900 text-base">Send from Pre-Funded Balances</h3>
                    <p className="text-sm text-surface-500 mt-1">Avoid debit/credit card merchant fees by transferring instantly from your local wallet balances.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/register" className="btn-primary">
                  Open a Multi-Currency Account Free <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 bg-gradient-to-tr from-brand-50 to-teal-50/50 p-8 sm:p-12 rounded-3xl border border-surface-200">
              <div className="space-y-4">
                {[
                  { code: 'USD', name: 'US Dollar', flag: '🇺🇸', balance: '$24,580.00' },
                  { code: 'EUR', name: 'Euro', flag: '🇪🇺', balance: '€18,240.50' },
                  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', balance: '£12,410.20' },
                  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺', balance: 'A$15,800.00' },
                  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', balance: 'C$9,350.00' },
                ].map((item, idx) => (
                  <div key={item.code} className="bg-white p-4 rounded-2xl shadow-sm border border-surface-100 flex items-center justify-between hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.flag}</span>
                      <div>
                        <div className="font-bold text-surface-900 text-sm">{item.name}</div>
                        <div className="text-xs text-surface-400">{item.code} Balance</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-surface-900 font-mono text-sm">{item.balance}</div>
                      <div className="text-[10px] text-teal-600 font-semibold uppercase">Active Vault</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Currency Intelligence Workflow */}
      <section className="section-padding bg-surface-50 border-y border-surface-200">
        <div className="container-vx">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge-teal">Institutional FX Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-surface-900 mt-2">
              Master Currency Markets in 3 Simple Steps
            </h2>
            <p className="text-surface-600 mt-3 text-base">
              Multi-source consensus data combining live global market feeds with official central-bank benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="card text-center relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-brand-500 text-white flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-lg shadow-brand-500/30">
                1
              </div>
              <h3 className="text-xl font-bold text-surface-900 mb-2">Compare Live Consensus Rates</h3>
              <p className="text-sm text-surface-600 leading-relaxed">
                Select any currency pair and compare real-time institutional consensus rates alongside ECB, SBP, Currency-API, and Open Exchange Rates feeds.
              </p>
            </div>

            <div className="card text-center relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-teal-500 text-white flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-lg shadow-teal-500/30">
                2
              </div>
              <h3 className="text-xl font-bold text-surface-900 mb-2">Inspect Historical Trends</h3>
              <p className="text-sm text-surface-600 leading-relaxed">
                Explore 1-week to 5-year interactive Recharts visualizations backed by official European Central Bank time-series and export CSV datasets.
              </p>
            </div>

            <div className="card text-center relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-accent-500 text-white flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-lg shadow-accent-500/30">
                3
              </div>
              <h3 className="text-xl font-bold text-surface-900 mb-2">Automate Cloud Rate Alerts</h3>
              <p className="text-sm text-surface-600 leading-relaxed">
                Save custom target-rate triggers directly to your Supabase cloud watchlist and monitor live market distance in real time.
              </p>
            </div>
          </div>

          {/* Alerts Callout */}
          <div className="mt-12 bg-gradient-to-r from-brand-600 to-teal-600 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                Cloud Rate Watchlist
              </div>
              <h3 className="text-2xl font-bold font-heading">
                Never Miss Your Target Exchange Rate Again
              </h3>
              <p className="text-sm text-brand-100">
                Create unlimited custom rate alerts synced to your VectisX cloud profile with live threshold tracking.
              </p>
            </div>
            <Link href="/alerts" className="btn-dark whitespace-nowrap bg-white text-brand-900 hover:bg-surface-100 hover:text-brand-900 font-bold px-8 py-3.5">
              Create Free Rate Alert
            </Link>
          </div>
        </div>
      </section>

      {/* Live Rates Table Preview */}
      <section className="section-padding bg-white">
        <div className="container-vx">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="badge-brand">Exchange Matrix</span>
              <h2 className="text-3xl font-heading font-extrabold text-surface-900 mt-2">
                Live Rates for World Currencies
              </h2>
              <p className="text-sm text-surface-500 mt-1">
                Updated every 60 seconds directly from interbank liquidity providers.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-surface-600">Base Currency:</span>
                <select 
                  value={baseCurrency}
                  onChange={(e) => setBaseCurrency(e.target.value)}
                  className="rounded-xl border border-surface-300 px-3 py-1.5 text-sm font-semibold bg-white text-surface-900 outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>

              <button
                onClick={() => setIsInverse(!isInverse)}
                className={`text-xs font-semibold px-3 py-2 rounded-xl border transition-colors ${
                  isInverse ? 'bg-brand-50 border-brand-500 text-brand-600' : 'bg-surface-100 border-surface-200 text-surface-700'
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

          <div className="overflow-x-auto rounded-2xl border border-surface-200 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-50 text-xs font-bold text-surface-500 uppercase border-b border-surface-200">
                  <th className="py-4 px-6">Currency</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6 text-right">{isInverse ? `Units per ${baseCurrency}` : `${baseCurrency} per Unit`}</th>
                  <th className="py-4 px-6 text-right">24h Change</th>
                  <th className="py-4 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 text-sm">
                {previewCurrencies.map((c) => {
                  const rawRate = getLivePairRate(baseCurrency, c.code);
                  const displayRate = isInverse ? (1 / rawRate) : rawRate;
                  const change = get24hChange(baseCurrency, c.code);
                  const isPositive = change >= 0;

                  return (
                    <tr key={c.code} className="hover:bg-surface-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold flex items-center gap-2">
                        <span className="text-xl">{c.flag}</span>
                        <span className="font-mono">{c.code}</span>
                      </td>
                      <td className="py-4 px-6 text-surface-600">{c.name}</td>
                      <td className="py-4 px-6 text-right font-mono font-bold text-surface-900">
                        {formatRate(displayRate)}
                      </td>
                      <td className="py-4 px-6 text-right font-semibold">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs ${
                          isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        }`}>
                          {isPositive ? '+' : ''}{change.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Link 
                          href={`/converter/${baseCurrency.toLowerCase()}-to-${c.code.toLowerCase()}`}
                          className="text-xs font-semibold text-brand-500 hover:text-brand-700 hover:underline"
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

          <div className="mt-6 flex justify-between items-center">
            <Link href="/rates" className="text-sm font-semibold text-brand-500 hover:underline">
              Browse complete list of 100+ global currencies &rarr;
            </Link>
            <Link href="/alerts" className="text-sm font-semibold text-teal-600 hover:underline">
              Set custom rate triggers &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Business Features: Xe Business Account Alternative */}
      <section className="section-padding bg-brand-950 text-white relative overflow-hidden">
        <div className="container-vx relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="badge-teal">VectisX Business Account</span>
              <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight leading-tight">
                Institutional Cross-Border Infrastructure
              </h2>
              <p className="text-surface-300 text-base leading-relaxed">
                Scale your global operations with multi-currency corporate accounts, bulk payouts, forward contracts, and seamless ERP sync without setup or monthly maintenance fees.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="font-bold text-white text-base">Bulk & Batch Payments</h4>
                  <p className="text-xs text-surface-400 mt-1">Upload single CSV files to settle payroll and vendor invoices across 190+ countries in minutes.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="font-bold text-white text-base">Forward Contracts</h4>
                  <p className="text-xs text-surface-400 mt-1">Lock in current FX rates for delivery up to 24 months in the future to hedge against market volatility.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="font-bold text-white text-base">Role-Based Approvals</h4>
                  <p className="text-xs text-surface-400 mt-1">Custom tiered permissions: Creator, Verifier, and Approver roles with audit trails.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="font-bold text-white text-base">ERP Integrations</h4>
                  <p className="text-xs text-surface-400 mt-1">Native connectors for Microsoft Dynamics 365, Sage Intacct, and custom REST API hooks.</p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link href="/business" className="btn-teal">
                  Explore Business Account <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="btn-ghost text-white border border-white/20 hover:bg-white/10">
                  Contact Sales Desk
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 bg-brand-900/60 p-8 rounded-3xl border border-white/10 space-y-6">
              <h3 className="text-xl font-heading font-bold text-white mb-2">Institutional Scale</h3>
              <div ref={statsRef} className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-teal-400 font-heading">
                    {businessCount.toLocaleString()}+
                  </div>
                  <div className="text-xs text-surface-300 mt-1">Active Business Clients</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-brand-400 font-heading">
                    ${volumeCount}B+
                  </div>
                  <div className="text-xs text-surface-300 mt-1">Annual FX Payment Volume</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-accent-400 font-heading">
                    {countriesCount}+
                  </div>
                  <div className="text-xs text-surface-300 mt-1">Destination Countries</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-teal-300 font-heading">
                    {yearsCount}+
                  </div>
                  <div className="text-xs text-surface-300 mt-1">Years Continuous FX Excellence</div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-xs text-surface-400 block mb-3 font-semibold uppercase tracking-wider">Trusted by Industry Leaders</span>
                <div className="flex flex-wrap gap-4 items-center">
                  {['ShopFlow', 'CloudBooks', 'VistaCore', 'PayStream', 'GlobalTech', 'NexaPay'].map((client) => (
                    <span key={client} className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-bold text-surface-200">
                      {client}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer API Section */}
      <section className="section-padding bg-surface-50 border-b border-surface-200">
        <div className="container-vx">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="badge-brand">Developer Platform</span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-surface-900 tracking-tight">
                VectisX Currency Data API
              </h2>
              <p className="text-surface-600 text-base leading-relaxed">
                Connect your platforms to our proprietary Rate Blender engine. Aggregating 100+ global data sources with real-time anomaly filtering for 220+ currencies, precious metals, and selected cryptos.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-surface-700">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <span>Single endpoint: <code className="bg-surface-200 px-2 py-0.5 rounded font-mono text-xs">GET /v1/convert_from</code></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-surface-700">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <span>SDKs ready for Java, Node.js, PHP, and Python with full Swagger spec</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-surface-700">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <span>Historical records dating back to 1998, volatility indices & monthly averages</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-surface-700">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <span>Transparent tiers: Core ($599/yr), Intermediate ($1,799/yr), Prime ($4,499/yr)</span>
                </div>
              </div>

              <div className="pt-2 flex gap-4">
                <Link href="/api-platform" className="btn-primary">
                  Explore API Docs & SDKs &rarr;
                </Link>
                <Link href="/api-platform/pricing" className="btn-secondary">
                  View API Pricing
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 bg-surface-900 text-surface-100 p-6 rounded-3xl font-mono text-xs shadow-2xl overflow-x-auto">
              <div className="flex items-center justify-between pb-3 border-b border-surface-800 text-surface-400">
                <span>cURL Request</span>
                <span className="text-teal-400">200 OK - 24ms</span>
              </div>
              <pre className="py-4 text-emerald-400">
{`curl -X GET "https://api.vectisx.com/v1/convert_from?from=USD&to=EUR&amount=1000" \\
  -H "Authorization: Bearer vx_live_secret_key"`}
              </pre>
              <div className="pt-3 border-t border-surface-800 text-surface-300">
                <span className="text-surface-500 block mb-1">// JSON Response payload</span>
                <pre className="text-surface-200">
{`{
  "terms": "https://vectisx.com/legal/privacy",
  "privacy": "https://vectisx.com/legal/privacy",
  "from": "USD",
  "amount": 1000.00,
  "timestamp": "2026-11-08T22:59:00Z",
  "to": [
    {
      "quotecurrency": "EUR",
      "mid": 0.8534,
      "bid": 0.8532,
      "ask": 0.8536,
      "high24h": 0.8550,
      "low24h": 0.8512,
      "change24h_pct": "+0.28"
    }
  ]
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A-Z Honest Map / Sitemap SEO Directory */}
      <section className="section-padding bg-surface-50 border-t border-surface-200">
        <div className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-surface-900">
              The VectisX A–Z Honest Directory
            </h2>
            <p className="text-sm text-surface-500 mt-2">
              Every currency intelligence tool, chart, benchmark, and integration available across our platform.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-white border border-surface-200">
              <strong className="text-brand-500 block mb-1">A</strong>
              Alerts, Accounts, API, Analytics
            </div>
            <div className="p-3 rounded-xl bg-white border border-surface-200">
              <strong className="text-brand-500 block mb-1">B</strong>
              Business, Batch Payments
            </div>
            <div className="p-3 rounded-xl bg-white border border-surface-200">
              <strong className="text-brand-500 block mb-1">C</strong>
              Converter, Charts, Tables, Central Bank Rates
            </div>
            <div className="p-3 rounded-xl bg-white border border-surface-200">
              <strong className="text-brand-500 block mb-1">D</strong>
              Dashboard, Destinations, Dealer Desk
            </div>
            <div className="p-3 rounded-xl bg-white border border-surface-200">
              <strong className="text-brand-500 block mb-1">E</strong>
              Email Updates, ERP Integrations
            </div>
            <div className="p-3 rounded-xl bg-white border border-surface-200">
              <strong className="text-brand-500 block mb-1">F</strong>
              Forward Contracts, FX Risk, Fee Calculator
            </div>
            <div className="p-3 rounded-xl bg-white border border-surface-200">
              <strong className="text-brand-500 block mb-1">G</strong>
              Global Payments, GitHub SDKs
            </div>
            <div className="p-3 rounded-xl bg-white border border-surface-200">
              <strong className="text-brand-500 block mb-1">H</strong>
              Historical Rates, Hold Balances
            </div>
            <div className="p-3 rounded-xl bg-white border border-surface-200">
              <strong className="text-brand-500 block mb-1">I</strong>
              IBAN Calculator, Integrations
            </div>
            <div className="p-3 rounded-xl bg-white border border-surface-200">
              <strong className="text-brand-500 block mb-1">L</strong>
              Limit Orders, Live Rates, Low Fees
            </div>
            <div className="p-3 rounded-xl bg-white border border-surface-200">
              <strong className="text-brand-500 block mb-1">M</strong>
              Multi-Currency, Mid-Market Rate
            </div>
            <div className="p-3 rounded-xl bg-white border border-surface-200">
              <strong className="text-brand-500 block mb-1">O</strong>
              Options, One-Off Transfers
            </div>
            <div className="p-3 rounded-xl bg-white border border-surface-200">
              <strong className="text-brand-500 block mb-1">P</strong>
              Payments, Partner Program, Pricing Plans
            </div>
            <div className="p-3 rounded-xl bg-white border border-surface-200">
              <strong className="text-brand-500 block mb-1">R</strong>
              Rate Alerts, Referral, Rate Blender
            </div>
            <div className="p-3 rounded-xl bg-white border border-surface-200">
              <strong className="text-brand-500 block mb-1">S</strong>
              Scheduled Payments, Security, Swagger
            </div>
            <div className="p-3 rounded-xl bg-white border border-surface-200">
              <strong className="text-brand-500 block mb-1">T</strong>
              Tools, Tracking, Time-Frame Queries
            </div>
            <div className="p-3 rounded-xl bg-white border border-surface-200">
              <strong className="text-brand-500 block mb-1">U</strong>
              User Roles, Units-per-USD
            </div>
            <div className="p-3 rounded-xl bg-white border border-surface-200">
              <strong className="text-brand-500 block mb-1">V</strong>
              Volatility Indices, Vendor Payouts
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/sitemap-page" className="text-xs text-brand-500 font-semibold hover:underline">
              View comprehensive sitemap and all URL routes &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
