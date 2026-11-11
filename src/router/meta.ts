import { createContext, createElement, useContext } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Document metadata.
 *
 * The app was originally built with a framework that could export a
 * per-page `metadata` object. In a plain client-rendered SPA the browser
 * tags have to be updated at runtime instead, so each screen calls
 * `usePageMeta()` with its own title/description.
 */
interface PageMeta {
  title?: string;
  description?: string;
}

const SITE_NAME = 'VectisX';
const DEFAULT_DESCRIPTION =
  'Convert currencies with live mid-market exchange rates, and chart how a pair has moved over time.';

function applyMeta({ title, description }: PageMeta) {
  if (typeof document === 'undefined') return;

  document.title = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Global Currency Intelligence`;

  if (description) {
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute('content', description);
  }
}

export function usePageMeta(meta: PageMeta | string) {
  const resolved: PageMeta = typeof meta === 'string' ? { title: meta } : meta;
  // Applied during render (not in an effect) so the title is correct by the
  // time the new screen commits; cheap enough not to matter here.
  applyMeta(resolved);
}

/** Metadata declared by a route, applied by <RouteMeta /> on navigation. */
const RouteMetaContext = createContext<string | null>(null);

export function RouteMetaProvider({ title, children }: { title: string; children?: ReactNode }) {
  return createElement(RouteMetaContext.Provider, { value: title }, children);
}

export function RouteMeta() {
  const title = useContext(RouteMetaContext);
  const location = useLocation();
  if (title) applyMeta({ title, description: DEFAULT_DESCRIPTION });
  else if (location.pathname === '/') applyMeta({ description: DEFAULT_DESCRIPTION });
  return null;
}
