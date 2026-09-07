import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface LogiXpressFeatureGridProps {
  onNavigate: (path: string) => void;
}

export const LogiXpressFeatureGrid: React.FC<LogiXpressFeatureGridProps> = ({ onNavigate }) => {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* ========================================================================= */}
      {/* FLOATING GLOWING ORANGE RADIAL BADGE (EXACT MATCH TO REFERENCE IMAGE)    */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex absolute -top-8 right-16 z-30 flex-col items-center justify-center">
        <div className="w-28 h-28 rounded-full logixpress-badge-glow flex flex-col items-center justify-center text-white text-center p-3 animate-float-slow cursor-pointer shadow-glow-orange-lg hover:scale-105 transition-transform"
             onClick={() => onNavigate('/services')}>
          <span className="font-display font-black text-2xl leading-none">10+</span>
          <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider mt-0.5">Core Services</span>
          <span className="text-[8px] font-mono text-white/80 mt-0.5">48 States</span>
        </div>
      </div>

      {/* Section Eyebrow & Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-mono font-bold uppercase shadow-xs">
          <span>Nationwide Logistics Capabilities</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-950 uppercase tracking-tight">
          Everything Your Truck Needs To Stay Moving
        </h2>
      </div>

      {/* ========================================================================= */}
      {/* 4-CARD VISUAL GRID (AS SHOWN IN LOGIXPRESS REFERENCE TEMPLATE)            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Advanced Real-Time Tracking System (Intermodal Port Image) */}
        <div 
          onClick={() => onNavigate('/load-board')}
          className="group relative h-80 rounded-3xl overflow-hidden border border-white/10 hover:border-brand-orange/60 transition-all duration-300 shadow-2xl flex flex-col justify-end p-6 cursor-pointer transform hover:-translate-y-1"
        >
          {/* Background Image */}
          <img
            src="/images/intermodal_port.jpg"
            alt="Real-Time Tracking"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-logistics-950 via-logistics-950/75 to-transparent" />
          
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-orange bg-logistics-950/80 px-2.5 py-1 rounded-full border border-brand-orange/30">
              Live Sourcing & GPS
            </span>
            <h3 className="text-lg font-display font-bold text-white group-hover:text-brand-orange transition-colors">
              Advanced Real-Time Tracking System
            </h3>
            <p className="text-xs text-slate-300 line-clamp-2">
              Proactive milestone check-calls, rate index analytics, and continuous corridor monitoring across North America.
            </p>
            <div className="pt-2 flex items-center gap-1 text-xs font-bold text-brand-orange">
              <span>Inspect Live Board</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Card 2: SIGNATURE ELECTRIC ORANGE HIGHLIGHT CARD */}
        <div 
          onClick={() => onNavigate('/about')}
          className="group relative h-80 rounded-3xl overflow-hidden bg-gradient-to-br from-brand-orange via-brand-orange-light to-brand-orange-dark p-6 text-white shadow-glow-orange-lg flex flex-col justify-between cursor-pointer transform hover:-translate-y-1 transition-all duration-300 border border-white/20"
        >
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 border border-white/30 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span className="font-mono text-[10px] font-bold tracking-wider uppercase">DGW Integrity Standard</span>
            </div>
            <div className="pt-2">
              <span className="font-display font-black text-4xl block">15+</span>
              <span className="font-mono text-xs font-semibold text-white/90 uppercase tracking-wider">Years Combined Logistics Focus</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-display font-black leading-snug">
              100% Transparent Freight Pricing & Direct Carrier Control
            </h3>
            <p className="text-xs text-white/90 leading-relaxed">
              You maintain 100% final approval on all load bookings. Zero forced dispatch. Zero hidden arrangements.
            </p>
            <div className="pt-1 flex items-center gap-1 text-xs font-bold text-white underline">
              <span>Read DGW Mission</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Card 3: Comprehensive Customs and Compliance (Warehouse Dock Image) */}
        <div 
          onClick={() => onNavigate('/documents')}
          className="group relative h-80 rounded-3xl overflow-hidden border border-white/10 hover:border-brand-orange/60 transition-all duration-300 shadow-2xl flex flex-col justify-end p-6 cursor-pointer transform hover:-translate-y-1"
        >
          {/* Background Image */}
          <img
            src="/images/cargo_warehouse_hub.jpg"
            alt="Compliance Hub"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-logistics-950 via-logistics-950/75 to-transparent" />
          
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-cyan bg-logistics-950/80 px-2.5 py-1 rounded-full border border-brand-cyan/30">
              Documentation Hub
            </span>
            <h3 className="text-lg font-display font-bold text-white group-hover:text-brand-cyan transition-colors">
              Comprehensive Broker Packets & Compliance
            </h3>
            <p className="text-xs text-slate-300 line-clamp-2">
              Instant transmission of COI ($1M Auto / Cargo), W-9, NOA, and FMCSA operating authority certificates.
            </p>
            <div className="pt-2 flex items-center gap-1 text-xs font-bold text-brand-cyan">
              <span>View Document Center</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Card 4: Track Cargo & Deliver with Ease (Red Fleet Image) */}
        <div 
          onClick={() => onNavigate('/equipment')}
          className="group relative h-80 rounded-3xl overflow-hidden border border-white/10 hover:border-brand-orange/60 transition-all duration-300 shadow-2xl flex flex-col justify-end p-6 cursor-pointer transform hover:-translate-y-1"
        >
          {/* Background Image */}
          <img
            src="/images/fleet_red_rigs.jpg"
            alt="Fleet Equipment"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-logistics-950 via-logistics-950/75 to-transparent" />
          
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald bg-logistics-950/80 px-2.5 py-1 rounded-full border border-brand-emerald/30">
              9 Equipment Types
            </span>
            <h3 className="text-lg font-display font-bold text-white group-hover:text-brand-emerald transition-colors">
              Track Cargo & Deliver with Ease
            </h3>
            <p className="text-xs text-slate-300 line-clamp-2">
              Specialized dispatch support across Dry Vans, Reefers, Flatbeds, Hotshots, Box Trucks, and Power Only units.
            </p>
            <div className="pt-2 flex items-center gap-1 text-xs font-bold text-brand-emerald">
              <span>Explore Fleet Specs</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
