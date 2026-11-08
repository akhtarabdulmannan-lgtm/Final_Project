'use client';

import Link from 'next/link';
import { blogPosts } from '@/data/blog';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function BlogIndexPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Market Intelligence</span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-surface-900 mt-2">
            VectisX Currency & Macro Insights
          </h1>
          <p className="text-surface-600 text-base mt-3 leading-relaxed">
            Market commentary, exchange rate analysis, international business treasury guides, and technical developer tutorials.
          </p>
        </div>

        {/* Featured Post */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="block card p-6 sm:p-8 bg-white mb-12 hover:border-brand-500/40 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">
                  Featured • {featured.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-surface-900 hover:text-brand-500 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-sm text-surface-600 leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-surface-400 pt-2">
                  <span>{featured.author}</span>
                  <span>•</span>
                  <span>{featured.date}</span>
                  <span>•</span>
                  <span>{featured.readTime}</span>
                </div>
              </div>
              <div className="lg:col-span-5 bg-gradient-to-br from-brand-900 to-brand-950 rounded-2xl h-56 flex items-center justify-center text-white p-6 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-extrabold font-mono text-teal-400">FX Insights</div>
                  <div className="text-xs text-surface-300">Read analysis &rarr;</div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid of Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card p-6 bg-white flex flex-col justify-between hover:border-brand-500/30 transition-all group"
            >
              <div>
                <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full uppercase">
                  {post.category}
                </span>
                <h3 className="font-bold text-surface-900 text-lg font-heading mt-2 group-hover:text-brand-500 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-surface-500 mt-2 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-surface-400 pt-6 border-t border-surface-100 mt-6">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
