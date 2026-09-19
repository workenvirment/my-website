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
      id: 'truck-dispatching',
      title: 'Truck Dispatching',
      icon: <Search className="w-6 h-6 text-amber-600" />,
      desc: 'Professional dispatch support focused on freight coordination, load research, broker communication, and operational organization.',
      highlights: [
        'Dedicated freight research aligned with your equipment',
        'Structured daily dispatch planning and scheduling',
        'Full review and carrier approval on every load confirmation'
      ]
    },
    {
      id: 'load-coordination',
      title: 'Load Coordination',
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      desc: 'Assistance with identifying freight opportunities aligned with the carrier\'s operational requirements and preferred operating areas.',
      highlights: [
        'Screening freight requirements and appointment windows',
        'Multi-leg route scheduling and return trip coordination',
        'Carrier maintains 100% authorization over load selection'
      ]
    },
    {
      id: 'broker-communication',
      title: 'Broker Communication',
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      desc: 'Professional communication with brokers regarding load details, rate information, pickup and delivery requirements, and documentation.',
      highlights: [
        'Direct communication regarding facility appointments and requirements',
        'Prompt transmission of Certificate of Insurance and W-9 packets',
        'Verification of original Rate Confirmation documentation'
      ]
    },
    {
      id: 'dispatch-management',
      title: 'Dispatch Management',
      icon: <CreditCard className="w-6 h-6 text-purple-600" />,
      desc: 'Organized support for managing dispatch-related activities throughout the transportation process from pickup to delivery.',
      highlights: [
        'Organized document workflow for Bills of Lading and Proof of Delivery',
        'Assistance coordinating with your factoring company or billing department',
        'Clear tracking of completed loads and billing packets'
      ]
    },
    {
      id: 'carrier-support',
      title: 'Carrier Support',
      icon: <Headphones className="w-6 h-6 text-rose-600" />,
      desc: 'Dedicated assistance designed around the operational needs of owner-operators and independent motor carriers.',
      highlights: [
        'Proactive assistance during transit and facility check-ins',
        'Assistance with gate delays, detention logging, and rescheduling',
        'Accessible communication channel with your dispatching team'
      ]
    }
  ];

  return (
    <div className="space-y-16 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-mono font-bold uppercase shadow-xs">
          Service Capabilities
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-950 tracking-tight">
          Professional Logistics & Dispatching Services
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Comprehensive dispatch support built for independent carriers and owner-operators, assisting with freight coordination, broker communication, and operational efficiency.
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
                Inquire Service
              </DgwButton>
            </div>
          </div>
        ))}
      </div>

      {/* Transparent Service Model */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 text-center max-w-4xl mx-auto">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-amber-700 uppercase">Transparent Operations</span>
          <h2 className="text-3xl font-display font-black text-slate-950">
            Straightforward Service Structure
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Clear dispatch representation focused on carrier independence, reliable broker communication, and operational efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-mono text-slate-500 uppercase font-bold">Dedicated Dispatch</span>
            <div className="text-xl font-black text-slate-950">Full Support</div>
            <p className="text-xs text-slate-600">Complete administrative back-office support, paperwork coordination, and broker communication.</p>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 space-y-2">
            <span className="text-xs font-mono text-amber-800 uppercase font-bold">Carrier Control</span>
            <div className="text-xl font-black text-amber-900">100% Approval</div>
            <p className="text-xs text-amber-800">You review and approve each rate confirmation before any load booking is finalized.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-mono text-slate-500 uppercase font-bold">Flexibility</span>
            <div className="text-xl font-black text-slate-950">Zero Forced Dispatch</div>
            <p className="text-xs text-slate-600">Work on your preferred lanes and schedule with full operational independence.</p>
          </div>
        </div>

        <div className="pt-2">
          <DgwButton
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4 text-amber-400" />}
            onClick={() => onNavigate('/contact')}
          >
            Contact Dispatching Team
          </DgwButton>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-2xl font-display font-black text-white">Have Questions About Our Dispatch Services?</h3>
          <p className="text-xs sm:text-sm text-slate-300">Connect directly with the Dispatching Global World team.</p>
        </div>
        <a
          href="https://wa.me/923418341278?text=Hello,%20I%20would%20like%20to%20learn%20more%20about%20your%20truck%20dispatching%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>WhatsApp Dispatching Team</span>
        </a>
      </div>

    </div>
  );
};
