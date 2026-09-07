import React, { useState } from 'react';
import { Building2, ShieldCheck, FileCheck, PhoneCall, FileText, Eye } from 'lucide-react';
import { BrokerCheckTool } from '../components/workflow/BrokerCheckTool';
import { BrokerContactForm } from '../components/forms/BrokerContactForm';
import { DocumentModal } from '../components/common/DocumentModal';
import { DOCUMENTS_LIST } from '../data/documentsData';
import type { DocumentItem } from '../types';

interface BrokersPageProps {
  onNavigate?: (path: string) => void;
}

export const BrokersPage: React.FC<BrokersPageProps> = () => {
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  const openSample = (docId: string) => {
    const doc = DOCUMENTS_LIST.find((d: DocumentItem) => d.id === docId) || DOCUMENTS_LIST[0];
    setSelectedDoc(doc);
  };

  return (
    <div className="space-y-20 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 text-xs font-mono font-bold uppercase">
          <Building2 className="w-3.5 h-3.5" />
          <span>Brokerage & 3PL Logistics Support</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Reliable Carrier Capacity. <br />
          <span className="text-gradient-cyan">Professional Dispatch Communication.</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          When you book freight with a DGW-connected motor carrier, you work with an organized back-office dispatch team dedicated to on-time appointments, verified documentation, and proactive check-calls.
        </p>
      </div>

      {/* 4 Core Broker Guarantees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <FileCheck className="w-5 h-5 text-brand-gold" />, title: 'Pre-Vetted Carrier Packets', desc: 'Instant transmission of active Certificate of Insurance ($1M Auto / $100K+ Cargo), signed W-9, and FMCSA Authority.' },
          { icon: <PhoneCall className="w-5 h-5 text-brand-cyan" />, title: 'Proactive Check-Calls', desc: 'Direct updates upon gate arrival, loading start, departure, and in-transit GPS milestones without chasing drivers.' },
          { icon: <ShieldCheck className="w-5 h-5 text-brand-emerald" />, title: 'Accurate Equipment Specs', desc: 'We verify trailer dimensions, weight tolerances, straps, and food-grade cleanliness prior to dispatching.' },
          { icon: <FileText className="w-5 h-5 text-brand-orange" />, title: 'Rapid POD Turnaround', desc: 'Legible, stamped delivery receipts (POD & BOL) delivered to your accounting department immediately upon unload.' },
        ].map((item, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-logistics-900 border border-slate-700/80 shadow-xl space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-logistics-950 border border-slate-800 w-fit">
                {item.icon}
              </div>
              <h3 className="text-sm font-display font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
            <div className="pt-2 border-t border-slate-800 flex items-center gap-1 text-[10px] text-slate-500 font-mono">
              <span className="text-brand-cyan">✓</span>
              <span>VERIFIED WORKFLOW</span>
            </div>
          </div>
        ))}
      </div>

      {/* Broker Documents Breakdown */}
      <section className="p-8 md:p-10 rounded-3xl bg-logistics-900 border border-slate-700/80 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-brand-cyan uppercase">Documentation Compliance</span>
            <h3 className="text-xl font-display font-extrabold text-white mt-0.5">Brokerage Contracts & Documentation</h3>
          </div>
          <span className="text-xs text-slate-400">Click to preview educational sample templates</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Broker Carrier Agreement */}
          <div className="p-6 rounded-2xl bg-logistics-950 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-brand-gold">MASTER CONTRACT</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">SETUP STAGE</span>
              </div>
              <h4 className="text-base font-bold text-white">Broker-Carrier Agreement (BCA)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Defines independent contractor relationship, standard billing terms, insurance requirements, cargo claims protocols, and non-solicitation covenants.
              </p>
            </div>
            <button
              onClick={() => openSample('doc-bca')}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-brand-gold border border-slate-700 transition-colors flex items-center justify-between"
            >
              <span>View Sample BCA Template</span>
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Rate Confirmation */}
          <div className="p-6 rounded-2xl bg-logistics-950 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-brand-cyan">LOAD CONTRACT</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">BOOKING STAGE</span>
              </div>
              <h4 className="text-base font-bold text-white">Rate Confirmation (RC)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Load-specific binding contract detailing pickup/drop appointments, agreed linehaul rate, weight, special handling instructions, and detention policies.
              </p>
            </div>
            <button
              onClick={() => openSample('doc-rc')}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-brand-cyan border border-slate-700 transition-colors flex items-center justify-between"
            >
              <span>View Sample Rate Con (RC)</span>
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* Broker Qualification Tool */}
      <section className="space-y-6">
        <BrokerCheckTool />
      </section>

      {/* Broker Capacity Inquiry Form */}
      <section className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-logistics-900 to-logistics-950 border border-brand-cyan/40 shadow-glow-cyan space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider">Direct 3PL Connect</span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Connect With DGW Carrier Capacity
          </h2>
          <p className="text-xs text-slate-300">
            Submit your load specifications, lane origins, and required equipment. Our dispatch team will verify matching available trucks and respond promptly.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-logistics-950 border border-slate-800">
          <BrokerContactForm />
        </div>
      </section>

      {/* Document Modal */}
      <DocumentModal
        document={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />

    </div>
  );
};
