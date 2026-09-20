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
  Radio,
  Download
} from 'lucide-react';
import { DgwButton } from '../components/common/DgwButton';
import { LiveLogisticsMap } from '../components/map/LiveLogisticsMap';
import { CarrierRequirementsModal } from '../components/common/CarrierRequirementsModal';
import { submitPublicCarrierLead } from '../services/publicFirestoreService';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [requirementsModalOpen, setRequirementsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    mcNumber: '',
    equipment: 'Dry Van (53ft)',
    preferredLanes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const result = await submitPublicCarrierLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      mcNumber: formData.mcNumber,
      equipment: formData.equipment,
      preferredLanes: formData.preferredLanes,
      source: 'public_website_home_inquiry'
    });

    setIsSubmitting(false);

    if (result.success) {
      setFormSubmitted(true);
    } else {
      setSubmitError(result.error || 'Unable to submit your inquiry. Please try again.');
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-4 sm:py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900">
      
      {/* 1. HERO SECTION: MATCHING NEW USER REFERENCE DESIGN */}
      <section className="relative overflow-hidden pt-2 sm:pt-6 pb-6 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
          
          {/* LEFT COLUMN: Kicker, Headline, Subtitle, 3-Pill Feature Badges, CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left z-10">
            
            {/* Kicker with horizontal blue bar */}
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-xs font-bold tracking-widest text-slate-500 uppercase">
                GLOBAL LOGISTICS &amp; FREIGHT DISPATCHING
              </span>
              <span className="w-8 h-0.5 bg-blue-600 rounded-full shrink-0" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-slate-950 tracking-tight leading-[1.05]">
              Your Freight. <br />
              <span className="text-blue-600">Our Priority.</span>
            </h1>

            {/* Professional Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
              Connecting truckers, carriers, and brokers for smarter loads, faster payments, and long-term growth.
            </p>

            {/* 3 Feature Pills matching reference */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">Reliable Dispatch</span>
              </div>
              
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xs">
                <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">Maximized Loads</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xs">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">On-Time Payments</span>
              </div>
            </div>

            {/* Big Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#1D63ED] hover:bg-[#1550C7] text-white font-bold text-sm shadow-xl shadow-blue-500/30 transition-all active:scale-95 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={() => setRequirementsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs sm:text-sm shadow-xs transition-all hover:border-blue-400 cursor-pointer group"
              >
                <Download className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>Carrier Requirements (Download List)</span>
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: Metallic Blue Semi-Truck on Mountain Lakeside Highway */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-4 pointer-events-none rounded-3xl bg-gradient-to-tr from-blue-500/10 via-cyan-500/5 to-transparent blur-xl" />

            {/* Hero Truck Image Frame */}
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-200/80 group z-10">
              <img 
                src="/images/blue_semi_truck_sunset.jpg" 
                alt="DGW Solutions LLC Metallic Royal Blue Commercial Freight Semi-Truck at Sunset"
                className="w-full h-auto object-cover object-center group-hover:scale-103 transition-transform duration-700"
              />
              {/* Soft Ambient Blend on Left Edge */}
              <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white/35 via-white/10 to-transparent pointer-events-none" />
            </div>

          </div>

        </div>
      </section>

      {/* Carrier Requirements Modal */}
      <CarrierRequirementsModal
        isOpen={requirementsModalOpen}
        onClose={() => setRequirementsModalOpen(false)}
        onNavigateToApply={() => onNavigate('/contact')}
      />

      {/* 2. REAL BENEFITS: WHY PARTNER WITH DGW */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider">
            Operational Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-950">
            Comprehensive Dispatch Support for Modern Fleets
          </h2>
          <p className="text-sm text-slate-600">
            Operational coordination, rate communication, and dispatch administration designed around the requirements of independent carriers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Benefit 1 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 flex flex-col justify-between hover:shadow-xl transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950">Freight & Rate Coordination</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We assist with load research, direct broker communication, and securing fair market freight terms aligned with your operational schedule.
              </p>
            </div>
            <div className="pt-2 text-xs font-mono font-bold text-amber-700">
              Transparent Load Terms
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 flex flex-col justify-between hover:shadow-xl transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950">Broker Administration & Setup</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We assist with broker onboarding packets, Certificate of Insurance (COI) distribution, W-9 submissions, and load documentation.
              </p>
            </div>
            <div className="pt-2 text-xs font-mono font-bold text-blue-700">
              Organized Document Workflow
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 flex flex-col justify-between hover:shadow-xl transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950">Dedicated Dispatch Assistance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Active operational support for broker check-calls, scheduling adjustments, facility updates, and transportation management.
              </p>
            </div>
            <div className="pt-2 text-xs font-mono font-bold text-emerald-700">
              Reliable Operational Support
            </div>
          </div>

          {/* Benefit 4 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 flex flex-col justify-between hover:shadow-xl transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950">Carrier Operational Independence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You maintain complete control over your operating decisions. You review and approve every rate confirmation before booking.
              </p>
            </div>
            <div className="pt-2 text-xs font-mono font-bold text-purple-700">
              Complete Carrier Control
            </div>
          </div>

        </div>
      </section>

      {/* 3. LIVE INTERSTATE FREIGHT RADAR & TELEMATICS MAP */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-700 uppercase">Operations Radar</span>
              <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                <Radio className="w-3 h-3 animate-pulse text-emerald-600" />
                ACTIVE NETWORK
              </span>
            </div>
            <h2 className="text-3xl font-display font-black text-slate-950 mt-1">
              US Interstate Freight Corridors & Fleet Telematics
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Interactive logistics network displaying freight corridor coordination across continental transportation lanes.
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
            Operational Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
            How Dispatch Coordination Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
          
          <div className="space-y-3 p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center mx-auto sm:mx-0">
              1
            </div>
            <h3 className="text-xl font-bold text-white">Document Submission</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Submit your MC Certificate, Certificate of Insurance ($1M Auto / $100K Cargo), and W-9 form to establish your carrier profile.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center mx-auto sm:mx-0">
              2
            </div>
            <h3 className="text-xl font-bold text-white">Freight Coordination</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We identify freight opportunities on your preferred lanes, communicate with brokers, and send rate confirmations for your final review.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center mx-auto sm:mx-0">
              3
            </div>
            <h3 className="text-xl font-bold text-white">Delivery & Billing</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Upon successful delivery, we assist with submitting the signed Proof of Delivery (POD) to your factoring institution or billing department.
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
            Review Step-By-Step Workflow
          </DgwButton>
        </div>
      </section>

      {/* 4. CARRIER FREEDOM BANNER */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          
          {/* Left Content Column */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6 z-10 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/70">
            <div className="space-y-4">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-mono font-bold tracking-wide uppercase">
                <Truck className="w-3.5 h-3.5 text-red-500" />
                <span>Carrier Independence • Zero Forced Dispatch</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white leading-tight">
                Dedicated Support For Independent Operators
              </h2>

              {/* Feature Box */}
              <div className="p-5 rounded-2xl bg-white text-slate-950 shadow-xl space-y-2 border-l-4 border-red-600 max-w-md">
                <div className="flex items-center gap-2 text-red-600 font-bold text-xs font-mono uppercase tracking-wider">
                  <span>Owner-Operator Focus</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Choose <strong>your preferred lanes and schedules</strong> while our team manages the administrative dispatch details.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
                As an independent carrier, you retain full authority over which loads you choose to accept. We provide the research, communication, and paperwork coordination to support your business.
              </p>
            </div>

            {/* Direct WhatsApp & Contact Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <DgwButton
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4 text-amber-400" />}
                onClick={() => onNavigate('/contact')}
              >
                Contact Dispatching Team
              </DgwButton>

              <a
                href="https://wa.me/923418341278?text=Hello,%20I%20would%20like%20to%20learn%20more%20about%20your%20truck%20dispatching%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-emerald-500/40 text-white font-mono text-xs font-bold transition-all shadow-md hover:border-emerald-400"
              >
                <div className="w-7 h-7 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <span className="block text-[9px] text-slate-400 uppercase tracking-wider">WhatsApp Dispatch Line</span>
                  <span className="block text-xs font-black text-emerald-400">+92 341 8341278</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Real Semi-Truck Photo */}
          <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full overflow-hidden bg-slate-900">
            <img 
              src="/images/night_highway_truck.jpg" 
              alt="Commercial semi-truck on interstate corridor - DGW Solutions LLC" 
              className="w-full h-full object-cover object-center filter brightness-105 contrast-110 hover:scale-105 transition-transform duration-700"
            />
            {/* Soft Ambient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-slate-950/80 pointer-events-none" />
            
            {/* Photo Overlay Tag */}
            <div className="absolute bottom-4 right-4 px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-amber-400 font-bold">
              COMMERCIAL HIGHWAY LOGISTICS
            </div>
          </div>

        </div>
      </section>

      {/* 5. REAL FLEET & SPECIALIZED EQUIPMENT PHOTO SHOWCASE */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-700 uppercase">Commercial Fleet Directory</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                CARRIER NETWORK
              </span>
            </div>
            <h2 className="text-3xl font-display font-black text-slate-950 mt-1">
              Commercial Fleet & Specialized Equipment
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Commercial equipment types supported by DGW Solutions LLC across North American transportation lanes.
            </p>
          </div>
        </div>

        {/* Both Main Photographs Displayed Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Photo 1: Commercial Sleeper Fleet */}
          <div className="group rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
              <img 
                src="/images/fleet_sunset_row.jpg" 
                alt="Commercial semi-truck fleet parked in a row - DGW Solutions LLC" 
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
                  <span className="font-bold text-amber-400">Power-Only & Sleeper Fleet Support</span>
                  <span className="text-slate-300">Dispatch Operations</span>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-950">
                  Over-The-Road Commercial Power Fleet
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dedicated tractor support for high-volume dry van, refrigerated freight, interchange operations, and inter-regional trailer repositioning.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-700">
                  High-Capacity Linehaul
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

          {/* Photo 2: Heavy Liquid Bulk Tanker */}
          <div className="group rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
              <img 
                src="/images/tanker_night_refinery.jpg" 
                alt="Liquid bulk tanker transport - DGW Solutions LLC" 
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
                  <span className="font-bold text-cyan-400">Industrial & Specialized Logistics</span>
                  <span className="text-slate-300">Dedicated Coordination</span>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-950">
                  Heavy Liquid Bulk & Industrial Transport
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Specialized chemical, fuel, and liquid bulk transport coordination with complete compliance monitoring and terminal loading assistance.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-700">
                  Specialized Operations
                </span>
                <DgwButton
                  variant="secondary"
                  size="sm"
                  onClick={() => onNavigate('/contact')}
                >
                  Inquire Support
                </DgwButton>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. EQUIPMENT CATEGORIES */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-amber-700 uppercase">Equipment Types Supported</span>
            <h2 className="text-3xl font-display font-black text-slate-950 mt-1">
              Commercial Equipment Matrix
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/equipment')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 font-mono flex items-center gap-1"
          >
            <span>View Complete Equipment Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {[
            {
              name: '53ft Dry Van',
              image: '/images/dryvan_trailer.jpg',
              category: 'General Freight',
              capacity: '26 – 30 Pallets',
              weight: 'Up to 45,000 lbs',
              desc: 'Enclosed palletized freight, packaged consumer merchandise, and dry food packaging.'
            },
            {
              name: '53ft Reefer (Refrigerated)',
              image: '/images/reefer_trailer.jpg',
              category: 'Temperature-Controlled',
              capacity: '24 – 28 Pallets',
              weight: 'Up to 44,000 lbs',
              desc: 'Cold-chain produce, meat, dairy, pharmaceuticals, and temperature-sensitive goods.'
            },
            {
              name: '48ft / 53ft Flatbed',
              image: '/images/flatbed_trailer.jpg',
              category: 'Open Deck',
              capacity: '48’ to 53’ Deck',
              weight: 'Up to 48,000 lbs',
              desc: 'Structural steel coils, building materials, pipe, and crane-loaded industrial cargo.'
            },
            {
              name: 'Stepdeck / Drop Deck',
              image: '/images/stepdeck_excavator.jpg',
              category: 'Specialized Low-Profile',
              capacity: 'Lower Well 38’ to 43’',
              weight: 'Up to 46,000 lbs',
              desc: 'Tall machinery, tracked excavators, and agricultural equipment requiring lower deck heights.'
            },
            {
              name: '26ft Box Truck',
              image: '/images/boxtruck_delivery.jpg',
              category: 'Regional & LTL',
              capacity: '12 Standard Pallets',
              weight: 'Up to 10,000 lbs',
              desc: 'Regional commercial distribution, dockless liftgate freight, and business-to-business delivery.'
            },
            {
              name: '40ft Gooseneck Hotshot',
              image: '/images/hotshot_rig.jpg',
              category: 'Agile Open Deck',
              capacity: '40’ Deck Surface',
              weight: 'Up to 16,500 lbs',
              desc: 'Time-sensitive machinery, industrial equipment, and regional open-deck shipments.'
            }
          ].map((eq, i) => (
            <div key={i} className="rounded-3xl bg-white border border-slate-200 shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-shadow group">
              {/* Equipment Photo Header */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                <img 
                  src={eq.image} 
                  alt={eq.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-xs text-[10px] font-mono text-amber-400 font-bold border border-white/10">
                    {eq.category}
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
                    <span className="text-slate-500">Classification:</span>
                    <span className="font-bold text-slate-800">{eq.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Deck / Space:</span>
                    <span className="font-bold text-amber-700">{eq.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Max Payload:</span>
                    <span className="font-bold text-slate-800">{eq.weight}</span>
                  </div>
                </div>

                <DgwButton
                  variant="secondary"
                  size="sm"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  onClick={() => onNavigate('/contact')}
                >
                  Discuss Dispatch Support
                </DgwButton>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* 6. DISPATCH INQUIRY FORM */}
      <section className="p-5 sm:p-8 md:p-12 rounded-3xl bg-white border border-slate-200 shadow-2xl max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider">
            Carrier Inquiry
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-950">
            Connect With Our Dispatching Team
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Submit your equipment details and preferred running areas. Our team will review your inquiry and follow up promptly.
          </p>
        </div>

        {formSubmitted ? (
          <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-xl font-bold text-emerald-900">Inquiry Received</h3>
            <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
              Thank you, {formData.name}. The dispatching team at DGW Solutions LLC has received your details and will connect with you at <strong>{formData.phone}</strong>.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="https://wa.me/923418341278?text=Hello,%20I%20would%20like%20to%20learn%20more%20about%20your%20truck%20dispatching%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp Us: +92 341 8341278</span>
              </a>
              <a
                href="mailto:dispachingglobal@dgwsolutionllc.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors"
              >
                <span>Email: dispachingglobal@dgwsolutionllc.com</span>
              </a>
            </div>
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
              <label className="block text-slate-700 font-bold mb-1">Phone / WhatsApp Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +1 (555) 000-0000"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none text-base sm:text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. carrier@company.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none text-base sm:text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">MC / DOT Number (Optional)</label>
              <input
                type="text"
                value={formData.mcNumber}
                onChange={(e) => setFormData({ ...formData, mcNumber: e.target.value })}
                placeholder="e.g. MC-123456"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none text-base sm:text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Equipment Type *</label>
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
              <label className="block text-slate-700 font-bold mb-1">Preferred Operating Lanes</label>
              <input
                type="text"
                value={formData.preferredLanes}
                onChange={(e) => setFormData({ ...formData, preferredLanes: e.target.value })}
                placeholder="e.g. Midwest, Southeast, Texas, Regional"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none text-base sm:text-xs"
              />
            </div>

            {submitError && (
              <div className="sm:col-span-2 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {submitError}
              </div>
            )}

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all min-h-[48px] active:scale-[0.98] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span>Submitting Inquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>Submit Dispatch Inquiry</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-slate-500 text-center mt-2 font-mono">
                Confidential business inquiry. Your information is protected.
              </p>
            </div>
          </form>
        )}
      </section>

    </div>
  );
};
