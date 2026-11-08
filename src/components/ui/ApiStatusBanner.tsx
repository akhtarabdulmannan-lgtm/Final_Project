'use client';

import { RefreshCw, AlertCircle, Wifi } from 'lucide-react';

interface ApiStatusBannerProps {
  isLoading: boolean;
  error: string | null;
  source: string;
  lastUpdated: string | null;
  onRefresh: () => void;
  compact?: boolean;
  dark?: boolean;
}

export default function ApiStatusBanner({
  isLoading,
  error,
  source,
  lastUpdated,
  onRefresh,
  compact = false,
  dark = false,
}: ApiStatusBannerProps) {
  if (error) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`rounded-xl border px-3 py-2 text-xs flex items-center justify-between gap-2 ${
          dark
            ? 'bg-amber-500/15 border-amber-400/30 text-amber-200'
            : 'bg-amber-50 border-amber-200 text-amber-800'
        }`}
      >
        <span className="flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{compact ? 'Offline reference rates active' : error}</span>
        </span>
        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className="inline-flex items-center gap-1 font-semibold underline hover:opacity-80 flex-shrink-0"
        >
          <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`rounded-xl px-3 py-1.5 text-xs flex items-center justify-between gap-2 ${
        dark
          ? 'bg-white/10 text-surface-200 border border-white/10'
          : 'bg-emerald-50/70 text-emerald-800 border border-emerald-200/70'
      }`}
    >
      <span className="flex items-center gap-1.5 truncate">
        <Wifi className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
        <span className="font-semibold">
          {isLoading ? 'Fetching live API rates...' : source}
        </span>
        {!isLoading && lastUpdated && !compact && (
          <span className="opacity-75">• Updated {lastUpdated}</span>
        )}
      </span>
      <button
        type="button"
        onClick={onRefresh}
        disabled={isLoading}
        title="Refresh live rates from API"
        className="inline-flex items-center gap-1 font-semibold hover:opacity-80 flex-shrink-0"
      >
        <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
        {!compact && <span>{isLoading ? 'Syncing' : 'Refresh'}</span>}
      </button>
    </div>
  );
}
