'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  fetchLiveExchangeRates,
  fetchHistoricalSeries,
  resolveLiveRate,
  getFxProviderMode,
  setFxProviderMode,
  subscribeFxProviderMode,
  type FxProviderMode,
  type LiveRatesResponse,
  type HistoricalPoint,
} from '@/lib/fxApi';
import { getHistoricalRates } from '@/lib/rates';

export function useLiveRates(baseCurrency = 'USD') {
  const [providerMode, setProviderState] = useState<FxProviderMode>(() => getFxProviderMode());
  const [data, setData] = useState<LiveRatesResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const requestSeq = useRef(0);

  useEffect(() => {
    return subscribeFxProviderMode((newMode) => {
      setProviderState(newMode);
    });
  }, []);

  const loadRates = useCallback(
    async (force = false) => {
      const seq = ++requestSeq.current;
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchLiveExchangeRates(baseCurrency, force, providerMode);
        if (seq !== requestSeq.current) return;
        setData(result);
        if (result.isFallback && result.errorMessage) {
          setError(result.errorMessage);
        }
      } catch {
        if (seq !== requestSeq.current) return;
        setError('Unexpected error while fetching live exchange rates.');
      } finally {
        if (seq === requestSeq.current) {
          setIsLoading(false);
        }
      }
    },
    [baseCurrency, providerMode]
  );

  useEffect(() => {
    loadRates(false);
  }, [loadRates]);

  const getLivePairRate = useCallback(
    (from: string, to: string) => resolveLiveRate(from, to, data),
    [data]
  );

  return {
    data,
    isLoading,
    error,
    providerMode,
    changeProviderMode: setFxProviderMode,
    lastUpdated: data?.lastUpdated ?? null,
    source: data?.source ?? 'Loading live REST API...',
    isFallback: data?.isFallback ?? false,
    refresh: () => loadRates(true),
    getLivePairRate,
  };
}

export function useHistoricalSeries(fromCode: string, toCode: string, days: number) {
  const [points, setPoints] = useState<HistoricalPoint[]>(() =>
    getHistoricalRates(fromCode, toCode, days)
  );
  const [source, setSource] = useState<string>('Frankfurter ECB Historical REST API');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notice, setNotice] = useState<string | null>(null);

  const loadSeries = useCallback(async () => {
    setIsLoading(true);
    setNotice(null);
    try {
      const res = await fetchHistoricalSeries(fromCode, toCode, days);
      setPoints(res.points);
      setSource(res.source);
      setNotice(res.notice ?? null);
    } catch {
      setNotice('Could not load historical time-series data.');
    } finally {
      setIsLoading(false);
    }
  }, [fromCode, toCode, days]);

  useEffect(() => {
    loadSeries();
  }, [loadSeries]);

  useEffect(() => {
    return subscribeFxProviderMode(() => {
      loadSeries();
    });
  }, [loadSeries]);

  return {
    points,
    source,
    isLoading,
    notice,
    reload: loadSeries,
  };
}
