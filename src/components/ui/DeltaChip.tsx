import { cn } from '@/lib/utils';

interface DeltaChipProps {
  change: number;
  suffix?: string;
  className?: string;
}

export default function DeltaChip({ change, suffix = '', className }: DeltaChipProps) {
  const isPositive = change >= 0;
  const absFormatted = Math.abs(change).toFixed(2);
  const sign = isPositive ? '+' : '-';

  return (
    <span
      className={cn(isPositive ? 'badge-gain' : 'badge-loss', className)}
      aria-label={`${isPositive ? 'Up' : 'Down'} ${absFormatted} percent${suffix ? ` ${suffix}` : ''}`}
    >
      <span aria-hidden="true">{isPositive ? '▲' : '▼'}</span>
      <span>
        {sign}
        {absFormatted}%{suffix ? ` ${suffix}` : ''}
      </span>
    </span>
  );
}
