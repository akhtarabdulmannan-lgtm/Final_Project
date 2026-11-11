import { Link2, Share2, BookmarkCheck } from 'lucide-react';
import Link from '@/router/Link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { currencies } from '@/data/currencies';

/**
 * Referral page.
 *
 * The previous version promised $50 in cash to both parties once a friend
 * transferred $1,000 through the site. No transfers happen here and no money is
 * paid to anyone, so the reward ladder, the fake referral code and the
 * clipboard "link generator" have been removed. What is left is the only
 * genuinely shareable thing the project has: the pair pages themselves.
 */
export default function ReferralPage() {
  const steps = [
    {
      step: '1',
      title: 'Pick a Pair',
      desc: 'Open any conversion, for example USD to EUR, and you get a dedicated page with the live rate, the inverse rate and the chart.',
      icon: Link2,
    },
    {
      step: '2',
      title: 'Copy the Address',
      desc: 'The pair lives in the URL, so the address bar of any pair page is already the shareable link — no generator needed.',
      icon: Share2,
    },
    {
      step: '3',
      title: 'They Land on the Same Rate',
      desc: 'Anyone opening the link sees the same live feed and the same historical series, with no account required to look.',
      icon: BookmarkCheck,
    },
  ];

  const examples = [
    { href: '/converter/usd-to-eur', label: 'USD to EUR' },
    { href: '/converter/gbp-to-usd', label: 'GBP to USD' },
    { href: '/converter/usd-to-pkr', label: 'USD to PKR' },
    { href: '/converter/eur-to-jpy', label: 'EUR to JPY' },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="text-center max-w-2xl mx-auto mb-4 space-y-3">
          <span className="badge-neutral">Sharing</span>
          <h1>Share a Pair, Not a Promise</h1>
          <p className="text-ink-500 mx-auto">
            There is no referral programme, no cash reward and no wallet to credit. What this
            project does have is a permanent page for every pair it supports, and those are
            genuinely useful to send to someone.
          </p>
        </div>

        <p className="text-center text-caption text-ink-500 mb-12">
          {currencies.length} currencies are supported — any two of them make a pair page.
        </p>

        <div className="relative mb-14">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, idx) => (
              <ScrollReveal key={s.step} delay={idx * 50}>
                <div className="card p-6 bg-surface text-center h-full space-y-2">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-fg font-semibold flex items-center justify-center mx-auto mb-3 text-[15px] tabular-nums">
                    {s.step}
                  </div>
                  <s.icon className="w-5 h-5 mx-auto text-ink-500" aria-hidden="true" />
                  <h3>{s.title}</h3>
                  <p className="text-[14px] leading-[22px] text-ink-500 mx-auto">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="card-invert p-8 sm:p-10 max-w-2xl mx-auto text-center space-y-5">
          <div className="space-y-2">
            <h2 className="text-ink-invert">Try One</h2>
            <p className="text-ink-invert-muted mx-auto">
              Each of these opens a real page with a live rate:
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {examples.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                className="rounded-xl border border-line-invert bg-[#1A1F26] px-4 py-3 text-[14px] font-medium text-ink-invert hover:bg-[#222831] transition-colors"
              >
                {e.label}
              </Link>
            ))}
          </div>

          <p className="text-caption text-ink-invert-muted">
            Amounts are converted locally in your browser; no figure is sent anywhere.
          </p>
        </div>
      </div>
    </div>
  );
}
