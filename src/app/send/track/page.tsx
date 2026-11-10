'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, CheckCircle2, Clock } from 'lucide-react';
import ActionButton from '@/components/ui/ActionButton';
import { Skeleton } from '@/components/ui/Skeleton';
import { wait } from '@/lib/utils';

export default function TrackTransferPage() {
  const [trackingId, setTrackingId] = useState('VX-849204-EUR');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [isSearching, setIsSearching] = useState(false);
  const [searchedId, setSearchedId] = useState('VX-849204-EUR');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim() || status === 'loading') return;
    setStatus('loading');
    setIsSearching(true);
    await wait(300);
    setSearchedId(trackingId.trim().toUpperCase());
    setIsSearching(false);
    setStatus('success');
    window.setTimeout(() => setStatus('idle'), 800);
  };

  const timeline = [
    { label: 'Transfer Created & Rate Locked', time: '09:14:22 UTC', detail: '$2,500.00 USD locked at 1 USD = 0.8534 EUR', done: true },
    { label: 'Funding Cleared via ACH', time: '09:16:05 UTC', detail: 'Funds verified and reserved in segregated account', done: true },
    { label: 'Dispatched on SEPA Instant Rail', time: '09:18:40 UTC', detail: 'Settling directly to recipient IBAN', done: true },
    { label: 'Beneficiary Account Credited', time: 'Estimated 09:24 UTC', detail: '€2,133.50 EUR arriving in recipient account', done: false },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx max-w-3xl">
        <div className="mb-10 space-y-3">
          <span className="badge-neutral">Transfer Status</span>
          <h1>Track Your International Transfer</h1>
          <p className="text-ink-500">
            Enter your VectisX transfer reference ID to inspect live payment clearing milestones.
          </p>
        </div>

        <form onSubmit={handleTrack} className="card p-6 bg-surface mb-8 space-y-4">
          <label htmlFor="tracking-reference-input" className="block">
            Transfer Reference Number
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-ink-500 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                id="tracking-reference-input"
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="e.g. VX-849204-EUR"
                required
                className="input-field pl-10 tabular-nums uppercase"
              />
            </div>
            <ActionButton type="submit" status={status} successLabel="Located">
              Track Transfer
            </ActionButton>
          </div>
        </form>

        {isSearching ? (
          <div className="card p-6 bg-surface space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : (
          <div className="card p-6 sm:p-8 bg-surface space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-line">
              <div>
                <div className="text-caption text-ink-500">Reference ID</div>
                <div className="text-[20px] font-heading font-semibold text-ink tabular-nums">
                  {searchedId}
                </div>
              </div>
              <span className="badge-gain">● In Transit · SEPA Instant</span>
            </div>

            <div className="space-y-4">
              {timeline.map((step) => (
                <div
                  key={step.label}
                  className="flex items-start gap-3 p-4 rounded-xl bg-surface-subtle border border-line"
                >
                  {step.done ? (
                    <CheckCircle2 className="w-5 h-5 text-gain flex-shrink-0 mt-0.5" aria-hidden="true" />
                  ) : (
                    <Clock className="w-5 h-5 text-ink-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold text-ink text-[15px]">{step.label}</span>
                      <span className="text-caption text-ink-500 tabular-nums">{step.time}</span>
                    </div>
                    <p className="text-[14px] text-ink-500 mt-0.5 tabular-nums">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap justify-between gap-3">
              <Link href="/send" className="btn-primary">
                Initiate New Transfer
              </Link>
              <Link href="/contact" className="btn-secondary">
                Need Help with This Transfer?
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
