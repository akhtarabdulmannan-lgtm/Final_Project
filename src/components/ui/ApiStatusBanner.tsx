'use client';

import { useEffect, useState } from 'react';
import { RefreshCw, AlertCircle, Wifi } from 'lucide-react';
import {
  FX_PROVIDER_OPTIONS,
  getFxProviderMode,
  setFxProviderMode,
  subscribeFxProviderMode,
  type FxProviderMode,
} from '@/lib/fxApi';

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
  const [mode, setMode] = useState<FxProviderMode>(() => getFxProviderMode());

  useEffect(() => {
    return subscribeFxProviderMode(setMode);
  }, []);

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
      className={`rounded-xl px-3 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2 ${
        dark
          ? 'bg-white/10 text-surface-200 border border-white/10'
          : 'bg-emerald-50/70 text-emerald-800 border border-emerald-200/70'
      }`}
    >
      <span className="flex items-center gap-1.5 min-w-0">
        <Wifi className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
        <span className="font-semibold truncate">
          {isLoading ? 'Fetching live API rates...' : source}
        </span>
        {!isLoading && lastUpdated && !compact && (
          <span className="opacity-75 hidden sm:inline">• {lastUpdated}</span>
        )}
      </span>

      <div className="flex items-center gap-2 ml-auto">
        <label className="sr-only" htmlFor={compact ? 'fx-source-compact' : 'fx-source-full'}>
          Rate Feed Source
        </label>
        <select
          id={compact ? 'fx-source-compact' : 'fx-source-full'}
          value={mode}
          onChange={(e) => setFxProviderMode(e.target.value as FxProviderMode)}
          title="Select live FX rate provider"
          className={`rounded-lg px-2 py-0.5 text-[11px] font-medium border focus:outline-none cursor-pointer ${
            dark
              ? 'bg-surface-900/70 text-white border-white/20'
              : 'bg-white text-emerald-900 border-emerald-200'
          }`}
        >
          {FX_PROVIDER_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id} className="text-surface-900 bg-white">
              {compact ? opt.shortLabel : opt.label}
            </option>
          ))}
        </select>

        {!compact && (mode === 'consensus' || mode === 'central_bank') && (
          <a
            href="https://allratestoday.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline opacity-75 hover:opacity-100 hidden md:inline"
          >
            Central bank data: AllRatesToday
          </a>
        )}

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
    </div>
  );
}
