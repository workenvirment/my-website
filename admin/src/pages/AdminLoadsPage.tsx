import React, { useState, useEffect, useMemo } from 'react';
import { 
  Package, 
  Search, 
  Plus, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  MapPin 
} from 'lucide-react';
import { operationsStore } from '../services/operationsStore';
import type { Load, LoadStatus } from '../types/admin';

interface AdminLoadsPageProps {
  onNavigate?: (route: string) => void;
}

export const AdminLoadsPage: React.FC<AdminLoadsPageProps> = () => {
  const [loads, setLoads] = useState<Load[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | LoadStatus>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [newForm, setNewForm] = useState({
    origin: '',
    destination: '',
    equipment: '53ft Dry Van',
    weight: '42,000 lbs',
    rate: 2850,
    brokerName: 'Apex Freight',
    pickupDate: 'Sep 21, 2026',
    deliveryDate: 'Sep 23, 2026'
  });

  useEffect(() => {
    setLoads(operationsStore.getLoads());
    const unsub = operationsStore.subscribe(() => {
      setLoads(operationsStore.getLoads());
    });
    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredLoads = useMemo(() => {
    return loads.filter((l) => {
      if (statusFilter !== 'All' && l.status !== statusFilter) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          l.origin.toLowerCase().includes(q) ||
          l.destination.toLowerCase().includes(q) ||
          l.equipment.toLowerCase().includes(q) ||
          l.brokerName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [loads, statusFilter, searchTerm]);

  const handlePostLoad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.origin.trim() || !newForm.destination.trim()) {
      showToast('Error: Origin and Destination are required.');
      return;
    }

    operationsStore.addLoad({
      loadNumber: 'LD-' + Math.floor(1000 + Math.random() * 9000),
      origin: newForm.origin.trim(),
      destination: newForm.destination.trim(),
      equipment: newForm.equipment,
      weight: newForm.weight,
      rate: Number(newForm.rate) || 2800,
      status: 'Open',
      brokerName: newForm.brokerName,
      pickupDate: newForm.pickupDate,
      deliveryDate: newForm.deliveryDate
    });

    showToast('New load posted to board successfully!');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#0A1322] border border-blue-500/40 text-blue-200 text-xs font-semibold shadow-2xl flex items-center gap-3 animate-fade-in-scale backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-2xl bg-[#0A1322] border border-[#1B293E] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-display text-white tracking-tight">
                Operations Load Board
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 text-[10px] font-mono font-bold">
                {loads.length} Loads
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Available freight opportunities, broker load postings, and carrier assignments.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-blue-900/40 cursor-pointer border border-blue-400/30"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Load</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="p-3.5 rounded-2xl bg-[#0A1322] border border-[#1B293E] grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search lane origin, destination, equipment, broker..."
            className="w-full h-9 pl-9 pr-8 rounded-xl bg-[#08101C] border border-[#1B293E] text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-xs text-slate-200 focus:outline-hidden focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="Assigned">Assigned</option>
            <option value="Booked">Booked</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Grid of Load Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredLoads.map((load) => (
          <div
            key={load.id}
            className="glass-card p-4 rounded-2xl flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-blue-500/15 text-blue-400 border border-blue-500/30">
                  {load.status}
                </span>
                <span className="font-mono text-emerald-400 font-bold text-sm">
                  ${load.rate.toLocaleString()}
                </span>
              </div>

              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{load.origin}</span>
                  <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>{load.destination}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>{load.equipment}</span>
                  <span>{load.weight || 'Standard Weight'}</span>
                </div>
              </div>
            </div>

            <div className="pt-2.5 border-t border-[#1B293E] flex items-center justify-between text-[10.5px]">
              <span className="text-slate-400 font-medium">{load.brokerName}</span>
              <span className="text-slate-500 font-mono">Pick: {load.pickupDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Post Load */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in-scale">
          <div className="bg-[#0A1322] border border-[#1B293E] rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1B293E] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-display text-white">Post New Load</h3>
                  <p className="text-[11px] text-slate-400">Add available freight for dispatch assignment.</p>
                </div>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#08101C] border border-[#1B293E]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePostLoad} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Origin City, State *</label>
                <input
                  type="text"
                  required
                  value={newForm.origin}
                  onChange={(e) => setNewForm({ ...newForm, origin: e.target.value })}
                  placeholder="e.g. Chicago, IL"
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Destination City, State *</label>
                <input
                  type="text"
                  required
                  value={newForm.destination}
                  onChange={(e) => setNewForm({ ...newForm, destination: e.target.value })}
                  placeholder="e.g. Dallas, TX"
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Agreed Rate ($)</label>
                <input
                  type="number"
                  value={newForm.rate}
                  onChange={(e) => setNewForm({ ...newForm, rate: Number(e.target.value) })}
                  placeholder="2800"
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white font-mono focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Equipment</label>
                <select
                  value={newForm.equipment}
                  onChange={(e) => setNewForm({ ...newForm, equipment: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                >
                  <option value="53ft Dry Van">53ft Dry Van</option>
                  <option value="Reefer">Reefer</option>
                  <option value="Flatbed">Flatbed</option>
                  <option value="Power Only">Power Only</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-2 border-t border-[#1B293E]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#08101C] text-slate-300 font-bold text-xs border border-[#1B293E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-900/40 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish Load</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
