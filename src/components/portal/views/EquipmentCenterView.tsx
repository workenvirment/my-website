import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Link
} from 'lucide-react';
import { EQUIPMENT_LIST } from '../../../data/equipmentData';

export const EquipmentCenterView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'power-only'>('all');
  const [selectedEquipId, setSelectedEquipId] = useState<string>('eq-dry-van');

  const selectedSpec = EQUIPMENT_LIST.find((e) => e.id === selectedEquipId) || EQUIPMENT_LIST[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
              Fleet Equipment & Capacity Center
            </h1>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-orange-100 text-brand-orange border border-orange-200 font-bold">
              10 COMMERCIAL CATEGORIES
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Technical specs, securement checklists, target RPM benchmarks, and dedicated Power Only interchange protocols
          </p>
        </div>

        <div className="flex items-center p-1 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-semibold">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'all' ? 'bg-brand-orange text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All 10 Categories
          </button>
          <button
            onClick={() => setActiveTab('power-only')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'power-only' ? 'bg-brand-orange text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Power Only Module
          </button>
        </div>
      </div>

      {/* Main View: All Equipment vs Power Only */}
      {activeTab === 'all' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Col (4): Equipment Category Selector List */}
          <div className="lg:col-span-4 p-4 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 px-2 block">
              Commercial Fleet Library
            </span>

            <div className="space-y-1 max-h-[600px] overflow-y-auto">
              {EQUIPMENT_LIST.map((equip) => {
                const isSelected = selectedEquipId === equip.id;

                return (
                  <button
                    key={equip.id}
                    onClick={() => setSelectedEquipId(equip.id)}
                    className={`w-full p-3 rounded-2xl text-left transition-all flex items-center justify-between border ${
                      isSelected
                        ? 'bg-orange-50/70 border-brand-orange text-slate-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <span className="font-bold text-xs text-slate-900 block">{equip.name}</span>
                      <span className="text-[10px] font-mono text-slate-500">{equip.length} • {equip.weightRange}</span>
                    </div>

                    <span className="text-[10px] font-mono font-bold text-brand-orange">
                      ~${equip.exampleRpm}/mi
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Col (8): Detailed Equipment Spec Card */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-slate-900">
            
            {/* Header Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono text-brand-orange uppercase font-bold bg-orange-50 px-2.5 py-0.5 rounded border border-orange-200">
                  {selectedSpec.cdlClass}
                </span>
                <h2 className="text-2xl font-display font-black text-slate-900 mt-1">{selectedSpec.name}</h2>
                <p className="text-xs text-slate-500 font-medium">{selectedSpec.tagline}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">Target RPM Range</span>
                <span className="text-xl font-mono font-black text-brand-orange">${selectedSpec.exampleRpm}</span>
                <span className="text-[10px] text-slate-500 block font-mono">Gross: ~${selectedSpec.exampleWeeklyGross}/wk</span>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
              {selectedSpec.description}
            </div>

            {/* Metrics Dials */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">Length</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{selectedSpec.length}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">Payload Range</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{selectedSpec.weightRange}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">CDL Class</span>
                <span className="font-bold text-cyan-800 mt-0.5 block">{selectedSpec.cdlClass}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">Load Type</span>
                <span className="font-bold text-emerald-700 mt-0.5 block">Spot / Contract</span>
              </div>
            </div>

            {/* Required Gear & Typical Cargo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-mono text-[10px] font-bold text-slate-500 uppercase block">Required Gear & Tools</span>
                <ul className="space-y-1.5">
                  {selectedSpec.requiredGear.map((gear, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                      <span>{gear}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-mono text-[10px] font-bold text-slate-500 uppercase block">Typical Commercial Commodities</span>
                <ul className="space-y-1.5">
                  {selectedSpec.typicalLoads.map((load, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <span className="text-brand-orange font-bold">•</span>
                      <span>{load}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Earnings Disclaimer */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-[10px] text-slate-500 font-mono flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
              <span>
                * All RPM and gross figures are illustrative target ranges. Rates vary by market demand, freight weight, and broker negotiation.
              </span>
            </div>

          </div>

        </div>
      )}

      {/* Dedicated Power Only Module */}
      {activeTab === 'power-only' && (
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 text-slate-900">
            <div className="flex items-center gap-2 text-brand-orange">
              <Link className="w-5 h-5" />
              <h2 className="text-xl font-display font-black text-slate-900">
                Power Only (Tractor-Only) Operations & Dispatch
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Power Only dispatching involves connecting an authorized motor carrier's tractor with a shipper's or broker's pre-loaded trailer or chassis. Power Only tractors do not own the trailer, operating via Trailer Interchange Agreements.
            </p>

            {/* 4 Primary Power Only Movements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-mono font-bold text-brand-orange text-xs">01. Hook & Drop</span>
                <p className="text-slate-700 leading-relaxed">Drop an empty trailer at a distribution center and hook to a pre-loaded outbound 53ft trailer.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-mono font-bold text-cyan-800 text-xs">02. Trailer Interchange</span>
                <p className="text-slate-700 leading-relaxed">Interchanging 53ft dry vans, reefers, or intermodal chassis between logistics partner fleets.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-mono font-bold text-emerald-700 text-xs">03. Towaway Relocation</span>
                <p className="text-slate-700 leading-relaxed">Relocating newly manufactured trailers, specialized generator chassis, or mobile medical units.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-mono font-bold text-purple-700 text-xs">04. Loadout Trailers</span>
                <p className="text-slate-700 leading-relaxed">Carrying freight inside a trailer being delivered to its new buyer within 3 to 10 days.</p>
              </div>
            </div>

            {/* Mandatory Compliance Notice */}
            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-xs text-orange-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-brand-orange">
                <ShieldCheck className="w-4 h-4" />
                <span>Trailer Interchange Compliance & Insurance Notice</span>
              </div>
              <p className="leading-relaxed">
                Trailer interchange requirements and required insurance/value (e.g. $25,000 to $50,000+ trailer interchange coverage) may vary by load, broker, trailer owner, and agreement. Motor carriers must review the specific Trailer Interchange Agreement (TIA) executed for each move.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
