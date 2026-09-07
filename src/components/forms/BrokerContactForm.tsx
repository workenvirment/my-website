import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import type { LeadSubmission } from '../../types';

export const BrokerContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    mcNumber: '',
    equipment: 'Dry Van',
    origin: '',
    destination: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const submission: LeadSubmission = {
      id: 'lead-' + Date.now(),
      type: 'broker',
      name: formData.name,
      companyName: formData.companyName,
      phone: formData.phone,
      email: formData.email,
      mcNumber: formData.mcNumber,
      equipment: formData.equipment,
      origin: formData.origin,
      destination: formData.destination,
      message: formData.message,
      submittedAt: new Date().toLocaleString(),
      status: 'New',
    };

    try {
      const existing = localStorage.getItem('dgw_leads_store');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(submission);
      localStorage.setItem('dgw_leads_store', JSON.stringify(list));
    } catch {
      // ignore
    }

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-logistics-900 border border-brand-cyan/50 text-center space-y-4 animate-in fade-in">
        <div className="w-12 h-12 rounded-full bg-cyan-950 text-brand-cyan border border-brand-cyan/30 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-lg font-display font-bold text-white">Capacity Inquiry Received</h4>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Thank you, <strong>{formData.companyName}</strong>. Our logistics coordinators will review your lane requirements and match available qualified carrier capacity immediately.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              companyName: '',
              phone: '',
              email: '',
              mcNumber: '',
              equipment: 'Dry Van',
              origin: '',
              destination: '',
              message: '',
            });
          }}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
        >
          Submit Another Load Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
        
        <div className="space-y-1">
          <label className="text-slate-300 font-semibold">Brokerage / Company Name *</label>
          <input
            type="text"
            required
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="e.g. Apex 3PL Logistics"
            className="w-full px-3.5 py-2.5 rounded-xl bg-logistics-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
          />
        </div>

        <div className="space-y-1">
          <label className="text-slate-300 font-semibold">Contact Representative Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Marcus Brody"
            className="w-full px-3.5 py-2.5 rounded-xl bg-logistics-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
          />
        </div>

        <div className="space-y-1">
          <label className="text-slate-300 font-semibold">Broker MC / DOT Number</label>
          <input
            type="text"
            value={formData.mcNumber}
            onChange={(e) => setFormData({ ...formData, mcNumber: e.target.value })}
            placeholder="e.g. MC-894201"
            className="w-full px-3.5 py-2.5 rounded-xl bg-logistics-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
          />
        </div>

        <div className="space-y-1">
          <label className="text-slate-300 font-semibold">Required Equipment *</label>
          <select
            value={formData.equipment}
            onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-logistics-950 border border-slate-700 text-white focus:outline-none focus:border-brand-cyan"
          >
            <option value="Dry Van">53' Dry Van</option>
            <option value="Reefer">53' Reefer (Temp Control)</option>
            <option value="Flatbed">48'/53' Flatbed</option>
            <option value="Hotshot">Hotshot Flatbed</option>
            <option value="Box Truck">Straight Box Truck (26ft)</option>
            <option value="Power Only">Power Only Tractor</option>
            <option value="Stepdeck">Stepdeck / Drop Deck</option>
            <option value="RGN">RGN Heavy Haul</option>
            <option value="Sprinter">Sprinter / Cargo Van</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-slate-300 font-semibold">Direct Phone *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(555) 000-0000"
            className="w-full px-3.5 py-2.5 rounded-xl bg-logistics-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
          />
        </div>

        <div className="space-y-1">
          <label className="text-slate-300 font-semibold">Direct Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="broker@company.com"
            className="w-full px-3.5 py-2.5 rounded-xl bg-logistics-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
          />
        </div>

        <div className="space-y-1">
          <label className="text-slate-300 font-semibold">Origin City, State</label>
          <input
            type="text"
            value={formData.origin}
            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
            placeholder="e.g. Dallas, TX"
            className="w-full px-3.5 py-2.5 rounded-xl bg-logistics-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
          />
        </div>

        <div className="space-y-1">
          <label className="text-slate-300 font-semibold">Destination City, State</label>
          <input
            type="text"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            placeholder="e.g. Atlanta, GA"
            className="w-full px-3.5 py-2.5 rounded-xl bg-logistics-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
          />
        </div>

      </div>

      <div className="space-y-1 text-xs">
        <label className="text-slate-300 font-semibold">Load Specifics / Commodity & Rate Notes</label>
        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Include commodity weight, appointment schedules, target rate, or recurring lane requirements..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-logistics-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 rounded-xl bg-brand-cyan text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-glow-cyan"
      >
        {loading ? (
          <span>Transmitting Load Specs...</span>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Submit Capacity & Load Request</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-slate-500 text-center">
        DGW coordinates verified carriers with active $1,000,000 Auto Liability and $100k+ Cargo insurance.
      </p>
    </form>
  );
};
