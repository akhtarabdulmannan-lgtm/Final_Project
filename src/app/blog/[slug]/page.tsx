'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const post = blogPosts.find(p => p.slug === slug) || blogPosts[0];

  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx max-w-4xl">
        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-semibold text-surface-500 hover:text-brand-500 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to all articles
        </Link>

        {/* Article Header */}
        <div className="space-y-4 mb-8">
          <span className="badge-teal text-xs">{post.category}</span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-surface-900 tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-surface-500 pt-2 border-b border-surface-200 pb-6">
            <span className="font-semibold text-surface-900">{post.author} ({post.authorRole})</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="card p-8 sm:p-12 bg-white text-surface-800 space-y-6 leading-relaxed text-sm sm:text-base">
          <p className="text-lg font-medium text-surface-900 leading-relaxed">
            {post.excerpt}
          </p>

          <p>
            Foreign exchange markets operate across global financial capitals 24 hours a day, five days a week. For corporations moving millions or consumers remitting money to families overseas, understanding the underlying mechanics of mid-market exchange pricing is critical to eliminating unneeded transaction frictions.
          </p>

          <h3 className="text-xl font-bold font-heading text-surface-900 pt-4">
            The Illusion of "Zero Commission"
          </h3>
          <p>
            Many retail payment providers advertise "0% commission" or "free wire transfers." However, financial institutions frequently widen the spread between the buy and sell price—pocketing anywhere from 2% to 6% in hidden markup margins without alerting the client.
          </p>

          <div className="p-5 rounded-2xl bg-surface-50 border-l-4 border-brand-500 font-medium text-surface-700 italic">
            "The mid-market rate is the only truly unbiased benchmark in global foreign exchange. Transparent platforms display this rate upfront alongside explicit transaction fees."
          </div>

          <h3 className="text-xl font-bold font-heading text-surface-900 pt-4">
            Strategic Hedging for Commercial Enterprise
          </h3>
          <p>
            When cross-border businesses purchase supplies denominated in foreign currencies, fluctuating exchange rates introduce unpredictable margin compression. Forward contracts lock in current rates for settlements up to 24 months into the future, providing budget certainty and balance sheet protection.
          </p>

          <div className="pt-8 border-t border-surface-100 flex items-center justify-between">
            <div className="flex gap-2">
              {post.tags.map(t => (
                <span key={t} className="px-2.5 py-1 rounded-lg bg-surface-100 text-surface-600 text-xs font-medium">
                  #{t}
                </span>
              ))}
            </div>
            <button className="flex items-center gap-1.5 text-xs font-bold text-brand-500 hover:underline">
              <Share2 className="w-3.5 h-3.5" /> Share Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
