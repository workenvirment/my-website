import React from 'react';
import { 
  ShieldCheck, 
  Target, 
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { DgwButton } from '../components/common/DgwButton';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-mono font-bold uppercase shadow-xs">
          Company Overview
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-slate-950 tracking-tight">
          About DGW Solutions LLC
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          <strong className="text-slate-950">Dispatching Global World</strong> is the dispatching division of <strong className="text-slate-950">DGW Solutions LLC</strong>, providing professional dispatch support for carriers and owner-operators. Our team assists with freight coordination, broker communication, load management, and day-to-day dispatching requirements.
        </p>
      </div>

      {/* Official Corporate Entity Information Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-950">Commercial Logistics Operation</h2>
              <p className="text-xs text-slate-500 font-mono">Professional Truck Dispatching & Freight Coordination Services</p>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-mono font-bold">
            DEDICATED DISPATCH DIVISION
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase block">COMPANY NAME</span>
            <span className="font-bold text-slate-950 text-sm block">DGW SOLUTIONS LLC</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase block">DISPATCHING DIVISION</span>
            <span className="font-bold text-slate-950 text-sm block">DISPATCHING GLOBAL WORLD</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase block">OWNER</span>
            <span className="font-bold text-amber-700 text-sm block">SAAD ALTAF</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase block">OPERATIONAL SCOPE</span>
            <span className="font-bold text-slate-800 text-xs block">Interstate Carrier Support</span>
          </div>
        </div>
      </div>

      {/* Mission & Operational Focus */}
      <section className="p-8 md:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 text-slate-700">
        <div className="flex items-center gap-2 text-amber-700">
          <Target className="w-5 h-5" />
          <span className="font-mono text-xs font-bold uppercase">Our Operational Focus</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-950">
          Professional Dispatching Services Designed For Carriers
        </h2>

        <p className="text-sm leading-relaxed text-slate-600">
          Independent carriers and owner-operators need organized, dependable back-office support. Managing daily broker communications, negotiating freight details, auditing rate confirmations, and handling logistics paperwork requires structured coordination so drivers can stay focused on the road.
        </p>

        <p className="text-sm leading-relaxed text-slate-600">
          Dispatching Global World — DGW Solutions LLC, founded and led by Saad Altaf, delivers dedicated dispatch support for motor carriers across regional and interstate freight corridors. We provide transparent rate negotiation, streamlined broker packets, proactive tracking coordination, and immediate document turnaround.
        </p>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-display font-black text-amber-700 text-2xl">100%</span>
            <span className="font-bold text-slate-900 text-sm block">Carrier Independence</span>
            <p className="text-xs text-slate-600">You retain complete authority over your operating decisions and equipment.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-display font-black text-blue-700 text-2xl">Full</span>
            <span className="font-bold text-slate-900 text-sm block">Rate Transparency</span>
            <p className="text-xs text-slate-600">You review the original broker Rate Confirmation with complete terms before booking.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-display font-black text-emerald-700 text-2xl">Proactive</span>
            <span className="font-bold text-slate-900 text-sm block">Freight Coordination</span>
            <p className="text-xs text-slate-600">Structured freight planning designed to support your operational schedule.</p>
          </div>
        </div>
      </section>

      {/* Operational Principles */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono font-bold text-amber-700 uppercase">Operational Principles</span>
          <h2 className="text-2xl font-display font-black text-slate-950 mt-0.5">
            Core Standards of Our Dispatching Operation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: '1. Complete Linehaul Transparency',
              desc: 'We present the original broker Rate Confirmation directly to you. DGW Solutions LLC operates with total rate transparency so you always know the exact terms negotiated with the broker.'
            },
            {
              title: '2. Proactive Load Planning',
              desc: 'Our dispatching team plans ahead for your subsequent backhaul loads, minimizing unpaid dwell time and keeping your equipment scheduled efficiently.'
            },
            {
              title: '3. Responsive Broker Packet Administration',
              desc: 'We maintain your carrier documentation (Certificate of Insurance, W-9, and MC Authority) to process broker onboarding packets quickly and accurately.'
            },
            {
              title: '4. Dedicated Dispatch Communication',
              desc: 'Work directly with dedicated dispatch personnel who understand your equipment specifications, preferred operating lanes, and scheduling requirements.'
            }
          ].map((pillar, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-2">
              <h3 className="text-base font-display font-bold text-amber-800">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Operations Desk Info */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">Dispatching Division</span>
            <h3 className="text-2xl font-display font-black text-white mt-0.5">
              Connect With Our Dispatching Team
            </h3>
          </div>
          <DgwButton
            variant="accent"
            size="md"
            icon={<ArrowRight className="w-4 h-4 text-slate-950" />}
            onClick={() => onNavigate('/contact')}
          >
            Contact Dispatching Team
          </DgwButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px]">WHATSAPP</span>
              <a 
                href="https://wa.me/923418341278?text=Hello,%20I%20would%20like%20to%20learn%20more%20about%20your%20truck%20dispatching%20services." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-bold text-white hover:text-amber-400"
              >
                +92 341 8341278
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <Mail className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px]">EMAIL</span>
              <a 
                href="mailto:dispachingglobal@dgwsolutionllc.com" 
                className="font-bold text-white hover:text-amber-400 break-all"
              >
                dispachingglobal@dgwsolutionllc.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px]">LEADERSHIP</span>
              <span className="font-bold text-white">Saad Altaf — Owner</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
