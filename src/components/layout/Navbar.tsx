import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  FileText,
  Truck,
  Smartphone
} from 'lucide-react';
import { DgwLogo } from '../common/DgwLogo';
import { DeviceReachabilityModal } from '../common/DeviceReachabilityModal';
import { CarrierRequirementsModal } from '../common/CarrierRequirementsModal';

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
  const [requirementsModalOpen, setRequirementsModalOpen] = useState(false);

  // 6-page navigation structure
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-17">
            
            {/* Brand Logo with generous breathing room */}
            <button 
              onClick={() => handleNavClick('/')}
              className="flex items-center text-left focus:outline-none group cursor-pointer pr-4 lg:pr-6"
            >
              <DgwLogo size="md" showSubtitle={true} />
            </button>

            {/* Desktop Navigation Links with generous horizontal spacing */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-9">
              {navItems.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`relative px-1 py-1.5 text-[13.5px] font-semibold tracking-normal transition-colors cursor-pointer ${
                      isActive 
                        ? 'text-blue-600 font-bold' 
                        : 'text-slate-700 hover:text-blue-600'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Right Actions: Carrier Requirements + Contact Dispatch with comfortable gaps */}
            <div className="hidden sm:flex items-center gap-3 lg:gap-4 pl-4 lg:pl-6">
              
              {/* Carrier Requirements Document Download Button */}
              <button
                onClick={() => setRequirementsModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/80 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-semibold text-xs transition-all cursor-pointer shadow-2xs group"
                title="Download Carrier Document Requirements"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600 group-hover:scale-105 transition-transform" />
                <span>Carrier Requirements</span>
              </button>

              {/* Contact Dispatch Button */}
              <button
                onClick={() => handleNavClick('/contact')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B1727] hover:bg-[#16253B] text-white font-semibold text-xs sm:text-[13px] shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <Truck className="w-3.5 h-3.5 text-blue-400" />
                <span>Contact Dispatch</span>
                <ArrowRight className="w-3 h-3 text-slate-300" />
              </button>
            </div>

            {/* Mobile Actions & Hamburger with comfortable tap targets */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setRequirementsModalOpen(true)}
                className="p-2 rounded-lg bg-blue-50 text-blue-700 border border-blue-200"
                title="Carrier Requirements"
              >
                <FileText className="w-4 h-4" />
              </button>

              <button
                onClick={() => setDeviceModalOpen(true)}
                className="p-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                title="Mobile / LAN Connect"
              >
                <Smartphone className="w-4 h-4 text-blue-600" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-950"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden p-4 bg-white border-b border-slate-200 space-y-3 shadow-xl">
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`p-3 rounded-xl text-left font-bold transition-all ${
                    currentPath === item.path 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setRequirementsModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold text-xs flex items-center justify-center gap-2 text-center"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Download Carrier Requirements List</span>
              </button>

              <button
                onClick={() => handleNavClick('/contact')}
                className="w-full py-2.5 rounded-xl bg-[#0B1727] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <Truck className="w-3.5 h-3.5 text-blue-400" />
                <span>Contact Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5" />
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

      {/* Carrier Requirements Modal */}
      <CarrierRequirementsModal
        isOpen={requirementsModalOpen}
        onClose={() => setRequirementsModalOpen(false)}
        onNavigateToApply={() => handleNavClick('/contact')}
      />
    </>
  );
};
