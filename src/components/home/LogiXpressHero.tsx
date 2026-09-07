import React, { useState } from 'react';
import { 
  ArrowRight, 
  Search, 
  MapPin, 
  PhoneCall, 
  ShieldCheck, 
  Sparkles,
  Calendar,
  Layers
} from 'lucide-react';

interface LogiXpressHeroProps {
  onNavigate: (path: string) => void;
  activeMode?: string;
  onChangeMode?: (mode: string) => void;
}

export const LogiXpressHero: React.FC<LogiXpressHeroProps> = ({ 
  onNavigate,
  activeMode = 'trucking',
  onChangeMode
}) => {
  const [quickSearchOrigin, setQuickSearchOrigin] = useState('Dallas, TX');
  const [quickSearchDest, setQuickSearchDest] = useState('Atlanta, GA');
  const [quickEquipment, setQuickEquipment] = useState('53ft Dry Van');
  const [showEstimatedRate, setShowEstimatedRate] = useState(false);

  const heroModes = [
    { id: 'trucking', label: 'Interstate Linehaul', bg: '/images/hero_truck_sunset.jpg', title: 'CROSS COUNTRY COVERAGE WITH RELIABLE TRUCKING', subtitle: 'DGW Solutions LLC connects carriers with suitable loads while managing broker check-calls and rate negotiations behind the scenes.' },
    { id: 'expedited', label: 'Expedited & Box Truck', bg: '/images/fleet_red_rigs.jpg', title: 'HIGH-PRIORITY EXPEDITED LOGISTICS & DISPATCH', subtitle: 'Rapid nationwide coordination for time-sensitive cargo, straight box trucks, and regional sprinter van freight.' },
    { id: 'intermodal', label: 'Port & Intermodal', bg: '/images/intermodal_port.jpg', title: 'SEAMLESS INTERMODAL CONTAINER LOGISTICS', subtitle: 'Connecting drayage carriers and power-only tractors with high-velocity port terminal container moves.' },
    { id: 'heavyhaul', label: 'Heavy Haul & Flatbed', bg: '/images/cargo_warehouse_hub.jpg', title: 'SPECIALIZED OPEN-DECK FREIGHT DISPATCH', subtitle: 'Engineered transport coordination for oversized machinery, flatbeds, stepdecks, and RGN heavy platforms.' },
  ];

  const currentHero = heroModes.find((m) => m.id === activeMode) || heroModes[0];

  const handleEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowEstimatedRate(true);
  };

  return (
    <div className="relative min-h-[90vh] lg:min-h-[94vh] flex flex-col justify-between overflow-hidden bg-logistics-950">
      
      {/* Full-Bleed Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentHero.bg}
          alt="DGW Logistics Hero"
          className="w-full h-full object-cover object-center transition-all duration-700 scale-105"
        />
        {/* Deep Atmospheric Gradients */}
        <div className="absolute inset-0 hero-gradient-overlay" />
        <div className="absolute inset-0 hero-side-gradient" />
        <div className="absolute inset-0 logistics-grid opacity-25" />
      </div>

      {/* Top Banner Tag / Mode Switcher */}
      <div className="relative z-10 pt-24 sm:pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          
          {/* Tagline / Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
            <span className="font-mono text-[11px] font-bold text-white tracking-widest uppercase">
              DGW SOLUTIONS LLC • DISPATCHERS GLOBAL WORLD
            </span>
          </div>

          {/* Interactive Hero Preset Switcher (As shown in LogiXpress multi-demo header) */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-logistics-950/80 border border-white/10 backdrop-blur-xl">
            {heroModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => onChangeMode && onChangeMode(mode.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeMode === mode.id
                    ? 'bg-brand-orange text-white font-bold shadow-glow-orange'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Main Hero Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Bold Typography & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-white leading-[1.04] uppercase drop-shadow-2xl">
                {currentHero.title.split('WITH').map((part, idx) => (
                  <React.Fragment key={idx}>
                    {idx === 0 ? (
                      <span>{part}</span>
                    ) : (
                      <>
                        <br className="hidden sm:inline" />
                        <span className="text-gradient-orange">WITH {part}</span>
                      </>
                    )}
                  </React.Fragment>
                ))}
              </h1>

              <p className="text-base sm:text-lg text-slate-200 font-normal max-w-xl leading-relaxed drop-shadow-md">
                {currentHero.subtitle}
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onNavigate('/carriers')}
                className="px-8 py-4 text-xs font-bold rounded-full text-white bg-gradient-to-r from-brand-orange via-brand-orange-light to-brand-orange hover:from-brand-orange-light hover:to-brand-orange transition-all duration-300 shadow-glow-orange-lg flex items-center gap-2.5 transform hover:-translate-y-0.5 tracking-wider uppercase"
              >
                <span>GET STARTED AS A CARRIER</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={() => onNavigate('/brokers')}
                className="px-7 py-4 text-xs font-bold rounded-full text-white bg-logistics-900/80 hover:bg-logistics-800 border border-white/20 backdrop-blur-xl transition-all duration-300 flex items-center gap-2 tracking-wider uppercase hover:border-brand-orange"
              >
                <ShieldCheck className="w-4 h-4 text-brand-orange" />
                <span>WORK WITH DGW</span>
              </button>

              <button
                onClick={() => onNavigate('/load-board')}
                className="px-5 py-4 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Explore Live Corridors →</span>
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Quick Lane Scanner / Quote Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-3xl bg-logistics-950/85 border border-white/15 shadow-2xl backdrop-blur-2xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse" />
                  <span className="font-display font-bold text-white text-sm">Instant Freight Match Scanner</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-orange/20 text-brand-orange border border-brand-orange/30 font-bold uppercase">
                  ACTIVE
                </span>
              </div>

              <form onSubmit={handleEstimate} className="space-y-3.5 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-orange" />
                      <span>Origin Hub</span>
                    </label>
                    <input
                      type="text"
                      value={quickSearchOrigin}
                      onChange={(e) => setQuickSearchOrigin(e.target.value)}
                      placeholder="e.g. Dallas, TX"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-logistics-900/90 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-orange"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-cyan" />
                      <span>Destination</span>
                    </label>
                    <input
                      type="text"
                      value={quickSearchDest}
                      onChange={(e) => setQuickSearchDest(e.target.value)}
                      placeholder="e.g. Atlanta, GA"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-logistics-900/90 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold flex items-center gap-1">
                    <Layers className="w-3 h-3 text-brand-orange" />
                    <span>Equipment Category</span>
                  </label>
                  <select
                    value={quickEquipment}
                    onChange={(e) => setQuickEquipment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-logistics-900/90 border border-white/10 text-white focus:outline-none focus:border-brand-orange"
                  >
                    <option value="53ft Dry Van">53ft Dry Van Enclosed</option>
                    <option value="53ft Reefer">53ft Refrigerated (Reefer)</option>
                    <option value="48/53ft Flatbed">48/53ft Flatbed (Open Deck)</option>
                    <option value="Hotshot Flatbed">Hotshot Flatbed (30-40ft)</option>
                    <option value="26ft Box Truck">Straight Box Truck (26ft)</option>
                    <option value="Power Only">Power Only Tractor (Interchange)</option>
                    <option value="Stepdeck">Stepdeck / Drop Deck</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-orange-hover text-white font-bold text-xs hover:from-brand-orange-hover hover:to-brand-orange transition-all shadow-glow-orange flex items-center justify-center gap-2"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Scan Matching Loads & Target Rate</span>
                </button>

              </form>

              {/* Estimate Result Box */}
              {showEstimatedRate && (
                <div className="p-4 rounded-2xl bg-logistics-900 border border-brand-orange/40 space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-brand-orange font-bold">ESTIMATED TARGET BENCHMARK</span>
                    <span className="text-[10px] font-mono text-slate-400">~785 MILES</span>
                  </div>
                  <div className="flex items-center justify-between text-white">
                    <span className="text-xs">{quickSearchOrigin} → {quickSearchDest}</span>
                    <span className="text-base font-display font-extrabold text-brand-orange">$2,450.00 <span className="text-xs font-normal text-slate-400">($3.12/mi)</span></span>
                  </div>
                  <p className="text-[10px] text-slate-400 italic">
                    * Illustrative target benchmark. Actual rates determined upon broker negotiation.
                  </p>
                </div>
              )}

              {/* 2 Quick Pledges */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="text-brand-orange">✓</span>
                  <span>Zero Forced Dispatch</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-brand-orange">✓</span>
                  <span>100% Final Approval</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* Lower Hero Horizontal Feature Bar (As shown in LogiXpress Template)       */}
      {/* ========================================================================= */}
      <div className="relative z-10 bg-logistics-950/90 border-t border-white/10 backdrop-blur-2xl py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs text-slate-300">
            
            <button 
              onClick={() => onNavigate('/services')}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-orange/15 text-brand-orange border border-brand-orange/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block text-sm group-hover:text-brand-orange transition-colors">Fast Direct Dispatch</span>
                <span className="text-[11px] text-slate-400">Top-paying freight matching</span>
              </div>
            </button>

            <button 
              onClick={() => onNavigate('/load-board')}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block text-sm group-hover:text-brand-cyan transition-colors">Reliable Telematics</span>
                <span className="text-[11px] text-slate-400">Automated check-call updates</span>
              </div>
            </button>

            <button 
              onClick={() => onNavigate('/carriers')}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block text-sm group-hover:text-brand-emerald transition-colors">Multi-Leg Planning</span>
                <span className="text-[11px] text-slate-400">We look ahead for backhauls</span>
              </div>
            </button>

            <button 
              onClick={() => onNavigate('/brokers')}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-orange/15 text-brand-orange border border-brand-orange/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block text-sm group-hover:text-brand-orange transition-colors">24/7 Back-Office</span>
                <span className="text-[11px] text-slate-400">Complete broker coordination</span>
              </div>
            </button>

          </div>
        </div>
      </div>

    </div>
  );
};
