import React from 'react';
import { McSearchSystem } from '../components/mc/McSearchSystem';
import { ShieldCheck } from 'lucide-react';

interface McLookupPageProps {
  onNavigate: (path: string) => void;
}

export const McLookupPage: React.FC<McLookupPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Banner Notice */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-white block">Official Federal Registry Verification</span>
            <span className="text-slate-400">Direct integration with FMCSA licensing, safety records, and $1,000,000 BIPD certificates.</span>
          </div>
        </div>

        <div className="text-[11px] font-mono text-slate-400">
          DENVER HQ: 9057 E 50th Ave • EIN 42-4868007
        </div>
      </div>

      {/* Main Search Component */}
      <McSearchSystem onNavigate={onNavigate} />

    </div>
  );
};
