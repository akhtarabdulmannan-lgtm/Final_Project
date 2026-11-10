import { useState } from 'react';
import { CloudOff, RotateCw, CheckCircle2 } from 'lucide-react';
import { useLiveRates } from '@/lib/fx/RateProvider';
import { cn } from '@/lib/utils';

/**
 * Tells the user, once per session, where the exchange rates came from and
 * whether they are live. Keeps the "is this real data?" question answerable
 * without digging through the UI.
 */
export default function RateSourceBanner({ className }: { className?: string }) {
  const { status, sourceLabel, isOffline, error, refresh, updatedAt } = useLiveRates();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || status === 'loading') return null;

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-3 border-b px-4 py-2 text-caption',
        isOffline
          ? 'border-loss-border bg-loss-bg text-ink'
          : 'border-line bg-surface-subtle text-ink-500',
        className
      )}
      role={isOffline ? 'alert' : 'status'}
    >
      <span className="inline-flex items-center gap-2">
        {isOffline ? (
          <CloudOff className="h-4 w-4 text-loss" aria-hidden="true" />
        ) : (
          <CheckCircle2 className="h-4 w-4 text-gain" aria-hidden="true" />
        )}
        {isOffline ? (
          <span>
            <strong className="font-medium">Offline rates.</strong> We couldn&apos;t reach the
            exchange-rate API, so these are saved figures from {updatedAt}.
            {error?.detail ? <span className="sr-only"> Reason: {error.detail}</span> : null}
          </span>
        ) : (
          <span>
            Live rates from <strong className="font-medium text-ink">{sourceLabel}</strong>, updated{' '}
            {updatedAt}
          </span>
        )}
      </span>
      <span className="inline-flex items-center gap-3">
        <button
          type="button"
          onClick={refresh}
          className="inline-flex min-h-[32px] items-center gap-1.5 rounded-md px-2 font-medium text-ink underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
          Refresh
        </button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="min-h-[32px] rounded-md px-2 text-ink-500 underline-offset-2 hover:text-ink hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Dismiss
        </button>
      </span>
    </div>
  );
}
