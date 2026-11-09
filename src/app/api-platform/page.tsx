'use client';

import Link from 'next/link';
import { ArrowRight, Check, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { RevealCard, RevealSection } from '@/components/ui/MotionPrimitives';

export default function ApiPlatformPage() {
  const [copiedLang, setCopiedLang] = useState<string | null>(null);

  const sdks = [
    {
      lang: 'Node.js',
      install: 'npm install @vectisx/currency-sdk',
      desc: 'Full TypeScript typings, automatic retries & promise-based interface.',
    },
    {
      lang: 'Python',
      install: 'pip install vectisx-fx',
      desc: 'Compatible with Python 3.8+, Pandas integration for time-series analysis.',
    },
    {
      lang: 'Java',
      install: 'implementation "com.vectisx:fx-client:2.4.0"',
      desc: 'Spring Boot starter, enterprise connection pooling & thread-safe clients.',
    },
    {
      lang: 'PHP',
      install: 'composer require vectisx/currency-api',
      desc: 'PSR-18 HTTP client compliance, Laravel & Symfony service providers.',
    },
  ];

  const handleCopy = (lang: string, cmd: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(cmd).catch(() => {});
    }
    setCopiedLang(lang);
    setTimeout(() => {
      setCopiedLang((prev) => (prev === lang ? null : prev));
    }, 800);
  };

  return (
    <div className="min-h-screen bg-page">
      {/* Hero */}
      <section className="bg-navy text-white border-b border-navy-border py-16 sm:py-24">
        <div className="container-vx">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="badge-brand">VectisX Currency Data API</span>
              <h1 className="type-h1 text-white">
                Enterprise Currency Data at Millisecond Speeds
              </h1>
              <p className="type-body text-[#C9D3E3]">
                Connect directly to our proprietary Rate Blender engine. 220+ global currencies, precious metals, selected cryptocurrencies, and central bank benchmark feeds updated as often as every 60 seconds.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/api-platform/pricing" className="btn-primary btn-lg">
                  View API Plans &amp; Pricing <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                </Link>
                <Link
                  href="/api-platform/docs"
                  className="inline-flex items-center justify-center min-h-[48px] rounded-xl border border-navy-border bg-navy-elevated px-8 py-4 text-base font-semibold text-white hover:border-[#DBE6FD] transition-colors duration-150 ease-fintech"
                >
                  Interactive API Docs
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4 type-caption text-[#C9D3E3] tabular-nums">
                <span>99.99% Uptime SLA</span>
                <span>• Sub-40ms Latency</span>
                <span>• ISO 4217 Standard</span>
              </div>
            </div>

            {/* Code Sample */}
            <div className="lg:col-span-6 bg-navy-elevated border border-navy-border rounded-2xl p-6 text-xs overflow-x-auto text-white tabular-nums">
              <div className="flex items-center justify-between pb-3 border-b border-navy-border text-[#C9D3E3] type-caption">
                <span>GET /v1/convert_from</span>
                <span className="px-2.5 py-0.5 rounded-full bg-gain-bg text-gain-text font-semibold">
                  200 OK (28ms)
                </span>
              </div>
              <pre className="py-4 text-[#DBE6FD] font-sans">
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
              <div className="pt-3 border-t border-navy-border text-[#C9D3E3]">
                <span className="text-[#C9D3E3] block mb-1">{'// Normalized Response'}</span>
                <pre className="text-white font-sans tabular-nums">
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
        <RevealSection className="container-vx">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="badge-brand">Algorithmic Precision</span>
              <h2 className="type-h2 text-navy">
                The Proprietary VectisX Rate Blender™
              </h2>
              <p className="type-body text-body">
                Raw data from financial brokers frequently contains anomalies, erratic spikes, and latency gaps. Our proprietary Rate Blender algorithms continuously aggregate rates from over 100 global liquidity providers, central banks, and market makers.
              </p>
              <p className="type-body text-body">
                The engine applies statistical outlier detection, cross-validation, and weighted volume averaging in real time to produce clean, tamper-proof, and certified mid-market rates for mission-critical ERPs and consumer applications.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-page border border-surface-200">
                  <div className="text-2xl font-heading font-semibold text-navy tabular-nums">100+</div>
                  <div className="type-caption text-caption mt-1">Simultaneous Liquidity Feeds</div>
                </div>
                <div className="p-4 rounded-2xl bg-page border border-surface-200">
                  <div className="text-2xl font-heading font-semibold text-navy tabular-nums">0.001%</div>
                  <div className="type-caption text-caption mt-1">Anomaly Outlier Rejection</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-page p-8 rounded-2xl border border-surface-200 space-y-4">
              <h3 className="type-h3 text-navy mb-4">Rate Blender Filtering Pipeline</h3>
              <div className="space-y-3 tabular-nums">
                <div className="p-3.5 bg-white rounded-xl border border-surface-200 type-caption flex items-center justify-between gap-2">
                  <span className="font-semibold text-navy">1. Liquidity Ingestion (100+ Global Providers)</span>
                  <span className="text-navy font-semibold">15,000 ticks/sec</span>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-surface-200 type-caption flex items-center justify-between gap-2">
                  <span className="font-semibold text-navy">2. Real-Time Outlier &amp; Spike Filtering</span>
                  <span className="text-navy font-semibold">Latency &lt;2ms</span>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-surface-200 type-caption flex items-center justify-between gap-2">
                  <span className="font-semibold text-navy">3. Weighted Volume Averaging</span>
                  <span className="badge-gain text-[11px]">Active</span>
                </div>
                <div className="p-3.5 bg-navy text-white rounded-xl border border-navy-border type-caption flex items-center justify-between gap-2">
                  <span className="font-semibold">4. Certified Mid-Market Output Stream</span>
                  <span className="font-semibold text-[#DBE6FD]">99.999% Accurate</span>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Official SDKs */}
      <section className="section-padding bg-page border-b border-surface-200">
        <RevealSection className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="badge-brand">Developer Tooling</span>
            <h2 className="type-h2 text-navy mt-2">
              Official SDKs &amp; Libraries
            </h2>
            <p className="type-body text-caption mt-2 mx-auto">
              Start querying real-time rates in minutes with our battle-tested open-source libraries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sdks.map((s, idx) => (
              <RevealCard key={s.lang} index={idx}>
                <div className="card p-6 bg-white space-y-3 h-full flex flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="type-h3 text-navy">{s.lang} SDK</h3>
                    <span className="badge-brand">Official</span>
                  </div>
                  <p className="text-sm text-body flex-1">{s.desc}</p>
                  <div className="pl-4 pr-2 py-1.5 rounded-xl bg-navy text-white type-caption flex items-center justify-between gap-2">
                    <code className="font-sans truncate">{s.install}</code>
                    <button
                      type="button"
                      onClick={() => handleCopy(s.lang, s.install)}
                      aria-label={`Copy ${s.lang} install command`}
                      className="inline-flex items-center gap-1.5 min-h-[44px] px-3 rounded-lg text-[#DBE6FD] hover:bg-navy-elevated transition-colors duration-150 ease-fintech font-semibold flex-shrink-0"
                    >
                      {copiedLang === s.lang ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#DBE6FD]" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </RevealCard>
            ))}
          </div>

          <div className="mt-8 text-center flex flex-wrap justify-center items-center gap-4 type-caption font-semibold">
            <Link
              href="/api-platform/docs"
              className="inline-flex items-center min-h-[44px] text-primary hover:text-primary-hover hover:underline gap-1"
            >
              Swagger 3.0 / OpenAPI Specification <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
            <span className="text-surface-300" aria-hidden="true">
              |
            </span>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-[44px] text-primary hover:text-primary-hover hover:underline gap-1"
            >
              GitHub Repository <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </RevealSection>
      </section>

      {/* Pricing CTA */}
      <section className="section-padding bg-white">
        <RevealSection className="container-vx">
          <div className="card-dark p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="type-h3 sm:text-[28px] sm:leading-[36px] text-white">
                Find the right plan for your application
              </h2>
              <p className="type-caption text-[#C9D3E3] mt-2">
                Flexible tiers starting from $599/year. Free developer sandboxes available.
              </p>
            </div>
            <Link href="/api-platform/pricing" className="btn-primary btn-lg whitespace-nowrap">
              Compare API Plans <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </Link>
          </div>
        </RevealSection>
      </section>
    </div>
  );
}
