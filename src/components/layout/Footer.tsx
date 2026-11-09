import Link from 'next/link';
import { Mail, Twitter, Linkedin, Github, Youtube } from 'lucide-react';
import { footerLinks } from '@/data/navigation';
import BrandLogo from '@/components/ui/BrandLogo';

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white">
      {/* Main footer */}
      <div className="container-vx section-padding pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-flex items-center mb-4 transition-opacity hover:opacity-90" aria-label="VectisX Home">
              <BrandLogo variant="dark" size="md" />
            </Link>
            <p className="text-sm text-surface-400 mb-6 max-w-xs">
              Global Currency Intelligence. Trusted for live institutional exchange rates, historical central-bank charts, and cloud rate alerts.
            </p>
            <div className="flex items-center gap-3">
              {[Twitter, Linkedin, Github, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-2.5">
              {footerLinks.product.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-surface-400 hover:text-teal-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Business</h4>
            <ul className="space-y-2.5">
              {footerLinks.business.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-surface-400 hover:text-teal-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Developers</h4>
            <ul className="space-y-2.5">
              {footerLinks.developers.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-surface-400 hover:text-teal-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-surface-400 hover:text-teal-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Popular Pairs */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h4 className="text-sm font-semibold mb-4 text-white">Popular Currency Pairs</h4>
          <div className="flex flex-wrap gap-2">
            {footerLinks.popularPairs.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-full bg-white/5 text-xs text-surface-400 hover:bg-white/10 hover:text-teal-400 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h4 className="text-sm font-semibold mb-1">Stay updated with market insights</h4>
              <p className="text-xs text-surface-400">Get daily exchange rate updates and analysis delivered to your inbox.</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 sm:w-64 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-sm text-white placeholder-surface-500 outline-none focus:border-teal-400/50"
              />
              <button className="btn-teal btn-sm whitespace-nowrap">
                <Mail className="w-4 h-4" /> Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-vx py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs text-surface-500">
              {footerLinks.legal.map(link => (
                <Link key={link.href} href={link.href} className="hover:text-surface-300 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-xs text-surface-500 text-center md:text-right">
              © {new Date().getFullYear()} VectisX. All rights reserved.
            </p>
          </div>
          <p className="text-[11px] text-surface-600 mt-4 leading-relaxed max-w-4xl">
            VectisX provides currency market intelligence, historical time-series visualization, and rate alert services. Exchange rates shown are informational mid-market and central-bank reference rates and are not intended as binding transaction quotes. Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
