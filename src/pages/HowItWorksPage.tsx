import React from 'react';
import { 
  FileCheck, 
  MapPin, 
  TrendingUp, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  Phone,
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
      desc: 'Complete our simple 1-minute carrier application and send us your 3 standard documents:',
      bullets: [
        'Active FMCSA Operating Authority (MC / DOT certificate)',
        'Certificate of Insurance ($1,000,000 Auto Liability & $100,000 Cargo)',
        'Signed W-9 Form & Factoring Notice of Assignment (NOA)'
      ],
      time: 'Takes under 15 minutes'
    },
    {
      num: '02',
      title: 'Set Your Lane & Rate Preferences',
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      desc: 'Your assigned dispatcher calls you to understand your exact driving goals:',
      bullets: [
        'Where do you like to run? (e.g. Midwest, Southeast, Regional, 48-States)',
        'What is your target gross revenue and minimum Rate per Mile (RPM)?',
        'When do you want to be home with your family?'
      ],
      time: 'Personalized driving plan'
    },
    {
      num: '03',
      title: 'We Find & Negotiate Top Loads',
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      desc: 'We search the best loads, negotiate top dollar with brokers, and send you the Rate Confirmation:',
      bullets: [
        'You have 100% final approval on every load. Never forced.',
        'We verify broker credit ratings before you accept.',
        'We complete the broker setup packet and lock in the load immediately.'
      ],
      time: 'Zero load board stress'
    },
    {
      num: '04',
      title: 'Deliver Freight & Get Paid Fast',
      icon: <CreditCard className="w-6 h-6 text-purple-600" />,
      desc: 'Once delivered, send us the signed Proof of Delivery (POD/BOL):',
      bullets: [
        'We submit the clean invoice to your factoring company or QuickPay same-day.',
        'We track and collect any detention, TONU, or layover reimbursements.',
        'We book your next backhaul in advance so you stay rolling.'
      ],
      time: 'Fast payment clock'
    }
  ];

  const faqs = [
    {
      q: 'Do I need my own active MC Authority?',
      a: 'Yes. DGW Solutions LLC works directly with independent motor carriers and owner-operators who operate under their own active FMCSA authority, or under a leased carrier agreement.'
    },
    {
      q: 'Is there any forced dispatch?',
      a: 'Never. You maintain 100% control over your truck. If you don’t like a load, rate, or destination, we simply find you another option with zero penalties.'
    },
    {
      q: 'How and when do I pay for dispatch services?',
      a: 'We charge a simple, transparent flat percentage (5%–7%) only on loads that you accept and deliver. We invoice you after your factoring company funds you, with zero upfront costs.'
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes. We do not lock you into long-term contracts. If you ever want to pause or stop, simply let us know.'
    }
  ];

  return (
    <div className="space-y-16 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-mono font-bold uppercase shadow-xs">
          Transparent Process
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-950 tracking-tight">
          How Getting Dispatched Works
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          From first setup to your next high-paying load, here is our simple 4-step process designed to keep your wheels rolling profitably.
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
            <span>Driver Questions</span>
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
          <h3 className="text-2xl font-display font-black text-white">Ready to Roll With DGW Solutions?</h3>
          <p className="text-xs sm:text-sm text-slate-300">Set up your truck profile in 1 minute or call our dispatch desk directly.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <DgwButton
            variant="accent"
            size="lg"
            icon={<ArrowRight className="w-4 h-4 text-slate-950" />}
            onClick={() => onNavigate('/contact')}
          >
            Start Setup Form
          </DgwButton>
          <a
            href="tel:+18003495623"
            className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>(800) DGW-LOAD</span>
          </a>
        </div>
      </div>

    </div>
  );
};
