import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface CountUpValueProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export default function CountUpValue({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 400,
  className,
}: CountUpValueProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value);
      return;
    }

    const startAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = value * eased;
        setDisplayValue(current);
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          setDisplayValue(value);
        }
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(decimals === 0 ? Math.round(displayValue) : displayValue);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
