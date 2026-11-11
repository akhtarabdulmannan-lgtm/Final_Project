import { cn } from '@/lib/utils';

interface DeltaChipProps {
  change: number;
  suffix?: string;
  className?: string;
  /**
   * False when there is no earlier published rate to compare against. The chip
   * then says "no prior data" rather than printing a 0.00% that reads like a
   * real quote — every pair used to show +0.00% for exactly this reason.
   */
  hasData?: boolean;
  /** Publication date of the rate being compared against, e.g. "10 Nov 2026". */
  comparedTo?: string | null;
}

export default function DeltaChip({ change, suffix = '', className, hasData = true, comparedTo }: DeltaChipProps) {
  if (!hasData) {
    return (
      <span
        className={cn('badge-neutral', className)}
        title="No earlier published rate is available to compare against yet."
      >
        <span aria-hidden="true">–</span>
        <span>no prior data</span>
      </span>
    );
  }

  const isPositive = change >= 0;
  const absFormatted = Math.abs(change).toFixed(2);
  const sign = isPositive ? '+' : '-';
  const title = comparedTo ? `Change since ${comparedTo}` : undefined;

  return (
    <span
      className={cn(isPositive ? 'badge-gain' : 'badge-loss', className)}
      title={title}
      aria-label={`${isPositive ? 'Up' : 'Down'} ${absFormatted} percent${suffix ? ` ${suffix}` : ''}${
        comparedTo ? ` since ${comparedTo}` : ''
      }`}
    >
      <span aria-hidden="true">{isPositive ? '▲' : '▼'}</span>
      <span>
        {sign}
        {absFormatted}%{suffix ? ` ${suffix}` : ''}
      </span>
    </span>
  );
}
