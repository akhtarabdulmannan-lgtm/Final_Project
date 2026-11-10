import { useState } from 'react';
import { Copy, ArrowRight } from 'lucide-react';
import Link from '@/router/Link';
import ActionButton from '@/components/ui/ActionButton';
import StepConnector from '@/components/ui/StepConnector';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { wait } from '@/lib/utils';

export default function ReferralPage() {
  const [referralCode] = useState('VECTIS-REF-892A');

  const handleCopy = async () => {
    await navigator.clipboard?.writeText(`https://vectisx.com/join/${referralCode}`);
    await wait(200);
  };

  const steps = [
    {
      step: '1',
      title: 'Share Your Link',
      desc: 'Copy your unique referral code and invite friends, family, or business colleagues.',
    },
    {
      step: '2',
      title: 'They Transfer $1,000+',
      desc: 'When they send $1,000 or equivalent in any currency within 90 days of registration.',
    },
    {
      step: '3',
      title: 'Both Earn $50',
      desc: 'We credit both your accounts with $50 directly into your preferred wallet balance.',
    },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="badge-gain">VectisX Referral Program</span>
          <h1>Give $50, Get $50 for Every Friend You Invite</h1>
          <p className="text-ink-500 mx-auto">
            Share VectisX with friends who track currency pairs, and unlock extra saved-rate slots on your own account when they start using it.
          </p>
        </div>

        {/* How it Works with StepConnector */}
        <div className="relative mb-14">
          <div className="hidden md:block absolute top-11 left-[16%] right-[16%] z-0">
            <StepConnector />
          </div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, idx) => (
              <ScrollReveal key={s.step} delay={idx * 50}>
                <div className="card p-6 bg-surface text-center h-full space-y-2">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-fg font-semibold flex items-center justify-center mx-auto mb-3 text-[15px] tabular-nums">
                    {s.step}
                  </div>
                  <h3>{s.title}</h3>
                  <p className="text-[14px] leading-[22px] text-ink-500 mx-auto">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Link Generator Card */}
        <div className="card-invert p-8 sm:p-10 max-w-2xl mx-auto text-center space-y-4">
          <h2 className="text-ink-invert">Your Personal Invitation Link</h2>
          <p className="text-ink-invert-muted mx-auto">
            Copy and distribute your invitation link immediately. Unlimited invitations allowed!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <input
              type="text"
              readOnly
              aria-label="Personal referral link"
              value={`https://vectisx.com/join/${referralCode}`}
              className="flex-1 bg-[#1A1F26] border border-line-invert rounded-xl px-4 py-3 text-[14px] text-ink-invert font-medium text-center sm:text-left"
            />
            <ActionButton
              variant="secondary"
              onAction={handleCopy}
              successLabel="Copied"
              className="bg-surface text-ink whitespace-nowrap justify-center"
            >
              <span className="inline-flex items-center gap-1.5">
                <Copy className="w-4 h-4" aria-hidden="true" />
                <span>Copy Link</span>
              </span>
            </ActionButton>
          </div>

          <div className="pt-2">
            <Link
              href="/register"
              className="inline-flex items-center gap-1 text-caption font-medium text-ink-invert-muted hover:text-ink-invert"
            >
              <span>Create an account to track rewards</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
