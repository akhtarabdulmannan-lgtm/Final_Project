'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Zap, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';

export default function RegisterPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [autoActivated, setAutoActivated] = useState(false);

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

    setLoading(true);
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
        setError(signUpError.message);
        return;
      }

      setAutoActivated(Boolean(data.session));
      setSubmitted(true);
      if (data.session) {
        router.refresh();
      }
    } catch {
      setError('Unable to reach registration server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20 flex items-center justify-center">
      <div className="container-vx max-w-md w-full">
        <div className="card p-8 bg-white shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center mx-auto text-white">
              <Zap className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold font-heading text-surface-900">Create Free VectisX Account</h1>
            <p className="text-xs text-surface-500">Hold, convert, and transfer 220+ currencies instantly.</p>
          </div>

          <div className="flex rounded-xl bg-surface-100 p-1">
            <button
              type="button"
              onClick={() => setAccountType('personal')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                accountType === 'personal' ? 'bg-white text-brand-600 shadow-sm' : 'text-surface-600'
              }`}
            >
              Personal
            </button>
            <button
              type="button"
              onClick={() => setAccountType('business')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                accountType === 'business' ? 'bg-white text-brand-600 shadow-sm' : 'text-surface-600'
              }`}
            >
              Business
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {submitted ? (
            <div className="p-6 bg-emerald-50 text-emerald-800 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <div className="font-bold">
                {autoActivated ? 'Account Created & Activated!' : 'Verification Email Sent'}
              </div>
              <p className="text-xs">
                {autoActivated
                  ? 'Your VectisX multi-currency vault is ready. You are now signed in.'
                  : 'Please check your inbox to activate your multi-currency vault.'}
              </p>
              {autoActivated && (
                <div className="pt-2 flex gap-2 justify-center">
                  <Link href="/converter" className="btn-primary btn-sm">
                    Live Converter <ArrowRight className="w-3.5 h-3.5" />
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
                <label className="text-xs font-semibold text-surface-600 block mb-1">
                  {accountType === 'business' ? 'Company Name' : 'Full Legal Name'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={accountType === 'business' ? 'Acme Corp' : 'John Doe'}
                  className="input-field text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-surface-600 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="input-field text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-surface-600 block mb-1">Password</label>
                <input
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
                disabled={loading}
                className="btn-primary w-full justify-center btn-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Creating Account...
                  </>
                ) : (
                  'Register Free Account'
                )}
              </button>
            </form>
          )}

          <div className="text-center text-xs text-surface-500 pt-2 border-t border-surface-100">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-brand-500 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
