import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  FileText, 
  Phone, 
  Mail, 
  Plus, 
  X
} from 'lucide-react';
import { PORTAL_SAMPLE_CARRIERS } from '../../../data/portalData';
import type { PortalCarrier } from '../../../data/portalData';

export const CarriersDirectoryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCarrier, setSelectedCarrier] = useState<PortalCarrier | null>(null);

  const filteredCarriers = PORTAL_SAMPLE_CARRIERS.filter((car) => {
    const matchesSearch = 
      car.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.mcNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.dotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.currentLocation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || car.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
              Carrier & Fleet Database
            </h1>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-orange-100 text-brand-orange border border-orange-200 font-bold">
              AUTHORIZED MOTOR CARRIERS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Screened carrier network • FMCSA compliance, active equipment capacity, and verified insurance packets
          </p>
        </div>

        <button
          onClick={() => alert('Opening Carrier Onboarding Wizard...')}
          className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold transition-all shadow-glow-orange flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Carrier</span>
        </button>
      </div>

      {/* Filter & Search Strip */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search carrier name, MC number (e.g. MC-994821), DOT number, city/state..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-orange"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange"
            >
              <option value="all">Status: All Carriers</option>
              <option value="VERIFIED">Verified / Dispatch Ready</option>
              <option value="DOCS_MISSING">Action Needed / Docs Missing</option>
              <option value="ACTIVE">Active in Fleet</option>
            </select>
          </div>
        </div>
      </div>

      {/* Carriers Table Grid */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-mono text-slate-500 uppercase border-y border-slate-200">
              <tr>
                <th className="p-3">Carrier Company</th>
                <th className="p-3">MC / DOT Number</th>
                <th className="p-3">Equipment</th>
                <th className="p-3">Current Base</th>
                <th className="p-3">Safety Rating</th>
                <th className="p-3">Compliance</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCarriers.map((car: PortalCarrier) => (
                <tr
                  key={car.id}
                  onClick={() => setSelectedCarrier(car)}
                  className="hover:bg-orange-50/40 cursor-pointer transition-colors"
                >
                  <td className="p-3">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-900 text-sm block">{car.companyName}</span>
                      <span className="text-[11px] text-slate-500 font-mono">Contact: {car.contactName}</span>
                    </div>
                  </td>

                  <td className="p-3 font-mono font-bold text-brand-orange">
                    <div>{car.mcNumber}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{car.dotNumber}</div>
                  </td>

                  <td className="p-3 font-mono">
                    <div className="flex flex-wrap gap-1">
                      {car.equipmentTypes.map((eq, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px]">
                          {eq}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="p-3">
                    <span className="font-semibold text-slate-800">{car.currentLocation}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      Lanes: {car.preferredStates.join(', ')}
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="flex items-center gap-1.5 font-mono text-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="font-bold text-slate-900">{car.ratingScore}% Score</span>
                    </div>
                  </td>

                  <td className="p-3">
                    <span className="text-[11px] font-mono text-slate-600">
                      {car.documents.filter((d) => d.status === 'VERIFIED').length} / {car.documents.length} Docs
                    </span>
                  </td>

                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      car.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' :
                      car.status === 'DOCS_MISSING' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {car.status.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCarrier(car);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-brand-orange hover:text-white text-slate-700 font-semibold text-xs transition-colors"
                    >
                      Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Carrier Full Profile Flyout Modal */}
      {selectedCarrier && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setSelectedCarrier(null)} />

          <div 
            className="relative w-full max-w-xl h-full bg-white border-l border-slate-200 shadow-2xl overflow-y-auto z-10 flex flex-col justify-between text-slate-900 p-6 space-y-6 animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-brand-orange bg-orange-100 px-2.5 py-0.5 rounded">
                  {selectedCarrier.mcNumber} • {selectedCarrier.dotNumber}
                </span>
                <h2 className="text-xl font-display font-black text-slate-900 mt-1">
                  {selectedCarrier.companyName}
                </h2>
                <p className="text-xs text-slate-500">{selectedCarrier.contactName} • {selectedCarrier.currentLocation}</p>
              </div>

              <button
                onClick={() => setSelectedCarrier(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Sections */}
            <div className="space-y-6 text-xs flex-1">
              
              {/* Contact Channels */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-orange" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Direct Phone</span>
                    <span className="font-bold text-slate-900">{selectedCarrier.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-600" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Dispatch Email</span>
                    <span className="font-bold text-slate-900 truncate block max-w-[160px]">{selectedCarrier.email}</span>
                  </div>
                </div>
              </div>

              {/* Document Compliance Checklist */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-mono text-[10px] font-bold text-slate-500 uppercase">
                    Carrier Compliance Document Checklist
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold">100% FMCSA Audit Ready</span>
                </div>

                <div className="space-y-2">
                  {selectedCarrier.documents.map((doc, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-brand-orange" />
                        <span className="font-semibold text-slate-800">{doc.name}</span>
                      </div>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        doc.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' :
                        doc.status === 'EXPIRING_SOON' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {doc.status.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preferred Lanes */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-mono text-[10px] font-bold text-slate-500 uppercase block">Preferred Operating Lanes</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCarrier.preferredStates.map((st, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-mono font-bold text-slate-800 text-xs">
                      {st}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400">DGW Carrier Profile #ID-{selectedCarrier.id}</span>
              <button
                onClick={() => setSelectedCarrier(null)}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors"
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
