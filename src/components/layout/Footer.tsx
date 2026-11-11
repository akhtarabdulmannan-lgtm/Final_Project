import Link from '@/router/Link';
import { Zap } from 'lucide-react';
import { footerLinks } from '@/data/navigation';

export default function Footer() {
  return (
    <footer className="bg-surface-invert text-ink-invert border-t border-line-invert">
      <div className="container-vx section-padding pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 min-h-[44px] mb-3">
              <div className="w-9 h-9 rounded-xl bg-ink-invert text-ink flex items-center justify-center">
                <Zap className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="text-[20px] font-heading font-semibold tracking-tight text-ink-invert">
                VectisX
              </span>
            </Link>
            <p className="text-[14px] leading-[22px] text-ink-invert-muted mb-6 max-w-xs">
              Currency conversion and exchange-rate charts built on open public data. Rates are fetched live from central-bank and reference-rate APIs.
            </p>
          </div>

          {/* Product */}
          <nav aria-label="Product">
            <p className="text-[14px] leading-[20px] font-medium mb-4 text-ink-invert">
              Product
            </p>
            <ul className="space-y-1">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center min-h-[44px] py-1 text-[14px] text-ink-invert-muted hover:text-ink-invert transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Project">
            <p className="text-[14px] leading-[20px] font-medium mb-4 text-ink-invert">
              Project
            </p>
            <ul className="space-y-1">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center min-h-[44px] py-1 text-[14px] text-ink-invert-muted hover:text-ink-invert transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Popular Pairs */}
        <nav aria-label="Popular Currency Pairs" className="mt-10 pt-8 border-t border-line-invert">
          <p className="text-[14px] leading-[20px] font-medium mb-4 text-ink-invert">
            Popular Currency Pairs
          </p>
          <div className="flex flex-wrap gap-2">
            {footerLinks.popularPairs.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={`Convert ${link.label}`}
                className="inline-flex items-center min-h-[44px] px-3.5 rounded-full border border-line-invert bg-[#1A1F26] text-caption text-ink-invert-muted hover:text-ink-invert hover:border-ink-invert transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-line-invert">
        <div className="container-vx py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-caption text-ink-invert-muted">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center min-h-[44px] hover:text-ink-invert transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-caption text-ink-invert-muted text-left md:text-right">
              © 2026 VectisX. All rights reserved.
            </p>
          </div>
          <p className="text-caption text-ink-invert-muted mt-4 max-w-4xl">
            VectisX is an educational currency-conversion project. Exchange rates are shown for information only, are not
            transaction rates, and may be delayed by the provider that publishes them. This site does not offer money transfer,
            payment, custody, or financial advice services, and it holds no financial licences or third-party security
            certifications.
          </p>
        </div>
      </div>
    </footer>
  );
}
