import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = localFont({
  src: [
    {
      path: './fonts/inter-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/inter-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/inter-latin-600-normal.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  fallback: ['system-ui', 'sans-serif'],
});

const interTight = localFont({
  src: [
    {
      path: './fonts/inter-tight-latin-600-normal.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: true,
  variable: '--font-inter-tight',
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  title: {
    default: 'VectisX — Global Currency Intelligence | Live Exchange Rates & Money Transfers',
    template: '%s | VectisX',
  },
  description: 'Get live exchange rates for 220+ currencies, send money to 190+ countries, set rate alerts, and access historical charts. Trusted by millions since 1993.',
  keywords: ['currency converter', 'exchange rates', 'money transfer', 'live rates', 'FX', 'currency data API'],
  authors: [{ name: 'VectisX' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vectisx.com',
    siteName: 'VectisX',
    title: 'VectisX — Global Currency Intelligence',
    description: 'Live exchange rates, money transfers, rate alerts, and currency data for 220+ currencies.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VectisX — Global Currency Intelligence',
    description: 'Live exchange rates, money transfers, and currency data for 220+ currencies.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <body className="font-sans antialiased bg-bg text-ink-700">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:min-h-[44px] focus:inline-flex focus:items-center focus:bg-primary focus:text-primary-fg focus:rounded-lg focus:font-medium"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
