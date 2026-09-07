import React, { useState } from 'react';
import { 
  MapPin
} from 'lucide-react';
import { LiveFreightMap } from '../LiveFreightMap';

export const RoutePlannerView: React.FC = () => {
  const [origin, setOrigin] = useState('Dallas, TX');
  const [destination, setDestination] = useState('Atlanta, GA');
  const [equipment, setEquipment] = useState('53ft Dry Van');
  const [targetRpm, setTargetRpm] = useState('2.35');
  const [maxDeadhead, setMaxDeadhead] = useState('50');

  // Computed illustrative metrics
  const totalMiles = 781;
  const driveHours = '12h 45m';
  const estFuelGallons = Math.round(totalMiles / 6.5);
  const estFuelCost = Math.round(estFuelGallons * 3.85);
  const targetPayout = Math.round(totalMiles * parseFloat(targetRpm || '2.35'));

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
              Route Planner & Backhaul Optimizer
            </h1>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-200 font-bold">
              TELEMATICS MAPPING
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Calculate drive times, fuel burn, deadhead constraints, and continuous multi-leg backhaul connections
          </p>
        </div>
      </div>

      {/* Inputs & Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Form Controls */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
            Corridor Route Parameters
          </span>

          <div className="space-y-3">
            <div>
              <label className="text-slate-700 font-semibold block mb-1">Origin City / Hub</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-brand-orange absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-700 font-semibold block mb-1">Destination City / Drop</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-cyan-700 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Equipment</label>
                <select
                  value={equipment}
                  onChange={(e) => setEquipment(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange"
                >
                  <option value="53ft Dry Van">53ft Dry Van</option>
                  <option value="53ft Reefer">53ft Reefer</option>
                  <option value="Flatbed">48/53ft Flatbed</option>
                  <option value="Power Only">Power Only</option>
                  <option value="Box Truck">26ft Box Truck</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Target Minimum RPM</label>
                <input
                  type="text"
                  value={targetRpm}
                  onChange={(e) => setTargetRpm(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-700 font-semibold block mb-1">Max Deadhead Tolerance ({maxDeadhead} mi)</label>
              <input
                type="range"
                min="0"
                max="150"
                value={maxDeadhead}
                onChange={(e) => setMaxDeadhead(e.target.value)}
                className="w-full accent-brand-orange cursor-pointer"
              />
            </div>
          </div>

          {/* Calculated Output Summary Cards */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 pt-3">
            <span className="font-mono text-[10px] font-bold text-slate-500 uppercase block">Route Benchmark Estimates</span>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] text-slate-400 font-sans block">TOTAL MILES</span>
                <span className="font-bold text-slate-900">{totalMiles} mi</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] text-slate-400 font-sans block">EST. DRIVE TIME</span>
                <span className="font-bold text-cyan-800">{driveHours}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] text-slate-400 font-sans block">EST. FUEL BURN</span>
                <span className="font-bold text-slate-800">~${estFuelCost}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] text-slate-400 font-sans block">TARGET GROSS</span>
                <span className="font-bold text-brand-orange">${targetPayout.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Interactive Map Visualization */}
        <div className="lg:col-span-7 space-y-4">
          <LiveFreightMap heightClass="h-[480px]" />
        </div>

      </div>

    </div>
  );
};
