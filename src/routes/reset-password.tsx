import Link from '@/router/Link';
import { useRouter } from '@/router/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { AlertCircle, CheckCircle2, Eye, EyeOff, Loader2, Lock, ShieldAlert } from 'lucide-react';
import { MIN_PASSWORD_LENGTH, getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

type PageStatus = 'checking' | 'ready' | 'invalid' | 'success';

interface LinkError {
  message: string;
  expired: boolean;
}

const EXPIRED_LINK_MESSAGE =
  'This password reset link has expired or has already been used. Request a new link to continue.';
const INVALID_LINK_MESSAGE =
  'This password reset link is invalid. Open the newest link from your email, or request a new one.';

function sanitizeMessage(raw: string): string {
  const value = raw.replace(/\+/g, ' ').trim();
  if (!value) return 'Something went wrong. Please request a new reset link.';
  if (/expired|invalid|not found/i.test(value)) return EXPIRED_LINK_MESSAGE;
  return value;
}

function validatePassword(password: string, confirmation: string): string | null {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`;
  }
  if (password !== confirmation) {
    return 'The two passwords do not match.';
  }
  if (password.trim().length === 0) {
    return 'Password cannot be only spaces.';
  }
  return null;
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const [status, setStatus] = useState<PageStatus>('checking');
  const [linkError, setLinkError] = useState<LinkError | null>(null);
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  /** Waits for supabase-js to parse the recovery tokens out of the URL fragment. */
  const resolveRecoverySession = useCallback(async (): Promise<Session | null> => {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    const deadline = Date.now() + 10000;

    while (Date.now() < deadline && mounted.current) {
      const { data } = await supabase.auth.getSession();
      if (data.session) return data.session;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    return null;
  }, []);

  useEffect(() => {
    mounted.current = true;

    if (!isSupabaseConfigured()) {
      setStatus('invalid');
      setLinkError({
        message: 'Authentication is not configured for this environment. Please contact support.',
        expired: false,
      });
      return () => {
        mounted.current = false;
      };
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      setStatus('invalid');
      setLinkError({ message: INVALID_LINK_MESSAGE, expired: false });
      return () => {
        mounted.current = false;
      };
    }

    const query = new URLSearchParams(window.location.search);
    const fragment = new URLSearchParams(window.location.hash.replace(/^#/, ''));

    const rawError = fragment.get('error_description') ?? query.get('error_description') ?? fragment.get('error') ?? query.get('error');
    const errorCode = fragment.get('error_code') ?? query.get('error_code');
    const isExpired = Boolean(errorCode && /expired|otp_expired|denied/i.test(errorCode)) || Boolean(rawError && /expired/i.test(rawError));

    if (rawError || (errorCode && !fragment.get('access_token'))) {
      setStatus('invalid');
      setLinkError({ message: rawError ? sanitizeMessage(rawError) : INVALID_LINK_MESSAGE, expired: isExpired });
      return () => {
        mounted.current = false;
      };
    }

    // Keep the URL clean once the tokens have been consumed.
    const clearHash = () => {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    };

    const establish = async () => {
      // Support token_hash (verifyOtp) and PKCE (?code=) style recovery links too.
      const tokenHash = query.get('token_hash');
      if (tokenHash) {
        const { error: verifyError } = await supabase.auth.verifyOtp({ type: 'recovery', token_hash: tokenHash });
        if (verifyError) {
          if (!mounted.current) return;
          setStatus('invalid');
          setLinkError({ message: sanitizeMessage(verifyError.message), expired: /expired|invalid/i.test(verifyError.message) });
          return;
        }
      } else if (query.get('code')) {
        // Best-effort: succeeds when the PKCE verifier is still in this browser.
        await supabase.auth.exchangeCodeForSession(query.get('code') as string).catch(() => undefined);
      }

      const session = await resolveRecoverySession();
      if (!mounted.current) return;

      if (session) {
        clearHash();
        setStatus('ready');
        return;
      }

      setStatus('invalid');
      setLinkError({ message: INVALID_LINK_MESSAGE, expired: true });
    };

    // supabase-js emits PASSWORD_RECOVERY as soon as it finishes parsing the link.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted.current) return;
      if (event === 'PASSWORD_RECOVERY' || (event === 'SIGNED_IN' && session?.user)) {
        setStatus((current) => (current === 'checking' ? 'ready' : current));
        setLinkError(null);
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
    });

    void establish();

    return () => {
      mounted.current = false;
      subscription.unsubscribe();
    };
  }, [resolveRecoverySession]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setError(null);
    const validationError = validatePassword(password, confirmation);
    if (validationError) {
      setError(validationError);
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      setError('Authentication is not configured for this environment.');
      return;
    }

    setSubmitting(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        const message = updateError.message;
        if (/session|jwt|token/i.test(message)) {
          setStatus('invalid');
          setLinkError({ message: EXPIRED_LINK_MESSAGE, expired: true });
        } else if (/should be different/i.test(message)) {
          setError('Please choose a password that is different from your current one.');
        } else {
          setError(message);
        }
        return;
      }

      // Force a fresh sign-in with the new password on every device.
      await supabase.auth.signOut().catch(() => undefined);

      setStatus('success');
      window.setTimeout(() => {
        router.replace('/login?reset=success');
      }, 2200);
    } catch {
      setError('Unable to update your password right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const shell = (children: React.ReactNode) => (
    <div className="min-h-screen bg-bg py-12 sm:py-20 flex items-center justify-center">
      <div className="container-vx max-w-lg w-full">
        <div className="card p-6 sm:p-8 bg-surface space-y-6">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-primary text-primary-fg flex items-center justify-center mx-auto">
              {status === 'invalid' ? (
                <ShieldAlert className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Lock className="w-5 h-5" aria-hidden="true" />
              )}
            </div>
            <h1>Set a new password</h1>
            <p className="text-caption text-ink-500 mx-auto">
              Choose a new password for your VectisX account. All other active sessions will be signed
              out.
            </p>
          </div>
          {children}
          <div className="text-center text-caption text-ink-500 pt-3 border-t border-line">
            <Link href="/login" className="font-semibold text-ink hover:underline inline-flex items-center min-h-[44px]">
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  if (status === 'checking') {
    return shell(
      <div role="status" aria-live="polite" className="p-6 bg-surface-subtle border border-line rounded-2xl text-center space-y-3">
        <Loader2 className="w-6 h-6 mx-auto animate-spin text-ink" aria-hidden="true" />
        <div className="font-semibold text-[15px] text-ink">Verifying your reset link</div>
        <p className="text-caption text-ink-500 mx-auto">This only takes a moment.</p>
      </div>
    );
  }

  if (status === 'invalid') {
    return shell(
      <div role="alert" className="space-y-4">
        <div className="p-4 rounded-xl bg-loss-bg border border-loss-border text-loss text-[14px] flex items-start gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <span>{linkError?.message ?? INVALID_LINK_MESSAGE}</span>
        </div>
        <Link href="/forgot-password" className="btn-primary w-full justify-center btn-lg">
          Request a new reset link
        </Link>
      </div>
    );
  }

  if (status === 'success') {
    return shell(
      <div role="status" aria-live="polite" className="p-6 bg-gain-bg border border-gain-border text-gain rounded-2xl text-center space-y-3">
        <CheckCircle2 className="w-8 h-8 mx-auto" aria-hidden="true" />
        <div className="font-semibold text-[16px]">Password updated</div>
        <p className="text-[14px] mx-auto">
          Your password has been changed. Redirecting you to sign in with your new password...
        </p>
        <Link href="/login?reset=success" className="btn-primary btn-sm">
          Sign in now
        </Link>
      </div>
    );
  }

  return shell(
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {error && (
        <div role="alert" className="p-3 rounded-xl bg-loss-bg border border-loss-border text-loss text-[13px] flex items-start gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label htmlFor="new-password" className="block mb-1.5">
          New password
        </label>
        <div className="relative">
          <input
            id="new-password"
            type={showPassword ? 'text' : 'password'}
            required
            minLength={MIN_PASSWORD_LENGTH}
            autoComplete="new-password"
            aria-describedby="new-password-hint"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={`Minimum ${MIN_PASSWORD_LENGTH} characters`}
            className="input-field pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 flex items-center justify-center w-11 text-ink-500 hover:text-ink"
          >
            {showPassword ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
          </button>
        </div>
        <p id="new-password-hint" className="text-caption text-ink-500 mt-1.5">
          Use at least {MIN_PASSWORD_LENGTH} characters. A longer, unique passphrase is safest.
        </p>
      </div>

      <div>
        <label htmlFor="confirm-password" className="block mb-1.5">
          Confirm new password
        </label>
        <input
          id="confirm-password"
          type={showPassword ? 'text' : 'password'}
          required
          minLength={MIN_PASSWORD_LENGTH}
          autoComplete="new-password"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          placeholder="Re-enter your new password"
          className="input-field"
        />
      </div>

      <button type="submit" disabled={submitting} aria-busy={submitting} className="btn-primary w-full justify-center btn-lg">
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Updating password...
          </>
        ) : (
          'Update password'
        )}
      </button>
    </form>
  );
}
