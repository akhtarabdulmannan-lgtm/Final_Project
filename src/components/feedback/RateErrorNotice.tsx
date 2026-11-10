import { AlertTriangle, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FxApiErrorShape } from '@/lib/fx/types';

interface RateErrorNoticeProps {
  error: FxApiErrorShape | null;
  onRetry?: () => void;
  className?: string;
  compact?: boolean;
}

/**
 * Shown when a request to the rate API fails. Always names what went wrong
 * in plain language, offers a retry when one could help, and keeps the
 * technical detail tucked away behind a disclosure for debugging.
 */
export default function RateErrorNotice({
  error,
  onRetry,
  className,
  compact = false,
}: RateErrorNoticeProps) {
  if (!error) return null;

  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col gap-3 rounded-xl border border-loss-border bg-loss-bg px-4 py-3 text-body-sm',
        compact && 'py-2.5',
        className
      )}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-loss" aria-hidden="true" />
        <div className="flex-1">
          <p className="font-medium text-ink">{error.message}</p>
          <p className="mt-1 text-ink-500">
            {error.retryable
              ? 'Check your connection and try again — the converter keeps working with the last rates it received.'
              : 'This pair is not published by the rate provider, so no chart can be drawn for it.'}
          </p>
          {error.detail ? (
            <details className="mt-2">
              <summary className="cursor-pointer text-caption text-ink-500 hover:text-ink">
                Technical details
              </summary>
              <code className="mt-1 block whitespace-pre-wrap break-all text-caption text-ink-500">
                {error.detail}
              </code>
            </details>
          ) : null}
        </div>
        {error.retryable && onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex min-h-[36px] shrink-0 items-center gap-1.5 rounded-lg border border-line-strong bg-surface px-3 text-caption font-medium text-ink transition-colors hover:bg-surface-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
            Retry
          </button>
        ) : null}
      </div>
    </div>
  );
}
