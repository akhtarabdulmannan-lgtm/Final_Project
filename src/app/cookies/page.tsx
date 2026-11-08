'use client';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx max-w-4xl">
        <div className="card p-8 sm:p-12 bg-white space-y-6 text-sm text-surface-700 leading-relaxed">
          <h1 className="text-3xl font-heading font-extrabold text-surface-900">Cookie & Tracking Policy</h1>
          <p className="text-xs text-surface-400">Last updated: November 8, 2026</p>

          <p>
            VectisX utilizes essential, analytics, and security cookies to authenticate user sessions, maintain currency conversion preferences, and guard against cross-site request forgery attacks.
          </p>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-surface-900">Cookie Categories</h2>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li><strong>Essential Cookies:</strong> Required for secure login authentication and payment order verification.</li>
              <li><strong>Preference Cookies:</strong> Remember your selected base currency (e.g. USD, EUR) and number formatting styles.</li>
              <li><strong>Analytics Cookies:</strong> Anonymized metrics to assess page performance, load latency, and navigation pathways.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
