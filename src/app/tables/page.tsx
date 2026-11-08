'use client';

import { useState } from 'react';
import Link from 'next/link';
import { currencies } from '@/data/currencies';
import { getRate, formatRate } from '@/lib/rates';
import { Printer, RefreshCw } from 'lucide-react';

export default function CurrencyTablesPage() {
  const [baseCode, setBaseCode] = useState('USD');

  const matrixCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'MXN'];

  return (
    <div className="min-h-screen bg-surface-50 py-10 sm:py-16">
      <div className="container-vx">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="badge-brand">Cross-Rate Tables</span>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-surface-900 mt-2">
              Currency Cross-Rate Matrix
            </h1>
            <p className="text-sm text-surface-500 mt-1">
              Multi-lateral currency conversion matrix comparing the world's most actively traded currencies.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="btn-secondary btn-sm flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Printer className="w-3.5 h-3.5" /> Print Table
          </button>
        </div>

        {/* Matrix Card */}
        <div className="card p-6 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs border-collapse">
              <thead>
                <tr className="bg-surface-100 text-surface-900 font-bold uppercase border-b border-surface-200">
                  <th className="py-3 px-3 text-left font-mono">FROM \ TO</th>
                  {matrixCurrencies.map(c => (
                    <th key={c} className="py-3 px-3 font-mono">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 font-mono">
                {matrixCurrencies.map(from => (
                  <tr key={from} className="hover:bg-surface-50">
                    <td className="py-3 px-3 text-left font-bold text-brand-600 bg-surface-50">
                      1 {from} =
                    </td>
                    {matrixCurrencies.map(to => {
                      if (from === to) {
                        return (
                          <td key={to} className="py-3 px-3 font-bold text-surface-400 bg-surface-50/50">
                            1.0000
                          </td>
                        );
                      }
                      const rate = getRate(from, to);
                      return (
                        <td key={to} className="py-3 px-3 hover:bg-brand-50/50 transition-colors">
                          <Link
                            href={`/converter/${from.toLowerCase()}-to-${to.toLowerCase()}`}
                            className="block text-surface-800 hover:text-brand-600 font-medium"
                          >
                            {formatRate(rate)}
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

        {/* Note */}
        <div className="mt-8 p-4 rounded-2xl bg-white border border-surface-200 text-xs text-surface-500 flex items-center justify-between">
          <span>All values represent interbank mid-market exchange rates without commercial bank markups.</span>
          <Link href="/rates" className="text-brand-500 font-bold hover:underline">
            View Live Rate Tables &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
