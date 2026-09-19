import { useState, useEffect, useCallback, useMemo } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileBottomBar } from './components/layout/MobileBottomBar';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { EquipmentPage } from './pages/EquipmentPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPrivacyPage } from './pages/LegalPrivacyPage';
import { CinematicVisualBackground } from './components/background/CinematicVisualBackground';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { SeoHead, type SeoHeadProps } from './components/common/SeoHead';

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

  // SEO configuration for legitimate public routes
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
      case '/':
      default:
        return {
          title: 'DGW Solutions LLC | Dispatching Global World — Professional Logistics & Truck Dispatching Support',
          description: 'DGW Solutions LLC and its Dispatching Global World division provide dedicated logistics and truck dispatching support for carriers and owner-operators.',
          canonicalPath: '/',
          breadcrumbs: [
            { name: 'Home', path: '/' }
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
      default:
        return <HomePage onNavigate={navigate} />;
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

        {/* Main Content Area with Mobile Safe Bottom Padding */}
        <main className="flex-1 pt-16 sm:pt-20 pb-28 md:pb-0 relative z-10">
          {renderCurrentPage()}
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
