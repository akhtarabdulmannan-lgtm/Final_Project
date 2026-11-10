import { cn } from '@/lib/utils';
import { useLiveRates } from '@/lib/fx/RateProvider';

interface LiveUpdatedBadgeProps {
  /** Optional override; defaults to the loaded rate snapshot timestamp. */
  utcTime?: string;
  className?: string;
  invert?: boolean;
}

/**
 * Shows where the numbers on screen came from and when.
 *
 * Driven by the rate snapshot rather than a timer, so it can't imply
 * "live" when the API request actually failed.
 */
export default function LiveUpdatedBadge({
  utcTime,
  className,
  invert = false,
}: LiveUpdatedBadgeProps) {
  const { status, sourceLabel, isOffline, updatedAt } = useLiveRates();

  const label =
    status === 'loading'
      ? 'Fetching live rates…'
      : isOffline
        ? 'Offline — showing saved rates'
        : utcTime
          ? `Updated ${utcTime} UTC`
          : `Updated ${updatedAt}`;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-caption font-medium tabular-nums',
        invert ? 'text-ink-invert-muted' : 'text-ink-500',
        className
      )}
      title={sourceLabel}
    >
      <span
        className={cn(
          'live-dot-pulse',
          isOffline && 'opacity-40',
          status === 'loading' && 'animate-pulse'
        )}
        aria-hidden="true"
      />
      <span>
        {label}
        {status === 'ready' && !utcTime ? (
          <span className="sr-only"> from {sourceLabel}</span>
        ) : null}
      </span>
    </span>
  );
}
