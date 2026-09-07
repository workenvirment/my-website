import React from 'react';
import { ShieldCheck, Building2, ArrowLeft } from 'lucide-react';

interface LegalPrivacyPageProps {
  onNavigate: (path: string) => void;
}

export const LegalPrivacyPage: React.FC<LegalPrivacyPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-white">
      
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Legal & Corporate Governance</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white">
          Privacy Policy & Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          Last Updated: September 02, 2026 • DGW SOLUTIONS LLC (Sole Member: Saad Altaf)
        </p>
      </div>

      {/* Official Corporate Entity Notice Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl space-y-4">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Building2 className="w-6 h-6 text-brand-orange" />
          <div>
            <h2 className="text-lg font-bold text-white">Official Registered Business Entity Information</h2>
            <span className="text-xs text-slate-400 font-mono">Department of the Treasury • Internal Revenue Service CP575G</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
            <span className="text-slate-500 block">LEGAL ENTITY NAME</span>
            <span className="font-bold text-white text-sm">DGW SOLUTIONS LLC</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
            <span className="text-slate-500 block">OWNERSHIP / SOLE MEMBER</span>
            <span className="font-bold text-white text-sm">SAAD ALTAF (% SAAD ALTAF SOLE MBR)</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
            <span className="text-slate-500 block">CORPORATE HEADQUARTERS</span>
            <span className="font-bold text-white">9057 E 50TH AVE STE 22C, DENVER, CO 80238</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
            <span className="text-slate-500 block">FEDERAL EMPLOYER ID NUMBER (EIN)</span>
            <span className="font-bold text-brand-orange text-sm">42-4868007</span>
          </div>
        </div>
      </div>

      {/* Policy Sections */}
      <div className="space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        
        <section className="space-y-3 p-6 rounded-3xl bg-slate-900 border border-white/10">
          <h3 className="text-lg font-bold text-white">1. Logistics Back-Office Representation Standard</h3>
          <p>
            DGW Solutions LLC operates as an independent dispatch, logistics coordination, and administrative representation agency. DGW Solutions LLC is not a motor carrier and does not take physical possession or cargo ownership of freight unless specifically contracted under distinct licensed broker authority.
          </p>
          <p>
            Motor carriers contracted with DGW Solutions LLC retain 100% final authorization on all load tenders, rate confirmations, running lanes, and operational decisions. Zero forced dispatch is guaranteed.
          </p>
        </section>

        <section className="space-y-3 p-6 rounded-3xl bg-slate-900 border border-white/10">
          <h3 className="text-lg font-bold text-white">2. Data Protection & FMCSA Registry Queries</h3>
          <p>
            DGW Solutions LLC respects the privacy of carriers, brokers, and owner-operators. Telematics GPS data, rate confirmation numbers, Certificates of Insurance (COI), and driver credentials are encrypted using 256-bit AES protocols and are never sold or distributed to third-party marketing brokers.
          </p>
        </section>

        <section className="space-y-3 p-6 rounded-3xl bg-slate-900 border border-white/10">
          <h3 className="text-lg font-bold text-white">3. Contact & Corporate Inquiries</h3>
          <p>
            For legal inquiries, verification certificates, or IRS Form W-9 requests, contact our Denver corporate headquarters:
          </p>
          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-400 space-y-1">
            <div><strong>DGW SOLUTIONS LLC</strong> — Attn: Saad Altaf (Sole Member)</div>
            <div>9057 E 50th Ave Ste 22C, Denver, CO 80238</div>
            <div>Phone: +1 (800) DGW-LOAD / (303) 555-7194</div>
            <div>Email: dispatch.ops@dgwsolutions.com</div>
          </div>
        </section>

      </div>

      <div className="pt-4 flex justify-center">
        <button
          onClick={() => onNavigate('/')}
          className="px-6 py-3 rounded-2xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs shadow-glow-orange flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>
      </div>

    </div>
  );
};
