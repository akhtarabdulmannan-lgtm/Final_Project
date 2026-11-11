import Link from '@/router/Link';
import { Newspaper, FileText, Mail } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

/**
 * Press page.
 *
 * The previous version listed three dated press releases about a fictional
 * parent company and offered a "Download Media Kit (.zip)" button that ran a
 * 300 ms timer and produced no file. Both are gone: the releases described
 * events that never happened, and the download button was a fake affordance.
 * What remains are links to material that actually exists.
 */
export default function PressPage() {
  const material = [
    {
      title: 'How the rates are sourced',
      body: 'Where current rates come from, what the serverless proxy does, and why a saved snapshot is shown instead of an invented figure when the feed is unreachable.',
      href: '/about',
      label: 'Read the build notes',
    },
    {
      title: 'Rate history and exports',
      body: 'Charts, the business-day series, and the CSV export with its columns and date format documented on the page itself.',
      href: '/historical',
      label: 'Open historical data',
    },
    {
      title: 'Security and data handling',
      body: 'What is stored (an email address), what is not, and which claims this project explicitly does not make.',
      href: '/security',
      label: 'Read the security page',
    },
    {
      title: 'Licensing and regulatory status',
      body: 'No licences are held, and the page explains why none are required for displaying public reference rates.',
      href: '/licenses',
      label: 'Read the licensing page',
    },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">Project Information</span>
          <h1>Project Notes &amp; Documentation</h1>
          <p className="text-ink-500">
            There is no pressroom, no media kit and no issued announcements. This page collects
            the documentation that does exist, each link pointing at a page on this site.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="mb-2">Available Material</h2>
            {material.map((m, idx) => (
              <ScrollReveal key={m.title} delay={idx * 50}>
                <div className="card p-6 bg-surface space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-line text-ink flex items-center justify-center">
                    <FileText className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-[20px] leading-[28px]">{m.title}</h3>
                  <p className="text-[15px] leading-[24px] text-ink-500">{m.body}</p>
                  <div className="pt-1">
                    <Link href={m.href} className="btn-ghost btn-sm px-0">
                      {m.label} &rarr;
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="card p-6 bg-surface space-y-3">
              <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-line text-ink flex items-center justify-center">
                <Newspaper className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3>Contact</h3>
              <p className="text-[14px] leading-[22px] text-ink-500">
                Questions about the project, the data sources, or the coursework write-up:
              </p>
              <div className="text-[14px] font-semibold text-ink">akhtarabdulmannan@gmail.com</div>
            </div>

            <div className="card-invert p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-ink-invert" aria-hidden="true" />
                <h3 className="text-ink-invert">No media kit</h3>
              </div>
              <p className="text-[14px] leading-[22px] text-ink-invert-muted">
                There are no logo archives, brand guidelines or press credentials to download.
                The button that used to sit here did not produce a file, so it has been removed
                rather than left to look like it works.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
