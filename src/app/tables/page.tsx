'use client';

import Link from 'next/link';
import { formatRate } from '@/lib/rates';
import { useLiveRates } from '@/hooks/useLiveRates';
import { Printer } from 'lucide-react';
import { RateFlash, RevealSection } from '@/components/ui/MotionPrimitives';

export default function CurrencyTablesPage() {
  const matrixCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'MXN'];
  const { data, getLivePairRate } = useLiveRates('USD');

  return (
    <div className="min-h-screen bg-page py-10 sm:py-16">
      <div className="container-vx">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="badge-brand">Cross-Rate Tables</span>
            <h1 className="type-h1 text-navy mt-2">
              Currency Cross-Rate Matrix
            </h1>
            <p className="type-body text-body mt-2">
              Multi-lateral currency conversion matrix comparing the world&apos;s most actively traded currencies.
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="btn-secondary btn-sm self-start sm:self-auto"
          >
            <Printer className="w-4 h-4" aria-hidden="true" /> Print Table
          </button>
        </div>

        {/* Matrix Card (14px table text + tabular-nums + >=44px cell links) */}
        <RevealSection className="card p-4 sm:p-6 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-page text-navy type-caption font-semibold uppercase border-b border-surface-200">
                  <th className="py-3.5 px-3 text-left">FROM \ TO</th>
                  {matrixCurrencies.map((c) => (
                    <th key={c} className="py-3.5 px-3">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 tabular-nums">
                {matrixCurrencies.map((from) => (
                  <tr key={from} className="hover:bg-page">
                    <td className="py-2 px-3 text-left font-semibold text-navy bg-page border-r border-surface-200 whitespace-nowrap">
                      1 {from} =
                    </td>
                    {matrixCurrencies.map((to) => {
                      if (from === to) {
                        return (
                          <td key={to} className="py-2 px-3 font-semibold text-caption bg-page">
                            1.0000
                          </td>
                        );
                      }
                      const rate = getLivePairRate(from, to);
                      return (
                        <td key={to} className="p-0 hover:bg-primary-pale transition-colors duration-150 ease-fintech">
                          <Link
                            href={`/converter/${from.toLowerCase()}-to-${to.toLowerCase()}`}
                            aria-label={`Convert ${from} to ${to}: 1 ${from} equals ${formatRate(rate)} ${to}`}
                            className="flex items-center justify-center min-h-[44px] px-3 py-2 text-navy hover:text-primary font-medium"
                          >
                            <RateFlash value={rate} ready={Boolean(data)}>
                              {formatRate(rate)}
                            </RateFlash>
                          </Link>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealSection>

        {/* Note */}
        <div className="mt-8 p-4 rounded-2xl bg-white border border-surface-200 type-caption text-caption flex flex-wrap items-center justify-between gap-2">
          <span>All values represent interbank mid-market exchange rates without commercial bank markups.</span>
          <Link
            href="/rates"
            className="inline-flex items-center min-h-[44px] text-primary font-semibold hover:text-primary-hover hover:underline"
          >
            View Live Rate Tables &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
