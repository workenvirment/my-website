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
          Company Identity & Integrity
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-slate-950 tracking-tight">
          About DGW SOLUTIONS LLC
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          <strong className="text-slate-950">Dispatchers Global World (DGW)</strong> is a professional truck dispatching and transportation management company founded by <strong className="text-amber-800">Saad Altaf</strong>, delivering dedicated back-office coordination for independent motor carriers across all 48 contiguous US states.
        </p>
      </div>

      {/* Official Corporate Filing Verification Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-950">Official Federal Corporate Registration</h2>
              <p className="text-xs text-slate-500 font-mono">Department of the Treasury • Internal Revenue Service (IRS Notice CP575G)</p>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-mono font-bold">
            VERIFIED ACTIVE BUSINESS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase block">LEGAL ENTITY</span>
            <span className="font-bold text-slate-950 text-sm block">DGW SOLUTIONS LLC</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase block">FOUNDER / SOLE MEMBER</span>
            <span className="font-bold text-slate-950 text-sm block">SAAD ALTAF</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase block">HEADQUARTERS ADDRESS</span>
            <span className="font-bold text-slate-800 text-xs block">9057 E 50th Ave Ste 22C, Denver, CO 80238</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase block">FEDERAL TAX ID (EIN)</span>
            <span className="font-bold text-amber-700 text-sm block">42-4868007</span>
          </div>
        </div>
      </div>

      {/* Mission & Founding Story */}
      <section className="p-8 md:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 text-slate-700">
        <div className="flex items-center gap-2 text-amber-700">
          <Target className="w-5 h-5" />
          <span className="font-mono text-xs font-bold uppercase">Our Company Mission</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-950">
          Built Specifically for Independent Motor Carriers & Fleet Owners
        </h2>

        <p className="text-sm leading-relaxed text-slate-600">
          Driving an 80,000 lb commercial rig for 11 hours every day is demanding enough. Independent owner-operators should not have to spend their rest breaks calling brokers who lowball them, filling out 10-page carrier packets, and worrying about whether their invoices will get paid on time.
        </p>

        <p className="text-sm leading-relaxed text-slate-600">
          DGW Solutions LLC was founded by Saad Altaf in Denver, Colorado to give truckers a dedicated, professional back-office partner. We handle the phone negotiations, paperwork, route guidance, and broker check-calls behind the scenes so drivers can stay focused on safety and making top revenue.
        </p>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-display font-black text-amber-700 text-2xl">100%</span>
            <span className="font-bold text-slate-900 text-sm block">Carrier Independence</span>
            <p className="text-xs text-slate-600">You retain total ownership of your authority and equipment.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-display font-black text-blue-700 text-2xl">Zero</span>
            <span className="font-bold text-slate-900 text-sm block">Forced Dispatch</span>
            <p className="text-xs text-slate-600">You have final approval on every rate confirmation before booking.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-display font-black text-emerald-700 text-2xl">48 States</span>
            <span className="font-bold text-slate-900 text-sm block">Nationwide Coverage</span>
            <p className="text-xs text-slate-600">Active freight corridors across the entire United States.</p>
          </div>
        </div>
      </section>

      {/* 4 Guarantees of Service */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono font-bold text-amber-700 uppercase">Operational Standard</span>
          <h2 className="text-2xl font-display font-black text-slate-950 mt-0.5">
            The 4 Promises We Make To Every Driver
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: '1. Complete Rate Transparency',
              desc: 'We present the exact, original broker Rate Confirmation to you. DGW never hides broker deductions or takes undisclosed cuts. You know exactly what the broker pays on every load.'
            },
            {
              title: '2. Advance Load Planning ("We Look Ahead")',
              desc: 'While you are en route on Leg 1, our dispatch team is already searching and negotiating your next backhaul so your wheels keep turning with zero unpaid deadhead.'
            },
            {
              title: '3. Fast Broker Packet Setup (Under 5 Mins)',
              desc: 'When high-paying loads appear on load boards, minutes matter. We maintain your updated Certificate of Insurance (COI), W-9, and MC Authority to complete broker onboarding packets in under 5 minutes.'
            },
            {
              title: '4. Dedicated Personal Dispatcher',
              desc: 'You won’t be routed to an anonymous call center. You work directly with a dedicated dispatcher who knows your truck, preferred lanes, and weekly revenue targets by heart.'
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

      {/* Contact & Dispatch Desk Info */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">Denver Operations Desk</span>
            <h3 className="text-2xl font-display font-black text-white mt-0.5">
              Connect Directly With Our Team
            </h3>
          </div>
          <DgwButton
            variant="accent"
            size="md"
            icon={<ArrowRight className="w-4 h-4 text-slate-950" />}
            onClick={() => onNavigate('/contact')}
          >
            Fill Setup Application
          </DgwButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <Phone className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px]">PHONE</span>
              <a href="tel:+18003495623" className="font-bold text-white hover:text-amber-400">
                +1 (800) DGW-LOAD
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <Mail className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px]">EMAIL</span>
              <a href="mailto:dispatch.ops@dgwsolutions.com" className="font-bold text-white hover:text-amber-400">
                dispatch.ops@dgwsolutions.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px]">OFFICE</span>
              <span className="font-bold text-white">Denver, CO 80238</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
