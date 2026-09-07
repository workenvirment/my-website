import React, { useState, useEffect, useCallback } from 'react';
import { Zap, UserCheck } from 'lucide-react';

interface MovingTruckCanvasProps {
  reducedMotion?: boolean;
  intensity?: 'subtle' | 'standard' | 'vivid';
}

export type TruckType = 
  | 'dry-van' 
  | 'reefer' 
  | 'flatbed' 
  | 'stepdeck' 
  | 'tanker'
  | 'box-truck' 
  | 'hotshot' 
  | 'power-only';

interface TruckConfig {
  id: TruckType;
  name: string;
  category: string;
  badgeText: string;
  color: string;
  accentColor: string;
  length: string;
  cargoDesc: string;
  driverName: string;
}

const TRUCK_CONFIGS: TruckConfig[] = [
  {
    id: 'dry-van',
    name: "53' Enclosed Dry Van",
    category: 'Class 8 Heavy Duty',
    badgeText: '53FT DRY VAN • GENERAL FREIGHT',
    color: '#0F172A',
    accentColor: '#F59E0B',
    length: "53 Feet",
    cargoDesc: '26 Pallets • Non-Perishable Commercial Cargo',
    driverName: 'Lead Driver: Marcus T. (12 Yrs CDL-A)'
  },
  {
    id: 'reefer',
    name: "53' Refrigerated Reefer",
    category: 'Class 8 Cold Chain',
    badgeText: '53FT REEFER • -10°F CONTINUOUS',
    color: '#082F49',
    accentColor: '#06B6D4',
    length: "53 Feet",
    cargoDesc: 'Thermo King Unit Active • Fresh Produce & Pharma',
    driverName: 'Lead Driver: Dave R. (8 Yrs Cold Chain)'
  },
  {
    id: 'tanker',
    name: "Dual Bulk Liquid Tanker",
    category: 'Class 8 Heavy Bulk',
    badgeText: 'DUAL STAINLESS TANKER • BULK LIQUID',
    color: '#1E293B',
    accentColor: '#38BDF8',
    length: "Dual B-Train",
    cargoDesc: 'Refinery Spec • Stainless Steel Double Tanker',
    driverName: 'Lead Driver: Robert K. (15 Yrs Hazmat)'
  },
  {
    id: 'flatbed',
    name: "48' Heavy-Haul Flatbed",
    category: 'Class 8 Open Deck',
    badgeText: '48FT FLATBED • STRAPPED STEEL & LUMBER',
    color: '#1E293B',
    accentColor: '#EA580C',
    length: "48 Feet",
    cargoDesc: 'Steel Structural Coils & 4" Ratchet Winch Straps',
    driverName: 'Lead Driver: Anthony W. (10 Yrs Flatbed)'
  },
  {
    id: 'stepdeck',
    name: "48' Drop Deck / Stepdeck",
    category: 'Class 8 Specialized Hauler',
    badgeText: 'STEPDECK • HEAVY INDUSTRIAL MACHINERY',
    color: '#1E293B',
    accentColor: '#F59E0B',
    length: "48 Feet",
    cargoDesc: 'Tracked Excavator • Grade 70 Transport Chains',
    driverName: 'Lead Driver: Sam H. (14 Yrs Heavy-Haul)'
  },
  {
    id: 'box-truck',
    name: "26' Commercial Box Truck",
    category: 'Class B / Non-CDL Expedited',
    badgeText: '26FT BOX TRUCK • HYDRAULIC LIFTGATE',
    color: '#1E1B4B',
    accentColor: '#8B5CF6',
    length: "26 Feet",
    cargoDesc: '12 Pallets • Expedited Regional Hub Delivery',
    driverName: 'Driver: Carlos M. (Expedited Regional)'
  },
  {
    id: 'hotshot',
    name: "40' Gooseneck Hotshot",
    category: 'Class 4/5 Dually Pickup + Trailer',
    badgeText: '40FT HOTSHOT • OILFIELD & INDUSTRIAL',
    color: '#0F172A',
    accentColor: '#10B981',
    length: "40 Feet",
    cargoDesc: 'Low-Pro Gooseneck Deck • Mega Ramps & Oilfield Pipe',
    driverName: 'Owner-Op: Jason P. (Hotshot Specialist)'
  },
  {
    id: 'power-only',
    name: "Class 8 Power Only Tractor",
    category: 'Class 8 Solo Tractor',
    badgeText: 'POWER ONLY • 5TH WHEEL INTERCHANGE',
    color: '#0F172A',
    accentColor: '#F59E0B',
    length: "Tractor Only",
    cargoDesc: 'Trailer Repositioning • Amazon Relay & Pre-Loaded Hook',
    driverName: 'Driver: Malik B. (Power-Only Logistics)'
  }
];

