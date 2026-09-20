import { useState, useEffect, useCallback, useMemo, Suspense, lazy } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileBottomBar } from './components/layout/MobileBottomBar';
import { CinematicVisualBackground } from './components/background/CinematicVisualBackground';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { SeoHead, type SeoHeadProps } from './components/common/SeoHead';
import { FAQ_LIST } from './data/faqData';

// Code-split all page components with React.lazy()
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage').then(m => ({ default: m.HowItWorksPage })));
const EquipmentPage = lazy(() => import('./pages/EquipmentPage').then(m => ({ default: m.EquipmentPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const LegalPrivacyPage = lazy(() => import('./pages/LegalPrivacyPage').then(m => ({ default: m.LegalPrivacyPage })));
const FaqPage = lazy(() => import('./pages/FaqPage').then(m => ({ default: m.FaqPage })));
const BrokersPage = lazy(() => import('./pages/BrokersPage').then(m => ({ default: m.BrokersPage })));
const CarriersPage = lazy(() => import('./pages/CarriersPage').then(m => ({ default: m.CarriersPage })));
const DocumentsPage = lazy(() => import('./pages/DocumentsPage').then(m => ({ default: m.DocumentsPage })));
const PaymentsPage = lazy(() => import('./pages/PaymentsPage').then(m => ({ default: m.PaymentsPage })));
const McLookupPage = lazy(() => import('./pages/McLookupPage').then(m => ({ default: m.McLookupPage })));
const RoutesLoadBoardPage = lazy(() => import('./pages/RoutesLoadBoardPage').then(m => ({ default: m.RoutesLoadBoardPage })));
const PortalSimulatorPage = lazy(() => import('./pages/PortalSimulatorPage').then(m => ({ default: m.PortalSimulatorPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Professional suspense loading state matching DGW brand
const PageLoadingFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 px-4 py-20 text-center">
    <div className="relative w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-glow-amber">
      <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
    <div className="space-y-1">
      <p className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold">
        DGW Logistics Network
      </p>
      <p className="text-xs text-slate-400">Loading dispatch interface...</p>
    </div>
  </div>
);

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    try {
      return window.location.pathname || '/';
    } catch {
      return '/';
    }
  });

  useEffect(() => {
    const handlePopState = () => {
      try {
        setCurrentPath(window.location.pathname || '/');
      } catch {
        setCurrentPath('/');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((path: string) => {
    try {
      if (window.location.pathname !== path) {
        window.history.pushState({}, '', path);
      }
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      console.warn('[Navigation Error]:', e);
      window.location.href = path;
    }
  }, []);

  // SEO configuration for all public routes, private simulator, and 404 fallback
  const seoConfig: SeoHeadProps = useMemo(() => {
    switch (currentPath) {
      case '/services':
        return {
          title: 'Truck Dispatch Services | DGW Solutions LLC',
          description: 'Explore our dedicated truck dispatching services: freight rate negotiation, broker packet setup, route planning, and back-office carrier support.',
          canonicalPath: '/services',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Dispatch Services', path: '/services' }
          ],
          schemaData: {
            '@type': 'Service',
            name: 'Truck Dispatching & Freight Coordination',
            provider: {
              '@type': 'Organization',
              name: 'DGW Solutions LLC',
              url: 'https://dgwsolutionllc.com/'
            },
            serviceType: 'Freight Dispatching',
            description: 'Dedicated back-office truck dispatching assistance for motor carriers including rate negotiation, broker setups, and route coordination.',
            areaServed: 'US'
          }
        };

      case '/how-it-works':
        return {
          title: 'How It Works | Carrier Onboarding & Dispatch Process | DGW Solutions LLC',
          description: 'Learn how DGW Solutions LLC partners with carriers: from document setup (W-9, COI, MC Authority) to load booking, rate confirmations, and delivery support.',
          canonicalPath: '/how-it-works',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'How It Works', path: '/how-it-works' }
          ]
        };

      case '/equipment':
        return {
          title: 'Equipment We Dispatch | Dry Van, Reefer, Flatbed, Box Truck | DGW Solutions LLC',
          description: 'Comprehensive dispatching support for 53ft Dry Vans, Refrigerated Reefers, Flatbeds, Step Decks, Box Trucks, Hotshots, and Power Only equipment.',
          canonicalPath: '/equipment',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Equipment', path: '/equipment' }
          ]
        };

      case '/about':
        return {
          title: 'About Us | DGW Solutions LLC — Dispatching Global World',
          description: 'Learn about DGW Solutions LLC and the Dispatching Global World team led by Saad Altaf, dedicated to supporting carriers and owner-operators nationwide.',
          canonicalPath: '/about',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about' }
          ]
        };

      case '/contact':
      case '/apply':
      case '/carrier-onboarding':
        return {
          title: 'Contact Dispatch Team & Carrier Onboarding | DGW Solutions LLC',
          description: 'Get in touch with the DGW Solutions LLC dispatch team or submit your carrier details to start receiving dedicated freight dispatching support.',
          canonicalPath: '/contact',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Contact & Onboarding', path: '/contact' }
          ]
        };

      case '/faq':
        return {
          title: 'Frequently Asked Questions | DGW Solutions LLC',
          description: 'Find answers to common questions about freight dispatching, carrier requirements, rate confirmations, NOA factoring, and broker packets.',
          canonicalPath: '/faq',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'FAQ', path: '/faq' }
          ],
          schemaData: {
            '@type': 'FAQPage',
            mainEntity: FAQ_LIST.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
              }
            }))
          }
        };

      case '/brokers':
        return {
          title: 'Broker Solutions & Carrier Capacity | DGW Solutions LLC',
          description: 'Partner with DGW Solutions LLC for verified carrier capacity. Access reliable 53ft Dry Vans, Reefers, and Flatbeds for your freight lanes.',
          canonicalPath: '/brokers',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Brokers', path: '/brokers' }
          ]
        };

      case '/carriers':
        return {
          title: 'Carrier Dispatching Solutions | DGW Solutions LLC',
          description: 'Dedicated dispatching services for owner-operators and fleet carriers. High-paying freight, advance route planning, factoring coordination, and no forced dispatch.',
          canonicalPath: '/carriers',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Carriers', path: '/carriers' }
          ]
        };

      case '/documents':
        return {
          title: 'Carrier Documents & Compliance Guidelines | DGW Solutions LLC',
          description: 'Access essential carrier onboarding requirements: active MC Authority, W-9 form, Certificate of Insurance (COI), and Notice of Assignment (NOA).',
          canonicalPath: '/documents',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Documents', path: '/documents' }
          ]
        };

      case '/payments':
        return {
          title: 'Factoring & Payment Options | DGW Solutions LLC',
          description: 'Understand carrier payment workflows: freight factoring coordination, QuickPay terms, settlement calculation, and transparent dispatch billing.',
          canonicalPath: '/payments',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Payments', path: '/payments' }
          ]
        };

      case '/mc-lookup':
        return {
          title: 'FMCSA & MC Registry Lookup | DGW Solutions LLC',
          description: 'Verify motor carrier safety ratings, USDOT operating authority status, insurance filings, and registration records.',
          canonicalPath: '/mc-lookup',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'MC Lookup', path: '/mc-lookup' }
          ]
        };

      case '/routes-loadboard':
      case '/routes':
      case '/load-board':
        return {
          title: 'Freight Routes & Load Board | DGW Solutions LLC',
          description: 'Explore high-density freight lanes across the Midwest, Southeast, Northeast, and West Coast with load board simulation and route coordination.',
          canonicalPath: '/routes-loadboard',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Routes & Load Board', path: '/routes-loadboard' }
          ]
        };

      case '/privacy-policy':
      case '/terms':
        return {
          title: 'Privacy Policy & Terms of Service | DGW Solutions LLC',
          description: 'Review the privacy policy, carrier terms, and data handling practices of DGW Solutions LLC and its Dispatching Global World division.',
          canonicalPath: '/privacy-policy',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Privacy Policy', path: '/privacy-policy' }
          ]
        };

      case '/portal':
      case '/portal-simulator':
      case '/portal-demo':
        return {
          title: 'Operations Portal Simulator | DGW Solutions LLC',
          description: 'Interactive demo of the DGW Logistics Operations Center. Experience fleet management, live dispatch maps, document managers, and freight boards.',
          canonicalPath: '/portal',
          noIndex: true, // Non-indexable prototype
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Operations Portal', path: '/portal' }
          ]
        };

      case '/':
        return {
          title: 'DGW Solutions LLC | Professional Truck Dispatching & Logistics Support',
          description: 'DGW Solutions LLC and its Dispatching Global World division provide dedicated logistics and truck dispatching support for carriers and owner-operators nationwide.',
          canonicalPath: '/',
          breadcrumbs: [
            { name: 'Home', path: '/' }
          ]
        };

      default:
        return {
          title: 'Page Not Found (404) | DGW Solutions LLC',
          description: 'The requested route or dispatch waypoint could not be found. Return to the DGW Solutions LLC dispatch command center.',
          canonicalPath: '/404',
          noIndex: true, // Non-indexable 404 page
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: '404 Not Found', path: '/404' }
          ]
        };
    }
  }, [currentPath]);

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={navigate} />;
      case '/services':
        return <ServicesPage onNavigate={navigate} />;
      case '/how-it-works':
        return <HowItWorksPage onNavigate={navigate} />;
      case '/equipment':
        return <EquipmentPage onNavigate={navigate} />;
      case '/about':
        return <AboutPage onNavigate={navigate} />;
      case '/contact':
      case '/apply':
      case '/carrier-onboarding':
        return <ContactPage onNavigate={navigate} />;
      case '/privacy-policy':
      case '/terms':
        return <LegalPrivacyPage onNavigate={navigate} />;
      case '/faq':
        return <FaqPage onNavigate={navigate} />;
      case '/brokers':
        return <BrokersPage onNavigate={navigate} />;
      case '/carriers':
        return <CarriersPage onNavigate={navigate} />;
      case '/documents':
        return <DocumentsPage onNavigate={navigate} />;
      case '/payments':
        return <PaymentsPage onNavigate={navigate} />;
      case '/mc-lookup':
        return <McLookupPage onNavigate={navigate} />;
      case '/routes-loadboard':
      case '/routes':
      case '/load-board':
        return <RoutesLoadBoardPage onNavigate={navigate} />;
      case '/portal':
      case '/portal-simulator':
      case '/portal-demo':
        return <PortalSimulatorPage onNavigate={navigate} />;
      case '/404':
        return <NotFoundPage onNavigate={navigate} />;
      default:
        // Unknown URLs render NotFoundPage instead of silently defaulting to HomePage
        return <NotFoundPage onNavigate={navigate} />;
    }
  };

  return (
    <ErrorBoundary>
      {/* Dynamic SEO Head Manager */}
      <SeoHead {...seoConfig} />

      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-500 selection:text-slate-950 relative">
        
        {/* Full-Screen Truck Visual Background with Parallax Truck Photo, Moving Highway Semi-Truck, and GPS Telematics Arcs */}
        <CinematicVisualBackground currentPath={currentPath} intensity="standard" />

        {/* Clean Sticky Header */}
        <div className="relative z-20">
          <Navbar currentPath={currentPath} onNavigate={navigate} />
        </div>

        {/* Main Content Area with Mobile Safe Bottom Padding and Suspense Boundary */}
        <main className="flex-1 pt-16 sm:pt-20 pb-28 md:pb-0 relative z-10">
          <Suspense fallback={<PageLoadingFallback />}>
            {renderCurrentPage()}
          </Suspense>
        </main>

        {/* Clean Footer */}
        <div className="relative z-20 pb-16 md:pb-0">
          <Footer onNavigate={navigate} />
        </div>

        {/* Mobile Sticky Quick-Action Bar */}
        <MobileBottomBar currentPath={currentPath} onNavigate={navigate} />

      </div>
    </ErrorBoundary>
  );
}

export default App;
