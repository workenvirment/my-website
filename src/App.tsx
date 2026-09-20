import { useState, useEffect, useCallback, useMemo, Suspense, lazy } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileBottomBar } from './components/layout/MobileBottomBar';
import { CinematicVisualBackground } from './components/background/CinematicVisualBackground';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { SeoHead, type SeoHeadProps } from './components/common/SeoHead';

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

  // SEO configuration for all public routes and 404 fallback
  const seoConfig: SeoHeadProps = useMemo(() => {
    switch (currentPath) {
      case '/services':
        return {
          title: 'Dispatch Services | DGW Solutions LLC — Truck Freight & Broker Coordination',
          description: 'Explore our truck dispatching services: freight rate negotiation, broker packet setup, route planning, and dedicated carrier operational assistance.',
          canonicalPath: '/services',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Dispatch Services', path: '/services' }
          ]
        };
      case '/how-it-works':
        return {
          title: 'How It Works | DGW Solutions LLC — Carrier Onboarding & Dispatch Process',
          description: 'Learn how DGW Solutions LLC partners with carriers: from quick document submission and rate confirmation to load coordination and delivery.',
          canonicalPath: '/how-it-works',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'How It Works', path: '/how-it-works' }
          ]
        };
      case '/equipment':
        return {
          title: 'Equipment We Dispatch | DGW Solutions LLC — Dry Van, Reefer, Flatbed, Box Truck',
          description: 'Comprehensive dispatching support for 53ft Dry Vans, Refrigerated Reefers, Flatbeds, Step Decks, Box Trucks, and Hotshot equipment types.',
          canonicalPath: '/equipment',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Equipment', path: '/equipment' }
          ]
        };
      case '/about':
        return {
          title: 'About Us | DGW Solutions LLC — Dedicated Freight Dispatching & Logistics Support',
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
          title: 'Contact Dispatch Team | DGW Solutions LLC — Carrier Onboarding & Inquiries',
          description: 'Get in touch with the DGW Solutions LLC dispatch team or submit your carrier details to start receiving dedicated freight dispatching support.',
          canonicalPath: '/contact',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Contact & Onboarding', path: '/contact' }
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
      case '/faq':
        return {
          title: 'Frequently Asked Questions | DGW Solutions LLC — Dispatch Services & Carrier FAQ',
          description: 'Find answers to common questions about truck dispatching, rate negotiations, factoring, carrier requirements, and broker packets at DGW Solutions LLC.',
          canonicalPath: '/faq',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'FAQ', path: '/faq' }
          ]
        };
      case '/brokers':
        return {
          title: 'Freight Broker Solutions | DGW Solutions LLC — Reliable Carrier Network',
          description: 'Partner with DGW Solutions LLC for dedicated, verified carrier capacity. Access reliable 53ft Dry Vans, Reefers, and Flatbeds for your freight lanes.',
          canonicalPath: '/brokers',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Brokers', path: '/brokers' }
          ]
        };
      case '/carriers':
        return {
          title: 'Carrier Dispatch Services | DGW Solutions LLC — Maximize Your RPM & Keep Wheels Moving',
          description: 'Dedicated dispatching services for owner-operators and fleet carriers. High-paying freight, route planning, factoring assistance, and no forced dispatch.',
          canonicalPath: '/carriers',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Carriers', path: '/carriers' }
          ]
        };
      case '/documents':
        return {
          title: 'Carrier Documents & Compliance | DGW Solutions LLC — Dispatch Packets & Forms',
          description: 'Access essential carrier onboarding documents, W-9 forms, Certificates of Insurance (COI), Notice of Assignment (NOA), and dispatcher-carrier agreements.',
          canonicalPath: '/documents',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Documents', path: '/documents' }
          ]
        };
      case '/payments':
        return {
          title: 'Factoring & Payment Options | DGW Solutions LLC — Fast Settlements & Transparency',
          description: 'Understand carrier payment workflows, factoring company coordination, quick-pay settlements, and transparent dispatch percentage rates.',
          canonicalPath: '/payments',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Payments', path: '/payments' }
          ]
        };
      case '/mc-lookup':
        return {
          title: 'FMCSA & MC Registry Lookup | DGW Solutions LLC — Motor Carrier Safety Verification',
          description: 'Verify motor carrier safety records, USDOT operating authority status, insurance filings, and FMCSA safety ratings.',
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
          title: 'Routes & Freight Network | DGW Solutions LLC — High-Density Lanes & Load Board',
          description: 'Explore premier freight lanes across the Midwest, Southeast, Northeast, and West Coast with real-time rate averages and load board simulation.',
          canonicalPath: '/routes-loadboard',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Routes & Load Board', path: '/routes-loadboard' }
          ]
        };
      case '/portal':
      case '/portal-simulator':
      case '/portal-demo':
        return {
          title: 'Operations Portal Simulator | DGW Solutions LLC — Carrier & Broker Command Center',
          description: 'Interactive demo of the DGW Logistics Operations Center. Experience fleet management, live dispatch maps, document managers, and freight boards.',
          canonicalPath: '/portal',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Operations Portal', path: '/portal' }
          ]
        };
      case '/':
        return {
          title: 'DGW Solutions LLC | Dispatching Global World — Professional Logistics & Truck Dispatching Support',
          description: 'DGW Solutions LLC and its Dispatching Global World division provide dedicated logistics and truck dispatching support for carriers and owner-operators.',
          canonicalPath: '/',
          breadcrumbs: [
            { name: 'Home', path: '/' }
          ]
        };
      default:
        return {
          title: 'Page Not Found (404) | DGW Solutions LLC — Logistics Route Unreachable',
          description: 'The requested route or dispatch waypoint could not be found. Return to the DGW Solutions LLC dispatch command center.',
          canonicalPath: '/404',
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
