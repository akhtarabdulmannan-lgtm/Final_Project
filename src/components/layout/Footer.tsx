import Link from 'next/link';
import { Zap, Mail, Twitter, Linkedin, Github, Youtube } from 'lucide-react';
import { footerLinks } from '@/data/navigation';

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white">
      {/* Main footer */}
      <div className="container-vx section-padding pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-teal-400 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-heading font-extrabold">
                Vectis<span className="text-teal-400">X</span>
              </span>
            </Link>
            <p className="text-sm text-surface-400 mb-6 max-w-xs">
              Global Currency Intelligence. Trusted by millions for live rates, money transfers, and currency data since 1993.
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
              © {new Date().getFullYear()} VectisX. A subsidiary of Meridian Financial Corp. All rights reserved.
              FinCEN-registered. US state-licensed money transmitter.
            </p>
          </div>
          <p className="text-[11px] text-surface-600 mt-4 leading-relaxed max-w-4xl">
            VectisX provides currency data and international money transfer services. Exchange rates shown are mid-market rates 
            and are not intended to be used as transaction rates. Transfer fees and delivery times vary by corridor. 
            VectisX is registered with FinCEN as a Money Services Business and licensed as a money transmitter in applicable US states.
            SOC 2 Type II certified. Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
