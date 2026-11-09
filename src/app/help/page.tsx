'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import Accordion from '@/components/ui/Accordion';
import { RevealCard, RevealSection } from '@/components/ui/MotionPrimitives';

const generalFaqs = [
  {
    question: 'How do I open an account with VectisX?',
    answer:
      'Signing up takes under two minutes. Click "Register", enter your email and password, and your currency intelligence workspace and cloud alerts are activated immediately.',
  },
  {
    question: 'What documents are required for business account verification?',
    answer:
      'Corporate accounts require Certificate of Incorporation, proof of business address (utility bill or bank statement within 90 days), and ID verification for directors holding 25% or more equity.',
  },
  {
    question: 'How often are VectisX mid-market rates updated?',
    answer:
      'Live rates are queried continuously from multiple public and central-bank FX REST APIs (including European Central Bank reference tables) with deterministic institutional fallback.',
  },
  {
    question: 'Can I export historical exchange rates to CSV?',
    answer:
      'Yes. Visit the Historical Rates tool, choose any source/target currency pair and horizon from 30 days to 10 years, and click "Download Historical CSV".',
  },
];

const categories = [
  {
    title: 'Live Converter & Rate Tables',
    articles: 18,
    desc: 'Mid-market pricing, 24h change indicators, and cross-rate matrices.',
    href: '/converter',
  },
  {
    title: 'Cloud Rate Alerts',
    articles: 12,
    desc: 'Setting target exchange thresholds and managing active watchlists.',
    href: '/alerts',
  },
  {
    title: 'Business & Treasury Solutions',
    articles: 24,
    desc: 'FX risk calculators, batch schedules, team permissions, and ERP sync.',
    href: '/business',
  },
  {
    title: 'Developer & API Integration',
    articles: 16,
    desc: 'API keys, rate limits, webhooks, and SDK troubleshooting.',
    href: '/api-platform/docs',
  },
  {
    title: 'Security & Compliance',
    articles: 9,
    desc: 'Encryption standards, SOC 2 controls, and account protection.',
    href: '/security',
  },
  {
    title: 'API Plans & Licensing',
    articles: 14,
    desc: 'Commercial API tiers, add-ons, and enterprise SLAs.',
    href: '/api-platform/pricing',
  },
];

export default function HelpPage() {
  const [query, setQuery] = useState('');

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(
      (c) => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx">
        {/* Hero with Search */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge-brand">Support Center</span>
          <h1 className="type-h1 text-navy mt-2">
            How Can We Help You Today?
          </h1>
          <p className="type-body text-body mt-3 mx-auto">
            Search our knowledge base for instant answers or browse popular guides below.
          </p>

          <div className="relative mt-6 text-left">
            <label htmlFor="help-search" className="sr-only">
              Search help center
            </label>
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-caption"
              aria-hidden="true"
            />
            <input
              id="help-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by topic, keyword, or feature (e.g., 'rate alerts', 'API')..."
              className="input-field pl-12 py-4 text-base"
            />
          </div>
        </div>

        {/* Categories */}
        <RevealSection className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {filteredCategories.map((c, idx) => (
            <RevealCard key={c.title} index={idx}>
              <Link
                href={c.href}
                aria-label={`${c.title}: ${c.articles} articles`}
                className="card card-interactive block p-6 bg-white h-full group"
              >
                <h2 className="type-h3 text-navy mb-1 group-hover:text-primary transition-colors duration-150 ease-fintech">
                  {c.title}
                </h2>
                <p className="text-sm text-body mb-4">{c.desc}</p>
                <span className="type-caption font-semibold text-primary group-hover:underline tabular-nums">
                  {c.articles} articles &rarr;
                </span>
              </Link>
            </RevealCard>
          ))}
        </RevealSection>

        {/* Popular Questions */}
        <RevealSection className="card p-8 bg-white mb-16">
          <h2 className="type-h2 text-navy mb-6">Frequently Asked Questions</h2>
          <Accordion items={generalFaqs} />
        </RevealSection>

        {/* Contact Strip */}
        <div className="card-dark p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="type-h3 text-white">Still have questions?</h2>
            <p className="type-caption text-[#C9D3E3] mt-1">
              Our support agents are available around the clock to assist you.
            </p>
          </div>
          <Link href="/contact" className="btn-primary whitespace-nowrap">
            Contact Support Team <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
