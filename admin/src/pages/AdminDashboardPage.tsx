import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Mail, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  Layers, 
  ChevronRight, 
  Package, 
  Activity, 
  Check 
} from 'lucide-react';
import { operationsStore } from '../services/operationsStore';
import { 
  subscribeToTruckers, 
  subscribeToContactMessages, 
  subscribeToCarrierLeads, 
  formatFirestoreDate 
} from '../services/firestoreService';
import type { 
  Trucker, 
  TruckerDoc, 
  OperationTask, 
  ContactMessageDoc, 
  CarrierLeadDoc 
} from '../types/admin';

interface AdminDashboardPageProps {
  onNavigate?: (route: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  // Real-time Firestore state
  const [leads, setLeads] = useState<CarrierLeadDoc[]>([]);
  const [truckers, setTruckers] = useState<Trucker[]>([]);
  const [messages, setMessages] = useState<ContactMessageDoc[]>([]);
  const [tasks, setTasks] = useState<OperationTask[]>([]);

  // Selected Trucker / Lead for Quick View Modal
  const [selectedTrucker, setSelectedTrucker] = useState<Trucker | null>(null);
  const [selectedLead, setSelectedLead] = useState<CarrierLeadDoc | null>(null);

  // Live clock
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric'
        }) + ' • ' + now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load and sync real Firestore data
  useEffect(() => {
    const syncStore = () => {
      setTruckers(operationsStore.getTruckers());
      setTasks(operationsStore.getTasks());
    };

    syncStore();
    const unsubStore = operationsStore.subscribe(syncStore);

    // Sync real Firestore carrier leads
    const unsubLeads = subscribeToCarrierLeads((leadsList) => {
      setLeads(leadsList);
    });

    // Sync real Firestore truckers
    const unsubTruckers = subscribeToTruckers((truckersList: TruckerDoc[]) => {
      operationsStore.syncFirestoreTruckers(truckersList);
      setTruckers(operationsStore.getTruckers());
    });

    // Sync real Firestore messages
    const unsubMessages = subscribeToContactMessages((msgs: ContactMessageDoc[]) => {
      operationsStore.syncFirestoreMessages(msgs);
      setMessages(msgs);
    });

    return () => {
      unsubStore();
      unsubLeads();
      unsubTruckers();
      unsubMessages();
    };
  }, []);

  const handleToggleTask = (taskId: string) => {
    operationsStore.toggleTask(taskId);
  };

  const handleNavigate = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    }
  };

  // Real Metrics Calculation from Firestore
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;
  const inReviewLeadsCount = leads.filter((l) => l.status === 'in_review').length;
  const contactedLeadsCount = leads.filter((l) => l.status === 'contacted').length;
  const onboardedLeadsCount = leads.filter((l) => l.status === 'onboarded').length;

  const totalTruckers = truckers.length;
  const activeTruckers = truckers.filter((t) => t.status === 'Active').length;
  const unreadMessagesCount = messages.filter((m) => m.status === 'unread').length;

  const verifiedMCNumbersCount = 
    truckers.filter((t) => t.mcNumber && t.mcNumber !== 'MC-Pending').length + 
    leads.filter((l) => l.mcNumber && l.mcNumber.trim() !== '').length;

  return (
    <div className="space-y-4">
      
      {/* 1. Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-[#0A1322] via-[#0D182A] to-[#0A1322] border border-[#1B293E] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-sky-400 to-amber-500 opacity-80" />

        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black font-display text-white tracking-tight">
              DGW Operations Center
            </h1>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>System Online</span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Monitor leads, carriers, onboarding activity, and logistics operations from one place.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-xl bg-[#08101C] border border-[#1B293E] text-slate-300 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[11px] font-semibold">{currentTime || 'Loading clock...'}</span>
          </div>

          <button
            onClick={() => handleNavigate('/leads')}
            className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 font-bold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Carrier Leads ({totalLeads})</span>
          </button>
        </div>
      </div>

      {/* 2. Premium Semi-Truck Visual Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-[#1E2E46] shadow-2xl group min-h-[160px] sm:min-h-[190px] flex items-center">
        <img 
          src="/hero-semi-truck.jpg" 
          alt="DGW Logistics Fleet Highway" 
          className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07111F] via-[#07111F]/90 to-[#07111F]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111F]/90 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-blue-950/20 mix-blend-multiply" />

        <div className="relative z-10 p-5 sm:p-7 max-w-2xl space-y-2.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-md text-blue-300 text-[10px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Operations & Dispatch Infrastructure</span>
          </div>

          <div>
            <h2 className="text-xl sm:text-3xl font-black font-display text-white tracking-tight drop-shadow-md">
              Move More. Operate Smarter.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium drop-shadow-sm mt-1">
              DGW Solutions logistics operations platform.
            </p>
          </div>

          <div className="pt-1 flex items-center gap-3">
            <button
              onClick={() => handleNavigate('/leads')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs shadow-lg shadow-blue-900/50 flex items-center gap-2 transition-all cursor-pointer border border-blue-400/40 transform hover:-translate-y-0.5"
            >
              <span>View Operations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleNavigate('/truckers')}
              className="px-4 py-2 rounded-xl bg-[#0A1322]/80 hover:bg-[#0E1A2E] text-slate-200 font-bold text-xs border border-[#1E2E46] backdrop-blur-md transition-all cursor-pointer"
            >
              Manage Fleet
            </button>
          </div>
        </div>

        <div className="absolute right-6 bottom-4 hidden lg:block opacity-20 pointer-events-none">
          <span className="text-6xl font-black font-display text-white tracking-tighter">DGW</span>
        </div>
      </div>

      {/* 3. KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* KPI 1 */}
        <div 
          onClick={() => handleNavigate('/leads')}
          className="glass-card p-3.5 rounded-2xl cursor-pointer flex flex-col justify-between h-[124px] relative overflow-hidden group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
            {newLeadsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[9.5px] font-mono font-bold animate-pulse">
                +{newLeadsCount} New
              </span>
            )}
          </div>
          <div>
            <span className="text-slate-400 text-[11px] font-medium block">Total Leads</span>
            <span className="text-2xl font-black text-white font-display leading-tight">{totalLeads}</span>
          </div>
          <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-500">
            <span>Inquiries stream</span>
            <span className="text-blue-400 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div 
          onClick={() => handleNavigate('/leads')}
          className="glass-card p-3.5 rounded-2xl cursor-pointer flex flex-col justify-between h-[124px] relative overflow-hidden group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-400">
              Pipeline
            </span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] font-medium block">New Inquiries</span>
            <span className="text-2xl font-black text-emerald-400 font-display leading-tight">{newLeadsCount}</span>
          </div>
          <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-500">
            <span>{newLeadsCount > 0 ? 'Requires action' : 'All processed'}</span>
            <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div 
          onClick={() => handleNavigate('/truckers')}
          className="glass-card p-3.5 rounded-2xl cursor-pointer flex flex-col justify-between h-[124px] relative overflow-hidden group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Truck className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-400">
              {activeTruckers} Active
            </span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] font-medium block">Total Truckers</span>
            <span className="text-2xl font-black text-white font-display leading-tight">{totalTruckers}</span>
          </div>
          <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-500">
            <span>Fleet database</span>
            <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div 
          onClick={() => handleNavigate('/messages')}
          className="glass-card p-3.5 rounded-2xl cursor-pointer flex flex-col justify-between h-[124px] relative overflow-hidden group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="w-4 h-4" />
            </div>
            {unreadMessagesCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-[9.5px] font-mono font-bold animate-pulse">
                {unreadMessagesCount} Unread
              </span>
            )}
          </div>
          <div>
            <span className="text-slate-400 text-[11px] font-medium block">Messages</span>
            <span className="text-2xl font-black text-white font-display leading-tight">{messages.length}</span>
          </div>
          <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-500">
            <span>{unreadMessagesCount > 0 ? 'Action required' : 'Inbox caught up'}</span>
            <span className="text-purple-400 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
          </div>
        </div>

        {/* KPI 5 */}
        <div 
          onClick={() => handleNavigate('/mc-lookup')}
          className="col-span-2 sm:col-span-1 glass-card p-3.5 rounded-2xl cursor-pointer flex flex-col justify-between h-[124px] relative overflow-hidden group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono font-bold text-sky-400">
              USDOT / MC
            </span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] font-medium block">MC Numbers</span>
            <span className="text-2xl font-black text-white font-display leading-tight">{verifiedMCNumbersCount}</span>
          </div>
          <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-500">
            <span>Registry records</span>
            <span className="text-sky-400 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
          </div>
        </div>
      </div>

      {/* 4. Lead Pipeline Progression */}
      <div className="p-4 rounded-2xl bg-[#0A1322] border border-[#1B293E] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#1B293E] pb-3">
          <div>
            <h3 className="text-sm font-bold font-display text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Lead Pipeline Progression</span>
            </h3>
            <p className="text-[11px] text-slate-400">Real-time status of all carrier inquiries submitted through the platform.</p>
          </div>
          <button
            onClick={() => handleNavigate('/leads')}
            className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Open Pipeline</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-xl bg-[#08101C] border border-[#1B293E] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                1. New / Pending
              </span>
              <span className="text-xs font-mono font-bold text-white bg-emerald-500/20 px-1.5 py-0.2 rounded border border-emerald-500/30">
                {newLeadsCount}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Newly received applications awaiting initial review.</p>
          </div>

          <div className="p-3 rounded-xl bg-[#08101C] border border-[#1B293E] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-bold text-amber-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                2. In Review
              </span>
              <span className="text-xs font-mono font-bold text-white bg-amber-500/20 px-1.5 py-0.2 rounded border border-amber-500/30">
                {inReviewLeadsCount}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Equipment & lane verification in progress.</p>
          </div>

          <div className="p-3 rounded-xl bg-[#08101C] border border-[#1B293E] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-bold text-blue-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                3. Contacted
              </span>
              <span className="text-xs font-mono font-bold text-white bg-blue-500/20 px-1.5 py-0.2 rounded border border-blue-500/30">
                {contactedLeadsCount}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Dispatcher reached out to carrier driver/owner.</p>
          </div>

          <div className="p-3 rounded-xl bg-[#08101C] border border-[#1B293E] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-bold text-purple-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                4. Onboarded
              </span>
              <span className="text-xs font-mono font-bold text-white bg-purple-500/20 px-1.5 py-0.2 rounded border border-purple-500/30">
                {onboardedLeadsCount}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Completed packet & active in fleet roster.</p>
          </div>
        </div>
      </div>

      {/* 5. Live Recent Leads & Fleet Truckers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        <div className="lg:col-span-7 p-4 rounded-2xl bg-[#0A1322] border border-[#1B293E] shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between border-b border-[#1B293E] pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold font-display text-white">Recent Carrier Leads</h3>
                <span className="text-[10px] font-mono text-slate-400">Live Firestore submissions</span>
              </div>
            </div>

            <button
              onClick={() => handleNavigate('/leads')}
              className="text-[11px] font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>View All Leads</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {leads.length === 0 ? (
            <div className="py-10 text-center font-mono space-y-2">
              <Users className="w-8 h-8 mx-auto text-slate-600 opacity-40" />
              <p className="text-xs font-bold text-slate-300 font-sans">No leads received yet</p>
              <p className="text-[10px] text-slate-500 max-w-xs mx-auto font-sans">
                Carrier applications submitted via the website form will stream here in real-time.
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
              {leads.slice(0, 5).map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="p-3 rounded-xl bg-[#08101C] hover:bg-[#111F33] border border-[#1B293E] hover:border-blue-500/30 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-blue-950/60 border border-blue-800/40 text-blue-400 font-bold text-xs flex items-center justify-center shrink-0">
                      {lead.name ? lead.name.slice(0, 2).toUpperCase() : 'LE'}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-white truncate group-hover:text-blue-300 transition-colors">
                          {lead.name}
                        </p>
                        {lead.mcNumber && (
                          <span className="text-[9px] font-mono text-slate-400 bg-[#15253D] px-1.5 py-0.2 rounded border border-[#213552]">
                            {lead.mcNumber}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">
                        {lead.company ? `${lead.company} • ` : ''}{lead.equipment || 'Standard'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0 text-right">
                    <div>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase inline-block ${
                        lead.status === 'new' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        lead.status === 'in_review' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        lead.status === 'contacted' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        lead.status === 'onboarded' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                      <span className="text-[8.5px] font-mono text-slate-500 block mt-0.5">
                        {formatFirestoreDate(lead.createdAt)}
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-2 border-t border-[#1B293E] flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>Showing latest {Math.min(5, leads.length)} of {leads.length} records</span>
            <span className="text-emerald-400 font-bold">Auto-syncing Live</span>
          </div>
        </div>

        {/* Recent Truckers */}
        <div className="lg:col-span-5 p-4 rounded-2xl bg-[#0A1322] border border-[#1B293E] shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between border-b border-[#1B293E] pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Truck className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold font-display text-white">Active Fleet Truckers</h3>
                <span className="text-[10px] font-mono text-slate-400">{activeTruckers} Active in network</span>
              </div>
            </div>

            <button
              onClick={() => handleNavigate('/truckers')}
              className="text-[11px] font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Manage</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {truckers.length === 0 ? (
            <div className="py-10 text-center font-mono space-y-2">
              <Truck className="w-8 h-8 mx-auto text-slate-600 opacity-40" />
              <p className="text-xs font-bold text-slate-300 font-sans">No truckers registered yet</p>
              <p className="text-[10px] text-slate-500 max-w-xs mx-auto font-sans">
                Convert leads to truckers or add new carriers directly from the Truckers module.
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
              {truckers.slice(0, 5).map((trucker) => (
                <div
                  key={trucker.id}
                  onClick={() => setSelectedTrucker(trucker)}
                  className="p-3 rounded-xl bg-[#08101C] hover:bg-[#111F33] border border-[#1B293E] hover:border-amber-500/30 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-amber-950/60 border border-amber-800/40 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                        {trucker.name}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">
                        {trucker.mcNumber || 'MC-Pending'} • {trucker.equipment}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                      trucker.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      trucker.status === 'Pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {trucker.status}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-2 border-t border-[#1B293E] flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>Roster capacity</span>
            <span className="text-amber-400 font-bold">{totalTruckers} Onboarded</span>
          </div>
        </div>
      </div>

      {/* 6. Messages & Enterprise Roadmap */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
        <div className="md:col-span-6 p-4 rounded-2xl bg-[#0A1322] border border-[#1B293E] shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#1B293E] pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold font-display text-white">Recent Inquiries & Messages</h3>
                <span className="text-[10px] font-mono text-slate-400">{unreadMessagesCount} unread inquiries</span>
              </div>
            </div>

            <button
              onClick={() => handleNavigate('/messages')}
              className="text-[11px] font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Inbox</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {messages.length === 0 ? (
            <div className="py-8 text-center font-mono space-y-1">
              <Mail className="w-6 h-6 mx-auto text-slate-600 opacity-40" />
              <p className="text-xs font-bold text-slate-300 font-sans">No messages</p>
              <p className="text-[10px] text-slate-500 font-sans">Contact form inquiries will appear here.</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
              {messages.slice(0, 4).map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleNavigate('/messages')}
                  className="p-2.5 rounded-xl bg-[#08101C] hover:bg-[#111F33] border border-[#1B293E] hover:border-purple-500/30 transition-all cursor-pointer flex items-start gap-2.5"
                >
                  <div className="w-7 h-7 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {msg.name ? msg.name.slice(0, 1).toUpperCase() : 'M'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-white truncate">{msg.name}</p>
                      <span className="text-[8.5px] font-mono text-slate-500">{formatFirestoreDate(msg.createdAt)}</span>
                    </div>
                    <p className="text-[11px] text-blue-300 font-medium truncate">{msg.subject || 'General Inquiry'}</p>
                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-6 p-4 rounded-2xl bg-[#0A1322] border border-[#1B293E] shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#1B293E] pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold font-display text-white">Enterprise Operations Modules</h3>
                <span className="text-[10px] font-mono text-slate-400">Upcoming system integrations</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-blue-950/80 text-blue-400 border border-blue-800/50">
              Roadmap
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-[#08101C] border border-[#1B293E]/80 relative overflow-hidden space-y-1.5 opacity-85">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-blue-400" />
                  <span>Dispatch Automation</span>
                </span>
                <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700">
                  Coming Soon
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Automated rate negotiation, routing optimization, and electronic load tendering.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#08101C] border border-[#1B293E]/80 relative overflow-hidden space-y-1.5 opacity-85">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Live Telematics API</span>
                </span>
                <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700">
                  Coming Soon
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Direct ELD & GPS telemetry sync for fleet tracking and geofence alerts.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#1B293E]">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="font-bold text-slate-300">Daily Operations Checklist</span>
              <span className="font-mono text-[10px] text-blue-400">
                {tasks.filter((t) => t.isCompleted).length}/{tasks.length} Completed
              </span>
            </div>
            <div className="space-y-1">
              {tasks.slice(0, 2).map((t) => (
                <div 
                  key={t.id}
                  onClick={() => handleToggleTask(t.id)}
                  className="flex items-center gap-2 p-1.5 rounded-lg bg-[#08101C] hover:bg-[#111F33] cursor-pointer text-[10.5px] transition-colors"
                >
                  <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                    t.isCompleted ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-600'
                  }`}>
                    {t.isCompleted && <Check className="w-2.5 h-2.5" />}
                  </div>
                  <span className={`truncate ${t.isCompleted ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {t.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Lead View */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in-scale">
          <div className="bg-[#0A1322] border border-[#1B293E] rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1B293E] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-display text-white">{selectedLead.name}</h3>
                  <p className="text-[11px] text-slate-400">{selectedLead.company || 'Independent Owner Operator'} • {selectedLead.phone}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedLead(null)} 
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#08101C] border border-[#1B293E] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Phone</span>
                <a href={`tel:${selectedLead.phone}`} className="text-emerald-400 font-bold hover:underline font-mono">{selectedLead.phone}</a>
              </div>
              <div className="p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Email</span>
                <span className="font-bold text-white truncate block">{selectedLead.email || 'N/A'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Equipment</span>
                <span className="font-bold text-white">{selectedLead.equipment}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">MC Number</span>
                <span className="font-bold text-white">{selectedLead.mcNumber || 'None'}</span>
              </div>
              <div className="col-span-2 p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Preferred Lanes</span>
                <p className="text-slate-300 mt-0.5">{selectedLead.preferredLanes || 'Any national dry freight lanes'}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1B293E]">
              <button
                onClick={() => {
                  setSelectedLead(null);
                  handleNavigate('/leads');
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-900/40 cursor-pointer"
              >
                Open in Leads Page
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-xl bg-[#08101C] hover:bg-[#111F33] text-slate-300 font-bold text-xs border border-[#1B293E] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Trucker View */}
      {selectedTrucker && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in-scale">
          <div className="bg-[#0A1322] border border-[#1B293E] rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1B293E] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-display text-white">{selectedTrucker.name}</h3>
                  <p className="text-[11px] text-slate-400">{selectedTrucker.company} • {selectedTrucker.mcNumber}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTrucker(null)} 
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#08101C] border border-[#1B293E] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Phone</span>
                <a href={`tel:${selectedTrucker.phone}`} className="text-emerald-400 font-bold hover:underline font-mono">{selectedTrucker.phone}</a>
              </div>
              <div className="p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Status</span>
                <span className="font-bold text-white">{selectedTrucker.status}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Equipment</span>
                <span className="font-bold text-white">{selectedTrucker.equipment}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#08101C] border border-[#1B293E]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Location</span>
                <span className="font-bold text-white">{selectedTrucker.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1B293E]">
              <button
                onClick={() => {
                  setSelectedTrucker(null);
                  handleNavigate('/truckers');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md shadow-amber-950/40 cursor-pointer"
              >
                Open in Fleet Roster
              </button>
              <button
                onClick={() => setSelectedTrucker(null)}
                className="px-4 py-2 rounded-xl bg-[#08101C] hover:bg-[#111F33] text-slate-300 font-bold text-xs border border-[#1B293E] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-3 border-t border-[#1B293E] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
        <div>
          <span>DGW Solutions LLC | Enterprise Logistics Command</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            System Online
          </span>
          <span>{currentTime || 'Sep 20, 2026'}</span>
        </div>
      </div>

    </div>
  );
};
