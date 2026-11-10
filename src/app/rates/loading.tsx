import { RatesTableSkeleton } from '@/components/ui/Skeleton';

export default function RatesLoading() {
  return (
    <div className="min-h-screen bg-bg py-10 sm:py-16">
      <div className="container-vx space-y-6">
        <div className="space-y-3">
          <div className="skeleton-shimmer h-6 w-36 rounded-full" />
          <div className="skeleton-shimmer h-12 w-80 max-w-full" />
          <div className="skeleton-shimmer h-5 w-96 max-w-full" />
        </div>
        <RatesTableSkeleton rows={10} />
      </div>
    </div>
  );
}
