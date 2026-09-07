import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Phone, 
  Truck,
  Smartphone
} from 'lucide-react';
import { DgwButton } from '../common/DgwButton';
import { DeviceReachabilityModal } from '../common/DeviceReachabilityModal';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPath, 
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deviceModalOpen, setDeviceModalOpen] = useState(false);

  // Clean, intuitive 6-page navigation structure
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Equipment', path: '/equipment' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Brand Logo */}
            <button 
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-3 text-left focus:outline-none group"
            >
              <div className="relative w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105">
                <Truck className="w-5 h-5 text-amber-400" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-lg sm:text-xl tracking-tight text-slate-950 group-hover:text-amber-600 transition-colors">
                    DGW<span className="text-amber-600">SOLUTIONS</span>
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 font-bold">
                    LLC
                  </span>
                </div>
                <span className="font-mono text-[9px] text-slate-500 tracking-wider font-semibold">
                  DISPATCHERS GLOBAL WORLD • DENVER, CO
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
              {navItems.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 ${
                      isActive 
                        ? 'text-amber-800 bg-amber-50 border border-amber-200 shadow-2xs' 
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Right Actions: Phone + Mobile Connect + Get Dispatched */}
            <div className="hidden sm:flex items-center gap-2 lg:gap-3">
              <button
                onClick={() => setDeviceModalOpen(true)}
                className="flex items-center gap-1 text-[11px] font-mono font-bold text-slate-600 hover:text-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                title="Open on Mobile Phone or other devices"
              >
                <Smartphone className="w-3.5 h-3.5 text-amber-600" />
                <span>Mobile Access</span>
              </button>

              <a
                href="tel:+18003495623"
                className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 hover:text-amber-600 px-3 py-2 rounded-xl hover:bg-amber-50 transition-colors"
                title="Call 24/7 Dispatch Desk"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>+1 (800) DGW-LOAD</span>
              </a>

              <DgwButton
                variant="primary"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5 text-amber-400" />}
                onClick={() => handleNavClick('/contact')}
              >
                Get Dispatched
              </DgwButton>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center gap-1.5">
              <button
                onClick={() => setDeviceModalOpen(true)}
                className="p-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200"
                title="Mobile / LAN Connect"
              >
                <Smartphone className="w-4 h-4 text-amber-600" />
              </button>

              <a
                href="tel:+18003495623"
                className="p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200"
                title="Call Us"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-950"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden p-4 bg-white border-b border-slate-200 space-y-3 animate-in slide-in-from-top duration-200 shadow-xl">
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`p-3 rounded-xl text-left font-bold transition-all ${
                    currentPath === item.path 
                      ? 'bg-amber-50 text-amber-800 border border-amber-200' 
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
              <a
                href="tel:+18003495623"
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 text-center"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>Call +1 (800) DGW-LOAD</span>
              </a>

              <button
                onClick={() => handleNavClick('/contact')}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-md"
              >
                Get Dispatched Now (1-Minute Form)
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Device Reachability Modal */}
      <DeviceReachabilityModal
        isOpen={deviceModalOpen}
        onClose={() => setDeviceModalOpen(false)}
      />
    </>
  );
};
