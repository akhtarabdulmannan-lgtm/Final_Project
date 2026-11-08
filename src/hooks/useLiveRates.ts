'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  fetchLiveExchangeRates,
  fetchHistoricalSeries,
  resolveLiveRate,
  type LiveRatesResponse,
  type HistoricalPoint,
} from '@/lib/fxApi';

export function useLiveRates(baseCurrency = 'USD') {
  const [data, setData] = useState<LiveRatesResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadRates = useCallback(
    async (force = false) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchLiveExchangeRates(baseCurrency, force);
        setData(result);
        if (result.isFallback && result.errorMessage) {
          setError(result.errorMessage);
        }
      } catch {
        setError('Unexpected error while fetching live exchange rates.');
      } finally {
        setIsLoading(false);
      }
    },
    [baseCurrency]
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
    lastUpdated: data?.lastUpdated ?? null,
    source: data?.source ?? 'Loading live REST API...',
    isFallback: data?.isFallback ?? false,
    refresh: () => loadRates(true),
    getLivePairRate,
  };
}

export function useHistoricalSeries(fromCode: string, toCode: string, days: number) {
  const [points, setPoints] = useState<HistoricalPoint[]>([]);
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

  return {
    points,
    source,
    isLoading,
    notice,
    reload: loadSeries,
  };
}
