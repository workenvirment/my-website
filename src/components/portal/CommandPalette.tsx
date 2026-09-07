import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Truck, 
  Building2, 
  FileText, 
  MapPin, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { PORTAL_SAMPLE_LOADS, PORTAL_SAMPLE_CARRIERS, PORTAL_SAMPLE_BROKERS } from '../../data/portalData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateView: (view: string) => void;
  onSelectLoad?: (loadId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigateView,
  onSelectLoad
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or shortcut
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredLoads = PORTAL_SAMPLE_LOADS.filter((l) => 
    l.loadNumber.toLowerCase().includes(query.toLowerCase()) ||
    l.origin.city.toLowerCase().includes(query.toLowerCase()) ||
    l.destination.city.toLowerCase().includes(query.toLowerCase()) ||
    l.equipment.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredCarriers = PORTAL_SAMPLE_CARRIERS.filter((c) =>
    c.companyName.toLowerCase().includes(query.toLowerCase()) ||
    c.mcNumber.toLowerCase().includes(query.toLowerCase()) ||
    c.currentLocation.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 2);

  const filteredBrokers = PORTAL_SAMPLE_BROKERS.filter((b) =>
    b.name.toLowerCase().includes(query.toLowerCase()) ||
    b.mcNumber.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 2);

  const quickNavs = [
    { label: 'Operations Dashboard', view: 'dashboard', icon: Sparkles },
    { label: 'DAT Load Board', view: 'load-board', icon: Search },
    { label: 'Live US Freight Map', view: 'routes', icon: MapPin },
    { label: 'My Loads (Kanban Board)', view: 'my-loads', icon: Truck },
    { label: 'Hourly Dispatch Schedule', view: 'dispatch', icon: Truck },
    { label: 'Document & Compliance Center', view: 'documents', icon: FileText },
    { label: 'Carrier Database', view: 'carriers', icon: Truck },
    { label: 'Broker Directory', view: 'brokers', icon: Building2 },
  ].filter((nav) => nav.label.toLowerCase().includes(query.toLowerCase())).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-slate-900 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-slate-100 flex items-center px-4 py-3.5">
          <Search className="w-5 h-5 text-brand-orange shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search loads, carriers, brokers, MC numbers, routes, documents... (or type /)"
            autoFocus
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
          />
          <button
            onClick={onClose}
            className="px-2 py-1 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 text-[10px] font-mono font-bold ml-2"
          >
            ESC
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 text-xs">
          
          {/* Quick Navigations */}
          {quickNavs.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2 block">
                Quick Navigation
              </span>
              {quickNavs.map((nav, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onNavigateView(nav.view);
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl hover:bg-orange-50/60 hover:text-brand-orange text-slate-700 transition-colors flex items-center justify-between group text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-orange-100 text-slate-600 group-hover:text-brand-orange">
                      <nav.icon className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-xs text-slate-900">{nav.label}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          )}

          {/* Loads Results */}
          {filteredLoads.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2 block">
                Matching Loads
              </span>
              {filteredLoads.map((load) => (
                <button
                  key={load.id}
                  onClick={() => {
                    if (onSelectLoad) onSelectLoad(load.id);
                    onNavigateView('load-board');
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl hover:bg-orange-50/60 text-slate-700 transition-colors flex items-center justify-between group text-left border border-transparent hover:border-orange-200"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-brand-orange">{load.loadNumber}</span>
                      <span className="font-bold text-slate-900">{load.origin.city}, {load.origin.state} → {load.destination.city}, {load.destination.state}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {load.equipment} • {load.weightLbs.toLocaleString()} lbs • ${load.rate} (${load.rpm.toFixed(2)}/mi)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                    {load.status}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Carriers Results */}
          {filteredCarriers.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2 block">
                Carriers & Drivers
              </span>
              {filteredCarriers.map((carrier) => (
                <button
                  key={carrier.id}
                  onClick={() => {
                    onNavigateView('carriers');
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl hover:bg-orange-50/60 text-slate-700 transition-colors flex items-center justify-between group text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Truck className="w-4 h-4 text-brand-orange" />
                    <div>
                      <span className="font-bold text-slate-900 block">{carrier.companyName}</span>
                      <span className="text-[11px] text-slate-500 font-mono">{carrier.mcNumber} • {carrier.currentLocation}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                    {carrier.status}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Brokers Results */}
          {filteredBrokers.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2 block">
                Brokers & 3PLs
              </span>
              {filteredBrokers.map((broker) => (
                <button
                  key={broker.id}
                  onClick={() => {
                    onNavigateView('brokers');
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl hover:bg-orange-50/60 text-slate-700 transition-colors flex items-center justify-between group text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-cyan-600" />
                    <div>
                      <span className="font-bold text-slate-900 block">{broker.name}</span>
                      <span className="text-[11px] text-slate-500 font-mono">{broker.mcNumber} • Credit Score: {broker.creditScore}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 font-bold">
                    {broker.daysToPay}d to Pay
                  </span>
                </button>
              ))}
            </div>
          )}

          {quickNavs.length === 0 && filteredLoads.length === 0 && filteredCarriers.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-xs">
              No matching results found for "{query}".
            </div>
          )}

        </div>

        {/* Footer shortcuts helper */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between font-mono">
          <div className="flex items-center gap-3">
            <span><strong>↑↓</strong> Navigate</span>
            <span><strong>↵</strong> Select</span>
            <span><strong>ESC</strong> Close</span>
          </div>
          <span className="text-brand-orange font-bold">DGW Logistics Command</span>
        </div>

      </div>
    </div>
  );
};
