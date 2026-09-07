import React, { useState } from 'react';
import { 
  ChevronRight,
  Eye,
  Plus
} from 'lucide-react';
import { PORTAL_SAMPLE_LOADS } from '../../../data/portalData';
import type { PortalLoad } from '../../../data/portalData';

interface MyLoadsViewProps {
  onSelectLoad: (loadId: string) => void;
  onNavigateView: (view: string) => void;
}

export const MyLoadsView: React.FC<MyLoadsViewProps> = ({ onSelectLoad, onNavigateView }) => {
  const [loads, setLoads] = useState<PortalLoad[]>(PORTAL_SAMPLE_LOADS);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  const STAGES: { id: PortalLoad['status']; label: string; color: string }[] = [
    { id: 'AVAILABLE', label: 'Available / Sourced', color: 'bg-slate-100 text-slate-800' },
    { id: 'REQUESTED', label: 'Requested / Pending Broker', color: 'bg-amber-100 text-amber-800' },
    { id: 'BOOKED', label: 'Rate Con Executed', color: 'bg-blue-100 text-blue-800' },
    { id: 'DISPATCHED', label: 'Dispatched to Driver', color: 'bg-purple-100 text-purple-800' },
    { id: 'IN_TRANSIT', label: 'In Transit Rolling', color: 'bg-orange-100 text-brand-orange' },
    { id: 'DELIVERED', label: 'Delivered / Factored', color: 'bg-emerald-100 text-emerald-800' },
  ];

  const advanceLoadStatus = (loadId: string, currentStatus: PortalLoad['status'], e: React.MouseEvent) => {
    e.stopPropagation();
    const statusOrder: PortalLoad['status'][] = ['AVAILABLE', 'REQUESTED', 'BOOKED', 'DISPATCHED', 'IN_TRANSIT', 'DELIVERED'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    if (currentIndex < statusOrder.length - 1) {
      const nextStatus = statusOrder[currentIndex + 1];
      setLoads(loads.map((l) => l.id === loadId ? { ...l, status: nextStatus } : l));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
            My Loads Lifecycle Tracker
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Interactive Kanban pipeline • Track loads from spot market match to signed POD factoring payout
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-semibold">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'kanban' ? 'bg-brand-orange text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kanban Pipeline
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'list' ? 'bg-brand-orange text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              List View
            </button>
          </div>

          <button
            onClick={() => onNavigateView('load-board')}
            className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold transition-all shadow-glow-orange flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Load</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* KANBAN PIPELINE VIEW                                                      */}
      {/* ========================================================================= */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {STAGES.map((stage) => {
            const stageLoads = loads.filter((l) => l.status === stage.id);

            return (
              <div 
                key={stage.id}
                className="bg-slate-50/80 rounded-3xl border border-slate-200 p-4 space-y-3 flex flex-col justify-between min-w-[240px]"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-display font-black text-slate-800 text-xs truncate">{stage.label}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${stage.color}`}>
                    {stageLoads.length}
                  </span>
                </div>

                {/* Stage Cards List */}
                <div className="space-y-3 flex-1">
                  {stageLoads.map((load) => (
                    <div
                      key={load.id}
                      onClick={() => onSelectLoad(load.id)}
                      className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-brand-orange/60 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 text-xs group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-brand-orange">{load.loadNumber}</span>
                        <span className="font-mono font-bold text-emerald-700">${load.rate}</span>
                      </div>

                      <div className="space-y-1 text-slate-900 font-semibold text-[11px]">
                        <p className="truncate">{load.origin.city}, {load.origin.state}</p>
                        <p className="text-slate-400 font-normal">↓ to</p>
                        <p className="truncate">{load.destination.city}, {load.destination.state}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                        <span>{load.equipment}</span>
                        <span>${load.rpm.toFixed(2)}/mi</span>
                      </div>

                      {/* 1-Click Advance Button */}
                      {stage.id !== 'DELIVERED' && (
                        <button
                          onClick={(e) => advanceLoadStatus(load.id, load.status, e)}
                          className="w-full mt-2 py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-brand-orange hover:text-white text-slate-700 text-[10px] font-bold transition-all flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100"
                        >
                          <span>Move Next Stage</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}

                  {stageLoads.length === 0 && (
                    <div className="p-6 text-center text-slate-400 text-[11px] font-mono border-2 border-dashed border-slate-200 rounded-2xl">
                      Empty stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* LIST VIEW                                                                 */}
      {/* ========================================================================= */}
      {viewMode === 'list' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[11px] font-mono text-slate-500 uppercase border-y border-slate-200">
                <tr>
                  <th className="p-3">Load ID</th>
                  <th className="p-3">Origin</th>
                  <th className="p-3">Destination</th>
                  <th className="p-3">Equipment</th>
                  <th className="p-3">Rate</th>
                  <th className="p-3">RPM</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loads.map((load) => (
                  <tr 
                    key={load.id}
                    onClick={() => onSelectLoad(load.id)}
                    className="hover:bg-orange-50/40 cursor-pointer transition-colors"
                  >
                    <td className="p-3 font-mono font-bold text-brand-orange">{load.loadNumber}</td>
                    <td className="p-3 font-semibold text-slate-900">{load.origin.city}, {load.origin.state}</td>
                    <td className="p-3 font-semibold text-slate-900">{load.destination.city}, {load.destination.state}</td>
                    <td className="p-3 font-mono text-slate-600">{load.equipment}</td>
                    <td className="p-3 font-mono font-bold text-emerald-700">${load.rate}</td>
                    <td className="p-3 font-mono font-bold text-brand-orange">${load.rpm.toFixed(2)}/mi</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-800 uppercase">
                        {load.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectLoad(load.id);
                        }}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
