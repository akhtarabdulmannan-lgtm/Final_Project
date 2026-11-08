'use client';

import Link from 'next/link';
import { 
  Code2, CheckCircle2, Zap, ShieldCheck, ArrowRight, 
  Terminal, Database, RefreshCw, Cpu, Layers, ExternalLink
} from 'lucide-react';

export default function ApiPlatformPage() {
  const sdks = [
    { lang: 'Node.js', install: 'npm install @vectisx/currency-sdk', desc: 'Full TypeScript typings, automatic retries & promise-based interface.' },
    { lang: 'Python', install: 'pip install vectisx-fx', desc: 'Compatible with Python 3.8+, Pandas integration for time-series analysis.' },
    { lang: 'Java', install: 'implementation "com.vectisx:fx-client:2.4.0"', desc: 'Spring Boot starter, enterprise connection pooling & thread-safe clients.' },
    { lang: 'PHP', install: 'composer require vectisx/currency-api', desc: 'PSR-18 HTTP client compliance, Laravel & Symfony service providers.' },
  ];

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800 text-white py-16 sm:py-24">
        <div className="container-vx">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="badge-teal">VectisX Currency Data API</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-tight">
                Enterprise Currency Data at Millisecond Speeds
              </h1>
              <p className="text-surface-300 text-base leading-relaxed">
                Connect directly to our proprietary Rate Blender engine. 220+ global currencies, precious metals, selected cryptocurrencies, and central bank benchmark feeds updated as often as every 60 seconds.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/api-platform/pricing" className="btn-teal btn-lg">
                  View API Plans & Pricing <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link href="/api-platform/docs" className="btn-ghost text-white border border-white/20 hover:bg-white/10 btn-lg">
                  Interactive API Docs
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4 text-xs text-surface-400">
                <span>99.99% Uptime SLA</span>
                <span>• Sub-40ms Latency</span>
                <span>• ISO 4217 Standard</span>
              </div>
            </div>

            {/* Code Sample */}
            <div className="lg:col-span-6 bg-surface-900 border border-white/10 rounded-3xl p-6 font-mono text-xs shadow-2xl overflow-x-auto text-surface-200">
              <div className="flex items-center justify-between pb-3 border-b border-surface-800 text-surface-400 text-[11px]">
                <span>GET /v1/convert_from</span>
                <span className="text-emerald-400">200 OK (28ms)</span>
              </div>
              <pre className="py-4 text-emerald-400">
{`// Initialize VectisX FX Client
import { VectisXClient } from '@vectisx/currency-sdk';

const vx = new VectisXClient({
  apiKey: process.env.VECTISX_API_KEY
});

const rates = await vx.convertFrom({
  from: 'USD',
  to: ['EUR', 'GBP', 'JPY', 'INR'],
  amount: 1000
});`}
              </pre>
              <div className="pt-3 border-t border-surface-800 text-surface-300">
                <span className="text-surface-500 block mb-1">// Normalized Response</span>
                <pre className="text-surface-300">
{`{
  "timestamp": "2026-11-08T22:59:00Z",
  "from": "USD",
  "amount": 1000.00,
  "to": [
    { "currency": "EUR", "mid": 0.8534, "bid": 0.8532, "ask": 0.8536 },
    { "currency": "GBP", "mid": 0.7312, "bid": 0.7310, "ask": 0.7314 },
    { "currency": "JPY", "mid": 149.52, "bid": 149.49, "ask": 149.55 },
    { "currency": "INR", "mid": 83.45, "bid": 83.42, "ask": 83.48 }
  ]
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proprietary Rate Blender Section */}
      <section className="section-padding bg-white border-b border-surface-200">
        <div className="container-vx">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="badge-brand">Algorithmic Precision</span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-surface-900 tracking-tight">
                The Proprietary VectisX Rate Blender™
              </h2>
              <p className="text-surface-600 text-sm leading-relaxed">
                Raw data from financial brokers frequently contains anomalies, erratic spikes, and latency gaps. Our proprietary Rate Blender algorithms continuously aggregate rates from over 100 global liquidity providers, central banks, and market makers.
              </p>
              <p className="text-surface-600 text-sm leading-relaxed">
                The engine applies statistical outlier detection, cross-validation, and weighted volume averaging in real time to produce clean, tamper-proof, and certified mid-market rates for mission-critical ERPs and consumer applications.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-surface-50 border border-surface-100">
                  <div className="text-2xl font-extrabold text-brand-600 font-mono">100+</div>
                  <div className="text-xs text-surface-500 mt-1">Simultaneous Liquidity Feeds</div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-50 border border-surface-100">
                  <div className="text-2xl font-extrabold text-teal-600 font-mono">0.001%</div>
                  <div className="text-xs text-surface-500 mt-1">Anomaly Outlier Rejection</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-surface-50 p-8 rounded-3xl border border-surface-200 space-y-4">
              <h3 className="font-bold text-surface-900 text-base mb-4">Rate Blender Filtering Pipeline</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-surface-200 text-xs flex items-center justify-between">
                  <span className="font-semibold text-surface-700">1. Liquidity Ingestion (100+ Global Providers)</span>
                  <span className="text-emerald-600 font-bold">15,000 ticks/sec</span>
                </div>
                <div className="p-3 bg-white rounded-xl shadow-sm border border-surface-200 text-xs flex items-center justify-between">
                  <span className="font-semibold text-surface-700">2. Real-Time Outlier & Spike Filtering</span>
                  <span className="text-brand-500 font-bold">Latency &lt;2ms</span>
                </div>
                <div className="p-3 bg-white rounded-xl shadow-sm border border-surface-200 text-xs flex items-center justify-between">
                  <span className="font-semibold text-surface-700">3. Weighted Volume Averaging</span>
                  <span className="text-teal-600 font-bold">Active</span>
                </div>
                <div className="p-3 bg-brand-500 text-white rounded-xl shadow-md text-xs flex items-center justify-between">
                  <span className="font-bold">4. Certified Mid-Market Output Stream</span>
                  <span className="font-mono font-bold">99.999% Accurate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official SDKs */}
      <section className="section-padding bg-surface-50 border-b border-surface-200">
        <div className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="badge-brand">Developer Tooling</span>
            <h2 className="text-3xl font-heading font-bold text-surface-900 mt-2">
              Official SDKs & Libraries
            </h2>
            <p className="text-sm text-surface-500 mt-1">
              Start querying real-time rates in minutes with our battle-tested open-source libraries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sdks.map(s => (
              <div key={s.lang} className="card p-6 bg-white space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-surface-900 text-lg font-heading">{s.lang} SDK</h3>
                  <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">Official</span>
                </div>
                <p className="text-xs text-surface-600 leading-relaxed">{s.desc}</p>
                <div className="p-3 rounded-xl bg-surface-900 text-surface-100 font-mono text-xs flex items-center justify-between">
                  <code>{s.install}</code>
                  <span className="text-surface-400 text-[10px]">copy</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center flex justify-center gap-4 text-xs font-semibold">
            <Link href="/api-platform/docs" className="text-brand-500 hover:underline flex items-center gap-1">
              Swagger 3.0 / OpenAPI Specification <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <span className="text-surface-300">|</span>
            <Link href="https://github.com" target="_blank" className="text-brand-500 hover:underline flex items-center gap-1">
              GitHub Repository <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="section-padding bg-white">
        <div className="container-vx">
          <div className="card p-8 sm:p-12 bg-gradient-to-r from-brand-900 to-brand-950 text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading">Find the right plan for your application</h3>
              <p className="text-xs text-surface-300 mt-2">
                Flexible tiers starting from $599/year. Free developer sandboxes available.
              </p>
            </div>
            <Link href="/api-platform/pricing" className="btn-teal btn-lg whitespace-nowrap">
              Compare API Plans <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
