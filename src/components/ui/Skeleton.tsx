import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div aria-hidden="true" className={cn('skeleton-shimmer', className)} />;
}

export function RatesTableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div
      className="bg-surface rounded-2xl border border-line overflow-hidden"
      role="status"
      aria-label="Loading exchange rates"
    >
      <div className="p-4 border-b border-line bg-surface-subtle flex items-center justify-between gap-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="divide-y divide-line">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-28 hidden sm:block" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div
      className="card p-6 bg-surface space-y-6"
      role="status"
      aria-label="Loading chart data"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-line">
        <div className="space-y-2">
          <Skeleton className="h-7 w-52" />
          <Skeleton className="h-4 w-36" />
        </div>
        <Skeleton className="h-10 w-64 rounded-xl" />
      </div>
      <Skeleton className="h-80 w-full rounded-xl" />
    </div>
  );
}

export function ConverterSkeleton() {
  return (
    <div
      className="bg-surface rounded-2xl border border-line p-6 space-y-4 w-full max-w-xl"
      role="status"
      aria-label="Updating conversion rate"
    >
      <Skeleton className="h-10 w-full rounded-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Skeleton className="h-11 w-full rounded-xl" />
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>
      <Skeleton className="h-24 w-full rounded-xl" />
    </div>
  );
}
