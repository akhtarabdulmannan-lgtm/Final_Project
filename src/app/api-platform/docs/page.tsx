'use client';

import Link from 'next/link';
import { useState } from 'react';
import { RevealCard, RevealSection, StepConnector } from '@/components/ui/MotionPrimitives';

export default function ApiDocsPage() {
  const [activeTab, setActiveTab] = useState<'convert' | 'historic' | 'monthly'>('convert');

  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Developer Hub</span>
          <h1 className="type-h1 text-navy mt-2">
            VectisX API Documentation &amp; Reference
          </h1>
          <p className="type-body text-body mt-3">
            Integrate certified mid-market foreign exchange rates, historical archives back to 1998, and central bank benchmarks into your web applications, ERPs, and automated workflows.
          </p>
        </div>

        {/* Quickstart with StepConnector */}
        <RevealSection className="card p-6 sm:p-8 bg-white mb-8">
          <h2 className="type-h3 text-navy mb-6">Quickstart in 3 Steps</h2>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] -translate-y-1/2 z-0 pointer-events-none">
              <StepConnector />
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-body">
              <RevealCard index={0}>
                <div className="p-5 rounded-2xl bg-page border border-surface-200 h-full">
                  <strong className="font-semibold text-navy block mb-1">Step 1: Obtain API Key</strong>
                  Sign up for a developer account and copy your secret key from the console.
                </div>
              </RevealCard>
              <RevealCard index={1}>
                <div className="p-5 rounded-2xl bg-page border border-surface-200 h-full">
                  <strong className="font-semibold text-navy block mb-1">Step 2: Add Auth Header</strong>
                  Pass{' '}
                  <code className="bg-primary-pale text-primary border border-primary-border px-1.5 py-0.5 rounded type-caption font-semibold font-sans">
                    Authorization: Bearer YOUR_KEY
                  </code>{' '}
                  with every HTTP request.
                </div>
              </RevealCard>
              <RevealCard index={2}>
                <div className="p-5 rounded-2xl bg-page border border-surface-200 h-full">
                  <strong className="font-semibold text-navy block mb-1">Step 3: Query Endpoint</strong>
                  Call{' '}
                  <code className="bg-primary-pale text-primary border border-primary-border px-1.5 py-0.5 rounded type-caption font-semibold font-sans">
                    GET /v1/convert_from
                  </code>{' '}
                  to receive real-time JSON responses.
                </div>
              </RevealCard>
            </div>
          </div>
        </RevealSection>

        {/* Interactive Endpoint Explorer */}
        <RevealSection className="card p-6 sm:p-8 bg-white mb-12">
          <div className="flex flex-wrap items-center justify-between pb-6 border-b border-surface-200 gap-4">
            <div>
              <span className="type-caption font-semibold text-caption uppercase">Core Endpoints</span>
              <h2 className="type-h2 text-navy mt-1">REST API Specifications</h2>
            </div>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="API endpoints">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'convert'}
                onClick={() => setActiveTab('convert')}
                className={`min-h-[44px] px-4 py-2 rounded-xl type-caption font-semibold border transition-colors duration-150 ease-fintech ${
                  activeTab === 'convert'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-page text-navy border-surface-200 hover:border-surface-300'
                }`}
              >
                GET /v1/convert_from
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'historic'}
                onClick={() => setActiveTab('historic')}
                className={`min-h-[44px] px-4 py-2 rounded-xl type-caption font-semibold border transition-colors duration-150 ease-fintech ${
                  activeTab === 'historic'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-page text-navy border-surface-200 hover:border-surface-300'
                }`}
              >
                GET /v1/historic_rate
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'monthly'}
                onClick={() => setActiveTab('monthly')}
                className={`min-h-[44px] px-4 py-2 rounded-xl type-caption font-semibold border transition-colors duration-150 ease-fintech ${
                  activeTab === 'monthly'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-page text-navy border-surface-200 hover:border-surface-300'
                }`}
              >
                GET /v1/monthly_average
              </button>
            </div>
          </div>

          <div className="pt-6">
            {activeTab === 'convert' && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary-pale border border-primary-border text-primary type-caption font-semibold">
                    GET https://api.vectisx.com/v1/convert_from
                  </div>
                  <p className="text-sm text-body mt-2">
                    Calculates conversion rates from a base currency into one or multiple target quote currencies using certified mid-market rates.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <h3 className="type-caption font-semibold text-navy uppercase tracking-wider mb-2">
                    Query Parameters
                  </h3>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-page type-caption font-semibold text-caption uppercase border-b border-surface-200">
                        <th className="py-3 px-3">Parameter</th>
                        <th className="py-3 px-3">Type</th>
                        <th className="py-3 px-3">Required</th>
                        <th className="py-3 px-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-200">
                      <tr>
                        <td className="py-3 px-3 font-semibold text-navy">from</td>
                        <td className="py-3 px-3 text-caption">string</td>
                        <td className="py-3 px-3 text-gain font-semibold">Yes</td>
                        <td className="py-3 px-3 text-body">3-letter ISO 4217 currency code (e.g. USD, EUR)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-semibold text-navy">to</td>
                        <td className="py-3 px-3 text-caption">string</td>
                        <td className="py-3 px-3 text-caption">Optional</td>
                        <td className="py-3 px-3 text-body">Comma-separated target currencies (e.g. EUR,GBP,JPY)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-semibold text-navy">amount</td>
                        <td className="py-3 px-3 text-caption">number</td>
                        <td className="py-3 px-3 text-caption">Optional</td>
                        <td className="py-3 px-3 text-body tabular-nums">Numeric amount to convert (defaults to 1.00)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-navy text-white border border-navy-border p-6 rounded-2xl type-caption tabular-nums">
                  <span className="text-[#C9D3E3] block mb-2">{'// 200 OK Response Payload'}</span>
                  <pre className="text-[#DBE6FD] overflow-x-auto font-sans">
{`{
  "timestamp": "2026-11-08T22:59:00Z",
  "from": "USD",
  "amount": 1000.0,
  "to": [
    {
      "quotecurrency": "EUR",
      "mid": 0.8534,
      "bid": 0.8532,
      "ask": 0.8536,
      "change24h_pct": "+0.28"
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'historic' && (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary-pale border border-primary-border text-primary type-caption font-semibold">
                  GET https://api.vectisx.com/v1/historic_rate
                </div>
                <p className="text-sm text-body">
                  Query daily closing FX exchange rates for any historical date back to January 1, 1998.
                </p>
                <div className="bg-navy text-white border border-navy-border p-6 rounded-2xl type-caption tabular-nums">
                  <pre className="text-[#DBE6FD] overflow-x-auto font-sans">
                    {`// GET /v1/historic_rate?date=2024-01-15&from=USD&to=EUR`}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'monthly' && (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary-pale border border-primary-border text-primary type-caption font-semibold">
                  GET https://api.vectisx.com/v1/monthly_average
                </div>
                <p className="text-sm text-body">
                  Compute audit-compliant monthly weighted average rates for corporate accounting and tax filing.
                </p>
                <div className="bg-navy text-white border border-navy-border p-6 rounded-2xl type-caption tabular-nums">
                  <pre className="text-[#DBE6FD] overflow-x-auto font-sans">
                    {`// GET /v1/monthly_average?year=2024&month=10&from=USD&to=EUR`}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </RevealSection>

        {/* OpenAPI footer link */}
        <div className="flex flex-wrap justify-between items-center type-caption text-caption gap-2">
          <span>Complete specification follows OpenAPI 3.0.3 standards.</span>
          <Link
            href="/api-platform/pricing"
            className="inline-flex items-center min-h-[44px] text-primary font-semibold hover:text-primary-hover hover:underline"
          >
            Upgrade your plan for unlimited requests &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
