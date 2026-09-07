import React from 'react';
import { Phone, Truck, ShieldCheck, Home, FileText } from 'lucide-react';

interface MobileBottomBarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  currentPath,
  onNavigate
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 block md:hidden bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 text-white shadow-2xl safe-area-bottom">
      <div className="grid grid-cols-4 items-center justify-around px-2 py-1.5 text-center">
        
        {/* Home */}
        <button
          onClick={() => onNavigate('/')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            currentPath === '/' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Home</span>
        </button>

        {/* Equipment */}
        <button
          onClick={() => onNavigate('/equipment')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            currentPath === '/equipment' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Truck className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Equipment</span>
        </button>

        {/* Services */}
        <button
          onClick={() => onNavigate('/services')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            currentPath === '/services' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Services</span>
        </button>

        {/* Apply Now */}
        <button
          onClick={() => onNavigate('/contact')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            currentPath === '/contact' || currentPath === '/apply' 
              ? 'text-amber-400 font-bold' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Apply (1-Min)</span>
        </button>

      </div>

      {/* Primary Sticky Call & Dispatch Action Strip on Mobile */}
      <div className="px-3 pb-2 pt-1 grid grid-cols-2 gap-2 border-t border-white/10 bg-slate-900/90">
        <a
          href="tel:+18003495623"
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold border border-slate-700 active:scale-95 transition-transform"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span>(800) DGW-LOAD</span>
        </a>

        <button
          onClick={() => onNavigate('/contact')}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-md active:scale-95 transition-transform"
        >
          <span>⚡ Get Dispatched</span>
        </button>
      </div>
    </div>
  );
};
