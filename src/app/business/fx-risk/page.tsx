'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, ShieldCheck, Lock, Target, ArrowRight, DollarSign } from 'lucide-react';

export default function BusinessFxRiskPage() {
  const [contractAmount, setContractAmount] = useState(250000);
  const [volatilityPercent, setVolatilityPercent] = useState(4);

  const potentialExposure = contractAmount * (volatilityPercent / 100);

  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Treasury Protection</span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-surface-900 mt-2">
            FX Risk Management & Hedging
          </h1>
          <p className="text-surface-600 text-base mt-3 leading-relaxed">
            Eliminate currency market volatility from your balance sheet. Lock in forward exchange rates, automate limit orders, and protect commercial profit margins against unforeseen currency devaluations.
          </p>
        </div>

        {/* 3 Risk Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6 bg-white space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center font-bold">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-surface-900 text-lg">Forward Contracts</h3>
            <p className="text-xs text-surface-600 leading-relaxed">
              Lock in a binding exchange rate today for delivery up to 24 months in the future. Guarantee future import/export purchase prices regardless of where spot markets move.
            </p>
            <div className="p-3 bg-surface-50 rounded-xl text-[11px] text-surface-500 font-mono">
              Example: Lock GBP/USD @ 1.2850 for 12 months with only a modest initial margin deposit.
            </div>
          </div>

          <div className="card p-6 bg-white space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-surface-900 text-lg">Limit Orders</h3>
            <p className="text-xs text-surface-600 leading-relaxed">
              Target a favorable exchange rate above current spot levels. If the market spikes overnight to touch your price, our engine automatically executes and locks your trade.
            </p>
            <div className="p-3 bg-surface-50 rounded-xl text-[11px] text-surface-500 font-mono">
              Example: Target EUR/USD @ 1.1000. Trade triggers automatically 24/7 without manual watching.
            </div>
          </div>

          <div className="card p-6 bg-white space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-accent-100 text-accent-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-surface-900 text-lg">FX Options & Structured Deals</h3>
            <p className="text-xs text-surface-600 leading-relaxed">
              Tailored hedging structures that cap downside risk while allowing your business to benefit if currency movements turn favorably in your direction.
            </p>
            <div className="p-3 bg-surface-50 rounded-xl text-[11px] text-surface-500 font-mono">
              Bespoke treasury desk advisory tailored to multi-million dollar annual foreign exchange volumes.
            </div>
          </div>
        </div>

        {/* Currency Risk Exposure Calculator */}
        <div className="card p-8 bg-white mb-12 shadow-md">
          <div className="max-w-xl mb-6">
            <span className="badge-teal">Interactive Risk Calculator</span>
            <h3 className="text-2xl font-bold font-heading text-surface-900 mt-1">
              Estimate Your Unhedged FX Exposure
            </h3>
            <p className="text-xs text-surface-500 mt-1">
              See how an unexpected 2% to 6% currency swing impacts your annual bottom-line margin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-surface-600 block mb-1">Annual Cross-Border Volume (USD)</label>
                <input
                  type="number"
                  step="10000"
                  value={contractAmount}
                  onChange={(e) => setContractAmount(Number(e.target.value) || 0)}
                  className="input-field font-semibold text-base"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-surface-600 block mb-1">
                  Currency Fluctuation Margin: <strong>{volatilityPercent}%</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={volatilityPercent}
                  onChange={(e) => setVolatilityPercent(Number(e.target.value))}
                  className="w-full accent-brand-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-rose-50 border border-rose-100 text-center space-y-2">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Potential Unhedged Balance Sheet Loss</span>
              <div className="text-4xl font-extrabold text-rose-700 font-mono">
                ${potentialExposure.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-surface-600 mt-2">
                A simple forward contract can lock your rate and completely eliminate this volatility from your EBITDA.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="card p-8 bg-gradient-to-r from-brand-900 to-brand-950 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold font-heading">Consult our Senior FX Dealing Desk</h3>
            <p className="text-xs text-surface-300 mt-1">Get custom pricing and institutional margin credit facilities.</p>
          </div>
          <Link href="/contact" className="btn-teal whitespace-nowrap">
            Schedule Treasury Consultation <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
