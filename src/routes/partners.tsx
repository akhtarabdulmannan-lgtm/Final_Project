import Link from '@/router/Link';
import { Code2, Database, BookOpen, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

/**
 * Partners page.
 *
 * This used to sell three affiliate and reseller programmes with CPA
 * commissions, referral revenue share and "remittance rails" to embed in a
 * customer platform. None of those programmes exist and there are no rails to
 * embed, so the page now describes the two genuine ways the work can be reused:
 * the public rate endpoint and the open repository.
 */
export default function PartnersPage() {
  const models = [
    {
      title: 'Reuse the Rate Endpoint',
      desc: 'The serverless function returns current rates in one small, stable JSON shape. Point your own client at the same route instead of re-implementing two provider parsers.',
      icon: Database,
    },
    {
      title: 'Fork the Project',
      desc: 'The repository is public. The reader, formatter and chart components are ordinary React and TypeScript, with no proprietary dependencies to unpick.',
      icon: Code2,
    },
    {
      title: 'Cite the Write-Up',
      desc: 'The README documents the architecture, the API integration and the environment variables, which is the useful part if you are building something similar for a course.',
      icon: BookOpen,
    },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">Reuse &amp; Attribution</span>
          <h1>Using This Project Elsewhere</h1>
          <p className="text-ink-500">
            There is no partner programme, no commission structure and no commercial onboarding.
            What is available is the code, the endpoint and the documentation — all of it free to
            read and reuse.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {models.map((m, idx) => (
            <ScrollReveal key={m.title} delay={idx * 50}>
              <div className="card p-6 bg-surface h-full space-y-3">
                <div className="w-11 h-11 rounded-xl bg-surface-subtle border border-line text-ink flex items-center justify-center">
                  <m.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3>{m.title}</h3>
                <p className="text-[15px] leading-[24px] text-ink-500">{m.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="card p-8 bg-surface max-w-3xl mb-8 space-y-3">
          <h2 className="text-[20px] leading-[28px]">If you do reuse it</h2>
          <p className="text-ink-700">
            Attribute the data to its publishers rather than to this site, and check their terms
            before relying on the feed for anything beyond a demo. The rate figures are reference
            values, not dealing prices, and they arrive with whatever delay the publisher applies.
          </p>
        </div>

        <div className="card-invert p-8 sm:p-10 text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-ink-invert">Questions</h2>
          <p className="text-ink-invert-muted max-w-lg mx-auto">
            If you are marking this project, or want to know how a particular screen was built,
            the contact form reaches the author directly.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-invert">
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/about" className="btn-ghost btn-sm text-ink-invert">
              About the project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
