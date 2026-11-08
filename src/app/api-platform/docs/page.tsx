'use client';

import Link from 'next/link';
import { Terminal, Code2, Copy, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function ApiDocsPage() {
  const [activeTab, setActiveTab] = useState<'convert' | 'historic' | 'monthly' | 'period'>('convert');

  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Developer Hub</span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-surface-900 mt-2">
            VectisX API Documentation & Reference
          </h1>
          <p className="text-surface-600 text-base mt-3 leading-relaxed">
            Integrate certified mid-market foreign exchange rates, historical archives back to 1998, and central bank benchmarks into your web applications, ERPs, and automated workflows.
          </p>
        </div>

        {/* Quickstart */}
        <div className="card p-6 sm:p-8 bg-white mb-8 shadow-sm">
          <h2 className="text-xl font-bold font-heading text-surface-900 mb-4">Quickstart in 3 Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="p-4 rounded-2xl bg-surface-50 border border-surface-200">
              <strong className="text-brand-600 block mb-1">Step 1: Obtain API Key</strong>
              Sign up for a developer account and copy your secret key from the console.
            </div>
            <div className="p-4 rounded-2xl bg-surface-50 border border-surface-200">
              <strong className="text-teal-600 block mb-1">Step 2: Add Auth Header</strong>
              Pass <code className="bg-surface-200 px-1 py-0.5 rounded text-xs">Authorization: Bearer YOUR_KEY</code> with every HTTP request.
            </div>
            <div className="p-4 rounded-2xl bg-surface-50 border border-surface-200">
              <strong className="text-accent-600 block mb-1">Step 3: Query Endpoint</strong>
              Call <code className="bg-surface-200 px-1 py-0.5 rounded text-xs">GET /v1/convert_from</code> to receive real-time JSON responses.
            </div>
          </div>
        </div>

        {/* Interactive Endpoint Explorer */}
        <div className="card p-6 sm:p-8 bg-white mb-12 shadow-sm">
          <div className="flex flex-wrap items-center justify-between pb-6 border-b border-surface-100 gap-4">
            <div>
              <span className="text-xs font-bold text-surface-400 uppercase">Core Endpoints</span>
              <h3 className="text-2xl font-bold font-heading text-surface-900">REST API Specifications</h3>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('convert')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'convert' ? 'bg-brand-500 text-white' : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                }`}
              >
                GET /v1/convert_from
              </button>
              <button 
                onClick={() => setActiveTab('historic')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'historic' ? 'bg-brand-500 text-white' : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                }`}
              >
                GET /v1/historic_rate
              </button>
              <button 
                onClick={() => setActiveTab('monthly')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'monthly' ? 'bg-brand-500 text-white' : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
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
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-mono font-bold">
                    GET https://api.vectisx.com/v1/convert_from
                  </div>
                  <p className="text-xs text-surface-600 mt-2">
                    Calculates conversion rates from a base currency into one or multiple target quote currencies using certified mid-market rates.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <h4 className="text-xs font-bold text-surface-900 uppercase tracking-wider mb-2">Query Parameters</h4>
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-surface-50 text-surface-500 uppercase border-b border-surface-200">
                        <th className="py-2.5 px-3 font-bold">Parameter</th>
                        <th className="py-2.5 px-3 font-bold">Type</th>
                        <th className="py-2.5 px-3 font-bold">Required</th>
                        <th className="py-2.5 px-3 font-bold">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-100 font-mono">
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-brand-600">from</td>
                        <td className="py-2.5 px-3 text-surface-500">string</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">Yes</td>
                        <td className="py-2.5 px-3 font-sans text-surface-700">3-letter ISO 4217 currency code (e.g. USD, EUR)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-brand-600">to</td>
                        <td className="py-2.5 px-3 text-surface-500">string</td>
                        <td className="py-2.5 px-3 text-surface-400">Optional</td>
                        <td className="py-2.5 px-3 font-sans text-surface-700">Comma-separated target currencies (e.g. EUR,GBP,JPY)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-brand-600">amount</td>
                        <td className="py-2.5 px-3 text-surface-500">number</td>
                        <td className="py-2.5 px-3 text-surface-400">Optional</td>
                        <td className="py-2.5 px-3 font-sans text-surface-700">Numeric amount to convert (defaults to 1.00)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-surface-900 text-surface-100 p-6 rounded-2xl font-mono text-xs shadow-lg">
                  <span className="text-surface-400 block mb-2">// 200 OK Response Payload</span>
                  <pre className="text-emerald-400 overflow-x-auto">
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-mono font-bold">
                  GET https://api.vectisx.com/v1/historic_rate
                </div>
                <p className="text-xs text-surface-600">Query daily closing FX exchange rates for any historical date back to January 1, 1998.</p>
                <div className="bg-surface-900 text-surface-100 p-6 rounded-2xl font-mono text-xs">
                  <pre className="text-emerald-400">{`// GET /v1/historic_rate?date=2024-01-15&from=USD&to=EUR`}</pre>
                </div>
              </div>
            )}

            {activeTab === 'monthly' && (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-mono font-bold">
                  GET https://api.vectisx.com/v1/monthly_average
                </div>
                <p className="text-xs text-surface-600">Compute audit-compliant monthly weighted average rates for corporate accounting and tax filing.</p>
                <div className="bg-surface-900 text-surface-100 p-6 rounded-2xl font-mono text-xs">
                  <pre className="text-emerald-400">{`// GET /v1/monthly_average?year=2024&month=10&from=USD&to=EUR`}</pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Swagger / PDF link */}
        <div className="flex flex-wrap justify-between items-center text-xs text-surface-500">
          <span>Complete specification follows OpenAPI 3.0.3 standards.</span>
          <Link href="/api-platform/pricing" className="text-brand-500 font-bold hover:underline">
            Upgrade your plan for unlimited requests &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
