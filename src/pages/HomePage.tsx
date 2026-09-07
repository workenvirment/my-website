import React, { useState } from 'react';
import { 
  ArrowRight, 
  Phone, 
  CheckCircle2, 
  DollarSign, 
  ShieldCheck, 
  Clock, 
  FileText, 
  Truck,
  Send,
  Radio
} from 'lucide-react';
import { DgwButton } from '../components/common/DgwButton';
import { LiveLogisticsMap } from '../components/map/LiveLogisticsMap';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    mcNumber: '',
    equipment: 'Dry Van (53ft)',
    preferredLanes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900">
      
      {/* 1. HERO SECTION: SIMPLE & CRYSTAL CLEAR */}
      <section className="text-center space-y-6 pt-6 sm:pt-12 max-w-4xl mx-auto">
        
        {/* Trust Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-mono font-bold tracking-wide uppercase shadow-xs">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Denver, CO • Official Dispatch Agency • DGW Solutions LLC</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-slate-950 leading-[1.1]">
          We Find Top-Paying Loads. <br className="hidden sm:inline" />
          <span className="text-gradient-gold">You Drive & Get Paid.</span>
        </h1>

        {/* Plain English Subtitle */}
        <p className="text-sm sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Dedicated truck dispatching for independent owner-operators and small fleets. We negotiate top rates, handle all broker paperwork, and keep you rolling with <strong>zero forced dispatch</strong>.
        </p>

        {/* Big Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
          <DgwButton
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4 text-amber-400" />}
            onClick={() => onNavigate('/contact')}
            className="w-full sm:w-auto"
          >
            Get Dispatched (Fast Setup)
          </DgwButton>

          <a
            href="tel:+18003495623"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm shadow-xs transition-all hover:border-slate-400"
          >
            <Phone className="w-4 h-4 text-amber-600" />
            <span>Call +1 (800) DGW-LOAD</span>
          </a>
        </div>

        {/* 4 Core Guarantees */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-4 sm:pt-6 text-xs sm:text-sm font-semibold text-slate-700 max-w-3xl mx-auto text-left">
          <div className="flex items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs">No Forced Dispatch</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs">Pay Only Per Load</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs">No Contracts</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs">Top Rate Negotiation</span>
          </div>
        </div>

      </section>

      {/* 2. REAL BENEFITS: WHY TRUCKERS CHOOSE DGW */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider">
            Why Partner With Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-950">
            Everything You Need To Maximize Your Weekly Gross
          </h2>
          <p className="text-sm text-slate-600">
            Stop wasting unpaid hours on load boards and phone calls. Let our Denver dispatch desk manage the back-office while you focus on the road.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Benefit 1 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 flex flex-col justify-between hover:shadow-xl transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950">Aggressive Rate Negotiation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We never take the first cheap rate. We push brokers for top dollar per mile, detention pay, layover protection, and fuel surcharges.
              </p>
            </div>
            <div className="pt-2 text-xs font-mono font-bold text-amber-700">
              Avg Target: $2.85+ / mile
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 flex flex-col justify-between hover:shadow-xl transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950">Zero Paperwork Stress</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We complete all broker setup packets, send Certificates of Insurance (COI), W-9, and MC Authority in under 5 minutes so you never lose hot loads.
              </p>
            </div>
            <div className="pt-2 text-xs font-mono font-bold text-blue-700">
              Fast 5-Min Packet Setup
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 flex flex-col justify-between hover:shadow-xl transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950">24/7 Dispatch & Road Help</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Freight doesn’t stop at 5 PM. If you face a late appointment, gate issue, lumper delay, or emergency, your dispatcher is standing by.
              </p>
            </div>
            <div className="pt-2 text-xs font-mono font-bold text-emerald-700">
              24/7 Dedicated Support
            </div>
          </div>

          {/* Benefit 4 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 flex flex-col justify-between hover:shadow-xl transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950">100% Final Approval</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You are the boss of your truck. You approve every rate confirmation before we book it. No forced loads, no penalties if you decline.
              </p>
            </div>
            <div className="pt-2 text-xs font-mono font-bold text-purple-700">
              Complete Independence
            </div>
          </div>

        </div>
      </section>

      {/* 3. LIVE INTERSTATE FREIGHT RADAR & TELEMATICS MAP */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-700 uppercase">Live Operations Radar</span>
              <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                <Radio className="w-3 h-3 animate-pulse text-emerald-600" />
                ACTIVE NETWORK
              </span>
            </div>
            <h2 className="text-3xl font-display font-black text-slate-950 mt-1">
              Live US Interstate Freight Radar & Fleet Telematics
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Click any truck node across US freight corridors to inspect live origin, destination, ETA, cargo integrity, and direct dispatch coordination.
            </p>
          </div>
        </div>

        {/* Live Interactive Logistics Radar */}
        <LiveLogisticsMap />
      </section>

      {/* 4. SIMPLE 3-STEP PROCESS: HOW IT WORKS */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-2xl space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
            How Getting Dispatched Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
          
          <div className="space-y-3 p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center mx-auto sm:mx-0">
              1
            </div>
            <h3 className="text-xl font-bold text-white">Send Your Docs</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Submit your MC Certificate, Certificate of Insurance ($1M Auto / $100K Cargo), and W-9. Quick setup takes under 15 minutes.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center mx-auto sm:mx-0">
              2
            </div>
            <h3 className="text-xl font-bold text-white">We Find & Negotiate</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We find top-paying spot loads on your preferred lanes, negotiate the highest rate, and send you the Rate Confirmation for approval.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center mx-auto sm:mx-0">
              3
            </div>
            <h3 className="text-xl font-bold text-white">Deliver & Get Paid</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              You deliver the freight safely. We immediately submit the signed Proof of Delivery (POD) to your factoring company or QuickPay.
            </p>
          </div>

        </div>

        <div className="text-center pt-2">
          <DgwButton
            variant="accent"
            size="lg"
            icon={<ArrowRight className="w-4 h-4 text-slate-950" />}
            onClick={() => onNavigate('/how-it-works')}
          >
            Read Full Step-By-Step Guide
          </DgwButton>
        </div>
      </section>

      {/* 4. HIGH-IMPACT CARRIER FREEDOM BANNER (USER POSTER INSPIRATION) */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          
          {/* Left Content Column */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6 z-10 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/70">
            <div className="space-y-4">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-mono font-bold tracking-wide uppercase">
                <Truck className="w-3.5 h-3.5 text-red-500" />
                <span>Driver Empowerment • Zero Forced Dispatch</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white leading-tight">
                Stop Taking Orders.
              </h2>

              {/* Feature Box styled exactly like user reference */}
              <div className="p-5 rounded-2xl bg-white text-slate-950 shadow-xl space-y-2 border-l-4 border-red-600 max-w-md">
                <div className="flex items-center gap-2 text-red-600 font-bold text-xs font-mono uppercase tracking-wider">
                  <span>Owner-Operator Freedom</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Start choosing <strong>your own loads and routes</strong>. Take back the power of your business today.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
                You invested in your rig to be your own boss. We negotiate top rates, handle all broker paperwork, and let you decide which loads you take.
              </p>
            </div>

            {/* Direct Phone & Fast Setup Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <DgwButton
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4 text-amber-400" />}
                onClick={() => onNavigate('/contact')}
              >
                Get Dispatched Now
              </DgwButton>

              {/* Red Phone Badge styled matching the uploaded poster */}
              <a
                href="tel:3179780276"
                className="inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-red-500/40 text-white font-mono text-xs font-bold transition-all shadow-md hover:border-red-400"
              >
                <div className="w-7 h-7 rounded-xl bg-red-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <span className="block text-[9px] text-slate-400 uppercase tracking-wider">Direct Dispatch Line</span>
                  <span className="block text-xs font-black text-red-400">(317) 978 0276</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Real Night Semi-Truck Photo */}
          <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full overflow-hidden bg-slate-900">
            <img 
              src="/images/night_highway_truck.jpg" 
              alt="Class 8 semi-truck sleeper rig driving at night under starry mountain sky - Stop taking orders" 
              className="w-full h-full object-cover object-center filter brightness-105 contrast-110 hover:scale-105 transition-transform duration-700"
            />
            {/* Soft Ambient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-slate-950/80 pointer-events-none" />
            
            {/* Photo Overlay Tag */}
            <div className="absolute bottom-4 right-4 px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-amber-400 font-bold">
              ⭐ AUTHENTIC HIGHWAY TRANSIT PHOTOGRAPHY
            </div>
          </div>

        </div>
      </section>

      {/* 5. REAL FLEET & SPECIALIZED EQUIPMENT PHOTO SHOWCASE */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-700 uppercase">Authentic Fleet Photography</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                OFFICIAL CARRIER NETWORK
              </span>
            </div>
            <h2 className="text-3xl font-display font-black text-slate-950 mt-1">
              Active Commercial Fleet & Specialized Operations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Real commercial equipment dispatched daily by DGW Solutions LLC across all 48 continental states.
            </p>
          </div>
        </div>

        {/* Both Main User-Provided Photographs Displayed Prominently Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Photo 1: Commercial Sleeper Fleet at Sunset */}
          <div className="group rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
              <img 
                src="/images/fleet_sunset_row.jpg" 
                alt="Commercial semi-truck fleet parked in a row at sunset - DGW Solutions LLC" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md text-amber-400 font-mono text-xs font-bold border border-white/20 shadow-md">
                  CLASS 8 COMMERCIAL FLEET
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-white">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-amber-400">Power-Only & Sleeper Fleet Operations</span>
                  <span className="text-slate-300">Denver HQ Dispatch</span>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-950">
                  Over-The-Road Commercial Power Fleet
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dedicated solo and team tractor operations for high-volume dry van, reefer staging, Amazon relay interchange, and multi-state trailer repositioning.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-700">
                  Target Weekly Gross: $8,000 – $11,000+
                </span>
                <DgwButton
                  variant="secondary"
                  size="sm"
                  onClick={() => onNavigate('/equipment')}
                >
                  Fleet Specs
                </DgwButton>
              </div>
            </div>
          </div>

          {/* Photo 2: Heavy Dual Stainless Steel Tanker Rig at Refinery */}
          <div className="group rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
              <img 
                src="/images/tanker_night_refinery.jpg" 
                alt="Dual stainless steel liquid bulk tanker rig at refinery - DGW Solutions LLC" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md text-cyan-400 font-mono text-xs font-bold border border-white/20 shadow-md">
                  SPECIALIZED LIQUID BULK TANKER
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-white">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-cyan-400">Refinery & Hazmat Corridor Logistics</span>
                  <span className="text-slate-300">24/7 Monitoring</span>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-950">
                  Heavy Liquid Bulk & Refinery Transportation
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Specialized chemical, fuel, and industrial liquid bulk tanker transport. Complete compliance coordination, hazmat routing, and terminal loading support.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-700">
                  Target Weekly Gross: $14,000 – $18,000+
                </span>
                <DgwButton
                  variant="secondary"
                  size="sm"
                  onClick={() => onNavigate('/contact')}
                >
                  Dispatch Tanker
                </DgwButton>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. EQUIPMENT & AVERAGE WEEKLY EARNINGS (WITH REAL PICTURES) */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-amber-700 uppercase">Equipment Types We Dispatch</span>
            <h2 className="text-3xl font-display font-black text-slate-950 mt-1">
              Real Equipment Dispatched Daily
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/equipment')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 font-mono flex items-center gap-1"
          >
            <span>View Complete Equipment Matrix</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {[
            {
              name: '53ft Dry Van',
              image: '/images/dryvan_trailer.jpg',
              gross: '$5,500 – $8,500 / wk',
              rpm: '$2.30 – $3.10 / mi',
              weight: 'Up to 45,000 lbs',
              desc: 'General palletized freight, retail consumer goods, and dry food packaging.'
            },
            {
              name: '53ft Reefer (Refrigerated)',
              image: '/images/reefer_trailer.jpg',
              gross: '$6,500 – $10,000 / wk',
              rpm: '$2.60 – $3.80 / mi',
              weight: 'Up to 44,000 lbs',
              desc: 'Temperature-controlled cold-chain produce, meat, dairy, and pharmaceuticals.'
            },
            {
              name: '48ft Heavy Flatbed',
              image: '/images/flatbed_trailer.jpg',
              gross: '$6,000 – $9,500 / wk',
              rpm: '$2.70 – $3.90 / mi',
              weight: 'Up to 48,000 lbs',
              desc: 'Structural steel coils, lumber, construction materials, and crane loads.'
            },
            {
              name: '48ft Drop Deck / Stepdeck',
              image: '/images/stepdeck_excavator.jpg',
              gross: '$11,000 – $13,500 / wk',
              rpm: '$2.40 – $2.80 / mi',
              weight: 'Up to 46,000 lbs',
              desc: 'Tall machinery, tracked excavators, and agricultural combines avoiding height permits.'
            },
            {
              name: '26ft Box Truck (Liftgate)',
              image: '/images/boxtruck_delivery.jpg',
              gross: '$3,500 – $6,500 / wk',
              rpm: '$2.00 – $2.80 / mi',
              weight: 'Up to 12,000 lbs',
              desc: 'CDL and Non-CDL regional distribution, dockless liftgate freight, and LTL.'
            },
            {
              name: '40ft Gooseneck Hotshot',
              image: '/images/hotshot_rig.jpg',
              gross: '$4,500 – $7,500 / wk',
              rpm: '$2.20 – $3.20 / mi',
              weight: 'Up to 16,500 lbs',
              desc: 'Oilfield drilling pipe, emergency plant tooling, and industrial equipment.'
            }
          ].map((eq, i) => (
            <div key={i} className="rounded-3xl bg-white border border-slate-200 shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-shadow group">
              {/* Real Equipment Photo Header */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                <img 
                  src={eq.image} 
                  alt={eq.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-xs text-[10px] font-mono text-amber-400 font-bold border border-white/10">
                    REAL PHOTO
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-950">{eq.name}</h3>
                    <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{eq.desc}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Weekly Target:</span>
                    <span className="font-bold text-emerald-700">{eq.gross}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target RPM:</span>
                    <span className="font-bold text-amber-700">{eq.rpm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Payload:</span>
                    <span className="font-bold text-slate-800">{eq.weight}</span>
                  </div>
                </div>

                <DgwButton
                  variant="secondary"
                  size="sm"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  onClick={() => onNavigate('/contact')}
                >
                  Dispatch This Equipment
                </DgwButton>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* 5. DIRECT 1-MINUTE DRIVER / CARRIER APPLICATION FORM */}
      <section className="p-5 sm:p-8 md:p-12 rounded-3xl bg-white border border-slate-200 shadow-2xl max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider">
            Fast Carrier Onboarding
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-950">
            Get Dispatched Within 15 Minutes
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Fill out this simple form. Our Denver dispatch team will review your lanes and call you back with top-paying load options.
          </p>
        </div>

        {formSubmitted ? (
          <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-xl font-bold text-emerald-900">Application Received!</h3>
            <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
              Thank you, {formData.name}. A senior dispatcher from DGW Solutions LLC (Denver HQ) will call you shortly at <strong>{formData.phone}</strong>.
            </p>
            <a
              href="tel:+18003495623"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs shadow-md mt-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Or Call Us Now: +1 (800) DGW-LOAD</span>
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. John Doe"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none text-base sm:text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. (303) 555-0199"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none text-base sm:text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. driver@carrier.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none text-base sm:text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">MC Number / DOT Number</label>
              <input
                type="text"
                value={formData.mcNumber}
                onChange={(e) => setFormData({ ...formData, mcNumber: e.target.value })}
                placeholder="e.g. MC-123456"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none text-base sm:text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Trailer / Equipment Type *</label>
              <select
                value={formData.equipment}
                onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none text-base sm:text-xs"
              >
                <option value="Dry Van (53ft)">53ft Dry Van</option>
                <option value="Reefer (53ft)">53ft Reefer</option>
                <option value="Flatbed (48/53ft)">Flatbed / Stepdeck</option>
                <option value="Box Truck (26ft)">26ft Box Truck</option>
                <option value="Hotshot (40ft)">40ft Hotshot</option>
                <option value="Power Only">Power Only</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Preferred Running States / Lanes</label>
              <input
                type="text"
                value={formData.preferredLanes}
                onChange={(e) => setFormData({ ...formData, preferredLanes: e.target.value })}
                placeholder="e.g. Midwest, Southeast, Texas only"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none text-base sm:text-xs"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all min-h-[48px] active:scale-[0.98]"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>Submit & Connect With A Dispatcher</span>
              </button>
              <p className="text-[11px] text-slate-500 text-center mt-2 font-mono">
                🔒 Your information is confidential. We will never sell your contact info.
              </p>
            </div>
          </form>
        )}
      </section>

    </div>
  );
};
