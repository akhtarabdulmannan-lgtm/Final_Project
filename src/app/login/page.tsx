'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';
import BrandLogo from '@/components/ui/BrandLogo';
import { StatefulButtonContent, useButtonFeedback } from '@/components/ui/MotionPrimitives';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const feedback = useButtonFeedback();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResetSent(false);

    const supabase = getSupabaseClient();
    if (!supabase) {
      setError('Authentication service is not configured.');
      return;
    }

    feedback.startLoading();
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        feedback.reset();
        setError(signInError.message);
        return;
      }

      feedback.triggerSuccess();
      setSignedIn(true);
      router.refresh();
      setTimeout(() => {
        router.push('/');
      }, 850);
    } catch {
      feedback.reset();
      setError('Unable to reach authentication server. Please try again.');
    }
  };

  const handleForgotPassword = async () => {
    setError(null);
    if (!email.trim()) {
      setError('Enter your email address above first to receive a password reset link.');
      return;
    }
    const supabase = getSupabaseClient();
    if (!supabase) return;

    feedback.startLoading();
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/login`,
      });
      if (resetError) {
        feedback.reset();
        setError(resetError.message);
      } else {
        feedback.triggerSuccess();
        setResetSent(true);
      }
    } catch {
      feedback.reset();
      setError('Could not send reset email right now.');
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
            <h1 className="type-h3 text-navy">Welcome Back</h1>
            <p className="type-caption text-caption">
              Sign in to your VectisX currency intelligence workspace.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-loss-bg border border-loss-border text-loss-text type-caption flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          {resetSent && (
            <div className="p-3 rounded-xl bg-gain-bg border border-gain-border text-gain-text type-caption flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>Password reset instructions have been sent to {email}.</span>
            </div>
          )}

          {signedIn ? (
            <div className="p-6 bg-gain-bg border border-gain-border text-gain-text rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 mx-auto" aria-hidden="true" />
              <div className="font-semibold text-base">Signed In Successfully</div>
              <p className="type-caption">Redirecting you to your VectisX workspace...</p>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="login-email" className="form-label block mb-1.5">
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="input-field text-sm"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="login-password" className="form-label">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="inline-flex items-center min-h-[44px] px-1 type-caption text-primary hover:text-primary-hover hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
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
                  idleLabel="Sign In"
                  loadingLabel="Signing In..."
                  successLabel="Signed In"
                />
              </button>
            </form>
          )}

          <div className="text-center type-caption text-caption pt-2 border-t border-surface-200">
            Don&apos;t have an account yet?{' '}
            <Link
              href="/register"
              className="inline-flex items-center min-h-[44px] px-1 font-semibold text-primary hover:text-primary-hover hover:underline"
            >
              Register free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
