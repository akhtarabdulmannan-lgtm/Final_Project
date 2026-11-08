'use client';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx max-w-4xl">
        <div className="card p-8 sm:p-12 bg-white space-y-6 text-sm text-surface-700 leading-relaxed">
          <h1 className="text-3xl font-heading font-extrabold text-surface-900">Privacy Policy</h1>
          <p className="text-xs text-surface-400">Last updated: November 8, 2026</p>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-surface-900">1. Information We Collect</h2>
            <p>
              We collect information necessary to facilitate international financial transfers and comply with global anti-money laundering regulations, including legal full name, date of birth, residential address, tax ID, and government-issued identification documents.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-surface-900">2. How We Protect Your Financial Data</h2>
            <p>
              VectisX employs AES-256 encryption at rest and TLS 1.3 in transit. Our infrastructure is independently assessed annually under SOC 2 Type II assurance standards. We never sell personal or transaction data to third-party advertisers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-surface-900">3. Regulatory Disclosures</h2>
            <p>
              In accordance with FinCEN and international banking compliance, certain cross-border transactions surpassing statutory thresholds are reported to relevant financial regulatory bodies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
