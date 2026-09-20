import React, { useState, useEffect, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Upload, 
  Download, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  FileCheck, 
  ShieldAlert
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modals
  const [selectedDocForPreview, setSelectedDocForPreview] = useState<DocumentRecord | null>(null);
  const [selectedDocForDelete, setSelectedDocForDelete] = useState<DocumentRecord | null>(null);
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

  const categories: Array<DocumentRecord['category']> = [
    'MC Authority Letter',
    'W9 Form',
    'COI',
    'Carrier Agreement',
    'Broker Documents',
    'Other Documents'
  ];

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      if (categoryFilter !== 'All' && doc.category !== categoryFilter) return false;
      if (statusFilter !== 'All' && doc.status !== statusFilter) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          doc.name.toLowerCase().includes(q) ||
          doc.ownerName.toLowerCase().includes(q) ||
          doc.mcNumber.toLowerCase().includes(q) ||
          doc.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [documents, categoryFilter, statusFilter, searchTerm]);

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage) || 1;
  const paginatedDocs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDocuments.slice(start, start + itemsPerPage);
  }, [filteredDocuments, currentPage, itemsPerPage]);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.name || !uploadForm.ownerName) {
      showToast('Document name and owner are required.');
      return;
    }

    operationsStore.addDocument({
      name: uploadForm.name.endsWith('.pdf') ? uploadForm.name : `${uploadForm.name}.pdf`,
      category: uploadForm.category,
      ownerName: uploadForm.ownerName,
      mcNumber: uploadForm.mcNumber || 'MC-Pending',
      expirationDate: uploadForm.expirationDate || 'N/A',
      status: uploadForm.status,
      fileSize: '1.2 MB'
    });

    showToast(`Document "${uploadForm.name}" uploaded successfully.`);
    setIsUploadModalOpen(false);
    setUploadForm({
      name: '',
      category: 'COI',
      ownerName: '',
      mcNumber: '',
      expirationDate: '',
      status: 'Valid'
    });
  };

  const handleDeleteConfirm = () => {
    if (!selectedDocForDelete) return;
    operationsStore.deleteDocument(selectedDocForDelete.id);
    showToast(`Document "${selectedDocForDelete.name}" deleted.`);
    setSelectedDocForDelete(null);
  };

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'Valid':
        return <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">Valid</span>;
      case 'Expiring Soon':
        return <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold">Expiring Soon</span>;
      case 'Expired':
        return <span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 text-[10px] font-mono font-bold">Expired</span>;
      case 'Missing':
      default:
        return <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 text-[10px] font-mono font-bold">Missing</span>;
    }
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
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-display text-white">Compliance & Document Repository</h1>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 text-[10px] font-mono font-bold">
                {documents.length} Records
              </span>
            </div>
            <p className="text-xs text-slate-400">Manage MC authority letters, W9 forms, Certificates of Insurance (COI), and carrier contracts.</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-900/30 flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Category Pills & Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        <button
          onClick={() => setCategoryFilter('All')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            categoryFilter === 'All' ? 'bg-blue-600 text-white shadow-xs' : 'bg-[#0D1624] border border-[#1E2C3F] text-slate-400 hover:text-white'
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              categoryFilter === cat ? 'bg-blue-600 text-white shadow-xs' : 'bg-[#0D1624] border border-[#1E2C3F] text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Toolbar */}
      <div className="p-3 rounded-2xl bg-[#0D1624] border border-[#1E2C3F] grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by file name, carrier, MC#, or document type..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="sm:col-span-4 flex items-center gap-1.5">
          {(['All', 'Valid', 'Expiring Soon', 'Expired'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`flex-1 py-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
                statusFilter === st ? 'bg-blue-600 text-white shadow-xs' : 'bg-[#07111F] border border-[#1E2C3F] text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <div className="rounded-2xl bg-[#0D1624] border border-[#1E2C3F] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-[#1E2C3F] bg-[#07111F]/70 text-slate-400 text-[10px] uppercase tracking-wider">
                <th className="py-3 px-4 font-bold">Document Name</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Carrier / Owner</th>
                <th className="py-3 px-4 font-bold">MC Number</th>
                <th className="py-3 px-4 font-bold">Expiration Date</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2C3F]/40 text-[11px]">
              {paginatedDocs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-sans">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-slate-600 opacity-50" />
                    <p className="text-sm font-semibold text-slate-400">No documents found</p>
                    <p className="text-xs text-slate-500 mt-0.5">Upload carrier compliance documents, COIs, W9s, or broker packets.</p>
                  </td>
                </tr>
              ) : (
                paginatedDocs.map((doc) => (
                <tr 
                  key={doc.id}
                  className="hover:bg-[#111C2B] transition-colors group cursor-pointer"
                  onClick={() => setSelectedDocForPreview(doc)}
                >
                  <td className="py-3 px-4 font-sans font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="truncate max-w-[200px]">{doc.name}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-sans">{doc.category}</td>
                  <td className="py-3 px-4 text-slate-200 font-sans">{doc.ownerName}</td>
                  <td className="py-3 px-4 text-blue-400 font-bold">{doc.mcNumber}</td>
                  <td className="py-3 px-4 text-slate-400">{doc.expirationDate}</td>
                  <td className="py-3 px-4">{getStatusBadge(doc.status)}</td>
                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1 text-slate-400">
                      <button
                        onClick={() => setSelectedDocForPreview(doc)}
                        className="p-1.5 rounded-lg bg-[#111C2B] hover:bg-[#162438] text-slate-300 hover:text-white border border-[#1E2C3F]"
                        title="Preview Document"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => showToast(`Downloading ${doc.name}...`)}
                        className="p-1.5 rounded-lg bg-[#111C2B] hover:bg-[#162438] text-slate-300 hover:text-emerald-400 border border-[#1E2C3F]"
                        title="Download Document"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setSelectedDocForDelete(doc)}
                        className="p-1.5 rounded-lg bg-[#111C2B] hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-[#1E2C3F]"
                        title="Delete Document"
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
          <div>Showing {filteredDocuments.length} compliance documents</div>
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

      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0D1624] border border-[#1E2C3F] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1E2C3F] pb-3">
              <h3 className="text-lg font-bold font-display text-white">Upload Compliance Document</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Document File Name *</label>
                <input
                  type="text"
                  required
                  value={uploadForm.name}
                  onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                  placeholder="e.g. COI_Policy_2026.pdf"
                  className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Category</label>
                  <select
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">MC Number</label>
                  <input
                    type="text"
                    value={uploadForm.mcNumber}
                    onChange={(e) => setUploadForm({ ...uploadForm, mcNumber: e.target.value })}
                    placeholder="MC-784320"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Owner / Carrier Name *</label>
                  <input
                    type="text"
                    required
                    value={uploadForm.ownerName}
                    onChange={(e) => setUploadForm({ ...uploadForm, ownerName: e.target.value })}
                    placeholder="e.g. Smith Express LLC"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Expiration Date</label>
                  <input
                    type="text"
                    value={uploadForm.expirationDate}
                    onChange={(e) => setUploadForm({ ...uploadForm, expirationDate: e.target.value })}
                    placeholder="e.g. Aug 15, 2027"
                    className="w-full px-3 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#1E2C3F]">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#111C2B] hover:bg-[#162438] text-slate-300 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md shadow-blue-900/30 cursor-pointer"
                >
                  Upload File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Document Modal */}
      {selectedDocForPreview && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0D1624] border border-[#1E2C3F] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1E2C3F] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-white">{selectedDocForPreview.name}</h3>
                  <p className="text-xs text-slate-400">{selectedDocForPreview.category} • {selectedDocForPreview.ownerName}</p>
                </div>
              </div>
              <button onClick={() => setSelectedDocForPreview(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-8 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-center space-y-3">
              <FileCheck className="w-12 h-12 text-emerald-400 mx-auto" />
              <div>
                <p className="text-sm font-bold text-white">Compliance Document Verified</p>
                <p className="text-xs text-slate-400">MC: {selectedDocForPreview.mcNumber} • Expiration: {selectedDocForPreview.expirationDate}</p>
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-mono font-bold">
                Status: {selectedDocForPreview.status}
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1E2C3F]">
              <button
                onClick={() => {
                  showToast(`Downloading ${selectedDocForPreview.name}...`);
                  setSelectedDocForPreview(null);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
              <button
                onClick={() => setSelectedDocForPreview(null)}
                className="px-4 py-2 rounded-xl bg-[#111C2B] hover:bg-[#162438] text-slate-300 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Document Modal */}
      {selectedDocForDelete && (
        <div className="fixed inset-0 z-50 bg-[#030812]/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0D1624] border border-red-500/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-center">
            <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/25 text-red-400 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold font-display text-white">Delete Document</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to delete <strong className="text-white">{selectedDocForDelete.name}</strong>?
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setSelectedDocForDelete(null)}
                className="py-2 rounded-xl bg-[#111C2B] border border-[#1E2C3F] text-slate-300 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs cursor-pointer shadow-lg shadow-red-900/30"
              >
                Delete File
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
