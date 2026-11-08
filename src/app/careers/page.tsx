'use client';

import Link from 'next/link';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function CareersPage() {
  const jobs = [
    { title: 'Senior Quantitative FX Engineer', team: 'Rate Blender Core', location: 'London / Remote', type: 'Full-time' },
    { title: 'Staff Frontend Engineer (Next.js / TypeScript)', team: 'Consumer Experience', location: 'New York / Hybrid', type: 'Full-time' },
    { title: 'Compliance & AML Operations Officer', team: 'Legal & Risk', location: 'Toronto / Hybrid', type: 'Full-time' },
    { title: 'Enterprise Treasury Solutions Architect', team: 'Corporate Sales', location: 'Singapore / Remote', type: 'Full-time' },
    { title: 'Site Reliability Engineer (Kubernetes & AWS)', team: 'Infrastructure', location: 'Remote (Global)', type: 'Full-time' },
  ];

  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Join Our Team</span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-surface-900 mt-2">
            Build the Future of Global Money Movement
          </h1>
          <p className="text-surface-600 text-base mt-3 leading-relaxed">
            At VectisX, we solve complex cross-border challenges for millions of individuals and thousands of international businesses every single day.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="card p-6 bg-white">
            <h3 className="font-bold text-surface-900 text-lg mb-2">Global Remote First</h3>
            <p className="text-xs text-surface-600">Work from anywhere with home office equipment stipends and co-working allowances.</p>
          </div>
          <div className="card p-6 bg-white">
            <h3 className="font-bold text-surface-900 text-lg mb-2">Competitive Equity & 401(k)</h3>
            <p className="text-xs text-surface-600">Share in the collective upside with equity grants and competitive retirement matching.</p>
          </div>
          <div className="card p-6 bg-white">
            <h3 className="font-bold text-surface-900 text-lg mb-2">Comprehensive Health</h3>
            <p className="text-xs text-surface-600">100% company-paid medical, dental, and vision coverage for you and your dependents.</p>
          </div>
        </div>

        {/* Job Listings */}
        <div className="card p-6 sm:p-8 bg-white shadow-sm mb-12">
          <h3 className="text-2xl font-bold font-heading text-surface-900 mb-6">Open Positions</h3>
          <div className="divide-y divide-surface-100">
            {jobs.map(j => (
              <div key={j.title} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-50 px-2 rounded-xl transition-colors">
                <div>
                  <h4 className="font-bold text-surface-900 text-base">{j.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-surface-500 mt-1">
                    <span>{j.team}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {j.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {j.type}</span>
                  </div>
                </div>
                <button className="btn-secondary btn-sm self-start sm:self-auto">
                  Apply Now &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
