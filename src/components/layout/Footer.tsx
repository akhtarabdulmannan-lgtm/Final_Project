import Link from 'next/link';
import { Mail, Twitter, Linkedin, Github, Youtube } from 'lucide-react';
import { footerLinks } from '@/data/navigation';
import BrandLogo from '@/components/ui/BrandLogo';

const SOCIAL_LINKS = [
  { label: 'VectisX on Twitter', Icon: Twitter },
  { label: 'VectisX on LinkedIn', Icon: Linkedin },
  { label: 'VectisX on GitHub', Icon: Github },
  { label: 'VectisX on YouTube', Icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white border-t border-navy-border">
      {/* Main footer */}
      <div className="container-vx section-padding pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center min-h-[44px] mb-4 transition-opacity duration-150 ease-fintech hover:opacity-90 rounded-lg"
              aria-label="VectisX Home"
            >
              <BrandLogo variant="dark" size="md" />
            </Link>
            <p className="text-sm text-[#C9D3E3] mb-6 max-w-sm leading-relaxed">
              Global Currency Intelligence. Trusted for live institutional exchange rates, historical central-bank charts, and cloud rate alerts.
            </p>
            <div className="flex items-center gap-2.5">
              {SOCIAL_LINKS.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#main-content"
                  aria-label={label}
                  className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl bg-navy-elevated border border-navy-border flex items-center justify-center text-[#DBE6FD] hover:bg-primary hover:border-primary hover:text-white transition-colors duration-150 ease-fintech"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-white">Product</h4>
            <ul className="space-y-1">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center min-h-[44px] sm:min-h-[36px] py-1 text-sm text-[#C9D3E3] hover:text-white transition-colors duration-150 ease-fintech"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-white">Business</h4>
            <ul className="space-y-1">
              {footerLinks.business.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center min-h-[44px] sm:min-h-[36px] py-1 text-sm text-[#C9D3E3] hover:text-white transition-colors duration-150 ease-fintech"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-white">Developers</h4>
            <ul className="space-y-1">
              {footerLinks.developers.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center min-h-[44px] sm:min-h-[36px] py-1 text-sm text-[#C9D3E3] hover:text-white transition-colors duration-150 ease-fintech"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-white">Company</h4>
            <ul className="space-y-1">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center min-h-[44px] sm:min-h-[36px] py-1 text-sm text-[#C9D3E3] hover:text-white transition-colors duration-150 ease-fintech"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Popular Pairs */}
        <div className="mt-12 pt-8 border-t border-navy-border">
          <h4 className="text-sm font-semibold mb-4 text-white">Popular Currency Pairs</h4>
          <div className="flex flex-wrap gap-2">
            {footerLinks.popularPairs.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={`Convert ${link.label}`}
                className="inline-flex items-center min-h-[44px] px-4 py-2 rounded-full bg-navy-elevated border border-navy-border type-caption text-[#DBE6FD] hover:border-primary hover:bg-primary hover:text-white transition-colors duration-150 ease-fintech"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-navy-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h4 className="text-sm font-semibold mb-1 text-white">Stay updated with market insights</h4>
              <p className="type-caption text-[#C9D3E3]">
                Get daily exchange rate updates and analysis delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full sm:w-auto">
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-[200px] sm:w-64 min-h-[44px] px-4 py-2.5 rounded-xl bg-navy-elevated border border-navy-border text-sm text-white placeholder-[#C9D3E3] outline-none focus:border-primary focus:ring-2 focus:ring-primary-border"
              />
              <Link href="/tools/email-updates" className="btn-primary btn-sm whitespace-nowrap">
                <Mail className="w-4 h-4" aria-hidden="true" /> Subscribe
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-border">
        <div className="container-vx py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 type-caption text-[#C9D3E3]">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center min-h-[44px] px-1 hover:text-white transition-colors duration-150 ease-fintech"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="type-caption text-[#C9D3E3] text-center md:text-right tabular-nums">
              © {new Date().getFullYear()} VectisX. All rights reserved.
            </p>
          </div>
          <p className="type-caption text-[#C9D3E3] mt-4 max-w-[75ch]">
            VectisX provides currency market intelligence, historical time-series visualization, and rate alert services. Exchange rates shown are informational mid-market and central-bank reference rates and are not intended as binding transaction quotes. Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
