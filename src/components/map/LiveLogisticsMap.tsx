import React, { useState } from 'react';
import { 
  Radio, 
  Thermometer, 
  Phone, 
  ArrowRight,
  Activity
} from 'lucide-react';
import { US_STATES_GEO, type USStateGeo } from '../../data/usStateGeoData';
import { TELEMETRY_FLEET_DATA } from '../../data/telematicsData';
import type { TelemetryTruck, TelematicsStatus } from '../../types';

interface LiveLogisticsMapProps {
  onSelectTruck?: (truck: TelemetryTruck) => void;
  onSelectState?: (state: USStateGeo) => void;
}

export const LiveLogisticsMap: React.FC<LiveLogisticsMapProps> = ({ 
  onSelectTruck, 
  onSelectState 
}) => {
  const [selectedTruckId, setSelectedTruckId] = useState<string | null>('trk-104'); // Denver HQ by default
  const [selectedStateId, setSelectedStateId] = useState<string>('CO');
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredTrucks = TELEMETRY_FLEET_DATA.filter((trk) => {
    if (statusFilter === 'all') return true;
    return trk.status === statusFilter;
  });

  const selectedTruck = TELEMETRY_FLEET_DATA.find((t) => t.id === selectedTruckId) || TELEMETRY_FLEET_DATA[0];
  const selectedState = US_STATES_GEO.find((s) => s.id === selectedStateId) || US_STATES_GEO.find((s) => s.id === 'CO')!;
  const hoveredState = hoveredStateId ? US_STATES_GEO.find((s) => s.id === hoveredStateId) : null;
  const activeState = hoveredState || selectedState;

  // Approximate Albers SVG coordinates for realistic simulated map positions (960x600 viewBox)
  const getCoordinatesPosition = (lat: number, lng: number) => {
    // US Bounds: Lat 24 to 50, Lng -125 to -66
    const x = ((lng - (-125)) / ((-66) - (-125))) * 960;
    const y = ((50 - lat) / (50 - 24)) * 600;
    return { x: Math.min(920, Math.max(40, x)), y: Math.min(560, Math.max(40, y)) };
  };

  const getStatusBadge = (status: TelematicsStatus) => {
    switch (status) {
      case 'available':
        return <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold">🟢 AVAILABLE</span>;
      case 'in-transit':
        return <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-cyan-400 border border-cyan-500/40 font-bold">🔵 IN TRANSIT</span>;
      case 'loading':
        return <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-500/40 font-bold">🟡 LOADING / STAGED</span>;
      case 'delayed':
        return <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-orange-950 text-orange-400 border border-orange-500/40 font-bold">🟠 DELAY REPORTED</span>;
      case 'issue-reported':
        return <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-500/40 font-bold">🔴 SAFETY HOLD</span>;
    }
  };

  return (
    <div className="w-full rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-4 sm:p-8 space-y-6 text-white overflow-hidden">
      
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-mono font-bold uppercase tracking-wider">
              50-State Interactive Radar
            </span>
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Live North American Freight Corridors</span>
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-black text-white mt-1">
            US 48-State Interstate Radar & Fleet Telematics
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Explore live state freight volumes, Rate per Mile (RPM) trends, and click in-transit truck nodes across major corridors.
          </p>
        </div>

        {/* Status Filters & Mode Controls */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {[
            { id: 'all', label: 'All Fleets' },
            { id: 'in-transit', label: 'In Transit' },
            { id: 'available', label: 'Available' },
            { id: 'loading', label: 'Loading' },
            { id: 'delayed', label: 'Delayed' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-2 sm:py-1.5 rounded-xl font-bold transition-all text-xs min-h-[36px] sm:min-h-0 flex items-center justify-center ${
                statusFilter === f.id
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile State Quick-Selector Bar */}
      <div className="block lg:hidden bg-slate-950 p-3 rounded-2xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="text-amber-400 font-bold">📱 Quick State Telematics:</span>
          <select 
            value={selectedStateId} 
            onChange={(e) => {
              const stateId = e.target.value;
              setSelectedStateId(stateId);
              const found = US_STATES_GEO.find(s => s.id === stateId);
              if (found && onSelectState) onSelectState(found);
            }}
            className="bg-slate-900 text-amber-300 font-bold px-3 py-1.5 rounded-lg border border-amber-500/40 text-xs outline-none"
          >
            {US_STATES_GEO.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.id}) - Zone {s.datZone}
              </option>
            ))}
          </select>
        </div>

        {/* Scrollable Popular Lanes Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px] font-mono no-scrollbar">
          {['CO', 'TX', 'CA', 'IL', 'GA', 'FL', 'OH', 'PA', 'NJ', 'WA', 'AZ'].map(stId => {
            const st = US_STATES_GEO.find(s => s.id === stId);
            const isSel = selectedStateId === stId;
            return (
              <button
                key={stId}
                onClick={() => {
                  setSelectedStateId(stId);
                  if (st && onSelectState) onSelectState(st);
                }}
                className={`px-2.5 py-1 rounded-lg shrink-0 font-bold transition-all ${
                  isSel
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900 text-slate-300 border border-white/10'
                }`}
              >
                {stId} {stId === 'CO' ? '⭐ HQ' : ''}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Map & Telemetry Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* US 50-State Real Satellite Map Radar Canvas (2 Cols) */}
        <div className="lg:col-span-2 relative min-h-[400px] sm:min-h-[500px] rounded-2xl bg-slate-950 border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col items-center justify-center p-2 sm:p-4">
          
          {/* Real Satellite Map Image Base Layer */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/us_satellite_map.jpg" 
              alt="Real high-resolution satellite terrain photograph of United States freight network" 
              className="w-full h-full object-cover object-center filter brightness-110 contrast-115"
            />
            {/* Subtle High-Tech Vignette & Radar Grid Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/70" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(15,23,42,0.85)_100%)]" />
          </div>

          {/* Active Radar Sweep Line Animation */}
          <div 
            className="absolute inset-0 pointer-events-none z-5 overflow-hidden"
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-amber-400/10 to-transparent animate-pulse opacity-40" />
          </div>

          {/* Top Bar on Map: View Toggles & Satellite Badge */}
          <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 backdrop-blur-md border border-amber-500/40 text-[10px] font-mono font-bold text-amber-400 shadow-lg pointer-events-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>🛰️ REAL SATELLITE RADAR • 48 CONTIGUOUS STATES</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-950/85 backdrop-blur-md px-2 py-1 rounded-xl border border-white/15 text-[10px] font-mono text-slate-300 pointer-events-auto">
              <span className="text-amber-400 font-bold">HQ:</span>
              <span>Denver, CO (I-70 / I-25 Hub)</span>
            </div>
          </div>

          {/* US SVG 50-State Vector Overlay & Telematics Pins */}
          <div className="w-full h-full flex items-center justify-center relative z-10 pt-6">
            <svg 
              viewBox="0 0 960 600" 
              className="w-full h-auto max-h-[520px] select-none"
              style={{ filter: 'drop-shadow(0 12px 30px rgba(0,0,0,0.8))' }}
            >
              <defs>
                {/* Glow Filter for Active State */}
                <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="truckGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Major Glowing Interstate Highway Corridors across Real Satellite Terrain */}
              <g opacity="0.65" strokeDasharray="6 4" strokeWidth="2" className="pointer-events-none">
                {/* I-80 Transcontinental: SF/Sacramento to NY/NJ */}
                <line x1="85" y1="260" x2="840" y2="210" stroke="#F59E0B" strokeWidth="2.5" />
                {/* I-70 Central: Utah to Maryland via Denver HQ */}
                <line x1="240" y1="280" x2="790" y2="270" stroke="#FF5722" strokeWidth="2.5" />
                {/* I-10 Southern: LA to Jacksonville */}
                <line x1="120" y1="410" x2="780" y2="480" stroke="#38BDF8" strokeWidth="2.5" />
                {/* I-35 North-South: Laredo TX to Duluth MN */}
                <line x1="450" y1="540" x2="520" y2="100" stroke="#10B981" strokeWidth="2" />
                {/* I-95 East Coast: Miami to Maine */}
                <line x1="780" y1="540" x2="840" y2="100" stroke="#EC4899" strokeWidth="2" />
              </g>

              {/* 50 US STATES POLYGONS & LABELS OVER SATELLITE TERRAIN */}
              <g className="states-layer">
                {US_STATES_GEO.map((state) => {
                  const isSelected = selectedStateId === state.id;
                  const isHovered = hoveredStateId === state.id;

                  // High-clarity semi-translucent styling so real satellite geography shows through
                  const fill = isSelected 
                    ? 'rgba(245, 158, 11, 0.45)' 
                    : isHovered 
                    ? 'rgba(217, 119, 6, 0.35)' 
                    : state.id === 'CO' 
                    ? 'rgba(30, 41, 59, 0.4)' 
                    : 'rgba(15, 23, 42, 0.18)';

                  const textFill = isSelected ? '#FDE047' : isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)';
                  const strokeColor = isSelected ? '#FDE047' : isHovered ? '#F59E0B' : 'rgba(148, 163, 184, 0.45)';
                  const strokeW = isSelected ? 2.5 : isHovered ? 2 : 1;

                  return (
                    <g 
                      key={state.id}
                      className="cursor-pointer transition-all duration-200"
                      onClick={() => {
                        setSelectedStateId(state.id);
                        if (onSelectState) onSelectState(state);
                      }}
                      onMouseEnter={() => setHoveredStateId(state.id)}
                      onMouseLeave={() => setHoveredStateId(null)}
                    >
                      {/* State Polygon Path */}
                      <path
                        d={state.path}
                        fill={fill}
                        stroke={strokeColor}
                        strokeWidth={strokeW}
                        strokeLinejoin="round"
                        className="transition-colors duration-200"
                        filter={isSelected ? 'url(#goldGlow)' : undefined}
                      />

                      {/* State 2-Letter Bold Label Text */}
                      <text
                        x={state.labelX}
                        y={state.labelY}
                        fill={textFill}
                        fontSize={state.id === 'TX' || state.id === 'CA' || state.id === 'MT' || state.id === 'WY' ? 13 : 10}
                        fontWeight="900"
                        fontFamily="monospace"
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="pointer-events-none select-none tracking-tight"
                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}
                      >
                        {state.id}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* Denver Headquarters Hub Beacon Pin with Concentric Ping */}
              <g transform="translate(350, 280)" className="pointer-events-none">
                <circle cx="0" cy="0" r="22" fill="none" stroke="#F59E0B" strokeWidth="1.5" className="animate-ping" />
                <circle cx="0" cy="0" r="12" fill="rgba(245, 158, 11, 0.3)" />
                <circle cx="0" cy="0" r="6" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
                <text x="12" y="4" fill="#FDE047" fontSize="10" fontFamily="monospace" fontWeight="900" style={{ textShadow: '0 2px 4px #000' }}>
                  DENVER HQ
                </text>
              </g>

              {/* Live Truck Markers on Map */}
              {filteredTrucks.map((truck) => {
                const pos = getCoordinatesPosition(truck.currentLocation.lat, truck.currentLocation.lng);
                const isSelected = selectedTruck.id === truck.id;

                return (
                  <g 
                    key={truck.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    className="cursor-pointer group"
                    onClick={() => {
                      setSelectedTruckId(truck.id);
                      if (onSelectTruck) onSelectTruck(truck);
                    }}
                  >
                    {/* Ping Ring */}
                    {isSelected && (
                      <circle cx="0" cy="0" r="24" fill="none" stroke="#FF5722" strokeWidth="2.5" opacity="0.9" className="animate-ping" />
                    )}

                    {/* Truck Marker Icon Box */}
                    <rect
                      x="-14"
                      y="-14"
                      width="28"
                      height="28"
                      rx="8"
                      fill={isSelected ? '#FF5722' : truck.status === 'delayed' ? '#EA580C' : '#0F172A'}
                      stroke={isSelected ? '#FFFFFF' : '#F59E0B'}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      className="transition-all duration-200 group-hover:scale-125 shadow-2xl"
                      filter="url(#truckGlow)"
                    />

                    {/* Truck Icon Glyphs */}
                    <g transform="translate(-8, -8) scale(0.65)">
                      <path
                        d="M 3 3 L 15 3 L 18 9 L 21 9 L 21 17 L 18 17 L 18 19 L 14 19 L 14 17 L 8 17 L 8 19 L 4 19 L 4 17 L 3 17 Z"
                        fill="#FFFFFF"
                      />
                    </g>

                    {/* Quick Floating Tooltip */}
                    <g transform="translate(0, -22)" className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                      <rect x="-55" y="-16" width="110" height="20" rx="6" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5" />
                      <text x="0" y="-3" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        {truck.truckNumber} • {truck.currentLocation.state}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Footer Bar Info */}
          <div className="w-full mt-2 pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-white font-bold">ACTIVE REGION: {activeState.name.toUpperCase()} ({activeState.id})</span>
              <span>• Zone {activeState.datZone} ({activeState.zoneName})</span>
            </div>

            <div className="text-emerald-400 flex items-center gap-1.5 font-bold">
              <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>DENVER HQ DISPATCH HUB (DOT 3891024)</span>
            </div>
          </div>

        </div>

        {/* Right Inspection Drawer: State Insights & Selected Truck Telemetry */}
        <div className="space-y-4">
          
          {/* Active State Market Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                  STATE FREIGHT ANALYTICS
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5">
                  {activeState.name} ({activeState.id})
                </h4>
                <p className="text-[11px] text-slate-400 font-mono">
                  DAT Freight Zone {activeState.datZone} • {activeState.zoneName}
                </p>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                activeState.marketStatus === 'VERY_HIGH' 
                  ? 'bg-red-950 text-red-400 border border-red-500/40' 
                  : activeState.marketStatus === 'HIGH'
                  ? 'bg-amber-950 text-amber-400 border border-amber-500/40'
                  : 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
              }`}>
                {activeState.marketStatus} DEMAND
              </span>
            </div>

            {/* State Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 space-y-0.5">
                <span className="text-[10px] text-slate-400 block">AVG OUTBOUND RPM</span>
                <span className="font-bold text-amber-400 text-sm block">${activeState.avgOutboundRpm.toFixed(2)} / mi</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 space-y-0.5">
                <span className="text-[10px] text-slate-400 block">LOAD-TO-TRUCK</span>
                <span className="font-bold text-emerald-400 text-sm block">{activeState.loadToTruckRatio}:1 Ratio</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 space-y-0.5">
                <span className="text-[10px] text-slate-400 block">OUTBOUND LOADS</span>
                <span className="font-bold text-white text-sm block">{activeState.outboundLoads} Spot Tenders</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 space-y-0.5">
                <span className="text-[10px] text-slate-400 block">INBOUND VOLUME</span>
                <span className="font-bold text-slate-300 text-sm block">{activeState.inboundLoads} Inbound</span>
              </div>
            </div>

            {/* Primary Hub Cities */}
            <div className="pt-1">
              <span className="text-[10px] font-mono text-slate-400 block mb-1">PRIMARY FREIGHT METRO HUBS:</span>
              <div className="flex flex-wrap gap-1">
                {activeState.primaryHubs.map((hub, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 text-[10px] font-mono border border-white/10">
                    {hub}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Truck Telemetry Drawer */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-start justify-between border-b border-white/10 pb-2">
              <div>
                <span className="text-[10px] font-mono uppercase text-brand-orange font-bold">
                  LIVE TRUCK TELEMETRY
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  {selectedTruck.truckNumber} • {selectedTruck.equipment}
                </h4>
                <p className="text-[11px] text-slate-400 font-mono">
                  {selectedTruck.carrierName} ({selectedTruck.mcNumber})
                </p>
              </div>
              {getStatusBadge(selectedTruck.status)}
            </div>

            {/* Route Progression */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">{selectedTruck.origin.city}, {selectedTruck.origin.state}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-bold text-white">{selectedTruck.destination.city}, {selectedTruck.destination.state}</span>
              </div>

              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-brand-orange to-amber-500 transition-all duration-500"
                  style={{ width: `${selectedTruck.progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Progress: {selectedTruck.progressPercent}%</span>
                <span>ETA: {selectedTruck.eta}</span>
              </div>
            </div>

            {/* Driver Contact & Temperature Info */}
            <div className="flex items-center justify-between text-xs pt-1">
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">ASSIGNED DRIVER</span>
                <span className="font-bold text-white">{selectedTruck.driverName}</span>
              </div>

              {selectedTruck.reeferTempF !== undefined ? (
                <div className="text-right">
                  <span className="text-[10px] text-cyan-400 block font-mono">REEFER AIR</span>
                  <span className="font-bold text-cyan-300 flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-cyan-400" />
                    {selectedTruck.reeferTempF}°F
                  </span>
                </div>
              ) : (
                <div className="text-right">
                  <span className="text-[10px] text-emerald-400 block font-mono">PAYLOAD</span>
                  <span className="font-bold text-slate-300">{selectedTruck.weightLbs.toLocaleString()} lbs</span>
                </div>
              )}
            </div>

            {/* Quick Dispatch Action Button */}
            <a
              href={`tel:${selectedTruck.driverPhone}`}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Dispatch Desk: +1 (800) DGW-LOAD</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
