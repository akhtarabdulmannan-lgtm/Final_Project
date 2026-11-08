'use client';

import { useState, useRef, useEffect } from 'react';
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
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className="rounded-2xl border border-surface-200 bg-white overflow-hidden transition-shadow hover:shadow-sm">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-6 py-4 text-left"
      >
        <span className="text-sm font-semibold text-surface-900 pr-4">{item.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-surface-400 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-brand-500' : ''
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: isOpen ? height : 0 }}
      >
        <div ref={contentRef} className="px-6 pb-4 text-sm text-surface-600 leading-relaxed">
          {item.answer}
        </div>
      </div>
    </div>
  );
}
