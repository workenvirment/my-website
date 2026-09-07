import React, { useState } from 'react';

export const InteractiveAnalytics: React.FC = () => {
  const [selectedEq, setSelectedEq] = useState<'all' | 'dry-van' | 'reefer' | 'flatbed'>('all');

  const rpmData = [
    { month: 'Apr', dryVan: 2.54, reefer: 2.88, flatbed: 2.72 },
    { month: 'May', dryVan: 2.62, reefer: 2.94, flatbed: 2.80 },
    { month: 'Jun', dryVan: 2.70, reefer: 3.10, flatbed: 2.85 },
    { month: 'Jul', dryVan: 2.68, reefer: 3.05, flatbed: 2.88 },
    { month: 'Aug', dryVan: 2.76, reefer: 3.18, flatbed: 2.92 },
    { month: 'Sep', dryVan: 2.84, reefer: 3.24, flatbed: 2.98 },
  ];

  const regionalVolumes = [
    { region: 'Southeast (GA/FL/NC)', volume: 38, avgRpm: '$3.12/mi' },
    { region: 'Texas / South Central', volume: 32, avgRpm: '$2.88/mi' },
    { region: 'Midwest (IL/IN/OH)', volume: 28, avgRpm: '$2.95/mi' },
    { region: 'Rocky Mtn / West (CO/UT)', volume: 18, avgRpm: '$3.35/mi' },
    { region: 'Pacific Northwest', volume: 14, avgRpm: '$2.70/mi' },
  ];

  return (
    <div className="w-full space-y-6 text-white">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/30 text-[10px] font-mono font-bold uppercase">
              Freight Market Intelligence
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white mt-1">
            Spot Market RPM & Regional Freight Analytics
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Historical Rate per Mile (RPM) analysis, regional lane density, and equipment yield forecasting.
          </p>
        </div>

        {/* Equipment Selector */}
        <div className="flex rounded-xl bg-slate-950 p-1 border border-white/10 text-xs font-bold font-mono">
          <button
            onClick={() => setSelectedEq('all')}
            className={`px-3 py-1.5 rounded-lg ${selectedEq === 'all' ? 'bg-brand-orange text-white' : 'text-slate-400'}`}
          >
            All Equipment
          </button>
          <button
            onClick={() => setSelectedEq('dry-van')}
            className={`px-3 py-1.5 rounded-lg ${selectedEq === 'dry-van' ? 'bg-brand-orange text-white' : 'text-slate-400'}`}
          >
            Dry Van
          </button>
          <button
            onClick={() => setSelectedEq('reefer')}
            className={`px-3 py-1.5 rounded-lg ${selectedEq === 'reefer' ? 'bg-brand-orange text-white' : 'text-slate-400'}`}
          >
            Reefer
          </button>
          <button
            onClick={() => setSelectedEq('flatbed')}
            className={`px-3 py-1.5 rounded-lg ${selectedEq === 'flatbed' ? 'bg-brand-orange text-white' : 'text-slate-400'}`}
          >
            Flatbed
          </button>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* RPM Historical Trend Bar Chart */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-white">6-Month Rate Per Mile ($/mi) Index</span>
            <span className="text-xs text-emerald-400 font-mono font-bold">+11.8% YTD Growth</span>
          </div>

          {/* Simulated Visual Chart */}
          <div className="h-48 flex items-end justify-between gap-4 pt-4 px-2 border-b border-white/10">
            {rpmData.map((d) => {
              const val = selectedEq === 'reefer' ? d.reefer : selectedEq === 'flatbed' ? d.flatbed : d.dryVan;
              const heightPercent = ((val - 2.0) / (3.5 - 2.0)) * 100;

              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono text-brand-orange font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    ${val}
                  </span>
                  <div className="w-full bg-slate-950 h-36 rounded-xl flex items-end p-1 border border-white/5">
                    <div 
                      className="w-full rounded-lg bg-gradient-to-t from-brand-orange to-amber-400 transition-all duration-500 group-hover:brightness-125"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{d.month}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Low: $2.54/mi</span>
            <span>Current Avg: <strong className="text-emerald-400 font-bold">$2.84/mi</strong></span>
            <span>Peak: $3.24/mi</span>
          </div>
        </div>

        {/* Regional Freight Density Breakdown */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-white">Regional Spot Volume & RPM Breakdown</span>
            <span className="text-xs text-slate-400 font-mono">Real-time Tender Density</span>
          </div>

          <div className="space-y-3 pt-2">
            {regionalVolumes.map((reg) => (
              <div key={reg.region} className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{reg.region}</span>
                  <span className="font-mono text-brand-orange font-bold">{reg.avgRpm}</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-brand-orange to-amber-400 rounded-full"
                    style={{ width: `${reg.volume * 2.2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
