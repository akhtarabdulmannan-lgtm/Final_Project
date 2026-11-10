'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';
import { ArrowLeft, Share2 } from 'lucide-react';
import ActionButton from '@/components/ui/ActionButton';
import { wait } from '@/lib/utils';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];

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

        {/* Content Body */}
        <article className="card p-6 sm:p-10 bg-surface text-ink-700 space-y-6">
          <p className="text-[18px] leading-[28px] font-medium text-ink">{post.excerpt}</p>

          <p>
            Foreign exchange markets operate across global financial capitals 24 hours a day, five days a week. For corporations moving millions or consumers remitting money overseas, understanding mid-market exchange pricing is critical to eliminating unneeded transaction costs.
          </p>

          <h3>The Illusion of Zero Commission</h3>
          <p>
            Many retail payment providers advertise zero commission or free wire transfers. However, financial institutions frequently widen the spread between the buy and sell price—pocketing anywhere from 2% to 6% in hidden markup margins.
          </p>

          <blockquote className="p-5 rounded-xl bg-surface-subtle border-l-4 border-ink font-medium text-ink prose-measure">
            “The mid-market rate is the only truly unbiased benchmark in global foreign exchange. Transparent platforms display this rate upfront alongside explicit transaction fees.”
          </blockquote>

          <h3>Strategic Hedging for Commercial Enterprise</h3>
          <p>
            When cross-border businesses purchase supplies denominated in foreign currencies, fluctuating exchange rates introduce unpredictable margin compression. Forward contracts lock in current rates for settlements up to 24 months into the future, providing budget certainty and balance sheet protection.
          </p>

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
