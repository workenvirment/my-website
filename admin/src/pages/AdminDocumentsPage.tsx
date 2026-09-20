import React, { useState, useEffect, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Upload, 
  Eye, 
  CheckCircle2, 
  X, 
  FileCheck
} from 'lucide-react';
import { operationsStore } from '../services/operationsStore';
import type { DocumentRecord, DocumentStatus } from '../types/admin';

interface AdminDocumentsPageProps {
  onNavigate?: (route: string) => void;
}

export const AdminDocumentsPage: React.FC<AdminDocumentsPageProps> = () => {
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [selectedDocForPreview, setSelectedDocForPreview] = useState<DocumentRecord | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Upload Form
  const [uploadForm, setUploadForm] = useState({
    name: '',
    category: 'COI' as DocumentRecord['category'],
    ownerName: '',
    mcNumber: '',
    expirationDate: '',
    status: 'Valid' as DocumentStatus
  });

  useEffect(() => {
    setDocuments(operationsStore.getDocuments());
    const unsub = operationsStore.subscribe(() => {
      setDocuments(operationsStore.getDocuments());
    });
    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredDocs = useMemo(() => {
    return documents.filter((d) => {
      if (categoryFilter !== 'All' && d.category !== categoryFilter) return false;
      if (statusFilter !== 'All' && d.status !== statusFilter) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          d.name.toLowerCase().includes(q) ||
          d.ownerName.toLowerCase().includes(q) ||
          (d.mcNumber && d.mcNumber.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [documents, categoryFilter, statusFilter, searchTerm]);

  const handleUploadDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.name.trim() || !uploadForm.ownerName.trim()) {
      showToast('Error: Document Name and Owner Name are required.');
      return;
    }

    operationsStore.addDocument({
      name: uploadForm.name.trim(),
      category: uploadForm.category,
      ownerName: uploadForm.ownerName.trim(),
      mcNumber: uploadForm.mcNumber.trim() || 'MC-Pending',
      expirationDate: uploadForm.expirationDate || 'Dec 31, 2027',
      status: uploadForm.status,
      fileSize: '1.4 MB'
    });

    showToast(`Document "${uploadForm.name}" uploaded successfully!`);
    setIsUploadModalOpen(false);
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
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-display text-white tracking-tight">
                Operations Document Center
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 text-[10px] font-mono font-bold">
                {documents.length} Files
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Certificates of Insurance (COI), W-9 forms, Rate Confirmations, and Dispatch Agreements.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-blue-900/40 cursor-pointer border border-blue-400/30"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="p-3.5 rounded-2xl bg-[#0A1322] border border-[#1B293E] grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search document name, carrier, MC#..."
            className="w-full h-9 pl-9 pr-8 rounded-xl bg-[#08101C] border border-[#1B293E] text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-xs text-slate-200 focus:outline-hidden focus:border-blue-500"
          >
            <option value="All">All Categories</option>
            <option value="COI">COI</option>
            <option value="W9 Form">W-9 Form</option>
            <option value="Carrier Agreement">Carrier Agreement</option>
            <option value="MC Authority Letter">MC Authority Letter</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-xs text-slate-200 focus:outline-hidden focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Valid">Valid</option>
            <option value="Expiring Soon">Expiring Soon</option>
            <option value="Expired">Expired</option>
            <option value="Missing">Missing</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#0A1322] border border-[#1B293E] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1B293E] bg-[#08101C] text-[10.5px] font-mono uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4 font-semibold">Document Title</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Carrier / MC</th>
                <th className="py-3 px-4 font-semibold">Expiration</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1B293E]/50 text-xs">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-[#0D182A]/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-950/80 border border-blue-800/40 text-blue-400 font-bold text-xs flex items-center justify-center shrink-0">
                        <FileCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-xs">{doc.name}</p>
                        <span className="text-[10px] text-slate-500 font-mono">{doc.fileSize}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-300">
                    {doc.category}
                  </td>

                  <td className="py-3.5 px-4">
                    <div>
                      <span className="font-semibold text-slate-200">{doc.ownerName}</span>
                      <span className="text-[10.5px] font-mono text-blue-400 block">{doc.mcNumber}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                    {doc.expirationDate || 'N/A'}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                      doc.status === 'Valid' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                      doc.status === 'Expiring Soon' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' :
                      'bg-red-500/15 text-red-400 border border-red-500/30'
                    }`}>
                      {doc.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedDocForPreview(doc)}
                      className="p-1.5 rounded-lg bg-[#08101C] hover:bg-[#111F33] text-slate-400 hover:text-white border border-[#1B293E] cursor-pointer"
                      title="Preview Document"
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

      {/* Modal Preview */}
      {selectedDocForPreview && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in-scale">
          <div className="bg-[#0A1322] border border-[#1B293E] rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1B293E] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-display text-white">{selectedDocForPreview.name}</h3>
                  <p className="text-[11px] text-slate-400">{selectedDocForPreview.ownerName} • {selectedDocForPreview.category}</p>
                </div>
              </div>
              <button onClick={() => setSelectedDocForPreview(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#08101C] border border-[#1B293E]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#08101C] border border-[#1B293E] text-center space-y-2">
              <FileCheck className="w-12 h-12 text-emerald-400 mx-auto" />
              <p className="text-xs font-bold text-white">Document Verified and Active on File</p>
              <p className="text-[10.5px] text-slate-400">Expires: {selectedDocForPreview.expirationDate || 'No expiration recorded'}</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1B293E]">
              <button
                onClick={() => setSelectedDocForPreview(null)}
                className="px-4 py-2 rounded-xl bg-[#08101C] text-slate-300 font-bold text-xs border border-[#1B293E]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Upload */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in-scale">
          <div className="bg-[#0A1322] border border-[#1B293E] rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1B293E] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-display text-white">Upload Compliance Document</h3>
                  <p className="text-[11px] text-slate-400">Add verified certificate or packet to storage.</p>
                </div>
              </div>
              <button onClick={() => setIsUploadModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#08101C] border border-[#1B293E]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadDoc} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  value={uploadForm.name}
                  onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                  placeholder="e.g. Miller Express - COI 2026"
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Category</label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value as any })}
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                >
                  <option value="COI">COI</option>
                  <option value="W9 Form">W-9 Form</option>
                  <option value="Carrier Agreement">Carrier Agreement</option>
                  <option value="MC Authority Letter">MC Authority Letter</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Carrier / Owner *</label>
                <input
                  type="text"
                  required
                  value={uploadForm.ownerName}
                  onChange={(e) => setUploadForm({ ...uploadForm, ownerName: e.target.value })}
                  placeholder="e.g. Miller Express LLC"
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">MC Number</label>
                <input
                  type="text"
                  value={uploadForm.mcNumber}
                  onChange={(e) => setUploadForm({ ...uploadForm, mcNumber: e.target.value })}
                  placeholder="MC-123456"
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white font-mono focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Expiration Date</label>
                <input
                  type="text"
                  value={uploadForm.expirationDate}
                  onChange={(e) => setUploadForm({ ...uploadForm, expirationDate: e.target.value })}
                  placeholder="Dec 31, 2027"
                  className="w-full h-9 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-white font-mono focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-2 border-t border-[#1B293E]">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#08101C] text-slate-300 font-bold text-xs border border-[#1B293E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-900/40 flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
