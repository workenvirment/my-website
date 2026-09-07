import React, { useState } from 'react';
import { Truck, DollarSign, MapPin, Scale, Maximize2, RotateCcw, Check, Sparkles, AlertCircle } from 'lucide-react';
import { INITIAL_CARRIER_PROFILE } from '../../data/mockData';
import type { CarrierProfileState } from '../../types';

export const HandoffCard: React.FC = () => {
  const [profile, setProfile] = useState<CarrierProfileState>({ ...INITIAL_CARRIER_PROFILE });
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const equipmentOptions = [
    'Dry Van',
    'Reefer',
    'Flatbed',
    'Hotshot Flatbed',
    'Box Truck (26ft)',
    'Sprinter / Cargo Van',
    'Stepdeck',
    'Power Only',
  ];

  const handleReset = () => {
    setProfile({ ...INITIAL_CARRIER_PROFILE });
  };

  const handleSimulateSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl text-slate-900 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-brand-orange border border-orange-200 text-[10px] font-mono font-bold uppercase tracking-wider">
              Sales Person → Dispatcher Handoff
            </span>
            <span className="text-xs text-slate-500">Interactive Digital Carrier Profile</span>
          </div>
          <h3 className="text-xl font-display font-black text-slate-900 mt-1">Carrier Dispatch Intake Profile</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            When onboarding, sales aligns the carrier's operating constraints into this active dispatch profile. Try modifying the targets below:
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-medium rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors flex items-center gap-1.5"
            title="Reset to default example"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Interactive Form & Digital Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        
        {/* Controls Area (Form in clean light styling) */}
        <form onSubmit={handleSimulateSave} className="lg:col-span-7 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Equipment Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-brand-orange" />
                <span>Equipment Type</span>
              </label>
              <select
                value={profile.equipment}
                onChange={(e) => setProfile({ ...profile, equipment: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white"
              >
                {equipmentOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Trailer Length */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-cyan-600" />
                <span>Trailer Length</span>
              </label>
              <input
                type="text"
                value={profile.length}
                onChange={(e) => setProfile({ ...profile, length: e.target.value })}
                placeholder="e.g. 53 FT"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white"
              />
            </div>

            {/* Max Payload Weight */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-emerald-600" />
                <span>Max Payload Weight</span>
              </label>
              <input
                type="text"
                value={profile.weightCapacity}
                onChange={(e) => setProfile({ ...profile, weightCapacity: e.target.value })}
                placeholder="e.g. 45,000 LBS"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white"
              />
            </div>

            {/* Target Rate Per Mile (RPM) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-brand-orange" />
                <span>Target Minimum RPM</span>
              </label>
              <input
                type="text"
                value={profile.targetRpm}
                onChange={(e) => setProfile({ ...profile, targetRpm: e.target.value })}
                placeholder="e.g. $2.00+"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white"
              />
            </div>

            {/* Target Weekly Gross */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>Weekly Target Gross (Example)</span>
              </label>
              <input
                type="text"
                value={profile.weeklyGrossTarget}
                onChange={(e) => setProfile({ ...profile, weeklyGrossTarget: e.target.value })}
                placeholder="e.g. $8,500+"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white"
              />
            </div>

            {/* Operating Zip / Base */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                <span>Base ZIP / Hub</span>
              </label>
              <input
                type="text"
                value={profile.operatingZip}
                onChange={(e) => setProfile({ ...profile, operatingZip: e.target.value })}
                placeholder="e.g. 75201 Dallas TX"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white"
              />
            </div>
          </div>

          {/* Operational Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Carrier Operating Preferences & Special Notes</label>
            <input
              type="text"
              value={profile.notes}
              onChange={(e) => setProfile({ ...profile, notes: e.target.value })}
              placeholder="e.g. No touch freight, standard detention terms, home on weekends"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-500">
              Changes update the live dispatcher terminal card in real-time.
            </span>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-brand-orange to-brand-orange-hover text-white hover:from-brand-orange-hover hover:to-brand-orange transition-all shadow-glow-orange flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Update Dispatch Profile</span>
            </button>
          </div>

          {isSavedNotice && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Dispatcher carrier profile updated successfully for live load scanning.</span>
            </div>
          )}
        </form>

        {/* Output Digital Terminal Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm relative">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs font-bold text-slate-900 uppercase tracking-wider">ACTIVE CARRIER PROFILE</span>
              </div>
              <span className="font-mono text-[10px] text-brand-orange px-2 py-0.5 rounded bg-orange-100 border border-orange-200 font-bold">
                DISPATCH QUEUE
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-500 font-sans">EQUIPMENT:</span>
                <span className="font-bold text-slate-900">{profile.equipment.toUpperCase()}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-sans">LENGTH</span>
                  <span className="font-bold text-slate-900 text-xs">{profile.length}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-sans">MAX WEIGHT</span>
                  <span className="font-bold text-slate-900 text-xs">{profile.weightCapacity}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-sans">TARGET RPM</span>
                  <span className="font-bold text-brand-orange text-xs">{profile.targetRpm}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-sans">TARGET WEEKLY</span>
                  <span className="font-bold text-emerald-700 text-xs">{profile.weeklyGrossTarget}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-sans">BASE HUB</span>
                <span className="font-semibold text-slate-800 text-xs">{profile.operatingZip}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-sans">SPECIAL PREFERENCES</span>
                <span className="text-slate-700 text-[11px] block">{profile.notes || 'None specified'}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-500 flex items-start gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>Target RPM and revenue figures are operational benchmarks, not guarantees.</span>
          </div>

        </div>

      </div>
    </div>
  );
};
