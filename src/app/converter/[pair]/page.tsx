import { currencies, popularPairs } from '@/data/currencies';
import DynamicPairClient from './DynamicPairClient';

export function generateStaticParams() {
  const pairSet = new Set<string>();

  for (const [from, to] of popularPairs) {
    pairSet.add(`${from.toLowerCase()}-to-${to.toLowerCase()}`);
    pairSet.add(`${to.toLowerCase()}-to-${from.toLowerCase()}`);
  }

  const bases = ['USD', 'EUR', 'GBP', 'AUD', 'CAD'];
  for (const base of bases) {
    for (const target of currencies.slice(0, 20)) {
      if (base !== target.code) {
        pairSet.add(`${base.toLowerCase()}-to-${target.code.toLowerCase()}`);
      }
    }
  }

  return Array.from(pairSet).map((pair) => ({ pair }));
}

export default function DynamicPairPage({ params }: { params: { pair: string } }) {
  return <DynamicPairClient pair={params.pair} />;
}
