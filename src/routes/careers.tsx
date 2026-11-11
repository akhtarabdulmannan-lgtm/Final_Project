import Link from '@/router/Link';
import { GraduationCap, Code2, Database, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

/**
 * Careers page.
 *
 * This previously advertised five full-time roles across London, New York,
 * Toronto and Singapore, with 401(k) matching and company-paid family health
 * cover. There is no company and no payroll, so every listing was fictional and
 * every "Apply Now" button led to the contact form. It is now what it honestly
 * is: an outline of the project, aimed at a reader who wants to understand or
 * rebuild it.
 */
export default function CareersPage() {
  const parts = [
    {
      title: 'Rate data & the proxy',
      body: 'The serverless function in api/rates.ts, the fetch-and-normalise client, the timeout and fallback chain, and the saved snapshot that stands in when nothing is reachable.',
      icon: Database,
    },
    {
      title: 'Interface',
      body: 'React 18 with TypeScript, a hand-built design-token layer on Tailwind, and the keyboard-navigable currency picker with its combobox semantics.',
      icon: Code2,
    },
    {
      title: 'Accounts',
      body: 'Supabase Auth for sign-up, email confirmation and reset, with row-level security doing the actual access control and failure states surfaced to the user.',
      icon: GraduationCap,
    },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">About the Build</span>
          <h1>No Vacancies — But Here Is How It Was Built</h1>
          <p className="text-ink-500">
            This is a student final project, not an employer. The roles that used to be listed on
            this page did not exist and the applications went nowhere, so they have been removed.
            In their place is an overview for anyone marking, reviewing, or rebuilding it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {parts.map((p, idx) => (
            <ScrollReveal key={p.title} delay={idx * 50}>
              <div className="card p-6 bg-surface h-full space-y-3">
                <div className="w-11 h-11 rounded-xl bg-surface-subtle border border-line text-ink flex items-center justify-center">
                  <p.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3>{p.title}</h3>
                <p className="text-[15px] leading-[24px] text-ink-500">{p.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="card p-6 sm:p-8 bg-surface">
          <h2 className="mb-4">Where to Look</h2>
          <p className="text-ink-700 mb-6">
            The repository README documents the architecture, the API integration and the
            environment variables. On the site itself, the about and security pages describe what
            the project does and what it explicitly does not do.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/about" className="btn-secondary btn-sm">
              About the project
            </Link>
            <Link href="/security" className="btn-ghost btn-sm">
              Security &amp; data handling
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
