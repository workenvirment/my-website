import React from 'react';
import { 
  Truck, 
  Compass
} from 'lucide-react';
import { CarrierChecklist } from '../components/carrier/CarrierChecklist';
import { CarrierContactForm } from '../components/forms/CarrierContactForm';

interface CarriersPageProps {
  onNavigate?: (path: string) => void;
}

export const CarriersPage: React.FC<CarriersPageProps> = () => {
  const carrierSteps = [
    { name: 'SEARCH', desc: 'Scan markets for matching freight' },
    { name: 'QUALIFY', desc: 'Screen broker credit & rate metrics' },
    { name: 'COMMUNICATE', desc: 'Direct broker rate negotiations' },
    { name: 'COORDINATE', desc: 'Instant broker setup packet dispatch' },
    { name: 'BOOK', desc: 'Carrier approves Rate Confirmation' },
    { name: 'TRACK', desc: 'Proactive GPS & check-calls' },
    { name: 'DELIVER', desc: 'Safe dock arrival & clean unload' },
    { name: 'DOCUMENT', desc: 'Instant POD & BOL broker transmission' },
    { name: 'PAYMENT', desc: 'Factoring or QuickPay processing' },
  ];

  return (
    <div className="space-y-20 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30 text-xs font-mono font-bold uppercase">
          <Truck className="w-3.5 h-3.5" />
          <span>Carrier Dispatch Solutions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          You Focus On Driving. <br />
          <span className="text-gradient-gold">We Focus On Dispatch Support.</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Keep your truck loaded, avoid empty deadhead, and eliminate the frustration of endless broker phone calls while parked at rest stops.
        </p>
      </div>

      {/* Carrier Experience Flow (9 Stages) */}
      <section className="p-6 md:p-8 rounded-3xl bg-logistics-900 border border-slate-700/80 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono font-bold text-brand-gold uppercase">The Carrier Experience</span>
            <h3 className="text-base font-display font-bold text-white mt-0.5">End-to-End Operational Journey</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">9-STAGE WORKFLOW</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 text-center text-xs">
          {carrierSteps.map((step, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-logistics-950 border border-slate-800 space-y-1 relative group hover:border-brand-gold transition-colors">
              <span className="text-[10px] font-mono text-brand-gold font-bold block">0{idx + 1}</span>
              <span className="font-bold text-white block text-[11px]">{step.name}</span>
              <p className="text-[10px] text-slate-400 line-clamp-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Advance Load Planning ("WE LOOK AHEAD") */}
      <section className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-logistics-900 via-logistics-850 to-logistics-900 border border-brand-gold/40 shadow-glow-gold space-y-6">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-brand-gold/15 text-brand-gold border border-brand-gold/30 text-[10px] font-mono font-bold uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>Proactive Route Scheduling</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
            WE LOOK AHEAD. Multi-Leg Freight Planning.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The secret to consistent trucking revenue is eliminating unpaid dwell time. Rather than waiting until you unload to begin searching for your next load, DGW maps out consecutive backhauls in advance.
          </p>
        </div>

        {/* Multi-Leg Visual Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="p-5 rounded-2xl bg-logistics-950 border border-brand-emerald/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-brand-emerald font-bold">1. CURRENT LOAD</span>
              <span className="text-slate-400">Dallas → Atlanta</span>
            </div>
            <p className="text-xs font-bold text-white">In-Transit Outbound Freight</p>
            <p className="text-[11px] text-slate-400">Driver is rolling on active load. DGW handles tracking and updates.</p>
          </div>

          <div className="p-5 rounded-2xl bg-logistics-950 border border-brand-gold/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-brand-gold font-bold">2. NEXT LOAD</span>
              <span className="text-slate-400">Atlanta → Charlotte</span>
            </div>
            <p className="text-xs font-bold text-white">Pre-Booked Regional Backhaul</p>
            <p className="text-[11px] text-slate-400">Scheduled for pickup immediately after morning delivery unload.</p>
          </div>

          <div className="p-5 rounded-2xl bg-logistics-950 border border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-brand-cyan font-bold">3. FOLLOWING LOAD</span>
              <span className="text-slate-400">Charlotte → Dallas (Home)</span>
            </div>
            <p className="text-xs font-bold text-white">Return Home-Leg Pre-Sourced</p>
            <p className="text-[11px] text-slate-400">Returns driver back to home base on high-yielding return freight.</p>
          </div>
        </div>
      </section>

      {/* CDL Educational Section */}
      <section className="p-6 md:p-8 rounded-2xl bg-logistics-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-display font-bold text-white">Commercial Driver Licensing (CDL) Reference Guide</h3>
          <span className="text-xs font-mono text-brand-gold">EDUCATIONAL REFERENCE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-logistics-950 border border-slate-800 space-y-2">
            <span className="font-mono font-bold text-brand-cyan uppercase block text-xs">CDL CLASS A GUIDELINES</span>
            <p className="text-slate-300 leading-relaxed">
              Generally associated with operating combinations of commercial vehicles with a Gross Combination Weight Rating (GCWR) of 26,001 or more pounds, provided the Gross Vehicle Weight Rating (GVWR) of the vehicle(s) being towed is in excess of 10,000 pounds.
            </p>
            <p className="text-slate-400 font-mono text-[11px]">
              Typical Equipment: Dry Van (53ft), Reefer (53ft), Flatbed (48-53ft), Stepdeck, RGN, Power Only.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-logistics-950 border border-slate-800 space-y-2">
            <span className="font-mono font-bold text-brand-gold uppercase block text-xs">CDL CLASS B / NON-CDL GUIDELINES</span>
            <p className="text-slate-300 leading-relaxed">
              Generally associated with qualifying single vehicles with a GVWR of 26,001 or more pounds, or any such vehicle towing a vehicle not in excess of 10,000 pounds GVWR. Also covers non-CDL commercial vehicles operated under applicable weight limits.
            </p>
            <p className="text-slate-400 font-mono text-[11px]">
              Typical Equipment: Straight Box Trucks (10–28ft), Sprinters, Cargo Vans, Hotshot rigs (subject to combined GVWR).
            </p>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 italic">
          * Regulatory Note: CDL requirements vary according to vehicle configuration, trailer gross weight ratings, air brake setups, and applicable state regulations. Always verify requirements with the appropriate state DMV and FMCSA authorities.
        </p>
      </section>

      {/* Interactive Carrier Onboarding Checklist */}
      <section className="space-y-6">
        <CarrierChecklist />
      </section>

      {/* Carrier Onboarding Application Form */}
      <section className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-logistics-900 to-logistics-950 border border-brand-gold/40 shadow-glow-gold space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono font-bold text-brand-gold uppercase tracking-wider">Fast-Track Intake</span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Submit Your Carrier Onboarding Application
          </h2>
          <p className="text-xs text-slate-300">
            Fill out your equipment details and preferred running areas. A DGW dispatch specialist will review your packet and establish your digital carrier profile.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-logistics-950 border border-slate-800">
          <CarrierContactForm />
        </div>
      </section>

    </div>
  );
};
