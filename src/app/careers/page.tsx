'use client';

import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';
import { RevealCard, RevealSection } from '@/components/ui/MotionPrimitives';

export default function CareersPage() {
  const jobs = [
    {
      title: 'Senior Quantitative FX Engineer',
      team: 'Rate Blender Core',
      location: 'London / Remote',
      type: 'Full-time',
    },
    {
      title: 'Staff Frontend Engineer (Next.js / TypeScript)',
      team: 'Platform Experience',
      location: 'New York / Hybrid',
      type: 'Full-time',
    },
    {
      title: 'Compliance & AML Operations Officer',
      team: 'Legal & Risk',
      location: 'Toronto / Hybrid',
      type: 'Full-time',
    },
    {
      title: 'Enterprise Treasury Solutions Architect',
      team: 'Corporate Sales',
      location: 'Singapore / Remote',
      type: 'Full-time',
    },
    {
      title: 'Site Reliability Engineer (Kubernetes & AWS)',
      team: 'Infrastructure',
      location: 'Remote (Global)',
      type: 'Full-time',
    },
  ];

  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Join Our Team</span>
          <h1 className="type-h1 text-navy mt-2">
            Build the Future of Global Currency Intelligence
          </h1>
          <p className="type-body text-body mt-3">
            At VectisX, we solve complex cross-border data and treasury challenges for analysts, developers, and international businesses every single day.
          </p>
        </div>

        {/* Benefits */}
        <RevealSection className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <RevealCard index={0}>
            <div className="card p-6 bg-white h-full">
              <h2 className="type-h3 text-navy mb-2">Global Remote First</h2>
              <p className="text-sm text-body">
                Work from anywhere with home office equipment stipends and co-working allowances.
              </p>
            </div>
          </RevealCard>
          <RevealCard index={1}>
            <div className="card p-6 bg-white h-full">
              <h2 className="type-h3 text-navy mb-2">Competitive Equity &amp; 401(k)</h2>
              <p className="text-sm text-body">
                Share in the collective upside with equity grants and competitive retirement matching.
              </p>
            </div>
          </RevealCard>
          <RevealCard index={2}>
            <div className="card p-6 bg-white h-full">
              <h2 className="type-h3 text-navy mb-2">Comprehensive Health</h2>
              <p className="text-sm text-body">
                100% company-paid medical, dental, and vision coverage for you and your dependents.
              </p>
            </div>
          </RevealCard>
        </RevealSection>

        {/* Job Listings */}
        <RevealSection className="card p-6 sm:p-8 bg-white mb-12">
          <h2 className="type-h2 text-navy mb-6">Open Positions</h2>
          <div className="divide-y divide-surface-200">
            {jobs.map((j) => (
              <div
                key={j.title}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-page px-3 rounded-xl transition-colors duration-150 ease-fintech"
              >
                <div>
                  <h3 className="font-heading font-semibold text-navy text-lg">{j.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 type-caption text-caption mt-1">
                    <span>{j.team}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" /> {j.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" /> {j.type}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/contact`}
                  aria-label={`Apply now for ${j.title}`}
                  className="btn-secondary btn-sm self-start sm:self-auto"
                >
                  Apply Now &rarr;
                </Link>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
