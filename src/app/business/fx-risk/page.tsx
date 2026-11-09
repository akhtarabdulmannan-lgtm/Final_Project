'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Lock, Target, ArrowRight } from 'lucide-react';
import { CountUpAmount, RevealCard, RevealSection } from '@/components/ui/MotionPrimitives';

export default function BusinessFxRiskPage() {
  const [contractAmount, setContractAmount] = useState(250000);
  const [volatilityPercent, setVolatilityPercent] = useState(4);

  const potentialExposure = contractAmount * (volatilityPercent / 100);

  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Treasury Protection</span>
          <h1 className="type-h1 text-navy mt-2">
            FX Risk Management &amp; Hedging
          </h1>
          <p className="type-body text-body mt-3">
            Eliminate currency market volatility from your balance sheet. Lock in forward exchange rates, automate limit orders, and protect commercial profit margins against unforeseen currency devaluations.
          </p>
        </div>

        {/* 3 Risk Tools */}
        <RevealSection className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <RevealCard index={0}>
            <div className="card p-6 bg-white space-y-3 h-full">
              <div className="w-12 h-12 rounded-2xl bg-primary-pale text-primary border border-primary-border flex items-center justify-center">
                <Lock className="w-6 h-6" aria-hidden="true" />
              </div>
              <h2 className="type-h3 text-navy">Forward Contracts</h2>
              <p className="text-sm text-body">
                Model binding exchange rates today for horizons up to 24 months ahead to benchmark future import/export costs regardless of spot volatility.
              </p>
              <div className="p-3 bg-page border border-surface-200 rounded-xl type-caption text-caption tabular-nums">
                Example: Benchmark GBP/USD @ 1.2850 across a 12-month operating budget.
              </div>
            </div>
          </RevealCard>

          <RevealCard index={1}>
            <div className="card p-6 bg-white space-y-3 h-full">
              <div className="w-12 h-12 rounded-2xl bg-primary-pale text-primary border border-primary-border flex items-center justify-center">
                <Target className="w-6 h-6" aria-hidden="true" />
              </div>
              <h2 className="type-h3 text-navy">Target Rate Alerts</h2>
              <p className="text-sm text-body">
                Target a favorable exchange rate above current spot levels. When the market crosses your threshold, our cloud engine notifies your treasury desk.
              </p>
              <div className="p-3 bg-page border border-surface-200 rounded-xl type-caption text-caption tabular-nums">
                Example: Monitor EUR/USD @ 1.1000 automatically 24/7 without manual watching.
              </div>
            </div>
          </RevealCard>

          <RevealCard index={2}>
            <div className="card p-6 bg-white space-y-3 h-full">
              <div className="w-12 h-12 rounded-2xl bg-primary-pale text-primary border border-primary-border flex items-center justify-center">
                <TrendingUp className="w-6 h-6" aria-hidden="true" />
              </div>
              <h2 className="type-h3 text-navy">FX Options &amp; Scenario Models</h2>
              <p className="text-sm text-body">
                Tailored hedging structures that cap downside risk while allowing your business to participate when currency movements turn favorable.
              </p>
              <div className="p-3 bg-page border border-surface-200 rounded-xl type-caption text-caption">
                Bespoke treasury advisory tailored to multi-million dollar annual FX exposures.
              </div>
            </div>
          </RevealCard>
        </RevealSection>

        {/* Currency Risk Exposure Calculator */}
        <RevealSection className="card p-8 bg-white mb-12">
          <div className="max-w-xl mb-6">
            <span className="badge-brand">Interactive Risk Calculator</span>
            <h2 className="type-h2 text-navy mt-2">
              Estimate Your Unhedged FX Exposure
            </h2>
            <p className="type-caption text-caption mt-1">
              See how an unexpected 2% to 6% currency swing impacts your annual bottom-line margin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div>
                <label htmlFor="risk-volume" className="form-label block mb-1.5">
                  Annual Cross-Border Volume (USD)
                </label>
                <input
                  id="risk-volume"
                  type="number"
                  step="10000"
                  value={contractAmount}
                  onChange={(e) => setContractAmount(Number(e.target.value) || 0)}
                  className="input-field font-semibold text-navy text-base tabular-nums"
                />
              </div>

              <div>
                <label htmlFor="risk-margin" className="form-label block mb-1.5 tabular-nums">
                  Currency Fluctuation Margin:{' '}
                  <strong className="font-semibold text-navy">{volatilityPercent}%</strong>
                </label>
                <input
                  id="risk-margin"
                  type="range"
                  min="1"
                  max="10"
                  value={volatilityPercent}
                  onChange={(e) => setVolatilityPercent(Number(e.target.value))}
                  className="w-full min-h-[44px] accent-primary cursor-pointer"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-loss-bg border border-loss-border text-center space-y-2">
              <span className="type-caption font-semibold text-loss-text uppercase tracking-wider">
                ▼ Potential Unhedged Balance Sheet Loss
              </span>
              <div className="text-4xl font-heading font-semibold text-loss-text tabular-nums">
                <CountUpAmount
                  value={potentialExposure}
                  prefix="$"
                  format={(v) =>
                    v.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  }
                />
              </div>
              <p className="type-caption text-body mt-2">
                Structured FX hedging locks your target benchmark and protects EBITDA against adverse currency swings.
              </p>
            </div>
          </div>
        </RevealSection>

        {/* CTA */}
        <div className="card-dark p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="type-h3 text-white">Consult our Senior FX Advisory Desk</h2>
            <p className="type-caption text-[#C9D3E3] mt-1">
              Get custom scenario modeling and institutional treasury guidance.
            </p>
          </div>
          <Link href="/contact" className="btn-primary whitespace-nowrap">
            Schedule Treasury Consultation <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
