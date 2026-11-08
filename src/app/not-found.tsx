import Link from 'next/link';
import CurrencyConverter from '@/components/sections/CurrencyConverter';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-50 py-16 sm:py-24">
      <div className="container-vx text-center max-w-2xl mx-auto space-y-6">
        <span className="badge-brand">404 Error</span>
        <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-surface-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-surface-600 text-sm max-w-md mx-auto">
          The currency page or resource you requested may have moved or been updated. You can convert rates directly below or return home.
        </p>

        <div className="flex justify-center pt-4">
          <CurrencyConverter compact defaultAmount={100} />
        </div>

        <div className="pt-6">
          <Link href="/" className="btn-primary">
            Return to Homepage &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
