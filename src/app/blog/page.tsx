'use client';

import Link from 'next/link';
import { blogPosts } from '@/data/blog';
import { RevealCard, RevealSection } from '@/components/ui/MotionPrimitives';

export default function BlogIndexPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Market Intelligence</span>
          <h1 className="type-h1 text-navy mt-2">
            VectisX Currency &amp; Macro Insights
          </h1>
          <p className="type-body text-body mt-3">
            Market commentary, exchange rate analysis, international business treasury guides, and technical developer tutorials.
          </p>
        </div>

        {/* Featured Post */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            aria-label={`Read featured article: ${featured.title}`}
            className="block card card-interactive p-6 sm:p-8 bg-white mb-12 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <span className="badge-brand">Featured • {featured.category}</span>
                <h2 className="type-h2 text-navy group-hover:text-primary transition-colors duration-150 ease-fintech">
                  {featured.title}
                </h2>
                <p className="type-body text-body">{featured.excerpt}</p>
                <div className="flex flex-wrap items-center gap-3 type-caption text-caption pt-2">
                  <span>{featured.author}</span>
                  <span aria-hidden="true">•</span>
                  <span>{featured.date}</span>
                  <span aria-hidden="true">•</span>
                  <span>{featured.readTime}</span>
                </div>
              </div>
              <div className="lg:col-span-5 bg-navy border border-navy-border rounded-2xl h-56 flex items-center justify-center text-white p-6 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-heading font-semibold text-white">FX Insights</div>
                  <div className="type-caption text-[#C9D3E3]">Read analysis &rarr;</div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid of Posts */}
        <RevealSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((post, idx) => (
            <RevealCard key={post.slug} index={idx}>
              <Link
                href={`/blog/${post.slug}`}
                aria-label={`Read article: ${post.title}`}
                className="card card-interactive p-6 bg-white flex flex-col justify-between h-full group"
              >
                <div>
                  <span className="badge-brand text-[11px] uppercase">{post.category}</span>
                  <h3 className="type-h3 text-navy mt-3 group-hover:text-primary transition-colors duration-150 ease-fintech">
                    {post.title}
                  </h3>
                  <p className="text-sm text-body mt-2 line-clamp-3">{post.excerpt}</p>
                </div>

                <div className="flex items-center justify-between type-caption text-caption pt-6 border-t border-surface-200 mt-6">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            </RevealCard>
          ))}
        </RevealSection>
      </div>
    </div>
  );
}
