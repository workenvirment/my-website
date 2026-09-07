import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const CarrierDashboardView: React.FC = () => {
  const { user } = useAuth();
  const [tenders, setTenders] = useState([
    {
      id: 'TND-8942',
      broker: 'Apex 3PL Global Inc',
      origin: 'Dallas, TX',
      destination: 'Atlanta, GA',
      equipment: '53 FT Dry Van',
      miles: 780,
      rate: 2350,
      rpm: 3.01,
      pickupDate: 'Tomorrow, 08:00 AM',
      status: 'PENDING'
    },
    {
      id: 'TND-9014',
      broker: 'C.H. Robinson Worldwide',
      origin: 'Houston, TX',
      destination: 'Memphis, TN',
      equipment: '53 FT Reefer',
      miles: 560,
      rate: 1780,
      rpm: 3.17,
      pickupDate: 'Thursday, 10:00 AM',
      status: 'PENDING'
    }
  ]);

  const handleAcceptTender = (id: string) => {
    setTenders(tenders.map(t => t.id === id ? { ...t, status: 'ACCEPTED' } : t));
  };

  const handleDeclineTender = (id: string) => {
    setTenders(tenders.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-8 text-white">
      
      {/* Header Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/30 text-xs font-mono font-bold uppercase">
              CARRIER FLEET COMMAND
            </span>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>FMCSA Authorized Active</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
            {user?.companyName || 'Vance Freight Logistics LLC'}
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            MC-984210 • DOT-3891024 • Dallas Terminal HQ • 14 Power Units
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 text-right">
            <span className="text-[10px] text-slate-400 font-mono uppercase block">WEEKLY FLEET GROSS</span>
            <span className="text-2xl font-display font-black text-emerald-400">$38,450</span>
          </div>
        </div>
      </div>

      {/* Compliance & Packet Status Bar */}
      <div className="p-5 rounded-3xl bg-slate-900 border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block">COI AUTO LIABILITY</span>
            <span className="font-bold text-white">$1,000,000 Verified</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block">CARGO INSURANCE</span>
            <span className="font-bold text-white">$250,000 Active</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block">W-9 & EIN</span>
            <span className="font-bold text-white">42-4868007 Active</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block">FACTORING NOA</span>
            <span className="font-bold text-white">QuickPay Ready</span>
          </div>
        </div>
      </div>

      {/* Spot Tenders Pending Approval */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">Broker Spot Tenders Ready for Review</span>
            <span className="px-2 py-0.5 rounded-full bg-brand-orange text-white text-[10px] font-mono font-bold">
              {tenders.filter(t => t.status === 'PENDING').length} NEW
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">100% Final Carrier Authorization Guaranteed</span>
        </div>

        <div className="space-y-3">
          {tenders.map((tender) => (
            <div
              key={tender.id}
              className="p-4 rounded-2xl bg-slate-950 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-brand-orange font-bold bg-brand-orange/10 px-2 py-0.5 rounded">
                    {tender.id}
                  </span>
                  <span className="font-bold text-white">{tender.broker}</span>
                  <span className="text-slate-400 font-mono">• {tender.equipment}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="font-bold text-white">{tender.origin}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-orange" />
                  <span className="font-bold text-white">{tender.destination}</span>
                  <span className="text-slate-500">({tender.miles} miles • {tender.pickupDate})</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-base font-display font-black text-emerald-400">${tender.rate.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 font-mono block">(${tender.rpm}/mi)</span>
                </div>

                {tender.status === 'ACCEPTED' ? (
                  <span className="px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-bold font-mono">
                    ACCEPTED & SIGNED
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAcceptTender(tender.id)}
                      className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold transition-all shadow-glow-orange"
                    >
                      Accept Rate Con
                    </button>
                    <button
                      onClick={() => handleDeclineTender(tender.id)}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
