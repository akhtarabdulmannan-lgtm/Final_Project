'use client';

import { useEffect, useRef, useState } from 'react';
import { RefreshCw, AlertCircle, Wifi, Check } from 'lucide-react';
import {
  FX_PROVIDER_OPTIONS,
  getFxProviderMode,
  setFxProviderMode,
  subscribeFxProviderMode,
  type FxProviderMode,
} from '@/lib/fxApi';
import { LiveTimestamp } from '@/components/ui/MotionPrimitives';

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
  const [justRefreshed, setJustRefreshed] = useState(false);
  const manualRefreshRef = useRef(false);

  useEffect(() => {
    return subscribeFxProviderMode(setMode);
  }, []);

  useEffect(() => {
    if (!isLoading && manualRefreshRef.current) {
      manualRefreshRef.current = false;
      setJustRefreshed(true);
      const timer = window.setTimeout(() => setJustRefreshed(false), 800);
      return () => window.clearTimeout(timer);
    }
  }, [isLoading]);

  const handleRefreshClick = () => {
    manualRefreshRef.current = true;
    onRefresh();
  };

  if (error) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-loss-border bg-loss-bg px-3 py-2 type-caption text-loss-text flex items-center justify-between gap-2"
      >
        <span className="flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span>{compact ? 'Offline reference rates active' : error}</span>
        </span>
        <button
          type="button"
          onClick={handleRefreshClick}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-1 min-h-[44px] px-3 rounded-lg font-semibold underline hover:opacity-80 flex-shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} aria-hidden="true" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`rounded-xl px-3 py-1.5 type-caption flex flex-wrap items-center justify-between gap-2 border ${
        dark
          ? 'bg-navy-elevated text-[#DBE6FD] border-navy-border'
          : 'bg-gain-bg text-gain-text border-gain-border'
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 min-w-0">
        <span className="inline-flex items-center gap-1.5 min-w-0">
          <Wifi
            className={`w-3.5 h-3.5 flex-shrink-0 ${dark ? 'text-[#DBE6FD]' : 'text-gain-text'}`}
            aria-hidden="true"
          />
          <span className="font-semibold truncate">
            {isLoading ? 'Fetching live API rates...' : source}
          </span>
        </span>
        {!isLoading && !compact && (
          <LiveTimestamp
            timestamp={lastUpdated ?? undefined}
            inverse={dark}
            className={dark ? '' : '!text-gain-text'}
          />
        )}
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <label className="sr-only" htmlFor={compact ? 'fx-source-compact' : 'fx-source-full'}>
          Rate Feed Source
        </label>
        <select
          id={compact ? 'fx-source-compact' : 'fx-source-full'}
          value={mode}
          onChange={(e) => setFxProviderMode(e.target.value as FxProviderMode)}
          title="Select live FX rate provider"
          className={`min-h-[44px] rounded-lg px-2.5 py-1 type-caption font-medium border cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${
            dark
              ? 'bg-navy text-white border-navy-border'
              : 'bg-white text-navy border-surface-300'
          }`}
        >
          {FX_PROVIDER_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id} className="text-navy bg-white">
              {compact ? opt.shortLabel : opt.label}
            </option>
          ))}
        </select>

        {!compact && (mode === 'consensus' || mode === 'central_bank') && (
          <a
            href="https://allratestoday.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center min-h-[44px] px-1 underline hover:opacity-80 hidden md:inline-flex"
          >
            Central bank data: AllRatesToday
          </a>
        )}

        <button
          type="button"
          onClick={handleRefreshClick}
          disabled={isLoading}
          aria-label="Refresh live exchange rates"
          className="inline-flex items-center justify-center gap-1 min-h-[44px] min-w-[44px] px-2.5 rounded-lg font-semibold hover:opacity-80 disabled:opacity-50 flex-shrink-0"
          title="Refresh live rates from API"
        >
          {justRefreshed ? (
            <>
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
              {!compact && <span>Updated</span>}
            </>
          ) : (
            <>
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} aria-hidden="true" />
              {!compact && <span>Refresh</span>}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
