'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AlertCircle, ArrowLeft, CheckCircle2, KeyRound, Loader2 } from 'lucide-react';
import { getPasswordRecoveryRedirectUrl, getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError(null);
    const supabase = getSupabaseClient();

    if (!supabase || !isSupabaseConfigured()) {
      setError('Authentication is not configured for this environment. Please contact support.');
      return;
    }

    setLoading(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: getPasswordRecoveryRedirectUrl(),
      });

      if (resetError) {
        setError(
          resetError.message.toLowerCase().includes('rate limit')
            ? 'Too many reset emails were requested. Please wait a few minutes and try again.'
            : resetError.message
        );
        return;
      }

      setSent(true);
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
              <KeyRound className="w-5 h-5" aria-hidden="true" />
            </div>
            <h1>Reset your password</h1>
            <p className="text-caption text-ink-500 mx-auto">
              Enter the email address linked to your VectisX account and we&apos;ll send you a secure
              link to choose a new password.
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

          {sent ? (
            <div
              role="status"
              className="p-6 bg-gain-bg border border-gain-border text-gain rounded-2xl text-center space-y-3"
            >
              <CheckCircle2 className="w-8 h-8 mx-auto" aria-hidden="true" />
              <div className="font-semibold text-[16px]">Check your inbox</div>
              <p className="text-[14px] mx-auto">
                If an account exists for <strong className="font-semibold">{email.trim()}</strong>, a
                password reset link is on its way. The link opens a page where you can set a new
                password.
              </p>
              <p className="text-caption mx-auto">
                Didn&apos;t get it? Check spam, or{' '}
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setError(null);
                  }}
                  className="font-semibold underline decoration-1 underline-offset-2"
                >
                  send it again
                </button>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="forgot-email" className="block mb-1.5">
                  Email Address
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="input-field"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !email.trim()}
                aria-busy={loading}
                className="btn-primary w-full justify-center btn-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending link...
                  </>
                ) : (
                  'Send reset link'
                )}
              </button>
            </form>
          )}

          <div className="text-center text-caption text-ink-500 pt-3 border-t border-line">
            <Link
              href="/login"
              className="font-semibold text-ink hover:underline inline-flex items-center gap-1.5 min-h-[44px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
