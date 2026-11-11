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
            VectisX is a student coursework project that displays public exchange-rate information. These terms describe the basis on which it is offered. There is no company behind it, no payment service, and no API for commercial use.
          </p>

          <section className="space-y-2">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By using this site you accept this page as an accurate description of what it does.
              It offers no warranty of accuracy for the rates it displays and no financial,
              legal or tax advice.
            </p>
          </section>

          <section className="space-y-2">
            <h2>2. Accuracy of Exchange Rates</h2>
            <p>
              Rates displayed in the Currency Converter are mid-market reference rates republished from public data providers. They are informational, may be delayed, and are not transaction rates; no currency is bought, sold, or transferred through this site.
            </p>
          </section>

          <section className="space-y-2">
            <h2>3. Reuse of the Code and Data</h2>
            <p>
              The project source is published in a public repository and may be read and reused for
              coursework. The exchange-rate data belongs to its publishers, not to this project;
              check their terms before relying on it for anything beyond a demonstration. There is
              no commercial API, no API key, and no service level of any kind.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
