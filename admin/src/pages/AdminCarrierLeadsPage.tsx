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
  Check
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
  const itemsPerPage = 10;

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
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Pre-fill Edit Modal
  const openEditModal = (lead: CarrierLeadDoc) => {
    setSelectedLeadForEdit(lead);
    setEditFormStatus(lead.status);
    setEditFormNotes(lead.message || '');
    setEditFormCompany(lead.company || '');
    setEditFormEquipment(lead.equipment || '');
    setEditFormLanes(lead.preferredLanes || '');
  };

  // Pre-fill Convert Modal
  const openConvertModal = (lead: CarrierLeadDoc) => {
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
    setConvertFormLocation('Pending Location Setup');
    setConvertFormStatus('Pending');
    setConvertFormNotes(lead.message ? `Converted from lead inquiry: ${lead.message}` : 'Newly onboarded carrier lead.');
  };

  // Filtered & Sorted Leads
  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) => {
        if (statusFilter !== 'all' && lead.status !== statusFilter) return false;
        if (equipmentFilter !== 'all' && !lead.equipment?.toLowerCase().includes(equipmentFilter.toLowerCase())) return false;
        
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchName = lead.name?.toLowerCase().includes(q);
          const matchCompany = lead.company?.toLowerCase().includes(q);
          const matchPhone = lead.phone?.toLowerCase().includes(q);
          const matchEmail = lead.email?.toLowerCase().includes(q);
          const matchMC = lead.mcNumber?.toLowerCase().includes(q);
          const matchEquip = lead.equipment?.toLowerCase().includes(q);
          const matchLanes = lead.preferredLanes?.toLowerCase().includes(q);
          return matchName || matchCompany || matchPhone || matchEmail || matchMC || matchEquip || matchLanes;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortField === 'name') {
          const res = (a.name || '').localeCompare(b.name || '');
          return sortOrder === 'asc' ? res : -res;
        }
        if (sortField === 'company') {
          const res = (a.company || '').localeCompare(b.company || '');
          return sortOrder === 'asc' ? res : -res;
        }
        // default createdAt
        const timeA = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : new Date(a.createdAt || 0).getTime();
        const timeB = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : new Date(b.createdAt || 0).getTime();
        return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
      });
  }, [leads, searchTerm, statusFilter, equipmentFilter, sortField, sortOrder]);

  // Counts for tabs
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

  // Pagination Slicing
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage) || 1;
  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLeads.slice(start, start + itemsPerPage);
  }, [filteredLeads, currentPage, itemsPerPage]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, equipmentFilter]);

  // Submit Convert to Trucker Form
  const handleConfirmConvert = async () => {
    if (!selectedLeadForConvert?.id) return;
    if (!convertFormName.trim() || !convertFormPhone.trim()) {
      showToast('Error: Carrier Name and Phone Number are required.');
      return;
    }

    setIsProcessing(true);

    const result = await convertLeadToTrucker(
      selectedLeadForConvert.id,
      selectedLeadForConvert,
      {
        name: convertFormName.trim(),
        company: convertFormCompany.trim() || 'Independent Owner Operator',
        phone: convertFormPhone.trim(),
        email: convertFormEmail.trim(),
        mcNumber: convertFormMcNumber.trim() || 'MC-Pending',
        dotNumber: convertFormDotNumber.trim(),
        equipment: convertFormEquipment.trim() || '53ft Dry Van',
        truckCount: convertFormTruckCount.trim() || '1',
        preferredLanes: convertFormLanes.trim(),
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

  // Handle Delete Lead
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

  // Status Badge Component
  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'new':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1.5 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            NEW
          </span>
        );
      case 'in_review':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold inline-flex">
            IN REVIEW
          </span>
        );
      case 'contacted':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 text-[10px] font-mono font-bold inline-flex">
            CONTACTED
          </span>
        );
      case 'onboarded':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30 text-[10px] font-mono font-bold inline-flex">
            ONBOARDED
          </span>
        );
      case 'archived':
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/60 text-[10px] font-mono font-bold inline-flex">
            ARCHIVED
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#0A1322] border border-blue-500/40 text-blue-200 text-xs font-semibold shadow-2xl flex items-center gap-3 animate-fade-in-scale backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-2xl bg-[#0A1322] border border-[#1B293E] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-display text-white tracking-tight">
                Carrier Leads & Applications
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 text-[10px] font-mono font-bold">
                {leads.length} Total
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live fleet inquiries, owner-operator applications, and dispatch assignments.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            disabled={filteredLeads.length === 0}
            className={`px-3.5 py-2 rounded-xl bg-[#08101C] hover:bg-[#111F33] text-slate-200 border border-[#1B293E] text-xs font-bold transition-all flex items-center gap-2 shadow-sm ${
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
        <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-3">
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

      {/* Search & Secondary Filter Bar */}
      <div className="p-3.5 rounded-2xl bg-[#0A1322] border border-[#1B293E] grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        
        {/* Search Input */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search carrier name, company, MC#, phone, equipment..."
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

        {/* Equipment Filter Dropdown */}
        <div className="sm:col-span-3">
          <select
            value={equipmentFilter}
            onChange={(e) => setEquipmentFilter(e.target.value)}
            className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-xs text-slate-200 focus:outline-hidden focus:border-blue-500 transition-colors"
          >
            <option value="all">All Equipment Types</option>
            <option value="Dry Van">Dry Van (53ft)</option>
            <option value="Reefer">Refrigerated / Reefer</option>
            <option value="Flatbed">Flatbed / Stepdeck</option>
            <option value="Power Only">Power Only</option>
            <option value="Box Truck">Box Truck</option>
            <option value="Hotshot">Hotshot</option>
          </select>
        </div>

        {/* Sort Controls */}
        <div className="sm:col-span-3 flex items-center gap-2">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as any)}
            className="flex-1 h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-xs text-slate-200 focus:outline-hidden focus:border-blue-500 transition-colors"
          >
            <option value="createdAt">Date Received</option>
            <option value="name">Carrier Name</option>
            <option value="company">Company Name</option>
          </select>

          <button
            onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
            className="h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] hover:border-slate-600 text-slate-300 hover:text-white text-xs flex items-center justify-center cursor-pointer transition-colors"
            title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="rounded-2xl bg-[#0A1322] border border-[#1B293E] shadow-sm overflow-hidden">
        
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3 text-slate-400">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <span className="text-xs font-mono">Synchronizing live carrier leads from Firestore...</span>
          </div>
        ) : filteredLeads.length === 0 ? (
          /* Empty State */
          <div className="py-16 text-center space-y-3 font-mono">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
              <Truck className="w-6 h-6 opacity-60" />
            </div>
            <div>
              <p className="text-sm font-bold font-sans text-white">No carrier leads found</p>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                {searchTerm || statusFilter !== 'all' || equipmentFilter !== 'all'
                  ? 'Try clearing active filters or search terms.'
                  : 'New carrier inquiries submitted on the public website will stream here.'}
              </p>
            </div>
            {(searchTerm || statusFilter !== 'all' || equipmentFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setEquipmentFilter('all');
                }}
                className="px-3 py-1.5 rounded-xl bg-[#111F33] text-blue-400 text-xs font-sans font-bold hover:bg-[#15253D] border border-blue-500/30 cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1B293E] bg-[#08101C] text-[10.5px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4 font-semibold">Carrier / Contact</th>
                  <th className="py-3 px-4 font-semibold">MC # & Fleet</th>
                  <th className="py-3 px-4 font-semibold">Equipment / Lanes</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Date Received</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1B293E]/50 text-xs">
                {paginatedLeads.map((lead) => (
                  <tr 
                    key={lead.id}
                    className="hover:bg-[#0D182A]/80 transition-colors group"
                  >
                    {/* Carrier / Contact Column */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-950/80 border border-blue-800/40 text-blue-400 font-bold text-xs flex items-center justify-center shrink-0">
                          {lead.name ? lead.name.slice(0, 2).toUpperCase() : 'LE'}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white text-xs truncate group-hover:text-blue-300 transition-colors">
                            {lead.name}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            <a 
                              href={`tel:${lead.phone}`}
                              className="text-emerald-400 hover:underline font-mono"
                            >
                              {lead.phone}
                            </a>
                            {lead.email && (
                              <span className="text-slate-500 truncate max-w-[120px]">
                                • {lead.email}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* MC # & Fleet Column */}
                    <td className="py-3.5 px-4">
                      <div>
                        {lead.mcNumber ? (
                          <span className="font-mono font-bold text-blue-400 bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-800/40 text-[10.5px]">
                            {lead.mcNumber}
                          </span>
                        ) : (
                          <span className="text-slate-500 font-mono text-[10px]">No MC Provided</span>
                        )}
                        <p className="text-[11px] text-slate-300 font-medium truncate mt-1">
                          {lead.company || 'Owner Operator'} ({lead.truckCount || '1'} {parseInt(lead.truckCount || '1') > 1 ? 'trucks' : 'truck'})
                        </p>
                      </div>
                    </td>

                    {/* Equipment / Lanes Column */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div>
                        <span className="font-semibold text-slate-200">
                          {lead.equipment || 'Standard 53ft Dry Van'}
                        </span>
                        {lead.preferredLanes && (
                          <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                            🛣️ {lead.preferredLanes}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Status Column */}
                    <td className="py-3.5 px-4">
                      {getStatusBadge(lead.status)}
                    </td>

                    {/* Date Received Column */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                      {formatFirestoreDate(lead.createdAt)}
                    </td>

                    {/* Actions Column */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {/* Quick View */}
                        <button
                          onClick={() => setSelectedLeadForView(lead)}
                          className="p-1.5 rounded-lg bg-[#08101C] hover:bg-[#111F33] text-slate-400 hover:text-white border border-[#1B293E] transition-colors cursor-pointer"
                          title="View Full Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Quick Edit */}
                        <button
                          onClick={() => openEditModal(lead)}
                          className="p-1.5 rounded-lg bg-[#08101C] hover:bg-[#111F33] text-slate-400 hover:text-blue-400 border border-[#1B293E] transition-colors cursor-pointer"
                          title="Edit Status & Notes"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        {/* Convert to Trucker Action */}
                        <button
                          onClick={() => openConvertModal(lead)}
                          disabled={lead.status === 'onboarded'}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold font-mono transition-all flex items-center gap-1 ${
                            lead.status === 'onboarded'
                              ? 'bg-purple-950/40 text-purple-400/60 border border-purple-900/30 cursor-not-allowed'
                              : 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 cursor-pointer'
                          }`}
                          title="Onboard into Fleet Roster"
                        >
                          <UserCheck className="w-3 h-3" />
                          <span>{lead.status === 'onboarded' ? 'Onboarded' : 'Onboard'}</span>
                        </button>

                        {/* Delete Action */}
                        <button
                          onClick={() => setSelectedLeadForDelete(lead)}
                          className="p-1.5 rounded-lg bg-[#08101C] hover:bg-red-500/20 text-slate-500 hover:text-red-400 border border-[#1B293E] transition-colors cursor-pointer"
                          title="Delete Lead"
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
        {!isLoading && filteredLeads.length > 0 && (
          <div className="p-3.5 border-t border-[#1B293E] bg-[#08101C] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-slate-400 font-mono text-[11px]">
              Showing <span className="text-white font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="text-white font-bold">{Math.min(currentPage * itemsPerPage, filteredLeads.length)}</span> of{' '}
              <span className="text-white font-bold">{filteredLeads.length}</span> results
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

      {/* ==================================================================== */}
      {/* MODAL 1: VIEW FULL LEAD DETAILS                                      */}
      {/* ==================================================================== */}
      {selectedLeadForView && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in-scale">
          <div className="bg-[#0A1322] border border-[#1B293E] rounded-2xl max-w-xl w-full p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1B293E] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-display text-white">{selectedLeadForView.name}</h3>
                  <p className="text-[11px] text-slate-400">{selectedLeadForView.company || 'Owner Operator'} • {selectedLeadForView.phone}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedLeadForView(null)} 
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#08101C] border border-[#1B293E] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Phone</span>
                <a href={`tel:${selectedLeadForView.phone}`} className="text-emerald-400 font-bold hover:underline font-mono">{selectedLeadForView.phone}</a>
              </div>
              <div className="p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Email</span>
                <span className="font-bold text-white truncate block">{selectedLeadForView.email || 'N/A'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">MC / DOT Number</span>
                <span className="font-bold text-white font-mono">{selectedLeadForView.mcNumber || 'None'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Equipment & Capacity</span>
                <span className="font-bold text-white">{selectedLeadForView.equipment} ({selectedLeadForView.truckCount || 1} trucks)</span>
              </div>
              <div className="col-span-2 p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Preferred Lanes / Service Area</span>
                <p className="text-slate-300 mt-0.5">{selectedLeadForView.preferredLanes || 'No preferred lanes specified.'}</p>
              </div>
              <div className="col-span-2 p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Application Notes / Message</span>
                <p className="text-slate-300 mt-0.5 leading-relaxed">{selectedLeadForView.message || 'No additional notes provided.'}</p>
              </div>
            </div>

            {/* Quick Status Setter */}
            <div className="p-3 rounded-xl bg-[#08101C] border border-[#1B293E] space-y-2">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Quick Change Status</span>
              <div className="flex flex-wrap gap-1.5">
                {(['new', 'in_review', 'contacted', 'onboarded', 'archived'] as LeadStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => selectedLeadForView.id && handleQuickStatusChange(selectedLeadForView.id, st)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      selectedLeadForView.status === st
                        ? 'bg-blue-600 text-white'
                        : 'bg-[#111F33] text-slate-300 hover:text-white border border-[#1B293E]'
                    }`}
                  >
                    {st.replace('_', ' ').toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#1B293E]">
              <button
                onClick={() => {
                  const lead = selectedLeadForView;
                  setSelectedLeadForView(null);
                  openConvertModal(lead);
                }}
                disabled={selectedLeadForView.status === 'onboarded'}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-950 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Onboard as Trucker</span>
              </button>

              <button
                onClick={() => setSelectedLeadForView(null)}
                className="px-4 py-2 rounded-xl bg-[#08101C] hover:bg-[#111F33] text-slate-300 font-bold text-xs border border-[#1B293E] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 2: EDIT LEAD DETAILS                                           */}
      {/* ==================================================================== */}
      {selectedLeadForEdit && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in-scale">
          <div className="bg-[#0A1322] border border-[#1B293E] rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1B293E] pb-3">
              <div>
                <h3 className="text-sm font-bold font-display text-white">Edit Lead: {selectedLeadForEdit.name}</h3>
                <p className="text-[11px] text-slate-400">Update pipeline status, equipment details, or notes.</p>
              </div>
              <button onClick={() => setSelectedLeadForEdit(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#08101C] border border-[#1B293E] cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Status</label>
                <select
                  value={editFormStatus}
                  onChange={(e) => setEditFormStatus(e.target.value as LeadStatus)}
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                >
                  <option value="new">NEW</option>
                  <option value="in_review">IN REVIEW</option>
                  <option value="contacted">CONTACTED</option>
                  <option value="onboarded">ONBOARDED</option>
                  <option value="archived">ARCHIVED</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Company</label>
                <input
                  type="text"
                  value={editFormCompany}
                  onChange={(e) => setEditFormCompany(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Equipment</label>
                <input
                  type="text"
                  value={editFormEquipment}
                  onChange={(e) => setEditFormEquipment(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Preferred Lanes</label>
                <input
                  type="text"
                  value={editFormLanes}
                  onChange={(e) => setEditFormLanes(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Internal Notes</label>
                <textarea
                  rows={3}
                  value={editFormNotes}
                  onChange={(e) => setEditFormNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1B293E]">
              <button
                onClick={() => setSelectedLeadForEdit(null)}
                className="px-4 py-2 rounded-xl bg-[#08101C] hover:bg-[#111F33] text-slate-300 font-bold text-xs border border-[#1B293E] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={isProcessing}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-900/40 cursor-pointer flex items-center gap-1.5"
              >
                {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 3: CONVERT LEAD TO TRUCKER                                     */}
      {/* ==================================================================== */}
      {selectedLeadForConvert && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in-scale">
          <div className="bg-[#0A1322] border border-[#1B293E] rounded-2xl max-w-xl w-full p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1B293E] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-display text-white">Onboard Lead to Fleet Roster</h3>
                  <p className="text-[11px] text-slate-400">Creates a permanent trucker record in the Firestore database.</p>
                </div>
              </div>
              <button onClick={() => setSelectedLeadForConvert(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#08101C] border border-[#1B293E] cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Carrier / Driver Name *</label>
                <input
                  type="text"
                  value={convertFormName}
                  onChange={(e) => setConvertFormName(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Company Name</label>
                <input
                  type="text"
                  value={convertFormCompany}
                  onChange={(e) => setConvertFormCompany(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Phone Number *</label>
                <input
                  type="text"
                  value={convertFormPhone}
                  onChange={(e) => setConvertFormPhone(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white font-mono focus:outline-hidden focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  value={convertFormEmail}
                  onChange={(e) => setConvertFormEmail(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">MC Number</label>
                <input
                  type="text"
                  value={convertFormMcNumber}
                  onChange={(e) => setConvertFormMcNumber(e.target.value)}
                  placeholder="MC-123456"
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white font-mono focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">USDOT Number</label>
                <input
                  type="text"
                  value={convertFormDotNumber}
                  onChange={(e) => setConvertFormDotNumber(e.target.value)}
                  placeholder="DOT-789012"
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white font-mono focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Equipment</label>
                <input
                  type="text"
                  value={convertFormEquipment}
                  onChange={(e) => setConvertFormEquipment(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Initial Status</label>
                <select
                  value={convertFormStatus}
                  onChange={(e) => setConvertFormStatus(e.target.value as TruckerStatus)}
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                >
                  <option value="Pending">Pending (Documents in progress)</option>
                  <option value="Active">Active (Ready for dispatch)</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Dispatch Notes</label>
                <textarea
                  rows={2}
                  value={convertFormNotes}
                  onChange={(e) => setConvertFormNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1B293E]">
              <button
                onClick={() => setSelectedLeadForConvert(null)}
                className="px-4 py-2 rounded-xl bg-[#08101C] hover:bg-[#111F33] text-slate-300 font-bold text-xs border border-[#1B293E] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmConvert}
                disabled={isProcessing}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-950 flex items-center gap-1.5 cursor-pointer"
              >
                {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UserCheck className="w-3.5 h-3.5" />}
                <span>Confirm Onboarding</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 4: DELETE CONFIRMATION                                         */}
      {/* ==================================================================== */}
      {selectedLeadForDelete && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in-scale">
          <div className="bg-[#0A1322] border border-red-500/40 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-display text-white">Delete Carrier Lead</h3>
                <p className="text-[11px] text-slate-400">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to permanently delete the lead for <strong className="text-white">"{selectedLeadForDelete.name}"</strong>?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1B293E]">
              <button
                onClick={() => setSelectedLeadForDelete(null)}
                className="px-4 py-2 rounded-xl bg-[#08101C] hover:bg-[#111F33] text-slate-300 font-bold text-xs border border-[#1B293E] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isProcessing}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-950 flex items-center gap-1.5 cursor-pointer"
              >
                {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>Delete Lead</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
