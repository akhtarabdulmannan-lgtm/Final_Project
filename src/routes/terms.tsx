export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx max-w-4xl">
        <div className="card p-8 sm:p-12 bg-surface space-y-6">
          <div className="space-y-2">
            <h1>Terms &amp; Conditions of Service</h1>
            <p className="text-caption text-ink-500">Last updated: November 9, 2026</p>
          </div>

          <p>
            Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before accessing or using the VectisX foreign exchange tools, currency APIs, or international payment transfer services operated by VectisX Financial Inc.
          </p>

          <section className="space-y-2">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing the VectisX website, mobile application, or API endpoints, you agree to be bound by these Terms and all applicable local, state, federal, and international financial laws.
            </p>
          </section>

          <section className="space-y-2">
            <h2>2. Accuracy of Exchange Rates</h2>
            <p>
              Rates displayed in the Currency Converter are mid-market reference rates republished from public providers (open.er-api.com and the European Central Bank via Frankfurter). They are informational, may be delayed, and are not transaction rates; no currency is bought, sold, or transferred through this site.
            </p>
          </section>

          <section className="space-y-2">
            <h2>3. API Usage Limits &amp; Commercial Licensing</h2>
            <p>
              Unauthorized automated scraping of public web interfaces is strictly prohibited. Programmatic utilization requires an active API key authorized under our Commercial API Terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
