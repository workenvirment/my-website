import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
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
  MapPin,
  Loader2
} from 'lucide-react';
import { operationsStore } from '../services/operationsStore';
import { 
  subscribeToTruckers, 
  createTrucker, 
  updateTrucker, 
  deleteTrucker 
} from '../services/firestoreService';
import type { Trucker, TruckerDoc, TruckerStatus } from '../types/admin';

interface AdminTruckersPageProps {
  onNavigate?: (route: string) => void;
}

export const AdminTruckersPage: React.FC<AdminTruckersPageProps> = ({ onNavigate }) => {
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
  const [isProcessing, setIsProcessing] = useState(false);

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
    status: 'Active' as TruckerStatus,
    notes: ''
  });

  // Edit Trucker Form State
  const [editForm, setEditForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    mcNumber: '',
    dotNumber: '',
    equipment: '53ft Dry Van',
    location: '',
    status: 'Active' as TruckerStatus,
    notes: ''
  });

  useEffect(() => {
    setTruckers(operationsStore.getTruckers());
    const unsubStore = operationsStore.subscribe(() => {
      setTruckers(operationsStore.getTruckers());
    });

    const unsubFirestore = subscribeToTruckers((truckersList: TruckerDoc[]) => {
      operationsStore.syncFirestoreTruckers(truckersList);
      setTruckers(operationsStore.getTruckers());
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

  const filteredTruckers = useMemo(() => {
    return truckers.filter((t) => {
      if (statusFilter !== 'All' && t.status !== statusFilter) return false;
      if (equipmentFilter !== 'All' && !t.equipment.toLowerCase().includes(equipmentFilter.toLowerCase())) return false;
      
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          t.name.toLowerCase().includes(q) ||
          t.company.toLowerCase().includes(q) ||
          (t.mcNumber && t.mcNumber.toLowerCase().includes(q)) ||
          t.phone.toLowerCase().includes(q) ||
          t.equipment.toLowerCase().includes(q) ||
          t.location.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [truckers, statusFilter, equipmentFilter, searchTerm]);

  const counts = useMemo(() => {
    return {
      all: truckers.length,
      active: truckers.filter((t) => t.status === 'Active').length,
      pending: truckers.filter((t) => t.status === 'Pending').length,
      inactive: truckers.filter((t) => t.status === 'Inactive').length,
    };
  }, [truckers]);

  const totalPages = Math.ceil(filteredTruckers.length / itemsPerPage) || 1;
  const paginatedTruckers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTruckers.slice(start, start + itemsPerPage);
  }, [filteredTruckers, currentPage, itemsPerPage]);

  const handleAddTrucker = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.name.trim() || !newForm.phone.trim()) {
      showToast('Error: Name and Phone are required.');
      return;
    }

    setIsProcessing(true);
    const res = await createTrucker({
      name: newForm.name.trim(),
      company: newForm.company.trim() || 'Independent Owner Operator',
      phone: newForm.phone.trim(),
      email: newForm.email.trim(),
      mcNumber: newForm.mcNumber.trim() || 'MC-Pending',
      dotNumber: newForm.dotNumber.trim(),
      equipment: newForm.equipment,
      location: newForm.location.trim() || 'Pending Assignment',
      status: newForm.status,
      notes: newForm.notes.trim()
    });
    setIsProcessing(false);

    if (res.success) {
      showToast(`Trucker "${newForm.name}" registered successfully!`);
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
        status: 'Active',
        notes: ''
      });
    } else {
      showToast(`Error: ${res.error || 'Failed to add trucker'}`);
    }
  };

  const openEditModal = (t: Trucker) => {
    setSelectedTruckerForEdit(t);
    setEditForm({
      name: t.name,
      company: t.company,
      phone: t.phone,
      email: t.email || '',
      mcNumber: t.mcNumber || '',
      dotNumber: t.dotNumber || '',
      equipment: t.equipment,
      location: t.location,
      status: t.status,
      notes: t.notes || ''
    });
  };

  const handleSaveEdit = async () => {
    if (!selectedTruckerForEdit?.id) return;
    setIsProcessing(true);

    const res = await updateTrucker(selectedTruckerForEdit.id, {
      name: editForm.name.trim(),
      company: editForm.company.trim(),
      phone: editForm.phone.trim(),
      email: editForm.email.trim(),
      mcNumber: editForm.mcNumber.trim(),
      dotNumber: editForm.dotNumber.trim(),
      equipment: editForm.equipment,
      location: editForm.location.trim(),
      status: editForm.status,
      notes: editForm.notes.trim()
    });
    setIsProcessing(false);

    if (res.success) {
      showToast(`Trucker "${editForm.name}" updated successfully.`);
      setSelectedTruckerForEdit(null);
    } else {
      showToast(`Error: ${res.error || 'Failed to update'}`);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedTruckerForDelete?.id) return;
    setIsProcessing(true);

    const name = selectedTruckerForDelete.name;
    const res = await deleteTrucker(selectedTruckerForDelete.id);
    setIsProcessing(false);

    if (res.success) {
      showToast(`Trucker "${name}" removed from registry.`);
      setSelectedTruckerForDelete(null);
      if (selectedTruckerForView?.id === selectedTruckerForDelete.id) {
        setSelectedTruckerForView(null);
      }
    } else {
      showToast(`Error: ${res.error || 'Permission denied'}`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#0A1322] border border-blue-500/40 text-blue-200 text-xs font-semibold shadow-2xl flex items-center gap-3 animate-fade-in-scale backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-2xl bg-[#0A1322] border border-[#1B293E] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-display text-white tracking-tight">
                Fleet Truckers Directory
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold">
                {truckers.length} Onboarded
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified carrier fleet database, driver contact info, and active dispatch roster.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-blue-900/40 cursor-pointer border border-blue-400/30"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Trucker</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {[
          { id: 'All', label: 'All Fleet', count: counts.all },
          { id: 'Active', label: 'Active Roster', count: counts.active, highlight: true },
          { id: 'Pending', label: 'Pending Packet', count: counts.pending },
          { id: 'Inactive', label: 'Inactive', count: counts.inactive },
        ].map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 border border-blue-400/40'
                  : 'bg-[#0A1322] border border-[#1B293E] text-slate-400 hover:text-white hover:border-slate-600'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                isActive
                  ? 'bg-blue-950 text-white font-black'
                  : tab.highlight
                    ? 'bg-emerald-500/20 text-emerald-400 font-bold'
                    : 'bg-[#15253D] text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Equipment Filter */}
      <div className="p-3.5 rounded-2xl bg-[#0A1322] border border-[#1B293E] grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search trucker name, company, MC#, equipment, location, phone..."
            className="w-full h-9 pl-9 pr-8 rounded-xl bg-[#08101C] border border-[#1B293E] text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="sm:col-span-4">
          <select
            value={equipmentFilter}
            onChange={(e) => setEquipmentFilter(e.target.value)}
            className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-xs text-slate-200 focus:outline-hidden focus:border-blue-500 transition-colors"
          >
            <option value="All">All Equipment Types</option>
            <option value="Dry Van">53ft Dry Van</option>
            <option value="Reefer">Reefer (Temperature Controlled)</option>
            <option value="Flatbed">Flatbed / Stepdeck</option>
            <option value="Power Only">Power Only</option>
            <option value="Box Truck">Box Truck</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#0A1322] border border-[#1B293E] shadow-sm overflow-hidden">
        {filteredTruckers.length === 0 ? (
          <div className="py-16 text-center space-y-3 font-mono">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <Truck className="w-6 h-6 opacity-60" />
            </div>
            <div>
              <p className="text-sm font-bold font-sans text-white">No truckers found</p>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                {searchTerm || statusFilter !== 'All' || equipmentFilter !== 'All'
                  ? 'Try adjusting search terms or filters.'
                  : 'Add a new trucker or convert an inbound carrier lead.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1B293E] bg-[#08101C] text-[10.5px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4 font-semibold">Trucker / Company</th>
                  <th className="py-3 px-4 font-semibold">MC & DOT</th>
                  <th className="py-3 px-4 font-semibold">Equipment / Location</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1B293E]/50 text-xs">
                {paginatedTruckers.map((trucker) => (
                  <tr 
                    key={trucker.id}
                    className="hover:bg-[#0D182A]/80 transition-colors group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-950/80 border border-amber-800/40 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
                          <Truck className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white text-xs truncate group-hover:text-amber-300 transition-colors">
                            {trucker.name}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            <span>{trucker.company}</span>
                            <span className="text-slate-600">•</span>
                            <a href={`tel:${trucker.phone}`} className="text-emerald-400 hover:underline font-mono">
                              {trucker.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-mono text-[11px]">
                        <span className="font-bold text-blue-400 bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-800/40">
                          {trucker.mcNumber || 'MC-Pending'}
                        </span>
                        {trucker.dotNumber && (
                          <span className="text-slate-400 ml-1.5">
                            {trucker.dotNumber}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-semibold text-slate-200 block">{trucker.equipment}</span>
                        <span className="text-[10.5px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{trucker.location || 'Any Region'}</span>
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase inline-flex items-center gap-1.5 ${
                        trucker.status === 'Active' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                        trucker.status === 'Pending' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {trucker.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                        {trucker.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedTruckerForView(trucker)}
                          className="p-1.5 rounded-lg bg-[#08101C] hover:bg-[#111F33] text-slate-400 hover:text-white border border-[#1B293E] transition-colors cursor-pointer"
                          title="View Profile"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => openEditModal(trucker)}
                          className="p-1.5 rounded-lg bg-[#08101C] hover:bg-[#111F33] text-slate-400 hover:text-blue-400 border border-[#1B293E] transition-colors cursor-pointer"
                          title="Edit Record"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setSelectedTruckerForDelete(trucker)}
                          className="p-1.5 rounded-lg bg-[#08101C] hover:bg-red-500/20 text-slate-500 hover:text-red-400 border border-[#1B293E] transition-colors cursor-pointer"
                          title="Delete Trucker"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {filteredTruckers.length > 0 && (
          <div className="p-3.5 border-t border-[#1B293E] bg-[#08101C] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-slate-400 font-mono text-[11px]">
              Showing <span className="text-white font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="text-white font-bold">{Math.min(currentPage * itemsPerPage, filteredTruckers.length)}</span> of{' '}
              <span className="text-white font-bold">{filteredTruckers.length}</span> truckers
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`p-1.5 rounded-lg border border-[#1B293E] bg-[#0A1322] text-slate-300 ${
                  currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#111F33] hover:text-white cursor-pointer'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="font-mono text-[11px] text-slate-400 px-2">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`p-1.5 rounded-lg border border-[#1B293E] bg-[#0A1322] text-slate-300 ${
                  currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#111F33] hover:text-white cursor-pointer'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Add Trucker */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in-scale">
          <div className="bg-[#0A1322] border border-[#1B293E] rounded-2xl max-w-xl w-full p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1B293E] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-display text-white">Add New Fleet Trucker</h3>
                  <p className="text-[11px] text-slate-400">Directly add a carrier to the live Firestore fleet roster.</p>
                </div>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#08101C] border border-[#1B293E] cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTrucker} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Driver / Owner Name *</label>
                <input
                  type="text"
                  required
                  value={newForm.name}
                  onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                  placeholder="e.g. Marcus Miller"
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Company Name</label>
                <input
                  type="text"
                  value={newForm.company}
                  onChange={(e) => setNewForm({ ...newForm, company: e.target.value })}
                  placeholder="e.g. Miller Express LLC"
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Phone Number *</label>
                <input
                  type="text"
                  required
                  value={newForm.phone}
                  onChange={(e) => setNewForm({ ...newForm, phone: e.target.value })}
                  placeholder="(555) 000-0000"
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white font-mono focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  value={newForm.email}
                  onChange={(e) => setNewForm({ ...newForm, email: e.target.value })}
                  placeholder="carrier@example.com"
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">MC Number</label>
                <input
                  type="text"
                  value={newForm.mcNumber}
                  onChange={(e) => setNewForm({ ...newForm, mcNumber: e.target.value })}
                  placeholder="MC-123456"
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
                  <option value="Reefer">Reefer (Temp Controlled)</option>
                  <option value="Flatbed">Flatbed / Stepdeck</option>
                  <option value="Power Only">Power Only</option>
                  <option value="Box Truck">Box Truck</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Base Location</label>
                <input
                  type="text"
                  value={newForm.location}
                  onChange={(e) => setNewForm({ ...newForm, location: e.target.value })}
                  placeholder="e.g. Dallas, TX"
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Status</label>
                <select
                  value={newForm.status}
                  onChange={(e) => setNewForm({ ...newForm, status: e.target.value as TruckerStatus })}
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Dispatch Notes</label>
                <textarea
                  rows={2}
                  value={newForm.notes}
                  onChange={(e) => setNewForm({ ...newForm, notes: e.target.value })}
                  placeholder="Special instructions, preferred lanes..."
                  className="w-full p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
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
                  disabled={isProcessing}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-900/40 flex items-center gap-1.5"
                >
                  {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>Save Trucker</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: View Profile */}
      {selectedTruckerForView && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in-scale">
          <div className="bg-[#0A1322] border border-[#1B293E] rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1B293E] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-display text-white">{selectedTruckerForView.name}</h3>
                  <p className="text-[11px] text-slate-400">{selectedTruckerForView.company} • {selectedTruckerForView.mcNumber}</p>
                </div>
              </div>
              <button onClick={() => setSelectedTruckerForView(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#08101C] border border-[#1B293E]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Phone</span>
                <a href={`tel:${selectedTruckerForView.phone}`} className="text-emerald-400 font-bold hover:underline font-mono">{selectedTruckerForView.phone}</a>
              </div>
              <div className="p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Status</span>
                <span className="font-bold text-white">{selectedTruckerForView.status}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Equipment</span>
                <span className="font-bold text-white">{selectedTruckerForView.equipment}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Location</span>
                <span className="font-bold text-white">{selectedTruckerForView.location}</span>
              </div>
              <div className="col-span-2 p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Dispatch Notes</span>
                <p className="text-slate-300 mt-0.5">{selectedTruckerForView.notes || 'No dispatch notes recorded.'}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1B293E]">
              {onNavigate && (
                <button
                  onClick={() => {
                    setSelectedTruckerForView(null);
                    onNavigate('/messages');
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-900/40"
                >
                  Send Message
                </button>
              )}
              <button
                onClick={() => setSelectedTruckerForView(null)}
                className="px-4 py-2 rounded-xl bg-[#08101C] hover:bg-[#111F33] text-slate-300 font-bold text-xs border border-[#1B293E]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Edit Trucker */}
      {selectedTruckerForEdit && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in-scale">
          <div className="bg-[#0A1322] border border-[#1B293E] rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1B293E] pb-3">
              <div>
                <h3 className="text-sm font-bold font-display text-white">Edit Trucker: {selectedTruckerForEdit.name}</h3>
                <p className="text-[11px] text-slate-400">Update carrier status, contact, or equipment details.</p>
              </div>
              <button onClick={() => setSelectedTruckerForEdit(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#08101C] border border-[#1B293E]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Carrier Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Company</label>
                <input
                  type="text"
                  value={editForm.company}
                  onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Phone</label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white font-mono focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value as TruckerStatus })}
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Equipment</label>
                <input
                  type="text"
                  value={editForm.equipment}
                  onChange={(e) => setEditForm({ ...editForm, equipment: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Location</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Dispatch Notes</label>
                <textarea
                  rows={2}
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1B293E]">
              <button
                onClick={() => setSelectedTruckerForEdit(null)}
                className="px-4 py-2 rounded-xl bg-[#08101C] hover:bg-[#111F33] text-slate-300 font-bold text-xs border border-[#1B293E]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={isProcessing}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-900/40 flex items-center gap-1.5"
              >
                {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Delete Trucker */}
      {selectedTruckerForDelete && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in-scale">
          <div className="bg-[#0A1322] border border-red-500/40 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-display text-white">Delete Fleet Record</h3>
                <p className="text-[11px] text-slate-400">Permanently removes trucker from Firestore.</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to remove <strong className="text-white">"{selectedTruckerForDelete.name}"</strong> ({selectedTruckerForDelete.company}) from the fleet?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1B293E]">
              <button
                onClick={() => setSelectedTruckerForDelete(null)}
                className="px-4 py-2 rounded-xl bg-[#08101C] text-slate-300 font-bold text-xs border border-[#1B293E]"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isProcessing}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-950 flex items-center gap-1.5"
              >
                {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
