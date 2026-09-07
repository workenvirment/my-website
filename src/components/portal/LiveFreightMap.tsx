import React, { useState, useEffect } from 'react';
import { 
  Navigation, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Eye, 
  X,
  Truck
} from 'lucide-react';
import { US_STATES_GEO, DAT_ZONES_INFO } from '../../data/usStateGeoData';
import type { USStateGeo } from '../../data/usStateGeoData';
import { PORTAL_MAP_TRUCKS } from '../../data/portalData';
import type { MapTruck } from '../../data/portalData';

interface LiveFreightMapProps {
  onSelectLoad?: (loadId: string) => void;
  onSelectState?: (stateCode: string) => void;
  heightClass?: string;
}

export const LiveFreightMap: React.FC<LiveFreightMapProps> = ({
  onSelectLoad,
  onSelectState,
  heightClass = 'h-[540px]'
}) => {
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [hoveredState, setHoveredState] = useState<USStateGeo | null>(null);
  const [selectedState, setSelectedState] = useState<USStateGeo | null>(US_STATES_GEO.find(s => s.id === 'TX') || null);
  const [viewMode, setViewMode] = useState<'zones' | 'heatmap' | 'ratio'>('zones');
  const [showTrucks, setShowTrucks] = useState(true);
  const [showCorridors, setShowCorridors] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedTruck, setSelectedTruck] = useState<MapTruck | null>(null);
  const [simTick, setSimTick] = useState(0);

  // Animated truck motion tick
  useEffect(() => {
    const timer = setInterval(() => {
      setSimTick((prev) => (prev + 1) % 100);
    }, 150);
    return () => clearInterval(timer);
  }, []);

  // Compute animated GPS position along corridor
  const getTruckPosition = (truckId: string) => {
    switch (truckId) {
      case 'TRK-901': // Dallas to Atlanta (I-20 Corridor)
        return {
          x: 450 + Math.sin(simTick * 0.06) * 110,
          y: 470 - Math.sin(simTick * 0.06) * 20
        };
      case 'TRK-442': // Chicago to Dallas (I-55 / I-30)
        return {
          x: 570 - Math.sin(simTick * 0.07) * 60,
          y: 265 + Math.sin(simTick * 0.07) * 100
        };
      case 'TRK-812': // LA to Phoenix (I-10)
        return {
          x: 130 + Math.sin(simTick * 0.08) * 60,
          y: 310 + Math.sin(simTick * 0.08) * 40
        };
      case 'TRK-108': // NY to Charlotte (I-85)
        return {
          x: 755 - Math.sin(simTick * 0.05) * 20,
          y: 195 + Math.sin(simTick * 0.05) * 80
        };
      default:
        return { x: 500, y: 350 };
    }
  };

  const handleStateClick = (state: USStateGeo) => {
    setSelectedState(state);
    if (onSelectState) {
      onSelectState(state.id);
    }
  };

  // Color generator based on current map view mode
  const getStateColor = (state: USStateGeo) => {
    const isZoneMatch = selectedZone === null || state.datZone === selectedZone;
    const isSelected = selectedState?.id === state.id;
    const isHovered = hoveredState?.id === state.id;

    if (viewMode === 'heatmap') {
      // Outbound Rate Heatmap
      if (state.avgOutboundRpm >= 2.65) {
        return isHovered ? '#15803D' : '#22C55E'; // Green High Rate
      } else if (state.avgOutboundRpm >= 2.45) {
        return isHovered ? '#EA580C' : '#FF5722'; // Electric Orange Moderate
      } else {
        return isHovered ? '#3B82F6' : '#60A5FA'; // Blue Baseline
      }
    }

    if (viewMode === 'ratio') {
      // Load to Truck Tension
      if (state.loadToTruckRatio >= 6.0) {
        return isHovered ? '#DC2626' : '#EF4444'; // Red Hot Market
      } else if (state.loadToTruckRatio >= 4.5) {
        return isHovered ? '#D97706' : '#F59E0B'; // Amber Active
      } else {
        return isHovered ? '#475569' : '#64748B'; // Balanced Slate
      }
    }

    // Default: DAT Freight Zones
    const zoneInfo = DAT_ZONES_INFO.find((z) => z.zone === state.datZone);
    if (!isZoneMatch) {
      return '#E2E8F0'; // Dimmed out of zone
    }
    return isHovered || isSelected ? (zoneInfo?.borderStroke || '#EA580C') : (zoneInfo?.color || '#FF5722');
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden flex flex-col">
      
      {/* Top Map Operations Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Title & Live Status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-100 border border-orange-200 text-brand-orange flex items-center justify-center shrink-0 shadow-sm">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-black text-slate-900 text-base">
                DAT National Freight Market Zones & Telematics
              </h3>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                LIVE RADAR
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Interactive 50-State Outbound Demand • DAT Freight Zones (0-9) • Real-time GPS Interstate Corridors
            </p>
          </div>
        </div>

        {/* View Mode Switcher Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs font-semibold">
          <button
            onClick={() => setViewMode('zones')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              viewMode === 'zones' ? 'bg-brand-orange text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            DAT Zones (0-9)
          </button>
          <button
            onClick={() => setViewMode('heatmap')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              viewMode === 'heatmap' ? 'bg-emerald-600 text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            RPM Rate Heatmap
          </button>
          <button
            onClick={() => setViewMode('ratio')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              viewMode === 'ratio' ? 'bg-red-600 text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Load-to-Truck Tension
          </button>
        </div>

      </div>

      {/* DAT Zone Quick Selector Bar */}
      <div className="px-4 py-2.5 bg-white border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs">
        <span className="text-[10px] font-mono font-bold uppercase text-slate-400 shrink-0 mr-1">
          Select DAT Zone:
        </span>
        <button
          onClick={() => setSelectedZone(null)}
          className={`px-2.5 py-1 rounded-lg font-bold text-[11px] shrink-0 transition-colors ${
            selectedZone === null
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All 50 States
        </button>

        {DAT_ZONES_INFO.map((zone) => (
          <button
            key={zone.zone}
            onClick={() => setSelectedZone(selectedZone === zone.zone ? null : zone.zone)}
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] shrink-0 transition-all flex items-center gap-1.5 border ${
              selectedZone === zone.zone
                ? 'bg-brand-orange text-white border-brand-orange shadow-sm'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: zone.color }} />
            <span>Zone {zone.zone}</span>
          </button>
        ))}
      </div>

      {/* Main Vector Map Canvas Container */}
      <div className={`relative w-full ${heightClass} bg-slate-950 overflow-hidden select-none`}>
        
        {/* SVG Interactive Map Canvas */}
        <svg
          viewBox="50 30 830 550"
          className="w-full h-full transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
        >
          <defs>
            {/* Subtle Gradient Overlays */}
            <linearGradient id="mapBgGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0B0F17" />
              <stop offset="100%" stopColor="#131B2B" />
            </linearGradient>

            <filter id="glowOrange" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Background Grid */}
          <rect x="0" y="0" width="1000" height="700" fill="url(#mapBgGrad)" />
          <rect x="0" y="0" width="1000" height="700" fill="url(#gridPattern)" />

          {/* ========================================================================= */}
          {/* 1. RENDER 50 US STATE POLYGONS & POSTAL LABELS                            */}
          {/* ========================================================================= */}
          <g id="us-states-layer">
            {US_STATES_GEO.map((state) => {
              const fillColor = getStateColor(state);
              const isSelected = selectedState?.id === state.id;
              const isHovered = hoveredState?.id === state.id;
              const isDimmed = selectedZone !== null && state.datZone !== selectedZone;

              return (
                <g
                  key={state.id}
                  onClick={() => handleStateClick(state)}
                  onMouseEnter={() => setHoveredState(state)}
                  onMouseLeave={() => setHoveredState(null)}
                  className="cursor-pointer group"
                >
                  {/* State Boundary Path */}
                  <path
                    d={state.path}
                    fill={fillColor}
                    fillOpacity={isDimmed ? 0.25 : (isHovered || isSelected ? 0.95 : 0.75)}
                    stroke={isSelected ? '#FFFFFF' : '#0B0F17'}
                    strokeWidth={isSelected ? 2.5 : 1.2}
                    strokeLinejoin="round"
                    className="transition-all duration-150 group-hover:filter group-hover:brightness-125"
                  />

                  {/* Centered 2-Letter State Postal Code (WA, TX, FL, etc.) */}
                  <text
                    x={state.labelX}
                    y={state.labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isDimmed ? 'rgba(255,255,255,0.4)' : '#FFFFFF'}
                    fontSize="10"
                    fontWeight="bold"
                    fontFamily="monospace"
                    className="pointer-events-none select-none tracking-wider"
                    style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
                  >
                    {state.id}
                  </text>
                </g>
              );
            })}
          </g>

          {/* ========================================================================= */}
          {/* 2. INTERSTATE FREIGHT CORRIDORS OVERLAY                                   */}
          {/* ========================================================================= */}
          {showCorridors && (
            <g id="interstate-corridors-layer" className="pointer-events-none opacity-80">
              {/* I-10: Los Angeles -> Phoenix -> Dallas -> Houston -> Jacksonville */}
              <path
                d="M 130 310 Q 250 395 450 470 T 745 560"
                fill="none"
                stroke="#FF5722"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
              {/* I-80: San Francisco -> Salt Lake City -> Omaha -> Chicago -> NYC */}
              <path
                d="M 110 330 Q 270 275 420 252 T 570 265 T 755 195"
                fill="none"
                stroke="#00BCD4"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
              {/* I-35: Laredo/Dallas -> OKC -> KC -> Minneapolis */}
              <path
                d="M 450 470 L 460 375 L 545 330 L 505 145"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
              {/* I-95: Miami -> Atlanta -> Charlotte -> DC -> NYC -> Boston */}
              <path
                d="M 745 560 L 668 435 L 720 358 L 742 290 L 755 195 L 805 202"
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
            </g>
          )}

          {/* ========================================================================= */}
          {/* 3. LIVE GPS MOVING TRUCKS TELEMATICS                                      */}
          {/* ========================================================================= */}
          {showTrucks && PORTAL_MAP_TRUCKS.map((truck) => {
            const pos = getTruckPosition(truck.id);
            const isSelected = selectedTruck?.id === truck.id;

            return (
              <g
                key={truck.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={() => setSelectedTruck(truck)}
                className="cursor-pointer group"
              >
                {/* Pulsing Radar Ring */}
                <circle
                  r="14"
                  fill="none"
                  stroke={truck.status === 'IN TRANSIT' ? '#FF5722' : '#00BCD4'}
                  strokeWidth="1.5"
                  className="animate-ping opacity-75 origin-center"
                />

                {/* Marker Center */}
                <circle
                  r="8"
                  fill={truck.status === 'IN TRANSIT' ? '#FF5722' : '#00BCD4'}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  filter="url(#glowOrange)"
                  className="transition-transform group-hover:scale-125"
                />

                <circle r="3" fill="#0B0F17" />

                {/* Unit Tag Label */}
                <rect
                  x="-28"
                  y="12"
                  width="56"
                  height="14"
                  rx="4"
                  fill="#0B0F17"
                  stroke={isSelected ? '#FF5722' : 'rgba(255,255,255,0.3)'}
                  strokeWidth="1"
                />
                <text
                  x="0"
                  y="22"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="8"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {truck.id}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Map Float Controls (Zoom, Layers, Corridors) */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
          <div className="p-1.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-xl flex flex-col gap-1 text-white">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2.2))}
              className="p-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
              className="p-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setZoomLevel(1);
                setSelectedZone(null);
              }}
              className="p-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="p-1.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-xl flex flex-col gap-1 text-white">
            <button
              onClick={() => setShowTrucks(!showTrucks)}
              className={`p-2 rounded-xl transition-colors ${
                showTrucks ? 'bg-brand-orange text-white' : 'text-slate-400 hover:bg-slate-800'
              }`}
              title="Toggle Live GPS Fleet"
            >
              <Truck className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowCorridors(!showCorridors)}
              className={`p-2 rounded-xl transition-colors ${
                showCorridors ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:bg-slate-800'
              }`}
              title="Toggle Interstate Routes"
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. HOVERED / SELECTED STATE FREIGHT INTELLIGENCE CARD                      */}
        {/* ========================================================================= */}
        {/* 4. HOVERED / SELECTED STATE FREIGHT INTELLIGENCE CARD                      */}
        {/* ========================================================================= */}
        {(hoveredState || selectedState) && (
          <div className="absolute bottom-4 left-4 z-20 w-80 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700 shadow-2xl text-white space-y-3 animate-in fade-in">
            {(() => {
              const st = hoveredState || selectedState!;

              return (
                <>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-brand-orange text-white">
                        {st.id}
                      </span>
                      <span className="font-display font-black text-sm text-white">{st.name}</span>
                    </div>

                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      DAT Zone {st.datZone}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                      <span className="text-[9px] text-slate-400 uppercase block">Outbound Loads</span>
                      <strong className="text-sm text-white">{st.outboundLoads} Available</strong>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                      <span className="text-[9px] text-slate-400 uppercase block">Avg Spot RPM</span>
                      <strong className="text-sm text-brand-orange">${st.avgOutboundRpm.toFixed(2)}/mi</strong>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                      <span className="text-[9px] text-slate-400 uppercase block">Load-to-Truck</span>
                      <strong className="text-sm text-emerald-400">{st.loadToTruckRatio}:1 Ratio</strong>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                      <span className="text-[9px] text-slate-400 uppercase block">Market Status</span>
                      <strong className={`text-xs ${
                        st.marketStatus === 'VERY_HIGH' ? 'text-red-400' :
                        st.marketStatus === 'HIGH' ? 'text-orange-400' : 'text-cyan-400'
                      }`}>
                        {st.marketStatus.replace('_', ' ')}
                      </strong>
                    </div>
                  </div>

                  <div className="space-y-1 text-[11px] pt-1">
                    <span className="text-slate-400 font-mono text-[10px] uppercase block">Freight Hubs:</span>
                    <p className="text-slate-300 font-semibold truncate">
                      {st.primaryHubs.join(', ')}
                    </p>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Selected Truck Telematics Flyout */}
        {selectedTruck && (
          <div className="absolute top-4 left-4 z-20 w-80 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700 shadow-2xl text-white space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand-orange" />
                <span className="font-mono font-bold text-sm text-white">UNIT {selectedTruck.id}</span>
              </div>
              <button
                onClick={() => setSelectedTruck(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <p className="font-bold text-white text-sm">{selectedTruck.driverName} • {selectedTruck.equipment}</p>
              <div className="p-2 rounded-xl bg-slate-800 font-mono text-[11px] flex justify-between">
                <span>{selectedTruck.currentLocation.city}, {selectedTruck.currentLocation.state}</span>
                <span className="text-brand-orange">→</span>
                <span>{selectedTruck.destination.city}, {selectedTruck.destination.state}</span>
              </div>
              <div className="flex justify-between font-mono text-[11px] text-slate-300">
                <span>Speed: {selectedTruck.speedMph} MPH</span>
                <span>ETA: {selectedTruck.eta}</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (onSelectLoad) onSelectLoad(selectedTruck.activeLoadId);
              }}
              className="w-full py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs shadow-glow-orange transition-all flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Assigned Load ({selectedTruck.activeLoadId})</span>
            </button>
          </div>
        )}

      </div>

      {/* Map Footer Legend & Explanations */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
        
        {/* Dynamic Legend */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-mono font-bold text-slate-500 uppercase text-[10px]">Map Legend:</span>
          
          {viewMode === 'zones' && (
            <div className="flex flex-wrap items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded bg-blue-500" /> Zone 0/1 (Northeast & Mid-Atl)
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded bg-sky-500" /> Zone 2/3 (Southeast & Gulf)
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded bg-amber-500" /> Zone 4/5 (Midwest & Great Lakes)
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded bg-orange-600" /> Zone 7 (South Central / TX)
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded bg-teal-500" /> Zone 8/9 (West & Pacific)
              </span>
            </div>
          )}

          {viewMode === 'heatmap' && (
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded bg-emerald-500" /> High Rate ($2.65+/mi)
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded bg-orange-500" /> Moderate ($2.45 - $2.65/mi)
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded bg-blue-400" /> Baseline (&lt;$2.45/mi)
              </span>
            </div>
          )}

          {viewMode === 'ratio' && (
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded bg-red-500" /> High Tension (&gt;6:1 Ratio)
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded bg-amber-500" /> Active (4.5 - 6:1)
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded bg-slate-500" /> Balanced
              </span>
            </div>
          )}
        </div>

        <div className="text-[11px] text-slate-400 font-mono">
          Click any state or truck to inspect live freight telemetry
        </div>

      </div>

    </div>
  );
};
