import React, { useState } from 'react';
import { 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  AlertCircle 
} from 'lucide-react';
import { EQUIPMENT_LIST } from '../../data/equipmentData';
import type { EquipmentCategory } from '../../types';

interface EquipmentVisualizerProps {
  onSelectCta?: (equipmentSlug: string) => void;
}

export const EquipmentVisualizer: React.FC<EquipmentVisualizerProps> = ({ onSelectCta }) => {
  const [selectedSlug, setSelectedSlug] = useState<EquipmentCategory>('dry-van');

  const selectedEquipment = EQUIPMENT_LIST.find((item) => item.slug === selectedSlug) || EQUIPMENT_LIST[0];

  const renderTrailerIllustration = (slug: string) => {
    switch (slug) {
      case 'dry-van':
        return (
          <svg viewBox="0 0 500 200" className="w-full h-auto drop-shadow-2xl">
            {/* Ground Asphalt */}
            <line x1="20" y1="170" x2="480" y2="170" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />
            {/* Semi Cab */}
            <path d="M50 160 L50 90 L90 80 L120 80 L140 120 L150 160 Z" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            <circle cx="70" cy="160" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            <circle cx="130" cy="160" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            {/* 53FT Dry Van Enclosed Trailer */}
            <rect x="150" y="50" width="300" height="110" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
            <text x="210" y="110" fill="#f8fafc" fontSize="14" fontWeight="bold" fontFamily="monospace">53' DRY VAN TRAILER</text>
            <text x="225" y="130" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">ENCLOSED GENERAL FREIGHT</text>
            <circle cx="390" cy="160" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            <circle cx="425" cy="160" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
          </svg>
        );

      case 'reefer':
        return (
          <svg viewBox="0 0 500 200" className="w-full h-auto drop-shadow-2xl">
            <line x1="20" y1="170" x2="480" y2="170" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M50 160 L50 90 L90 80 L120 80 L140 120 L150 160 Z" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
            <circle cx="70" cy="160" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            <circle cx="130" cy="160" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            {/* Reefer Unit on Front Bulkhead */}
            <rect x="135" y="60" width="22" height="45" rx="3" fill="#06b6d4" stroke="#38bdf8" strokeWidth="1.5" />
            {/* 53FT Reefer Box */}
            <rect x="155" y="50" width="295" height="110" rx="4" fill="#0f172a" stroke="#06b6d4" strokeWidth="2.5" />
            <text x="200" y="105" fill="#f8fafc" fontSize="14" fontWeight="bold" fontFamily="monospace">53' REEFER (TEMP CONTROL)</text>
            <text x="220" y="125" fill="#38bdf8" fontSize="10" fontFamily="monospace">-20°F TO +70°F CONTINUOUS</text>
            <circle cx="390" cy="160" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            <circle cx="425" cy="160" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
          </svg>
        );

      case 'flatbed':
        return (
          <svg viewBox="0 0 500 200" className="w-full h-auto drop-shadow-2xl">
            <line x1="20" y1="170" x2="480" y2="170" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M50 160 L50 90 L90 80 L120 80 L140 120 L150 160 Z" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="70" cy="160" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            <circle cx="130" cy="160" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            {/* Flatbed Deck (Open Deck with Strapped Cargo) */}
            <rect x="150" y="130" width="300" height="15" fill="#334155" stroke="#f59e0b" strokeWidth="2" />
            {/* Cargo Blocks & Straps */}
            <rect x="180" y="80" width="80" height="50" fill="#475569" stroke="#cbd5e1" strokeWidth="1" />
            <rect x="280" y="70" width="90" height="60" fill="#475569" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="175" y1="130" x2="220" y2="80" stroke="#f59e0b" strokeWidth="2" />
            <line x1="265" y1="130" x2="220" y2="80" stroke="#f59e0b" strokeWidth="2" />
            <line x1="275" y1="130" x2="325" y2="70" stroke="#f59e0b" strokeWidth="2" />
            <line x1="375" y1="130" x2="325" y2="70" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="390" cy="160" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            <circle cx="425" cy="160" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
          </svg>
        );

      case 'hotshot':
        return (
          <svg viewBox="0 0 500 200" className="w-full h-auto drop-shadow-2xl">
            <line x1="20" y1="170" x2="480" y2="170" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />
            {/* Dually Pickup Cab */}
            <path d="M70 160 L70 115 L110 110 L130 110 L155 130 L180 135 L180 160 Z" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="95" cy="160" r="11" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            <circle cx="160" cy="160" r="11" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            {/* Gooseneck Coupler */}
            <path d="M150 135 L150 100 L200 100 L200 140 L440 140" fill="none" stroke="#f59e0b" strokeWidth="3" />
            {/* Low-Pro Trailer Deck */}
            <rect x="200" y="135" width="240" height="12" fill="#334155" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="380" cy="160" r="10" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            <circle cx="410" cy="160" r="10" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
          </svg>
        );

      case 'box-truck':
        return (
          <svg viewBox="0 0 500 200" className="w-full h-auto drop-shadow-2xl">
            <line x1="20" y1="170" x2="480" y2="170" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />
            {/* Box Truck Cab */}
            <path d="M100 160 L100 110 L130 100 L160 100 L175 125 L180 160 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="130" cy="160" r="11" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            {/* Straight Box Body */}
            <rect x="180" y="70" width="220" height="90" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
            {/* Liftgate */}
            <rect x="400" y="85" width="8" height="75" fill="#f59e0b" />
            <text x="210" y="120" fill="#f8fafc" fontSize="13" fontWeight="bold" fontFamily="monospace">26' STRAIGHT BOX</text>
            <circle cx="340" cy="160" r="11" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            <circle cx="370" cy="160" r="11" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
          </svg>
        );

      case 'sprinter':
        return (
          <svg viewBox="0 0 500 200" className="w-full h-auto drop-shadow-2xl">
            <line x1="20" y1="170" x2="480" y2="170" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />
            {/* High Roof Sprinter Van */}
            <path d="M130 160 L130 90 L240 90 L340 90 L370 125 L370 160 Z" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
            <path d="M320 100 L355 125 L320 125 Z" fill="#334155" />
            <text x="180" y="125" fill="#f8fafc" fontSize="12" fontWeight="bold" fontFamily="monospace">SPRINTER / CARGO VAN</text>
            <circle cx="170" cy="160" r="11" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            <circle cx="330" cy="160" r="11" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
          </svg>
        );

      case 'power-only':
        return (
          <svg viewBox="0 0 500 200" className="w-full h-auto drop-shadow-2xl">
            <line x1="20" y1="170" x2="480" y2="170" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />
            {/* Solo Tractor Unit */}
            <path d="M120 160 L120 80 L180 70 L210 70 L240 115 L250 160 Z" fill="#1e293b" stroke="#f59e0b" strokeWidth="2.5" />
            {/* Fifth Wheel Plate */}
            <rect x="80" y="130" width="35" height="8" rx="2" fill="#f59e0b" />
            <circle cx="140" cy="160" r="13" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            <circle cx="175" cy="160" r="13" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            <circle cx="230" cy="160" r="13" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            {/* Trailer Outline Ghost */}
            <rect x="20" y="50" width="60" height="90" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="270" y="115" fill="#f59e0b" fontSize="14" fontWeight="bold" fontFamily="monospace">POWER ONLY TRACTOR</text>
            <text x="270" y="135" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">HOOK & DROP / TOWAWAY / LOADOUT</text>
          </svg>
        );

      case 'stepdeck':
        return (
          <svg viewBox="0 0 500 200" className="w-full h-auto drop-shadow-2xl">
            <line x1="20" y1="170" x2="480" y2="170" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M50 160 L50 90 L90 80 L120 80 L140 120 L150 160 Z" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
            {/* Stepdeck Deck Geometry */}
            <path d="M150 115 L210 115 L210 140 L440 140" fill="none" stroke="#f59e0b" strokeWidth="3" />
            {/* Lower Deck Tall Cargo */}
            <rect x="230" y="60" width="130" height="80" fill="#334155" stroke="#cbd5e1" strokeWidth="1" />
            <text x="245" y="105" fill="#f8fafc" fontSize="12" fontWeight="bold">TALL MACHINERY</text>
            <circle cx="70" cy="160" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            <circle cx="130" cy="160" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            <circle cx="390" cy="160" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            <circle cx="425" cy="160" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
          </svg>
        );

      case 'rgn':
        return (
          <svg viewBox="0 0 500 200" className="w-full h-auto drop-shadow-2xl">
            <line x1="20" y1="170" x2="480" y2="170" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M40 160 L40 90 L80 80 L110 80 L130 120 L140 160 Z" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
            {/* Detachable Gooseneck + Lowboy Well */}
            <path d="M140 110 L180 110 L195 150 L380 150 L395 125 L450 125" fill="none" stroke="#f59e0b" strokeWidth="3.5" />
            {/* Excavator on Well */}
            <rect x="210" y="90" width="140" height="60" rx="4" fill="#d97706" stroke="#fef3c7" strokeWidth="1" />
            <text x="230" y="125" fill="#0f172a" fontSize="12" fontWeight="bold">HEAVY EQUIPMENT</text>
            <circle cx="60" cy="160" r="11" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            <circle cx="95" cy="160" r="11" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            <circle cx="125" cy="160" r="11" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            <circle cx="410" cy="160" r="11" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            <circle cx="435" cy="160" r="11" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* 9 Equipment Type Selector Tabs with Mobile Horizontal Swipe */}
      <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 lg:grid-cols-9 gap-2 pb-2 sm:pb-0 no-scrollbar">
        {EQUIPMENT_LIST.map((item) => {
          const isSelected = selectedSlug === item.slug;

          return (
            <button
              key={item.id}
              onClick={() => setSelectedSlug(item.slug as EquipmentCategory)}
              className={`p-3 rounded-2xl text-center transition-all duration-200 border flex flex-col items-center justify-between shrink-0 w-32 sm:w-auto ${
                isSelected
                  ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-md ring-2 ring-amber-400/20'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 shadow-xs'
              }`}
            >
              <div className={`p-2 rounded-xl mb-1.5 ${
                isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-700'
              }`}>
                <Truck className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-xs leading-tight line-clamp-1">{item.name}</span>
              <span className="text-[10px] font-mono text-blue-700 mt-1 block font-medium">{item.cdlClass}</span>
            </button>
          );
        })}
      </div>

      {/* Main Selected Equipment Showcase Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 text-slate-900">
        
        {/* Top Overview Strip */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                Fleet Category Specification
              </span>
              <span className="text-xs text-slate-500 font-mono">CDL: {selectedEquipment.cdlClass}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-950 mt-1">
              {selectedEquipment.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">{selectedEquipment.tagline}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectCta && onSelectCta(selectedEquipment.slug)}
              className="px-5 py-2.5 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-md flex items-center gap-1.5"
            >
              <span>Onboard This Equipment</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Real Commercial Photography & 2.5D Blueprint Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Real Commercial Photography Card */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-md min-h-[220px] flex items-end">
            {selectedEquipment.imageUrl && (
              <img
                src={selectedEquipment.imageUrl}
                alt={selectedEquipment.name}
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-95 contrast-105"
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
            <div className="relative z-10 p-4 text-white">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-black uppercase mb-1 inline-block">
                📸 Real Fleet Photography
              </span>
              <h4 className="font-display font-black text-lg text-white leading-tight">
                {selectedEquipment.name}
              </h4>
              <p className="text-[11px] text-slate-300 line-clamp-1">{selectedEquipment.tagline}</p>
            </div>
          </div>

          {/* 2.5D Technical Diagram Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center overflow-hidden relative">
            <div className="w-full flex items-center justify-between font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-1">
              <span>📐 2.5D Technical Blueprint</span>
              <span className="font-bold text-amber-700">{selectedEquipment.length}</span>
            </div>
            <div className="w-full max-w-md py-2">
              {renderTrailerIllustration(selectedEquipment.slug)}
            </div>
          </div>
        </div>

        {/* Specification Numbers Dials */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-500 block">Length / Deck</span>
            <span className="font-bold text-slate-950 text-sm block">{selectedEquipment.length}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-500 block">Max Payload Weight</span>
            <span className="font-bold text-slate-950 text-sm block">{selectedEquipment.weightRange}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-500 block">Example RPM Range</span>
            <span className="font-bold text-amber-700 text-sm block">{selectedEquipment.exampleRpm}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-500 block">Weekly Target Gross</span>
            <span className="font-bold text-emerald-700 text-sm block">{selectedEquipment.exampleWeeklyGross}</span>
          </div>
        </div>

        {/* Sub-variations if Box Truck */}
        {selectedEquipment.subVariations && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-mono font-bold text-blue-700 uppercase">Box Truck 3 Size Breakdown</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {selectedEquipment.subVariations.map((sub, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 shadow-2xs">
                  <span className="font-bold text-slate-950 block">{sub.size}</span>
                  <span className="text-slate-500 text-[11px] block">{sub.weight}</span>
                  <div className="pt-1 text-[11px] font-mono text-amber-700 font-bold">
                    {sub.exampleRpm} • {sub.exampleGross}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Power Only Mode Breakdown */}
        {selectedEquipment.powerOnlyFeatures && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-mono font-bold text-amber-800 uppercase">5 Power Only Operational Modes</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
              {selectedEquipment.powerOnlyFeatures.map((feat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-2 shadow-2xs">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-[11px] leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
            {selectedEquipment.interchangeNotice && (
              <p className="text-[11px] text-slate-500 italic pt-1">
                * Note: {selectedEquipment.interchangeNotice}
              </p>
            )}
          </div>
        )}

        {/* Detailed Breakdown: Required Gear & Typical Cargo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-xs">
          
          {/* Required Securement & Safety Gear */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-950 uppercase font-mono text-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Mandatory Equipment & Securement Gear</span>
            </h4>
            <ul className="space-y-1.5">
              {selectedEquipment.requiredGear.map((gear, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-600 text-[11px]">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{gear}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Typical Loads & Commodities */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-950 uppercase font-mono text-xs flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>Typical Cargo & Commodities</span>
            </h4>
            <ul className="space-y-1.5">
              {selectedEquipment.typicalLoads.map((load, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-600 text-[11px]">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{load}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* CDL & Regulatory Disclaimer Box */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 space-y-1">
          <div className="flex items-center gap-1.5 text-amber-800 font-semibold">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Licensing & Rate Disclaimer</span>
          </div>
          <p>
            {selectedEquipment.cdlGuidance} Gross revenue figures ($/week) and RPM ($/mile) are target illustrative ranges based on dynamic freight markets. Actual compensation varies by load weight, lane, fuel surcharge, and broker terms.
          </p>
        </div>

      </div>

    </div>
  );
};
