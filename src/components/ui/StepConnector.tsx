'use client';

import { useEffect, useRef } from 'react';

interface StepConnectorProps {
  className?: string;
}

export default function StepConnector({ className }: StepConnectorProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.96) return;

    el.style.transformOrigin = 'left center';
    el.style.transform = 'scaleX(0)';
    el.style.opacity = '0';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition =
            'transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 200ms cubic-bezier(0.2, 0.8, 0.2, 1)';
          el.style.transform = 'scaleX(1)';
          el.style.opacity = '1';
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={lineRef}
      aria-hidden="true"
      className={
        className ||
        'hidden md:block absolute top-12 left-[16.666%] right-[16.666%] h-px bg-line-strong pointer-events-none'
      }
    />
  );
}
