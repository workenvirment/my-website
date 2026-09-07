import { useState, useEffect, useCallback } from 'react';
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
