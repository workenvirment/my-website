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
import { submitPublicCarrierLead } from '../services/publicFirestoreService';

interface ContactPageProps {
  onNavigate?: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
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
      equipment: formData.truckType,
      truckCount: formData.truckCount,
      preferredLanes: formData.currentLocation,
      message: formData.notes,
      source: 'public_website_contact_page'
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setSubmitError(result.error || 'Unable to submit your inquiry. Please try again.');
    }
  };

  return (
    <div className="space-y-16 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-mono font-bold uppercase shadow-xs">
          Direct Communication Desk
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-950 tracking-tight">
          Contact Dispatching Team
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Connect directly with Dispatching Global World — DGW Solutions LLC to discuss your equipment, preferred operating corridors, and dispatching requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Contact Info & Communication Options */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick WhatsApp Action Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
              Instant Messaging Desk
            </span>
            <h2 className="text-2xl font-display font-black text-white">
              WhatsApp Our Team
            </h2>
            <p className="text-xs text-slate-300">
              Connect directly with our dispatch personnel via WhatsApp for immediate inquiries regarding freight opportunities and onboarding.
            </p>

            <a
              href="https://wa.me/923418341278?text=Hello,%20I%20would%20like%20to%20learn%20more%20about%20your%20truck%20dispatching%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Dispatching Team</span>
            </a>
          </div>

          {/* Contact Details Cards */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-5">
            <h3 className="text-lg font-bold text-slate-950 border-b border-slate-200 pb-3">
              Official Business Information
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0">
                  <Building2 className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <span className="font-bold text-slate-950 block">Company:</span>
                  <p className="text-slate-700 leading-relaxed font-semibold">
                    DGW Solutions LLC
                  </p>
                  <span className="text-slate-500 block text-[11px]">Division: Dispatching Global World</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0">
                  <MapPin className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <span className="font-bold text-slate-950 block">Owner / Leadership:</span>
                  <p className="text-slate-700 leading-relaxed font-semibold">
                    Saad Altaf
                  </p>
                  <span className="text-slate-500 block text-[11px]">Owner — DGW Solutions LLC</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0">
                  <Phone className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <span className="font-bold text-slate-950 block">WhatsApp:</span>
                  <a 
                    href="https://wa.me/923418341278?text=Hello,%20I%20would%20like%20to%20learn%20more%20about%20your%20truck%20dispatching%20services." 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-emerald-700 hover:underline font-mono font-bold"
                  >
                    +92 341 8341278
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0">
                  <Mail className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <span className="font-bold text-slate-950 block">Official Email:</span>
                  <a 
                    href="mailto:dispachingglobal@dgwsolutionllc.com" 
                    className="text-amber-700 hover:underline font-mono break-all"
                  >
                    dispachingglobal@dgwsolutionllc.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <span className="font-bold text-slate-950 block">Dispatch Support:</span>
                  <p className="text-slate-600 leading-relaxed font-mono">
                    Professional Carrier & Owner-Operator Logistics Support
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <a
                href="mailto:dispachingglobal@dgwsolutionllc.com"
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Email Dispatching Team</span>
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Carrier Inquiry & Onboarding Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider">
              Dispatch Inquiry Form
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-950">
              Inquire About Dispatching Services
            </h2>
            <p className="text-xs text-slate-600">
              Submit your equipment details below. Our dispatching team will review your requirements and respond promptly.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-emerald-900">Inquiry Submitted</h3>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                Thank you, {formData.name}. The dispatching team at DGW Solutions LLC has received your information and will follow up with you at <strong>{formData.phone}</strong>.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href="https://wa.me/923418341278?text=Hello,%20I%20would%20like%20to%20learn%20more%20about%20your%20truck%20dispatching%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp Us Directly: +92 341 8341278</span>
                </a>
                <a
                  href="mailto:dispachingglobal@dgwsolutionllc.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>dispachingglobal@dgwsolutionllc.com</span>
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
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none"
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
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. carrier@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">MC / DOT Number (Optional)</label>
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
                  placeholder="e.g. Dallas TX base, running Midwest & Southeast"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-bold mb-1">Additional Requirements / Notes</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Describe your equipment specifications or scheduling preferences..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 outline-none resize-none"
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
                      <span>Submit Inquiry to Dispatching Team</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-slate-500 text-center mt-2 font-mono">
                  Your information is kept confidential.
                </p>
              </div>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
