'use client';

import { useState } from 'react';
import Link from 'next/link';
import { currencies } from '@/data/currencies';
import { getRate, getTransferFee, getDeliveryTime, formatRate, formatAmount } from '@/lib/rates';
import CountUpValue from '@/components/ui/CountUpValue';

export default function SendFeesPage() {
  const [amount, setAmount] = useState(2500);
  const [fromCode, setFromCode] = useState('USD');
  const [toCode, setToCode] = useState('EUR');

  const rate = getRate(fromCode, toCode);
  const fee = getTransferFee(amount);
  const recipientGets = amount * rate;
  const bankMarkupSavings = amount * 0.042 + 30 - fee;

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx max-w-4xl space-y-8">
        <div className="space-y-3">
          <span className="badge-neutral">Transparent Pricing</span>
          <h1>Money Transfer Fees &amp; Savings Calculator</h1>
          <p className="text-ink-500">
            Zero hidden exchange rate spreads. Inspect exact transfer fees, delivery estimates, and bank-beating savings upfront.
          </p>
        </div>

        <div className="card p-6 sm:p-8 bg-surface space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="fee-amount" className="block mb-1.5">
                Transfer Amount ({fromCode})
              </label>
              <input
                id="fee-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
                className="input-field font-semibold tabular-nums"
              />
            </div>

            <div>
              <label htmlFor="fee-from" className="block mb-1.5">
                From Currency
              </label>
              <select
                id="fee-from"
                value={fromCode}
                onChange={(e) => setFromCode(e.target.value)}
                className="select-field text-[14px] font-medium"
              >
                {currencies.slice(0, 20).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="fee-to" className="block mb-1.5">
                To Currency
              </label>
              <select
                id="fee-to"
                value={toCode}
                onChange={(e) => setToCode(e.target.value)}
                className="select-field text-[14px] font-medium"
              >
                {currencies.slice(0, 20).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-surface-subtle border border-line">
              <div className="text-caption text-ink-500">Transfer Fee</div>
              <div className="text-[24px] font-heading font-semibold text-ink mt-1 tabular-nums">
                {fee === 0 ? '$0.00 (Free)' : `$${fee.toFixed(2)}`}
              </div>
              <div className="text-caption text-ink-500 mt-1">Free for $5,000+</div>
            </div>

            <div className="p-4 rounded-xl bg-surface-subtle border border-line">
              <div className="text-caption text-ink-500">Recipient Receives</div>
              <div className="text-[24px] font-heading font-semibold text-ink mt-1 tabular-nums">
                {formatAmount(recipientGets)} {toCode}
              </div>
              <div className="text-caption text-ink-500 mt-1 tabular-nums">
                Rate: {formatRate(rate)}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gain-bg border border-gain-border">
              <div className="text-caption text-gain">Estimated Bank Savings</div>
              <div className="text-[24px] font-heading font-semibold text-gain mt-1 tabular-nums">
                <CountUpValue value={Math.max(0, bankMarkupSavings)} prefix="$" decimals={2} duration={400} />
              </div>
              <div className="text-caption text-gain mt-1">{getDeliveryTime(toCode)}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/send" className="btn-primary">
              Start Transfer Now
            </Link>
            <Link href="/send/track" className="btn-secondary">
              Track Transfer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
