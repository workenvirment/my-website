import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Truck, 
  Navigation, 
  Compass,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { DgwButton } from '../common/DgwButton';

interface CinematicHeroProps {
  onNavigate: (path: string) => void;
  onSearchMc?: (query: string) => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({ onNavigate, onSearchMc }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [rpmIndex, setRpmIndex] = useState(2.84);
  const [activeUnits, setActiveUnits] = useState(186);

  // Subtle live telematics jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setRpmIndex((prev) => +(prev + (Math.random() * 0.04 - 0.02)).toFixed(2));
      setActiveUnits((prev) => Math.min(210, Math.max(175, prev + (Math.floor(Math.random() * 3) - 1))));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      onNavigate('/mc-lookup');
      return;
    }
    if (onSearchMc) {
      onSearchMc(searchQuery.trim());
    } else {
      onNavigate(`/mc-lookup?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden text-slate-900 pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      
      <div className="relative max-w-7xl mx-auto w-full z-10 py-6">
        
        {/* Main Asymmetric Grid: Text & Actions on Left, Realistic Truck Telematics HUD on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Main Typography, Tagline, CTAs, & Instant MC Search          */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Corporate Legal Badge */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300/80 text-amber-800 text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <span>DISPATCHERS GLOBAL WORLD • ENTERPRISE LOGISTICS</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-slate-200 text-slate-700 text-xs font-mono shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Denver HQ • Saad Altaf (Sole MBR) • EIN 42-4868007</span>
              </div>
            </div>

            {/* Main Heading & Tagline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-black tracking-tight text-slate-950 leading-[1.05]">
                DGW SOLUTIONS LLC
              </h1>
              
              <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gradient-gold leading-snug">
                Dispatching. Logistics. Moving Forward.
              </div>
            </div>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed font-normal">
              Professional dispatching and logistics solutions designed for modern trucking businesses. Dedicated back-office representation, spot market rate negotiation, and live FMCSA carrier safety vetting across North America.
            </p>

            {/* Action Buttons: Explore Services & Search MC Number */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <DgwButton
                variant="primary"
                size="lg"
                onClick={() => onNavigate('/services')}
                icon={<ArrowRight className="w-4 h-4 text-amber-400" />}
              >
                Explore Services
              </DgwButton>

              <DgwButton
                variant="secondary"
                size="lg"
                onClick={() => onNavigate('/mc-lookup')}
                icon={<Search className="w-4 h-4 text-blue-600" />}
              >
                Search MC Number
              </DgwButton>

              <DgwButton
                variant="glass"
                size="lg"
                onClick={() => onNavigate('/portal')}
                icon={<Truck className="w-4 h-4 text-emerald-600" />}
              >
                Command Portal
              </DgwButton>
            </div>

            {/* Instant MC / DOT Number Search Bar */}
            <div className="pt-2 max-w-xl">
              <form 
                onSubmit={handleHeroSearch}
                className="relative p-1.5 rounded-2xl bg-white/95 border border-slate-300 focus-within:border-amber-500 shadow-xl backdrop-blur-xl transition-all group"
              >
                <div className="flex items-center gap-2 pl-3">
                  <Search className="w-4 h-4 text-amber-600 shrink-0 group-focus-within:scale-110 transition-transform" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search MC Number, DOT#, Carrier, or Freight Broker..."
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none py-2"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-md"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              </form>

              {/* Trending Queries Badges */}
              <div className="flex flex-wrap items-center gap-2 mt-2.5 text-xs text-slate-500 font-mono">
                <span className="text-slate-400 text-[11px]">Quick Queries:</span>
                {[
                  { label: 'MC-984210', q: 'MC-984210' },
                  { label: 'DOT-4019283', q: 'DOT-4019283' },
                  { label: 'Apex 3PL', q: 'Apex' },
                  { label: 'Reefer 53FT', q: 'Reefer' }
                ].map((tag) => (
                  <button
                    key={tag.q}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag.q);
                      if (onSearchMc) onSearchMc(tag.q);
                      else onNavigate(`/mc-lookup?q=${encodeURIComponent(tag.q)}`);
                    }}
                    className="px-2 py-0.5 rounded-lg bg-white/90 border border-slate-200 hover:border-amber-500 hover:text-slate-900 text-slate-600 text-[11px] shadow-2xs transition-colors"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4 Trust Checkpoints */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 text-[11px] font-mono text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>$1M BIPD Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Zero Forced Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>48 US States</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>IRS CP575G Active</span>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Realistic Live Telematics HUD & In-Transit Radar Card       */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Main Live Telematics Glass Card */}
            <div className="p-6 rounded-3xl bg-white/95 border border-slate-200 shadow-2xl backdrop-blur-2xl space-y-5 text-slate-900">
              
              {/* Header Ticker */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-mono text-emerald-700 font-bold">LIVE TELEMATICS ACTIVE</span>
                </div>
                <span className="font-mono text-slate-500 text-[11px]">ELD PING: 99.98%</span>
              </div>

              {/* In-Transit Unit Spotlight */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase text-amber-700 font-bold">
                      IN TRANSIT • CORRIDOR I-40
                    </span>
                    <h3 className="text-base font-bold text-slate-950">
                      UNIT #204 • DGW EXPRESS
                    </h3>
                    <p className="text-[11px] text-slate-500 font-mono">
                      53' Aero Dry Van • 42,000 lbs General Freight
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-mono font-bold">
                    ON SCHEDULE
                  </span>
                </div>

                {/* Route Visualizer */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>Dallas, TX</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                    <span>Nashville, TN</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden border border-slate-300/40">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300" 
                      style={{ width: '68%' }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>68% Complete • 64 MPH</span>
                    <span>ETA: Tonight 8:30 PM CST</span>
                  </div>
                </div>

                {/* GPS Waypoint Details */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[10px] font-mono text-slate-500">
                  <span className="flex items-center gap-1 text-slate-700">
                    <Navigation className="w-3 h-3 text-blue-600" />
                    <span>34.7465° N, 92.2896° W</span>
                  </span>
                  <span>Driver: Marcus Vance</span>
                </div>
              </div>

              {/* 2 Sub-Metric HUD Cells */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-600 text-[10px]">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                    <span>SPOT RPM INDEX</span>
                  </div>
                  <div className="text-xl font-display font-black text-slate-900">
                    ${rpmIndex}<span className="text-xs text-emerald-600 font-bold ml-1">/mi</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block">National 7-Day Average</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-600 text-[10px]">
                    <Compass className="w-3.5 h-3.5 text-blue-600" />
                    <span>FLEETS TRACKING</span>
                  </div>
                  <div className="text-xl font-display font-black text-blue-700">
                    {activeUnits} <span className="text-xs text-slate-500 font-normal">Units</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block">Continental US Network</span>
                </div>
              </div>

              {/* Fast Dispatch CTA Line */}
              <div className="pt-1 flex items-center justify-between text-xs">
                <a
                  href="tel:+18003495623"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                  <span>24/7 Dispatch Desk: +1 (800) DGW-LOAD</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
