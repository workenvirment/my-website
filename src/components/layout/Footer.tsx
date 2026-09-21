import React from 'react';
import { 
  ShieldCheck, 
  Phone, 
  Mail,
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
            <div className="inline-block p-2 rounded-2xl bg-white border border-white/20 shadow-md">
              <img
                src="/images/dgw-logo.png"
                alt="DGW Solutions LLC"
                width={1024}
                height={512}
                className="h-12 sm:h-14 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Professional dispatching support for carriers and owner-operators, assisting with freight coordination, broker communication, and operational efficiency.
            </p>

            {/* Official Ownership Box */}
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1 font-mono text-[11px] text-slate-300">
              <div className="flex items-center justify-between text-amber-400 font-bold">
                <span>BUSINESS ENTITY</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div>COMPANY: <strong>DGW SOLUTIONS LLC</strong></div>
              <div>DIVISION: <strong>DISPATCHING GLOBAL WORLD</strong></div>
              <div>OWNER: <strong>SAAD ALTAF</strong></div>
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
                { label: 'How It Works', path: '/how-it-works' },
                { label: 'Equipment We Dispatch', path: '/equipment' },
                { label: 'About DGW Solutions LLC', path: '/about' },
                { label: 'Contact Dispatching Team', path: '/contact' },
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

          {/* Col 4: Operations Contact */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
              Contact Dispatching Team
            </span>
            <div className="space-y-3 text-slate-300">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Owner</span>
                <span className="text-xs font-bold text-white">Saad Altaf</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">WhatsApp</span>
                  <a 
                    href="https://wa.me/923418341278?text=Hello,%20I%20would%20like%20to%20learn%20more%20about%20your%20truck%20dispatching%20services." 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-amber-400 font-mono font-bold text-xs"
                  >
                    +92 341 8341278
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Email</span>
                  <a 
                    href="mailto:dispachingglobal@dgwsolutionllc.com" 
                    className="hover:text-amber-400 font-mono text-xs break-all"
                  >
                    dispachingglobal@dgwsolutionllc.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-[11px] text-slate-400">
                  Professional Dispatching Support<br />
                  Dedicated Operations Desk
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-mono text-[11px]">
          <div>
            © 2026 DGW Solutions LLC. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('/contact')} className="hover:text-slate-300">
              Contact Team
            </button>
            <button onClick={() => onNavigate('/services')} className="hover:text-slate-300">
              Dispatch Services
            </button>
            <button onClick={() => onNavigate('/how-it-works')} className="hover:text-slate-300">
              How It Works
            </button>
            <button onClick={() => onNavigate('/privacy-policy')} className="hover:text-slate-300">
              Privacy & Terms
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
