import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Phone, 
  Mail, 
  Bookmark, 
  BookmarkCheck, 
  Download
} from 'lucide-react';
import type { McCarrierRecord } from '../../types';

interface McDetailDrawerProps {
  carrier: McCarrierRecord | null;
  onClose: () => void;
  onSaveFavorite?: (carrier: McCarrierRecord) => void;
  isSaved?: boolean;
}

export const McDetailDrawer: React.FC<McDetailDrawerProps> = ({
  carrier,
  onClose,
  onSaveFavorite,
  isSaved = false
}) => {
  const [favoriteActive, setFavoriteActive] = useState(isSaved);
  const [activeTab, setActiveTab] = useState<'overview' | 'insurance' | 'inspections' | 'compliance'>('overview');

  if (!carrier) return null;

  const handleToggleFavorite = () => {
    setFavoriteActive(!favoriteActive);
    if (onSaveFavorite) onSaveFavorite(carrier);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200 flex justify-end">
      
      {/* Drawer Container */}
      <div className="relative w-full max-w-2xl bg-slate-900 border-l border-white/10 shadow-2xl h-full flex flex-col text-white animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-slate-950/80 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/30 text-[10px] font-mono font-bold">
                  {carrier.companyType.toUpperCase()}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  carrier.operatingStatus === 'AUTHORIZED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-red-950 text-red-400'
                }`}>
                  {carrier.operatingStatus}
                </span>
                {carrier.isVerifiedByDgw && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-cyan-400 border border-cyan-500/40 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-cyan-400" />
                    DGW VERIFIED
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-black text-white">
                {carrier.legalName}
              </h2>
              {carrier.dbaName && (
                <p className="text-xs text-slate-400 font-mono">
                  DBA: {carrier.dbaName}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleFavorite}
                className={`p-2 rounded-xl border transition-colors ${
                  favoriteActive ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-slate-800 text-slate-400 border-white/10 hover:text-white'
                }`}
                title="Save Carrier to Favorites"
              >
                {favoriteActive ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Identification Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="p-2 rounded-xl bg-slate-900 border border-white/5">
              <span className="text-[10px] text-slate-500 block">MC NUMBER</span>
              <span className="font-bold text-brand-orange">{carrier.mcNumber}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-white/5">
              <span className="text-[10px] text-slate-500 block">DOT NUMBER</span>
              <span className="font-bold text-white">{carrier.dotNumber}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-white/5">
              <span className="text-[10px] text-slate-500 block">SAFETY RATING</span>
              <span className="font-bold text-emerald-400">{carrier.safetyRating}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-white/5">
              <span className="text-[10px] text-slate-500 block">POWER UNITS</span>
              <span className="font-bold text-white">{carrier.powerUnits} Trucks / {carrier.drivers} Drivers</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex rounded-xl bg-slate-900 p-1 border border-white/5 text-xs">
            {[
              { id: 'overview', label: 'Overview & Authority' },
              { id: 'insurance', label: 'Insurance ($1M)' },
              { id: 'inspections', label: 'FMCSA Safety & OOS' },
              { id: 'compliance', label: 'Contact & Packet' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                  activeTab === t.id ? 'bg-brand-orange text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Drawer Body Scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          
          {/* TAB 1: OVERVIEW & AUTHORITY */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              
              {/* Authority Card */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">FMCSA Operating Authority Status</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    ACTIVE & GRANTED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-slate-300">
                  <div>
                    <span className="text-[10px] text-slate-500 block font-mono">AUTHORITY TYPE</span>
                    <span className="font-bold text-white">{carrier.authorityType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-mono">GRANT DATE</span>
                    <span className="font-bold text-white">{carrier.authorityGrantedDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-mono">OPERATION CLASSIFICATION</span>
                    <span className="font-bold text-white">{carrier.carrierOperation}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-mono">TOTAL ANNUAL MILEAGE</span>
                    <span className="font-bold text-white">{carrier.mileageYear}</span>
                  </div>
                </div>
              </div>

              {/* Equipment Types Carried */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-2.5">
                <span className="font-bold text-sm text-white block">Equipment & Trailer Fleet</span>
                <div className="flex flex-wrap gap-1.5">
                  {carrier.equipmentTypes.map((eq) => (
                    <span key={eq} className="px-2.5 py-1 rounded-xl bg-slate-900 border border-white/10 text-white font-mono font-bold text-[11px] flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-brand-orange" />
                      {eq}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cargo Classifications */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-2.5">
                <span className="font-bold text-sm text-white block">Authorized Cargo Classifications</span>
                <div className="flex flex-wrap gap-1.5">
                  {carrier.cargoCarried.map((cg) => (
                    <span key={cg} className="px-2.5 py-1 rounded-xl bg-slate-900 border border-white/10 text-slate-300 text-[11px]">
                      {cg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {carrier.notes && (
                <div className="p-4 rounded-2xl bg-orange-950/20 border border-brand-orange/30 space-y-1">
                  <span className="font-mono text-brand-orange font-bold text-[10px]">DGW DISPATCH COMPLIANCE AUDIT</span>
                  <p className="text-slate-300 text-xs leading-relaxed">{carrier.notes}</p>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: INSURANCE POLICIES */}
          {activeTab === 'insurance' && (
            <div className="space-y-4">
              
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">Commercial Auto Liability (BIPD)</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    VERIFIED ON FILE
                  </span>
                </div>

                <div className="space-y-2 text-slate-300">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-slate-400">Required Minimum:</span>
                    <span className="font-mono">${carrier.insurance.bipdRequired.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-slate-400">Policy Limit on File:</span>
                    <span className="font-mono font-bold text-emerald-400">${carrier.insurance.bipdOnFile.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-slate-400">Underwriting Insurer:</span>
                    <span className="font-bold text-white">{carrier.insurance.insuranceCompany}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Policy Number:</span>
                    <span className="font-mono text-brand-orange font-bold">{carrier.insurance.policyNumber}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">Motor Truck Cargo Insurance</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    ACTIVE ($250K)
                  </span>
                </div>

                <div className="space-y-2 text-slate-300">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-slate-400">Cargo Coverage Amount:</span>
                    <span className="font-mono font-bold text-emerald-400">${carrier.insurance.cargoOnFile.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Effective Since:</span>
                    <span className="font-mono text-white">{carrier.insurance.effectiveDate}</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: SAFETY & INSPECTIONS */}
          {activeTab === 'inspections' && (
            <div className="space-y-4">
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-2">
                  <span className="text-[10px] text-slate-400 font-mono block">VEHICLE OOS RATE</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-display font-black text-emerald-400">
                      {carrier.inspections.vehicleOosRate}%
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      (Natl Avg: {carrier.inspections.vehicleNationalAvg}%)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{carrier.inspections.vehicleInspections} Roadside Inspections</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-2">
                  <span className="text-[10px] text-slate-400 font-mono block">DRIVER OOS RATE</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-display font-black text-emerald-400">
                      {carrier.inspections.driverOosRate}%
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      (Natl Avg: {carrier.inspections.driverNationalAvg}%)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{carrier.inspections.driverInspections} Driver Inspections</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-2">
                <span className="font-bold text-sm text-white block">DOT Recordable Crashes</span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-black text-base font-mono">
                    {carrier.inspections.totalCrashes}
                  </div>
                  <div>
                    <span className="font-bold text-white block">Zero Fatal or Towaway Crashes (24 Months)</span>
                    <span className="text-[11px] text-slate-400">Meets highest FMCSA safety compliance guidelines.</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: CONTACT & PACKET */}
          {activeTab === 'compliance' && (
            <div className="space-y-4">
              
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-3">
                <span className="font-bold text-sm text-white block">Physical Headquarters & Terminal</span>
                <div className="flex items-start gap-2.5 text-slate-300">
                  <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <span>
                    {carrier.address.street}, {carrier.address.city}, {carrier.address.state} {carrier.address.zip} ({carrier.address.country})
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-3">
                <span className="font-bold text-sm text-white block">Authorized Dispatcher & Officer</span>
                <div className="space-y-2 text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Representative:</span>
                    <span className="font-bold text-white">{carrier.contact.representative}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-brand-orange" />
                    <a href={`tel:${carrier.contact.phone}`} className="hover:text-brand-orange font-mono">
                      {carrier.contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-brand-orange" />
                    <a href={`mailto:${carrier.contact.email}`} className="hover:text-brand-orange font-mono">
                      {carrier.contact.email}
                    </a>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 font-mono">
            Last Updated: {carrier.lastUpdated}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`tel:${carrier.contact.phone}`}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-white/10 flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Dispatch</span>
            </a>

            <button
              onClick={() => alert(`Setup Packet for ${carrier.legalName} (${carrier.mcNumber}) ready for instant download.`)}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 text-white font-bold text-xs shadow-glow-orange flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Carrier File</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
