import { useState, useMemo } from 'react';
import Link from '@/router/Link';
import { Search, ArrowRight } from 'lucide-react';
import Accordion from '@/components/ui/Accordion';
import ScrollReveal from '@/components/ui/ScrollReveal';

const generalFaqs = [
  {
    question: 'Do I need an account to use VectisX?',
    answer:
      'No. Every converter, chart, table and rate alert works without signing in. An account is only useful if you want your email subscriptions tied to it.',
  },
  {
    question: 'What documents are required for business account verification?',
    answer:
      'Corporate accounts require Certificate of Incorporation, proof of business address within 90 days, and ID verification for directors holding 25% or more equity.',
  },
  {
    question: 'Which exchange rate does the converter use?',
    answer:
      'Live mid-market rates from open.er-api.com, falling back to the European Central Bank feed via Frankfurter. Rates are cached for 15 minutes and marked "Offline rates" when the provider cannot be reached.',
  },
  {
    question: 'How many currencies can I convert between?',
    answer:
      '64 currencies are supported across the converter, cross-rate tables, charts and alerts. Historical charts use ECB reference data and cover windows from one day to ten years.',
  },
];

const categories = [
  { title: 'Rate Alerts & Notifications', articles: 18, desc: 'Setting target rates, alert delivery, and notification preferences.', href: '/alerts' },
  { title: 'Converting & Charts', articles: 12, desc: 'Supported currencies, historical windows, and how to read the inverse rate.', href: '/converter' },
  { title: 'Security & Verification', articles: 9, desc: 'KYC identity verification, 2FA, and fraud prevention.', href: '/security' },
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
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        {/* Hero with Search */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="badge-neutral">Support Center</span>
          <h1>How Can We Help You Today?</h1>
          <p className="text-ink-500 mx-auto">
            Search our knowledge base for instant answers or browse popular guides below.
          </p>

          <div className="relative mt-6">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-500"
              aria-hidden="true"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search help topics"
              placeholder="Search by topic or keyword (e.g. transfer, API, security)..."
              className="input-field pl-12 py-3.5"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {filteredCategories.map((c, idx) => (
            <ScrollReveal key={c.title} delay={idx * 50}>
              <Link
                href={c.href}
                aria-label={`Browse ${c.title}`}
                className="card-interactive p-6 h-full flex flex-col justify-between gap-3"
              >
                <div className="space-y-1.5">
                  <h3 className="text-[18px] leading-[24px]">{c.title}</h3>
                  <p className="text-[14px] leading-[22px] text-ink-500">{c.desc}</p>
                </div>
                <span className="text-caption font-medium text-ink tabular-nums">
                  {c.articles} articles &rarr;
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Popular Questions */}
        <div className="card p-6 sm:p-8 bg-surface mb-14">
          <h2 className="mb-6">Frequently Asked Questions</h2>
          <Accordion items={generalFaqs} />
        </div>

        {/* Contact Strip */}
        <div className="card-invert p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-ink-invert">Still have questions?</h2>
            <p className="text-ink-invert-muted">
              Our support specialists are available around the clock to assist you.
            </p>
          </div>
          <Link href="/contact" className="btn-invert whitespace-nowrap">
            <span>Contact Support Team</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
