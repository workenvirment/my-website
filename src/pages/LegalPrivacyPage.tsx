import React from 'react';
import { ShieldCheck, Building2, ArrowLeft, Mail, MessageSquare } from 'lucide-react';

interface LegalPrivacyPageProps {
  onNavigate: (path: string) => void;
}

export const LegalPrivacyPage: React.FC<LegalPrivacyPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-white">
      
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Legal & Business Governance</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white">
          Privacy Policy & Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          DGW SOLUTIONS LLC • Dispatching Global World • Owner: Saad Altaf
        </p>
      </div>

      {/* Official Business Entity Information Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl space-y-4">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Building2 className="w-6 h-6 text-amber-500" />
          <div>
            <h2 className="text-lg font-bold text-white">Business Entity & Governance Overview</h2>
            <span className="text-xs text-slate-400 font-mono">Logistics Dispatching & Carrier Operational Representation</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
            <span className="text-slate-500 block">COMPANY NAME</span>
            <span className="font-bold text-white text-sm">DGW SOLUTIONS LLC</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
            <span className="text-slate-500 block">DIVISION / TEAM</span>
            <span className="font-bold text-white text-sm">Dispatching Global World</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
            <span className="text-slate-500 block">LEADERSHIP / OWNER</span>
            <span className="font-bold text-white text-sm">Saad Altaf</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
            <span className="text-slate-500 block">OFFICIAL EMAIL</span>
            <span className="font-bold text-amber-400 text-sm">dispachingglobal@dgwsolutionllc.com</span>
          </div>
        </div>
      </div>

      {/* Policy Sections */}
      <div className="space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        
        <section className="space-y-3 p-6 rounded-3xl bg-slate-900 border border-white/10">
          <h3 className="text-lg font-bold text-white">1. Logistics Back-Office Representation Standard</h3>
          <p>
            DGW Solutions LLC operates as an independent truck dispatching, logistics coordination, and administrative representation service provider. DGW Solutions LLC coordinates freight opportunities on behalf of authorized motor carriers and owner-operators.
          </p>
          <p>
            Motor carriers collaborating with DGW Solutions LLC retain 100% final authorization on all load tenders, rate confirmations, operating lanes, and scheduling decisions. No forced dispatch is practiced.
          </p>
        </section>

        <section className="space-y-3 p-6 rounded-3xl bg-slate-900 border border-white/10">
          <h3 className="text-lg font-bold text-white">2. Data Protection & Operational Confidentiality</h3>
          <p>
            DGW Solutions LLC respects the privacy and confidentiality of carrier credentials, rate confirmations, Certificates of Insurance (COI), W-9 documentation, and routing data. All information submitted to our dispatch desk is handled strictly for freight coordination, broker onboarding packets, and invoicing administration.
          </p>
        </section>

        <section className="space-y-3 p-6 rounded-3xl bg-slate-900 border border-white/10">
          <h3 className="text-lg font-bold text-white">3. Contact & Business Inquiries</h3>
          <p>
            For business inquiries, onboarding documentation, or formal correspondence, contact our dispatching team directly:
          </p>
          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-400 space-y-2">
            <div><strong className="text-white">DGW SOLUTIONS LLC</strong> — Dispatching Global World</div>
            <div>Owner: <span className="text-white font-bold">Saad Altaf</span></div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <a href="mailto:dispachingglobal@dgwsolutionllc.com" className="hover:text-amber-400 text-slate-300">
                dispachingglobal@dgwsolutionllc.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <a 
                href="https://wa.me/923418341278?text=Hello,%20I%20would%20like%20to%20learn%20more%20about%20your%20truck%20dispatching%20services." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-emerald-400 text-slate-300"
              >
                +92 341 8341278 (WhatsApp Support)
              </a>
            </div>
          </div>
        </section>

      </div>

      <div className="pt-4 flex justify-center">
        <button
          onClick={() => onNavigate('/')}
          className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>
      </div>

    </div>
  );
};

