import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Truck, 
  Building2, 
  Package, 
  FileText, 
  FileCheck, 
  X, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { operationsStore } from '../../services/operationsStore';
import type { Trucker, Broker, Load, DocumentRecord } from '../../types/admin';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [truckers, setTruckers] = useState<Trucker[]>([]);
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loads, setLoads] = useState<Load[]>([]);
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setTruckers(operationsStore.getTruckers());
    setBrokers(operationsStore.getBrokers());
    setLoads(operationsStore.getLoads());
    setDocuments(operationsStore.getDocuments());

    const unsub = operationsStore.subscribe(() => {
      setTruckers(operationsStore.getTruckers());
      setBrokers(operationsStore.getBrokers());
      setLoads(operationsStore.getLoads());
      setDocuments(operationsStore.getDocuments());
    });

    return () => unsub();
  }, []);

  // Keyboard shortcut listener for Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Filtered search results
  const results = useMemo(() => {
    if (!query.trim()) {
      return [
        { type: 'page', title: 'Dashboard', subtitle: 'Overview & telemetry', route: '/dashboard', icon: Sparkles },
        { type: 'page', title: 'Truckers Network', subtitle: `Manage ${truckers.length} registered carriers`, route: '/truckers', icon: Truck },
        { type: 'page', title: 'Brokers Directory', subtitle: 'Shippers & freight brokers', route: '/brokers', icon: Building2 },
        { type: 'page', title: 'Load Board', subtitle: 'Active & assigned freight', route: '/loads', icon: Package },
        { type: 'page', title: 'Dispatch Messages', subtitle: 'Internal communications', route: '/messages', icon: FileText },
        { type: 'page', title: 'MC & DOT Lookup', subtitle: 'FMCSA safety authority verification', route: '/mc-lookup', icon: FileCheck },
      ];
    }

    const q = query.toLowerCase();
    const items: Array<{
      type: 'trucker' | 'broker' | 'load' | 'doc' | 'page';
      title: string;
      subtitle: string;
      route: string;
      icon: any;
    }> = [];

    // Search Truckers
    truckers.forEach((t) => {
      if (
        t.name.toLowerCase().includes(q) ||
        t.company.toLowerCase().includes(q) ||
        t.mcNumber.toLowerCase().includes(q) ||
        t.phone.toLowerCase().includes(q) ||
        t.equipment.toLowerCase().includes(q)
      ) {
        items.push({
          type: 'trucker',
          title: t.name,
          subtitle: `${t.company} • ${t.mcNumber} • ${t.equipment} (${t.status})`,
          route: '/truckers',
          icon: Truck
        });
      }
    });

    // Search Brokers
    brokers.forEach((b) => {
      if (
        b.companyName.toLowerCase().includes(q) ||
        b.contact.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        (b.mcNumber && b.mcNumber.toLowerCase().includes(q))
      ) {
        items.push({
          type: 'broker',
          title: b.companyName,
          subtitle: `Contact: ${b.contact} • ${b.phone} • Status: ${b.status}`,
          route: '/brokers',
          icon: Building2
        });
      }
    });

    // Search Loads
    loads.forEach((l) => {
      if (
        l.loadNumber.toLowerCase().includes(q) ||
        l.origin.toLowerCase().includes(q) ||
        l.destination.toLowerCase().includes(q) ||
        l.brokerName.toLowerCase().includes(q) ||
        (l.assignedTruckerName && l.assignedTruckerName.toLowerCase().includes(q))
      ) {
        items.push({
          type: 'load',
          title: `Load #${l.loadNumber}: ${l.origin} → ${l.destination}`,
          subtitle: `$${l.rate.toLocaleString()} • ${l.equipment} • Status: ${l.status}`,
          route: '/loads',
          icon: Package
        });
      }
    });

    // Search Documents
    documents.forEach((d) => {
      if (
        d.name.toLowerCase().includes(q) ||
        d.ownerName.toLowerCase().includes(q) ||
        d.mcNumber.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
      ) {
        items.push({
          type: 'doc',
          title: d.name,
          subtitle: `${d.category} • ${d.ownerName} (${d.status})`,
          route: '/documents',
          icon: FileCheck
        });
      }
    });

    return items.slice(0, 10);
  }, [query, truckers, brokers, loads, documents]);

  if (!isOpen) return null;

  const handleSelect = (route: string) => {
    onNavigate(route);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 animate-in fade-in">
      <div 
        className="bg-[#0D1624] border border-[#1E2C3F] rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-[#1E2C3F] flex items-center gap-3 bg-[#111C2B]/50">
          <Search className="w-5 h-5 text-blue-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search truckers, MC#, phone, company, loads, documents..."
            className="w-full bg-transparent border-none text-white text-sm focus:outline-none placeholder-slate-500 font-medium"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="px-2 py-0.5 rounded bg-[#152336] border border-[#1E2C3F] text-[10px] font-mono text-slate-400">
            ESC
          </span>
        </div>

        {/* Search Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-[#1E2C3F]/30 scrollbar-thin">
          {results.length === 0 ? (
            <div className="py-12 text-center space-y-2 text-slate-500">
              <Search className="w-8 h-8 mx-auto opacity-40 text-slate-400" />
              <p className="text-xs font-medium">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-[11px] text-slate-600">Try searching by MC number, phone, carrier name, or load ID.</p>
            </div>
          ) : (
            results.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={`${item.type}-${idx}`}
                  onClick={() => handleSelect(item.route)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                    isSelected ? 'bg-blue-600/15 border border-blue-500/30 text-white' : 'hover:bg-[#111C2B] text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      item.type === 'trucker' ? 'bg-blue-500/15 text-blue-400' :
                      item.type === 'broker' ? 'bg-emerald-500/15 text-emerald-400' :
                      item.type === 'load' ? 'bg-amber-500/15 text-amber-400' :
                      item.type === 'doc' ? 'bg-purple-500/15 text-purple-400' :
                      'bg-slate-800 text-slate-300'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{item.title}</p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 text-slate-500">
                    <span className="text-[10px] font-mono capitalize px-2 py-0.5 rounded bg-[#07111F] border border-[#1E2C3F]">
                      {item.type}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Search Footer */}
        <div className="p-3 border-t border-[#1E2C3F] bg-[#07111F]/70 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Jump to record</span>
          </div>
          <span>DGW Dispatch Search Engine</span>
        </div>
      </div>
    </div>
  );
};
