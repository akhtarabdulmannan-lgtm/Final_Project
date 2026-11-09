'use client';

import Link from 'next/link';
import { blogPosts } from '@/data/blog';
import { ArrowLeft, Check, Share2 } from 'lucide-react';
import { useButtonFeedback } from '@/components/ui/MotionPrimitives';

export default function BlogPostClient({ slug }: { slug: string }) {
  const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];
  const shareFeedback = useButtonFeedback();

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    shareFeedback.triggerSuccess();
  };

  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx max-w-4xl">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 min-h-[44px] type-caption font-semibold text-caption hover:text-primary mb-6 transition-colors duration-150 ease-fintech"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to all articles
        </Link>

        {/* Article Header */}
        <div className="space-y-4 mb-8">
          <span className="badge-brand">{post.category}</span>
          <h1 className="type-h1 text-navy">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-3 type-caption text-caption pt-2 border-b border-surface-200 pb-6">
            <span className="font-semibold text-navy">
              {post.author} ({post.authorRole})
            </span>
            <span aria-hidden="true">•</span>
            <span>{post.date}</span>
            <span aria-hidden="true">•</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Content Body */}
        <article className="card p-8 sm:p-12 bg-white space-y-6">
          <p className="text-lg font-medium text-navy leading-relaxed max-w-[65ch]">
            {post.excerpt}
          </p>

          <p className="type-body text-body">
            Foreign exchange markets operate across global financial capitals 24 hours a day, five days a week. For corporations moving millions or analysts benchmarking international exposures, understanding the underlying mechanics of mid-market exchange pricing is critical to eliminating unneeded transaction frictions.
          </p>

          <h2 className="type-h3 text-navy pt-4">
            The Illusion of &ldquo;Zero Commission&rdquo;
          </h2>
          <p className="type-body text-body">
            Many retail payment providers advertise &ldquo;0% commission&rdquo; or &ldquo;free wire transfers.&rdquo; However, financial institutions frequently widen the spread between the buy and sell price—pocketing anywhere from 2% to 6% in hidden markup margins without alerting the client.
          </p>

          <blockquote className="p-5 rounded-2xl bg-page border-l-4 border-primary font-medium text-navy max-w-[65ch]">
            &ldquo;The mid-market rate is the only truly unbiased benchmark in global foreign exchange. Transparent platforms display this rate upfront alongside explicit transaction fees.&rdquo;
          </blockquote>

          <h2 className="type-h3 text-navy pt-4">
            Strategic Hedging for Commercial Enterprise
          </h2>
          <p className="type-body text-body">
            When cross-border businesses purchase supplies denominated in foreign currencies, fluctuating exchange rates introduce unpredictable margin compression. Forward contracts lock in current rates for settlements up to 24 months into the future, providing budget certainty and balance sheet protection.
          </p>

          <div className="pt-8 border-t border-surface-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg bg-page border border-surface-200 text-caption type-caption font-medium"
                >
                  #{t}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-3 rounded-xl type-caption font-semibold text-primary hover:bg-primary-pale transition-colors duration-150 ease-fintech"
            >
              {shareFeedback.status === 'success' ? (
                <>
                  <Check className="w-4 h-4 text-gain-text" aria-hidden="true" /> Link Copied
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" aria-hidden="true" /> Share Article
                </>
              )}
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
