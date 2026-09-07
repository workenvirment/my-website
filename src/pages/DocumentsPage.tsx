import React, { useState } from 'react';
import { FileText, Search, Eye, AlertCircle } from 'lucide-react';
import { DOCUMENTS_LIST } from '../data/documentsData';
import { DocumentModal } from '../components/common/DocumentModal';
import type { DocumentItem, DocumentStatus } from '../types';

interface DocumentsPageProps {
  onNavigate?: (path: string) => void;
}

export const DocumentsPage: React.FC<DocumentsPageProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeModalDoc, setActiveModalDoc] = useState<DocumentItem | null>(null);

  const categories = [
    { id: 'all', name: 'All Documents' },
    { id: 'carrier', name: 'Carrier Documents' },
    { id: 'broker', name: 'Broker Documents' },
    { id: 'shipper', name: 'Shipper Documents' },
    { id: 'payment', name: 'Payment Documents' },
  ];

  const filteredDocs = DOCUMENTS_LIST.filter((doc: DocumentItem) => {
    const matchesCat = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.purpose.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCat && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'REQUIRED':
        return <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-200 text-[10px] font-mono font-bold">REQUIRED</span>;
      case 'RECEIVED':
        return <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">RECEIVED</span>;
      case 'PENDING':
        return <span className="px-2 py-0.5 rounded bg-orange-100 text-brand-orange border border-orange-200 text-[10px] font-mono font-bold">PENDING</span>;
      case 'REVIEW':
        return <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200 text-[10px] font-mono font-bold">REVIEW</span>;
      default:
        return <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono">{status}</span>;
    }
  };

  return (
    <div className="space-y-16 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-brand-orange border border-orange-200 text-xs font-mono font-bold uppercase">
          <FileText className="w-3.5 h-3.5" />
          <span>Interactive Document Center</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-900 tracking-tight">
          Transportation Documentation Hub
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Explore the exact regulatory, contractual, and operational paperwork required across the freight chain. Click any document to view a realistic educational sample preview.
        </p>
      </div>

      {/* Filter & Search Bar in Light Theme */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
        
        {/* Category Selector Tabs */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-brand-orange text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search & Status Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search documents by name, code (e.g. COI, W-9, POD, BOL)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-orange focus:bg-white"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white"
            >
              <option value="all">Status: All Statuses</option>
              <option value="REQUIRED">Required</option>
              <option value="RECEIVED">Received</option>
              <option value="PENDING">Pending</option>
              <option value="REVIEW">Review</option>
            </select>
          </div>
        </div>

      </div>

      {/* Documents Cards Grid in Light Theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDocs.map((doc: DocumentItem) => (
          <div
            key={doc.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-brand-orange/50 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Card Top */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                  {doc.code}
                </span>
                {getStatusBadge(doc.status)}
              </div>

              {/* Title & Purpose */}
              <div>
                <h3 className="text-sm font-display font-bold text-slate-900">{doc.name}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">{doc.purpose}</p>
              </div>

              {/* Metadata Badges */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Provided By:</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[150px]">{doc.whoProvides}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Required:</span>
                  <span className="font-bold text-brand-orange truncate max-w-[150px]">{doc.whenRequired}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 uppercase font-mono font-semibold">Sample Available</span>
              <button
                onClick={() => setActiveModalDoc(doc)}
                className="px-3 py-1.5 text-xs font-bold rounded-xl bg-white hover:bg-slate-50 text-brand-orange border border-slate-300 shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Sample Template</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Disclaimers Box */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
        <span>
          <strong>Document Disclaimer:</strong> All documents displayed in this center are educational templates designed to explain logistics workflows. They do not constitute executed legal contracts, binding insurance certificates, or official government filings.
        </span>
      </div>

      {/* Document Modal */}
      <DocumentModal
        document={activeModalDoc}
        onClose={() => setActiveModalDoc(null)}
      />

    </div>
  );
};
