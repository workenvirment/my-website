import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import type { LeadSubmission } from '../../types';

export const CarrierContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    mcNumber: '',
    equipment: 'Dry Van',
    truckLength: '53 FT',
    currentLocation: '',
    preferredStates: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const submission: LeadSubmission = {
      id: 'lead-' + Date.now(),
      type: 'carrier',
      name: formData.name,
      companyName: formData.companyName,
      phone: formData.phone,
      email: formData.email,
      mcNumber: formData.mcNumber,
      equipment: formData.equipment,
      truckLength: formData.truckLength,
      currentLocation: formData.currentLocation,
      preferredStates: formData.preferredStates,
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
      <div className="p-8 rounded-2xl bg-logistics-900 border border-brand-gold/50 text-center space-y-4 animate-in fade-in">
        <div className="w-12 h-12 rounded-full bg-amber-950 text-brand-gold border border-brand-gold/30 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-lg font-display font-bold text-white">Application Received!</h4>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Thank you, <strong>{formData.name}</strong>. Your carrier details have been securely logged. Our onboarding dispatch specialist will contact you at <strong>{formData.phone}</strong> to review your setup packet.
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
              truckLength: '53 FT',
              currentLocation: '',
              preferredStates: '',
              message: '',
            });
          }}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
        
        <div className="space-y-1">
          <label className="text-slate-300 font-semibold">Owner / Driver Full Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Robert Vance"
            className="w-full px-3.5 py-2.5 rounded-xl bg-logistics-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold"
          />
        </div>

        <div className="space-y-1">
          <label className="text-slate-300 font-semibold">Company / Carrier Legal Name *</label>
          <input
            type="text"
            required
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="e.g. Vance Freight Logistics LLC"
            className="w-full px-3.5 py-2.5 rounded-xl bg-logistics-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold"
          />
        </div>

        <div className="space-y-1">
          <label className="text-slate-300 font-semibold">Phone Number (Dispatch SMS) *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(555) 000-0000"
            className="w-full px-3.5 py-2.5 rounded-xl bg-logistics-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold"
          />
        </div>

        <div className="space-y-1">
          <label className="text-slate-300 font-semibold">Email Address *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="carrier@company.com"
            className="w-full px-3.5 py-2.5 rounded-xl bg-logistics-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold"
          />
        </div>

        <div className="space-y-1">
          <label className="text-slate-300 font-semibold">MC / DOT Number (Optional / Pending)</label>
          <input
            type="text"
            value={formData.mcNumber}
            onChange={(e) => setFormData({ ...formData, mcNumber: e.target.value })}
            placeholder="e.g. MC-123456"
            className="w-full px-3.5 py-2.5 rounded-xl bg-logistics-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold"
          />
        </div>

        <div className="space-y-1">
          <label className="text-slate-300 font-semibold">Equipment Type *</label>
          <select
            value={formData.equipment}
            onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-logistics-950 border border-slate-700 text-white focus:outline-none focus:border-brand-gold"
          >
            <option value="Dry Van">53' Dry Van</option>
            <option value="Reefer">53' Reefer (Refrigerated)</option>
            <option value="Flatbed">48'/53' Flatbed</option>
            <option value="Hotshot">Hotshot Flatbed (30-40ft)</option>
            <option value="Box Truck">Box Truck (16-26ft)</option>
            <option value="Power Only">Power Only Tractor</option>
            <option value="Stepdeck">Stepdeck / Single Drop</option>
            <option value="RGN">RGN (Heavy Haul)</option>
            <option value="Sprinter">Sprinter / Cargo Van</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-slate-300 font-semibold">Current Truck Location / Base Zip *</label>
          <input
            type="text"
            required
            value={formData.currentLocation}
            onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
            placeholder="e.g. Dallas, TX (75201)"
            className="w-full px-3.5 py-2.5 rounded-xl bg-logistics-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold"
          />
        </div>

        <div className="space-y-1">
          <label className="text-slate-300 font-semibold">Preferred States / Running Lanes</label>
          <input
            type="text"
            value={formData.preferredStates}
            onChange={(e) => setFormData({ ...formData, preferredStates: e.target.value })}
            placeholder="e.g. TX, OK, AR, GA, Midwest"
            className="w-full px-3.5 py-2.5 rounded-xl bg-logistics-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold"
          />
        </div>

      </div>

      <div className="space-y-1 text-xs">
        <label className="text-slate-300 font-semibold">Additional Notes / Revenue Goals</label>
        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Let us know your target weekly gross, max deadhead preference, or home-time schedule..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-logistics-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-brand-gold via-amber-400 to-brand-gold text-slate-950 font-bold text-xs hover:from-amber-400 hover:to-brand-gold transition-all flex items-center justify-center gap-2 shadow-glow-gold"
      >
        {loading ? (
          <span>Processing Application...</span>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Submit Carrier Application</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-slate-500 text-center">
        Zero long-term lock-in. You retain 100% final authorization on all load decisions.
      </p>
    </form>
  );
};
