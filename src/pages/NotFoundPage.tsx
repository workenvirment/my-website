import React from 'react';
import { Compass, Home, Search, Truck, ArrowLeft, Building2, HelpCircle } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl bg-logistics-900 border border-white/10 rounded-3xl p-8 sm:p-12 text-center space-y-8 shadow-2xl backdrop-blur-xl">
        
        {/* Radar / Compass Icon */}
        <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-orange to-amber-500 flex items-center justify-center text-white mx-auto shadow-glow-orange animate-bounce duration-1000">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '10s' }} />
          <span className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full bg-slate-900 text-brand-orange border border-brand-orange text-[10px] font-mono font-bold">
            404
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-orange bg-brand-orange/10 border border-brand-orange/30 px-3 py-1 rounded-full font-bold">
            ROUTE COORDINATE NOT FOUND
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white">
            Dispatch Waypoint Unreachable
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            The destination URL or portal sector you requested does not exist or was rerouted. Use the dispatch navigational hubs below to get back on track.
          </p>
        </div>

        {/* Quick Nav Shortcut Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <button
            onClick={() => onNavigate('/')}
            className="p-3.5 rounded-2xl bg-logistics-950/80 hover:bg-brand-orange/20 border border-white/10 hover:border-brand-orange transition-all space-y-1.5 group"
          >
            <Home className="w-4 h-4 text-brand-orange group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xs text-white block">Home</span>
            <span className="text-[10px] text-slate-400 block">Main dispatch landing</span>
          </button>

          <button
            onClick={() => onNavigate('/load-board')}
            className="p-3.5 rounded-2xl bg-logistics-950/80 hover:bg-brand-orange/20 border border-white/10 hover:border-brand-orange transition-all space-y-1.5 group"
          >
            <Search className="w-4 h-4 text-brand-orange group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xs text-white block">Load Board</span>
            <span className="text-[10px] text-slate-400 block">Freight search</span>
          </button>

          <button
            onClick={() => onNavigate('/carriers')}
            className="p-3.5 rounded-2xl bg-logistics-950/80 hover:bg-brand-orange/20 border border-white/10 hover:border-brand-orange transition-all space-y-1.5 group"
          >
            <Truck className="w-4 h-4 text-brand-orange group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xs text-white block">Carriers</span>
            <span className="text-[10px] text-slate-400 block">Fleet setup packet</span>
          </button>

          <button
            onClick={() => onNavigate('/portal')}
            className="p-3.5 rounded-2xl bg-logistics-950/80 hover:bg-brand-orange/20 border border-white/10 hover:border-brand-orange transition-all space-y-1.5 group"
          >
            <Building2 className="w-4 h-4 text-brand-orange group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xs text-white block">Command Portal</span>
            <span className="text-[10px] text-slate-400 block">Live simulator</span>
          </button>
        </div>

        {/* Primary Return Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('/')}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold transition-all shadow-glow-orange flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to DGW Homepage</span>
          </button>

          <button
            onClick={() => window.history.length > 1 ? window.history.back() : onNavigate('/')}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all border border-slate-700 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>

        <div className="text-[11px] text-slate-500 font-mono flex items-center justify-center gap-1">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Need dispatch assistance? Call 24/7 Operations at +1 (800) DGW-LOAD</span>
        </div>

      </div>
    </div>
  );
};
