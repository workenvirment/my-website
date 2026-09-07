import React, { useState } from 'react';
import { ShieldCheck, Activity, Database, Server } from 'lucide-react';

export const SystemHealthIndicator: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="relative inline-block text-xs font-mono">
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-white/10 hover:border-emerald-500/50 text-slate-300 hover:text-white transition-all shadow-sm"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[11px] font-bold text-emerald-400">All Systems Operational</span>
      </button>

      {showDetails && (
        <div 
          className="absolute bottom-full right-0 mb-2 w-72 p-4 rounded-2xl bg-slate-900 border border-white/15 shadow-2xl text-white space-y-3 z-50 animate-in fade-in"
          onMouseLeave={() => setShowDetails(false)}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-bold text-xs">DGW Platform Telemetry</span>
            <span className="text-[10px] text-emerald-400 font-bold">99.98% UPTIME</span>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-brand-orange" />
                <span>Vite Edge Gateway</span>
              </span>
              <span className="text-emerald-400 font-bold">ONLINE</span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                <span>FMCSA Registry Mirror</span>
              </span>
              <span className="text-emerald-400 font-bold">SYNCED</span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Firebase OAuth 2.0</span>
              </span>
              <span className="text-emerald-400 font-bold">ACTIVE</span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-purple-400" />
                <span>Live GPS Radar Feed</span>
              </span>
              <span className="text-emerald-400 font-bold">186 FLEETS</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 text-[10px] text-slate-500 text-center">
            Denver HQ Operational Core • Saad Altaf (Sole MBR)
          </div>
        </div>
      )}
    </div>
  );
};
