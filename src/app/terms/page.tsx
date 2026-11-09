'use client';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx max-w-4xl">
        <div className="card p-8 sm:p-12 bg-white space-y-6">
          <h1 className="type-h1 text-navy">Terms of Service</h1>
          <p className="type-caption text-caption">Last updated: November 8, 2026</p>

          <section className="space-y-2">
            <h2 className="type-h3 text-navy">1. Acceptance of Terms</h2>
            <p className="type-body text-body">
              By accessing or using the website, APIs, or currency market data services provided by VectisX, you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="type-h3 text-navy">2. Currency Information &amp; Mid-Market Rates</h2>
            <p className="type-body text-body">
              VectisX publishes mid-market foreign exchange rates aggregated from global liquidity providers and central banks via our Rate Blender technology. Mid-market rates are informational benchmarks and do not represent retail bank quotes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="type-h3 text-navy">3. Regulatory &amp; Workspace Compliance</h2>
            <p className="type-body text-body">
              Workspace access and commercial API licensing are offered by VectisX in compliance with applicable data governance, sanctions screening, and regulatory controls.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="type-h3 text-navy">4. Business Accounts &amp; Commercial API Plans</h2>
            <p className="type-body text-body">
              Corporate accounts utilizing commercial API feeds or treasury exposure tools agree to adhere to the quota allowances and enterprise terms executed during business onboarding.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
