'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';
import BrandLogo from '@/components/ui/BrandLogo';
import { StatefulButtonContent, useButtonFeedback } from '@/components/ui/MotionPrimitives';

export default function RegisterPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [autoActivated, setAutoActivated] = useState(false);

  const feedback = useButtonFeedback();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      setError('Registration service is not configured.');
      return;
    }

    feedback.startLoading();
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: accountType === 'personal' ? name.trim() : '',
            company_name: accountType === 'business' ? name.trim() : null,
            account_type: accountType,
          },
        },
      });

      if (signUpError) {
        feedback.reset();
        setError(signUpError.message);
        return;
      }

      setAutoActivated(Boolean(data.session));
      feedback.triggerSuccess();
      if (data.session) {
        router.refresh();
      }
      setTimeout(() => setSubmitted(true), 800);
    } catch {
      feedback.reset();
      setError('Unable to reach registration server. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-page py-12 sm:py-20 flex items-center justify-center">
      <div className="container-vx max-w-md w-full">
        <div className="card p-8 bg-white space-y-6">
          <div className="text-center space-y-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center min-h-[44px] mb-1"
              aria-label="VectisX Home"
            >
              <BrandLogo variant="light" size="md" />
            </Link>
            <h1 className="type-h3 text-navy">Create Free VectisX Account</h1>
            <p className="type-caption text-caption">
              Track live FX consensus rates, historical charts, and cloud alerts across 220+ currencies.
            </p>
          </div>

          <div
            className="flex rounded-xl bg-page border border-surface-200 p-1 gap-1"
            role="tablist"
            aria-label="Account type"
          >
            <button
              type="button"
              role="tab"
              aria-selected={accountType === 'personal'}
              onClick={() => setAccountType('personal')}
              className={`flex-1 min-h-[44px] py-2 type-caption font-semibold rounded-lg border transition-colors duration-150 ease-fintech ${
                accountType === 'personal'
                  ? 'bg-primary-pale text-primary border-primary-border'
                  : 'border-transparent text-caption hover:text-navy'
              }`}
            >
              Personal
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={accountType === 'business'}
              onClick={() => setAccountType('business')}
              className={`flex-1 min-h-[44px] py-2 type-caption font-semibold rounded-lg border transition-colors duration-150 ease-fintech ${
                accountType === 'business'
                  ? 'bg-primary-pale text-primary border-primary-border'
                  : 'border-transparent text-caption hover:text-navy'
              }`}
            >
              Business
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-loss-bg border border-loss-border text-loss-text type-caption flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          {submitted ? (
            <div className="p-6 bg-gain-bg border border-gain-border text-gain-text rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 mx-auto" aria-hidden="true" />
              <div className="font-semibold text-base">
                {autoActivated ? 'Account Created & Activated!' : 'Verification Email Sent'}
              </div>
              <p className="type-caption">
                {autoActivated
                  ? 'Your VectisX multi-currency vault is ready. You are now signed in.'
                  : 'Please check your inbox to activate your multi-currency vault.'}
              </p>
              {autoActivated && (
                <div className="pt-2 flex flex-wrap gap-2 justify-center">
                  <Link href="/converter" className="btn-primary btn-sm">
                    Live Converter <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                  <Link href="/alerts" className="btn-secondary btn-sm">
                    Rate Alerts
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label htmlFor="register-name" className="form-label block mb-1.5">
                  {accountType === 'business' ? 'Company Name' : 'Full Legal Name'}
                </label>
                <input
                  id="register-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={accountType === 'business' ? 'Acme Corp' : 'John Doe'}
                  className="input-field text-sm"
                />
              </div>
              <div>
                <label htmlFor="register-email" className="form-label block mb-1.5">
                  Email Address
                </label>
                <input
                  id="register-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="input-field text-sm"
                />
              </div>
              <div>
                <label htmlFor="register-password" className="form-label block mb-1.5">
                  Password
                </label>
                <input
                  id="register-password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="input-field text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={feedback.status === 'loading'}
                className="btn-primary w-full justify-center btn-lg"
              >
                <StatefulButtonContent
                  status={feedback.status}
                  idleLabel="Register Free Account"
                  loadingLabel="Creating Account..."
                  successLabel="Account Created"
                />
              </button>
            </form>
          )}

          <div className="text-center type-caption text-caption pt-2 border-t border-surface-200">
            Already have an account?{' '}
            <Link
              href="/login"
              className="inline-flex items-center min-h-[44px] px-1 font-semibold text-primary hover:text-primary-hover hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
