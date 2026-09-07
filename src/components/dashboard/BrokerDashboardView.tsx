import React, { useState } from 'react';
import { 
  Plus, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MC_DATABASE_RECORDS } from '../../data/mcDatabase';

export const BrokerDashboardView: React.FC = () => {
  const { user } = useAuth();
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postedLoads, setPostedLoads] = useState([
    {
      id: 'LD-88301',
      origin: 'Atlanta, GA',
      destination: 'Dallas, TX',
      equipment: '53 FT Dry Van',
      commodity: 'Beverage Cans (Palletized)',
      weightLbs: 42000,
      offeredRate: 2400,
      pickupDate: 'Tomorrow, 08:00 AM',
      bidsCount: 4,
      status: 'COVERING'
    },
    {
      id: 'LD-88302',
      origin: 'Savannah Port, GA',
      destination: 'Chicago, IL',
      equipment: '53 FT Reefer',
      commodity: 'Imported Frozen Seafood',
      weightLbs: 39500,
      offeredRate: 3100,
      pickupDate: 'Thursday, 06:00 AM',
      bidsCount: 6,
      status: 'COVERED'
    }
  ]);

  const [newOrigin, setNewOrigin] = useState('');
  const [newDest, setNewDest] = useState('');
  const [newEq, setNewEq] = useState('53 FT Dry Van');
  const [newRate, setNewRate] = useState(2500);

  const handlePostLoad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrigin || !newDest) return;

    const newEntry = {
      id: 'LD-' + Math.floor(10000 + Math.random() * 90000),
      origin: newOrigin,
      destination: newDest,
      equipment: newEq,
      commodity: 'General Palletized Freight',
      weightLbs: 38000,
      offeredRate: newRate,
      pickupDate: 'Next Day, 08:00 AM',
      bidsCount: 1,
      status: 'COVERING'
    };

    setPostedLoads([newEntry, ...postedLoads]);
    setNewOrigin('');
    setNewDest('');
    setPostModalOpen(false);
  };

  return (
    <div className="space-y-8 text-white">
      
      {/* Header Profile */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/30 text-xs font-mono font-bold uppercase">
              FREIGHT BROKERAGE OPERATIONS
            </span>
            <span className="text-xs text-cyan-400 font-mono flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>BMC-84 $75,000 Bond Verified</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
            {user?.companyName || 'Apex 3PL Global Logistics Inc'}
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            MC-894201 • DOT-3104928 • Atlanta HQ Terminal • Authorized Property Broker
          </p>
        </div>

        <button
          onClick={() => setPostModalOpen(true)}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover text-white font-bold text-xs shadow-glow-orange flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Post Spot Freight Tender</span>
        </button>
      </div>

      {/* Active Posted Tenders Board */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white">Active Outbound Freight Tenders ({postedLoads.length})</span>
          <span className="text-xs text-slate-400 font-mono">Real-time Carrier Bids Active</span>
        </div>

        <div className="space-y-3">
          {postedLoads.map((load) => (
            <div
              key={load.id}
              className="p-4 rounded-2xl bg-slate-950 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-brand-orange font-bold bg-brand-orange/10 px-2 py-0.5 rounded text-[10px]">
                    {load.id}
                  </span>
                  <span className="font-bold text-white">{load.commodity}</span>
                  <span className="text-slate-400 font-mono">({load.equipment})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="font-bold text-white">{load.origin}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-orange" />
                  <span className="font-bold text-white">{load.destination}</span>
                  <span className="text-slate-500">• {load.pickupDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-base font-display font-black text-emerald-400">${load.offeredRate.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 font-mono block">{load.bidsCount} Carrier Offers</span>
                </div>

                <span className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold ${
                  load.status === 'COVERED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-brand-orange/20 text-brand-orange border border-brand-orange/30'
                }`}>
                  {load.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified DGW Carriers for Instant Tender Booking */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white">Pre-Vetted Carrier Network Ready for Direct Tenders</span>
          <span className="text-xs text-slate-400 font-mono">COI $1M BIPD Verified on file</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MC_DATABASE_RECORDS.filter(c => c.companyType === 'Carrier' || c.companyType === 'Owner Operator').slice(0, 4).map((carrier) => (
            <div key={carrier.id} className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{carrier.legalName}</span>
                <span className="font-mono text-[10px] text-brand-orange font-bold">{carrier.mcNumber}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {carrier.address.city}, {carrier.address.state} • {carrier.powerUnits} Trucks • {carrier.safetyRating}
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-mono text-emerald-400">$1,000,000 BIPD Verified</span>
                <button
                  onClick={() => alert(`Direct tender invitation dispatched to ${carrier.legalName} (${carrier.contact.email}).`)}
                  className="px-3 py-1 rounded-lg bg-brand-orange/20 hover:bg-brand-orange text-brand-orange hover:text-white font-bold text-[11px] transition-colors"
                >
                  Direct Tender
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Load Modal */}
      {postModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-white/15 rounded-3xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Post New Freight Tender</h3>
              <button onClick={() => setPostModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handlePostLoad} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Origin City, State</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dallas, TX"
                  value={newOrigin}
                  onChange={(e) => setNewOrigin(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Destination City, State</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Atlanta, GA"
                  value={newDest}
                  onChange={(e) => setNewDest(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Equipment Type</label>
                <select
                  value={newEq}
                  onChange={(e) => setNewEq(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-brand-orange"
                >
                  <option value="53 FT Dry Van">53 FT Dry Van</option>
                  <option value="53 FT Reefer">53 FT Reefer</option>
                  <option value="48 FT Flatbed">48 FT Flatbed</option>
                  <option value="40 FT Hotshot">40 FT Hotshot</option>
                  <option value="Power Only">Power Only</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Target Rate ($)</label>
                <input
                  type="number"
                  required
                  value={newRate}
                  onChange={(e) => setNewRate(+e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-brand-orange"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold transition-all shadow-glow-orange"
              >
                Broadcast Tender to DGW Carriers
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
