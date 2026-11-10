'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Lock, Target, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function BusinessFxRiskPage() {
  const [contractAmount, setContractAmount] = useState(250000);
  const [volatilityPercent, setVolatilityPercent] = useState(4);

  const potentialExposure = contractAmount * (volatilityPercent / 100);

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">Treasury Protection</span>
          <h1>FX Risk Management &amp; Hedging</h1>
          <p className="text-ink-500">
            Eliminate currency market volatility from your balance sheet. Lock in forward exchange rates, automate limit orders, and protect commercial profit margins against currency swings.
          </p>
        </div>

        {/* 3 Risk Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <ScrollReveal delay={0}>
            <div className="card p-6 bg-surface space-y-3 h-full">
              <div className="w-11 h-11 rounded-xl bg-surface-subtle border border-line flex items-center justify-center">
                <Lock className="w-5 h-5 text-ink" aria-hidden="true" />
              </div>
              <h3>Forward Contracts</h3>
              <p className="text-[15px] leading-[24px] text-ink-500">
                Lock in a binding exchange rate today for delivery up to 24 months in the future. Guarantee import and export purchase prices regardless of spot moves.
              </p>
              <div className="p-3 bg-surface-subtle border border-line rounded-xl text-caption text-ink-700 tabular-nums">
                Example: Lock GBP/USD @ 1.2850 for 12 months with a modest initial margin deposit.
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={50}>
            <div id="limit-orders" className="card p-6 bg-surface space-y-3 h-full">
              <div className="w-11 h-11 rounded-xl bg-surface-subtle border border-line flex items-center justify-center">
                <Target className="w-5 h-5 text-ink" aria-hidden="true" />
              </div>
              <h3>Limit Orders</h3>
              <p className="text-[15px] leading-[24px] text-ink-500">
                Target a favorable exchange rate above current spot levels. If the market touches your price, our engine automatically executes and locks your trade.
              </p>
              <div className="p-3 bg-surface-subtle border border-line rounded-xl text-caption text-ink-700 tabular-nums">
                Example: Target EUR/USD @ 1.1000. Triggers automatically 24/7 without manual watching.
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div id="options" className="card p-6 bg-surface space-y-3 h-full">
              <div className="w-11 h-11 rounded-xl bg-surface-subtle border border-line flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-ink" aria-hidden="true" />
              </div>
              <h3>FX Options &amp; Structured Deals</h3>
              <p className="text-[15px] leading-[24px] text-ink-500">
                Tailored hedging structures that cap downside risk while allowing your business to participate in favorable currency movements.
              </p>
              <div className="p-3 bg-surface-subtle border border-line rounded-xl text-caption text-ink-700">
                Treasury desk advisory tailored to multi-million dollar annual FX volumes.
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Exposure Calculator */}
        <div className="card p-8 bg-surface mb-12">
          <div className="max-w-xl mb-6 space-y-2">
            <span className="badge-neutral">Interactive Risk Calculator</span>
            <h2>Estimate Your Unhedged FX Exposure</h2>
            <p className="text-ink-500">
              See how an unexpected currency swing impacts your annual bottom-line margin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div>
                <label htmlFor="fx-contract-amount" className="block mb-1.5">
                  Annual Cross-Border Volume (USD)
                </label>
                <input
                  id="fx-contract-amount"
                  type="number"
                  step="10000"
                  value={contractAmount}
                  onChange={(e) => setContractAmount(Number(e.target.value) || 0)}
                  className="input-field font-semibold tabular-nums"
                />
              </div>

              <div>
                <label htmlFor="fx-volatility-range" className="block mb-1.5 tabular-nums">
                  Currency Fluctuation Margin: <strong>{volatilityPercent}%</strong>
                </label>
                <input
                  id="fx-volatility-range"
                  type="range"
                  min="1"
                  max="10"
                  value={volatilityPercent}
                  onChange={(e) => setVolatilityPercent(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer min-h-[44px]"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-loss-bg border border-loss-border text-center space-y-2">
              <span className="text-caption font-medium text-loss uppercase tracking-wider">
                Potential Unhedged Balance Sheet Loss
              </span>
              <div className="text-[36px] leading-[40px] font-heading font-semibold text-loss tabular-nums">
                ${potentialExposure.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[14px] text-ink-700 mx-auto pt-1">
                A forward contract can lock your rate and eliminate this volatility from your EBITDA.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="card-invert p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-ink-invert">Consult our Senior FX Dealing Desk</h2>
            <p className="text-ink-invert-muted">
              Get custom pricing and institutional margin credit facilities.
            </p>
          </div>
          <Link href="/contact" className="btn-invert whitespace-nowrap">
            <span>Schedule Treasury Consultation</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
