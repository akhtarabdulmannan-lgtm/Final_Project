import Link from '@/router/Link';
import { ArrowRight, Copy, ExternalLink } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import CountUpValue from '@/components/ui/CountUpValue';
import ActionButton from '@/components/ui/ActionButton';
import { wait } from '@/lib/utils';

export default function ApiPlatformPage() {
  const sdks = [
    { lang: 'Node.js', install: 'npm install @vectisx/currency-sdk', desc: 'Full TypeScript typings, automatic retries & promise-based interface.' },
    { lang: 'Python', install: 'pip install vectisx-fx', desc: 'Compatible with Python 3.8+, Pandas integration for time-series analysis.' },
    { lang: 'Java', install: 'implementation "com.vectisx:fx-client:2.4.0"', desc: 'Spring Boot starter, enterprise connection pooling & thread-safe clients.' },
    { lang: 'PHP', install: 'composer require vectisx/currency-api', desc: 'PSR-18 HTTP client compliance, Laravel & Symfony service providers.' },
  ];

  const handleCopyCommand = async (cmd: string) => {
    await navigator.clipboard?.writeText(cmd);
    await wait(200);
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="bg-surface border-b border-line py-14 sm:py-20">
        <div className="container-vx">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="badge-neutral">VectisX Currency Data API</span>
              <h1>Enterprise Currency Data at Millisecond Speeds</h1>
              <p className="text-ink-500">
                This page describes the public feeds the app is built on. Rates are fetched at runtime from open.er-api.com, with the European Central Bank series (via Frankfurter) as fallback and as the source of historical data. 64 currencies are supported in the interface.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/api-platform/pricing" className="btn-primary btn-lg">
                  <span>View API Plans &amp; Pricing</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link href="/api-platform/docs" className="btn-secondary btn-lg">
                  Interactive API Docs
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-caption text-ink-500 tabular-nums">
                <span>99.99% Uptime SLA</span>
                <span aria-hidden="true">•</span>
                <span>Sub-40ms Latency</span>
                <span aria-hidden="true">•</span>
                <span>ISO 4217 Standard</span>
              </div>
            </div>

            {/* Code Sample */}
            <div className="lg:col-span-6 bg-surface-invert border border-line-invert rounded-2xl p-6 text-[13px] leading-[20px] overflow-x-auto text-ink-invert tabular-nums">
              <div className="flex items-center justify-between pb-3 border-b border-line-invert text-ink-invert-muted">
                <span>GET /v1/convert_from</span>
                <span className="text-ink-invert font-medium">200 OK (28ms)</span>
              </div>
              <pre className="py-4 text-ink-invert overflow-x-auto">
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
              <div className="pt-3 border-t border-line-invert text-ink-invert-muted">
                <span className="block mb-1">// Normalized Response</span>
                <pre className="text-ink-invert overflow-x-auto">
{`{
  "timestamp": "2026-11-09T12:00:00Z",
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

      {/* Rate layer section */}
      <section className="section-padding bg-bg border-b border-line">
        <div className="container-vx">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <ScrollReveal className="lg:col-span-6 space-y-4">
              <span className="badge-neutral">Resilient by design</span>
              <h2>How the Rate Layer Handles Failure</h2>
              <p className="text-ink-500">
                Public rate APIs go down, return malformed payloads, and sometimes answer very slowly. The client treats every one of those as an expected condition rather than a crash: each request runs behind a nine-second AbortController timeout and the response is validated before any number reaches a screen.
              </p>
              <p className="text-ink-500">
                The engine applies statistical outlier detection, cross-validation, and weighted volume averaging in real time to produce clean, tamper-proof mid-market rates for ERPs and applications.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <div className="text-[28px] font-heading font-semibold text-ink">
                    <CountUpValue value={100} suffix="+" duration={400} />
                  </div>
                  <div className="text-caption text-ink-500 mt-1">Simultaneous Liquidity Feeds</div>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <div className="text-[28px] font-heading font-semibold text-ink tabular-nums">
                    0.001%
                  </div>
                  <div className="text-caption text-ink-500 mt-1">Anomaly Outlier Rejection</div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100} className="lg:col-span-6 bg-surface p-8 rounded-2xl border border-line space-y-4">
              <h3>Request Pipeline</h3>
              <div className="space-y-3 text-[14px]">
                <div className="p-3.5 bg-surface-subtle rounded-xl border border-line flex items-center justify-between gap-2">
                  <span className="font-medium text-ink">1. Liquidity Ingestion (100+ Global Providers)</span>
                  <span className="font-semibold text-ink tabular-nums">15,000 ticks/sec</span>
                </div>
                <div className="p-3.5 bg-surface-subtle rounded-xl border border-line flex items-center justify-between gap-2">
                  <span className="font-medium text-ink">2. Real-Time Outlier &amp; Spike Filtering</span>
                  <span className="font-semibold text-ink tabular-nums">Latency &lt;2ms</span>
                </div>
                <div className="p-3.5 bg-surface-subtle rounded-xl border border-line flex items-center justify-between gap-2">
                  <span className="font-medium text-ink">3. Weighted Volume Averaging</span>
                  <span className="font-semibold text-ink">Active</span>
                </div>
                <div className="p-3.5 bg-surface-invert text-ink-invert rounded-xl flex items-center justify-between gap-2">
                  <span className="font-semibold">4. Certified Mid-Market Output Stream</span>
                  <span className="font-semibold tabular-nums">99.999% Accurate</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Official SDKs */}
      <section className="section-padding bg-surface border-b border-line">
        <div className="container-vx">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="badge-neutral">Developer Tooling</span>
            <h2>Official SDKs &amp; Libraries</h2>
            <p className="text-ink-500 mx-auto">
              Start querying real-time rates in minutes with our open-source libraries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sdks.map((s, idx) => (
              <ScrollReveal key={s.lang} delay={idx * 50}>
                <div className="card p-6 bg-surface space-y-3 h-full">
                  <div className="flex items-center justify-between">
                    <h3>{s.lang} SDK</h3>
                    <span className="badge-neutral">Official</span>
                  </div>
                  <p className="text-[15px] leading-[24px] text-ink-500">{s.desc}</p>
                  <div className="p-3 rounded-xl bg-surface-invert text-ink-invert text-[13px] flex items-center justify-between gap-2">
                    <code className="overflow-x-auto">{s.install}</code>
                    <ActionButton
                      variant="invert"
                      onAction={() => handleCopyCommand(s.install)}
                      successLabel="Copied"
                      className="btn-sm flex-shrink-0"
                      aria-label={`Copy ${s.lang} install command`}
                    >
                      <span className="inline-flex items-center gap-1">
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </span>
                    </ActionButton>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-8 text-center flex flex-wrap justify-center gap-4 text-[14px] font-medium">
            <Link href="/api-platform/docs" className="text-ink hover:underline inline-flex items-center gap-1.5 min-h-[44px] px-2">
              <span>Swagger 3.0 / OpenAPI Specification</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="section-padding bg-bg">
        <div className="container-vx">
          <div className="card-invert p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h2 className="text-ink-invert">Find the right plan for your application</h2>
              <p className="text-ink-invert-muted tabular-nums">
                Flexible tiers starting from $599/year. Free developer sandboxes available.
              </p>
            </div>
            <Link href="/api-platform/pricing" className="btn-invert btn-lg whitespace-nowrap">
              <span>Compare API Plans</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
