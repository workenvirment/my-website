import React, { useState, useEffect } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { GlobalSearchModal } from '../common/GlobalSearchModal';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentRoute: string;
  onRouteChange: (route: string) => void;
  onOpenQuickAction?: (action: 'add-trucker' | 'add-broker' | 'post-load' | 'send-message') => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  currentRoute,
  onRouteChange,
  onOpenQuickAction
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global Ctrl + K Keyboard Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 flex font-sans antialiased selection:bg-blue-600 selection:text-white relative">
      
      {/* Ambient background glow accents */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 1. Left Sidebar */}
      <AdminSidebar
        currentRoute={currentRoute}
        onRouteChange={onRouteChange}
        onOpenQuickAction={onOpenQuickAction}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* 2. Main Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[215px] transition-all duration-300">
        
        {/* Top Header */}
        <AdminHeader
          currentRoute={currentRoute}
          onOpenMobileMenu={() => setIsMobileOpen(true)}
          onOpenGlobalSearch={() => setIsSearchOpen(true)}
          onNavigate={onRouteChange}
        />

        {/* Dynamic Page Container (1366px desktop target) */}
        <main className="flex-1 px-3 sm:px-6 py-4 max-w-[1400px] w-full mx-auto space-y-4">
          {children}
        </main>

      </div>

      {/* 3. Global Command Palette / Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={onRouteChange}
      />

    </div>
  );
};