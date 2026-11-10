import Link from '@/router/Link';
import { MapPin, Clock } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function CareersPage() {
  const jobs = [
    { title: 'Senior Quantitative FX Engineer', team: 'Rate Data Platform', location: 'London / Remote', type: 'Full-time' },
    { title: 'Staff Frontend Engineer (Next.js / TypeScript)', team: 'Consumer Experience', location: 'New York / Hybrid', type: 'Full-time' },
    { title: 'Compliance & AML Operations Officer', team: 'Legal & Risk', location: 'Toronto / Hybrid', type: 'Full-time' },
    { title: 'Enterprise Treasury Solutions Architect', team: 'Corporate Sales', location: 'Singapore / Remote', type: 'Full-time' },
    { title: 'Site Reliability Engineer (Kubernetes & AWS)', team: 'Infrastructure', location: 'Remote (Global)', type: 'Full-time' },
  ];

  const benefits = [
    {
      title: 'Global Remote First',
      desc: 'Work from anywhere with home office equipment stipends and co-working allowances.',
    },
    {
      title: 'Competitive Equity & 401(k)',
      desc: 'Share in the collective upside with equity grants and competitive retirement matching.',
    },
    {
      title: 'Comprehensive Health',
      desc: '100% company-paid medical, dental, and vision coverage for you and your dependents.',
    },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">Join Our Team</span>
          <h1>Build the Future of Global Money Movement</h1>
          <p className="text-ink-500">
            At VectisX, we solve complex cross-border challenges for millions of individuals and thousands of international businesses every single day.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {benefits.map((b, idx) => (
            <ScrollReveal key={b.title} delay={idx * 50}>
              <div className="card p-6 bg-surface h-full space-y-2">
                <h3>{b.title}</h3>
                <p className="text-[15px] leading-[24px] text-ink-500">{b.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Job Listings */}
        <div className="card p-6 sm:p-8 bg-surface">
          <h2 className="mb-6">Open Positions</h2>
          <div className="divide-y divide-line">
            {jobs.map((j) => (
              <div
                key={j.title}
                className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-subtle/60 px-3 rounded-xl transition-colors duration-150"
              >
                <div>
                  <h3 className="text-[18px] leading-[24px]">{j.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-caption text-ink-500 mt-1.5">
                    <span>{j.team}</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{j.location}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{j.type}</span>
                    </span>
                  </div>
                </div>
                <Link href="/contact" className="btn-secondary btn-sm self-start sm:self-auto whitespace-nowrap">
                  Apply Now &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
