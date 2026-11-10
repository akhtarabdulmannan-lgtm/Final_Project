import { useCallback } from 'react';
import { useNavigate, useParams as useRouterParams } from 'react-router-dom';

/**
 * Small compatibility layer so screens can call the same hooks they used
 * before. `useParams` returns a plain string map, and `useRouter` exposes
 * `push` / `replace` / `refresh`.
 */
export function useParams<T extends Record<string, string | undefined> = Record<string, string | undefined>>() {
  return useRouterParams() as T;
}

export function useRouter() {
  const navigate = useNavigate();

  const push = useCallback((to: string) => navigate(to), [navigate]);
  const replace = useCallback((to: string) => navigate(to, { replace: true }), [navigate]);
  // There is no server cache to invalidate in a static SPA.
  const refresh = useCallback(() => undefined, []);

  return { push, replace, refresh };
}
