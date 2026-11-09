'use client';

import Link from 'next/link';
import { Download } from 'lucide-react';
import BrandLogo from '@/components/ui/BrandLogo';
import { RevealSection } from '@/components/ui/MotionPrimitives';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function PressPage() {
  const releases = [
    {
      date: 'October 24, 2026',
      title: 'VectisX Crosses $17 Billion in Annual Global FX Volume Benchmarked',
      tag: 'Corporate',
    },
    {
      date: 'August 12, 2026',
      title: 'VectisX Unveils Next-Gen Rate Blender™ Engine with Millisecond Micro-Spike Filtering',
      tag: 'Product',
    },
    {
      date: 'May 19, 2026',
      title: 'VectisX Business Announces Native Integration with Microsoft Dynamics 365 Finance',
      tag: 'Partnership',
    },
    {
      date: 'January 10, 2026',
      title: 'VectisX Surpasses 500,000 Monthly Active Analysts Across Global FX Corridors',
      tag: 'Milestone',
    },
  ];

  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Media &amp; Communications</span>
          <h1 className="type-h1 text-navy mt-2">
            Newsroom &amp; Press Releases
          </h1>
          <p className="type-body text-body mt-3">
            Official announcements, press releases, media kits, and corporate coverage from the VectisX global team.
          </p>
        </div>

        {/* Media Kit Card */}
        <div className="card-dark p-6 sm:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <BrandLogo variant="dark" size="lg" />
            <h2 className="type-h3 text-white">Download Official Media Brand Kit</h2>
            <p className="type-caption text-[#C9D3E3]">
              Access official VectisX high-resolution brand lockups, monograms, and usage guidelines.
            </p>
          </div>
          <a
            href={`${BASE_PATH}/brand/vectisx-brand-sheet.png`}
            download="VectisX-Official-Brand-Kit.png"
            className="btn-primary btn-sm flex items-center gap-2 whitespace-nowrap"
          >
            <Download className="w-4 h-4" aria-hidden="true" /> Download Brand Assets
          </a>
        </div>

        {/* Releases */}
        <RevealSection className="card p-6 sm:p-8 bg-white mb-12">
          <h2 className="type-h2 text-navy mb-6">Recent Press Releases</h2>
          <div className="divide-y divide-surface-200">
            {releases.map((r) => (
              <div
                key={r.title}
                className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-page px-3 rounded-xl transition-colors duration-150 ease-fintech"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="badge-brand text-[11px] uppercase tracking-wider">{r.tag}</span>
                    <span className="type-caption text-caption">{r.date}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-navy text-lg">{r.title}</h3>
                </div>
                <Link
                  href="/blog"
                  aria-label={`Read release: ${r.title}`}
                  className="inline-flex items-center min-h-[44px] px-3 rounded-xl type-caption font-semibold text-primary hover:bg-primary-pale transition-colors duration-150 ease-fintech self-start sm:self-auto whitespace-nowrap"
                >
                  Read Release &rsaquo;
                </Link>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* Media Contact */}
        <div className="card p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading font-semibold text-navy text-base">Media Inquiries</h2>
            <p className="type-caption text-caption mt-0.5">
              Contact our global PR relations team at press@vectisx.com
            </p>
          </div>
          <a href="mailto:press@vectisx.com" className="btn-secondary btn-sm self-start sm:self-auto">
            Email Press Team
          </a>
        </div>
      </div>
    </div>
  );
}
