import { useParams } from '@/router/hooks';
import Link from '@/router/Link';
import { blogPosts } from '@/data/blog';
import { ArrowLeft, Share2 } from 'lucide-react';
import ActionButton from '@/components/ui/ActionButton';
import { wait } from '@/lib/utils';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-bg py-12 sm:py-16">
        <div className="container-vx max-w-2xl text-center space-y-4">
          <span className="badge-neutral">Not Found</span>
          <h1>That Note Does Not Exist</h1>
          <p className="text-ink-500">
            There is no article at this address. The index lists every note that is published.
          </p>
          <Link href="/blog" className="btn-primary btn-sm inline-flex">
            Back to all notes
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    await navigator.clipboard?.writeText(window.location.href);
    await wait(250);
  };

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 min-h-[44px] px-2 text-[14px] font-medium text-ink-500 hover:text-ink mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to all articles</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4 mb-8">
          <span className="badge-neutral">{post.category}</span>
          <h1>{post.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-caption text-ink-500 pt-2 border-b border-line pb-6 tabular-nums">
            <span className="font-medium text-ink">
              {post.author} ({post.authorRole})
            </span>
            <span aria-hidden="true">•</span>
            <span>{post.date}</span>
            <span aria-hidden="true">•</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Content Body.
            These notes carry a summary only; the long-form explanation for each
            lives in the project README. The previous version printed one shared
            article body under every title, which meant a piece about currency
            rankings was followed by paragraphs about corporate hedging. */}
        <article className="card p-6 sm:p-10 bg-surface text-ink-700 space-y-6">
          <p className="text-[18px] leading-[28px] font-medium text-ink">{post.excerpt}</p>

          <div className="rounded-xl bg-surface-subtle border border-line p-5 space-y-2">
            <h3 className="text-[16px] leading-[24px]">A note on scope</h3>
            <p className="text-[15px] leading-[24px]">
              This is a short note published as part of a coursework project, not a news article
              or an advisory piece. Anything here about rates, spreads or market practice is
              general background; nothing on this site is financial advice, and no figure should
              be used to make a transaction without checking it with the bank or broker carrying
              it out.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/historical" className="btn-secondary btn-sm">
              See the rate history behind this
            </Link>
            <Link href="/converter" className="btn-ghost btn-sm">
              Try the converter
            </Link>
          </div>

          <div className="pt-8 border-t border-line flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="badge-neutral">
                  #{t}
                </span>
              ))}
            </div>
            <ActionButton variant="secondary" onAction={handleShare} successLabel="Link Copied" className="btn-sm">
              <span className="inline-flex items-center gap-1.5">
                <Share2 className="w-4 h-4" aria-hidden="true" />
                <span>Share Article</span>
              </span>
            </ActionButton>
          </div>
        </article>
      </div>
    </div>
  );
}
