import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Vite exposes only VITE_* variables, and only via import.meta.env.
// Both values are public by design (the anon key is protected by RLS).
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

let browserClient: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (typeof window === 'undefined') {
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  }

  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        // The password recovery email link is verified by Supabase and then
        // redirected back to /reset-password with the recovery session in the
        // URL fragment. The client picks that session up automatically.
        detectSessionInUrl: true,
        storageKey: 'vectisx-auth-token',
      },
    });
  }

  return browserClient;
}

/**
 * Absolute URL Supabase should redirect to after verifying the recovery link.
 * Must be listed in the project's Auth "Redirect URLs" allow list.
 */
export function getPasswordRecoveryRedirectUrl(): string | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }
  return `${window.location.origin}/reset-password`;
}

export const MIN_PASSWORD_LENGTH = 8;
