import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const OwnerOpDashboardView: React.FC = () => {
  const { user } = useAuth();
  const [stagedStatus, setStagedStatus] = useState<'available' | 'in-transit' | 'off-duty'>('available');

  // Interactive RPM Deadhead Margin Calculator
  const [loadedMiles, setLoadedMiles] = useState(650);
  const [deadheadMiles, setDeadheadMiles] = useState(45);
  const [rateGross, setRateGross] = useState(1950);
  const [dieselPrice, setDieselPrice] = useState(3.65);
  const [truckMpg, setTruckMpg] = useState(11.5);

  const totalMiles = loadedMiles + deadheadMiles;
  const trueRpm = totalMiles > 0 ? (rateGross / totalMiles).toFixed(2) : '0.00';
  const fuelCost = totalMiles > 0 ? ((totalMiles / truckMpg) * dieselPrice).toFixed(2) : '0.00';
  const netEarnings = (+rateGross - +fuelCost).toFixed(2);

  return (
    <div className="space-y-8 text-white">
      
      {/* Header Overview */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/30 text-xs font-mono font-bold uppercase">
              OWNER OPERATOR HUB
            </span>
            <span className="text-xs text-slate-400 font-mono">1-Tractor Unit Power</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
            {user?.name || 'Travis Cole (Owner-Operator)'}
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            {user?.companyName || 'Lone Star Hotshot Express LLC'} • MC-1198302 • 40ft Hotshot Gooseneck (16.5k lbs)
          </p>
        </div>

        {/* Staged Availability Toggle */}
        <div className="p-3 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
          <span className="text-[10px] text-slate-400 font-mono uppercase block">CURRENT DRIVER DISPATCH STATUS</span>
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setStagedStatus('available')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                stagedStatus === 'available' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-900 text-slate-400'
              }`}
            >
              🟢 Staged & Ready
            </button>
            <button
              onClick={() => setStagedStatus('in-transit')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                stagedStatus === 'in-transit' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-slate-900 text-slate-400'
              }`}
            >
              🔵 In Transit
            </button>
            <button
              onClick={() => setStagedStatus('off-duty')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                stagedStatus === 'off-duty' ? 'bg-slate-700 text-white shadow-sm' : 'bg-slate-900 text-slate-400'
              }`}
            >
              ⚪ Rest Break
            </button>
          </div>
        </div>
      </div>

      {/* Target Revenue & Preferred Lanes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-3">
          <span className="text-xs font-mono uppercase text-brand-orange font-bold block">
            WEEKLY GROSS TARGET
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-black text-white">$6,840</span>
            <span className="text-xs font-mono text-slate-400">/ $8,500 Goal</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-gradient-to-r from-brand-orange to-amber-500" style={{ width: '80%' }} />
          </div>
          <p className="text-[11px] text-slate-400">80% of weekly goal achieved across 3 multi-leg runs.</p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-3">
          <span className="text-xs font-mono uppercase text-cyan-400 font-bold block">
            PREFERRED RUNNING LANES
          </span>
          <div className="flex flex-wrap gap-1.5">
            {['Texas Intrastate', 'TX ➔ OK ➔ AR', 'TX ➔ Atlanta GA', 'Gulf Coast Corridor'].map((lane) => (
              <span key={lane} className="px-2.5 py-1 rounded-xl bg-slate-950 border border-white/5 text-slate-300 font-mono text-xs">
                {lane}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-slate-400">Advance route planning automatically scans backhauls to Dallas/Houston.</p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-3">
          <span className="text-xs font-mono uppercase text-emerald-400 font-bold block">
            TRACTOR & TRAILER GEAR
          </span>
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            <div>UNIT: <strong className="text-white">2024 RAM 3500 High Output</strong></div>
            <div>TRAILER: <strong className="text-white">40ft Air-Ride Gooseneck</strong></div>
            <div>GEAR: <strong className="text-white">4 Lumber Tarps • 12 Chains/Binders</strong></div>
          </div>
        </div>

      </div>

      {/* Interactive Deadhead & RPM Margin Calculator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-white/10 space-y-6">
        <div className="flex items-center gap-2 text-brand-orange">
          <Calculator className="w-5 h-5" />
          <h3 className="text-lg font-bold text-white">Interactive Net Margin & True RPM Calculator</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          
          <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
            <label className="text-slate-400 block font-mono">Gross Rate ($)</label>
            <input
              type="number"
              value={rateGross}
              onChange={(e) => setRateGross(+e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white font-bold font-mono focus:outline-none focus:border-brand-orange"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
            <label className="text-slate-400 block font-mono">Loaded Miles</label>
            <input
              type="number"
              value={loadedMiles}
              onChange={(e) => setLoadedMiles(+e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white font-bold font-mono focus:outline-none focus:border-brand-orange"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
            <label className="text-slate-400 block font-mono">Deadhead Miles</label>
            <input
              type="number"
              value={deadheadMiles}
              onChange={(e) => setDeadheadMiles(+e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white font-bold font-mono focus:outline-none focus:border-brand-orange"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
            <label className="text-slate-400 block font-mono">Diesel ($/gal)</label>
            <input
              type="number"
              step="0.05"
              value={dieselPrice}
              onChange={(e) => setDieselPrice(+e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white font-bold font-mono focus:outline-none focus:border-brand-orange"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
            <label className="text-slate-400 block font-mono">Truck MPG</label>
            <input
              type="number"
              step="0.5"
              value={truckMpg}
              onChange={(e) => setTruckMpg(+e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white font-bold font-mono focus:outline-none focus:border-brand-orange"
            />
          </div>

        </div>

        {/* Calculator Output Matrix */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
          <div>
            <span className="text-[10px] text-slate-500 block">TOTAL TRIP MILES</span>
            <span className="text-lg font-bold text-white">{totalMiles} mi</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">TRUE RPM (INCL DEADHEAD)</span>
            <span className="text-lg font-bold text-brand-orange">${trueRpm}/mi</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">ESTIMATED FUEL BURN</span>
            <span className="text-lg font-bold text-red-400">-${fuelCost}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">ESTIMATED NET POCKET</span>
            <span className="text-lg font-bold text-emerald-400">${netEarnings}</span>
          </div>
        </div>
      </div>

    </div>
  );
};
