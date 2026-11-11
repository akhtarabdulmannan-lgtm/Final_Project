import { Database, Lock, UserCheck, ShieldAlert, KeyRound } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

/**
 * Security page.
 *
 * The previous version claimed SOC 2 Type II certification, segregated Tier-1
 * client fund accounts, AES-256 custody of identity documents and ML fraud
 * monitoring. For a project that stores an email address and holds no funds,
 * every one of those claims was false. What replaces them is a description of
 * the controls that do exist, each of which can be checked in the repository.
 */
export default function SecurityPage() {
  const specs = [
    {
      title: 'Row-level security on every table',
      desc: 'All seven Supabase tables have RLS enabled. Anonymous reads are denied; the same denial was tested with direct database queries, not assumed from the dashboard.',
      icon: Database,
    },
    {
      title: 'Email addresses only',
      desc: 'Registration stores an email address and a display name. No address, phone number, date of birth, identity document, or payment detail is collected anywhere on the site.',
      icon: UserCheck,
    },
    {
      title: 'Passwords handled by the auth provider',
      desc: 'Passwords are hashed by Supabase Auth and never touch this application\u2019s code or storage. The client validates length and confirmation before submitting.',
      icon: Lock,
    },
    {
      title: 'Keys kept out of the browser bundle',
      desc: 'Rate-feed keys live in the serverless function\u2019s environment, not in client JavaScript. Supabase ships only its public anon key, which RLS is what actually protects.',
      icon: KeyRound,
    },
    {
      title: 'Failures are visible, not silent',
      desc: 'Forms report what actually happened. A write that fails says so; it never shows a success message for something that did not save.',
      icon: ShieldAlert,
    },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">Security &amp; Data Handling</span>
          <h1>What This Site Stores, and How</h1>
          <p className="text-ink-500">
            A short, checkable description of the data this project handles. It is deliberately
            small, because the site does very little.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {specs.map((s, idx) => (
            <ScrollReveal key={s.title} delay={idx * 50}>
              <div className="card p-6 bg-surface h-full space-y-3">
                <div className="w-11 h-11 rounded-xl bg-surface-subtle border border-line text-ink flex items-center justify-center">
                  <s.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3>{s.title}</h3>
                <p className="text-[15px] leading-[24px] text-ink-500">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="card p-8 bg-surface max-w-3xl mb-14 space-y-3">
          <h2 className="text-[20px] leading-[28px]">What is explicitly not claimed</h2>
          <p className="text-ink-700">
            This project has not undergone a SOC 2 audit, an ISO 27001 assessment, or a
            penetration test, and it holds no client funds to segregate. Earlier versions of this
            page said otherwise; those statements were removed because they were untrue.
          </p>
        </div>

        <div className="card-invert p-8 text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-ink-invert">Found a Problem?</h2>
          <p className="text-ink-invert-muted mx-auto">
            If you spot a bug, a security issue, or a claim on this site that does not hold up,
            please report it directly.
          </p>
          <div className="text-[15px] font-semibold text-ink-invert pt-1">akhtarabdulmannan@gmail.com</div>
        </div>
      </div>
    </div>
  );
}
