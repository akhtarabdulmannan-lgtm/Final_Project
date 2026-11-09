'use client';

import Link from 'next/link';
import { Newspaper, Download, Mail, ExternalLink } from 'lucide-react';
import BrandLogo from '@/components/ui/BrandLogo';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function PressPage() {
  const releases = [
    { date: 'October 24, 2026', title: 'VectisX Crosses $17 Billion in Annual Global Business Payment Volume', tag: 'Corporate' },
    { date: 'August 12, 2026', title: 'VectisX Unveils Next-Gen Rate Blender™ Engine with Millisecond Micro-Spike Filtering', tag: 'Product' },
    { date: 'May 19, 2026', title: 'VectisX Business Announces Native Integration with Microsoft Dynamics 365 Finance', tag: 'Partnership' },
    { date: 'January 10, 2026', title: 'VectisX Surpasses 500,000 Monthly Active Analysts Across Global FX Corridors', tag: 'Milestone' },
  ];

  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Media & Communications</span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-surface-900 mt-2">
            Newsroom & Press Releases
          </h1>
          <p className="text-surface-600 text-base mt-3 leading-relaxed">
            Official announcements, press releases, media kits, and corporate coverage from the VectisX global team.
          </p>
        </div>

        {/* Media Kit Card */}
        <div className="card p-6 sm:p-8 bg-brand-900 text-white rounded-3xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <BrandLogo variant="dark" size="lg" />
            <h3 className="text-xl font-bold font-heading">Download Official Media Brand Kit</h3>
            <p className="text-xs text-surface-300">
              Access official VectisX high-resolution brand lockups, monograms, and usage guidelines.
            </p>
          </div>
          <a
            href={`${BASE_PATH}/brand/vectisx-brand-sheet.png`}
            download="VectisX-Official-Brand-Kit.png"
            className="btn-teal btn-sm flex items-center gap-2 whitespace-nowrap"
          >
            <Download className="w-4 h-4" /> Download Brand Assets
          </a>
        </div>

        {/* Releases */}
        <div className="card p-6 sm:p-8 bg-white shadow-sm mb-12">
          <h3 className="text-xl font-bold font-heading text-surface-900 mb-6">Recent Press Releases</h3>
          <div className="divide-y divide-surface-100">
            {releases.map((r, i) => (
              <div key={i} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-50 px-2 rounded-xl transition-colors">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                      {r.tag}
                    </span>
                    <span className="text-xs text-surface-400">{r.date}</span>
                  </div>
                  <h4 className="font-bold text-surface-900 text-base hover:text-brand-500 cursor-pointer">
                    {r.title}
                  </h4>
                </div>
                <button className="text-xs font-bold text-brand-500 hover:underline flex items-center gap-1 self-start sm:self-auto">
                  Read Release &rsaquo;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Media Contact */}
        <div className="card p-6 bg-white flex items-center justify-between">
          <div>
            <h4 className="font-bold text-surface-900 text-sm">Media Inquiries</h4>
            <p className="text-xs text-surface-500">Contact our global PR relations team at press@vectisx.com</p>
          </div>
          <a href="mailto:press@vectisx.com" className="btn-secondary btn-sm">
            Email Press Team
          </a>
        </div>
      </div>
    </div>
  );
}
