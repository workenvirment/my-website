import React, { useState } from 'react';
import { 
  Building2, 
  Warehouse, 
  ShoppingBag, 
  Compass, 
  Truck, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  MessageSquare, 
  Zap,
  Users
} from 'lucide-react';
import { ECOSYSTEM_NODES } from '../../data/workflowData';

export const EcosystemVisualizer: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('dispatcher');
  const [activeWorkflowView, setActiveWorkflowView] = useState<'primary' | 'sales'>('primary');

  const selectedNode = ECOSYSTEM_NODES.find((n) => n.id === selectedNodeId) || ECOSYSTEM_NODES[3];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5" />;
      case 'Warehouse': return <Warehouse className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Truck': return <Truck className="w-5 h-5" />;
      case 'User': return <User className="w-5 h-5" />;
      default: return <Truck className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Workflow View Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-logistics-900 border border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase text-brand-gold tracking-wider block font-semibold">Interactive Architecture</span>
          <h3 className="text-base font-display font-bold text-white mt-0.5">The Logistics Ecosystem & Communication Chain</h3>
        </div>

        <div className="flex items-center gap-1.5 bg-logistics-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveWorkflowView('primary')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeWorkflowView === 'primary'
                ? 'bg-brand-gold text-slate-950 shadow-glow-gold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Full Supply Flow (Shipper → Driver)
          </button>
          <button
            onClick={() => setActiveWorkflowView('sales')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeWorkflowView === 'sales'
                ? 'bg-brand-cyan text-slate-950 shadow-glow-cyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sales → Dispatch Flow
          </button>
        </div>
      </div>

      {/* Main Visual Interactive Flow Diagram */}
      {activeWorkflowView === 'primary' ? (
        <div className="relative">
          {/* Connecting Flow Track */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
            {ECOSYSTEM_NODES.map((node, index) => {
              const isSelected = selectedNodeId === node.id;
              const isDispatcher = node.id === 'dispatcher';

              return (
                <div key={node.id} className="relative flex flex-col">
                  <button
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`relative w-full p-4 rounded-2xl text-left transition-all duration-300 flex flex-col justify-between min-h-[140px] border ${
                      isSelected
                        ? isDispatcher 
                          ? 'bg-gradient-to-b from-brand-gold/20 to-logistics-850 border-brand-gold shadow-glow-gold' 
                          : 'bg-logistics-850 border-brand-cyan shadow-glow-cyan'
                        : isDispatcher
                          ? 'bg-logistics-900 border-brand-gold/40 hover:border-brand-gold'
                          : 'bg-logistics-900/80 border-slate-800 hover:border-slate-700 hover:bg-logistics-850'
                    }`}
                  >
                    {/* Node Header */}
                    <div className="flex items-center justify-between w-full">
                      <div className={`p-2 rounded-xl border ${
                        isSelected 
                          ? isDispatcher ? 'bg-brand-gold text-slate-950 border-brand-gold' : 'bg-brand-cyan text-slate-950 border-brand-cyan'
                          : isDispatcher ? 'bg-brand-gold/15 text-brand-gold border-brand-gold/30' : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {getIcon(node.iconName)}
                      </div>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Node Info */}
                    <div className="mt-3">
                      <p className={`text-xs font-display font-bold leading-tight ${
                        isSelected ? 'text-white' : 'text-slate-200'
                      }`}>
                        {node.title.replace(/^\d+\.\s*/, '')}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{node.subtitle}</p>
                    </div>

                    {isDispatcher && (
                      <div className="mt-2 inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider text-brand-gold">
                        <Zap className="w-2.5 h-2.5 fill-brand-gold" />
                        <span>DGW Core Hub</span>
                      </div>
                    )}
                  </button>

                  {/* Flow Arrow (Desktop) */}
                  {index < ECOSYSTEM_NODES.length - 1 && (
                    <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 w-5 h-5 rounded-full bg-logistics-950 border border-slate-700 items-center justify-center text-slate-400">
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Alternative Sales -> Dispatcher -> Broker -> Carrier Flow */
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-logistics-900 border border-slate-800">
          <div className="p-4 rounded-xl bg-logistics-950 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">1. Sales Person / Intake</h4>
            <p className="text-[11px] text-slate-300">
              Gathers carrier parameters: truck length, weight capacity, target RPM, weekly revenue goal, and preferred states.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-b from-brand-gold/15 to-logistics-950 border border-brand-gold/50 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-brand-gold text-slate-950 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider">2. DGW Dispatcher</h4>
            <p className="text-[11px] text-slate-300">
              Translates carrier specifications into active market searches, vets broker credit, and initiates direct load negotiations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-logistics-950 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">3. Freight Broker (3PL)</h4>
            <p className="text-[11px] text-slate-300">
              Agrees on rate, issues the official Rate Confirmation (RC), and provides shipper facility loading instructions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-logistics-950 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">4. Motor Carrier / Driver</h4>
            <p className="text-[11px] text-slate-300">
              Approves the booked load, completes pickup on time, delivers securely, and submits signed POD for settlement.
            </p>
          </div>
        </div>
      )}

      {/* Detail Card for Clicked Node */}
      <div className="p-6 md:p-8 rounded-2xl bg-logistics-900/90 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
              {getIcon(selectedNode.iconName)}
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-brand-cyan">Selected Node Profile</span>
              <h3 className="text-lg font-display font-extrabold text-white">{selectedNode.title}</h3>
              <p className="text-xs text-slate-400">{selectedNode.subtitle}</p>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 max-w-md">
            <span className="text-brand-gold font-semibold">Where DGW Fits: </span>
            <span>{selectedNode.dgwRole}</span>
          </div>
        </div>

        {/* Breakdown Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-xs">
          
          {/* Key Responsibilities */}
          <div className="space-y-3">
            <h4 className="font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
              <span>Core Responsibilities</span>
            </h4>
            <ul className="space-y-2">
              {selectedNode.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300 leading-relaxed bg-logistics-950/50 p-2.5 rounded-lg border border-slate-800/60">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Documentation Exchanged */}
          <div className="space-y-3">
            <h4 className="font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-cyan" />
              <span>Documentation Handled</span>
            </h4>
            
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-logistics-950/50 border border-slate-800/60">
                <span className="text-[10px] uppercase text-slate-400 block font-mono">Provides:</span>
                <p className="text-slate-200 mt-0.5">{selectedNode.documentsProvided.join(', ')}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-logistics-950/50 border border-slate-800/60">
                <span className="text-[10px] uppercase text-slate-400 block font-mono">Receives:</span>
                <p className="text-slate-200 mt-0.5">{selectedNode.documentsReceived.join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Communication & Information Flow */}
          <div className="space-y-3">
            <h4 className="font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-brand-gold" />
              <span>Communication Exchange</span>
            </h4>
            
            <div className="p-3 rounded-lg bg-logistics-950/50 border border-slate-800/60 space-y-2">
              <p className="text-slate-300 leading-relaxed">{selectedNode.communicationFlow}</p>
              <div className="pt-2 border-t border-slate-800">
                <span className="text-[10px] uppercase text-slate-400 block font-mono">Data Handled:</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {selectedNode.informationExchanged.map((info, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 border border-slate-700">
                      {info}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
