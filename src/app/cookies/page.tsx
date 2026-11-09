'use client';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx max-w-4xl">
        <div className="card p-8 sm:p-12 bg-surface space-y-6">
          <div className="space-y-2">
            <h1>Cookie &amp; Tracking Policy</h1>
            <p className="text-caption text-ink-500">Last updated: November 9, 2026</p>
          </div>

          <p>
            VectisX utilizes essential, analytics, and security cookies to authenticate user sessions, maintain currency conversion preferences, and guard against cross-site request forgery attacks.
          </p>

          <section className="space-y-2">
            <h2>Cookie Categories</h2>
            <ul className="list-disc pl-5 space-y-2 text-[15px] leading-[24px] text-ink-700 prose-measure">
              <li>
                <strong className="font-semibold text-ink">Essential Cookies:</strong> Required for secure login authentication and payment order verification.
              </li>
              <li>
                <strong className="font-semibold text-ink">Preference Cookies:</strong> Remember your selected base currency (e.g. USD, EUR) and number formatting styles.
              </li>
              <li>
                <strong className="font-semibold text-ink">Analytics Cookies:</strong> Anonymized metrics to assess page performance, load latency, and navigation pathways.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
