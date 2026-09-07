import React from 'react';
import { DollarSign, Clock, AlertCircle, Globe } from 'lucide-react';
import { SettlementCalculator } from '../components/payments/SettlementCalculator';
import { PAYMENT_OPTIONS, PAYMENT_CHANNELS_INFO } from '../data/paymentData';
import type { PaymentOption } from '../types';

interface PaymentsPageProps {
  onNavigate?: (path: string) => void;
}

export const PaymentsPage: React.FC<PaymentsPageProps> = () => {
  return (
    <div className="space-y-20 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-brand-orange border border-orange-200 text-xs font-mono font-bold uppercase">
          <DollarSign className="w-3.5 h-3.5" />
          <span>Financial Workflows & Settlements</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-900 tracking-tight">
          Carrier Payment Methods & Settlements
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Understanding how freight invoices are billed, verified, and settled across factoring institutions, broker QuickPay departments, and direct ACH billing.
        </p>
      </div>

      {/* Interactive Settlement Calculator */}
      <section className="space-y-6">
        <SettlementCalculator />
      </section>

      {/* 4 Core Payment Models Deep Dive */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono font-bold text-brand-orange uppercase">In-Depth Workflow Breakdown</span>
          <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 mt-0.5">
            4 Primary Carrier Settlement Models
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PAYMENT_OPTIONS.map((option: PaymentOption) => (
            <div
              key={option.id}
              className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl flex flex-col justify-between space-y-6 text-slate-900"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-brand-orange px-3 py-1 rounded-full bg-orange-100 border border-orange-200">
                    {option.acronym}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-cyan-800 font-mono font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{option.typicalTimingExample}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-display font-black text-slate-900">{option.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    {option.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block font-bold">How It Works:</span>
                  <p className="text-xs text-slate-700 leading-relaxed">{option.howItWorks}</p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block font-bold">Key Points:</span>
                  <ul className="space-y-1 text-xs">
                    {option.keyPoints.map((pt: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700">
                        <span className="text-brand-orange font-bold">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-[10px] text-slate-500 font-mono">
                {option.disclaimer}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Payment & Settlement Informational Channels in Light Theme */}
      <section className="p-8 md:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 text-slate-900">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-700" />
            <h3 className="text-xl font-display font-black text-slate-900">{PAYMENT_CHANNELS_INFO.title}</h3>
          </div>
          <p className="text-xs text-slate-500">{PAYMENT_CHANNELS_INFO.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {PAYMENT_CHANNELS_INFO.channels.map((chan: { name: string; desc: string }, idx: number) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-900 block text-xs">{chan.name}</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">{chan.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-[11px] text-orange-950 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
          <span>{PAYMENT_CHANNELS_INFO.importantDisclaimer}</span>
        </div>
      </section>

    </div>
  );
};
