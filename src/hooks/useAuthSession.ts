import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { getSupabaseClient } from '@/lib/supabase';

export interface AuthState {
  session: Session | null;
  /** True until the stored session has been read, so we never flash "Log in". */
  isResolving: boolean;
  signOut: () => Promise<void>;
}

/**
 * Reads the current Supabase session and keeps it in sync.
 *
 * Previously the session was created on login but never read anywhere, so the
 * header offered "Log in / Register" to signed-in users and there was no way
 * to sign out.
 */
export function useAuthSession(): AuthState {
  const [session, setSession] = useState<Session | null>(null);
  const [isResolving, setIsResolving] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setIsResolving(false);
      return;
    }

    let active = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!active) return;
        setSession(data.session ?? null);
        setIsResolving(false);
      })
      .catch(() => {
        if (active) setIsResolving(false);
      });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      setIsResolving(false);
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
      // Global sign-out also invalidates the refresh token server-side, which
      // is what we want when the request can reach Supabase.
      await supabase.auth.signOut();
    } catch {
      // Fall through: the local session still has to be dropped.
    }

    // Guarantee the browser forgets the session even if the server call could
    // not complete, otherwise the user stays "signed in" after logging out.
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      await supabase.auth.signOut({ scope: 'local' }).catch(() => undefined);
    }

    setSession(null);
  };

  return { session, isResolving, signOut };
}

/** The email to show in the header, falling back to the profile metadata. */
export function sessionEmail(session: Session | null): string | null {
  if (!session?.user) return null;
  return session.user.email ?? (session.user.user_metadata?.email as string | undefined) ?? null;
}
