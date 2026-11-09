'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';

/**
 * Reactive prefers-reduced-motion hook.
 * Defaults to false during SSR so markup matches static output, and updates immediately on mount.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}

/**
 * True only after client hydration — ensures SSR / No-JS HTML renders full visible content,
 * while client-side fetches show neutral --line skeletons instead of blank space.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}

/**
 * Motion #1: Live rate change flash (--gain-bg or --loss-bg for 600ms).
 * Never triggers on first render or initial baseline hydration.
 */
export function RateFlash({
  value,
  ready = true,
  children,
  className = '',
}: {
  value: number;
  ready?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const prevRef = useRef<number | null>(null);
  const baselineLockedRef = useRef(false);
  const [flash, setFlash] = useState<'gain' | 'loss' | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!Number.isFinite(value) || !ready) return;

    if (!baselineLockedRef.current) {
      baselineLockedRef.current = true;
      prevRef.current = value;
      return;
    }

    const prev = prevRef.current;
    prevRef.current = value;

    if (reducedMotion || prev === null || Math.abs(value - prev) < 1e-8) {
      return;
    }

    setFlash(value > prev ? 'gain' : 'loss');
    const timer = window.setTimeout(() => {
      setFlash(null);
    }, 600);

    return () => window.clearTimeout(timer);
  }, [value, ready, reducedMotion]);

  const flashClass =
    flash === 'gain'
      ? 'rate-flash-gain'
      : flash === 'loss'
      ? 'rate-flash-loss'
      : '';

  return (
    <span className={`rate-flash tabular-nums ${flashClass} ${className}`.trim()}>
      {children}
    </span>
  );
}

/**
 * Formats any timestamp string into clean "Updated [time] UTC" text.
 */
export function formatUpdatedUtc(timestamp?: string): string {
  if (!timestamp) return 'Updated 00:00 UTC';
  const timeMatch = timestamp.match(/(\d{2}:\d{2}(?::\d{2})?)/);
  if (timeMatch) {
    return `Updated ${timeMatch[1].slice(0, 5)} UTC`;
  }
  const dateMatch = timestamp.match(/(\d{4}-\d{2}-\d{2})/);
  if (dateMatch) {
    return `Updated ${dateMatch[1]} 00:00 UTC`;
  }
  const cleaned = timestamp.replace(/^Updated\s+/i, '').replace(/\s*UTC$/i, '').trim();
  return `Updated ${cleaned || '00:00'} UTC`;
}

/**
 * Motion #2: "Updated [time] UTC" with a 6px --gain dot and slow 2s opacity pulse.
 */
export function LiveTimestamp({
  timestamp,
  className = '',
  inverse = false,
}: {
  timestamp?: string;
  className?: string;
  inverse?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 type-caption tabular-nums ${
        inverse ? 'text-[#C9D3E3]' : 'text-caption'
      } ${className}`.trim()}
    >
      <span className="live-dot" aria-hidden="true" />
      <span>{formatUpdatedUtc(timestamp)}</span>
    </span>
  );
}

/**
 * Motion #4: Scroll reveal (IntersectionObserver, once only).
 * Content is 100% visible without JS. Below-the-fold sections fade in & rise 12px once.
 */
export function RevealSection({
  children,
  className = '',
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    // Keep anything already in or near initial viewport immediately visible (no CLS / flash)
    if (rect.top <= window.innerHeight * 0.92) {
      return;
    }

    el.setAttribute('data-reveal', 'hidden');
    if (delayMs > 0) {
      el.style.transitionDelay = `${delayMs}ms`;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.setAttribute('data-reveal', 'shown');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Staggered card item inside a grid (50ms per card). Visible without JS.
 */
export function RevealCard({
  children,
  index = 0,
  className = '',
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <RevealSection delayMs={Math.min(index, 8) * 50} className={className}>
      {children}
    </RevealSection>
  );
}

/**
 * Motion #5: Connector line between steps draws in once when entering view.
 * Visible by default without JS.
 */
export function StepConnector({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.95) {
      el.setAttribute('data-connector', 'hidden');
    } else {
      // Even if near fold, animate once subtly when observed
      el.setAttribute('data-connector', 'hidden');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.requestAnimationFrame(() => {
              el.setAttribute('data-connector', 'shown');
            });
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`step-connector-line h-[1px] bg-primary-border ${className}`.trim()}
    />
  );
}

/**
 * Motion #6: Balances and totals count up once over 400ms when first visible.
 * SSR HTML renders the full target amount so it is 100% visible without JS.
 */
export function CountUpAmount({
  value,
  prefix = '',
  suffix = '',
  decimals = 2,
  format,
  className = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  format?: (n: number) => string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const hasAnimatedRef = useRef(false);
  const [displayValue, setDisplayValue] = useState<number>(value);

  // Keep synced if value prop updates after animation finished
  useEffect(() => {
    if (hasAnimatedRef.current) {
      setDisplayValue(value);
    }
  }, [value]);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined' || hasAnimatedRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      hasAnimatedRef.current = true;
      setDisplayValue(value);
      return;
    }

    let rafId = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            observer.unobserve(el);

            const duration = 400;
            const start = performance.now();
            const target = value;

            const step = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              // Fast-out fintech easing approximation matching cubic-bezier(0.2, 0.8, 0.2, 1)
              const eased = 1 - Math.pow(1 - t, 3);
              setDisplayValue(target * eased);
              if (t < 1) {
                rafId = window.requestAnimationFrame(step);
              } else {
                setDisplayValue(target);
              }
            };

            rafId = window.requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [value]);

  const formatted = format
    ? format(displayValue)
    : displayValue.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

  return (
    <span ref={ref} className={`tabular-nums ${className}`.trim()}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/**
 * Motion #7: Neutral --line skeleton placeholder (1.2s shimmer, no gradients).
 */
export function Skeleton({ className = 'h-5 w-24' }: { className?: string }) {
  return <span className={`skeleton-shimmer inline-block align-middle ${className}`.trim()} aria-hidden="true" />;
}

/**
 * Motion #9: Shared button state helper — spinner during loading, Check icon for 800ms on success.
 */
export type ButtonFeedbackState = 'idle' | 'loading' | 'success';

export function useButtonFeedback() {
  const [status, setStatus] = useState<ButtonFeedbackState>('idle');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const startLoading = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setStatus('loading');
  };

  const reset = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setStatus('idle');
  };

  const triggerSuccess = () => {
    setStatus('success');
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setStatus('idle');
    }, 800);
  };

  const runWithFeedback = async <T,>(fn: () => Promise<T>): Promise<T> => {
    setStatus('loading');
    try {
      const result = await fn();
      triggerSuccess();
      return result;
    } catch (err) {
      setStatus('idle');
      throw err;
    }
  };

  return { status, setStatus, startLoading, reset, triggerSuccess, runWithFeedback };
}

export function StatefulButtonContent({
  status,
  idleContent,
  idleLabel,
  loadingLabel = 'Processing...',
  successLabel = 'Done',
}: {
  status: ButtonFeedbackState;
  idleContent?: React.ReactNode;
  idleLabel?: React.ReactNode;
  loadingLabel?: string;
  successLabel?: string;
}) {
  if (status === 'loading') {
    return (
      <>
        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
        <span>{loadingLabel}</span>
      </>
    );
  }
  if (status === 'success') {
    return (
      <>
        <Check className="w-4 h-4" aria-hidden="true" />
        <span>{successLabel}</span>
      </>
    );
  }
  return <>{idleContent ?? idleLabel}</>;
}
