import React from 'react';
import { Navigation, ArrowRight } from 'lucide-react';
import { InteractiveUsMap } from '../components/map/InteractiveUsMap';
import { MockLoadBoard } from '../components/loadboard/MockLoadBoard';

interface RoutesLoadBoardPageProps {
  onNavigate: (path: string) => void;
}

export const RoutesLoadBoardPage: React.FC<RoutesLoadBoardPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-20 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30 text-xs font-mono font-bold uppercase">
          <Navigation className="w-3.5 h-3.5" />
          <span>Freight Telematics & Market Scanner</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Routes & Load Intelligence
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Simulated freight intelligence demonstrating how DGW Solutions LLC analyzes interstate corridors, qualifies spot rates, and schedules multi-leg runs for motor carriers.
        </p>
      </div>

      {/* Interactive Corridor Map */}
      <section className="space-y-6">
        <InteractiveUsMap />
      </section>

      {/* Mock Spot Market Load Board */}
      <section className="space-y-6">
        <MockLoadBoard />
      </section>

      {/* Bottom Action */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-logistics-900 to-logistics-950 border border-brand-gold/40 shadow-glow-gold flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-display font-extrabold text-white">Need Loads On These Specific Corridors?</h3>
          <p className="text-xs text-slate-400">Tell us where your truck is currently located and we will scan matching opportunities.</p>
        </div>
        <button
          onClick={() => onNavigate('/contact')}
          className="px-6 py-3 text-xs font-bold rounded-xl bg-brand-gold text-slate-950 hover:bg-amber-400 transition-colors shrink-0 shadow-glow-gold flex items-center gap-2"
        >
          <span>Connect My Truck</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
