/** Soft placeholder shown while a route's code chunk loads. */
export default function PageLoading() {
  return (
    <div className="container-vx py-16" role="status" aria-live="polite">
      <span className="sr-only">Loading page…</span>
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="h-8 w-2/3 animate-pulse rounded-lg bg-surface-subtle" />
        <div className="h-4 w-full animate-pulse rounded bg-surface-subtle" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-surface-subtle" />
        <div className="h-64 w-full animate-pulse rounded-2xl bg-surface-subtle" />
      </div>
    </div>
  );
}
