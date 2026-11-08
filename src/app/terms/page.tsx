'use client';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx max-w-4xl">
        <div className="card p-8 sm:p-12 bg-white space-y-6 text-sm text-surface-700 leading-relaxed">
          <h1 className="text-3xl font-heading font-extrabold text-surface-900">Terms of Service</h1>
          <p className="text-xs text-surface-400">Last updated: November 8, 2026</p>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-surface-900">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the website, mobile applications, APIs, or money transmission services provided by VectisX Financial Inc. (a subsidiary of Meridian Financial Corporation), you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-surface-900">2. Currency Information & Mid-Market Rates</h2>
            <p>
              VectisX publishes mid-market foreign exchange rates aggregated from global liquidity providers via our proprietary Rate Blender technology. Mid-market rates are informational indicators and do not represent transactional retail rates unless explicitly locked during a formal money transfer execution.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-surface-900">3. Money Transfer Services & Licensing</h2>
            <p>
              International payment transmission services are offered by VectisX in compliance with applicable FinCEN regulations and state money transmitter licenses. Transfers are subject to customer identity verification (KYC), sanctions screening (OFAC), and anti-money laundering (AML) controls.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-surface-900">4. Business Accounts & Forward Contracts</h2>
            <p>
              Corporate accounts engaging in commercial forward contracts or limit orders agree to maintain required collateral balances and adhere to the Master FX Dealing Agreement executed during business onboarding.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
