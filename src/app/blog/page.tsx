'use client';

import Link from 'next/link';
import { blogPosts } from '@/data/blog';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function BlogIndexPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">Market Intelligence</span>
          <h1>VectisX Currency &amp; Macro Insights</h1>
          <p className="text-ink-500">
            Market commentary, exchange rate analysis, international business treasury guides, and technical developer tutorials.
          </p>
        </div>

        {/* Featured Post */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            aria-label={`Read featured article: ${featured.title}`}
            className="card-interactive p-6 sm:p-8 mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <span className="badge-neutral">Featured • {featured.category}</span>
                <h2>{featured.title}</h2>
                <p className="text-ink-500">{featured.excerpt}</p>
                <div className="flex flex-wrap items-center gap-3 text-caption text-ink-500 pt-2 tabular-nums">
                  <span className="text-ink font-medium">{featured.author}</span>
                  <span aria-hidden="true">•</span>
                  <span>{featured.date}</span>
                  <span aria-hidden="true">•</span>
                  <span>{featured.readTime}</span>
                </div>
              </div>
              <div className="lg:col-span-5 bg-surface-invert border border-line-invert rounded-2xl h-52 flex items-center justify-center text-ink-invert p-6 text-center">
                <div className="space-y-2">
                  <div className="text-[28px] font-heading font-semibold text-ink-invert">
                    FX Insights
                  </div>
                  <div className="text-caption text-ink-invert-muted">Read analysis &rarr;</div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid of Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, idx) => (
            <ScrollReveal key={post.slug} delay={idx * 50}>
              <Link
                href={`/blog/${post.slug}`}
                aria-label={`Read article: ${post.title}`}
                className="card-interactive p-6 flex flex-col justify-between h-full"
              >
                <div className="space-y-2.5">
                  <span className="badge-neutral">{post.category}</span>
                  <h3 className="text-[20px] leading-[28px] pt-1">{post.title}</h3>
                  <p className="text-[14px] leading-[22px] text-ink-500 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between text-caption text-ink-500 pt-5 border-t border-line mt-6 tabular-nums">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
