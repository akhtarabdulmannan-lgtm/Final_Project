'use client';

import { cn } from '@/lib/utils';

interface LiveUpdatedBadgeProps {
  utcTime: string;
  className?: string;
  invert?: boolean;
}

export default function LiveUpdatedBadge({
  utcTime,
  className,
  invert = false,
}: LiveUpdatedBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-caption font-medium tabular-nums',
        invert ? 'text-ink-invert-muted' : 'text-ink-500',
        className
      )}
    >
      <span className="live-dot-pulse" aria-hidden="true" />
      <span>Updated {utcTime} UTC</span>
    </span>
  );
}
