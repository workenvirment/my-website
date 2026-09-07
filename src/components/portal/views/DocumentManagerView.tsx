import React, { useState } from 'react';
import { 
  Search, 
  Upload, 
  Download, 
  Eye, 
  AlertTriangle, 
  Share2, 
  X
} from 'lucide-react';
import { DOCUMENTS_LIST } from '../../../data/documentsData';
import { DocumentModal } from '../../common/DocumentModal';
import type { DocumentItem } from '../../../types';

export const DocumentManagerView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const categories = [
    { id: 'all', label: 'All Documents' },
    { id: 'carrier', label: 'Carrier Packets' },
    { id: 'broker', label: 'Broker Contracts & BCA' },
    { id: 'shipper', label: 'Shipper BOL & POD' },
    { id: 'payment', label: 'Factoring & NOA' },
  ];

  const filteredDocs = DOCUMENTS_LIST.filter((doc) => {
    const matchesCat = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setUploadModalOpen(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
              Compliance & Document Management
            </h1>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold">
              VERIFIED REPOSITORY
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage COI ($1M Auto/Cargo), W-9, Notice of Assignment (NOA), executed Rate Confirmations, and delivery PODs
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold transition-all shadow-glow-orange flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Urgent Expiration Alert Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
          <div>
            <span className="font-bold block">Action Required: Certificate of Insurance (COI) Expiration Notice</span>
            <span className="text-amber-800 text-[11px]">Apex Eagle Logistics LLC policy renewal is due in 12 days (Sep 15). Upload the renewed certificate to prevent broker setup delays.</span>
          </div>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="px-3.5 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shrink-0"
        >
          Upload Renewed COI
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-brand-orange text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search document name, code (e.g. COI, W-9, NOA, BOL, POD)..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-orange"
          />
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-brand-orange/50 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-brand-orange bg-orange-50 px-2.5 py-0.5 rounded border border-orange-200">
                  {doc.code}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  {doc.status}
                </span>
              </div>

              <div>
                <h3 className="font-display font-black text-slate-900 text-sm">{doc.name}</h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{doc.purpose}</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                <div className="flex justify-between text-slate-600 text-[11px]">
                  <span>Who Provides:</span>
                  <span className="font-semibold text-slate-800">{doc.whoProvides}</span>
                </div>
                <div className="flex justify-between text-slate-600 text-[11px]">
                  <span>Who Receives:</span>
                  <span className="font-semibold text-slate-800">{doc.whoReceives}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setPreviewDoc(doc)}
                className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Sample</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => alert(`Downloading sample template for ${doc.name}...`)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                  title="Download File"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => alert(`Generating direct share link for ${doc.name}...`)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                  title="Share Document"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal Simulator */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 space-y-4 text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-display font-black text-slate-900 text-base">Upload Compliance Document</h3>
              <button onClick={() => setUploadModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSimulateUpload} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Document Category</label>
                <select className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange">
                  <option value="coi">Certificate of Insurance (COI)</option>
                  <option value="w9">W-9 Form (Taxpayer ID)</option>
                  <option value="noa">Notice of Assignment (Factoring NOA)</option>
                  <option value="bol">Signed Bill of Lading (BOL / POD)</option>
                  <option value="cdl">CDL Driver Credentials</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Select File (PDF, PNG, JPG)</label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center text-slate-500 hover:border-brand-orange transition-colors cursor-pointer bg-slate-50">
                  <Upload className="w-6 h-6 text-brand-orange mx-auto mb-1.5" />
                  <span className="font-bold block text-slate-800">Click or drag document to upload</span>
                  <span className="text-[10px] text-slate-400">Max size 25MB • Encrypted Storage</span>
                </div>
              </div>

              {uploadSuccess ? (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-center border border-emerald-200 animate-in fade-in">
                  ✓ Document uploaded and verified successfully!
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs shadow-glow-orange transition-all"
                >
                  Confirm Document Upload
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Document Template Preview Modal */}
      <DocumentModal
        document={previewDoc}
        onClose={() => setPreviewDoc(null)}
      />

    </div>
  );
};
