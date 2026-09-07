import React from 'react';
import { 
  Headphones, 
  Search, 
  TrendingUp, 
  FileText, 
  CheckCircle2, 
  CreditCard,
  ArrowRight,
  Phone
} from 'lucide-react';
import { DgwButton } from '../components/common/DgwButton';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const services = [
    {
      id: 'load-booking',
      title: 'Dedicated Load Finding & Booking',
      icon: <Search className="w-6 h-6 text-amber-600" />,
      desc: 'We continuously search live freight boards, direct broker portals, and established shipper relationships to book loads that match your specific trailer, preferred states, and revenue targets.',
      highlights: [
        'No deadhead time spent searching load boards at rest stops',
        'Advance planning: We book your backhaul before you even unload',
        '100% your final approval on every single load tender'
      ]
    },
    {
      id: 'rate-negotiation',
      title: 'Aggressive Rate Negotiation',
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      desc: 'We negotiate directly with freight brokers on your behalf to secure the highest possible Rate per Mile (RPM), plus guaranteed compensation for detention, layover, and driver assistance.',
      highlights: [
        'We never accept cheap bottom-dollar rates',
        'Detention clauses verified prior to booking ($50–$75/hr after 2 hrs)',
        'Full linehaul transparency: You see the original broker Rate Confirmation'
      ]
    },
    {
      id: 'broker-packets',
      title: 'Broker Setup Packets & Compliance',
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      desc: 'When a high-paying load appears, minutes matter. We maintain your carrier packet library (COI, W-9, MC Authority, Notice of Assignment) and complete broker onboarding packets in under 5 minutes.',
      highlights: [
        'Instant Certificate of Insurance (COI) submission to new brokers',
        'Zero lost loads due to paperwork delays',
        'Assistance with broker credit checks & factoring pre-approvals'
      ]
    },
    {
      id: 'billing-factoring',
      title: 'Billing, POD & Factoring Assistance',
      icon: <CreditCard className="w-6 h-6 text-purple-600" />,
      desc: 'Once your load is delivered, send us the signed Proof of Delivery (POD/BOL). We inspect it for clean stamps, audit the rate confirmation, and submit it immediately to your factoring company or QuickPay.',
      highlights: [
        'Fast same-day invoice processing so your payment clock starts immediately',
        'Direct coordination with your factoring company (e.g. RTS, Triumph, OTR)',
        'Assistance collecting unpaid lumper fees, TONU, or detention'
      ]
    },
    {
      id: 'road-support',
      title: '24/7 Road & Check-Call Support',
      icon: <Headphones className="w-6 h-6 text-rose-600" />,
      desc: 'Brokers require regular tracking updates and check-ins. We handle all broker phone calls and emails while you drive safely, and step in to resolve receiver gate delays or emergency reroutes.',
      highlights: [
        'Safe driving: No answering dangerous phone calls in heavy traffic',
        'Facility appointment rescheduling and lumper receipt submission',
        'Emergency after-hours dispatch assistance whenever you are rolling'
      ]
    }
  ];

  return (
    <div className="space-y-16 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-mono font-bold uppercase shadow-xs">
          What We Do For You
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-950 tracking-tight">
          Professional Truck Dispatching Services
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          We handle the back-office operations, phone calls, and paperwork so you can keep your focus on driving safely and making top revenue.
        </p>
      </div>

      {/* 5 Core Services Cards */}
      <div className="space-y-6">
        {services.map((service, index) => (
          <div 
            key={service.id}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  {service.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Service #0{index + 1}</span>
                  <h3 className="text-xl font-display font-bold text-slate-950">{service.title}</h3>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {service.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                {service.highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2">
              <DgwButton
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-3.5 h-3.5 text-amber-400" />}
                onClick={() => onNavigate('/contact')}
              >
                Get Started
              </DgwButton>
            </div>
          </div>
        ))}
      </div>

      {/* Transparent Pricing Section */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 text-center max-w-4xl mx-auto">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-amber-700 uppercase">Honest & Transparent</span>
          <h2 className="text-3xl font-display font-black text-slate-950">
            Simple Flat-Percentage Pricing
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            No hidden fees, no weekly minimums, no setup costs, and no forced dispatch. You only pay a small percentage when you accept and deliver a load.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-mono text-slate-500 uppercase font-bold">Standard Dispatch</span>
            <div className="text-3xl font-black text-slate-950">5% – 7%</div>
            <p className="text-xs text-slate-600">Per booked load. Full dedicated dispatch, paperwork, rate negotiation & check-calls.</p>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 space-y-2">
            <span className="text-xs font-mono text-amber-800 uppercase font-bold">Upfront Cost</span>
            <div className="text-3xl font-black text-amber-900">$0.00</div>
            <p className="text-xs text-amber-800">Zero setup fees. Zero contract sign-up charges. Pay only after your wheels roll.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-mono text-slate-500 uppercase font-bold">Contract Lock-In</span>
            <div className="text-3xl font-black text-slate-950">0 Days</div>
            <p className="text-xs text-slate-600">No long-term commitments. Cancel anytime with zero penalty if you aren’t satisfied.</p>
          </div>
        </div>

        <div className="pt-2">
          <DgwButton
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4 text-amber-400" />}
            onClick={() => onNavigate('/contact')}
          >
            Apply To Start Dispatching
          </DgwButton>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-2xl font-display font-black text-white">Have Questions About Our Services?</h3>
          <p className="text-xs sm:text-sm text-slate-300">Speak directly with our Denver dispatch desk.</p>
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
