import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail,
  Truck,
  Clock
} from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Tier: Company Summary, Navigation & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Corporate Verification */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shrink-0 shadow-md">
                <Truck className="w-5 h-5" />
              </div>

              <div>
                <span className="font-display font-black text-xl text-white tracking-tight">
                  DGW<span className="text-amber-400">SOLUTIONS</span> LLC
                </span>
                <span className="font-mono text-[9px] text-slate-400 block tracking-wider">
                  DISPATCHERS GLOBAL WORLD • DENVER HQ
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Dedicated truck dispatching, aggressive rate negotiation, broker paperwork, and 24/7 road operations for independent motor carriers across the United States.
            </p>

            {/* Official Filing Box */}
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1 font-mono text-[11px] text-slate-300">
              <div className="flex items-center justify-between text-amber-400 font-bold">
                <span>IRS VERIFIED BUSINESS</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div>OWNER: <strong>SAAD ALTAF (SOLE MBR)</strong></div>
              <div>EIN: <strong>42-4868007</strong></div>
              <div>DENVER, CO 80238</div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
              Quick Links
            </span>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', path: '/' },
                { label: 'Dispatch Services', path: '/services' },
                { label: 'How It Works (3 Steps)', path: '/how-it-works' },
                { label: 'Equipment We Dispatch', path: '/equipment' },
                { label: 'About DGW Solutions LLC', path: '/about' },
                { label: 'Contact & Apply Now', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => onNavigate(link.path)}
                    className="hover:text-amber-400 transition-colors text-left text-slate-400 hover:text-white"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Equipment We Handle */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
              Equipment Categories
            </span>
            <ul className="space-y-2.5 text-slate-400">
              {[
                '53ft Dry Van',
                '53ft Reefer (Refrigerated)',
                '48ft / 53ft Flatbed',
                'Stepdeck / Drop Deck',
                '26ft Box Truck (CDL & Non-CDL)',
                '40ft Hotshot (Gooseneck)',
                'Power Only (Tractor)',
              ].map((eq) => (
                <li key={eq}>
                  <button
                    onClick={() => onNavigate('/equipment')}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {eq}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: 24/7 Operations Contact */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
              24/7 Dispatch Desk
            </span>
            <div className="space-y-3 text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs">9057 E 50th Ave Ste 22C<br />Denver, CO 80238</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+18003495623" className="hover:text-amber-400 font-mono font-bold text-xs">
                  +1 (800) DGW-LOAD
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:dispatch.ops@dgwsolutions.com" className="hover:text-amber-400 font-mono text-xs">
                  dispatch.ops@dgwsolutions.com
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-[11px] text-slate-400">
                  Mon – Sat: 6:00 AM – 8:00 PM MST<br />
                  24/7 Emergency Road Support
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-mono text-[11px]">
          <div>
            © 2026 DGW SOLUTIONS LLC. All Rights Reserved. Sole Member: Saad Altaf.
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('/contact')} className="hover:text-slate-300">
              Denver HQ Contact
            </button>
            <button onClick={() => onNavigate('/services')} className="hover:text-slate-300">
              Dispatch Services
            </button>
            <button onClick={() => onNavigate('/how-it-works')} className="hover:text-slate-300">
              How It Works
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
