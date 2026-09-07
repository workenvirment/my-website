import React, { useState } from 'react';
import { Search, AlertCircle, Eye } from 'lucide-react';
import { MOCK_SAMPLE_LOADS } from '../../data/mockData';
import type { MockLoad } from '../../types';

export const MockLoadBoard: React.FC = () => {
  const [equipmentFilter, setEquipmentFilter] = useState<string>('all');
  const [searchCity, setSearchCity] = useState<string>('');
  const [selectedLoad, setSelectedLoad] = useState<MockLoad | null>(null);

  const equipmentOptions = [
    { value: 'all', label: 'All Equipment' },
    { value: 'Dry Van', label: 'Dry Van' },
    { value: 'Reefer', label: 'Reefer' },
    { value: 'Flatbed', label: 'Flatbed' },
    { value: 'Hotshot', label: 'Hotshot' },
    { value: 'Box Truck', label: 'Box Truck' },
    { value: 'Power Only', label: 'Power Only' },
  ];

  const filteredLoads = MOCK_SAMPLE_LOADS.filter((load) => {
    const matchesEquipment = 
      equipmentFilter === 'all' || 
      load.equipment.toLowerCase().includes(equipmentFilter.toLowerCase());

    const matchesSearch = 
      searchCity === '' ||
      load.origin.city.toLowerCase().includes(searchCity.toLowerCase()) ||
      load.origin.state.toLowerCase().includes(searchCity.toLowerCase()) ||
      load.destination.city.toLowerCase().includes(searchCity.toLowerCase()) ||
      load.destination.state.toLowerCase().includes(searchCity.toLowerCase());

    return matchesEquipment && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl text-slate-900 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-brand-orange border border-orange-200 text-[10px] font-mono font-bold uppercase tracking-wider">
              Spot Market Telematics Simulator
            </span>
            <span className="text-xs text-brand-orange font-mono font-bold">SAMPLE DATA ONLY</span>
          </div>
          <h3 className="text-xl font-display font-black text-slate-900 mt-1">DAT-Style Live Freight Sourcing Simulation</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            How DGW dispatchers scan, filter, and qualify spot market loads for carriers before booking.
          </p>
        </div>

        {/* Prominent Sample Label */}
        <div className="bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-xl text-brand-orange text-xs font-mono font-bold">
          DEMO / SAMPLE DISPATCH BOARD
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Search Bar */}
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Search origin or destination city/state (e.g. Dallas, Atlanta, Chicago)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-orange focus:bg-white"
          />
        </div>

        {/* Equipment Filter */}
        <div className="sm:col-span-4">
          <select
            value={equipmentFilter}
            onChange={(e) => setEquipmentFilter(e.target.value)}
            className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white"
          >
            {equipmentOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Loads Table / Cards in Light Theme */}
      <div className="space-y-3">
        {filteredLoads.map((load) => (
          <div
            key={load.id}
            className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-orange/50 hover:bg-white transition-all duration-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs"
          >
            {/* Origin & Destination */}
            <div className="space-y-1 sm:min-w-[280px]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-brand-orange">{load.loadNumber}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-cyan-800 border border-slate-200 font-semibold">
                  {load.equipment}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <span>{load.origin.city}, {load.origin.state}</span>
                <span className="text-brand-orange">→</span>
                <span>{load.destination.city}, {load.destination.state}</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                {load.commodity} • {load.weightLbs.toLocaleString()} lbs
              </p>
            </div>

            {/* Distance, Timing & Rates */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-6 font-mono text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-sans">Distance</span>
                <span className="text-slate-800 font-bold">{load.distanceMiles} mi</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-sans">Sample Rate</span>
                <span className="text-emerald-700 font-bold text-sm">${load.sampleRate.toLocaleString()}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-sans">Sample RPM</span>
                <span className="text-brand-orange font-bold text-sm">${load.sampleRpm.toFixed(2)}/mi</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-sans">Pickup / Drop</span>
                <span className="text-slate-700 text-[11px] block">{load.pickupDate}</span>
              </div>
            </div>

            {/* Action */}
            <div className="flex items-center justify-end gap-2 shrink-0">
              <button
                onClick={() => setSelectedLoad(load)}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-sm transition-colors flex items-center gap-1.5 font-bold"
              >
                <Eye className="w-3.5 h-3.5 text-brand-orange" />
                <span>Inspect Load</span>
              </button>
            </div>
          </div>
        ))}

        {filteredLoads.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-xs">
            No sample loads match your current filters. Try resetting the search or equipment dropdown.
          </div>
        )}
      </div>

      {/* Selected Load Details Modal / Flyout */}
      {selectedLoad && (
        <div className="p-5 rounded-2xl bg-orange-50/60 border border-brand-orange/40 shadow-sm space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-orange-200 pb-2">
            <span className="text-xs font-mono font-bold text-brand-orange">
              INSPECTING SAMPLE RECORD: {selectedLoad.loadNumber}
            </span>
            <button
              onClick={() => setSelectedLoad(null)}
              className="text-xs text-slate-500 hover:text-slate-800 font-bold"
            >
              Close Details ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Lane Route</span>
              <span className="font-bold text-slate-900">
                {selectedLoad.origin.city}, {selectedLoad.origin.state} ({selectedLoad.origin.zip}) → {selectedLoad.destination.city}, {selectedLoad.destination.state} ({selectedLoad.destination.zip})
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Broker Verification</span>
              <span className="font-bold text-cyan-800">{selectedLoad.brokerSampleName}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Vetted for credit & $75k Surety Bond</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Compensation Breakdown</span>
              <span className="font-bold text-emerald-700 text-sm">${selectedLoad.sampleRate} Total</span>
              <span className="text-[10px] text-brand-orange block font-mono font-bold">~${selectedLoad.sampleRpm}/mi • {selectedLoad.distanceMiles} miles</span>
            </div>
          </div>
        </div>
      )}

      {/* Prominent Legal Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
        <span>
          <strong>Simulated Spot Market Notice:</strong> All freight loads shown above are mock educational illustrations demonstrating DGW’s data screening protocol. They do not constitute live broker tenders or legally binding load offerings.
        </span>
      </div>

    </div>
  );
};
