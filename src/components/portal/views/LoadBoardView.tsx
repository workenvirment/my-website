import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck
} from 'lucide-react';
import { PORTAL_SAMPLE_LOADS } from '../../../data/portalData';

interface LoadBoardViewProps {
  onSelectLoad: (loadId: string) => void;
}

export const LoadBoardView: React.FC<LoadBoardViewProps> = ({ onSelectLoad }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'recommended' | 'available' | 'in_transit' | 'delivered'>('all');
  const [equipmentFilter, setEquipmentFilter] = useState('all');
  const [searchCity, setSearchCity] = useState('');
  const [minRpm, setMinRpm] = useState<number>(0);
  const [savedLoadIds, setSavedLoadIds] = useState<string[]>([]);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedLoadIds.includes(id)) {
      setSavedLoadIds(savedLoadIds.filter((item) => item !== id));
    } else {
      setSavedLoadIds([...savedLoadIds, id]);
    }
  };

  const filteredLoads = PORTAL_SAMPLE_LOADS.filter((load) => {
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'recommended' && (load.matchScore || 0) >= 90) ||
      (activeTab === 'available' && load.status === 'AVAILABLE') ||
      (activeTab === 'in_transit' && load.status === 'IN_TRANSIT') ||
      (activeTab === 'delivered' && load.status === 'DELIVERED');

    const matchesEquip = equipmentFilter === 'all' || load.equipment.toLowerCase().includes(equipmentFilter.toLowerCase());
    const matchesSearch = searchCity === '' ||
      load.origin.city.toLowerCase().includes(searchCity.toLowerCase()) ||
      load.destination.city.toLowerCase().includes(searchCity.toLowerCase()) ||
      load.loadNumber.toLowerCase().includes(searchCity.toLowerCase());
    const matchesRpm = minRpm === 0 || load.rpm >= minRpm;

    return matchesTab && matchesEquip && matchesSearch && matchesRpm;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
              DAT Live Freight Load Board
            </h1>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-orange-100 text-brand-orange border border-orange-200 font-bold">
              SPOT MARKET TELEMATICS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            High-density freight sourcing • Real-time load matching with direct carrier rate negotiation
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-slate-200 shadow-sm text-xs font-mono">
          <span className="text-slate-400">Loads in Queue:</span>
          <strong className="text-brand-orange font-bold text-sm">{filteredLoads.length} Loads</strong>
        </div>
      </div>

      {/* Tabs Strip */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'all', label: 'All Loads' },
          { id: 'recommended', label: 'Smart Recommended (90%+ Match)', icon: Sparkles },
          { id: 'available', label: 'Available Now' },
          { id: 'in_transit', label: 'In Transit Rolling' },
          { id: 'delivered', label: 'Delivered / Billing' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === tab.id
                ? 'bg-brand-orange text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Advanced Filter Bar */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          
          {/* City / State / Load ID Search */}
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="Search origin, destination, load ID..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-orange"
            />
          </div>

          {/* Equipment Dropdown */}
          <div className="sm:col-span-4">
            <select
              value={equipmentFilter}
              onChange={(e) => setEquipmentFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange"
            >
              <option value="all">Equipment: All Categories</option>
              <option value="Dry Van">53' Dry Van</option>
              <option value="Reefer">53' Reefer (Refrigerated)</option>
              <option value="Flatbed">48/53' Flatbed</option>
              <option value="Box Truck">26' Straight Box Truck</option>
              <option value="Power Only">Power Only Tractor</option>
            </select>
          </div>

          {/* Min RPM Filter */}
          <div className="sm:col-span-3">
            <select
              value={minRpm}
              onChange={(e) => setMinRpm(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange"
            >
              <option value={0}>Min RPM: Any Rate</option>
              <option value={2.20}>Min $2.20 / mi</option>
              <option value={2.50}>Min $2.50 / mi</option>
              <option value={3.00}>Min $3.00 / mi</option>
            </select>
          </div>

        </div>
      </div>

      {/* DAT-Style High Density Tabular Load Grid */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-mono text-slate-500 uppercase border-y border-slate-200">
              <tr>
                <th className="p-3">Save</th>
                <th className="p-3">Load ID</th>
                <th className="p-3">Origin (Pickup)</th>
                <th className="p-3">Destination (Drop)</th>
                <th className="p-3">Equipment</th>
                <th className="p-3">Weight</th>
                <th className="p-3">Miles</th>
                <th className="p-3">Rate</th>
                <th className="p-3">Target RPM</th>
                <th className="p-3">Match</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLoads.map((load) => {
                const isSaved = savedLoadIds.includes(load.id);

                return (
                  <tr
                    key={load.id}
                    onClick={() => onSelectLoad(load.id)}
                    className="hover:bg-orange-50/50 cursor-pointer transition-colors group"
                  >
                    <td className="p-3">
                      <button
                        onClick={(e) => toggleSave(load.id, e)}
                        className="text-slate-400 hover:text-brand-orange transition-colors"
                        title={isSaved ? 'Remove Bookmark' : 'Save Load'}
                      >
                        {isSaved ? (
                          <BookmarkCheck className="w-4 h-4 text-brand-orange" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </td>

                    <td className="p-3 font-mono font-bold text-brand-orange">{load.loadNumber}</td>

                    <td className="p-3">
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 block">{load.origin.city}, {load.origin.state}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{load.pickupDate}</span>
                      </div>
                    </td>

                    <td className="p-3">
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 block">{load.destination.city}, {load.destination.state}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{load.deliveryDate}</span>
                      </div>
                    </td>

                    <td className="p-3 font-mono text-slate-700">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px]">
                        {load.equipment}
                      </span>
                    </td>

                    <td className="p-3 font-mono text-slate-600">{load.weightLbs.toLocaleString()} lbs</td>

                    <td className="p-3 font-mono font-bold text-slate-800">{load.distanceMiles} mi</td>

                    <td className="p-3 font-mono font-bold text-emerald-700 text-sm">
                      ${load.rate.toLocaleString()}
                    </td>

                    <td className="p-3 font-mono font-bold text-brand-orange text-sm">
                      ${load.rpm.toFixed(2)}/mi
                    </td>

                    <td className="p-3">
                      {load.matchScore ? (
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          load.matchScore >= 95 ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-brand-orange'
                        }`}>
                          {load.matchScore}%
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono text-[10px]">-</span>
                      )}
                    </td>

                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-800 uppercase">
                        {load.status.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectLoad(load.id);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors"
                        >
                          Inspect
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`Load ${load.loadNumber} requested! Your DGW dispatcher will secure the rate con.`);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-[11px] shadow-sm transition-all"
                        >
                          Request
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredLoads.length === 0 && (
          <div className="p-12 text-center text-slate-500 text-xs space-y-2">
            <p>No freight loads match your current filter parameters.</p>
            <button
              onClick={() => {
                setActiveTab('all');
                setEquipmentFilter('all');
                setSearchCity('');
                setMinRpm(0);
              }}
              className="text-brand-orange hover:underline font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
