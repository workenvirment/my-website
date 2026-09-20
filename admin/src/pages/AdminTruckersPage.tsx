import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Search, 
  FileSpreadsheet, 
  Trash2, 
  Edit3, 
  Eye, 
  Truck, 
  CheckCircle2, 
  Plus, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ShieldAlert,
  MapPin
} from 'lucide-react';
import { operationsStore } from '../services/operationsStore';
import { 
  subscribeToTruckers, 
  createTrucker, 
  updateTrucker, 
  deleteTrucker 
} from '../services/firestoreService';
import type { Trucker, TruckerDoc } from '../types/admin';

interface AdminTruckersPageProps {
  onNavigate?: (route: string) => void;
}

export const AdminTruckersPage: React.FC<AdminTruckersPageProps> = () => {
  const [truckers, setTruckers] = useState<Trucker[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Pending' | 'Inactive'>('All');
  const [equipmentFilter, setEquipmentFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modals
  const [selectedTruckerForView, setSelectedTruckerForView] = useState<Trucker | null>(null);
  const [selectedTruckerForEdit, setSelectedTruckerForEdit] = useState<Trucker | null>(null);
  const [selectedTruckerForDelete, setSelectedTruckerForDelete] = useState<Trucker | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Trucker Form State
  const [newForm, setNewForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    mcNumber: '',
    dotNumber: '',
    equipment: '53ft Dry Van',
    location: '',
    truckCount: '',
    preferredLanes: '',
    notes: ''
  });

  useEffect(() => {
    setTruckers(operationsStore.getTruckers());
    const unsubStore = operationsStore.subscribe(() => {
      setTruckers(operationsStore.getTruckers());
    });

    const unsubFirestore = subscribeToTruckers((truckersList: TruckerDoc[]) => {
      operationsStore.syncFirestoreTruckers(truckersList);
    });

    return () => {
      unsubStore();
      unsubFirestore();
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Status counts
  const counts = useMemo(() => ({
    all: truckers.length,
    active: truckers.filter((t) => t.status === 'Active').length,
    pending: truckers.filter((t) => t.status === 'Pending').length,
    inactive: truckers.filter((t) => t.status === 'Inactive').length
  }), [truckers]);

  // Unique equipment types
  const uniqueEquipment = useMemo(() => {
    const set = new Set<string>();
    truckers.forEach((t) => {
      if (t.equipment) set.add(t.equipment);
    });
    return Array.from(set);
  }, [truckers]);

  // Filtered truckers
  const filteredTruckers = useMemo(() => {
    return truckers.filter((t) => {
      if (statusFilter !== 'All' && t.status !== statusFilter) return false;
      if (equipmentFilter !== 'All' && t.equipment !== equipmentFilter) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          t.name.toLowerCase().includes(q) ||
          t.company.toLowerCase().includes(q) ||
          t.phone.toLowerCase().includes(q) ||
          t.email.toLowerCase().includes(q) ||
          t.mcNumber.toLowerCase().includes(q) ||
          t.location.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [truckers, statusFilter, equipmentFilter, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredTruckers.length / itemsPerPage) || 1;
  const paginatedTruckers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTruckers.slice(start, start + itemsPerPage);
  }, [filteredTruckers, currentPage, itemsPerPage]);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.name || !newForm.phone) {
      showToast('Name and phone are required.');
      return;
    }

    const truckerPayload: Omit<TruckerDoc, 'id' | 'createdAt' | 'updatedAt'> = {
      name: newForm.name,
      company: newForm.company || '',
      phone: newForm.phone,
      email: newForm.email || '',
      mcNumber: newForm.mcNumber || '',
      dotNumber: newForm.dotNumber || '',
      equipment: newForm.equipment || '53ft Dry Van',
      location: newForm.location || '',
      status: 'Pending',
      truckCount: newForm.truckCount || '1',
      preferredLanes: newForm.preferredLanes || '',
      notes: newForm.notes,
      rating: 5.0,
      source: 'Admin Onboarding'
    };

    // Save to Firestore and local store fallback
    const res = await createTrucker(truckerPayload);
    if (!res.success) {
      operationsStore.addTrucker({
        name: truckerPayload.name,
        company: truckerPayload.company || '',
        phone: truckerPayload.phone,
        email: truckerPayload.email || '',
        mcNumber: truckerPayload.mcNumber || '',
        dotNumber: truckerPayload.dotNumber || '',
        equipment: truckerPayload.equipment,
        location: truckerPayload.location || '',
        status: truckerPayload.status,
        lastActive: 'Just now',
        truckCount: truckerPayload.truckCount,
        preferredLanes: truckerPayload.preferredLanes,
        notes: truckerPayload.notes,
        rating: 5.0
      });
    }

    showToast(`Trucker "${newForm.name}" added successfully.`);
    setIsAddModalOpen(false);
    setNewForm({
      name: '',
      company: '',
      phone: '',
      email: '',
      mcNumber: '',
      dotNumber: '',
      equipment: '53ft Dry Van',
      location: '',
      truckCount: '1',
      preferredLanes: '',
      notes: ''
    });
  };

  const handleEditSubmit = async () => {
    if (!selectedTruckerForEdit) return;
    
    await updateTrucker(selectedTruckerForEdit.id, {
      name: selectedTruckerForEdit.name,
      company: selectedTruckerForEdit.company,
      phone: selectedTruckerForEdit.phone,
      status: selectedTruckerForEdit.status,
      notes: selectedTruckerForEdit.notes
    });

    operationsStore.updateTrucker(selectedTruckerForEdit.id, selectedTruckerForEdit);
    showToast(`Trucker "${selectedTruckerForEdit.name}" updated successfully.`);
    setSelectedTruckerForEdit(null);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedTruckerForDelete) return;
    
    await deleteTrucker(selectedTruckerForDelete.id);
    operationsStore.deleteTrucker(selectedTruckerForDelete.id);
    showToast(`Trucker "${selectedTruckerForDelete.name}" deleted.`);
    setSelectedTruckerForDelete(null);
  };

  const exportCSV = () => {
    const headers = ['Name', 'Company', 'Phone', 'Email', 'MC Number', 'DOT Number', 'Equipment', 'Location', 'Status'];
    const rows = filteredTruckers.map((t) => [
      `"${t.name}"`,
      `"${t.company}"`,
      `"${t.phone}"`,
      `"${t.email}"`,
      `"${t.mcNumber}"`,
      `"${t.dotNumber || ''}"`,
      `"${t.equipment}"`,
      `"${t.location}"`,
      `"${t.status}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `dgw_truckers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filteredTruckers.length} truckers to CSV.`);
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
          <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-display text-white">Truckers Network</h1>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 text-[10px] font-mono font-bold">
                {truckers.length} Total
              </span>
            </div>
            <p className="text-xs text-slate-400">Manage owner-operators, dedicated fleets, compliance, and lane assignments.</p>
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
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-900/30 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Trucker</span>
          </button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {[
          { id: 'All', label: 'All Truckers', count: counts.all },
          { id: 'Active', label: 'Active', count: counts.active },
          { id: 'Pending', label: 'Pending Compliance', count: counts.pending },
          { id: 'Inactive', label: 'Inactive', count: counts.inactive }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              statusFilter === tab.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                : 'bg-[#0D1624] border border-[#1E2C3F] text-slate-400 hover:text-white'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
              statusFilter === tab.id ? 'bg-blue-900/60 text-white' : 'bg-[#152336] text-slate-400'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search and Secondary Filter Toolbar */}
      <div className="p-3 rounded-2xl bg-[#0D1624] border border-[#1E2C3F] grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by carrier name, company, MC#, phone, email, location..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="sm:col-span-4">
          <select
            value={equipmentFilter}
            onChange={(e) => setEquipmentFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-slate-300 text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="All">All Equipment Types</option>
            {uniqueEquipment.map((eq) => (
              <option key={eq} value={eq}>{eq}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Truckers Table */}
      <div className="rounded-2xl bg-[#0D1624] border border-[#1E2C3F] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-[#1E2C3F] bg-[#07111F]/70 text-slate-400 text-[10px] uppercase tracking-wider">
                <th className="py-3 px-4 font-bold">Trucker / Company</th>
                <th className="py-3 px-4 font-bold">Phone & Email</th>
                <th className="py-3 px-4 font-bold">MC & DOT</th>
                <th className="py-3 px-4 font-bold">Equipment & Fleet</th>
                <th className="py-3 px-4 font-bold">Location</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2C3F]/40 text-[11px]">
              {paginatedTruckers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-sans">
                    <Truck className="w-8 h-8 mx-auto mb-2 text-slate-600 opacity-50" />
                    <p className="text-sm font-semibold text-slate-400">No truckers found</p>
                    <p className="text-xs text-slate-500 mt-0.5">Onboard qualified carriers from the Carrier Leads queue or manually register a new trucker profile.</p>
                  </td>
                </tr>
              ) : (
                paginatedTruckers.map((trucker) => (
                <tr 
                  key={trucker.id} 
                  className="hover:bg-[#111C2B] transition-colors group cursor-pointer"
                  onClick={() => setSelectedTruckerForView(trucker)}
                >
                  <td className="py-3 px-4 font-sans font-bold text-white">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-600/15 text-blue-400 flex items-center justify-center shrink-0">
                        <Truck className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="block truncate">{trucker.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono font-normal block truncate">{trucker.company}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    <span className="block text-slate-200">{trucker.phone}</span>
                    <span className="text-[10px] text-slate-500 block truncate max-w-[140px]">{trucker.email}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-blue-400 font-bold block">{trucker.mcNumber}</span>
                    <span className="text-[10px] text-slate-500 block">{trucker.dotNumber || 'DOT N/A'}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-sans">
                    <span className="block">{trucker.equipment}</span>
                    <span className="text-[10px] text-slate-500 font-mono block">{trucker.truckCount || '1 Unit'}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    <span className="flex items-center gap-1 font-sans">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {trucker.location}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      trucker.status === 'Active'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : trucker.status === 'Pending'
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          : 'bg-red-500/15 text-red-400 border border-red-500/30'
                    }`}>
                      {trucker.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1 text-slate-400">
                      <button
                        onClick={() => setSelectedTruckerForView(trucker)}
                        className="p-1.5 rounded-lg bg-[#111C2B] hover:bg-[#162438] text-slate-300 hover:text-white border border-[#1E2C3F]"
                        title="View Profile"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setSelectedTruckerForEdit(trucker)}
                        className="p-1.5 rounded-lg bg-[#111C2B] hover:bg-[#162438] text-slate-300 hover:text-blue-400 border border-[#1E2C3F]"
                        title="Edit Trucker"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setSelectedTruckerForDelete(trucker)}
                        className="p-1.5 rounded-lg bg-[#111C2B] hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-[#1E2C3F]"
                        title="Delete Trucker"
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
        <div className="p-3 border-t border-[#1E2C3F] bg-[#07111F]/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            Showing <strong>{filteredTruckers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</strong> to{' '}
            <strong>{Math.min(currentPage * itemsPerPage, filteredTruckers.length)}</strong> of{' '}
            <strong>{filteredTruckers.length}</strong> truckers
          </div>

          <div className="flex items-center gap-2 font-mono">
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

      {/* ==================================================================== */}
      {/* 1. ADD NEW TRUCKER MODAL                                             */}
      {/* ==================================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0D1624] border border-[#1E2C3F] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1E2C3F] pb-3">
              <h3 className="text-lg font-bold font-display text-white">Add New Trucker</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Carrier Name *</label>
                  <input
                    type="text"
                    required
                    value={newForm.name}
                    onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                    placeholder="e.g. Marcus Vance"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Company</label>
                  <input
                    type="text"
                    value={newForm.company}
                    onChange={(e) => setNewForm({ ...newForm, company: e.target.value })}
                    placeholder="e.g. Vance Express LLC"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={newForm.phone}
                    onChange={(e) => setNewForm({ ...newForm, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Email</label>
                  <input
                    type="email"
                    value={newForm.email}
                    onChange={(e) => setNewForm({ ...newForm, email: e.target.value })}
                    placeholder="carrier@example.com"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">MC Number</label>
                  <input
                    type="text"
                    value={newForm.mcNumber}
                    onChange={(e) => setNewForm({ ...newForm, mcNumber: e.target.value })}
                    placeholder="MC-123456"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Equipment</label>
                  <input
                    type="text"
                    value={newForm.equipment}
                    onChange={(e) => setNewForm({ ...newForm, equipment: e.target.value })}
                    placeholder="53ft Dry Van / Reefer"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Location / Operating Base</label>
                <input
                  type="text"
                  value={newForm.location}
                  onChange={(e) => setNewForm({ ...newForm, location: e.target.value })}
                  placeholder="e.g. Chicago, IL"
                  className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#1E2C3F]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#111C2B] hover:bg-[#162438] text-slate-300 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md shadow-blue-900/30 cursor-pointer"
                >
                  Save Trucker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. VIEW DETAILS MODAL                                                */}
      {/* ==================================================================== */}
      {selectedTruckerForView && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0D1624] border border-[#1E2C3F] rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1E2C3F] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-white">{selectedTruckerForView.name}</h3>
                  <p className="text-xs text-slate-400">{selectedTruckerForView.company} • {selectedTruckerForView.mcNumber}</p>
                </div>
              </div>
              <button onClick={() => setSelectedTruckerForView(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">Phone / WhatsApp</span>
                <span className="font-bold text-white font-mono">{selectedTruckerForView.phone}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">Email Address</span>
                <span className="font-bold text-white truncate block">{selectedTruckerForView.email}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">MC / DOT Numbers</span>
                <span className="font-bold text-blue-400 font-mono">{selectedTruckerForView.mcNumber} / {selectedTruckerForView.dotNumber || 'N/A'}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">Status</span>
                <span className="font-bold text-white">{selectedTruckerForView.status}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">Equipment</span>
                <span className="font-bold text-white">{selectedTruckerForView.equipment}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">Preferred Lanes</span>
                <span className="font-bold text-white">{selectedTruckerForView.preferredLanes || 'National'}</span>
              </div>
              <div className="col-span-2 p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">Internal Dispatch Notes</span>
                <p className="text-slate-300 mt-1 leading-relaxed">{selectedTruckerForView.notes || 'No notes on file.'}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#1E2C3F]">
              <button
                onClick={() => {
                  setSelectedTruckerForDelete(selectedTruckerForView);
                  setSelectedTruckerForView(null);
                }}
                className="px-3 py-2 rounded-xl bg-red-500/15 text-red-400 hover:bg-red-500/25 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedTruckerForEdit(selectedTruckerForView);
                    setSelectedTruckerForView(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#111C2B] hover:bg-[#162438] text-slate-200 border border-[#1E2C3F] text-xs font-bold cursor-pointer"
                >
                  Edit Trucker
                </button>
                <button
                  onClick={() => setSelectedTruckerForView(null)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. EDIT TRUCKER MODAL                                                */}
      {/* ==================================================================== */}
      {selectedTruckerForEdit && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0D1624] border border-[#1E2C3F] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1E2C3F] pb-3">
              <h3 className="text-lg font-bold font-display text-white">Edit Trucker Details</h3>
              <button onClick={() => setSelectedTruckerForEdit(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Name</label>
                  <input
                    type="text"
                    value={selectedTruckerForEdit.name}
                    onChange={(e) => setSelectedTruckerForEdit({ ...selectedTruckerForEdit, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Company</label>
                  <input
                    type="text"
                    value={selectedTruckerForEdit.company}
                    onChange={(e) => setSelectedTruckerForEdit({ ...selectedTruckerForEdit, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Phone</label>
                  <input
                    type="text"
                    value={selectedTruckerForEdit.phone}
                    onChange={(e) => setSelectedTruckerForEdit({ ...selectedTruckerForEdit, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Status</label>
                  <select
                    value={selectedTruckerForEdit.status}
                    onChange={(e) => setSelectedTruckerForEdit({ ...selectedTruckerForEdit, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Internal Notes</label>
                <textarea
                  rows={3}
                  value={selectedTruckerForEdit.notes || ''}
                  onChange={(e) => setSelectedTruckerForEdit({ ...selectedTruckerForEdit, notes: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none resize-none leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#1E2C3F]">
              <button
                type="button"
                onClick={() => setSelectedTruckerForEdit(null)}
                className="px-4 py-2 rounded-xl bg-[#111C2B] hover:bg-[#162438] text-slate-300 font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleEditSubmit}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md shadow-blue-900/30 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. DELETE CONFIRMATION MODAL                                         */}
      {/* ==================================================================== */}
      {selectedTruckerForDelete && (
        <div className="fixed inset-0 z-50 bg-[#030812]/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0D1624] border border-red-500/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-center">
            <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/25 text-red-400 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold font-display text-white">Delete Trucker Record</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to delete <strong className="text-white">{selectedTruckerForDelete.name}</strong> from the active fleet network?
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setSelectedTruckerForDelete(null)}
                className="py-2 rounded-xl bg-[#111C2B] border border-[#1E2C3F] text-slate-300 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs cursor-pointer shadow-lg shadow-red-900/30"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
