import React from 'react';
import { X, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import type { DocumentItem } from '../../types';

interface DocumentModalProps {
  document: DocumentItem | null;
  onClose: () => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({ document, onClose }) => {
  if (!document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-900">
        
        {/* Header Strip */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-orange-50 text-brand-orange border border-orange-200">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-brand-orange px-2 py-0.5 rounded bg-orange-100 border border-orange-200">
                  {document.code}
                </span>
                <span className="text-xs text-slate-500 font-mono uppercase font-semibold">
                  {document.category} Category
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-display font-black text-slate-900 mt-1">
                {document.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Purpose & Description */}
        <div className="space-y-3 text-xs">
          <div>
            <h4 className="font-mono uppercase text-slate-500 font-bold text-[10px]">Document Purpose</h4>
            <p className="text-slate-700 mt-1 leading-relaxed">{document.purpose}</p>
          </div>
          <div>
            <h4 className="font-mono uppercase text-slate-500 font-bold text-[10px]">When Required</h4>
            <p className="text-slate-600 mt-1 leading-relaxed">{document.whenRequired}</p>
          </div>
        </div>

        {/* Educational Sample Template Box */}
        {document.sampleSummary && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <span className="text-[11px] font-mono font-bold text-slate-900 uppercase">
                {document.sampleSummary.title}
              </span>
              <span className="text-[10px] font-mono text-brand-orange bg-orange-100 px-2 py-0.5 rounded border border-orange-200 font-bold">
                SAMPLE TEMPLATE
              </span>
            </div>

            <div className="space-y-2">
              {document.sampleSummary.sampleFields.map((field, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">{field.label}:</span>
                  <span className="text-slate-900 font-semibold font-mono text-[11px]">{field.value}</span>
                </div>
              ))}
            </div>

            <div className="text-[10px] text-slate-500 font-mono pt-1">
              * {document.sampleSummary.disclaimer}
            </div>
          </div>
        )}

        {/* Roles Exchange */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">Provided By</span>
            <span className="font-semibold text-slate-900 mt-0.5 block">{document.whoProvides}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">Submitted To</span>
            <span className="font-semibold text-slate-900 mt-0.5 block">{document.whoReceives}</span>
          </div>
        </div>

        {/* Compliance Alert */}
        <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 text-orange-950 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
          <span>
            <strong>Educational Notice:</strong> This preview is an illustrative sample template demonstrating standard transportation industry paperwork formats. It is not an active executed legal contract or official government certificate.
          </span>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Standard Logistics Format</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
          >
            Close Preview
          </button>
        </div>

      </div>

    </div>
  );
};
