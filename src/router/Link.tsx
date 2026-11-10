import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

/**
 * Thin wrapper over react-router's <Link> so that screen components can keep
 * using `href` and don't need to know about routing internals.
 *
 * Internal paths ("/rates") are handled by the router; external URLs and
 * hash links fall back to a normal anchor.
 */
export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  children?: ReactNode;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, children, ...rest },
  ref
) {
  const isExternal = /^(https?:|mailto:|tel:)/i.test(href);

  if (isExternal) {
    return (
      <a
        ref={ref}
        href={href}
        rel={rest.target === '_blank' ? 'noopener noreferrer' : rest.rel}
        {...rest}
      >
        {children}
      </a>
    );
  }

  // A same-page anchor (e.g. "/business/fx-risk#limit-orders") still goes
  // through the router, react-router scrolls to the hash for us.
  return (
    <RouterLink ref={ref} to={href} {...rest}>
      {children}
    </RouterLink>
  );
});

export default Link;
export { Link };
