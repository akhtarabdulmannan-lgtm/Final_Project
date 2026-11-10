import Link from '@/router/Link';
import { Newspaper, Download } from 'lucide-react';
import ActionButton from '@/components/ui/ActionButton';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { wait } from '@/lib/utils';

export default function PressPage() {
  const releases = [
    { date: 'November 1, 2026', title: 'VectisX Announces Zero-Fee Instant Transfers Across 40 European & APAC Banking Corridors' },
    { date: 'August 15, 2026', title: 'Annual FX Trends Report: Businesses Lose $28B Annually to Hidden Bank Markups' },
    { date: 'May 12, 2026', title: 'Meridian Financial Group Reports 34% Increase in Cross-Border Transaction Settlement Volume' },
  ];

  const handleDownloadBrandKit = async () => {
    await wait(300);
  };

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">Media &amp; Pressroom</span>
          <h1>Official News, Releases &amp; Brand Assets</h1>
          <p className="text-ink-500">
            Access company announcements, corporate milestones, executive commentary, and media kits for VectisX.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="mb-2">Recent Press Releases</h2>
            {releases.map((r, idx) => (
              <ScrollReveal key={r.title} delay={idx * 50}>
                <div className="card p-6 bg-surface space-y-3">
                  <div className="text-caption font-medium text-ink-500 tabular-nums">{r.date}</div>
                  <h3 className="text-[20px] leading-[28px]">{r.title}</h3>
                  <div className="pt-1">
                    <Link href="/blog" className="btn-ghost btn-sm px-0">
                      Read Full Release &rarr;
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
              <h3>Media Contact</h3>
              <p className="text-[14px] leading-[22px] text-ink-500">
                For press inquiries, analyst interviews, or executive commentary:
              </p>
              <div className="text-[14px] font-semibold text-ink">press@vectisx.com</div>
            </div>

            <div className="card-invert p-6 space-y-3">
              <h3 className="text-ink-invert">Brand Guidelines &amp; Logos</h3>
              <p className="text-[14px] leading-[22px] text-ink-invert-muted">
                Download high-resolution SVG marks, color tokens, and media kit specifications.
              </p>
              <ActionButton
                variant="secondary"
                onAction={handleDownloadBrandKit}
                successLabel="Kit Ready"
                className="w-full justify-center bg-surface text-ink"
              >
                <span className="inline-flex items-center gap-1.5">
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Download Media Kit (.zip)</span>
                </span>
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
