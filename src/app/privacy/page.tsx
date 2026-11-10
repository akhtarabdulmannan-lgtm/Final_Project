'use client';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx max-w-4xl">
        <div className="card p-8 sm:p-12 bg-surface space-y-6">
          <div className="space-y-2">
            <h1>Privacy Policy</h1>
            <p className="text-caption text-ink-500">Last updated: November 9, 2026</p>
          </div>

          <p>
            VectisX Financial Inc. (&ldquo;VectisX&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) respects your privacy and is committed to protecting the personal and financial information you share with us. This Privacy Policy describes how we collect, process, store, and safeguard your information in compliance with GDPR, CCPA, and international financial privacy regulations.
          </p>

          <section className="space-y-2">
            <h2>1. Information We Collect</h2>
            <p>
              When you register for a personal or business money transfer account, we collect identifying information required by Know Your Customer (KYC) and Anti-Money Laundering (AML) laws, including full legal name, date of birth, government-issued identification, residential address, and beneficiary bank routing parameters.
            </p>
          </section>

          <section className="space-y-2">
            <h2>2. Encryption &amp; Data Protection</h2>
            <p>
              All personally identifiable financial records are encrypted at rest via AES-256 and in transit using TLS 1.3 security protocols. VectisX never sells or rents customer data to third-party advertisers.
            </p>
          </section>

          <section className="space-y-2">
            <h2>3. Your Privacy Rights</h2>
            <p>
              Under applicable legislation, you hold the right to access, rectify, export, or request erasure of personal data held by VectisX, subject to mandatory statutory banking record retention periods.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
