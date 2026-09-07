import React, { useState } from 'react';
import { 
  Bookmark, 
  Trash2, 
  Search, 
  ArrowRight, 
  FileText
} from 'lucide-react';
import { MC_DATABASE_RECORDS } from '../../data/mcDatabase';
import { McDetailDrawer } from '../mc/McDetailDrawer';
import type { McCarrierRecord } from '../../types';

interface SavedItemsManagerProps {
  onNavigate?: (path: string) => void;
}

const SAVED_CARRIERS_KEY = 'dgw_saved_carriers_store';
const RECENT_SEARCHES_KEY = 'dgw_mc_recent_searches';

export const SavedItemsManager: React.FC<SavedItemsManagerProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'carriers' | 'searches'>('carriers');
  const [selectedCarrier, setSelectedCarrier] = useState<McCarrierRecord | null>(null);

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_CARRIERS_KEY);
      return stored ? JSON.parse(stored) : ['mc-984210', 'mc-894201', 'mc-1049281'];
    } catch {
      return ['mc-984210'];
    }
  });

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      return stored ? JSON.parse(stored) : ['MC-984210', 'Apex 3PL', 'DOT-4019283', 'Reefer'];
    } catch {
      return ['MC-984210'];
    }
  });

  const handleRemoveCarrier = (id: string) => {
    const updated = savedIds.filter(i => i !== id);
    setSavedIds(updated);
    try {
      localStorage.setItem(SAVED_CARRIERS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleClearSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch {
      // ignore
    }
  };

  const savedCarriers = MC_DATABASE_RECORDS.filter(c => savedIds.includes(c.id));

  return (
    <div className="w-full space-y-6 text-white">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/30 text-[10px] font-mono font-bold uppercase">
              OPERATIONAL BOOKMARKS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white mt-1">
            Saved Carriers & Search History
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Quickly recall verified freight carriers, active broker profiles, and cached queries.
          </p>
        </div>

        <div className="flex rounded-xl bg-slate-950 p-1 border border-white/10 text-xs font-bold font-mono">
          <button
            onClick={() => setActiveTab('carriers')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'carriers' ? 'bg-brand-orange text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Saved Carriers ({savedCarriers.length})
          </button>
          <button
            onClick={() => setActiveTab('searches')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'searches' ? 'bg-brand-orange text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Search History ({recentSearches.length})
          </button>
        </div>
      </div>

      {/* TAB 1: SAVED CARRIERS */}
      {activeTab === 'carriers' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedCarriers.map((carrier) => (
              <div
                key={carrier.id}
                className="p-5 rounded-3xl bg-slate-900 border border-white/10 space-y-3 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded">
                          {carrier.mcNumber}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {carrier.dotNumber}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mt-1">
                        {carrier.legalName}
                      </h3>
                    </div>

                    <button
                      onClick={() => handleRemoveCarrier(carrier.id)}
                      className="p-1.5 rounded-lg bg-slate-950 hover:bg-red-950/60 text-slate-500 hover:text-red-400 transition-colors"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-400">
                    {carrier.address.city}, {carrier.address.state} • {carrier.powerUnits} Trucks • {carrier.safetyRating}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <button
                    onClick={() => setSelectedCarrier(carrier)}
                    className="flex-1 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Inspect File</span>
                  </button>

                  <a
                    href={`tel:${carrier.contact.phone}`}
                    className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-mono font-bold border border-white/10"
                  >
                    {carrier.contact.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {savedCarriers.length === 0 && (
            <div className="p-12 rounded-3xl bg-slate-900 border border-white/10 text-center space-y-3">
              <Bookmark className="w-8 h-8 text-slate-600 mx-auto" />
              <h4 className="text-sm font-bold text-white">No Saved Carriers</h4>
              <p className="text-xs text-slate-400">
                You can bookmark any carrier by clicking the bookmark icon in the MC Number search results.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SEARCH HISTORY */}
      {activeTab === 'searches' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-white">Recent MC & Registry Queries</span>
            {recentSearches.length > 0 && (
              <button
                onClick={handleClearSearches}
                className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 font-mono"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Queries</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recentSearches.map((q) => (
              <div
                key={q}
                className="p-3.5 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-brand-orange" />
                  <span className="font-bold text-white">{q}</span>
                </div>

                <button
                  onClick={() => onNavigate ? onNavigate(`/mc-lookup?q=${encodeURIComponent(q)}`) : null}
                  className="text-brand-orange hover:underline font-mono text-[11px] flex items-center gap-1"
                >
                  <span>Search Again</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          {recentSearches.length === 0 && (
            <div className="py-8 text-center text-slate-500 text-xs">
              Your search history is empty.
            </div>
          )}
        </div>
      )}

      {/* MC Detail Drawer */}
      <McDetailDrawer
        carrier={selectedCarrier}
        onClose={() => setSelectedCarrier(null)}
        isSaved={true}
      />

    </div>
  );
};
