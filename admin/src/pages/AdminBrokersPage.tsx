import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  Plus, 
  Eye, 
  Trash2, 
  X, 
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
  const [currentPage] = useState(1);
  const itemsPerPage = 10;

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
          (b.mcNumber && b.mcNumber.toLowerCase().includes(q)) ||
          b.phone.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [brokers, statusFilter, searchTerm]);

  const paginatedBrokers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBrokers.slice(start, start + itemsPerPage);
  }, [filteredBrokers, currentPage, itemsPerPage]);

  const handleAddBroker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.companyName.trim() || !newForm.phone.trim()) {
      showToast('Error: Company Name and Phone are required.');
      return;
    }

    operationsStore.addBroker({
      companyName: newForm.companyName.trim(),
      contact: newForm.contact.trim() || 'Operations Dispatch',
      phone: newForm.phone.trim(),
      email: newForm.email.trim(),
      mcNumber: newForm.mcNumber.trim() || 'MC-Pending',
      status: 'Active',
      creditScore: newForm.creditScore,
      paymentTerms: newForm.paymentTerms,
      notes: newForm.notes.trim()
    });

    showToast(`Broker "${newForm.companyName}" added successfully!`);
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
    const name = selectedBrokerForDelete.companyName;
    operationsStore.deleteBroker(selectedBrokerForDelete.id);
    showToast(`Broker "${name}" removed.`);
    setSelectedBrokerForDelete(null);
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
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-display text-white tracking-tight">
                Freight Broker Network
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                {brokers.length} Verified
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Direct broker contacts, credit approvals, and freight payment term records.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-950 cursor-pointer border border-emerald-400/30"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Broker</span>
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
            placeholder="Search broker company, contact, MC#, phone..."
            className="w-full h-9 pl-9 pr-8 rounded-xl bg-[#08101C] border border-[#1B293E] text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 transition-colors"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-xs text-slate-200 focus:outline-hidden focus:border-emerald-500"
          >
            <option value="All">All Brokers</option>
            <option value="Active">Active Partnerships</option>
            <option value="Pending">Pending Verification</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#0A1322] border border-[#1B293E] shadow-sm overflow-hidden">
        {filteredBrokers.length === 0 ? (
          <div className="py-16 text-center space-y-3 font-mono">
            <Building2 className="w-8 h-8 mx-auto text-slate-600 opacity-40" />
            <p className="text-sm font-bold font-sans text-white">No brokers found</p>
            <p className="text-xs text-slate-500 font-sans">Add your first freight broker partner to begin load assignments.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1B293E] bg-[#08101C] text-[10.5px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4 font-semibold">Brokerage / Company</th>
                  <th className="py-3 px-4 font-semibold">MC #</th>
                  <th className="py-3 px-4 font-semibold">Contact & Phone</th>
                  <th className="py-3 px-4 font-semibold">Credit / Terms</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1B293E]/50 text-xs">
                {paginatedBrokers.map((b) => (
                  <tr key={b.id} className="hover:bg-[#0D182A]/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-xs">{b.companyName}</p>
                          <span className="text-[11px] text-slate-400">{b.email || 'No email on file'}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      <span className="font-bold text-blue-400 bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-800/40">
                        {b.mcNumber}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div>
                        <p className="font-semibold text-slate-200">{b.contact}</p>
                        <a href={`tel:${b.phone}`} className="text-emerald-400 hover:underline font-mono text-[11px]">
                          {b.phone}
                        </a>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-mono text-emerald-400 font-bold text-[11px]">{b.creditScore}</span>
                        <p className="text-[10px] text-slate-400">{b.paymentTerms}</p>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        {b.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedBrokerForView(b)}
                          className="p-1.5 rounded-lg bg-[#08101C] hover:bg-[#111F33] text-slate-400 hover:text-white border border-[#1B293E] cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setSelectedBrokerForDelete(b)}
                          className="p-1.5 rounded-lg bg-[#08101C] hover:bg-red-500/20 text-slate-500 hover:text-red-400 border border-[#1B293E] cursor-pointer"
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
      </div>

      {/* MODAL: ADD BROKER */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in-scale">
          <div className="bg-[#0A1322] border border-[#1B293E] rounded-2xl max-w-xl w-full p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1B293E] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-display text-white">Add Broker Partner</h3>
                  <p className="text-[11px] text-slate-400">Register freight brokerage company profile.</p>
                </div>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#08101C] border border-[#1B293E]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddBroker} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  value={newForm.companyName}
                  onChange={(e) => setNewForm({ ...newForm, companyName: e.target.value })}
                  placeholder="e.g. Apex Freight Logistics"
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Primary Contact</label>
                <input
                  type="text"
                  value={newForm.contact}
                  onChange={(e) => setNewForm({ ...newForm, contact: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Phone Number *</label>
                <input
                  type="text"
                  required
                  value={newForm.phone}
                  onChange={(e) => setNewForm({ ...newForm, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white font-mono focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  value={newForm.email}
                  onChange={(e) => setNewForm({ ...newForm, email: e.target.value })}
                  placeholder="dispatch@brokerage.com"
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">MC Number</label>
                <input
                  type="text"
                  value={newForm.mcNumber}
                  onChange={(e) => setNewForm({ ...newForm, mcNumber: e.target.value })}
                  placeholder="MC-987654"
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white font-mono focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Credit Rating</label>
                <input
                  type="text"
                  value={newForm.creditScore}
                  onChange={(e) => setNewForm({ ...newForm, creditScore: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-emerald-500"
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
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-950 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Save Broker</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW BROKER */}
      {selectedBrokerForView && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in-scale">
          <div className="bg-[#0A1322] border border-[#1B293E] rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1B293E] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-display text-white">{selectedBrokerForView.companyName}</h3>
                  <p className="text-[11px] text-slate-400">{selectedBrokerForView.mcNumber} • {selectedBrokerForView.contact}</p>
                </div>
              </div>
              <button onClick={() => setSelectedBrokerForView(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#08101C] border border-[#1B293E]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Phone</span>
                <a href={`tel:${selectedBrokerForView.phone}`} className="text-emerald-400 font-bold hover:underline font-mono">{selectedBrokerForView.phone}</a>
              </div>
              <div className="p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Credit Score</span>
                <span className="font-bold text-white">{selectedBrokerForView.creditScore}</span>
              </div>
              <div className="col-span-2 p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Payment Terms</span>
                <span className="font-bold text-white">{selectedBrokerForView.paymentTerms}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1B293E]">
              <button
                onClick={() => setSelectedBrokerForView(null)}
                className="px-4 py-2 rounded-xl bg-[#08101C] text-slate-300 font-bold text-xs border border-[#1B293E]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DELETE BROKER */}
      {selectedBrokerForDelete && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in-scale">
          <div className="bg-[#0A1322] border border-red-500/40 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-display text-white">Remove Broker</h3>
                <p className="text-[11px] text-slate-400">Permanently delete broker partner record.</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to remove <strong className="text-white">"{selectedBrokerForDelete.companyName}"</strong>?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1B293E]">
              <button
                onClick={() => setSelectedBrokerForDelete(null)}
                className="px-4 py-2 rounded-xl bg-[#08101C] text-slate-300 font-bold text-xs border border-[#1B293E]"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-950 flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Broker</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
