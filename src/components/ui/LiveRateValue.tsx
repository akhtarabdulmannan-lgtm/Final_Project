'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface LiveRateValueProps {
  value: number;
  pairKey: string;
  formatted: string;
  className?: string;
}

export default function LiveRateValue({
  value,
  pairKey,
  formatted,
  className,
}: LiveRateValueProps) {
  const [flash, setFlash] = useState<'gain' | 'loss' | null>(null);
  const hasMountedRef = useRef(false);
  const prevPairRef = useRef(pairKey);
  const prevValueRef = useRef(value);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      prevPairRef.current = pairKey;
      prevValueRef.current = value;
      return;
    }

    if (prevPairRef.current !== pairKey) {
      prevPairRef.current = pairKey;
      prevValueRef.current = value;
      setFlash(null);
      return;
    }

    if (value !== prevValueRef.current) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const direction = value > prevValueRef.current ? 'gain' : 'loss';
      prevValueRef.current = value;

      if (!reduced) {
        if (timerRef.current) window.clearTimeout(timerRef.current);
        setFlash(direction);
        timerRef.current = window.setTimeout(() => {
          setFlash(null);
        }, 600);
      }
    }
  }, [value, pairKey]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <span
      className={cn(
        'tabular-nums px-1 -mx-1 transition-colors duration-150',
        flash === 'gain' && 'rate-flash-gain',
        flash === 'loss' && 'rate-flash-loss',
        className
      )}
    >
      {formatted}
    </span>
  );
}
