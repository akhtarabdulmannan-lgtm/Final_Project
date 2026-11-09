'use client';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx max-w-4xl">
        <div className="card p-8 sm:p-12 bg-white space-y-6">
          <h1 className="type-h1 text-navy">Cookie &amp; Tracking Policy</h1>
          <p className="type-caption text-caption">Last updated: November 8, 2026</p>

          <p className="type-body text-body">
            VectisX utilizes essential, preference, and security storage to authenticate user sessions, maintain currency conversion preferences, and guard against cross-site request forgery attacks.
          </p>

          <section className="space-y-2">
            <h2 className="type-h3 text-navy">Cookie Categories</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-body max-w-[65ch]">
              <li>
                <strong className="font-semibold text-navy">Essential Cookies:</strong> Required for secure login authentication and session verification.
              </li>
              <li>
                <strong className="font-semibold text-navy">Preference Storage:</strong> Remembers your selected FX data source mode, base currency (e.g. USD, EUR), and formatting preferences.
              </li>
              <li>
                <strong className="font-semibold text-navy">Performance Telemetry:</strong> Anonymized metrics to assess page performance, API latency, and navigation reliability.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
