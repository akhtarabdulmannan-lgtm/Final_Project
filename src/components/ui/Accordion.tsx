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
      {items.map((item, index) => (
        <AccordionPanel
          key={index}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}

function AccordionPanel({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-2xl border bg-white overflow-hidden transition-colors duration-150 ease-fintech ${
        isOpen ? 'border-primary-border' : 'border-surface-200 hover:border-surface-300'
      }`}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="flex items-center justify-between w-full min-h-[52px] px-6 py-4 text-left"
      >
        <span className="text-sm font-semibold text-navy pr-4">{item.question}</span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ease-fintech ${
            isOpen ? 'rotate-180 text-primary' : 'text-caption'
          }`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-sm text-body leading-relaxed">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
}
