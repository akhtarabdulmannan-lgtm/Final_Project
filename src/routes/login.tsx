import Link from '@/router/Link';
import { useRouter } from '@/router/hooks';
import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Zap } from 'lucide-react';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('reset') === 'success') {
      setNotice('Your password has been updated. Sign in with your new password.');
    } else if (params.get('error') === 'auth') {
      setError('That sign-in link is invalid or has expired. Please sign in or reset your password.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError(null);
    setNotice(null);

    const supabase = getSupabaseClient();
    if (!supabase || !isSupabaseConfigured()) {
      setError('Authentication is not configured for this environment. Please contact support.');
      return;
    }

    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (signInError) {
        const raw = signInError.message.toLowerCase();
        if (raw.includes('email not confirmed')) {
          setError(
            'That address has not been confirmed yet. Open the confirmation link we emailed you, then sign in. If it never arrived, go back to the register page to resend it.',
          );
        } else if (raw.includes('invalid login credentials')) {
          setError(
            'Incorrect email or password. If you recently changed your password, use the new one or reset it again.',
          );
        } else {
          setError(signInError.message);
        }
        return;
      }

      setSignedIn(true);
      router.refresh();
      window.setTimeout(() => {
        router.push('/rates');
      }, 900);
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
            <h1>Welcome Back</h1>
            <p className="text-caption text-ink-500 mx-auto">Sign in to your VectisX currency intelligence account.</p>
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

          {notice && (
            <div
              role="status"
              className="p-3 rounded-xl bg-gain-bg border border-gain-border text-gain text-[13px] flex items-start gap-2"
            >
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>{notice}</span>
            </div>
          )}

          {signedIn ? (
            <div className="p-6 bg-gain-bg border border-gain-border text-gain rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 mx-auto" aria-hidden="true" />
              <div className="font-semibold text-[16px]">Signed In</div>
              <p className="text-[14px] mx-auto">
                Authenticated as <strong className="font-semibold">{email}</strong>.
              </p>
              <Link href="/rates" className="btn-primary btn-sm">
                View Live Rates
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block mb-1.5">
                  Email Address
                </label>
                <input
                  id="login-email"
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
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="login-password">Password</label>
                  <Link href="/forgot-password" className="text-caption font-medium text-ink hover:underline">
                    Forgot?
                  </Link>
                </div>
                <input
                  id="login-password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
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
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          )}

          <div className="text-center text-caption text-ink-500 pt-3 border-t border-line">
            Don&apos;t have an account yet?{' '}
            <Link href="/register" className="font-semibold text-ink hover:underline inline-flex items-center min-h-[44px]">
              Register free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
