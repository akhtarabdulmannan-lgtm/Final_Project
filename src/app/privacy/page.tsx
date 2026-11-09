'use client';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx max-w-4xl">
        <div className="card p-8 sm:p-12 bg-white space-y-6">
          <h1 className="type-h1 text-navy">Privacy Policy</h1>
          <p className="type-caption text-caption">Last updated: November 8, 2026</p>

          <section className="space-y-2">
            <h2 className="type-h3 text-navy">1. Information We Collect</h2>
            <p className="type-body text-body">
              We collect account and contact information necessary to operate your VectisX workspace, deliver rate alerts, and fulfill corporate compliance obligations, including full name, business email address, and organization metadata.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="type-h3 text-navy">2. How We Protect Your Financial Data</h2>
            <p className="type-body text-body tabular-nums">
              VectisX employs AES-256 encryption at rest and TLS 1.3 in transit. Our infrastructure is independently assessed annually under SOC 2 Type II assurance standards. We never sell personal or workspace data to third-party advertisers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="type-h3 text-navy">3. Regulatory Disclosures</h2>
            <p className="type-body text-body">
              In accordance with applicable financial data and anti-money laundering regulations, statutory records are retained securely and disclosed only when required by competent regulatory authorities.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
