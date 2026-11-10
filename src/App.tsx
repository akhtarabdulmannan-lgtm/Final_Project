import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { RateProvider } from '@/lib/fx/RateProvider';
import RateSourceBanner from '@/components/feedback/RateSourceBanner';
import { usePageMeta } from '@/router/meta';

// Screens are lazy-loaded so the first paint isn't blocked by all 40 routes.
import { lazy, Suspense } from 'react';
import PageLoading from '@/components/feedback/PageLoading';

const Home = lazy(() => import('@/routes/Home'));
const Converter = lazy(() => import('@/routes/converter'));
const ConverterPair = lazy(() => import('@/routes/converter_[pair]'));
const Rates = lazy(() => import('@/routes/rates'));
const Charts = lazy(() => import('@/routes/charts'));
const Historical = lazy(() => import('@/routes/historical'));
const Tables = lazy(() => import('@/routes/tables'));
const Alerts = lazy(() => import('@/routes/alerts'));
const Tools = lazy(() => import('@/routes/tools'));
const ToolsIban = lazy(() => import('@/routes/tools_iban'));
const ToolsEmailUpdates = lazy(() => import('@/routes/tools_email-updates'));
const Apps = lazy(() => import('@/routes/apps'));
const Business = lazy(() => import('@/routes/business'));
const BusinessFxRisk = lazy(() => import('@/routes/business_fx-risk'));
const BusinessTeam = lazy(() => import('@/routes/business_team'));
const BusinessIntegrations = lazy(() => import('@/routes/business_integrations'));
const ApiPlatform = lazy(() => import('@/routes/api-platform'));
const ApiDocs = lazy(() => import('@/routes/api-platform_docs'));
const ApiPricing = lazy(() => import('@/routes/api-platform_pricing'));
const ApiPartners = lazy(() => import('@/routes/api-platform_partners'));
const About = lazy(() => import('@/routes/about'));
const Careers = lazy(() => import('@/routes/careers'));
const Press = lazy(() => import('@/routes/press'));
const Security = lazy(() => import('@/routes/security'));
const Blog = lazy(() => import('@/routes/blog'));
const BlogPost = lazy(() => import('@/routes/blog_[slug]'));
const Contact = lazy(() => import('@/routes/contact'));
const Help = lazy(() => import('@/routes/help'));
const Partners = lazy(() => import('@/routes/partners'));
const Referral = lazy(() => import('@/routes/referral'));
const Login = lazy(() => import('@/routes/login'));
const Register = lazy(() => import('@/routes/register'));
const ForgotPassword = lazy(() => import('@/routes/forgot-password'));
const ResetPassword = lazy(() => import('@/routes/reset-password'));
const Terms = lazy(() => import('@/routes/terms'));
const Privacy = lazy(() => import('@/routes/privacy'));
const Cookies = lazy(() => import('@/routes/cookies'));
const Licenses = lazy(() => import('@/routes/licenses'));
const SitemapPage = lazy(() => import('@/routes/sitemap-page'));
const NotFound = lazy(() => import('@/routes/NotFound'));

/** Title per route, applied on navigation. */
const TITLES: Record<string, string> = {
  '/': 'Global Currency Intelligence',
  '/converter': 'Currency Converter',
  '/rates': 'Live Exchange Rates',
  '/charts': 'Currency Charts',
  '/historical': 'Historical Rates',
  '/tables': 'Currency Tables',
  '/alerts': 'Rate Alerts',
  '/tools': 'Financial Tools',
  '/tools/iban': 'IBAN Calculator',
  '/tools/email-updates': 'Rate Email Updates',
  '/apps': 'Mobile Apps',
  '/business': 'Business',
  '/business/fx-risk': 'FX Risk Management',
  '/business/team': 'Team Roles',
  '/business/integrations': 'Integrations',
  '/api-platform': 'Currency Data API',
  '/api-platform/docs': 'API Documentation',
  '/api-platform/pricing': 'API Pricing',
  '/api-platform/partners': 'Partner Program',
  '/about': 'About',
  '/careers': 'Careers',
  '/press': 'Press',
  '/security': 'Security',
  '/blog': 'Blog',
  '/contact': 'Contact',
  '/help': 'Help Centre',
  '/partners': 'Partners',
  '/referral': 'Refer a Friend',
  '/login': 'Sign In',
  '/register': 'Create Account',
  '/forgot-password': 'Reset Password',
  '/reset-password': 'Choose a New Password',
  '/terms': 'Terms of Service',
  '/privacy': 'Privacy Policy',
  '/cookies': 'Cookie Policy',
  '/licenses': 'Licenses',
  '/sitemap-page': 'Sitemap',
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function DocumentTitle() {
  const { pathname } = useLocation();
  const [title, setTitle] = useState<string | undefined>();
  useEffect(() => setTitle(TITLES[pathname]), [pathname]);
  usePageMeta({
    title,
    description:
      'Convert currencies with live mid-market exchange rates from the European Central Bank, chart rate history, and set rate alerts.',
  });
  return null;
}

export default function App() {
  return (
    <RateProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:min-h-[44px] focus:inline-flex focus:items-center focus:bg-primary focus:text-primary-fg focus:rounded-lg focus:font-medium"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <DocumentTitle />
      <Header />
      <RateSourceBanner />
      <main id="main-content" className="min-h-screen">
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/converter" element={<Converter />} />
            <Route path="/converter/:pair" element={<ConverterPair />} />
            <Route path="/rates" element={<Rates />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/historical" element={<Historical />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/iban" element={<ToolsIban />} />
            <Route path="/tools/email-updates" element={<ToolsEmailUpdates />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="/business" element={<Business />} />
            <Route path="/business/fx-risk" element={<BusinessFxRisk />} />
            <Route path="/business/team" element={<BusinessTeam />} />
            <Route path="/business/integrations" element={<BusinessIntegrations />} />
            <Route path="/api-platform" element={<ApiPlatform />} />
            <Route path="/api-platform/docs" element={<ApiDocs />} />
            <Route path="/api-platform/pricing" element={<ApiPricing />} />
            <Route path="/api-platform/partners" element={<ApiPartners />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/press" element={<Press />} />
            <Route path="/security" element={<Security />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<Help />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/licenses" element={<Licenses />} />
            <Route path="/sitemap-page" element={<SitemapPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </RateProvider>
  );
}
