'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    // Keep above-the-fold content visible immediately; only animate elements entering from below fold
    if (rect.top <= window.innerHeight * 0.96) return;

    let hasRevealed = false;
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.willChange = 'opacity, transform';

    const reveal = () => {
      if (hasRevealed) return;
      hasRevealed = true;
      el.style.transition = `opacity 300ms cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms, transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      window.setTimeout(() => {
        if (el) {
          el.style.willChange = '';
          el.style.transition = '';
          el.style.transform = '';
        }
      }, 350 + delay);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -16px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
