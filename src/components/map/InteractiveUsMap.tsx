import React, { useState } from 'react';
import { Navigation, Truck, ShieldCheck, AlertCircle } from 'lucide-react';
import { SAMPLE_CORRIDORS } from '../../data/mockData';

export const InteractiveUsMap: React.FC = () => {
  const [selectedCorridorId, setSelectedCorridorId] = useState<string>('corridor-tx-ga');

  const activeCorridor = SAMPLE_CORRIDORS.find((c) => c.id === selectedCorridorId) || SAMPLE_CORRIDORS[0];

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-logistics-900 border border-slate-700/80 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-brand-gold/15 text-brand-gold border border-brand-gold/30 text-[10px] font-mono font-bold uppercase tracking-wider">
              Freight Telematics & Corridor Mapping
            </span>
            <span className="text-xs text-slate-400">Illustrative Interstate Lanes</span>
          </div>
          <h3 className="text-lg font-display font-extrabold text-white mt-1">Interstate Route Intelligence</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Select a high-volume freight corridor below to inspect sample lane analytics, equipment requirements, and transit estimates.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-logistics-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-brand-cyan">
          <Navigation className="w-3.5 h-3.5 animate-spin" />
          <span>Live GPS Simulation</span>
        </div>
      </div>

      {/* Corridor Selector Pills */}
      <div className="flex flex-wrap gap-2">
        {SAMPLE_CORRIDORS.map((corridor) => {
          const isSelected = selectedCorridorId === corridor.id;
          return (
            <button
              key={corridor.id}
              onClick={() => setSelectedCorridorId(corridor.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-brand-gold text-slate-950 border-brand-gold shadow-glow-gold'
                  : 'bg-logistics-950 text-slate-300 hover:text-white hover:bg-logistics-850 border-slate-800'
              }`}
            >
              <Truck className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-brand-gold'}`} />
              <span>{corridor.name}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Map Visualizer Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* SVG US Map Container with Real Satellite Picture Backdrop */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-logistics-950 border border-slate-800/80 relative overflow-hidden flex items-center justify-center min-h-[360px] shadow-2xl">
          
          {/* Real Satellite Map Backdrop */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/us_satellite_map.jpg" 
              alt="US Real Satellite Freight Radar Map" 
              className="w-full h-full object-cover object-center filter brightness-95 contrast-125 opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/80" />
          </div>

          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 highway-grid opacity-20 pointer-events-none z-1" />

          {/* SVG Map Layout */}
          <svg viewBox="0 0 650 420" className="w-full h-auto relative z-10 select-none">
            {/* Stylized US Outline Geometry */}
            <path
              d="M 50 120 
                 L 110 90 L 210 95 L 300 100 L 410 70 L 480 80 L 530 60 L 590 70 L 610 110 L 580 160 L 550 200 L 560 330 L 530 380 L 480 340 L 420 320 L 350 370 L 290 350 L 260 300 L 160 310 L 90 280 L 40 180 Z"
              fill="#0b111a"
              stroke="#1e293b"
              strokeWidth="2"
            />
            {/* State Grid Internal Guideline Lines */}
            <line x1="200" y1="95" x2="200" y2="300" stroke="#162032" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="380" y1="80" x2="380" y2="340" stroke="#162032" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="500" y1="70" x2="500" y2="340" stroke="#162032" strokeWidth="1" strokeDasharray="3 3" />

            {/* Inactive Corridor Paths */}
            {SAMPLE_CORRIDORS.map((c) => {
              if (c.id === selectedCorridorId) return null;
              return (
                <path
                  key={c.id}
                  d={c.pathPoints}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  opacity="0.5"
                />
              );
            })}

            {/* Active Highlighted Corridor Path with Glow */}
            <path
              d={activeCorridor.pathPoints}
              fill="none"
              stroke="#F59E0B"
              strokeWidth="4"
              strokeLinecap="round"
              className="route-dash-animation drop-shadow-lg"
            />

            {/* Origin Node */}
            <g transform={`translate(${activeCorridor.originCoord.x}, ${activeCorridor.originCoord.y})`}>
              <circle cx="0" cy="0" r="10" fill="#06B6D4" opacity="0.2" className="animate-ping" />
              <circle cx="0" cy="0" r="6" fill="#06B6D4" stroke="#0B0F17" strokeWidth="2" />
              <text x="10" y="4" fill="#67E8F9" fontSize="11" fontFamily="monospace" fontWeight="bold">
                {activeCorridor.originCity} (ORIGIN)
              </text>
            </g>

            {/* Destination Node */}
            <g transform={`translate(${activeCorridor.destCoord.x}, ${activeCorridor.destCoord.y})`}>
              <circle cx="0" cy="0" r="10" fill="#10B981" opacity="0.2" className="animate-ping" />
              <circle cx="0" cy="0" r="6" fill="#10B981" stroke="#0B0F17" strokeWidth="2" />
              <text x="10" y="4" fill="#34D399" fontSize="11" fontFamily="monospace" fontWeight="bold">
                {activeCorridor.destCity} (DEST)
              </text>
            </g>

            {/* Moving In-Transit Truck Marker Simulation */}
            <g transform={`translate(${(activeCorridor.originCoord.x + activeCorridor.destCoord.x) / 2}, ${(activeCorridor.originCoord.y + activeCorridor.destCoord.y) / 2 - 10})`}>
              <rect x="-14" y="-12" width="28" height="24" rx="6" fill="#F59E0B" />
              <circle cx="-5" cy="5" r="2.5" fill="#0B0F17" />
              <circle cx="5" cy="5" r="2.5" fill="#0B0F17" />
              <text x="0" y="-14" textAnchor="middle" fill="#F59E0B" fontSize="9" fontFamily="monospace" fontWeight="bold">
                DGW ACTIVE
              </text>
            </g>
          </svg>
        </div>

        {/* Selected Corridor Stats Card */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-logistics-950 border border-brand-gold/40 shadow-glow-gold space-y-4">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-mono text-xs font-bold text-brand-gold uppercase">{activeCorridor.status}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-brand-cyan border border-slate-800">
              {activeCorridor.originState} → {activeCorridor.destState}
            </span>
          </div>

          <div className="space-y-1">
            <h4 className="text-base font-display font-extrabold text-white">{activeCorridor.name}</h4>
            <p className="text-xs text-slate-400">Estimated corridor distance: ~{activeCorridor.milesApprox} miles</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs">
            <div className="p-2.5 rounded-xl bg-logistics-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Sample Linehaul</span>
              <span className="font-bold text-white text-sm">{activeCorridor.sampleRate}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-logistics-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Sample RPM</span>
              <span className="font-bold text-brand-gold text-sm">{activeCorridor.sampleRpm}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-logistics-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Equipment</span>
              <span className="font-semibold text-slate-200 text-[11px] truncate block">{activeCorridor.equipment}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-logistics-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Transit Time</span>
              <span className="font-semibold text-brand-cyan text-[11px] truncate block">{activeCorridor.transitEst}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald" />
              <span>Multi-Leg Backhaul Advantage</span>
            </div>
            <p>
              DGW dispatchers search return loads in advance across {activeCorridor.destState} to eliminate empty deadhead miles.
            </p>
          </div>

        </div>

      </div>

      {/* Legal & Data Accuracy Disclaimer */}
      <div className="p-3 rounded-xl bg-logistics-950 text-[11px] text-slate-500 border border-slate-800 flex items-start gap-2">
        <AlertCircle className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
        <span>
          <strong>Sample Data Disclaimer:</strong> All corridor rates, RPMs, and mileage calculations are illustrative market references. They do not constitute live brokerage postings or guaranteed compensation.
        </span>
      </div>

    </div>
  );
};
