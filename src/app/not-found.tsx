import Link from 'next/link';
import CurrencyConverter from '@/components/sections/CurrencyConverter';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg py-16 sm:py-20">
      <div className="container-vx text-center max-w-2xl mx-auto space-y-6">
        <span className="badge-neutral">404 Error</span>
        <h1>Page Not Found</h1>
        <p className="text-ink-500 mx-auto">
          The currency page or resource you requested may have moved or been updated. You can convert rates directly below or return home.
        </p>

        <div className="flex justify-center pt-4 text-left">
          <CurrencyConverter compact defaultAmount={100} />
        </div>

        <div className="pt-4">
          <Link href="/" className="btn-primary">
            Return to Homepage &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
