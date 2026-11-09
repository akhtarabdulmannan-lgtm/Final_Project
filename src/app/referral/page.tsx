'use client';

import { Gift, Copy, Check } from 'lucide-react';
import {
  RevealCard,
  RevealSection,
  StepConnector,
  useButtonFeedback,
} from '@/components/ui/MotionPrimitives';

export default function ReferralPage() {
  const copyFeedback = useButtonFeedback();

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('https://vectisx.com/ref/VXNEW100').catch(() => {});
    }
    copyFeedback.triggerSuccess();
  };

  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge-brand">Refer &amp; Earn</span>
          <h1 className="type-h1 text-navy mt-2">
            Give $100, Get $100 API Credit
          </h1>
          <p className="type-body text-body mt-3 mx-auto">
            Invite colleagues, finance teams, and developer partners to VectisX. When they activate an API or Business plan, you both receive $100 workspace credit.
          </p>
        </div>

        {/* Promo Code Box */}
        <div className="max-w-lg mx-auto card p-8 bg-white text-center mb-16 space-y-4">
          <div className="w-16 h-16 bg-primary-pale text-primary border border-primary-border rounded-2xl flex items-center justify-center mx-auto mb-2">
            <Gift className="w-8 h-8" aria-hidden="true" />
          </div>
          <h2 className="type-h3 text-navy">Your Universal Promo Code</h2>
          <div className="flex items-center gap-2 p-3 bg-page rounded-2xl border border-surface-200">
            <span className="flex-1 font-heading font-semibold text-navy text-lg tabular-nums">
              VXNEW100
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="btn-primary btn-sm flex items-center gap-1.5"
            >
              {copyFeedback.status === 'success' ? (
                <>
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  Copy Code
                </>
              )}
            </button>
          </div>
          <p className="type-caption text-caption">
            Valid for new commercial API or Business workspace accounts.
          </p>
        </div>

        {/* 3 Step Explainer with StepConnector */}
        <RevealSection className="relative">
          <div className="hidden md:block absolute top-11 left-[18%] right-[18%] z-0 pointer-events-none">
            <StepConnector />
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <RevealCard index={0}>
              <div className="card p-6 bg-white text-center h-full">
                <div className="w-11 h-11 rounded-xl bg-primary-pale text-primary border border-primary-border font-semibold flex items-center justify-center mx-auto mb-4 tabular-nums">
                  1
                </div>
                <h3 className="type-h3 text-navy mb-2">Share Your Code</h3>
                <p className="text-sm text-body">
                  Send your referral link or code VXNEW100 to colleagues or clients.
                </p>
              </div>
            </RevealCard>

            <RevealCard index={1}>
              <div className="card p-6 bg-white text-center h-full">
                <div className="w-11 h-11 rounded-xl bg-primary-pale text-primary border border-primary-border font-semibold flex items-center justify-center mx-auto mb-4 tabular-nums">
                  2
                </div>
                <h3 className="type-h3 text-navy mb-2">They Activate a Plan</h3>
                <p className="text-sm text-body tabular-nums">
                  Your referral enjoys $100 off their commercial API or workspace subscription.
                </p>
              </div>
            </RevealCard>

            <RevealCard index={2}>
              <div className="card p-6 bg-white text-center h-full">
                <div className="w-11 h-11 rounded-xl bg-primary-pale text-primary border border-primary-border font-semibold flex items-center justify-center mx-auto mb-4 tabular-nums">
                  3
                </div>
                <h3 className="type-h3 text-navy mb-2">You Get $100 Credit</h3>
                <p className="text-sm text-body tabular-nums">
                  $100 is credited directly toward your VectisX subscription balance.
                </p>
              </div>
            </RevealCard>
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
