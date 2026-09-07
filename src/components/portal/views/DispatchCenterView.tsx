import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  Plus, 
  Calendar
} from 'lucide-react';
import { PORTAL_DISPATCH_SCHEDULE } from '../../../data/portalData';
import type { DispatchTimelineSlot } from '../../../data/portalData';

interface DispatchCenterViewProps {
  onNavigateView: (view: string) => void;
  onSelectLoad?: (loadId: string) => void;
}

export const DispatchCenterView: React.FC<DispatchCenterViewProps> = ({
  onNavigateView,
  onSelectLoad
}) => {
  const [schedule] = useState<DispatchTimelineSlot[]>(PORTAL_DISPATCH_SCHEDULE);
  const [selectedSlot, setSelectedSlot] = useState<DispatchTimelineSlot | null>(PORTAL_DISPATCH_SCHEDULE[0]);
  const [noteInput, setNoteInput] = useState('');
  const [notesList, setNotesList] = useState<string[]>([
    'Driver checked in at gate. Loading 24 pallets on schedule.',
    'Seal #884920 attached and verified against BOL.'
  ]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteInput.trim()) {
      setNotesList([noteInput.trim(), ...notesList]);
      setNoteInput('');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
              Dispatcher Command Center
            </h1>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold">
              ACTIVE OPERATIONS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Hourly timeline synchronization • Manage check-calls, driver milestones, and receiver appointments
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => onNavigateView('messages')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold border border-slate-200 shadow-sm flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-brand-orange" />
            <span>Driver Chat</span>
          </button>

          <button
            onClick={() => onNavigateView('load-board')}
            className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold transition-all shadow-glow-orange flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule New Dispatch</span>
          </button>
        </div>
      </div>

      {/* Hourly Timeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col (7): Hourly Dispatch Timeline */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-orange" />
              <h2 className="font-display font-black text-slate-900 text-sm">Today's Hourly Scheduled Activity</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500 font-semibold">
              Live Chronological Feed
            </span>
          </div>

          <div className="space-y-3">
            {schedule.map((slot, idx) => {
              const isSelected = selectedSlot?.truckId === slot.truckId;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                    isSelected
                      ? 'bg-orange-50/50 border-brand-orange/60 shadow-sm'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-brand-orange text-xs">{slot.time}</span>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${
                        slot.status === 'LOADED' ? 'bg-emerald-100 text-emerald-800' :
                        slot.status === 'DELAYED' ? 'bg-red-100 text-red-800' : 'bg-slate-200 text-slate-800'
                      }`}>
                        {slot.status}
                      </span>
                    </div>

                    <p className="font-bold text-slate-900 text-sm">{slot.truckId} ({slot.carrierName})</p>
                    <p className="text-slate-500 text-[11px]">{slot.origin} → {slot.destination}</p>
                    <p className="text-slate-600 font-mono text-[10px]">Driver: <strong>{slot.driverName}</strong> • {slot.milestone}</p>
                  </div>

                  <div className="flex items-center gap-2 sm:self-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Calling driver ${slot.driverName}...`);
                      }}
                      className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
                      title="Direct Driver Call"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-cyan" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectLoad) onSelectLoad(slot.loadId);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-brand-orange text-white font-bold text-[11px] hover:bg-brand-orange-hover transition-colors"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col (5): Dispatch Check-Call Log & Quick Actions */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Selected Slot Operational Control Card */}
          {selectedSlot && (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono font-bold text-slate-900 uppercase">
                    UNIT: {selectedSlot.truckId}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-brand-orange px-2 py-0.5 rounded bg-orange-50 font-bold">
                  {selectedSlot.loadId}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block">Assigned Driver & Route</span>
                <p className="font-bold text-slate-900 text-sm">{selectedSlot.carrierName} ({selectedSlot.driverName})</p>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs flex items-center justify-between">
                  <span>{selectedSlot.origin}</span>
                  <span className="text-brand-orange">→</span>
                  <span>{selectedSlot.destination}</span>
                </div>
              </div>

              {/* Add Dispatcher Milestone Note Form */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-900 block text-xs">Log Milestone / Check-Call Note:</span>
                <form onSubmit={handleAddNote} className="space-y-2">
                  <input
                    type="text"
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="e.g. Receiver appointment confirmed for 14:00..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-orange"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                  >
                    Post Check-Call Note
                  </button>
                </form>
              </div>

              {/* Recent Notes Feed */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Recent Check-Call Logs</span>
                <div className="space-y-1.5">
                  {notesList.map((note, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
