import { ConverterSkeleton } from '@/components/ui/Skeleton';

export default function AlertsLoading() {
  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx flex flex-col items-center space-y-8">
        <div className="space-y-3 text-center w-full max-w-xl">
          <div className="skeleton-shimmer h-6 w-36 mx-auto rounded-full" />
          <div className="skeleton-shimmer h-12 w-3/4 mx-auto" />
        </div>
        <ConverterSkeleton />
      </div>
    </div>
  );
}
