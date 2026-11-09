import type { Metadata } from 'next';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: {
    default: 'VectisX — Global Currency Intelligence | Live Exchange Rates & Charts',
    template: '%s | VectisX',
  },
  description: 'Get live institutional exchange rates for 200+ currencies, set cloud rate alerts, and explore official central-bank historical charts. Powered by live REST APIs.',
  keywords: ['currency converter', 'exchange rates', 'live rates', 'FX charts', 'rate alerts', 'currency data API'],
  authors: [{ name: 'Abdul Mannan Akhtar' }],
  icons: {
    icon: [
      { url: `${BASE_PATH}/favicon.ico`, sizes: 'any' },
      { url: `${BASE_PATH}/favicon.png`, type: 'image/png', sizes: '64x64' },
      { url: `${BASE_PATH}/brand/vectisx-icon.png`, type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: `${BASE_PATH}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' },
    ],
    shortcut: `${BASE_PATH}/favicon.ico`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vectisx.vercel.app',
    siteName: 'VectisX',
    title: 'VectisX — Global Currency Intelligence',
    description: 'Live institutional exchange rates, historical ECB charts, and cloud rate alerts powered by live financial APIs.',
    images: [
      {
        url: 'https://vectisx.vercel.app/brand/vectisx-brand-sheet.png',
        width: 2172,
        height: 724,
        alt: 'VectisX Official Brand Identity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VectisX — Global Currency Intelligence',
    description: 'Live institutional exchange rates, historical charts, and cloud rate alerts.',
    images: ['https://vectisx.vercel.app/brand/vectisx-brand-sheet.png'],
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
    <html lang="en">
      <body className="font-sans antialiased text-surface-900 bg-white">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-500 focus:text-white focus:rounded-lg">
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
