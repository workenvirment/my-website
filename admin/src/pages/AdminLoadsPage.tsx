import React, { useState, useEffect, useMemo } from 'react';
import { 
  Package, 
  Search, 
  FileSpreadsheet, 
  Plus, 
  Eye, 
  Trash2, 
  MapPin, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ShieldAlert
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modals
  const [selectedLoadForView, setSelectedLoadForView] = useState<Load | null>(null);
  const [selectedLoadForDelete, setSelectedLoadForDelete] = useState<Load | null>(null);
  const [isPostLoadModalOpen, setIsPostLoadModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Post Load Form
  const [newForm, setNewForm] = useState({
    loadNumber: `LD-${Math.floor(1000 + Math.random() * 9000)}`,
    brokerName: '',
    assignedTruckerName: '',
    origin: '',
    destination: '',
    rate: 0,
    mileage: 0,
    equipment: '53ft Dry Van',
    commodity: '',
    weight: '',
    pickupDate: '',
    deliveryDate: '',
    status: 'Open' as LoadStatus,
    notes: ''
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
          l.loadNumber.toLowerCase().includes(q) ||
          l.origin.toLowerCase().includes(q) ||
          l.destination.toLowerCase().includes(q) ||
          l.brokerName.toLowerCase().includes(q) ||
          (l.assignedTruckerName && l.assignedTruckerName.toLowerCase().includes(q)) ||
          l.equipment.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [loads, statusFilter, searchTerm]);

  const totalPages = Math.ceil(filteredLoads.length / itemsPerPage) || 1;
  const paginatedLoads = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLoads.slice(start, start + itemsPerPage);
  }, [filteredLoads, currentPage, itemsPerPage]);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.origin || !newForm.destination || !newForm.rate) {
      showToast('Origin, destination, and rate are required.');
      return;
    }

    operationsStore.addLoad({
      loadNumber: newForm.loadNumber || `LD-${Math.floor(1000 + Math.random() * 9000)}`,
      brokerName: newForm.brokerName || 'Direct Dispatch',
      assignedTruckerName: newForm.assignedTruckerName || 'Unassigned',
      origin: newForm.origin,
      destination: newForm.destination,
      rate: Number(newForm.rate),
      mileage: Number(newForm.mileage) || 0,
      equipment: newForm.equipment,
      commodity: newForm.commodity || 'General Freight',
      weight: newForm.weight || 'Standard Weight',
      pickupDate: newForm.pickupDate || 'Scheduled',
      deliveryDate: newForm.deliveryDate || 'Scheduled',
      status: newForm.status,
      notes: newForm.notes
    });

    showToast(`Load #${newForm.loadNumber} posted successfully.`);
    setIsPostLoadModalOpen(false);
    setNewForm({
      loadNumber: `LD-${Math.floor(1000 + Math.random() * 9000)}`,
      brokerName: '',
      assignedTruckerName: '',
      origin: '',
      destination: '',
      rate: 0,
      mileage: 0,
      equipment: '53ft Dry Van',
      commodity: '',
      weight: '',
      pickupDate: '',
      deliveryDate: '',
      status: 'Open',
      notes: ''
    });
  };

  const handleStatusChange = (loadId: string, newStatus: LoadStatus) => {
    operationsStore.updateLoad(loadId, { status: newStatus });
    showToast(`Load status updated to "${newStatus}".`);
    if (selectedLoadForView && selectedLoadForView.id === loadId) {
      setSelectedLoadForView({ ...selectedLoadForView, status: newStatus });
    }
  };

  const handleDeleteConfirm = () => {
    if (!selectedLoadForDelete) return;
    operationsStore.deleteLoad(selectedLoadForDelete.id);
    showToast(`Load #${selectedLoadForDelete.loadNumber} deleted.`);
    setSelectedLoadForDelete(null);
  };

  const exportCSV = () => {
    const headers = ['Load Number', 'Broker', 'Assigned Trucker', 'Origin', 'Destination', 'Rate', 'Equipment', 'Status'];
    const rows = filteredLoads.map((l) => [
      `"${l.loadNumber}"`,
      `"${l.brokerName}"`,
      `"${l.assignedTruckerName || ''}"`,
      `"${l.origin}"`,
      `"${l.destination}"`,
      `"${l.rate}"`,
      `"${l.equipment}"`,
      `"${l.status}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `dgw_loads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filteredLoads.length} loads to CSV.`);
  };

  return (
    <div className="space-y-4">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#0D1624] border border-blue-500/40 text-blue-300 text-xs font-semibold shadow-2xl flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-display text-white">Dispatch Load Board</h1>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 text-[10px] font-mono font-bold">
                {loads.length} Active
              </span>
            </div>
            <p className="text-xs text-slate-400">Post loads, assign owner-operators, calculate rates, and track transit statuses.</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={exportCSV}
            className="px-3 py-2 rounded-xl bg-[#0D1624] hover:bg-[#111C2B] text-slate-200 border border-[#1E2C3F] text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsPostLoadModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-900/30 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Load</span>
          </button>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="p-3 rounded-2xl bg-[#0D1624] border border-[#1E2C3F] grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by load#, origin, destination, broker, trucker..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="sm:col-span-6 flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
          {(['All', 'Open', 'Assigned', 'Booked', 'In Transit', 'Delivered', 'Cancelled'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
                statusFilter === s ? 'bg-blue-600 text-white shadow-xs' : 'bg-[#07111F] border border-[#1E2C3F] text-slate-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Loads Table */}
      <div className="rounded-2xl bg-[#0D1624] border border-[#1E2C3F] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-[#1E2C3F] bg-[#07111F]/70 text-slate-400 text-[10px] uppercase tracking-wider">
                <th className="py-3 px-4 font-bold">Load #</th>
                <th className="py-3 px-4 font-bold">Broker</th>
                <th className="py-3 px-4 font-bold">Origin → Destination</th>
                <th className="py-3 px-4 font-bold">Rate</th>
                <th className="py-3 px-4 font-bold">Equipment</th>
                <th className="py-3 px-4 font-bold">Assigned Carrier</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2C3F]/40 text-[11px]">
              {paginatedLoads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 font-sans">
                    <Package className="w-8 h-8 mx-auto mb-2 text-slate-600 opacity-50" />
                    <p className="text-sm font-semibold text-slate-400">No loads found</p>
                    <p className="text-xs text-slate-500 mt-0.5">Post a new load or create a dispatch booking to manage active freight.</p>
                  </td>
                </tr>
              ) : (
                paginatedLoads.map((l) => (
                <tr 
                  key={l.id}
                  className="hover:bg-[#111C2B] transition-colors group cursor-pointer"
                  onClick={() => setSelectedLoadForView(l)}
                >
                  <td className="py-3 px-4 font-bold text-blue-400">{l.loadNumber}</td>
                  <td className="py-3 px-4 text-slate-300 font-sans font-bold">{l.brokerName}</td>
                  <td className="py-3 px-4 text-white font-sans">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      {l.origin} → {l.destination}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-emerald-400 text-xs">${l.rate.toLocaleString()}</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">{l.equipment}</td>
                  <td className="py-3 px-4 text-slate-400 font-sans truncate max-w-[140px]">
                    {l.assignedTruckerName || 'Unassigned'}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      l.status === 'Assigned'
                        ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                        : l.status === 'Open'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : l.status === 'In Transit'
                            ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                            : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    }`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1 text-slate-400">
                      <button
                        onClick={() => setSelectedLoadForView(l)}
                        className="p-1.5 rounded-lg bg-[#111C2B] hover:bg-[#162438] text-slate-300 hover:text-white border border-[#1E2C3F]"
                        title="View Load"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setSelectedLoadForDelete(l)}
                        className="p-1.5 rounded-lg bg-[#111C2B] hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-[#1E2C3F]"
                        title="Delete Load"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3 border-t border-[#1E2C3F] bg-[#07111F]/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
          <div>Showing {filteredLoads.length} loads</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-[#0D1624] border border-[#1E2C3F] disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-[#0D1624] border border-[#1E2C3F] disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Post Load Modal */}
      {isPostLoadModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0D1624] border border-[#1E2C3F] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1E2C3F] pb-3">
              <h3 className="text-lg font-bold font-display text-white">Post New Dispatch Load</h3>
              <button onClick={() => setIsPostLoadModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePostSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Load Number</label>
                  <input
                    type="text"
                    value={newForm.loadNumber}
                    onChange={(e) => setNewForm({ ...newForm, loadNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-blue-400 font-mono font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Freight Broker</label>
                  <input
                    type="text"
                    value={newForm.brokerName}
                    onChange={(e) => setNewForm({ ...newForm, brokerName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Origin *</label>
                  <input
                    type="text"
                    required
                    value={newForm.origin}
                    onChange={(e) => setNewForm({ ...newForm, origin: e.target.value })}
                    placeholder="e.g. Chicago, IL"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Destination *</label>
                  <input
                    type="text"
                    required
                    value={newForm.destination}
                    onChange={(e) => setNewForm({ ...newForm, destination: e.target.value })}
                    placeholder="e.g. Dallas, TX"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Rate ($) *</label>
                  <input
                    type="number"
                    required
                    value={newForm.rate}
                    onChange={(e) => setNewForm({ ...newForm, rate: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-emerald-400 font-mono font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Equipment</label>
                  <input
                    type="text"
                    value={newForm.equipment}
                    onChange={(e) => setNewForm({ ...newForm, equipment: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Status</label>
                  <select
                    value={newForm.status}
                    onChange={(e) => setNewForm({ ...newForm, status: e.target.value as LoadStatus })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none"
                  >
                    <option value="Open">Open</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Booked">Booked</option>
                    <option value="In Transit">In Transit</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#1E2C3F]">
                <button
                  type="button"
                  onClick={() => setIsPostLoadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#111C2B] hover:bg-[#162438] text-slate-300 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md shadow-blue-900/30 cursor-pointer"
                >
                  Post Load
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Load Details Modal */}
      {selectedLoadForView && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0D1624] border border-[#1E2C3F] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1E2C3F] pb-3">
              <div>
                <span className="text-xs font-mono text-blue-400 font-bold">{selectedLoadForView.loadNumber}</span>
                <h3 className="text-base font-bold font-display text-white">{selectedLoadForView.origin} → {selectedLoadForView.destination}</h3>
              </div>
              <button onClick={() => setSelectedLoadForView(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">Gross Rate</span>
                <span className="text-emerald-400 font-bold text-base font-mono">${selectedLoadForView.rate.toLocaleString()}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">Equipment</span>
                <span className="font-bold text-white">{selectedLoadForView.equipment}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">Broker</span>
                <span className="font-bold text-white">{selectedLoadForView.brokerName}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">Assigned Trucker</span>
                <span className="font-bold text-white">{selectedLoadForView.assignedTruckerName || 'None'}</span>
              </div>
            </div>

            {/* Quick Status Control */}
            <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F] flex items-center justify-between">
              <span className="text-xs text-slate-400">Change Status:</span>
              <select
                value={selectedLoadForView.status}
                onChange={(e) => handleStatusChange(selectedLoadForView.id, e.target.value as LoadStatus)}
                className="px-2.5 py-1 rounded-lg bg-[#0D1624] border border-[#1E2C3F] text-white text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="Open">Open</option>
                <option value="Assigned">Assigned</option>
                <option value="Booked">Booked</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1E2C3F]">
              <button
                onClick={() => setSelectedLoadForView(null)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Load Modal */}
      {selectedLoadForDelete && (
        <div className="fixed inset-0 z-50 bg-[#030812]/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0D1624] border border-red-500/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-center">
            <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/25 text-red-400 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold font-display text-white">Delete Load Record</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to delete Load <strong className="text-white">#{selectedLoadForDelete.loadNumber}</strong>?
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setSelectedLoadForDelete(null)}
                className="py-2 rounded-xl bg-[#111C2B] border border-[#1E2C3F] text-slate-300 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs cursor-pointer shadow-lg shadow-red-900/30"
              >
                Delete Load
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
