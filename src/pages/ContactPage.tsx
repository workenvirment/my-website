import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Send,
  Building2
} from 'lucide-react';

interface ContactPageProps {
  onNavigate?: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    mcNumber: '',
    truckType: 'Dry Van (53ft)',
    truckCount: '1 (Owner-Operator)',
    currentLocation: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-mono font-bold uppercase shadow-xs">
          Direct Dispatch Communication
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-950 tracking-tight">
          Contact DGW Solutions LLC
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Ready to get dispatched or have questions about our rates and lanes? Contact our Denver operations desk directly or fill out the 1-minute form below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Contact Info & Office Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Call Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
              Direct Phone Desk
            </span>
            <h2 className="text-2xl font-display font-black text-white">
              Speak With A Dispatcher Now
            </h2>
            <p className="text-xs text-slate-300">
              Our dispatch team is available to discuss your equipment, target RPM, and current freight availability.
            </p>

            <a
              href="tel:+18003495623"
              className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call +1 (800) DGW-LOAD</span>
            </a>
          </div>

          {/* Contact Details Cards */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-5">
            <h3 className="text-lg font-bold text-slate-950 border-b border-slate-200 pb-3">
              Corporate Contact Information
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0">
                  <MapPin className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <span className="font-bold text-slate-950 block">Denver HQ Office Address:</span>
                  <p className="text-slate-600 leading-relaxed font-mono">
                    9057 E 50th Ave Ste 22C<br />
                    Denver, CO 80238
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0">
                  <Mail className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <span className="font-bold text-slate-950 block">Operations Email:</span>
                  <a href="mailto:dispatch.ops@dgwsolutions.com" className="text-amber-700 hover:underline font-mono">
                    dispatch.ops@dgwsolutions.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <span className="font-bold text-slate-950 block">Operating Hours:</span>
                  <p className="text-slate-600 leading-relaxed font-mono">
                    Mon – Sat: 6:00 AM – 8:00 PM MST<br />
                    24/7/365 Emergency Dispatch Desk
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0">
                  <Building2 className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <span className="font-bold text-slate-950 block">Corporate Tax Registration:</span>
                  <p className="text-slate-600 font-mono">
                    EIN: 42-4868007 • Saad Altaf (Sole Member)
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: 1-Minute Carrier Onboarding Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider">
              1-Minute Carrier Application
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-950">
              Get Started With DGW Solutions
            </h2>
            <p className="text-xs text-slate-600">
              Submit your truck specs below. A senior dispatcher will contact you within 15 minutes.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-emerald-900">Application Submitted!</h3>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                Thank you, {formData.name}. Our Denver operations desk will review your details and call you at <strong>{formData.phone}</strong>.
              </p>
              <a
                href="tel:+18003495623"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs shadow-md mt-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us Directly: +1 (800) DGW-LOAD</span>
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
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none"
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
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. driver@carrier.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">MC Number / DOT Number</label>
                <input
                  type="text"
                  value={formData.mcNumber}
                  onChange={(e) => setFormData({ ...formData, mcNumber: e.target.value })}
                  placeholder="e.g. MC-984210"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Trailer / Equipment Type *</label>
                <select
                  value={formData.truckType}
                  onChange={(e) => setFormData({ ...formData, truckType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none"
                >
                  <option value="Dry Van (53ft)">53ft Dry Van</option>
                  <option value="Reefer (53ft)">53ft Reefer (Refrigerated)</option>
                  <option value="Flatbed (48/53ft)">48/53ft Flatbed</option>
                  <option value="Stepdeck">Stepdeck / Drop Deck</option>
                  <option value="Box Truck (26ft)">26ft Box Truck</option>
                  <option value="Hotshot (40ft)">40ft Hotshot</option>
                  <option value="Power Only">Power Only</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Fleet Size *</label>
                <select
                  value={formData.truckCount}
                  onChange={(e) => setFormData({ ...formData, truckCount: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none"
                >
                  <option value="1 (Owner-Operator)">1 Truck (Owner-Operator)</option>
                  <option value="2-5 Trucks">2 – 5 Trucks</option>
                  <option value="6-15 Trucks">6 – 15 Trucks</option>
                  <option value="16+ Trucks">16+ Trucks</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-bold mb-1">Current Location or Preferred Lanes</label>
                <input
                  type="text"
                  value={formData.currentLocation}
                  onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                  placeholder="e.g. Currently in Dallas TX, want loads to Midwest / Southeast"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-bold mb-1">Additional Notes / Questions</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us any special requirements (e.g. minimum RPM, home time preferences)..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none resize-none"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Submit Application to Denver Dispatch Team</span>
                </button>
                <p className="text-[11px] text-slate-500 text-center mt-2 font-mono">
                  🔒 We respect your privacy. No forced dispatch, no spam.
                </p>
              </div>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
