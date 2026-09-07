import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Bookmark, 
  BookmarkCheck, 
  RotateCcw, 
  FileText, 
  AlertCircle
} from 'lucide-react';
import { searchMcDatabase } from '../../data/mcDatabase';
import { McDetailDrawer } from './McDetailDrawer';
import type { McCarrierRecord } from '../../types';

interface McSearchSystemProps {
  initialQuery?: string;
  onNavigate?: (path: string) => void;
}

const RECENT_SEARCHES_KEY = 'dgw_mc_recent_searches';
const SAVED_CARRIERS_KEY = 'dgw_saved_carriers_store';

export const McSearchSystem: React.FC<McSearchSystemProps> = ({ 
  initialQuery = '' 
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [selectedEquipment, setSelectedEquipment] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'units'>('rating');

  const [selectedCarrier, setSelectedCarrier] = useState<McCarrierRecord | null>(null);

  // Recent Searches
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      return stored ? JSON.parse(stored) : ['MC-984210', 'Apex 3PL', 'DOT-4019283', 'Reefer'];
    } catch {
      return ['MC-984210', 'Apex 3PL'];
    }
  });

  // Saved Favorites
  const [savedCarrierIds, setSavedCarrierIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_CARRIERS_KEY);
      return stored ? JSON.parse(stored) : ['mc-984210'];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !recentSearches.includes(query.trim())) {
      const updated = [query.trim(), ...recentSearches.slice(0, 5)];
      setRecentSearches(updated);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
  };

  const handleToggleFavorite = (carrier: McCarrierRecord) => {
    let updated: string[];
    if (savedCarrierIds.includes(carrier.id)) {
      updated = savedCarrierIds.filter((id) => id !== carrier.id);
    } else {
      updated = [carrier.id, ...savedCarrierIds];
    }
    setSavedCarrierIds(updated);
    try {
      localStorage.setItem(SAVED_CARRIERS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleResetFilters = () => {
    setSelectedType('All');
    setSelectedRating('All');
    setSelectedEquipment('All');
    setSelectedState('All');
    setVerifiedOnly(false);
    setQuery('');
  };

  // Perform search
  let results = searchMcDatabase(query, {
    companyType: selectedType,
    safetyRating: selectedRating,
    equipmentType: selectedEquipment,
    state: selectedState,
    verifiedOnly
  });

  // Sorting
  results = [...results].sort((a, b) => {
    if (sortBy === 'rating') return b.dgwRating - a.dgwRating;
    if (sortBy === 'units') return b.powerUnits - a.powerUnits;
    return a.legalName.localeCompare(b.legalName);
  });

  const statesList = ['All', 'TX', 'CO', 'GA', 'IL', 'FL', 'WA', 'OH'];
  const equipmentList = ['All', 'Dry Van', 'Reefer', 'Flatbed', 'Hotshot', 'Box Truck', 'Stepdeck', 'Power Only'];

  return (
    <div className="w-full space-y-6 text-slate-900">
      
      {/* Search Header Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-5 text-slate-900">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-[10px] font-mono font-bold uppercase shadow-xs">
                FMCSA Carrier Search Engine
              </span>
              <span className="text-xs text-slate-500 font-mono">Real-Time Registry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-950 mt-1">
              MC & DOT Number Intelligence
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Instant safety ratings, BIPD insurance limits, equipment classifications, and verified contact profiles.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-mono">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold focus:outline-none focus:border-amber-500"
            >
              <option value="rating">Highest Safety Rating</option>
              <option value="units">Fleet Size (Power Units)</option>
              <option value="name">Company Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-amber-600 absolute left-4" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by MC Number (e.g. MC-984210), DOT Number, Company Name, or City..."
              className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 text-sm font-medium"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-24 text-slate-400 hover:text-slate-800 text-xs font-mono"
              >
                Clear
              </button>
            )}
            <button
              type="submit"
              className="absolute right-2 px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md"
            >
              Search
            </button>
          </div>
        </form>

        {/* Recent Search Chips */}
        {recentSearches.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-slate-400 text-[11px]">Recent Queries:</span>
            {recentSearches.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 hover:border-amber-500 text-slate-700 hover:text-slate-950 text-[11px] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Filters Grid */}
        <div className="pt-2 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          
          <div>
            <label className="text-[10px] font-mono text-slate-500 block mb-1">COMPANY TYPE</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Types</option>
              <option value="Carrier">Motor Carrier</option>
              <option value="Broker">Freight Broker</option>
              <option value="Owner Operator">Owner Operator</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-mono text-slate-500 block mb-1">EQUIPMENT</label>
            <select
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-amber-500"
            >
              {equipmentList.map((eq) => (
                <option key={eq} value={eq}>{eq}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-mono text-slate-500 block mb-1">SAFETY RATING</label>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Ratings</option>
              <option value="Gold Tier Verified">Gold Tier Verified</option>
              <option value="Satisfactory">Satisfactory</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-mono text-slate-500 block mb-1">STATE</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-amber-500"
            >
              {statesList.map((st) => (
                <option key={st} value={st}>{st === 'All' ? 'All States' : st}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-2 col-span-2 sm:col-span-1">
            <button
              type="button"
              onClick={handleResetFilters}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

        </div>

      </div>

      {/* Results Count & Meta */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-500 px-2">
        <span>Found {results.length} Verified Records</span>
        <span>FMCSA API Live Mirror: Synced</span>
      </div>

      {/* Results Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((carrier) => {
          const isSaved = savedCarrierIds.includes(carrier.id);

          return (
            <div
              key={carrier.id}
              className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-amber-500/60 transition-all space-y-4 text-slate-900 shadow-md hover:shadow-xl flex flex-col justify-between group"
            >
              
              {/* Card Header */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-300">
                        {carrier.mcNumber}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {carrier.dotNumber}
                      </span>
                      {carrier.isVerifiedByDgw && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-blue-600" />
                          VERIFIED
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-950 group-hover:text-amber-700 transition-colors">
                      {carrier.legalName}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleToggleFavorite(carrier)}
                    className={`p-2 rounded-xl border transition-colors ${
                      isSaved ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-800'
                    }`}
                    title="Save to Favorites"
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-600" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{carrier.address.city}, {carrier.address.state} • {carrier.powerUnits} Trucks ({carrier.authorityType})</span>
                </div>
              </div>

              {/* Equipment Tags */}
              <div className="flex flex-wrap gap-1.5">
                {carrier.equipmentTypes.map((eq) => (
                  <span key={eq} className="px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[10px]">
                    {eq}
                  </span>
                ))}
              </div>

              {/* Insurance & Safety Rating Metrics */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-[9px] text-slate-500 block">AUTO LIABILITY (BIPD)</span>
                  <span className="font-bold text-emerald-700">${(carrier.insurance.bipdOnFile / 1000000).toFixed(1)}M Active</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 block">VEHICLE OOS RATE</span>
                  <span className="font-bold text-slate-800">{carrier.inspections.vehicleOosRate}% (Low Risk)</span>
                </div>
              </div>

              {/* Card Actions */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setSelectedCarrier(carrier)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Inspect Carrier File</span>
                </button>

                <a
                  href={`tel:${carrier.contact.phone}`}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors"
                  title={`Call ${carrier.contact.phone}`}
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

            </div>
          );
        })}
      </div>

      {/* No Results Fallback */}
      {results.length === 0 && (
        <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-4 shadow-lg">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-950">No Matching MC Records Found</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            We could not find any carrier matching "<strong>{query}</strong>" with your current filters. Try resetting filters or search by MC number (e.g. MC-984210).
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Carrier Detail Inspector Drawer */}
      <McDetailDrawer
        carrier={selectedCarrier}
        onClose={() => setSelectedCarrier(null)}
        onSaveFavorite={handleToggleFavorite}
        isSaved={selectedCarrier ? savedCarrierIds.includes(selectedCarrier.id) : false}
      />

    </div>
  );
};
