import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  FileSpreadsheet, 
  Plus, 
  Eye, 
  Trash2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ShieldAlert
} from 'lucide-react';
import { operationsStore } from '../services/operationsStore';
import type { Broker } from '../types/admin';

interface AdminBrokersPageProps {
  onNavigate?: (route: string) => void;
}

export const AdminBrokersPage: React.FC<AdminBrokersPageProps> = () => {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Pending' | 'Inactive'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Modals
  const [selectedBrokerForView, setSelectedBrokerForView] = useState<Broker | null>(null);
  const [selectedBrokerForDelete, setSelectedBrokerForDelete] = useState<Broker | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Add Broker Form
  const [newForm, setNewForm] = useState({
    companyName: '',
    contact: '',
    phone: '',
    email: '',
    mcNumber: '',
    creditScore: '95 (A)',
    paymentTerms: 'QuickPay / Net 30',
    notes: ''
  });

  useEffect(() => {
    setBrokers(operationsStore.getBrokers());
    const unsub = operationsStore.subscribe(() => {
      setBrokers(operationsStore.getBrokers());
    });
    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredBrokers = useMemo(() => {
    return brokers.filter((b) => {
      if (statusFilter !== 'All' && b.status !== statusFilter) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          b.companyName.toLowerCase().includes(q) ||
          b.contact.toLowerCase().includes(q) ||
          b.phone.toLowerCase().includes(q) ||
          b.email.toLowerCase().includes(q) ||
          (b.mcNumber && b.mcNumber.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [brokers, statusFilter, searchTerm]);

  const totalPages = Math.ceil(filteredBrokers.length / itemsPerPage) || 1;
  const paginatedBrokers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBrokers.slice(start, start + itemsPerPage);
  }, [filteredBrokers, currentPage, itemsPerPage]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.companyName || !newForm.contact || !newForm.phone) {
      showToast('Company, contact name, and phone are required.');
      return;
    }

    operationsStore.addBroker({
      companyName: newForm.companyName,
      contact: newForm.contact,
      phone: newForm.phone,
      email: newForm.email || `${newForm.contact.toLowerCase().replace(/\s+/g, '')}@example.com`,
      mcNumber: newForm.mcNumber || 'MC-Pending',
      creditScore: newForm.creditScore,
      activeLoadsCount: 0,
      status: 'Active',
      paymentTerms: newForm.paymentTerms,
      notes: newForm.notes,
      avatarInitial: newForm.companyName.substring(0, 2).toUpperCase()
    });

    showToast(`Broker "${newForm.companyName}" added successfully.`);
    setIsAddModalOpen(false);
    setNewForm({
      companyName: '',
      contact: '',
      phone: '',
      email: '',
      mcNumber: '',
      creditScore: '95 (A)',
      paymentTerms: 'QuickPay / Net 30',
      notes: ''
    });
  };

  const handleDeleteConfirm = () => {
    if (!selectedBrokerForDelete) return;
    operationsStore.deleteBroker(selectedBrokerForDelete.id);
    showToast(`Broker "${selectedBrokerForDelete.companyName}" removed.`);
    setSelectedBrokerForDelete(null);
  };

  const exportCSV = () => {
    const headers = ['Company', 'Contact', 'Phone', 'Email', 'MC Number', 'Credit Score', 'Status'];
    const rows = filteredBrokers.map((b) => [
      `"${b.companyName}"`,
      `"${b.contact}"`,
      `"${b.phone}"`,
      `"${b.email}"`,
      `"${b.mcNumber || ''}"`,
      `"${b.creditScore || ''}"`,
      `"${b.status}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `dgw_brokers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filteredBrokers.length} brokers to CSV.`);
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
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-display text-white">Brokers & Shippers Directory</h1>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 text-[10px] font-mono font-bold">
                {brokers.length} Accounts
              </span>
            </div>
            <p className="text-xs text-slate-400">Direct freight shippers, 3PL logistics brokers, payment agreements, and posted lanes.</p>
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
            <span>Add New Broker</span>
          </button>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="p-3 rounded-2xl bg-[#0D1624] border border-[#1E2C3F] grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by company name, contact, MC#, phone, email..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="sm:col-span-4 flex items-center gap-1.5">
          {(['All', 'Active', 'Pending', 'Inactive'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`flex-1 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                statusFilter === s ? 'bg-blue-600 text-white shadow-xs' : 'bg-[#07111F] border border-[#1E2C3F] text-slate-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Brokers Table */}
      <div className="rounded-2xl bg-[#0D1624] border border-[#1E2C3F] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-[#1E2C3F] bg-[#07111F]/70 text-slate-400 text-[10px] uppercase tracking-wider">
                <th className="py-3 px-4 font-bold">Company</th>
                <th className="py-3 px-4 font-bold">Contact Person</th>
                <th className="py-3 px-4 font-bold">Phone & Email</th>
                <th className="py-3 px-4 font-bold">Credit & Rating</th>
                <th className="py-3 px-4 font-bold">Active Loads</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2C3F]/40 text-[11px]">
              {paginatedBrokers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-sans">
                    <Building2 className="w-8 h-8 mx-auto mb-2 text-slate-600 opacity-50" />
                    <p className="text-sm font-semibold text-slate-400">No broker records found</p>
                    <p className="text-xs text-slate-500 mt-0.5">Add a new freight broker or shipper partner account to populate this directory.</p>
                  </td>
                </tr>
              ) : (
                paginatedBrokers.map((b) => (
                <tr 
                  key={b.id}
                  className="hover:bg-[#111C2B] transition-colors group cursor-pointer"
                  onClick={() => setSelectedBrokerForView(b)}
                >
                  <td className="py-3 px-4 font-sans font-bold text-white">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-mono font-bold shrink-0 text-xs">
                        {b.avatarInitial || 'BR'}
                      </div>
                      <div className="min-w-0">
                        <span className="block truncate">{b.companyName}</span>
                        <span className="text-[10px] text-slate-400 font-mono font-normal block">{b.mcNumber || 'MC-Pending'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-sans font-bold text-slate-200">{b.contact}</td>
                  <td className="py-3 px-4 text-slate-400">
                    <span className="block text-slate-200">{b.phone}</span>
                    <span className="text-[10px] text-slate-500 block truncate max-w-[140px]">{b.email}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-emerald-400 font-bold block">{b.creditScore || '95 (A)'}</span>
                    <span className="text-[10px] text-slate-500 block">{b.paymentTerms || 'QuickPay / Net 30'}</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-blue-400">
                    {b.activeLoadsCount || 0} Loads
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      b.status === 'Active'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : b.status === 'Pending'
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          : 'bg-red-500/15 text-red-400 border border-red-500/30'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1 text-slate-400">
                      <button
                        onClick={() => setSelectedBrokerForView(b)}
                        className="p-1.5 rounded-lg bg-[#111C2B] hover:bg-[#162438] text-slate-300 hover:text-white border border-[#1E2C3F]"
                        title="View Broker"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setSelectedBrokerForDelete(b)}
                        className="p-1.5 rounded-lg bg-[#111C2B] hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-[#1E2C3F]"
                        title="Delete Broker"
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
          <div>Showing {filteredBrokers.length} brokers</div>
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

      {/* Add Broker Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0D1624] border border-[#1E2C3F] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1E2C3F] pb-3">
              <h3 className="text-lg font-bold font-display text-white">Add New Broker Account</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={newForm.companyName}
                    onChange={(e) => setNewForm({ ...newForm, companyName: e.target.value })}
                    placeholder="e.g. Apex Freight Brokerage"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={newForm.contact}
                    onChange={(e) => setNewForm({ ...newForm, contact: e.target.value })}
                    placeholder="e.g. Rachel Adams"
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
                    placeholder="broker@example.com"
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
                    placeholder="MC-987654"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Credit Score</label>
                  <input
                    type="text"
                    value={newForm.creditScore}
                    onChange={(e) => setNewForm({ ...newForm, creditScore: e.target.value })}
                    placeholder="e.g. 96 (A)"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
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
                  Save Broker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Broker Modal */}
      {selectedBrokerForView && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0D1624] border border-[#1E2C3F] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1E2C3F] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 font-bold flex items-center justify-center font-mono">
                  {selectedBrokerForView.avatarInitial || 'BR'}
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-white">{selectedBrokerForView.companyName}</h3>
                  <p className="text-xs text-slate-400">Contact: {selectedBrokerForView.contact}</p>
                </div>
              </div>
              <button onClick={() => setSelectedBrokerForView(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">Phone</span>
                <span className="font-bold text-white font-mono">{selectedBrokerForView.phone}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">Email</span>
                <span className="font-bold text-white truncate block">{selectedBrokerForView.email}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">Credit Score</span>
                <span className="font-bold text-emerald-400">{selectedBrokerForView.creditScore}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F]">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">Payment Terms</span>
                <span className="font-bold text-white">{selectedBrokerForView.paymentTerms}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1E2C3F]">
              <button
                onClick={() => setSelectedBrokerForView(null)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Broker Modal */}
      {selectedBrokerForDelete && (
        <div className="fixed inset-0 z-50 bg-[#030812]/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0D1624] border border-red-500/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-center">
            <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/25 text-red-400 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold font-display text-white">Remove Broker Account</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to remove <strong className="text-white">{selectedBrokerForDelete.companyName}</strong>?
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setSelectedBrokerForDelete(null)}
                className="py-2 rounded-xl bg-[#111C2B] border border-[#1E2C3F] text-slate-300 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs cursor-pointer shadow-lg shadow-red-900/30"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
