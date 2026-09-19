import React from 'react';
import { 
  FileCheck, 
  MapPin, 
  TrendingUp, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { DgwButton } from '../components/common/DgwButton';

interface HowItWorksPageProps {
  onNavigate: (path: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const steps = [
    {
      num: '01',
      title: 'Submit Your Carrier Documents',
      icon: <FileCheck className="w-6 h-6 text-amber-600" />,
      desc: 'Complete our carrier onboarding process by providing your standard compliance documentation:',
      bullets: [
        'Active FMCSA Operating Authority (MC / DOT certificate)',
        'Certificate of Insurance ($1,000,000 Auto Liability & $100,000 Cargo)',
        'Signed W-9 Form & Factoring Notice of Assignment (NOA)'
      ],
      time: 'Fast verification process'
    },
    {
      num: '02',
      title: 'Define Lane & Operational Preferences',
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      desc: 'Your dedicated dispatcher consults with you to establish your operational parameters:',
      bullets: [
        'Preferred operating territories (e.g., Midwest, Southeast, Regional, OTR)',
        'Target rate-per-mile expectations and freight type preferences',
        'Home-time requirements and scheduling goals'
      ],
      time: 'Tailored operational plan'
    },
    {
      num: '03',
      title: 'Load Sourcing & Rate Negotiation',
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      desc: 'We identify suitable freight, negotiate competitive rates with vetted brokers, and present rate confirmations:',
      bullets: [
        'You maintain 100% final approval on every load. No forced dispatch.',
        'Broker credit checks and verification conducted prior to commitment.',
        'Complete broker onboarding packet completion and load confirmation.'
      ],
      time: 'Proactive load management'
    },
    {
      num: '04',
      title: 'Freight Delivery & Billing Support',
      icon: <CreditCard className="w-6 h-6 text-purple-600" />,
      desc: 'Upon delivery completion, provide the signed Bill of Lading (BOL/POD):',
      bullets: [
        'Invoicing support and direct submission to your factoring company.',
        'Documentation assistance for detention, TONU, or layover requests.',
        'Pre-planned backhaul scheduling to maintain continuous operations.'
      ],
      time: 'Structured invoicing process'
    }
  ];

  const faqs = [
    {
      q: 'Do I need my own active MC Authority?',
      a: 'Yes. DGW Solutions LLC works directly with independent motor carriers and owner-operators who operate under their own active FMCSA authority, or under a valid carrier agreement.'
    },
    {
      q: 'Is there any forced dispatch?',
      a: 'Never. You maintain complete control over your equipment. If a particular load, rate, or lane does not meet your operational criteria, our dispatch team sources alternative options without penalty.'
    },
    {
      q: 'How are dispatch service fees structured?',
      a: 'We operate on a transparent service fee model based on accepted and delivered loads. Contact our team for detailed service agreement terms and onboarding information.'
    },
    {
      q: 'Are carriers required to commit to long-term contracts?',
      a: 'No. We believe in building partnerships through consistent performance rather than restrictive long-term commitments. Flexible terms are available.'
    }
  ];

  return (
    <div className="space-y-16 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-mono font-bold uppercase shadow-xs">
          Structured Process
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-950 tracking-tight">
          How Our Dispatch Process Works
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          From initial onboarding to ongoing load management, our four-step dispatch framework provides organized operational support for carriers and owner-operators.
        </p>
      </div>

      {/* 4 Steps Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step) => (
          <div 
            key={step.num}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 flex flex-col justify-between hover:shadow-xl transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  {step.icon}
                </div>
                <span className="font-display font-black text-2xl text-slate-300">
                  {step.num}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-950">{step.title}</h3>
              <p className="text-xs text-slate-600">{step.desc}</p>

              <div className="space-y-2 pt-2">
                {step.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>{step.time}</span>
              <span className="text-amber-700 font-bold">Step {step.num}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Common Questions FAQ */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-amber-700 text-xs font-mono font-bold uppercase">
            <HelpCircle className="w-4 h-4" />
            <span>Carrier Inquiries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-950">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4 pt-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-slate-950">{faq.q}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-2xl font-display font-black text-white">Ready to Coordinate With DGW Solutions?</h3>
          <p className="text-xs sm:text-sm text-slate-300">Submit your carrier information or contact our dispatch desk directly.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <DgwButton
            variant="accent"
            size="lg"
            icon={<ArrowRight className="w-4 h-4 text-slate-950" />}
            onClick={() => onNavigate('/contact')}
          >
            Contact Dispatching Team
          </DgwButton>
          <a
            href="https://wa.me/923418341278?text=Hello,%20I%20would%20like%20to%20learn%20more%20about%20your%20truck%20dispatching%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Dispatch Desk</span>
          </a>
        </div>
      </div>

    </div>
  );
};

