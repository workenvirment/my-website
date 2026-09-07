import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Phone
} from 'lucide-react';
import { DgwButton } from '../components/common/DgwButton';
import { EquipmentVisualizer } from '../components/equipment/EquipmentVisualizer';

interface EquipmentPageProps {
  onNavigate: (path: string) => void;
}

export const EquipmentPage: React.FC<EquipmentPageProps> = ({ onNavigate }) => {
  const equipment = [
    {
      name: '53ft Dry Van',
      category: 'Class A CDL',
      gross: '$5,500 – $8,500 / week',
      rpm: '$2.30 – $3.10 / mile',
      weight: 'Up to 45,000 lbs',
      image: '/images/dryvan_trailer.jpg',
      dims: '53’ Length × 102” Width × 110” Interior Height (26–30 Standard Pallets)',
      desc: 'The backbone of American freight. Enclosed transportation for general retail merchandise, packaged goods, paper, plastics, and non-perishables.',
      gear: ['E-Track Straps (2–4 minimum)', 'Load Lock Bars (2–4)', 'Rubber Pallet Friction Mats'],
      typicalLanes: 'Midwest, Texas, Southeast, East Coast, Cross-Country Interstate Corridors'
    },
    {
      name: '53ft Reefer (Refrigerated)',
      category: 'Class A CDL',
      gross: '$6,500 – $10,000 / week',
      rpm: '$2.60 – $3.80 / mile',
      weight: 'Up to 44,000 lbs',
      image: '/images/reefer_trailer.jpg',
      dims: '53’ Length × 102” Width (Temperature Range: -20°F to +70°F)',
      desc: 'High-paying, recession-proof freight. Continuous temperature monitoring for fresh produce, frozen foods, meat, poultry, dairy, beverages, and pharmaceuticals.',
      gear: ['Pre-Cooling Protocol Knowledge', 'Pulp Thermometer', 'Clean Washout Receipts'],
      typicalLanes: 'California, Pacific Northwest, Texas, Florida, Midwest Agricultural Hubs'
    },
    {
      name: '48ft / 53ft Flatbed',
      category: 'Class A CDL',
      gross: '$6,000 – $9,500 / week',
      rpm: '$2.70 – $3.90 / mile',
      weight: 'Up to 48,000 lbs',
      image: '/images/flatbed_trailer.jpg',
      dims: '48’ to 53’ Deck Length × 102” Width (Standard 5’ Deck Height)',
      desc: 'Open deck freight loaded by cranes or forklifts from the side. High demand for building materials, steel coils, lumber, pipe, precast concrete, and heavy machinery.',
      gear: ['4” Winch Straps (8–12)', 'Grade 70 Transport Chains & Binders', '8ft Lumber / Steel Tarps', 'Corner Edge Protectors'],
      typicalLanes: 'Rust Belt, Texas Industrial, Southeast, Gulf Coast Manufacturing'
    },
    {
      name: 'Stepdeck / Drop Deck',
      category: 'Class A Specialized',
      gross: '$6,500 – $10,500 / week',
      rpm: '$2.80 – $4.10 / mile',
      weight: 'Up to 46,000 lbs',
      image: '/images/stepdeck_excavator.jpg',
      dims: '10’ Upper Deck + 38’ to 43’ Lower Well (Lower Deck Height: 36” to 40”)',
      desc: 'Specialized low-profile deck designed for taller machinery, tractors, industrial tanks, and modular structures that exceed legal height limits on standard flatbeds.',
      gear: ['Heavy-Duty Chains & Ratchet Binders', 'Ramps (optional for roll-on/off)', 'Custom Stepdeck Tarps'],
      typicalLanes: 'Heavy Industrial, Construction Sites, Agricultural Equipment Corridors'
    },
    {
      name: '26ft Box Truck',
      category: 'Non-CDL (Under 26k GVWR) / Class B',
      gross: '$3,500 – $6,500 / week',
      rpm: '$2.00 – $2.80 / mile',
      weight: 'Up to 10,000 lbs (Non-CDL: 6,000–8,500 lbs)',
      image: '/images/boxtruck_delivery.jpg',
      dims: '26’ Box Length × 102” Width × 96”–102” Height (12 Standard Pallets)',
      desc: 'Ideal for regional distribution, expedited business-to-business freight, residential liftgate deliveries, airport cargo, and final-mile logistics.',
      gear: ['Hydraulic Tuck-Under Liftgate', 'Pallet Jack', 'E-Track Ratchet Straps (4)', 'Moving Blankets'],
      typicalLanes: 'Regional 300–600 mile radius around major metro hubs'
    },
    {
      name: '40ft Hotshot (Gooseneck)',
      category: 'Class A CDL / Non-CDL',
      gross: '$4,500 – $7,500 / week',
      rpm: '$2.20 – $3.20 / mile',
      weight: 'Up to 16,500 lbs Payload (Class 4/5 Dually Pickup + 40ft Trailer)',
      image: '/images/hotshot_rig.jpg',
      dims: '40’ Deck (Typically 35’ Flat + 5’ Dovetail with Spring Assist Ramps)',
      desc: 'Fast, agile, fuel-efficient open deck transport. Highly sought after for oilfield pipe, building materials, agricultural implements, and time-critical machinery.',
      gear: ['Mega Ramps', 'Winch Straps (6–8)', 'Chains & Lever Binders', 'Hotshot Tarps'],
      typicalLanes: 'Texas Oilfields, Midwest, Great Plains, Mountain West'
    },
    {
      name: 'Power Only (Tractor)',
      category: 'Class A CDL',
      gross: '$4,000 – $7,000 / week',
      rpm: '$2.10 – $3.00 / mile',
      weight: 'Tractor with 5th Wheel & Sliding Hitch',
      image: '/images/fleet_sunset_row.jpg',
      dims: 'Pulling Shipper-Owned / Broker-Owned 53ft Trailers, Intermodal, or Relays',
      desc: 'Eliminate trailer maintenance costs. You provide the commercial tractor, and we book pre-loaded shipper trailers, Amazon relays, and OEM equipment repositioning.',
      gear: ['Valid Interchange Agreement Knowledge', 'Clean 5th Wheel Plate', 'Gladhand Couplers & Air Lines'],
      typicalLanes: 'Interstate Hub-to-Hub, Dedicated Shippers, Port Relays'
    },
    {
      name: 'Heavy Haul & Dual Tanker Fleet',
      category: 'Class A Specialized Tanker',
      gross: '$7,500 – $14,000 / week',
      rpm: '$3.20 – $4.50 / mile',
      weight: 'Up to 50,000 lbs (Liquid / Permitted Bulk)',
      image: '/images/tanker_night_refinery.jpg',
      dims: 'Dual Stainless Steel Tankers & Multi-Axle Lowboy Rigs',
      desc: 'Dedicated tanker and specialized heavy haul transport for industrial refineries, chemical freight, liquid food grade, and oversized plant machinery.',
      gear: ['Tanker Endorsement & HME', 'Vapor Recovery Lines', 'Safety Spill Kits & PPE'],
      typicalLanes: 'Refinery Corridors, Texas Gulf Coast, Industrial Midwest'
    }
  ];

  return (
    <div className="space-y-16 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-mono font-bold uppercase shadow-xs">
          Equipment Directory & Specifications
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-950 tracking-tight">
          Equipment Types We Dispatch
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          From 53ft Dry Vans and Reefers to Flatbeds, Box Trucks, Hotshots, Power Only, and Heavy Bulk Tankers — explore authentic commercial photography, payload capacities, mandatory gear, and target weekly gross earnings.
        </p>
      </div>

      {/* Interactive 2.5D Equipment Visualizer */}
      <section className="space-y-4">
        <EquipmentVisualizer onSelectCta={() => onNavigate('/contact')} />
      </section>

      {/* Equipment Detailed Cards Section Header */}
      <div className="border-b border-slate-200 pb-4 pt-4">
        <span className="text-xs font-mono font-bold text-amber-700 uppercase">Complete Equipment Breakdown</span>
        <h2 className="text-2xl font-display font-black text-slate-950 mt-1">
          Detailed Equipment Profiles & Real Fleet Photography
        </h2>
      </div>

      {/* Equipment List */}
      <div className="space-y-8">
        {equipment.map((item, index) => (
          <div 
            key={index}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all space-y-6 overflow-hidden"
          >
            {/* Top Row: Real Photo + Title + Weekly Gross */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 pb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Real Equipment Photo */}
                <div className="w-full sm:w-36 h-28 rounded-2xl overflow-hidden border border-slate-200 shadow-sm shrink-0 bg-slate-900 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
                    loading="lazy"
                  />
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-slate-950/80 text-[8px] font-mono text-amber-400 font-bold">
                    REAL PHOTO
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300 text-[10px] font-mono font-bold uppercase">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">Class #0{index + 1}</span>
                  </div>
                  <h3 className="text-2xl font-display font-black text-slate-950">{item.name}</h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-xl leading-relaxed">{item.desc}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-right shrink-0">
                <span className="text-[10px] font-mono text-amber-800 uppercase font-bold block">Target Weekly Gross</span>
                <span className="text-lg sm:text-xl font-display font-black text-slate-950">{item.gross}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed">
              {item.desc}
            </p>

            {/* Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase block">Target RPM Range</span>
                <span className="font-bold text-amber-700 text-sm block">{item.rpm}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase block">Max Payload Weight</span>
                <span className="font-bold text-slate-800 text-sm block">{item.weight}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase block">Dimensions & Capacity</span>
                <span className="font-bold text-slate-800 text-xs block">{item.dims}</span>
              </div>
            </div>

            {/* Required Gear & Lanes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-950 uppercase font-mono text-[11px] block">
                  Mandatory Equipment / Gear:
                </span>
                <div className="space-y-1">
                  {item.gear.map((g, gi) => (
                    <div key={gi} className="flex items-center gap-2 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{g}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-950 uppercase font-mono text-[11px] block">
                  Primary Freight Lanes:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {item.typicalLanes}
                </p>
              </div>
            </div>

            {/* Card Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-slate-500">
                Ready to roll this equipment with DGW Solutions?
              </span>
              <DgwButton
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4 text-amber-400" />}
                onClick={() => onNavigate('/contact')}
              >
                Dispatch My {item.name.split(' ')[0]}
              </DgwButton>
            </div>

          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-2xl font-display font-black text-white">Have a Different Equipment Setup?</h3>
          <p className="text-xs sm:text-sm text-slate-300">Call our Denver dispatch desk to discuss custom lanes and rates.</p>
        </div>
        <a
          href="tel:+18003495623"
          className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>Call +1 (800) DGW-LOAD</span>
        </a>
      </div>

    </div>
  );
};