export const MovingTruckCanvas: React.FC<MovingTruckCanvasProps> = ({
  reducedMotion = false,
  intensity = 'standard'
}) => {
  const [truckIndex, setTruckIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(10);
  const isVivid = intensity === 'vivid';
  const isSubtle = intensity === 'subtle';

  const currentTruck = TRUCK_CONFIGS[truckIndex];
  const nextTruckIndex = (truckIndex + 1) % TRUCK_CONFIGS.length;
  const nextTruck = TRUCK_CONFIGS[nextTruckIndex];

  // Smooth transition when cycling truck type every 10 seconds
  const advanceTruckType = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setTruckIndex((prev) => (prev + 1) % TRUCK_CONFIGS.length);
      setIsTransitioning(false);
      setSecondsRemaining(10);
    }, 700);
  }, []);

  // 1-second countdown ticker & 10-second equipment type rotation
  useEffect(() => {
    if (reducedMotion) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          advanceTruckType();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [reducedMotion, advanceTruckType]);

  // Render trailer/truck body based on selected truck type
  const renderTruckBody = () => {
    switch (currentTruck.id) {
      case 'dry-van':
        return (
          <div className="relative w-72 sm:w-96 h-20 sm:h-26 rounded-md bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/60 shadow-2xl overflow-hidden flex flex-col justify-between p-2">
            <div className="absolute -top-1 left-4 right-4 h-1.5 bg-slate-700 rounded-t border-t border-white/20" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px)] bg-[size:12px_100%] pointer-events-none" />
            
            {/* Top Amber DOT Clearance Lights */}
            <div className="flex items-center justify-between px-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
              <span className="w-1 h-1 rounded-full bg-amber-400/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
            </div>

            {/* DGW Branding */}
            <div className="flex items-center justify-between px-3 z-10">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 text-[9px] font-black shadow-md">
                  DGW
                </div>
                <div>
                  <span className="font-display font-black text-xs sm:text-sm text-white tracking-wider block">
                    DGW SOLUTIONS LLC
                  </span>
                  <span className="text-[8px] font-mono text-amber-400 tracking-widest block font-bold">
                    53FT DRY VAN • DENVER HQ
                  </span>
                </div>
              </div>
              <span className="hidden sm:inline-block text-[8px] font-mono px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-400 border border-emerald-500/40 font-bold">
                ENCLOSED FREIGHT
              </span>
            </div>

            {/* Rear Taillights & Conspicuity Tape */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-red-600 shadow-[0_0_8px_#ef4444]" />
                <span className="w-1.5 h-1.5 rounded bg-red-600/80" />
              </div>
              <div className="flex-1 mx-3 h-1 bg-[repeating-linear-gradient(90deg,#ef4444,#ef4444_8px,#f8fafc_8px,#f8fafc_16px)] opacity-60 rounded-xs" />
            </div>

            {/* Dual Rear Tandem Axles */}
            <div className="absolute -bottom-3 left-4 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center shadow-lg">
                <div className={`w-3 h-3 rounded-full bg-slate-800 border border-slate-600 ${!reducedMotion ? 'animate-spin' : ''}`} style={{ animationDuration: '0.8s' }} />
              </div>
              <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center shadow-lg">
                <div className={`w-3 h-3 rounded-full bg-slate-800 border border-slate-600 ${!reducedMotion ? 'animate-spin' : ''}`} style={{ animationDuration: '0.8s' }} />
              </div>
            </div>
          </div>
        );

      case 'reefer':
        return (
          <div className="relative w-72 sm:w-96 h-20 sm:h-26 rounded-md bg-gradient-to-b from-sky-950 via-slate-900 to-slate-950 border border-cyan-500/40 shadow-2xl overflow-hidden flex flex-col justify-between p-2">
            <div className="absolute -left-1 top-2 w-4 h-12 rounded-l-md bg-cyan-950 border border-cyan-400 flex flex-col items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
              <span className="text-[6px] font-mono text-cyan-300 font-black rotate-90 mt-1">-10°F</span>
            </div>
            
            <div className="flex items-center justify-between px-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              <span className="w-1 h-1 rounded-full bg-cyan-400/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            </div>

            <div className="flex items-center justify-between px-4 z-10">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-cyan-500 flex items-center justify-center text-slate-950 text-[9px] font-black shadow-lg">
                  ❄️
                </div>
                <div>
                  <span className="font-display font-black text-xs sm:text-sm text-white tracking-wider block">
                    DGW COLD CHAIN REEFER
                  </span>
                  <span className="text-[8px] font-mono text-cyan-300 tracking-widest block font-bold">
                    CONTINUOUS -20°F TO +70°F
                  </span>
                </div>
              </div>
              <span className="hidden sm:inline-block text-[8px] font-mono px-2 py-0.5 rounded bg-cyan-950/90 text-cyan-300 border border-cyan-400/50 font-bold">
                PRODUCE / PHARMA
              </span>
            </div>

            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-red-600 shadow-[0_0_8px_#ef4444]" />
              </div>
              <div className="flex-1 mx-3 h-1 bg-[repeating-linear-gradient(90deg,#ef4444,#ef4444_8px,#f8fafc_8px,#f8fafc_16px)] opacity-60 rounded-xs" />
            </div>

            <div className="absolute -bottom-3 left-4 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-cyan-600 flex items-center justify-center shadow-lg">
                <div className={`w-3 h-3 rounded-full bg-slate-800 border border-cyan-400 ${!reducedMotion ? 'animate-spin' : ''}`} style={{ animationDuration: '0.8s' }} />
              </div>
              <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-cyan-600 flex items-center justify-center shadow-lg">
                <div className={`w-3 h-3 rounded-full bg-slate-800 border border-cyan-400 ${!reducedMotion ? 'animate-spin' : ''}`} style={{ animationDuration: '0.8s' }} />
              </div>
            </div>
          </div>
        );

      case 'tanker':
        return (
          <div className="relative w-72 sm:w-96 h-20 sm:h-26 flex flex-col justify-end">
            {/* Dual Stainless Steel Cylindrical Tanker Shells */}
            <div className="relative w-full h-14 flex items-center justify-between px-2 mb-1 gap-2">
              {/* Tanker 1: Stainless Chrome Tank */}
              <div className="flex-1 h-12 rounded-2xl bg-gradient-to-b from-slate-200 via-slate-400 to-slate-700 border border-slate-300 shadow-xl relative flex flex-col justify-between p-1.5 overflow-hidden">
                <div className="absolute top-1 left-0 right-0 h-1 bg-white/70 blur-xs" />
                <div className="flex items-center justify-between">
                  <span className="text-[7px] font-mono font-black text-slate-950">DGW BULK TANKER 01</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                </div>
                <div className="flex items-center justify-between text-[6px] font-mono text-slate-900 font-bold">
                  <span>STAINLESS 316L</span>
                  <span className="px-1 bg-slate-950 text-white rounded">HAZMAT SPEC</span>
                </div>
              </div>

              {/* Tanker 2: Second Connected Tank */}
              <div className="w-32 h-12 rounded-2xl bg-gradient-to-b from-slate-200 via-slate-400 to-slate-700 border border-slate-300 shadow-xl relative flex flex-col justify-between p-1.5 overflow-hidden">
                <div className="absolute top-1 left-0 right-0 h-1 bg-white/70 blur-xs" />
                <div className="flex items-center justify-between">
                  <span className="text-[7px] font-mono font-black text-slate-950">TANKER 02</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                </div>
                <span className="text-[6px] font-mono text-slate-900 font-bold">DOUBLE TRAIN</span>
              </div>
            </div>

            {/* Heavy Chassis Rail */}
            <div className="w-full h-3.5 rounded-sm bg-slate-950 border-t border-amber-500 flex items-center justify-between px-3">
              <span className="text-[7px] font-mono text-slate-300 font-bold">DGW LIQUID BULK • REFINERY CORRIDOR</span>
              <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_6px_#ef4444]" />
            </div>

            {/* Multi-Axles */}
            <div className="absolute -bottom-3 left-4 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-slate-600 flex items-center justify-center shadow-lg">
                <div className={`w-3 h-3 rounded-full bg-slate-800 ${!reducedMotion ? 'animate-spin' : ''}`} style={{ animationDuration: '0.8s' }} />
              </div>
              <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-slate-600 flex items-center justify-center shadow-lg">
                <div className={`w-3 h-3 rounded-full bg-slate-800 ${!reducedMotion ? 'animate-spin' : ''}`} style={{ animationDuration: '0.8s' }} />
              </div>
              <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-slate-600 flex items-center justify-center shadow-lg">
                <div className={`w-3 h-3 rounded-full bg-slate-800 ${!reducedMotion ? 'animate-spin' : ''}`} style={{ animationDuration: '0.8s' }} />
              </div>
            </div>
          </div>
        );

      case 'flatbed':
        return (
          <div className="relative w-72 sm:w-96 h-20 sm:h-26 flex flex-col justify-end">
            <div className="relative w-full h-14 flex items-end justify-around px-6 mb-1">
              {/* Steel Coils */}
              <div className="w-16 h-11 rounded-t-lg bg-gradient-to-t from-slate-600 via-slate-400 to-slate-200 border border-slate-300 relative shadow-md flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-400" />
                <div className="absolute inset-y-0 w-1.5 bg-amber-500 shadow-sm left-4" />
                <div className="absolute inset-y-0 w-1.5 bg-amber-500 shadow-sm right-4" />
              </div>
              {/* Beams */}
              <div className="w-24 h-12 rounded-t bg-gradient-to-t from-amber-900 via-amber-700 to-amber-600 border border-amber-500/40 relative shadow-md p-1">
                <span className="text-[7px] font-mono text-amber-200 font-bold block">48FT STEEL/LUMBER</span>
                <div className="absolute inset-y-0 w-1.5 bg-amber-400 left-3" />
                <div className="absolute inset-y-0 w-1.5 bg-amber-400 right-3" />
                <div className="absolute -top-2 -right-1 w-2.5 h-2 bg-red-600 rounded-xs shadow-xs" />
              </div>
            </div>
            
            <div className="w-full h-4 rounded-sm bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-t border-b border-amber-500/60 shadow-lg relative flex items-center justify-between px-3">
              <span className="text-[8px] font-mono text-white font-bold tracking-wider">DGW HEAVY HAUL FLATBED</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              </div>
            </div>

            <div className="absolute -bottom-3 left-6 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center shadow-lg">
                <div className={`w-3 h-3 rounded-full bg-slate-800 border border-slate-600 ${!reducedMotion ? 'animate-spin' : ''}`} style={{ animationDuration: '0.8s' }} />
              </div>
              <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center shadow-lg">
                <div className={`w-3 h-3 rounded-full bg-slate-800 border border-slate-600 ${!reducedMotion ? 'animate-spin' : ''}`} style={{ animationDuration: '0.8s' }} />
              </div>
            </div>
          </div>
        );

      case 'stepdeck':
        return (
          <div className="relative w-72 sm:w-96 h-20 sm:h-26 flex flex-col justify-end">
            <div className="relative w-full h-15 flex items-end justify-between px-4 mb-1">
              <div className="w-16 h-6 rounded-t bg-slate-700 border border-slate-500 p-1">
                <span className="text-[6px] font-mono text-amber-300 font-bold block">UPPER DECK</span>
              </div>
              <div className="flex-1 h-14 ml-1 rounded-t-lg bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400 border border-amber-300 shadow-xl relative flex flex-col justify-between p-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-mono font-black text-slate-950">HEAVY MACHINERY HAULER</span>
                  <span className="text-[7px] font-mono px-1 bg-slate-950 text-amber-400 rounded font-bold">46K LBS</span>
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,#334155_45%,#334155_55%,transparent_60%)] pointer-events-none" />
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-slate-950 border border-amber-300" />
                  <div className="w-4 h-4 rounded-full bg-slate-950 border border-amber-300" />
                </div>
              </div>
            </div>

            <div className="w-full h-4 bg-slate-900 border-t-2 border-amber-500 flex items-center justify-between px-3">
              <span className="text-[7px] font-mono text-slate-300">DGW STEPDECK • SPECIALIZED LOW WELL</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_6px_#ef4444]" />
            </div>

            <div className="absolute -bottom-3 left-4 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center shadow-lg">
                <div className={`w-3 h-3 rounded-full bg-slate-800 border border-slate-600 ${!reducedMotion ? 'animate-spin' : ''}`} style={{ animationDuration: '0.8s' }} />
              </div>
              <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center shadow-lg">
                <div className={`w-3 h-3 rounded-full bg-slate-800 border border-slate-600 ${!reducedMotion ? 'animate-spin' : ''}`} style={{ animationDuration: '0.8s' }} />
              </div>
            </div>
          </div>
        );

      case 'box-truck':
        return (
          <div className="relative w-60 sm:w-72 h-18 sm:h-24 rounded-md bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 border border-indigo-400/50 shadow-2xl overflow-hidden flex flex-col justify-between p-2">
            <div className="absolute -left-1 top-1 bottom-1 w-2 rounded-l bg-amber-500 flex items-center justify-center">
              <span className="text-[5px] font-mono text-slate-950 font-black rotate-90">LIFTGATE</span>
            </div>
            
            <div className="flex items-center justify-between px-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-[8px] font-mono text-indigo-300 font-bold">26FT STRAIGHT BOX</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            </div>

            <div className="px-2 z-10">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-indigo-600 text-white font-black text-[8px] flex items-center justify-center">
                  26'
                </div>
                <div>
                  <span className="text-xs font-display font-black text-white block">DGW EXPEDITED</span>
                  <span className="text-[7px] font-mono text-indigo-300 block">REGIONAL & LIFTGATE FREIGHT</span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-3 left-6 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center shadow-lg">
                <div className={`w-3 h-3 rounded-full bg-slate-800 border border-slate-600 ${!reducedMotion ? 'animate-spin' : ''}`} style={{ animationDuration: '0.8s' }} />
              </div>
            </div>
          </div>
        );

      case 'hotshot':
        return (
          <div className="relative w-64 sm:w-80 h-16 sm:h-20 flex flex-col justify-end">
            <div className="relative w-full h-8 flex items-center justify-around px-4 mb-1">
              <div className="w-32 h-6 rounded bg-slate-700 border border-amber-400 relative flex items-center justify-center shadow-sm">
                <span className="text-[7px] font-mono text-white font-bold">40FT GOOSENECK</span>
                <div className="absolute inset-y-0 w-1 bg-amber-500 left-6" />
                <div className="absolute inset-y-0 w-1 bg-amber-500 right-6" />
              </div>
              <div className="w-10 h-6 bg-slate-800 border border-slate-600 rounded-r flex items-center justify-center">
                <span className="text-[6px] font-mono text-amber-300">RAMPS</span>
              </div>
            </div>

            <div className="w-full h-3 bg-slate-950 border-t border-amber-500 flex items-center justify-between px-2">
              <span className="text-[7px] font-mono text-slate-300">DGW HOTSHOT RIG • DUAL AXLES</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            </div>

            <div className="absolute -bottom-3 left-6 flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-slate-950 border-2 border-slate-600 flex items-center justify-center shadow-lg">
                <div className={`w-2.5 h-2.5 rounded-full bg-slate-800 ${!reducedMotion ? 'animate-spin' : ''}`} style={{ animationDuration: '0.8s' }} />
              </div>
              <div className="w-5 h-5 rounded-full bg-slate-950 border-2 border-slate-600 flex items-center justify-center shadow-lg">
                <div className={`w-2.5 h-2.5 rounded-full bg-slate-800 ${!reducedMotion ? 'animate-spin' : ''}`} style={{ animationDuration: '0.8s' }} />
              </div>
            </div>
          </div>
        );

      case 'power-only':
        return (
          <div className="relative w-40 sm:w-48 h-18 sm:h-22 rounded-md bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-amber-500/40 shadow-2xl flex flex-col justify-between p-2">
            <div className="absolute -top-2 left-4 w-12 h-3 bg-amber-500 rounded-t-sm border border-amber-300 flex items-center justify-center shadow-md">
              <span className="text-[6px] font-mono text-slate-950 font-black">5TH WHEEL</span>
            </div>
            
            <div className="absolute top-2 left-18 flex items-center gap-1">
              <span className="w-1.5 h-4 rounded-full bg-red-500" />
              <span className="w-1.5 h-4 rounded-full bg-blue-500" />
            </div>

            <div className="pt-2 px-1">
              <span className="text-[9px] font-display font-black text-white block">POWER ONLY TRACTOR</span>
              <span className="text-[7px] font-mono text-amber-400 block font-bold">TRAILER REPOSITIONING</span>
            </div>

            <div className="absolute -bottom-3 left-3 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center shadow-lg">
                <div className={`w-3 h-3 rounded-full bg-slate-800 border border-slate-600 ${!reducedMotion ? 'animate-spin' : ''}`} style={{ animationDuration: '0.8s' }} />
              </div>
              <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center shadow-lg">
                <div className={`w-3 h-3 rounded-full bg-slate-800 border border-slate-600 ${!reducedMotion ? 'animate-spin' : ''}`} style={{ animationDuration: '0.8s' }} />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* 1. Distant Horizon Mountain Highway Lane with Distant Moving Truck Convoy */}
      <div 
        className="absolute bottom-[20%] left-0 right-0 h-10 overflow-hidden opacity-35"
        style={{
          transform: 'perspective(700px) rotateX(25deg)'
        }}
      >
        <div className="absolute inset-0 bg-slate-900/60 border-t border-b border-white/5" />
        
        {!reducedMotion && (
          <div 
            className="absolute top-1 flex items-center gap-8 animate-distant-truck"
            style={{
              animationDuration: '44s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite'
            }}
          >
            {/* Distant Lead Rig */}
            <div className="w-14 h-4 rounded bg-slate-700/90 border border-slate-500/40 relative shadow-sm">
              <div className="absolute -right-3 bottom-0 w-3.5 h-3.5 bg-slate-600 rounded-r border border-slate-400/40" />
              <div className="absolute -right-4 top-1 w-5 h-2 bg-amber-300/50 blur-xs rounded-r-full" />
              <div className="absolute left-0 top-0.5 w-1 h-1 bg-red-500 rounded-full shadow-[0_0_4px_#ef4444]" />
            </div>

            {/* Distant Second Trailing Rig */}
            <div className="w-12 h-3.5 rounded bg-slate-800/90 border border-slate-500/40 relative shadow-sm">
              <div className="absolute -right-2.5 bottom-0 w-3 h-3 bg-slate-600 rounded-r" />
              <div className="absolute -right-4 top-1 w-4 h-1.5 bg-amber-300/40 blur-xs rounded-r-full" />
              <div className="absolute left-0 top-0.5 w-1 h-1 bg-red-500 rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* 2. Primary Lower Interstate Highway Corridor (Foreground Layer) */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-36 sm:h-44 overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.08) 0%, rgba(10, 15, 26, 0.6) 40%, rgba(7, 10, 15, 0.95) 100%)'
        }}
      >
        <div className="absolute top-6 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        {/* Highway Moving Centerline Dashes */}
        <div className="absolute top-16 left-0 right-0 h-1.5 flex items-center justify-around overflow-hidden opacity-60">
          {[...Array(24)].map((_, i) => (
            <span
              key={i}
              className={`w-12 h-1 bg-amber-400/80 rounded-full shrink-0 shadow-[0_0_6px_rgba(251,191,36,0.4)] ${
                !reducedMotion ? 'animate-highway-dash' : ''
              }`}
              style={{
                animationDuration: '2.0s',
                animationDelay: `${(i * 0.08).toFixed(2)}s`
              }}
            />
          ))}
        </div>

        <div className="absolute bottom-4 left-0 right-0 h-[1px] bg-white/5" />
      </div>

      {/* 3. SECONDARY TRAILING TRUCK (Silver Tanker Rig cruising parallel in Lane 2) */}
      {!reducedMotion && (
        <div 
          className="absolute bottom-14 sm:bottom-18 z-5 animate-secondary-truck opacity-75 pointer-events-none scale-85"
          style={{
            animationDuration: '58s',
            animationDelay: '14s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }}
        >
          <div className="relative flex items-end">
            {/* Trailing Silver Tanker Trailer */}
            <div className="relative w-64 h-16 rounded-xl bg-gradient-to-b from-slate-300 via-slate-400 to-slate-700 border border-slate-200 shadow-xl flex flex-col justify-between p-2">
              <div className="flex items-center justify-between">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-[7px] font-mono text-slate-900 font-black">DGW TANKER CORRIDOR</span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              </div>
              <div className="text-[6px] font-mono text-slate-800 font-bold px-1">LANE 2 • SECONDARY FLEET RIG</div>
              {/* Wheels */}
              <div className="absolute -bottom-3 left-4 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-slate-950 border border-slate-500 animate-spin" style={{ animationDuration: '0.8s' }} />
                <div className="w-5 h-5 rounded-full bg-slate-950 border border-slate-500 animate-spin" style={{ animationDuration: '0.8s' }} />
              </div>
            </div>

            {/* Sleeper Cab for Trailing Rig with Driver Silhouette */}
            <div className="relative -ml-1 w-24 h-16 rounded-r-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-r border-b border-cyan-400/40 shadow-xl flex flex-col justify-between p-2">
              <div className="flex justify-end pt-0.5">
                {/* Windshield with Visible Driver */}
                <div className="w-10 h-6 rounded-tr-lg bg-slate-950 border border-cyan-500/30 relative overflow-hidden flex items-end justify-center">
                  {/* Driver Silhouette in Trailing Cab */}
                  <div className="relative w-4 h-4 mb-0.5 flex flex-col items-center">
                    <div className="w-2 h-1.5 bg-slate-400 rounded-t-sm" /> {/* Cap */}
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" /> {/* Head */}
                    <div className="w-3 h-1.5 bg-slate-500 rounded-t" /> {/* Shoulders */}
                    {/* Steering Wheel */}
                    <div className="absolute -right-0.5 bottom-0 w-2 h-2 rounded-full border border-amber-300/70" />
                  </div>
                </div>
              </div>
              {/* Steer Axle */}
              <div className="absolute -bottom-3 right-2">
                <div className="w-5 h-5 rounded-full bg-slate-950 border border-slate-600 animate-spin" style={{ animationDuration: '0.8s' }} />
              </div>
              {/* Headlight */}
              <div className="absolute bottom-2 -right-1">
                <span className="w-2 h-1.5 rounded-r bg-amber-300 shadow-[0_0_8px_#fde047] block" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. PRIMARY DYNAMIC COMMERCIAL RIG (Cycles truck types smoothly every 10 seconds with visible driver!) */}
      <div 
        className={`absolute bottom-6 sm:bottom-10 z-10 ${
          !reducedMotion ? 'animate-main-truck' : 'left-[15%]'
        } ${isTransitioning ? 'opacity-90 scale-[0.99] transition-all duration-700' : 'opacity-100'}`}
        style={{
          animationDuration: '30s', // Smooth, majestic cruising highway pace
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite'
        }}
      >
        <div 
          className={`relative ${!reducedMotion ? 'animate-truck-suspension' : ''}`}
          style={{ animationDuration: '3.6s' }}
        >
          {/* Main Truck Assembly */}
          <div className="relative flex items-end">
            
            {/* Dynamic Trailer/Body Configuration */}
            {renderTruckBody()}

            {/* Sleeper Cab Semi Tractor (For Class 8 Rigs & Power Only) with REALISTIC VISIBLE DRIVER */}
            {currentTruck.id !== 'box-truck' && (
              <div className="relative -ml-1 w-26 sm:w-34 h-19 sm:h-23 rounded-r-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-r border-b border-amber-500/50 shadow-2xl flex flex-col justify-between p-2">
                {/* Cab Aero Fairing */}
                <div className="absolute -top-3 left-0 w-18 h-3.5 bg-slate-800 rounded-t-md border-t border-white/20" />
                {/* Dual Chrome Exhaust Stacks */}
                <div className="absolute -top-7 left-2 w-1.5 h-8 bg-gradient-to-t from-slate-500 via-slate-200 to-white rounded-t shadow-sm" />
                <div className="absolute -top-7 left-4 w-1.5 h-8 bg-gradient-to-t from-slate-500 via-slate-200 to-white rounded-t shadow-sm" />
                
                {/* Windshield & Cockpit with CLEARLY VISIBLE DRIVER */}
                <div className="flex justify-end pt-1">
                  <div className="w-12 sm:w-16 h-7 sm:h-9 rounded-tr-lg bg-gradient-to-tr from-slate-950 via-slate-900 to-sky-950 border border-sky-400/40 shadow-inner relative overflow-hidden flex items-end justify-center">
                    {/* Dashboard Instrument Cluster Glowing Green & Cyan */}
                    <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500/30 via-cyan-400/40 to-amber-400/30 blur-xs" />
                    
                    {/* VISIBLE DRIVER SILHOUETTE INSIDE CABIN */}
                    <div className="relative w-8 h-7 mb-0.5 flex flex-col items-center justify-end z-10">
                      {/* Driver's Trucker Cap / Hat Bill */}
                      <div className="w-3.5 h-1 bg-amber-400 rounded-t-xs -mb-0.5 ml-1 shadow-xs" />
                      {/* Driver Head Profile */}
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-200 border border-slate-700 shadow-xs" />
                      {/* Driver Torso / Vest with High-Vis Stripes */}
                      <div className="w-5 h-3 bg-gradient-to-b from-amber-500 to-slate-800 rounded-t-md relative flex items-center justify-center">
                        <div className="w-3.5 h-0.5 bg-white/80" />
                      </div>
                      {/* Hands Holding Steering Wheel */}
                      <div className="absolute -right-1 bottom-1 w-3.5 h-3.5 rounded-full border-2 border-slate-300/80 rotate-12 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full blur-xs" />
                      </div>
                    </div>

                    {/* Subtle Windshield Sun Flare */}
                    <div className="absolute top-0 right-1 w-6 h-6 bg-gradient-to-bl from-white/20 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Chrome Front Grill */}
                <div className="flex items-center justify-end pr-1">
                  <div className="w-3.5 h-7 bg-gradient-to-b from-slate-400 via-slate-100 to-slate-500 rounded-r-md border border-white/50 shadow-md" />
                </div>

                {/* Steer Axle */}
                <div className="absolute -bottom-3 right-3 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center shadow-lg">
                    <div className={`w-3 h-3 rounded-full bg-slate-800 border border-slate-600 ${!reducedMotion ? 'animate-spin' : ''}`} style={{ animationDuration: '0.8s' }} />
                  </div>
                </div>

                {/* High-Power LED Headlights */}
                <div className="absolute bottom-3 -right-2 flex flex-col gap-1">
                  <span className="w-3.5 h-2 rounded-r-full bg-amber-300 shadow-[0_0_16px_#fde047]" />
                  <span className="w-3 h-1.5 rounded-r-full bg-amber-100 shadow-[0_0_12px_#fef08a]" />
                </div>

                {/* Forward Headlight Beam Cone */}
                <div 
                  className={`absolute bottom-0 left-full w-56 sm:w-96 h-18 sm:h-28 bg-gradient-to-r ${
                    isVivid 
                      ? 'from-amber-200/45 via-amber-300/20 to-transparent' 
                      : isSubtle
                      ? 'from-amber-200/20 via-amber-300/08 to-transparent'
                      : 'from-amber-200/30 via-amber-300/12 to-transparent'
                  } blur-md rounded-r-full pointer-events-none -mt-4`}
                  style={{
                    clipPath: 'polygon(0 30%, 100% 0%, 100% 100%, 0 70%)',
                    transform: 'rotate(-2deg)'
                  }}
                />
                <div className="absolute -bottom-6 left-full w-48 h-10 bg-amber-400/20 blur-lg rounded-full pointer-events-none" />
              </div>
            )}

            {/* Conventional Cab for 26ft Box Truck with VISIBLE DRIVER */}
            {currentTruck.id === 'box-truck' && (
              <div className="relative -ml-1 w-22 sm:w-28 h-17 sm:h-21 rounded-r-lg bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-r border-b border-indigo-400/40 shadow-2xl flex flex-col justify-between p-2">
                <div className="flex justify-end pt-1">
                  {/* Box Truck Windshield with Driver */}
                  <div className="w-9 sm:w-12 h-6 sm:h-7 rounded-tr bg-sky-950 border border-sky-400/30 relative flex items-end justify-center overflow-hidden">
                    <div className="relative w-6 h-5 flex flex-col items-center justify-end z-10">
                      <div className="w-2.5 h-1 bg-indigo-400 rounded-t-xs" />
                      <div className="w-2 h-2 rounded-full bg-slate-200" />
                      <div className="w-4 h-2 bg-slate-700 rounded-t" />
                      <div className="absolute -right-0.5 bottom-0 w-2.5 h-2.5 rounded-full border border-white/60" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-end pr-1">
                  <div className="w-2.5 h-6 bg-slate-300 rounded-r" />
                </div>

                <div className="absolute -bottom-3 right-2">
                  <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center shadow-lg">
                    <div className={`w-3 h-3 rounded-full bg-slate-800 ${!reducedMotion ? 'animate-spin' : ''}`} style={{ animationDuration: '0.8s' }} />
                  </div>
                </div>

                <div className="absolute bottom-2 -right-2">
                  <span className="w-3 h-2 rounded-r-full bg-amber-300 shadow-[0_0_12px_#fde047] block" />
                </div>

                <div 
                  className="absolute bottom-0 left-full w-48 sm:w-72 h-16 sm:h-22 bg-gradient-to-r from-amber-200/30 via-amber-300/12 to-transparent blur-md rounded-r-full pointer-events-none -mt-4"
                  style={{
                    clipPath: 'polygon(0 30%, 100% 0%, 100% 100%, 0 70%)'
                  }}
                />
              </div>
            )}

          </div>
        </div>
      </div>

      {/* 5. Truck Telematics HUD: Live 10s Countdown & Equipment Type Switcher (Bottom Center) */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-30 pointer-events-auto hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/90 backdrop-blur-md border border-white/15 text-[10px] font-mono shadow-2xl">
        <div className="flex items-center gap-1.5 pr-2 border-r border-white/15 text-amber-400 font-bold">
          <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>{currentTruck.name.toUpperCase()}</span>
        </div>

        {/* 10-Second Countdown Badge */}
        <div className="flex items-center gap-1.5 pr-2 border-r border-white/15 text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>CHANGES IN: {secondsRemaining}s ➔ {nextTruck.name.split(' ')[0]}</span>
        </div>

        <div className="flex items-center gap-1 pr-2 border-r border-white/15 text-slate-300">
          <UserCheck className="w-3 h-3 text-emerald-400" />
          <span className="text-[9px] text-emerald-300">{currentTruck.driverName}</span>
        </div>
        
        {/* Manual Equipment Selector */}
        <div className="flex items-center gap-1">
          {TRUCK_CONFIGS.map((cfg, idx) => (
            <button
              key={cfg.id}
              onClick={() => {
                setTruckIndex(idx);
                setSecondsRemaining(10);
              }}
              className={`px-2 py-0.5 rounded-md font-bold transition-all text-[9px] ${
                truckIndex === idx
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title={`Switch cruising truck to ${cfg.name}`}
            >
              {cfg.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

