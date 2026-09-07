import React from 'react';
import { 
  X, 
  MapPin, 
  Truck, 
  Building2, 
  FileText, 
  Download, 
  CheckCircle2, 
  Send,
  Printer
} from 'lucide-react';
import type { PortalLoad } from '../../data/portalData';

interface LoadDetailsDrawerProps {
  load: PortalLoad | null;
  onClose: () => void;
  onAction?: (actionType: string, load: PortalLoad) => void;
}

export const LoadDetailsDrawer: React.FC<LoadDetailsDrawerProps> = ({
  load,
  onClose,
  onAction
}) => {
  if (!load) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div 
        className="relative w-full max-w-xl h-full bg-white border-l border-slate-200 shadow-2xl overflow-y-auto z-10 flex flex-col justify-between text-slate-900 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-md z-20 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-black text-brand-orange bg-orange-100 px-2.5 py-0.5 rounded-lg border border-orange-200">
                {load.loadNumber}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold uppercase">
                {load.status.replace('_', ' ')}
              </span>
              {load.matchScore && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  {load.matchScore}% Match
                </span>
              )}
            </div>
            <h2 className="text-xl font-display font-black text-slate-900">
              {load.origin.city}, {load.origin.state} → {load.destination.city}, {load.destination.state}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body Content */}
        <div className="p-6 space-y-6 text-xs flex-1">
          
          {/* Rate & Financial Strip */}
          <div className="p-5 rounded-2xl bg-orange-50/50 border border-brand-orange/30 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">Agreed Freight Rate</span>
              <span className="text-2xl font-display font-black text-slate-900">${load.rate.toLocaleString()}</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">Rate Per Mile (RPM)</span>
              <span className="text-xl font-mono font-black text-brand-orange">${load.rpm.toFixed(2)}/mi</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">Total Distance</span>
              <span className="text-sm font-mono font-bold text-slate-700">{load.distanceMiles} Miles</span>
            </div>
          </div>

          {/* Lane Route & Timing Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-mono text-[10px] font-bold text-slate-500 uppercase">Route Stops & Schedule</span>
              <span className="text-[11px] font-mono text-cyan-800 font-semibold">{load.distanceMiles} mi transit</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-orange-100 text-brand-orange mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">PICKUP STOP 01</span>
                  <p className="font-bold text-slate-900 text-sm">{load.origin.city}, {load.origin.state} ({load.origin.zip})</p>
                  <p className="text-slate-500 font-mono text-[11px]">{load.pickupDate}</p>
                </div>
              </div>

              <div className="ml-5 pl-4 border-l-2 border-dashed border-slate-300 py-1 text-[11px] text-slate-500">
                Direct highway route via Interstate corridor
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-cyan-100 text-cyan-800 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">DELIVERY STOP 02</span>
                  <p className="font-bold text-slate-900 text-sm">{load.destination.city}, {load.destination.state} ({load.destination.zip})</p>
                  <p className="text-slate-500 font-mono text-[11px]">{load.deliveryDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cargo Specs Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">Trailer Equipment</span>
              <p className="font-bold text-slate-900 text-sm">{load.equipment}</p>
              <span className="text-[11px] text-slate-500">{load.lengthFt} Length</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">Payload Weight</span>
              <p className="font-bold text-slate-900 text-sm">{load.weightLbs.toLocaleString()} LBS</p>
              <span className="text-[11px] text-slate-500">{load.commodity}</span>
            </div>
          </div>

          {/* Special Requirements */}
          {load.specialRequirements.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-mono text-[10px] font-bold text-slate-500 uppercase block">Special Requirements & Securement</span>
              <div className="flex flex-wrap gap-1.5">
                {load.specialRequirements.map((req, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-brand-orange" />
                    <span>{req}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Broker Information */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-700" />
                <span className="font-mono text-[10px] font-bold text-slate-500 uppercase">Tendering Freight Brokerage</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                Credit Score: {load.broker.creditScore}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{load.broker.name}</h4>
                <p className="text-slate-500 text-[11px] font-mono">{load.broker.mc} • Payment Terms: {load.broker.daysToPay} Days</p>
              </div>

              <div className="text-right text-[11px]">
                <p className="font-bold text-slate-900">{load.broker.phone}</p>
                <p className="text-slate-500">{load.broker.email}</p>
              </div>
            </div>
          </div>

          {/* Assigned Carrier (If any) */}
          {load.carrierAssigned && (
            <div className="p-5 rounded-2xl bg-orange-50/40 border border-brand-orange/30 space-y-2">
              <div className="flex items-center gap-2 text-brand-orange font-bold font-mono text-[10px] uppercase">
                <Truck className="w-4 h-4" />
                <span>Assigned Dispatch Unit</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{load.carrierAssigned.name}</h4>
                  <p className="text-slate-600 text-[11px]">Driver: <strong>{load.carrierAssigned.driverName}</strong> • {load.carrierAssigned.truckId}</p>
                </div>
                <span className="font-mono text-xs font-bold text-slate-700">{load.carrierAssigned.phone}</span>
              </div>
            </div>
          )}

          {/* 8-Stage Load Progress Timeline */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <span className="font-mono text-[10px] font-bold text-slate-500 uppercase block">
              Load Operational Lifecycle Timeline
            </span>

            <div className="space-y-3 relative pl-4 border-l-2 border-slate-200 ml-2">
              {load.timeline.map((step, idx) => (
                <div key={idx} className="relative space-y-0.5">
                  <span className={`absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full border-2 ${
                    step.completed ? 'bg-brand-orange border-brand-orange' : 'bg-white border-slate-300'
                  } ${step.current ? 'ring-4 ring-orange-200 animate-pulse' : ''}`} />

                  <div className="flex items-center justify-between">
                    <span className={`font-bold text-xs ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                      {step.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{step.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents Section */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] font-bold text-slate-500 uppercase block">Associated Load Documents</span>
            <div className="space-y-2">
              {load.documents.map((doc, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-brand-orange" />
                    <span className="font-semibold text-slate-800 text-xs">{doc.name}</span>
                  </div>
                  <button 
                    onClick={() => alert(`Downloading ${doc.name}...`)}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
                    title="Download Document"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-5 border-t border-slate-100 bg-white sticky bottom-0 z-20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Printing BOL and Rate Confirmation for ${load.loadNumber}...`)}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
              title="Print Load Packet"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onAction) onAction('REQUEST', load);
                alert(`Load ${load.loadNumber} requested! Your DGW dispatcher will contact ${load.broker.name}.`);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold transition-all shadow-glow-orange flex items-center gap-1.5 uppercase tracking-wider"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Request / Dispatch Load</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
