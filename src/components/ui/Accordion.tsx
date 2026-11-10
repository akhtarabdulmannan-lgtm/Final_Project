'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={`space-y-3 ${className || ''}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <details
            key={index}
            open={isOpen}
            className="group rounded-2xl border border-line bg-surface overflow-hidden transition-[border-color] duration-150 ease-fintech hover:border-line-strong"
          >
            <summary
              onClick={(e) => {
                e.preventDefault();
                setOpenIndex(isOpen ? null : index);
              }}
              aria-expanded={isOpen}
              className="flex items-center justify-between w-full px-6 py-4 min-h-[48px] text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden"
            >
              <span className="text-[16px] leading-[24px] font-medium text-ink pr-4">
                {item.question}
              </span>
              <ChevronDown
                className="w-5 h-5 text-ink-500 flex-shrink-0 transition-transform duration-200 ease-fintech group-open:rotate-180 group-open:text-ink"
                aria-hidden="true"
              />
            </summary>
            <div className="px-6 pb-5 text-[16px] leading-[26px] text-ink-500 prose-measure">
              {item.answer}
            </div>
          </details>
        );
      })}
    </div>
  );
}
