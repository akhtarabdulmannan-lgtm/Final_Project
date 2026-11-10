'use client';

import Link from 'next/link';
import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StepConnector from '@/components/ui/StepConnector';

export default function ApiDocsPage() {
  const [activeTab, setActiveTab] = useState<'convert' | 'historic' | 'monthly'>('convert');

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">Developer Hub</span>
          <h1>VectisX API Documentation &amp; Reference</h1>
          <p className="text-ink-500">
            Integrate certified mid-market foreign exchange rates, historical archives back to 1998, and central bank benchmarks into your applications and ERPs.
          </p>
        </div>

        {/* Quickstart in 3 Steps */}
        <div className="card p-6 sm:p-8 bg-surface mb-8">
          <h2 className="mb-6">Quickstart in 3 Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <StepConnector className="hidden md:block absolute top-6 left-[16.666%] right-[16.666%] h-px bg-line-strong pointer-events-none" />
            {[
              {
                step: 'Step 1: Obtain API Key',
                body: 'Sign up for a developer account and copy your secret key from the console.',
              },
              {
                step: 'Step 2: Add Auth Header',
                body: 'Pass Authorization: Bearer YOUR_KEY with every HTTP request.',
              },
              {
                step: 'Step 3: Query Endpoint',
                body: 'Call GET /v1/convert_from to receive real-time JSON responses.',
              },
            ].map((item, idx) => (
              <ScrollReveal key={item.step} delay={idx * 50} className="relative z-10">
                <div className="p-5 rounded-xl bg-surface-subtle border border-line h-full space-y-1.5">
                  <strong className="text-ink font-semibold block text-[15px]">{item.step}</strong>
                  <p className="text-[14px] leading-[22px] text-ink-500">{item.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Interactive Endpoint Explorer */}
        <div className="card p-6 sm:p-8 bg-surface mb-10">
          <div className="flex flex-wrap items-center justify-between pb-6 border-b border-line gap-4">
            <div>
              <span className="text-caption font-medium text-ink-500 uppercase">Core Endpoints</span>
              <h2 className="mt-1">REST API Specifications</h2>
            </div>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="API endpoints">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'convert'}
                onClick={() => setActiveTab('convert')}
                className={`px-4 min-h-[44px] rounded-xl text-[13px] font-medium transition-colors duration-150 ${
                  activeTab === 'convert'
                    ? 'bg-primary text-primary-fg'
                    : 'bg-surface-subtle text-ink-700 hover:text-ink border border-line'
                }`}
              >
                GET /v1/convert_from
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'historic'}
                onClick={() => setActiveTab('historic')}
                className={`px-4 min-h-[44px] rounded-xl text-[13px] font-medium transition-colors duration-150 ${
                  activeTab === 'historic'
                    ? 'bg-primary text-primary-fg'
                    : 'bg-surface-subtle text-ink-700 hover:text-ink border border-line'
                }`}
              >
                GET /v1/historic_rate
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'monthly'}
                onClick={() => setActiveTab('monthly')}
                className={`px-4 min-h-[44px] rounded-xl text-[13px] font-medium transition-colors duration-150 ${
                  activeTab === 'monthly'
                    ? 'bg-primary text-primary-fg'
                    : 'bg-surface-subtle text-ink-700 hover:text-ink border border-line'
                }`}
              >
                GET /v1/monthly_average
              </button>
            </div>
          </div>

          <div className="pt-6">
            {activeTab === 'convert' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="badge-gain">GET https://api.vectisx.com/v1/convert_from</div>
                  <p className="text-ink-500">
                    Calculates conversion rates from a base currency into one or multiple target quote currencies using certified mid-market rates.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <h3 className="text-[18px] leading-[24px] mb-3">Query Parameters</h3>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-subtle text-caption text-ink-500 uppercase border-b border-line">
                        <th className="py-3 px-4 font-medium">Parameter</th>
                        <th className="py-3 px-4 font-medium">Type</th>
                        <th className="py-3 px-4 font-medium">Required</th>
                        <th className="py-3 px-4 font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      <tr>
                        <td className="py-3 px-4 font-semibold text-ink">from</td>
                        <td className="py-3 px-4 text-ink-500">string</td>
                        <td className="py-3 px-4 text-gain font-semibold">Yes</td>
                        <td className="py-3 px-4 text-ink-700">3-letter ISO 4217 currency code (e.g. USD, EUR)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-ink">to</td>
                        <td className="py-3 px-4 text-ink-500">string</td>
                        <td className="py-3 px-4 text-ink-500">Optional</td>
                        <td className="py-3 px-4 text-ink-700">Comma-separated target currencies (e.g. EUR,GBP,JPY)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-ink">amount</td>
                        <td className="py-3 px-4 text-ink-500">number</td>
                        <td className="py-3 px-4 text-ink-500">Optional</td>
                        <td className="py-3 px-4 text-ink-700">Numeric amount to convert (defaults to 1.00)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-surface-invert text-ink-invert p-6 rounded-2xl border border-line-invert text-[13px] leading-[20px] tabular-nums">
                  <span className="text-ink-invert-muted block mb-2">// 200 OK Response Payload</span>
                  <pre className="text-ink-invert overflow-x-auto">
{`{
  "timestamp": "2026-11-09T12:00:00Z",
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
                <div className="badge-gain">GET https://api.vectisx.com/v1/historic_rate</div>
                <p className="text-ink-500">
                  Query daily closing FX exchange rates for any historical date back to January 1, 1998.
                </p>
                <div className="bg-surface-invert text-ink-invert p-6 rounded-2xl border border-line-invert text-[13px] overflow-x-auto tabular-nums">
                  <pre>{`GET /v1/historic_rate?date=2024-01-15&from=USD&to=EUR`}</pre>
                </div>
              </div>
            )}

            {activeTab === 'monthly' && (
              <div className="space-y-4">
                <div className="badge-gain">GET https://api.vectisx.com/v1/monthly_average</div>
                <p className="text-ink-500">
                  Compute audit-compliant monthly weighted average rates for corporate accounting and tax filing.
                </p>
                <div className="bg-surface-invert text-ink-invert p-6 rounded-2xl border border-line-invert text-[13px] overflow-x-auto tabular-nums">
                  <pre>{`GET /v1/monthly_average?year=2024&month=10&from=USD&to=EUR`}</pre>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-4 text-[14px] text-ink-500">
          <span>Complete specification follows OpenAPI 3.0.3 standards.</span>
          <Link href="/api-platform/pricing" className="text-ink font-medium hover:underline inline-flex items-center min-h-[44px]">
            Upgrade your plan for unlimited requests &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
