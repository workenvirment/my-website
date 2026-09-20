import React, { useState, useEffect, useMemo } from 'react';
import { 
  subscribeToCarrierLeads, 
  updateCarrierLeadStatus,
  updateCarrierLead,
  deleteCarrierLead,
  convertLeadToTrucker,
  exportCarrierLeadsToCSV,
  formatFirestoreDate
} from '../services/firestoreService';
import type { CarrierLeadDoc, LeadStatus, TruckerStatus } from '../types/admin';
import { 
  Users, 
  Search, 
  FileSpreadsheet, 
  Trash2, 
  Edit3, 
  Eye, 
  Phone, 
  Mail, 
  Truck, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ShieldAlert,
  ArrowUpDown,
  UserCheck,
  Sparkles
} from 'lucide-react';

interface AdminCarrierLeadsPageProps {
  onNavigate?: (route: string) => void;
}

export const AdminCarrierLeadsPage: React.FC<AdminCarrierLeadsPageProps> = () => {
  const [leads, setLeads] = useState<CarrierLeadDoc[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [firestoreError, setFirestoreError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Filters & Search State
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [equipmentFilter, setEquipmentFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<'createdAt' | 'name' | 'company'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  // Modal States
  const [selectedLeadForView, setSelectedLeadForView] = useState<CarrierLeadDoc | null>(null);
  const [selectedLeadForEdit, setSelectedLeadForEdit] = useState<CarrierLeadDoc | null>(null);
  const [selectedLeadForDelete, setSelectedLeadForDelete] = useState<CarrierLeadDoc | null>(null);
  const [selectedLeadForConvert, setSelectedLeadForConvert] = useState<CarrierLeadDoc | null>(null);

  // Edit Form State
  const [editFormStatus, setEditFormStatus] = useState<LeadStatus>('new');
  const [editFormNotes, setEditFormNotes] = useState<string>('');
  const [editFormCompany, setEditFormCompany] = useState<string>('');
  const [editFormEquipment, setEditFormEquipment] = useState<string>('');
  const [editFormLanes, setEditFormLanes] = useState<string>('');

  // Convert to Trucker Form State
  const [convertFormName, setConvertFormName] = useState<string>('');
  const [convertFormCompany, setConvertFormCompany] = useState<string>('');
  const [convertFormPhone, setConvertFormPhone] = useState<string>('');
  const [convertFormEmail, setConvertFormEmail] = useState<string>('');
  const [convertFormMcNumber, setConvertFormMcNumber] = useState<string>('');
  const [convertFormDotNumber, setConvertFormDotNumber] = useState<string>('');
  const [convertFormEquipment, setConvertFormEquipment] = useState<string>('');
  const [convertFormTruckCount, setConvertFormTruckCount] = useState<string>('');
  const [convertFormLanes, setConvertFormLanes] = useState<string>('');
  const [convertFormLocation, setConvertFormLocation] = useState<string>('');
  const [convertFormStatus, setConvertFormStatus] = useState<TruckerStatus>('Pending');
  const [convertFormNotes, setConvertFormNotes] = useState<string>('');

  // Real-time Firestore Subscription
  useEffect(() => {
    setIsLoading(true);
    setFirestoreError(null);

    const unsub = subscribeToCarrierLeads(
      (data) => {
        setLeads(data);
        setIsLoading(false);
      },
      (err) => {
        console.error('[CarrierLeadsPage Subscription Error]:', err);
        setFirestoreError('Unable to load carrier leads: ' + err.message);
        setIsLoading(false);
      },
      150
    );

    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Status Counts
  const counts = useMemo(() => {
    return {
      all: leads.length,
      new: leads.filter((l) => l.status === 'new').length,
      in_review: leads.filter((l) => l.status === 'in_review').length,
      contacted: leads.filter((l) => l.status === 'contacted').length,
      onboarded: leads.filter((l) => l.status === 'onboarded').length,
      archived: leads.filter((l) => l.status === 'archived').length,
    };
  }, [leads]);

  // Unique equipment types for dropdown
  const uniqueEquipment = useMemo(() => {
    const set = new Set<string>();
    leads.forEach((l) => {
      if (l.equipment) set.add(l.equipment);
    });
    return Array.from(set);
  }, [leads]);

  // Filtered and Sorted Leads
  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) => {
        // Status filter
        if (statusFilter !== 'all' && lead.status !== statusFilter) {
          return false;
        }

        // Equipment filter
        if (equipmentFilter !== 'all' && lead.equipment !== equipmentFilter) {
          return false;
        }

        // Search term
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchName = lead.name?.toLowerCase().includes(q);
          const matchCompany = lead.company?.toLowerCase().includes(q);
          const matchEmail = lead.email?.toLowerCase().includes(q);
          const matchPhone = lead.phone?.toLowerCase().includes(q);
          const matchMc = lead.mcNumber?.toLowerCase().includes(q);
          const matchEquip = lead.equipment?.toLowerCase().includes(q);
          const matchLanes = lead.preferredLanes?.toLowerCase().includes(q);
          const matchNotes = lead.message?.toLowerCase().includes(q);

          return (
            matchName ||
            matchCompany ||
            matchEmail ||
            matchPhone ||
            matchMc ||
            matchEquip ||
            matchLanes ||
            matchNotes
          );
        }

        return true;
      })
      .sort((a, b) => {
        if (sortField === 'createdAt') {
          const tA = a.createdAt?.seconds || 0;
          const tB = b.createdAt?.seconds || 0;
          return sortOrder === 'desc' ? tB - tA : tA - tB;
        }
        if (sortField === 'name') {
          const nA = (a.name || '').toLowerCase();
          const nB = (b.name || '').toLowerCase();
          return sortOrder === 'desc' ? nB.localeCompare(nA) : nA.localeCompare(nB);
        }
        if (sortField === 'company') {
          const cA = (a.company || '').toLowerCase();
          const cB = (b.company || '').toLowerCase();
          return sortOrder === 'desc' ? cB.localeCompare(cA) : cA.localeCompare(cB);
        }
        return 0;
      });
  }, [leads, statusFilter, equipmentFilter, searchTerm, sortField, sortOrder]);

  // Pagination Slice
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage) || 1;
  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLeads.slice(start, start + itemsPerPage);
  }, [filteredLeads, currentPage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, equipmentFilter, itemsPerPage]);

  // Open Edit Modal
  const openEditModal = (lead: CarrierLeadDoc) => {
    setSelectedLeadForEdit(lead);
    setEditFormStatus(lead.status || 'new');
    setEditFormNotes(lead.message || '');
    setEditFormCompany(lead.company || '');
    setEditFormEquipment(lead.equipment || '');
    setEditFormLanes(lead.preferredLanes || '');
  };

  // Open Convert to Trucker Modal
  const openConvertModal = (lead: CarrierLeadDoc) => {
    if (lead.truckerId || lead.status === 'onboarded') {
      showToast(`This lead has already been onboarded into the Truckers network.`);
      return;
    }
    setSelectedLeadForConvert(lead);
    setConvertFormName(lead.name || '');
    setConvertFormCompany(lead.company || '');
    setConvertFormPhone(lead.phone || '');
    setConvertFormEmail(lead.email || '');
    setConvertFormMcNumber(lead.mcNumber || '');
    setConvertFormDotNumber('');
    setConvertFormEquipment(lead.equipment || '53ft Dry Van');
    setConvertFormTruckCount(lead.truckCount || '1');
    setConvertFormLanes(lead.preferredLanes || '');
    setConvertFormLocation(lead.preferredLanes ? lead.preferredLanes.split(',')[0].trim() : '');
    setConvertFormStatus('Pending');
    setConvertFormNotes(lead.message || '');
  };

  // Execute Lead -> Trucker Conversion
  const handleExecuteConversion = async () => {
    if (!selectedLeadForConvert?.id) return;
    setIsProcessing(true);

    const result = await convertLeadToTrucker(
      selectedLeadForConvert.id,
      selectedLeadForConvert,
      {
        name: convertFormName,
        company: convertFormCompany,
        phone: convertFormPhone,
        email: convertFormEmail,
        mcNumber: convertFormMcNumber,
        dotNumber: convertFormDotNumber,
        equipment: convertFormEquipment,
        truckCount: convertFormTruckCount,
        preferredLanes: convertFormLanes,
        location: convertFormLocation,
        status: convertFormStatus,
        notes: convertFormNotes
      }
    );

    setIsProcessing(false);

    if (result.success) {
      showToast(`Lead successfully converted to Trucker! (Trucker ID: ${result.truckerId})`);
      setSelectedLeadForConvert(null);
      if (selectedLeadForView?.id === selectedLeadForConvert.id) {
        setSelectedLeadForView({
          ...selectedLeadForView,
          status: 'onboarded',
          truckerId: result.truckerId
        });
      }
    } else {
      showToast(`Conversion failed: ${result.error || 'Unknown error'}`);
    }
  };

  // Submit Edit Form
  const handleSaveEdit = async () => {
    if (!selectedLeadForEdit?.id) return;
    setIsProcessing(true);

    const result = await updateCarrierLead(selectedLeadForEdit.id, {
      status: editFormStatus,
      message: editFormNotes,
      company: editFormCompany,
      equipment: editFormEquipment,
      preferredLanes: editFormLanes
    });

    setIsProcessing(false);

    if (result.success) {
      showToast(`Lead for "${selectedLeadForEdit.name}" updated successfully.`);
      setSelectedLeadForEdit(null);
    } else {
      showToast(`Error: ${result.error || 'Failed to update lead'}`);
    }
  };

  // Handle Quick Status Change
  const handleQuickStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    setIsProcessing(true);
    const result = await updateCarrierLeadStatus(leadId, newStatus);
    setIsProcessing(false);

    if (result.success) {
      showToast(`Status updated to "${newStatus.replace('_', ' ')}"`);
      if (selectedLeadForView?.id === leadId) {
        setSelectedLeadForView({ ...selectedLeadForView, status: newStatus });
      }
    } else {
      showToast(`Error: ${result.error || 'Failed to change status'}`);
    }
  };

  // Handle Delete Lead with Confirmation
  const handleDeleteConfirm = async () => {
    if (!selectedLeadForDelete?.id) return;
    setIsProcessing(true);

    const leadName = selectedLeadForDelete.name;
    const result = await deleteCarrierLead(selectedLeadForDelete.id);
    setIsProcessing(false);

    if (result.success) {
      showToast(`Carrier lead "${leadName}" permanently deleted.`);
      setSelectedLeadForDelete(null);
      if (selectedLeadForView?.id === selectedLeadForDelete.id) {
        setSelectedLeadForView(null);
      }
    } else {
      showToast(`Error deleting lead: ${result.error || 'Permission denied'}`);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    exportCarrierLeadsToCSV(
      filteredLeads, 
      `dgw_carrier_leads_${statusFilter}_${new Date().toISOString().slice(0, 10)}.csv`
    );
    showToast(`Exported ${filteredLeads.length} leads to CSV.`);
  };

  // Helper for Status Badges
  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'new':
        return (
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-[10px] font-mono font-bold flex items-center gap-1.5 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            NEW
          </span>
        );
      case 'in_review':
        return (
          <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/25 text-[10px] font-mono font-bold inline-flex">
            IN REVIEW
          </span>
        );
      case 'contacted':
        return (
          <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/25 text-[10px] font-mono font-bold inline-flex">
            CONTACTED
          </span>
        );
      case 'onboarded':
        return (
          <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/25 text-[10px] font-mono font-bold inline-flex">
            ONBOARDED
          </span>
        );
      case 'archived':
      default:
        return (
          <span className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/60 text-[10px] font-mono font-bold inline-flex">
            ARCHIVED
          </span>
        );
    }
  };

  return (
    <div className="space-y-5">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#0D1624] border border-blue-500/40 text-blue-300 text-xs font-semibold shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-display text-white tracking-tight">
                Carrier Leads & Applications
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono font-bold">
                {leads.length} Total
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live fleet inquiries, owner-operator applications, and dispatch assignments.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            disabled={filteredLeads.length === 0}
            className={`px-3.5 py-2 rounded-xl bg-[#111C2B] hover:bg-[#162438] text-slate-200 border border-[#1E2C3F] text-xs font-bold transition-all flex items-center gap-2 shadow-sm ${
              filteredLeads.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-slate-600'
            }`}
            title="Download formatted CSV"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV ({filteredLeads.length})</span>
          </button>
        </div>
      </div>

      {/* Firestore Error Alert */}
      {firestoreError && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <div className="flex-1">
            <p className="font-bold">Database Error</p>
            <p className="text-red-400 text-[11px]">{firestoreError}</p>
          </div>
        </div>
      )}

      {/* Status Filter Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {[
          { id: 'all', label: 'All Leads', count: counts.all },
          { id: 'new', label: 'New / Pending', count: counts.new, highlight: counts.new > 0 },
          { id: 'in_review', label: 'In Review', count: counts.in_review },
          { id: 'contacted', label: 'Contacted', count: counts.contacted },
          { id: 'onboarded', label: 'Onboarded', count: counts.onboarded },
          { id: 'archived', label: 'Archived', count: counts.archived },
        ].map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                  : 'bg-[#0D1624] border border-[#1E2C3F] text-slate-400 hover:text-white hover:border-slate-600'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                isActive
                  ? 'bg-blue-900/60 text-white font-black'
                  : tab.highlight
                    ? 'bg-emerald-500/15 text-emerald-400 font-bold'
                    : 'bg-[#152336] text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Secondary Filter Bar */}
      <div className="p-3.5 rounded-2xl bg-[#0D1624] border border-[#1E2C3F] grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        
        {/* Search Input */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by carrier name, company, MC#, phone, email, lanes..."
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Equipment Filter */}
        <div className="sm:col-span-3">
          <select
            value={equipmentFilter}
            onChange={(e) => setEquipmentFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-slate-300 text-xs focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
          >
            <option value="all">All Equipment Types</option>
            {uniqueEquipment.map((eq) => (
              <option key={eq} value={eq}>{eq}</option>
            ))}
          </select>
        </div>

        {/* Sort Controls */}
        <div className="sm:col-span-3 flex items-center gap-2">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as any)}
            className="flex-1 px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-slate-300 text-xs focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
          >
            <option value="createdAt">Date Created</option>
            <option value="name">Carrier Name</option>
            <option value="company">Company</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="p-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] hover:border-slate-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={`Sort ${sortOrder === 'desc' ? 'Ascending' : 'Descending'}`}
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Table / Data Feed */}
      <div className="rounded-2xl bg-[#0D1624] border border-[#1E2C3F] overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="p-16 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
            <p className="text-xs text-slate-400">Loading carrier leads from Firestore...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#111C2B] border border-[#1E2C3F] text-slate-500 flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white font-display">No Carrier Leads Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {searchTerm || statusFilter !== 'all' || equipmentFilter !== 'all'
                  ? 'No records match your active search and filter criteria. Try clearing filters.'
                  : 'No carrier applications have been submitted to Firestore yet.'}
              </p>
            </div>
            {(searchTerm || statusFilter !== 'all' || equipmentFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setEquipmentFilter('all');
                }}
                className="px-4 py-2 rounded-xl bg-[#152336] hover:bg-[#1E2C3F] text-xs font-bold text-slate-200 border border-[#1E2C3F] cursor-pointer transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#1E2C3F] bg-[#07111F]/70 text-slate-400 font-mono uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4 font-bold">Carrier / Contact</th>
                  <th className="py-3 px-4 font-bold">Company & MC</th>
                  <th className="py-3 px-4 font-bold">Equipment & Fleet</th>
                  <th className="py-3 px-4 font-bold">Operating Lanes</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold">Submitted</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2C3F]/50">
                {paginatedLeads.map((lead) => (
                  <tr 
                    key={lead.id} 
                    className="hover:bg-[#152336]/40 transition-colors group"
                  >
                    {/* Contact & Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#111C2B] border border-[#1E2C3F] text-blue-400 font-bold flex items-center justify-center shrink-0 text-xs">
                          {lead.name ? lead.name.charAt(0).toUpperCase() : 'C'}
                        </div>
                        <div className="min-w-0">
                          <button
                            onClick={() => setSelectedLeadForView(lead)}
                            className="font-bold text-white hover:text-blue-400 transition-colors block truncate text-left cursor-pointer"
                          >
                            {lead.name || 'Unnamed Carrier'}
                          </button>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                            {lead.phone && (
                              <a 
                                href={`tel:${lead.phone}`}
                                className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
                                title="Call carrier"
                              >
                                <Phone className="w-3 h-3 text-slate-500" />
                                <span>{lead.phone}</span>
                              </a>
                            )}
                            {lead.email && (
                              <a 
                                href={`mailto:${lead.email}`}
                                className="hover:text-blue-400 flex items-center gap-1 transition-colors"
                                title="Email carrier"
                              >
                                <Mail className="w-3 h-3 text-slate-500" />
                                <span className="truncate max-w-[120px]">{lead.email}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Company & MC */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-slate-200 block truncate max-w-[160px]">
                          {lead.company || '—'}
                        </span>
                        <span className="font-mono text-[10px] text-blue-400/90 block">
                          {lead.mcNumber ? `MC# ${lead.mcNumber}` : 'MC Pending'}
                        </span>
                      </div>
                    </td>

                    {/* Equipment & Fleet */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                          <Truck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="truncate max-w-[150px]">{lead.equipment || 'Dry Van'}</span>
                        </div>
                        {lead.truckCount && (
                          <span className="text-[10px] font-mono text-slate-500 block">
                            Fleet: {lead.truckCount}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Lanes */}
                    <td className="py-3.5 px-4 max-w-[180px]">
                      <span className="text-slate-300 text-[11px] line-clamp-2" title={lead.preferredLanes}>
                        {lead.preferredLanes || 'Regional / National'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      {getStatusBadge(lead.status)}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-400 text-[11px] font-mono whitespace-nowrap">
                      {formatFirestoreDate(lead.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {/* Onboard as Trucker */}
                        {lead.status !== 'onboarded' && !lead.truckerId ? (
                          <button
                            onClick={() => openConvertModal(lead)}
                            className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 border border-emerald-500/25 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                            title="Onboard Lead as Real Trucker"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span className="hidden xl:inline">Onboard</span>
                          </button>
                        ) : (
                          <span 
                            className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-mono font-bold flex items-center gap-1"
                            title={`Onboarded Trucker ID: ${lead.truckerId || 'Active'}`}
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span className="hidden xl:inline">Onboarded</span>
                          </span>
                        )}

                        {/* View Details */}
                        <button
                          onClick={() => setSelectedLeadForView(lead)}
                          className="p-1.5 rounded-lg bg-[#111C2B] hover:bg-[#162438] text-slate-300 hover:text-white border border-[#1E2C3F] transition-colors cursor-pointer"
                          title="View Full Profile"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Edit Lead */}
                        <button
                          onClick={() => openEditModal(lead)}
                          className="p-1.5 rounded-lg bg-[#111C2B] hover:bg-[#162438] text-slate-300 hover:text-blue-400 border border-[#1E2C3F] transition-colors cursor-pointer"
                          title="Edit Lead Status & Notes"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Lead */}
                        <button
                          onClick={() => setSelectedLeadForDelete(lead)}
                          className="p-1.5 rounded-lg bg-[#111C2B] hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-[#1E2C3F] hover:border-red-500/30 transition-colors cursor-pointer"
                          title="Delete Lead Record"
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

        {/* Table Footer & Pagination */}
        {!isLoading && filteredLeads.length > 0 && (
          <div className="p-3.5 border-t border-[#1E2C3F] bg-[#07111F]/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <span>
                Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> to{' '}
                <strong>{Math.min(currentPage * itemsPerPage, filteredLeads.length)}</strong> of{' '}
                <strong>{filteredLeads.length}</strong> leads
              </span>

              <div className="flex items-center gap-1.5 text-[11px]">
                <span>Rows:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="px-2 py-1 rounded-lg bg-[#0D1624] border border-[#1E2C3F] text-white text-xs cursor-pointer"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`p-1.5 rounded-lg bg-[#0D1624] border border-[#1E2C3F] text-slate-300 transition-colors ${
                  currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#152336] hover:text-white cursor-pointer'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="font-mono text-xs px-2 text-slate-300">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`p-1.5 rounded-lg bg-[#0D1624] border border-[#1E2C3F] text-slate-300 transition-colors ${
                  currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#152336] hover:text-white cursor-pointer'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ==================================================================== */}
      {/* 1. VIEW DETAILS MODAL */}
      {/* ==================================================================== */}
      {selectedLeadForView && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0D1624] border border-[#1E2C3F] rounded-2xl max-w-2xl w-full p-6 sm:p-7 space-y-5 shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#1E2C3F] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400 font-bold flex items-center justify-center text-base">
                  {selectedLeadForView.name ? selectedLeadForView.name.charAt(0).toUpperCase() : 'C'}
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-white">
                    {selectedLeadForView.name || 'Unnamed Carrier'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {selectedLeadForView.company ? `${selectedLeadForView.company} • ` : ''}
                    Document ID: <span className="font-mono text-blue-400">{selectedLeadForView.id}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedLeadForView(null)}
                className="p-1.5 rounded-lg bg-[#111C2B] hover:bg-[#162438] text-slate-400 hover:text-white border border-[#1E2C3F] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Status Control */}
            <div className="p-3.5 rounded-xl bg-[#07111F] border border-[#1E2C3F] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Status:</span>
                {getStatusBadge(selectedLeadForView.status)}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-mono">Quick Change:</span>
                <select
                  value={selectedLeadForView.status}
                  onChange={(e) => selectedLeadForView.id && handleQuickStatusChange(selectedLeadForView.id, e.target.value as LeadStatus)}
                  disabled={isProcessing}
                  className="px-2.5 py-1 rounded-lg bg-[#0D1624] border border-[#1E2C3F] text-white text-xs font-semibold focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="new">New</option>
                  <option value="in_review">In Review</option>
                  <option value="contacted">Contacted</option>
                  <option value="onboarded">Onboarded</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            {/* Lead to Trucker Onboarding Status Banner */}
            {selectedLeadForView.status === 'onboarded' || selectedLeadForView.truckerId ? (
              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Official Fleet Trucker</span>
                    <span className="text-[11px] font-mono text-purple-300">
                      Onboarded Trucker ID: <strong className="text-white">{selectedLeadForView.truckerId || 'Active'}</strong>
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold">
                  Onboarded
                </span>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0A1A2F] border border-emerald-500/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Ready to convert to Trucker?</span>
                    <span className="text-[11px] text-slate-300">
                      Review and convert this website lead into an official fleet trucker profile.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const targetLead = selectedLeadForView;
                    setSelectedLeadForView(null);
                    openConvertModal(targetLead);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-900/30 flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Onboard as Trucker</span>
                </button>
              </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]/70 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Phone / Contact</span>
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold font-mono">{selectedLeadForView.phone || '—'}</span>
                  {selectedLeadForView.phone && (
                    <div className="flex items-center gap-1.5">
                      <a
                        href={`https://wa.me/${selectedLeadForView.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 text-[10px] font-bold"
                      >
                        WhatsApp
                      </a>
                      <a
                        href={`tel:${selectedLeadForView.phone}`}
                        className="px-2 py-0.5 rounded bg-[#152336] text-slate-300 hover:bg-[#1E2C3F] text-[10px] font-bold"
                      >
                        Call
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]/70 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Email Address</span>
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold truncate">{selectedLeadForView.email || '—'}</span>
                  {selectedLeadForView.email && (
                    <a
                      href={`mailto:${selectedLeadForView.email}`}
                      className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 hover:bg-blue-500/25 text-[10px] font-bold shrink-0"
                    >
                      Compose
                    </a>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]/70 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Company / Carrier Name</span>
                <span className="text-white font-semibold block">{selectedLeadForView.company || 'Not Provided'}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]/70 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">MC / DOT Number</span>
                <span className="text-blue-400 font-semibold font-mono block">
                  {selectedLeadForView.mcNumber ? `MC# ${selectedLeadForView.mcNumber}` : 'Pending / None'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]/70 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Equipment Type</span>
                <span className="text-white font-semibold block">{selectedLeadForView.equipment || 'Dry Van'}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]/70 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Fleet Size</span>
                <span className="text-white font-semibold block">{selectedLeadForView.truckCount || '1 Truck'}</span>
              </div>

              <div className="sm:col-span-2 p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]/70 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Operating Corridors / Preferred Lanes</span>
                <span className="text-slate-200 block">{selectedLeadForView.preferredLanes || 'National / All 48 States'}</span>
              </div>

              <div className="sm:col-span-2 p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]/70 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Notes / Application Specs</span>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {selectedLeadForView.message || 'No additional notes provided.'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]/70 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Submission Source</span>
                <span className="text-slate-400 font-mono text-[11px] block">{selectedLeadForView.source || 'Website'}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]/70 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Creation Date</span>
                <span className="text-slate-400 font-mono text-[11px] block">
                  {formatFirestoreDate(selectedLeadForView.createdAt)}
                </span>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="border-t border-[#1E2C3F] pt-4 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedLeadForDelete(selectedLeadForView);
                }}
                className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>

              <div className="flex items-center gap-2">
                {selectedLeadForView.status !== 'onboarded' && !selectedLeadForView.truckerId && (
                  <button
                    onClick={() => {
                      const targetLead = selectedLeadForView;
                      setSelectedLeadForView(null);
                      openConvertModal(targetLead);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500/30 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-900/30"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Onboard as Trucker</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    openEditModal(selectedLeadForView);
                    setSelectedLeadForView(null);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#152336] hover:bg-[#1E2C3F] text-slate-200 border border-[#1E2C3F] text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Edit Lead</span>
                </button>
                <button
                  onClick={() => setSelectedLeadForView(null)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-md shadow-blue-900/30"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. EDIT / UPDATE MODAL */}
      {/* ==================================================================== */}
      {selectedLeadForEdit && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0D1624] border border-[#1E2C3F] rounded-2xl max-w-xl w-full p-6 sm:p-7 space-y-5 shadow-2xl relative">
            
            <div className="flex items-start justify-between border-b border-[#1E2C3F] pb-4">
              <div>
                <h3 className="text-lg font-bold font-display text-white">Edit Carrier Lead</h3>
                <p className="text-xs text-slate-400">
                  Update status, operational notes, and equipment details for <strong>{selectedLeadForEdit.name}</strong>.
                </p>
              </div>
              <button
                onClick={() => setSelectedLeadForEdit(null)}
                className="p-1.5 rounded-lg bg-[#111C2B] hover:bg-[#162438] text-slate-400 hover:text-white border border-[#1E2C3F] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              
              <div>
                <label className="block text-slate-300 font-bold mb-1">Dispatch Status *</label>
                <select
                  value={editFormStatus}
                  onChange={(e) => setEditFormStatus(e.target.value as LeadStatus)}
                  className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500 font-medium"
                >
                  <option value="new">New / Pending Review</option>
                  <option value="in_review">In Review (Dispatch Analyzing)</option>
                  <option value="contacted">Contacted (In Discussion)</option>
                  <option value="onboarded">Onboarded (Active Fleet Partner)</option>
                  <option value="archived">Archived (Closed / Inactive)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Company Name</label>
                <input
                  type="text"
                  value={editFormCompany}
                  onChange={(e) => setEditFormCompany(e.target.value)}
                  placeholder="e.g. Vance Logistics LLC"
                  className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Equipment Type</label>
                <input
                  type="text"
                  value={editFormEquipment}
                  onChange={(e) => setEditFormEquipment(e.target.value)}
                  placeholder="e.g. 53ft Dry Van / Reefer"
                  className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Preferred Operating Lanes</label>
                <input
                  type="text"
                  value={editFormLanes}
                  onChange={(e) => setEditFormLanes(e.target.value)}
                  placeholder="e.g. Midwest to Texas, Southeast regional"
                  className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Internal Notes / Message</label>
                <textarea
                  rows={3}
                  value={editFormNotes}
                  onChange={(e) => setEditFormNotes(e.target.value)}
                  placeholder="Add internal dispatch notes, rate agreements, or contact logs..."
                  className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
                />
              </div>

            </div>

            <div className="border-t border-[#1E2C3F] pt-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedLeadForEdit(null)}
                disabled={isProcessing}
                className="px-4 py-2 rounded-xl bg-[#111C2B] hover:bg-[#162438] text-slate-300 border border-[#1E2C3F] text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={isProcessing}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-900/30 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. DELETE CONFIRMATION MODAL */}
      {/* ==================================================================== */}
      {selectedLeadForDelete && (
        <div className="fixed inset-0 z-50 bg-[#030812]/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0D1624] border border-red-500/40 rounded-2xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl relative">
            
            <div className="text-center space-y-2.5">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 flex items-center justify-center mx-auto">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">Delete Carrier Lead</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Are you sure you want to permanently delete the lead record for{' '}
                <strong className="text-white font-bold">{selectedLeadForDelete.name}</strong>?
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Document ID:</span>
                <span className="font-mono text-slate-300">{selectedLeadForDelete.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Company:</span>
                <span className="text-slate-300 font-semibold">{selectedLeadForDelete.company || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">MC Number:</span>
                <span className="font-mono text-blue-400">{selectedLeadForDelete.mcNumber || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone:</span>
                <span className="font-mono text-slate-300">{selectedLeadForDelete.phone || '—'}</span>
              </div>
            </div>

            <p className="text-[11px] text-red-400/90 font-mono text-center">
              ⚠️ Warning: This action directly executes on Firestore and cannot be recovered.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => setSelectedLeadForDelete(null)}
                disabled={isProcessing}
                className="py-2.5 rounded-xl bg-[#111C2B] hover:bg-[#162438] border border-[#1E2C3F] text-slate-300 font-bold text-xs cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isProcessing}
                className="py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-900/40 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Record</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. ONBOARD / CONVERT LEAD TO TRUCKER MODAL                          */}
      {/* ==================================================================== */}
      {selectedLeadForConvert && (
        <div className="fixed inset-0 z-50 bg-[#030812]/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0D1624] border border-emerald-500/40 rounded-2xl max-w-2xl w-full p-6 sm:p-7 space-y-5 shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#1E2C3F] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-base">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-white">
                    Onboard Lead as Real Trucker
                  </h3>
                  <p className="text-xs text-slate-400">
                    Review and verify lead details before generating a genuine trucker record in the database.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedLeadForConvert(null)}
                className="p-1.5 rounded-lg bg-[#111C2B] hover:bg-[#162438] text-slate-400 hover:text-white border border-[#1E2C3F] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Verification Notice */}
            <div className="p-3 rounded-xl bg-[#07111F] border border-emerald-500/20 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-slate-500">Originating Lead ID:</span>
                <span className="font-mono text-blue-400 font-bold">{selectedLeadForConvert.id}</span>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold">
                Verification & Onboarding
              </span>
            </div>

            {/* Review and Edit Fields */}
            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Carrier / Driver Name *</label>
                  <input
                    type="text"
                    required
                    value={convertFormName}
                    onChange={(e) => setConvertFormName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Company Name</label>
                  <input
                    type="text"
                    value={convertFormCompany}
                    onChange={(e) => setConvertFormCompany(e.target.value)}
                    placeholder="e.g. Vance Logistics LLC"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={convertFormPhone}
                    onChange={(e) => setConvertFormPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={convertFormEmail}
                    onChange={(e) => setConvertFormEmail(e.target.value)}
                    placeholder="carrier@example.com"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">MC Number</label>
                  <input
                    type="text"
                    value={convertFormMcNumber}
                    onChange={(e) => setConvertFormMcNumber(e.target.value)}
                    placeholder="MC-123456"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-blue-400 font-bold focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">USDOT Number</label>
                  <input
                    type="text"
                    value={convertFormDotNumber}
                    onChange={(e) => setConvertFormDotNumber(e.target.value)}
                    placeholder="DOT-3456789"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Equipment Type</label>
                  <input
                    type="text"
                    value={convertFormEquipment}
                    onChange={(e) => setConvertFormEquipment(e.target.value)}
                    placeholder="53ft Dry Van / Reefer"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Fleet / Truck Count</label>
                  <input
                    type="text"
                    value={convertFormTruckCount}
                    onChange={(e) => setConvertFormTruckCount(e.target.value)}
                    placeholder="1 Unit"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Initial Onboarding Status *</label>
                  <select
                    value={convertFormStatus}
                    onChange={(e) => setConvertFormStatus(e.target.value as TruckerStatus)}
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-emerald-500 font-medium"
                  >
                    <option value="Pending">Pending (Compliance Check)</option>
                    <option value="Onboarding">Onboarding (Contracting)</option>
                    <option value="Active">Active (Ready for Dispatch)</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Base Location / City, ST</label>
                  <input
                    type="text"
                    value={convertFormLocation}
                    onChange={(e) => setConvertFormLocation(e.target.value)}
                    placeholder="e.g. Chicago, IL"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Preferred Operating Lanes</label>
                  <input
                    type="text"
                    value={convertFormLanes}
                    onChange={(e) => setConvertFormLanes(e.target.value)}
                    placeholder="e.g. Midwest to Southeast"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Internal Notes & Compliance Records</label>
                <textarea
                  rows={3}
                  value={convertFormNotes}
                  onChange={(e) => setConvertFormNotes(e.target.value)}
                  placeholder="Rate agreements, COI verification, driver contact schedule..."
                  className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-emerald-500 resize-none leading-relaxed"
                />
              </div>

            </div>

            {/* Modal Actions */}
            <div className="border-t border-[#1E2C3F] pt-4 flex items-center justify-between">
              <p className="text-[11px] text-slate-400">
                Will create a verified record in <strong>truckers</strong> collection and update lead status to <strong>onboarded</strong>.
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedLeadForConvert(null)}
                  disabled={isProcessing}
                  className="px-4 py-2 rounded-xl bg-[#111C2B] hover:bg-[#162438] text-slate-300 border border-[#1E2C3F] text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleExecuteConversion}
                  disabled={isProcessing || !convertFormName || !convertFormPhone}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Onboarding...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Confirm & Onboard Trucker</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
