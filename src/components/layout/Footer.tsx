import { useState } from 'react';
import Link from '@/router/Link';
import { Zap, Mail, Twitter, Linkedin, Github, Youtube } from 'lucide-react';
import { footerLinks } from '@/data/navigation';
import ActionButton from '@/components/ui/ActionButton';
import { subscribeToNewsletter, SubmissionError } from '@/lib/submissions';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [subscribeError, setSubscribeError] = useState<string | null>(null);

  const socialItems = [
    { name: 'VectisX on X (Twitter)', href: '/press', Icon: Twitter },
    { name: 'VectisX on LinkedIn', href: '/about', Icon: Linkedin },
    { name: 'VectisX on GitHub', href: '/about', Icon: Github },
    { name: 'VectisX Video Briefings', href: '/blog', Icon: Youtube },
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || subscribeStatus === 'loading') return;
    setSubscribeError(null);
    setSubscribeStatus('loading');
    try {
      await subscribeToNewsletter({ email, frequency: 'daily' });
      setSubscribeStatus('success');
      setEmail('');
      window.setTimeout(() => {
        setSubscribeStatus('idle');
      }, 800);
    } catch (error) {
      setSubscribeStatus('idle');
      setSubscribeError(
        error instanceof SubmissionError ? error.message : "We couldn't save your subscription. Please try again.",
      );
    }
  };

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
            <div className="flex items-center gap-2">
              {socialItems.map(({ name, href, Icon }) => (
                <Link
                  key={name}
                  href={href}
                  aria-label={name}
                  className="w-11 h-11 rounded-xl border border-line-invert bg-[#1A1F26] flex items-center justify-center text-ink-invert-muted hover:text-ink-invert hover:border-ink-invert transition-colors duration-150"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
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
          <nav aria-label="Company">
            <p className="text-[14px] leading-[20px] font-medium mb-4 text-ink-invert">
              Company
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

        {/* Newsletter */}
        <div className="mt-10 pt-8 border-t border-line-invert">
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <div className="flex-1">
              <label htmlFor="footer-newsletter-email" className="block text-[14px] font-medium text-ink-invert mb-1">
                Stay updated with market insights
              </label>
              <p className="text-caption text-ink-invert-muted">
                Get daily exchange rate updates and analysis delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <input
                id="footer-newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 sm:w-64 px-4 min-h-[44px] rounded-xl bg-[#1A1F26] border border-line-invert text-[15px] text-ink-invert placeholder:text-ink-invert-muted outline-none focus:border-ink-invert"
              />
              <ActionButton
                type="submit"
                variant="invert"
                status={subscribeStatus}
                successLabel="Subscribed"
                className="whitespace-nowrap"
              >
                <span className="inline-flex items-center gap-2">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <span>Subscribe</span>
                </span>
              </ActionButton>
            </div>
          </form>
          {subscribeError && (
            <p role="alert" className="text-[13px] text-loss mt-2">
              {subscribeError}
            </p>
          )}
        </div>
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
              © 2026 VectisX. A subsidiary of Meridian Financial Corp. All rights reserved.
              FinCEN-registered. US state-licensed money transmitter.
            </p>
          </div>
          <p className="text-caption text-ink-invert-muted mt-4 max-w-4xl">
            VectisX is an educational currency-conversion project. Exchange rates are shown for information only, are not
            transaction rates, and may be delayed by the provider that publishes them. This site does not offer money transfer,
            payment, or financial advice services.
            SOC 2 Type II certified. Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
