import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Square, 
  RotateCcw, 
  Eye, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { CARRIER_ONBOARDING_CHECKLIST_DATA } from '../../data/workflowData';
import { DOCUMENTS_LIST } from '../../data/documentsData';
import { DocumentModal } from '../common/DocumentModal';
import type { DocumentItem } from '../../types';

export const CarrierChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dgw_carrier_checklist_state');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['mc-authority', 'w9-form', 'coi-auto', 'coi-cargo'];
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('dgw_carrier_checklist_state', JSON.stringify(checkedItems));
    } catch {
      // ignore
    }
  }, [checkedItems]);

  const toggleItem = (id: string) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const handleReset = () => {
    setCheckedItems([]);
  };

  const handleSelectAll = () => {
    setCheckedItems(CARRIER_ONBOARDING_CHECKLIST_DATA.map((i) => i.id));
  };

  const categories = ['All', 'Legal Authority', 'Tax & Compliance', 'Insurance', 'Equipment', 'Payment / Financial', 'Communications', 'Driver Credentials'];

  const filteredItems = CARRIER_ONBOARDING_CHECKLIST_DATA.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const totalCount = CARRIER_ONBOARDING_CHECKLIST_DATA.length;
  const completedCount = checkedItems.length;
  const percent = Math.round((completedCount / totalCount) * 100);

  const handleOpenSampleDoc = (itemId: string) => {
    const docMap: Record<string, string> = {
      'mc-authority': 'doc-mc-authority',
      'w9-form': 'doc-w9',
      'coi-auto': 'doc-coi-auto',
      'coi-cargo': 'doc-coi-cargo',
      'factoring-noa': 'doc-factoring-noa',
      'cdl-license': 'doc-cdl-guide',
    };

    const docKey = docMap[itemId] || 'doc-mc-authority';
    const foundDoc = DOCUMENTS_LIST.find((d) => d.id === docKey) || DOCUMENTS_LIST[0];
    setPreviewDoc(foundDoc);
  };

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl text-slate-900 space-y-6">
      
      {/* Header with Progress Gauge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-brand-orange border border-orange-200 text-[10px] font-mono font-bold uppercase tracking-wider">
              Carrier Onboarding Audit
            </span>
            <span className="text-xs text-slate-500">Interactive Self-Assessment</span>
          </div>
          <h3 className="text-xl font-display font-black text-slate-900 mt-1">Carrier Setup & Compliance Checklist</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Check off the documents and requirements you have ready. Progress is automatically saved to your browser.
          </p>
        </div>

        {/* Progress Gauge */}
        <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200 shrink-0">
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">Readiness Score</span>
            <span className={`text-base font-display font-bold ${
              percent === 100 ? 'text-emerald-700' : percent >= 50 ? 'text-brand-orange' : 'text-slate-700'
            }`}>
              {percent}% Ready ({completedCount}/{totalCount})
            </span>
          </div>

          <div className="w-12 h-12 rounded-full border-2 border-slate-200 bg-white shadow-sm flex items-center justify-center relative">
            <span className="text-xs font-mono font-bold text-slate-900">{percent}%</span>
          </div>
        </div>
      </div>

      {/* Progress Bar Visual Line */}
      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
        <div 
          className={`h-full transition-all duration-300 ${
            percent === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-brand-orange to-amber-500'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Action Controls & Category Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-brand-orange text-white font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={handleSelectAll}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors font-semibold"
          >
            Check All
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors font-semibold flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredItems.map((item) => {
          const isChecked = checkedItems.includes(item.id);
          const hasSample = ['mc-authority', 'w9-form', 'coi-auto', 'coi-cargo', 'factoring-noa', 'cdl-license'].includes(item.id);

          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl transition-all border flex items-start justify-between gap-3 ${
                isChecked
                  ? 'bg-orange-50/40 border-brand-orange/40 shadow-sm'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="flex items-start gap-3 text-left flex-1"
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-brand-orange" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs">{item.title}</span>
                    {item.required ? (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold border border-red-200">
                        REQUIRED
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700 border border-slate-300">
                        OPTIONAL / NOA
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 font-medium">{item.subtitle}</p>
                  <p className="text-[11px] text-slate-500">{item.notes}</p>
                </div>
              </button>

              {hasSample && (
                <button
                  onClick={() => handleOpenSampleDoc(item.id)}
                  className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-white hover:bg-slate-100 text-brand-orange border border-slate-200 shadow-sm shrink-0 flex items-center gap-1 mt-1 transition-colors"
                  title="View Sample Document Template"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Sample</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {percent === 100 && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-2 font-bold">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>Carrier Compliance File 100% Prepared for Instant Broker Tenders!</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-700">
            <ShieldCheck className="w-4 h-4" />
            <span>DISPATCH READY</span>
          </div>
        </div>
      )}

      {/* Document Modal */}
      <DocumentModal
        document={previewDoc}
        onClose={() => setPreviewDoc(null)}
      />

    </div>
  );
};
