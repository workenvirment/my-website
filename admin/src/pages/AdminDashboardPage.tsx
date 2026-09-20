import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Building2, 
  FileText, 
  Mail, 
  Package, 
  ArrowUpRight, 
  Phone, 
  MessageSquare, 
  MoreVertical, 
  Maximize2, 
  Check,
  Plus
} from 'lucide-react';
import { operationsStore } from '../services/operationsStore';
import { subscribeToTruckers, subscribeToContactMessages } from '../services/firestoreService';
import type { 
  Trucker, 
  TruckerDoc,
  Broker, 
  Load, 
  MessageThread, 
  OperationTask, 
  SystemNotification,
  ContactMessageDoc
} from '../types/admin';

interface AdminDashboardPageProps {
  onNavigate?: (route: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  // Operational state
  const [truckers, setTruckers] = useState<Trucker[]>([]);
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loads, setLoads] = useState<Load[]>([]);
  const [messageThreads, setMessageThreads] = useState<MessageThread[]>([]);
  const [tasks, setTasks] = useState<OperationTask[]>([]);
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);

  // Chart time range
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '3m' | '1y'>('7d');
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; date: string; loads: number; truckers: number } | null>(null);

  // Selected Trucker for Drawer Profile Modal
  const [selectedTrucker, setSelectedTrucker] = useState<Trucker | null>(null);

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
        }) + '  ' + now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load and sync store data
  useEffect(() => {
    const syncData = () => {
      setTruckers(operationsStore.getTruckers());
      setBrokers(operationsStore.getBrokers());
      setLoads(operationsStore.getLoads());
      setMessageThreads(operationsStore.getMessageThreads());
      setTasks(operationsStore.getTasks());
      setNotifications(operationsStore.getNotifications());
    };

    syncData();
    const unsubStore = operationsStore.subscribe(syncData);

    // Sync real Firestore truckers and messages
    const unsubTruckers = subscribeToTruckers((truckersList: TruckerDoc[]) => {
      operationsStore.syncFirestoreTruckers(truckersList);
    });

    const unsubMessages = subscribeToContactMessages((msgs: ContactMessageDoc[]) => {
      operationsStore.syncFirestoreMessages(msgs);
    });

    return () => {
      unsubStore();
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

  // Computed dynamic metrics
  const totalTruckers = truckers.length;
  const activeTruckers = truckers.filter((t) => t.status === 'Active').length;
  const pendingTruckers = truckers.filter((t) => t.status === 'Pending').length;
  const inactiveTruckers = truckers.filter((t) => t.status === 'Inactive').length;

  const activePct = totalTruckers > 0 ? Math.round((activeTruckers / totalTruckers) * 100) : 0;
  const pendingPct = totalTruckers > 0 ? Math.round((pendingTruckers / totalTruckers) * 100) : 0;
  const inactivePct = totalTruckers > 0 ? Math.max(0, 100 - activePct - pendingPct) : 0;

  const totalBrokers = brokers.length;
  const totalMC = truckers.filter((t) => t.mcNumber && t.mcNumber !== 'MC-Pending').length + 
                  brokers.filter((b) => b.mcNumber).length;
  const unreadMessagesCount = messageThreads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);
  const activeLoadsCount = loads.filter((l) => l.status !== 'Delivered' && l.status !== 'Cancelled').length;

  // Chart datasets depending on range (scaling dynamically with actual loads and truckers)
  const chartDatasets = {
    '7d': [
      { date: 'Sep 14', loads: loads.length, truckers: totalTruckers, x: 30 },
      { date: 'Sep 15', loads: loads.length, truckers: totalTruckers, x: 130 },
      { date: 'Sep 16', loads: loads.length, truckers: totalTruckers, x: 230 },
      { date: 'Sep 17', loads: loads.length, truckers: totalTruckers, x: 330 },
      { date: 'Sep 18', loads: loads.length, truckers: totalTruckers, x: 430 },
      { date: 'Sep 19', loads: loads.length, truckers: totalTruckers, x: 530 },
      { date: 'Sep 20', loads: loads.length, truckers: totalTruckers, x: 630 }
    ],
    '30d': [
      { date: 'Aug 22', loads: loads.length, truckers: totalTruckers, x: 30 },
      { date: 'Aug 29', loads: loads.length, truckers: totalTruckers, x: 130 },
      { date: 'Sep 05', loads: loads.length, truckers: totalTruckers, x: 230 },
      { date: 'Sep 12', loads: loads.length, truckers: totalTruckers, x: 330 },
      { date: 'Sep 19', loads: loads.length, truckers: totalTruckers, x: 430 },
      { date: 'Sep 20', loads: loads.length, truckers: totalTruckers, x: 630 }
    ],
    '3m': [
      { date: 'July', loads: loads.length, truckers: totalTruckers, x: 30 },
      { date: 'August', loads: loads.length, truckers: totalTruckers, x: 230 },
      { date: 'September', loads: loads.length, truckers: totalTruckers, x: 430 },
      { date: 'Current', loads: loads.length, truckers: totalTruckers, x: 630 }
    ],
    '1y': [
      { date: 'Q1', loads: loads.length, truckers: totalTruckers, x: 30 },
      { date: 'Q2', loads: loads.length, truckers: totalTruckers, x: 230 },
      { date: 'Q3', loads: loads.length, truckers: totalTruckers, x: 430 },
      { date: 'Q4', loads: loads.length, truckers: totalTruckers, x: 630 }
    ]
  };

  const activeChartData = chartDatasets[timeRange] || chartDatasets['7d'];
  const hasActivityData = loads.length > 0 || totalTruckers > 0;

  return (
    <div className="space-y-3 pb-6">
      
      {/* ==================================================================== */}
      {/* 1. HERO BANNER (Full width, ~128px height, subtle truck background)   */}
      {/* ==================================================================== */}
      <div className="relative rounded-xl overflow-hidden border border-[#14233D] bg-[#07111F] shadow-lg h-[130px] flex items-center">
        {/* Background Semi-Truck Highway Image with Gradient Shading */}
        <div 
          className="absolute inset-0 bg-cover bg-right bg-no-repeat opacity-60 pointer-events-none"
          style={{ backgroundImage: `url('/hero-semi-truck.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07101E] via-[#07101E]/85 to-transparent pointer-events-none" />

        {/* Hero Content Overlay */}
        <div className="relative z-10 px-5 sm:px-6 w-full flex items-center justify-between">
          <div className="space-y-1 max-w-lg">
            <h1 className="text-[23px] sm:text-[25px] font-display font-bold text-white tracking-tight leading-tight">
              Welcome Back, Admin
            </h1>
            <p className="text-[11.5px] text-slate-300 leading-normal font-normal">
              Manage your network, communicate with truckers, track activity and keep your operations moving.
            </p>
            {/* Subtle blue accent line */}
            <div className="w-12 h-[2.5px] bg-blue-500 rounded-full mt-2" />
          </div>

          <div className="hidden md:block text-right pr-4">
            <div className="space-y-0.5 font-display font-black text-[11px] tracking-wider uppercase">
              <p className="text-white">More Loads</p>
              <p className="text-blue-400">More Miles</p>
              <p className="text-slate-300">More Success</p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. MAIN WORKSPACE GRID (LEFT: 78% / RIGHT: 22%)                     */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        
        {/* ================================================================== */}
        {/* LEFT COLUMN: KPIS, ACTIVITY, MAP, TABLES, STATS (9 Columns / ~78%) */}
        {/* ================================================================== */}
        <div className="lg:col-span-9 space-y-3">
          
          {/* A. Top 5 KPI Cards in ONE Horizontal Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            
            {/* Card 1: Total Truckers (Live Count) */}
            <div 
              onClick={() => handleNavigate('/truckers')}
              className="p-3 rounded-xl bg-[#091322] border border-[#14233D] hover:border-blue-500/40 transition-all cursor-pointer shadow-xs group h-[112px] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <span className={`text-[10.5px] font-mono font-bold flex items-center gap-0.5 ${totalTruckers > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {totalTruckers > 0 ? <><ArrowUpRight className="w-3 h-3" /> Live</> : '0%'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10.5px] font-medium block">Total Truckers</span>
                <span className="text-[21px] font-black text-white font-display leading-tight">{totalTruckers}</span>
              </div>
              <span className="text-[9px] text-slate-500 font-mono block">
                {totalTruckers > 0 ? `${activeTruckers} active in network` : '0 in network'}
              </span>
            </div>

            {/* Card 2: Total Brokers */}
            <div 
              onClick={() => handleNavigate('/brokers')}
              className="p-3 rounded-xl bg-[#091322] border border-[#14233D] hover:border-blue-500/40 transition-all cursor-pointer shadow-xs group h-[112px] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <span className={`text-[10.5px] font-mono font-bold flex items-center gap-0.5 ${totalBrokers > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {totalBrokers > 0 ? <><ArrowUpRight className="w-3 h-3" /> +8%</> : '0%'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10.5px] font-medium block">Total Brokers</span>
                <span className="text-[21px] font-black text-white font-display leading-tight">{totalBrokers}</span>
              </div>
              <span className="text-[9px] text-slate-500 font-mono block">
                {totalBrokers > 0 ? 'Active in network' : '0 registered'}
              </span>
            </div>

            {/* Card 3: Total MC Numbers */}
            <div 
              onClick={() => handleNavigate('/mc-lookup')}
              className="p-3 rounded-xl bg-[#091322] border border-[#14233D] hover:border-blue-500/40 transition-all cursor-pointer shadow-xs group h-[112px] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span className={`text-[10.5px] font-mono font-bold flex items-center gap-0.5 ${totalMC > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {totalMC > 0 ? <><ArrowUpRight className="w-3 h-3" /> +15%</> : '0%'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10.5px] font-medium block">Total MC Numbers</span>
                <span className="text-[21px] font-black text-white font-display leading-tight">{totalMC}</span>
              </div>
              <span className="text-[9px] text-slate-500 font-mono block">
                {totalMC > 0 ? 'Verified in registry' : '0 in database'}
              </span>
            </div>

            {/* Card 4: Unread Messages */}
            <div 
              onClick={() => handleNavigate('/messages')}
              className="p-3 rounded-xl bg-[#091322] border border-[#14233D] hover:border-purple-500/40 transition-all cursor-pointer shadow-xs group h-[112px] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className={`text-[10.5px] font-mono font-bold flex items-center gap-0.5 ${unreadMessagesCount > 0 ? 'text-red-400' : 'text-slate-500'}`}>
                  {unreadMessagesCount > 0 ? <><ArrowUpRight className="w-3 h-3" /> {unreadMessagesCount}</> : '0'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10.5px] font-medium block">Unread Messages</span>
                <span className="text-[21px] font-black text-white font-display leading-tight">{unreadMessagesCount}</span>
              </div>
              <span className="text-[9px] text-slate-500 font-mono block">
                {unreadMessagesCount > 0 ? 'Requires attention' : 'All caught up'}
              </span>
            </div>

            {/* Card 5: Active Loads */}
            <div 
              onClick={() => handleNavigate('/loads')}
              className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-[#091322] border border-[#14233D] hover:border-blue-500/40 transition-all cursor-pointer shadow-xs group h-[112px] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <Package className="w-3.5 h-3.5" />
                </div>
                <span className={`text-[10.5px] font-mono font-bold flex items-center gap-0.5 ${activeLoadsCount > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {activeLoadsCount > 0 ? <><ArrowUpRight className="w-3 h-3" /> +11%</> : '0%'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10.5px] font-medium block">Active Loads</span>
                <span className="text-[21px] font-black text-white font-display leading-tight">{activeLoadsCount}</span>
              </div>
              <span className="text-[9px] text-slate-500 font-mono block">
                {activeLoadsCount > 0 ? 'Open & assigned' : '0 posted'}
              </span>
            </div>

          </div>

          {/* B. Operational Row 1: Trucking Activity Overview Chart & Active Truckers Location Map */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
            
            {/* Trucking Activity Overview Chart (approx 58% width / 7 cols) */}
            <div className="md:col-span-7 p-3.5 rounded-xl bg-[#091322] border border-[#14233D] shadow-xs flex flex-col justify-between">
              
              {/* Chart Header */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-[13px] font-bold font-display text-white">
                    Trucking Activity Overview
                  </h3>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Loads ({loads.length})
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Truckers ({totalTruckers})
                    </span>
                  </div>
                </div>

                {/* Time Range Pills */}
                <div className="flex items-center p-0.5 rounded-md bg-[#060D18] border border-[#14233D] text-[9.5px] font-mono">
                  {(['7d', '30d', '3m', '1y'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeRange(t)}
                      className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                        timeRange === t ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {t === '7d' ? '7 Days' : t === '30d' ? '30 Days' : t === '3m' ? '3 Months' : '1 Year'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive SVG Dual Curve Chart */}
              <div className="relative h-44 w-full mt-1 select-none flex items-center justify-center">
                <svg viewBox="0 0 650 190" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="loadsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.30" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="truckersGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.20" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  {[35, 70, 105, 140, 175].map((y) => (
                    <line key={y} x1="30" y1={y} x2="640" y2={y} stroke="#14233D" strokeDasharray="2 2" strokeWidth="1" />
                  ))}

                  {/* Y-axis Labels */}
                  <text x="5" y="40" fill="#64748B" fontSize="9" fontFamily="monospace">500</text>
                  <text x="5" y="75" fill="#64748B" fontSize="9" fontFamily="monospace">400</text>
                  <text x="5" y="110" fill="#64748B" fontSize="9" fontFamily="monospace">300</text>
                  <text x="5" y="145" fill="#64748B" fontSize="9" fontFamily="monospace">200</text>
                  <text x="5" y="178" fill="#64748B" fontSize="9" fontFamily="monospace">0</text>

                  {/* Baseline / Active Curves */}
                  {hasActivityData ? (
                    <>
                      <path
                        d={`M 30 175 L 30 ${175 - activeChartData[0].loads * 0.35} Q 130 ${175 - activeChartData[1].loads * 0.35}, 230 ${175 - activeChartData[2].loads * 0.35} T 430 ${175 - (activeChartData[4]?.loads || 0) * 0.35} T 630 ${175 - activeChartData[activeChartData.length - 1].loads * 0.35} L 630 175 Z`}
                        fill="url(#loadsGradient)"
                      />
                      <path
                        d={`M 30 ${175 - activeChartData[0].loads * 0.35} Q 130 ${175 - activeChartData[1].loads * 0.35}, 230 ${175 - activeChartData[2].loads * 0.35} T 430 ${175 - (activeChartData[4]?.loads || 0) * 0.35} T 630 ${175 - activeChartData[activeChartData.length - 1].loads * 0.35}`}
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d={`M 30 ${175 - activeChartData[0].truckers * 0.35} Q 130 ${175 - activeChartData[1].truckers * 0.35}, 230 ${175 - activeChartData[2].truckers * 0.35} T 430 ${175 - (activeChartData[4]?.truckers || 0) * 0.35} T 630 ${175 - activeChartData[activeChartData.length - 1].truckers * 0.35}`}
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </>
                  ) : (
                    <line x1="30" y1="175" x2="630" y2="175" stroke="#1E3A8A" strokeWidth="2" strokeDasharray="4 4" />
                  )}

                  {/* Data Points */}
                  {activeChartData.map((pt, idx) => (
                    <g key={idx} className="cursor-pointer" onClick={() => setHoveredPoint({ x: pt.x, y: 175 - pt.loads * 0.35, date: pt.date, loads: pt.loads, truckers: pt.truckers })}>
                      <circle cx={pt.x} cy={175 - pt.loads * 0.35} r="3" fill="#3B82F6" stroke="#07111F" strokeWidth="1.5" />
                      <circle cx={pt.x} cy={175 - pt.truckers * 0.35} r="2.5" fill="#10B981" stroke="#07111F" strokeWidth="1.5" />
                      {/* X-axis label */}
                      <text x={pt.x - 14} y="188" fill="#64748B" fontSize="8.5" fontFamily="monospace">{pt.date}</text>
                    </g>
                  ))}
                </svg>

                {!hasActivityData && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-[#060D18]/90 border border-[#14233D] text-[10px] font-mono text-slate-400">
                      Awaiting operational activity to generate trend charts
                    </span>
                  </div>
                )}

                {/* Tooltip Card */}
                {hoveredPoint && (
                  <div 
                    className="absolute p-2 rounded-lg bg-[#060D18] border border-[#14233D] shadow-xl text-[10px] font-mono pointer-events-none z-10 transition-all duration-150"
                    style={{ left: `${Math.min(hoveredPoint.x * 0.75, 340)}px`, top: '10px' }}
                  >
                    <p className="text-slate-400 font-bold border-b border-[#14233D] pb-0.5 mb-1">{hoveredPoint.date}</p>
                    <div className="flex items-center justify-between gap-3 text-blue-400">
                      <span>● Loads</span>
                      <strong className="text-white">{hoveredPoint.loads}</strong>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-emerald-400 mt-0.5">
                      <span>● Truckers</span>
                      <strong className="text-white">{hoveredPoint.truckers}</strong>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Active Truckers Location US Map (approx 42% width / 5 cols) */}
            <div className="md:col-span-5 p-3.5 rounded-xl bg-[#091322] border border-[#14233D] shadow-xs flex flex-col justify-between relative">
              
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-[13px] font-bold font-display text-white">Active Truckers Location</h3>
                <div className="flex items-center gap-1.5">
                  <span className={`px-1.5 py-0.2 rounded-full border text-[9.5px] font-mono font-bold flex items-center gap-1 ${
                    activeTruckers > 0 
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
                      : 'bg-slate-800/40 text-slate-400 border-slate-700/40'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${activeTruckers > 0 ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                    {activeTruckers > 0 ? 'Live' : 'Standby'}
                  </span>
                  <button className="text-slate-500 hover:text-white transition-colors" title="Expand Map">
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Dark US Map Vector */}
              <div className="relative h-36 w-full flex items-center justify-center my-0.5">
                <svg viewBox="0 0 300 160" className="w-full h-full opacity-65">
                  {/* Stylized US Outline Path */}
                  <path
                    d="M 20 38 L 40 28 L 70 30 L 110 24 L 170 28 L 220 32 L 260 24 L 280 42 L 270 65 L 250 85 L 260 115 L 220 135 L 190 120 L 160 148 L 120 138 L 90 134 L 40 115 L 20 75 Z"
                    fill="#0A1526"
                    stroke="#14233D"
                    strokeWidth="1.2"
                  />
                  {/* Subtle state gridlines */}
                  <path d="M 70 30 L 90 134 M 170 28 L 160 148 M 40 75 L 260 65 M 110 85 L 220 85" stroke="#14233D" strokeWidth="0.7" strokeDasharray="2 2" fill="none" />
                </svg>

                {totalTruckers > 0 ? (
                  <>
                    <div className="absolute top-9 left-11 group cursor-pointer" title="Active Carrier - Chicago, IL">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 block animate-ping absolute" />
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-400 border border-[#07111F] block relative shadow-sm shadow-blue-500" />
                    </div>
                    <div className="absolute top-15 left-26 group cursor-pointer" title="Active Carrier - Atlanta, GA">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block animate-ping absolute" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#07111F] block relative shadow-sm shadow-emerald-500" />
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-[#060D18]/90 border border-[#14233D] text-[10px] font-mono text-slate-400">
                      0 GPS units currently active
                    </span>
                  </div>
                )}
              </div>

              {/* Status Breakdown Bottom Counts */}
              <div className="grid grid-cols-4 gap-1 pt-1.5 border-t border-[#14233D] text-center text-[9.5px] font-mono">
                <div className="p-1 rounded bg-[#060D18] border border-[#14233D]">
                  <span className="text-emerald-400 font-bold block">{activeTruckers}</span>
                  <span className="text-slate-400 text-[8.5px]">On Route</span>
                </div>
                <div className="p-1 rounded bg-[#060D18] border border-[#14233D]">
                  <span className="text-blue-400 font-bold block">0</span>
                  <span className="text-slate-400 text-[8.5px]">At Pickup</span>
                </div>
                <div className="p-1 rounded bg-[#060D18] border border-[#14233D]">
                  <span className="text-amber-400 font-bold block">0</span>
                  <span className="text-slate-400 text-[8.5px]">At Dropoff</span>
                </div>
                <div className="p-1 rounded bg-[#060D18] border border-[#14233D]">
                  <span className="text-red-400 font-bold block">{inactiveTruckers}</span>
                  <span className="text-slate-400 text-[8.5px]">Offline</span>
                </div>
              </div>

            </div>

          </div>

          {/* C. Operational Row 2: Recent Truckers Table & Recent Loads Table */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
            
            {/* Recent Truckers Table (7 cols) */}
            <div className="md:col-span-7 p-3.5 rounded-xl bg-[#091322] border border-[#14233D] shadow-xs">
              <div className="flex items-center justify-between mb-2 border-b border-[#14233D] pb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-[13px] font-bold font-display text-white">Recent Truckers</h3>
                  <span className="px-1.5 py-0.2 rounded bg-blue-500/15 text-blue-400 text-[9.5px] font-mono font-bold">
                    {totalTruckers}
                  </span>
                </div>
                <button
                  onClick={() => handleNavigate('/truckers')}
                  className="text-[11px] text-blue-400 hover:text-blue-300 font-bold cursor-pointer transition-colors"
                >
                  View All
                </button>
              </div>

              {truckers.length === 0 ? (
                <div className="py-7 text-center font-mono">
                  <div className="w-8 h-8 rounded-lg bg-[#060D18] border border-[#14233D] text-slate-500 flex items-center justify-center mx-auto mb-1.5">
                    <Truck className="w-4 h-4 opacity-50" />
                  </div>
                  <p className="text-[12px] font-sans font-bold text-slate-300">0 Truckers registered</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-mono">Onboarded fleet carriers will appear here in real time.</p>
                  <button
                    onClick={() => handleNavigate('/truckers')}
                    className="mt-2.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] cursor-pointer inline-flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Trucker
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="text-slate-500 font-mono text-[9.5px] uppercase border-b border-[#14233D]">
                        <th className="pb-1.5 font-bold">Name</th>
                        <th className="pb-1.5 font-bold">Phone</th>
                        <th className="pb-1.5 font-bold">MC Number</th>
                        <th className="pb-1.5 font-bold">Status</th>
                        <th className="pb-1.5 font-bold">Last Active</th>
                        <th className="pb-1.5 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#14233D]/50 font-mono text-[10.5px]">
                      {truckers.slice(0, 5).map((t) => (
                        <tr 
                          key={t.id} 
                          className="hover:bg-[#0E1A2E] transition-colors cursor-pointer group"
                          onClick={() => setSelectedTrucker(t)}
                        >
                          <td className="py-1.5 pr-2 font-sans font-bold text-white flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded bg-blue-600/15 text-blue-400 flex items-center justify-center text-[9px] shrink-0">
                              <Truck className="w-3 h-3" />
                            </div>
                            <span className="truncate max-w-[95px]">{t.name}</span>
                          </td>
                          <td className="py-1.5 px-1.5 text-slate-400">{t.phone}</td>
                          <td className="py-1.5 px-1.5 text-blue-400/90 font-bold">{t.mcNumber}</td>
                          <td className="py-1.5 px-1.5">
                            <span className={`px-1.5 py-0.2 rounded-full text-[8.5px] font-bold ${
                              t.status === 'Active'
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : t.status === 'Pending'
                                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                                  : 'bg-red-500/15 text-red-400 border border-red-500/30'
                            }`}>
                              {t.status}
                            </span>
                          </td>
                          <td className="py-1.5 px-1.5 text-slate-500">{t.lastActive}</td>
                          <td className="py-1.5 pl-1.5 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1 text-slate-400">
                              <button 
                                onClick={() => handleNavigate('/messages')} 
                                className="p-0.5 hover:text-blue-400 cursor-pointer"
                                title="Message"
                              >
                                <MessageSquare className="w-3 h-3" />
                              </button>
                              <a 
                                href={`tel:${t.phone}`} 
                                className="p-0.5 hover:text-emerald-400"
                                title="Call"
                              >
                                <Phone className="w-3 h-3" />
                              </a>
                              <button 
                                onClick={() => setSelectedTrucker(t)}
                                className="p-0.5 hover:text-white cursor-pointer"
                                title="Details"
                              >
                                <MoreVertical className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Recent Loads Table (5 cols) */}
            <div className="md:col-span-5 p-3.5 rounded-xl bg-[#091322] border border-[#14233D] shadow-xs">
              <div className="flex items-center justify-between mb-2 border-b border-[#14233D] pb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-[13px] font-bold font-display text-white">Recent Loads</h3>
                  <span className="px-1.5 py-0.2 rounded bg-blue-500/15 text-blue-400 text-[9.5px] font-mono font-bold">
                    {loads.length}
                  </span>
                </div>
                <button
                  onClick={() => handleNavigate('/loads')}
                  className="text-[11px] text-blue-400 hover:text-blue-300 font-bold cursor-pointer transition-colors"
                >
                  View All
                </button>
              </div>

              {loads.length === 0 ? (
                <div className="py-7 text-center font-mono">
                  <div className="w-8 h-8 rounded-lg bg-[#060D18] border border-[#14233D] text-slate-500 flex items-center justify-center mx-auto mb-1.5">
                    <Package className="w-4 h-4 opacity-50" />
                  </div>
                  <p className="text-[12px] font-sans font-bold text-slate-300">No loads posted yet</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-mono">Freight loads created by dispatch will appear here.</p>
                  <button
                    onClick={() => handleNavigate('/loads')}
                    className="mt-2.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] cursor-pointer inline-flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Post Load
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse font-mono text-[10.5px]">
                    <thead>
                      <tr className="text-slate-500 text-[9.5px] uppercase border-b border-[#14233D]">
                        <th className="pb-1.5 font-bold">Load #</th>
                        <th className="pb-1.5 font-bold">From → To</th>
                        <th className="pb-1.5 font-bold">Rate</th>
                        <th className="pb-1.5 font-bold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#14233D]/50">
                      {loads.slice(0, 5).map((l) => (
                        <tr 
                          key={l.id} 
                          onClick={() => handleNavigate('/loads')}
                          className="hover:bg-[#0E1A2E] transition-colors cursor-pointer"
                        >
                          <td className="py-1.5 pr-1.5 font-bold text-blue-400">{l.loadNumber}</td>
                          <td className="py-1.5 px-1.5 text-slate-300 truncate max-w-[110px] font-sans text-[10.5px]" title={`${l.origin} → ${l.destination}`}>
                            {l.origin.split(',')[0]} → {l.destination.split(',')[0]}
                          </td>
                          <td className="py-1.5 px-1.5 font-bold text-white">${l.rate.toLocaleString()}</td>
                          <td className="py-1.5 pl-1.5 text-right">
                            <span className={`px-1.5 py-0.2 rounded-full text-[8.5px] font-bold ${
                              l.status === 'Assigned'
                                ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                                : l.status === 'Open'
                                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                  : l.status === 'In Transit'
                                    ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                                    : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                            }`}>
                              {l.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>

          {/* D. Operational Row 3: Recent Brokers Table & Quick Stats Donut / Growth */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
            
            {/* Recent Brokers (7 cols) */}
            <div className="md:col-span-7 p-3.5 rounded-xl bg-[#091322] border border-[#14233D] shadow-xs">
              <div className="flex items-center justify-between mb-2 border-b border-[#14233D] pb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-[13px] font-bold font-display text-white">Recent Brokers</h3>
                  <span className="px-1.5 py-0.2 rounded bg-blue-500/15 text-blue-400 text-[9.5px] font-mono font-bold">
                    {totalBrokers}
                  </span>
                </div>
                <button
                  onClick={() => handleNavigate('/brokers')}
                  className="text-[11px] text-blue-400 hover:text-blue-300 font-bold cursor-pointer transition-colors"
                >
                  View All
                </button>
              </div>

              {brokers.length === 0 ? (
                <div className="py-7 text-center font-mono">
                  <div className="w-8 h-8 rounded-lg bg-[#060D18] border border-[#14233D] text-slate-500 flex items-center justify-center mx-auto mb-1.5">
                    <Building2 className="w-4 h-4 opacity-50" />
                  </div>
                  <p className="text-[12px] font-sans font-bold text-slate-300">0 Brokers registered</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-mono">Shippers and freight broker accounts will appear here.</p>
                  <button
                    onClick={() => handleNavigate('/brokers')}
                    className="mt-2.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] cursor-pointer inline-flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Broker
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="text-slate-500 font-mono text-[9.5px] uppercase border-b border-[#14233D]">
                        <th className="pb-1.5 font-bold">Company Name</th>
                        <th className="pb-1.5 font-bold">Contact</th>
                        <th className="pb-1.5 font-bold">Phone</th>
                        <th className="pb-1.5 font-bold">Status</th>
                        <th className="pb-1.5 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#14233D]/50 font-mono text-[10.5px]">
                      {brokers.slice(0, 5).map((b) => (
                        <tr 
                          key={b.id} 
                          onClick={() => handleNavigate('/brokers')}
                          className="hover:bg-[#0E1A2E] transition-colors cursor-pointer"
                        >
                          <td className="py-1.5 pr-2 font-sans font-bold text-white flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded bg-blue-500/10 text-blue-400 flex items-center justify-center text-[9px] font-mono font-bold shrink-0">
                              {b.avatarInitial || 'BR'}
                            </div>
                            <span className="truncate max-w-[110px]">{b.companyName}</span>
                          </td>
                          <td className="py-1.5 px-1.5 text-slate-300 font-sans">{b.contact}</td>
                          <td className="py-1.5 px-1.5 text-slate-400">{b.phone}</td>
                          <td className="py-1.5 px-1.5">
                            <span className={`px-1.5 py-0.2 rounded-full text-[8.5px] font-bold ${
                              b.status === 'Active'
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : b.status === 'Pending'
                                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                                  : 'bg-red-500/15 text-red-400 border border-red-500/30'
                            }`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="py-1.5 pl-1.5 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1 text-slate-400">
                              <button 
                                onClick={() => handleNavigate('/messages')} 
                                className="p-0.5 hover:text-blue-400 cursor-pointer"
                                title="Message"
                              >
                                <MessageSquare className="w-3 h-3" />
                              </button>
                              <a 
                                href={`tel:${b.phone}`} 
                                className="p-0.5 hover:text-emerald-400"
                                title="Call"
                              >
                                <Phone className="w-3 h-3" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quick Stats Panel (Donut Chart & Business Growth Bar Chart) (5 cols) */}
            <div className="md:col-span-5 p-3.5 rounded-xl bg-[#091322] border border-[#14233D] shadow-xs flex flex-col justify-between">
              
              <div className="flex items-center justify-between mb-2 border-b border-[#14233D] pb-2">
                <h3 className="text-[13px] font-bold font-display text-white">Quick Stats</h3>
                <span className="text-[9.5px] font-mono text-slate-500">Live Network</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 items-center">
                
                {/* Donut Chart */}
                <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#060D18] border border-[#14233D]">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      {/* Background circle */}
                      <path
                        className="text-[#14233D]"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      {totalTruckers > 0 && (
                        <>
                          {/* Active arc */}
                          <path
                            className="text-emerald-400"
                            strokeDasharray={`${activePct}, 100`}
                            strokeWidth="3.8"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          {/* Pending arc */}
                          {pendingPct > 0 && (
                            <path
                              className="text-amber-400"
                              strokeDasharray={`${pendingPct}, 100`}
                              strokeDashoffset={`-${activePct}`}
                              strokeWidth="3.8"
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                          )}
                          {/* Inactive arc */}
                          {inactivePct > 0 && (
                            <path
                              className="text-red-400"
                              strokeDasharray={`${inactivePct}, 100`}
                              strokeDashoffset={`-${activePct + pendingPct}`}
                              strokeWidth="3.8"
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                          )}
                        </>
                      )}
                    </svg>

                    <div className="absolute text-center">
                      <span className="text-[8px] text-slate-500 font-mono block">Total</span>
                      <strong className="text-[13px] font-black text-white font-display leading-none">{totalTruckers}</strong>
                      <span className="text-[7.5px] text-slate-400 block mt-0.5">Truckers</span>
                    </div>
                  </div>

                  <div className="w-full space-y-0.5 mt-1.5 text-[9px] font-mono">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Active</span>
                      <span className="font-bold">{activeTruckers} ({activePct}%)</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Pending</span>
                      <span className="font-bold">{pendingTruckers} ({pendingPct}%)</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Inactive</span>
                      <span className="font-bold">{inactiveTruckers} ({inactivePct}%)</span>
                    </div>
                  </div>
                </div>

                {/* Business Growth Bar Chart */}
                <div className="p-2.5 rounded-lg bg-[#060D18] border border-[#14233D] flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[10.5px] font-bold text-white block">Business Growth</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-[15px] font-black text-emerald-400 font-display">
                        {loads.length > 0 ? '+24%' : '0%'}
                      </span>
                    </div>
                    <span className="text-[8.5px] text-slate-500 block">
                      {loads.length > 0 ? 'Compared to last month' : 'Awaiting billing cycle'}
                    </span>
                  </div>

                  {/* Monthly Vertical Bars */}
                  <div className="flex items-end justify-between gap-1 h-16 pt-1.5 border-b border-[#14233D] text-[8.5px] font-mono text-slate-500">
                    {[
                      { m: 'Apr', h: loads.length > 0 ? '35%' : '8%' },
                      { m: 'May', h: loads.length > 0 ? '50%' : '8%' },
                      { m: 'Jun', h: loads.length > 0 ? '65%' : '8%' },
                      { m: 'Jul', h: loads.length > 0 ? '75%' : '8%' },
                      { m: 'Aug', h: loads.length > 0 ? '88%' : '8%' },
                      { m: 'Sep', h: loads.length > 0 ? '100%' : '8%' }
                    ].map((b) => (
                      <div key={b.m} className="flex flex-col items-center gap-1 flex-1">
                        <div className="w-full bg-[#0A1526] rounded-t-xs h-12 flex items-end">
                          <div 
                            className={`w-full rounded-t-xs transition-all ${loads.length > 0 ? 'bg-blue-500 hover:bg-blue-400' : 'bg-slate-800'}`}
                            style={{ height: b.h }}
                          />
                        </div>
                        <span>{b.m}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ================================================================== */}
        {/* RIGHT COLUMN: MESSAGES, ACTIONS, NOTIFICATIONS (3 Columns / ~22%)  */}
        {/* ================================================================== */}
        <div className="lg:col-span-3 space-y-3">
          
          {/* Panel 1: Recent Messages */}
          <div className="p-3.5 rounded-xl bg-[#091322] border border-[#14233D] shadow-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-[#14233D] pb-2">
              <div className="flex items-center gap-1.5">
                <h3 className="text-[13px] font-bold font-display text-white">Recent Messages</h3>
                <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[9.5px] font-mono font-bold">
                  {messageThreads.length}
                </span>
              </div>
              <button
                onClick={() => handleNavigate('/messages')}
                className="text-[11px] text-blue-400 hover:text-blue-300 font-bold cursor-pointer transition-colors"
              >
                View All
              </button>
            </div>

            {messageThreads.length === 0 ? (
              <div className="py-6 text-center font-mono">
                <Mail className="w-4 h-4 mx-auto mb-1.5 text-slate-600 opacity-50" />
                <p className="text-[11px] font-sans font-bold text-slate-300">No recent messages</p>
                <p className="text-[9.5px] text-slate-500 mt-0.5">Inquiries from the website will appear here in real time.</p>
              </div>
            ) : (
              <div className="space-y-1.5">
                {messageThreads.slice(0, 5).map((thread) => (
                  <div
                    key={thread.id}
                    onClick={() => handleNavigate('/messages')}
                    className="p-2 rounded-lg bg-[#060D18] hover:bg-[#0E1A2E] border border-[#14233D] transition-all cursor-pointer flex items-center justify-between gap-2.5 group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold flex items-center justify-center text-[10.5px] shrink-0 font-mono">
                        {thread.contactAvatar}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-white truncate group-hover:text-blue-300 transition-colors">
                          {thread.contactName}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate leading-tight mt-0.5">
                          {thread.lastMessage}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[9px] font-mono text-slate-500 block">
                        {thread.lastMessageTime}
                      </span>
                      {thread.unreadCount > 0 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block mt-0.5" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => handleNavigate('/messages')}
              className="w-full py-1.5 text-center text-[11px] font-bold text-blue-400 hover:text-blue-300 block pt-0.5 cursor-pointer"
            >
              View All Messages →
            </button>
          </div>

          {/* Panel 2: Upcoming Actions */}
          <div className="p-3.5 rounded-xl bg-[#091322] border border-[#14233D] shadow-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-[#14233D] pb-2">
              <h3 className="text-[13px] font-bold font-display text-white">Upcoming Actions</h3>
              <button
                onClick={() => {
                  const title = prompt('Enter new task title:');
                  if (title) {
                    operationsStore.addTask(title, 'Due today', 'High', 'general');
                  }
                }}
                className="text-[11px] text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </button>
            </div>

            {tasks.length === 0 ? (
              <div className="py-6 text-center font-mono">
                <Check className="w-4 h-4 mx-auto mb-1.5 text-slate-600 opacity-50" />
                <p className="text-[11px] font-sans font-bold text-slate-300">No pending tasks</p>
                <p className="text-[9.5px] text-slate-500 mt-0.5">Add operational reminders or task assignments.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {tasks.slice(0, 4).map((task, idx) => {
                  const iconColor = 
                    idx === 0 ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' :
                    idx === 1 ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                    idx === 2 ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                    'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';

                  return (
                    <div
                      key={task.id}
                      className={`p-2 rounded-lg border transition-all flex items-center gap-2.5 ${
                        task.isCompleted 
                          ? 'bg-[#060D18]/50 border-[#14233D]/50 opacity-60' 
                          : 'bg-[#060D18] border-[#14233D] hover:border-blue-500/30'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 text-[10px] font-bold ${iconColor}`}>
                        {idx === 0 ? <Mail className="w-3 h-3" /> :
                         idx === 1 ? <Phone className="w-3 h-3" /> :
                         idx === 2 ? <Package className="w-3 h-3" /> :
                         <FileText className="w-3 h-3" />}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className={`text-[11px] font-semibold truncate ${task.isCompleted ? 'line-through text-slate-500' : 'text-white'}`}>
                          {task.title}
                        </p>
                        <span className="text-[9px] font-mono text-slate-400 block mt-0.5">
                          {task.dueTime}
                        </span>
                      </div>

                      <button
                        onClick={() => handleToggleTask(task.id)}
                        className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                          task.isCompleted ? 'bg-blue-600 border-blue-600 text-white' : 'border-[#14233D] hover:border-blue-400 text-transparent'
                        }`}
                        title={task.isCompleted ? 'Mark incomplete' : 'Mark completed'}
                      >
                        <Check className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Panel 3: System Notifications */}
          <div className="p-3.5 rounded-xl bg-[#091322] border border-[#14233D] shadow-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-[#14233D] pb-2">
              <h3 className="text-[13px] font-bold font-display text-white">System Notifications</h3>
              <button
                onClick={() => handleNavigate('/settings')}
                className="text-[11px] text-blue-400 hover:text-blue-300 font-bold cursor-pointer transition-colors"
              >
                View All
              </button>
            </div>

            {notifications.length === 0 ? (
              <div className="py-6 text-center font-mono">
                <FileText className="w-4 h-4 mx-auto mb-1.5 text-slate-600 opacity-50" />
                <p className="text-[11px] font-sans font-bold text-slate-300">No notifications</p>
                <p className="text-[9.5px] text-slate-500 mt-0.5">System and account alerts will be logged here.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {notifications.slice(0, 4).map((n, idx) => {
                  const badgeColor =
                    idx === 0 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                    idx === 1 ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' :
                    idx === 2 ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                    'bg-purple-500/20 text-purple-400 border-purple-500/30';

                  return (
                    <div
                      key={n.id}
                      onClick={() => n.routeLink && handleNavigate(n.routeLink)}
                      className="p-2 rounded-lg bg-[#060D18] hover:bg-[#0E1A2E] border border-[#14233D] transition-all cursor-pointer flex items-start gap-2.5"
                    >
                      <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 text-[10px] mt-0.5 ${badgeColor}`}>
                        {idx === 0 ? <Truck className="w-3 h-3" /> :
                         idx === 1 ? <Mail className="w-3 h-3" /> :
                         idx === 2 ? <FileText className="w-3 h-3" /> :
                         <Plus className="w-3 h-3" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1.5">
                          <p className="text-[11px] font-bold text-white leading-tight truncate">{n.title}</p>
                          <span className="text-[8.5px] font-mono text-slate-500 shrink-0">{n.timeAgo}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-tight line-clamp-2 mt-0.5">{n.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* ==================================================================== */}
      {/* 3. FOOTER STATUS BAR                                                 */}
      {/* ==================================================================== */}
      <div className="pt-2.5 border-t border-[#14233D] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
        <div>
          <span>DGW Solutions LLC | Dispatching Global World</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            System Online
          </span>
          <span>{currentTime || 'Sep 20, 2026, 10:42 AM'}</span>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* TRUCKER PROFILE MODAL / DRAWER                                       */}
      {/* ==================================================================== */}
      {selectedTrucker && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#091322] border border-[#14233D] rounded-xl max-w-lg w-full p-5 space-y-3.5 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#14233D] pb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-display text-white">{selectedTrucker.name}</h3>
                  <p className="text-[11px] text-slate-400">{selectedTrucker.company} • {selectedTrucker.mcNumber}</p>
                </div>
              </div>
              <button onClick={() => setSelectedTrucker(null)} className="p-1 rounded text-slate-400 hover:text-white cursor-pointer">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#060D18] border border-[#14233D]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Phone</span>
                <a href={`tel:${selectedTrucker.phone}`} className="text-emerald-400 font-bold hover:underline font-mono">{selectedTrucker.phone}</a>
              </div>
              <div className="p-2.5 rounded-lg bg-[#060D18] border border-[#14233D]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Status</span>
                <span className="font-bold text-white">{selectedTrucker.status}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#060D18] border border-[#14233D]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Equipment</span>
                <span className="font-bold text-white">{selectedTrucker.equipment}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#060D18] border border-[#14233D]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Location</span>
                <span className="font-bold text-white">{selectedTrucker.location}</span>
              </div>
              <div className="col-span-2 p-2.5 rounded-lg bg-[#060D18] border border-[#14233D]">
                <span className="text-slate-500 text-[9px] font-mono uppercase block">Dispatch Notes</span>
                <p className="text-slate-300 mt-0.5">{selectedTrucker.notes || 'No dispatch notes recorded.'}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#14233D]">
              <button
                onClick={() => {
                  setSelectedTrucker(null);
                  handleNavigate('/messages');
                }}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm shadow-blue-900/30 cursor-pointer"
              >
                Send Message
              </button>
              <button
                onClick={() => setSelectedTrucker(null)}
                className="px-3.5 py-1.5 rounded-lg bg-[#0E1A2E] hover:bg-[#142542] text-slate-300 font-bold text-xs border border-[#14233D] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
