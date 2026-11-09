'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Zap } from 'lucide-react';
import { MIN_PASSWORD_LENGTH, getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

export default function RegisterPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registered, setRegistered] = useState(false);
  const [autoActivated, setAutoActivated] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError(null);

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase || !isSupabaseConfigured()) {
      setError('Registration is not configured for this environment. Please contact support.');
      return;
    }

    setLoading(true);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            full_name: fullName.trim(),
            account_type: accountType,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      setAutoActivated(Boolean(data.session));
      setRegistered(true);
      if (data.session) {
        router.refresh();
      }
    } catch {
      setError('Unable to reach the authentication service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg py-12 sm:py-20 flex items-center justify-center">
      <div className="container-vx max-w-lg w-full">
        <div className="card p-6 sm:p-8 bg-surface space-y-6">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-primary text-primary-fg flex items-center justify-center mx-auto">
              <Zap className="w-5 h-5" aria-hidden="true" />
            </div>
            <h1>Create Account</h1>
            <p className="text-caption text-ink-500 mx-auto">
              Track live FX consensus rates, historical charts, and alerts across 220+ currencies.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="p-3 rounded-xl bg-loss-bg border border-loss-border text-loss text-[13px] flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          {registered ? (
            <div
              role="status"
              className="p-6 bg-gain-bg border border-gain-border text-gain rounded-2xl text-center space-y-3"
            >
              <CheckCircle2 className="w-8 h-8 mx-auto" aria-hidden="true" />
              <div className="font-semibold text-[16px]">
                {autoActivated ? 'Account Ready' : 'Check your inbox'}
              </div>
              <p className="text-[14px] mx-auto">
                {autoActivated ? (
                  <>
                    Welcome, <strong className="font-semibold">{fullName}</strong>. You are now signed in.
                  </>
                ) : (
                  <>
                    We sent a confirmation link to <strong className="font-semibold">{email}</strong>. Confirm
                    your email, then sign in.
                  </>
                )}
              </p>
              <Link href="/login" className="btn-primary btn-sm">
                Go to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-2 bg-surface-subtle p-1 rounded-xl border border-line">
                <button
                  type="button"
                  onClick={() => setAccountType('personal')}
                  aria-pressed={accountType === 'personal'}
                  className={`min-h-[44px] py-2 text-[13px] font-semibold rounded-lg transition-colors duration-150 ${
                    accountType === 'personal' ? 'bg-surface text-ink border border-line' : 'text-ink-500 hover:text-ink'
                  }`}
                >
                  Personal
                </button>
                <button
                  type="button"
                  onClick={() => setAccountType('business')}
                  aria-pressed={accountType === 'business'}
                  className={`min-h-[44px] py-2 text-[13px] font-semibold rounded-lg transition-colors duration-150 ${
                    accountType === 'business' ? 'bg-surface text-ink border border-line' : 'text-ink-500 hover:text-ink'
                  }`}
                >
                  Business
                </button>
              </div>

              <div>
                <label htmlFor="register-name" className="block mb-1.5">
                  Full Legal Name
                </label>
                <input
                  id="register-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Doe"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="register-email" className="block mb-1.5">
                  Email Address
                </label>
                <input
                  id="register-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="register-password" className="block mb-1.5">
                  Password
                </label>
                <input
                  id="register-password"
                  type="password"
                  required
                  minLength={MIN_PASSWORD_LENGTH}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={`Minimum ${MIN_PASSWORD_LENGTH} characters`}
                  className="input-field"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className="btn-primary w-full justify-center btn-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Creating account...
                  </>
                ) : (
                  `Create ${accountType === 'business' ? 'Business' : 'Personal'} Account`
                )}
              </button>
            </form>
          )}

          <div className="text-center text-caption text-ink-500 pt-3 border-t border-line">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-ink hover:underline inline-flex items-center min-h-[44px]">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
