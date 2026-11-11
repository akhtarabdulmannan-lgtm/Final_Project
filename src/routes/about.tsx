import Link from '@/router/Link';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { currencies } from '@/data/currencies';

/**
 * About page.
 *
 * This page previously described a company founded in 1993, owned by a listed
 * parent corporation, with a named executive team and a transaction-volume
 * figure. None of that is true: this is a student final project, and every one
 * of those details was invented. They have been replaced with statements that
 * describe what the project actually is and how it actually works, because a
 * page describing an imaginary company is worth less to the reader (and to the
 * coursework) than an accurate description of the build.
 */
export default function AboutPage() {
  const built = [
    {
      title: 'Rates, fetched live',
      body: 'Current rates come from a public exchange-rate feed, normalised by a small serverless proxy. If the feed cannot be reached, the app says so and shows a clearly labelled saved snapshot rather than inventing a number.',
    },
    {
      title: 'History you can check',
      body: 'Every chart and export is drawn from a published business-day series. The historical page states how many rows it is showing and why that number is smaller than the calendar range you selected.',
    },
    {
      title: 'Screens that admit limits',
      body: 'Where a feature cannot do something — no prior day to compare against, no provider reachable, no account configured — the interface says that instead of showing a zero or a plausible-looking placeholder.',
    },
  ];

  const stack = [
    { name: 'React 18 + TypeScript', role: 'Interface and type safety across every screen' },
    { name: 'Vite 5', role: 'Dev server and production build' },
    { name: 'Tailwind CSS 3', role: 'Design tokens and layout' },
    { name: 'Recharts', role: 'Rate-history charts' },
    { name: 'Supabase', role: 'Accounts, email confirmation and password reset' },
    { name: 'Vercel functions', role: 'The /api/rates proxy that keeps any feed key server-side' },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        {/* Hero */}
        <div className="max-w-3xl mb-14 space-y-4">
          <span className="badge-neutral">About This Project</span>
          <h1>A Currency Converter, Built and Documented Honestly</h1>
          <p className="text-ink-500">
            VectisX is a final-year coursework project: a currency converter, rate
            dashboard and historical-data explorer built with React and TypeScript. It is not a
            company, it does not handle money, and it holds no financial licences. What it does
            is fetch public exchange-rate data and present it clearly.
          </p>
        </div>

        {/* What it is / is not */}
        <div className="card-invert p-8 rounded-2xl mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-3">
              <span className="badge-invert">Plainly stated</span>
              <h2 className="text-ink-invert">What this site is — and is not</h2>
              <p className="text-ink-invert-muted">
                It is an educational tool that converts between {currencies.length} currencies,
                charts how a pair has moved, and exports the underlying data. Accounts exist so a
                visitor can confirm an email address and sign in; nothing else is stored.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-xl bg-[#1A1F26] border border-line-invert">
                <div className="text-[24px] font-heading font-semibold text-ink-invert tabular-nums">
                  {currencies.length}
                </div>
                <div className="text-caption text-ink-invert-muted mt-1">Currencies</div>
              </div>
              <div className="p-4 rounded-xl bg-[#1A1F26] border border-line-invert">
                <div className="text-[24px] font-heading font-semibold text-ink-invert tabular-nums">0</div>
                <div className="text-caption text-ink-invert-muted mt-1">Licences held</div>
              </div>
              <div className="p-4 rounded-xl bg-[#1A1F26] border border-line-invert">
                <div className="text-[24px] font-heading font-semibold text-ink-invert tabular-nums">0</div>
                <div className="text-caption text-ink-invert-muted mt-1">Payments handled</div>
              </div>
              <div className="p-4 rounded-xl bg-[#1A1F26] border border-line-invert">
                <div className="text-[20px] font-heading font-semibold text-ink-invert">Public</div>
                <div className="text-caption text-ink-invert-muted mt-1">Data sources only</div>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="card p-8 bg-surface mb-14">
          <h2 className="mb-8">What the build actually does</h2>
          <div className="space-y-6">
            {built.map((b) => (
              <div
                key={b.title}
                className="pb-6 border-b border-line last:border-0 last:pb-0 space-y-1.5"
              >
                <h3 className="text-[18px] leading-[24px]">{b.title}</h3>
                <p className="text-ink-700 text-[15px] leading-[24px]">{b.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div className="mb-14">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2>Built With</h2>
            <p className="text-ink-500 mx-auto">
              The libraries doing the work, and what each one is responsible for.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stack.map((s, idx) => (
              <ScrollReveal key={s.name} delay={idx * 50}>
                <div className="card p-6 bg-surface space-y-2 h-full">
                  <h3 className="text-[18px] leading-[24px]">{s.name}</h3>
                  <p className="text-[14px] leading-[22px] text-ink-500">{s.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card-invert p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-ink-invert">See the data for yourself</h2>
            <p className="text-ink-invert-muted">
              Every figure on this site can be traced to a published rate and exported as CSV.
            </p>
          </div>
          <Link href="/historical" className="btn-invert whitespace-nowrap">
            <span>Open Historical Data</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
