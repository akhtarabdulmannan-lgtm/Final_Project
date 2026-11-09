'use client';

import { RevealSection } from '@/components/ui/MotionPrimitives';

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
  return (
    <RevealSection className={className} delayMs={delay}>
      {children}
    </RevealSection>
  );
}
