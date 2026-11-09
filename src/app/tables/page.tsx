'use client';

import Link from 'next/link';
import { getTickedRate, formatRate } from '@/lib/rates';
import { useLiveTick } from '@/hooks';
import { Printer } from 'lucide-react';
import LiveRateValue from '@/components/ui/LiveRateValue';
import LiveUpdatedBadge from '@/components/ui/LiveUpdatedBadge';

export default function CurrencyTablesPage() {
  const { tick, utcTime } = useLiveTick(7000);
  const matrixCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'MXN'];

  return (
    <div className="min-h-screen bg-bg py-10 sm:py-16">
      <div className="container-vx">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge-neutral">Cross-Rate Tables</span>
              <LiveUpdatedBadge utcTime={utcTime} />
            </div>
            <h1>Currency Cross-Rate Matrix</h1>
            <p className="text-ink-500">
              Multi-lateral currency conversion matrix comparing the world’s most actively traded currencies.
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="btn-secondary btn-sm self-start sm:self-auto"
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            <span>Print Table</span>
          </button>
        </div>

        {/* Matrix Card */}
        <div className="card p-0 bg-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-surface-subtle text-ink font-medium uppercase border-b border-line">
                  <th className="py-3.5 px-4 text-left">FROM \ TO</th>
                  {matrixCurrencies.map((c) => (
                    <th key={c} className="py-3.5 px-3">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line tabular-nums">
                {matrixCurrencies.map((from) => (
                  <tr key={from} className="hover:bg-surface-subtle/50">
                    <td className="py-3 px-4 text-left font-semibold text-ink bg-surface-subtle whitespace-nowrap">
                      1 {from} =
                    </td>
                    {matrixCurrencies.map((to) => {
                      if (from === to) {
                        return (
                          <td key={to} className="py-3 px-3 font-medium text-ink-500 bg-surface-subtle/50">
                            1.0000
                          </td>
                        );
                      }
                      const rate = getTickedRate(from, to, tick);
                      return (
                        <td key={to} className="py-1.5 px-2">
                          <Link
                            href={`/converter/${from.toLowerCase()}-to-${to.toLowerCase()}`}
                            aria-label={`Convert ${from} to ${to}`}
                            className="inline-flex items-center justify-center min-h-[44px] px-2 rounded-lg text-ink hover:bg-surface-subtle font-medium"
                          >
                            <LiveRateValue
                              value={rate}
                              pairKey={`${from}-${to}`}
                              formatted={formatRate(rate)}
                            />
                          </Link>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-2xl bg-surface border border-line text-[14px] text-ink-500 flex flex-wrap items-center justify-between gap-4">
          <span>All values represent interbank mid-market exchange rates without commercial bank markups.</span>
          <Link href="/rates" className="text-ink font-medium hover:underline inline-flex items-center min-h-[44px]">
            View Live Rate Tables &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
