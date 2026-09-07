import React, { useState } from 'react';
import { 
  Truck, 
  Search, 
  MapPin, 
  TrendingUp, 
  FileText, 
  Clock, 
  DollarSign, 
  ArrowRight,
  Eye,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
import { LiveFreightMap } from '../LiveFreightMap';
import { PORTAL_SAMPLE_LOADS, PORTAL_DISPATCH_SCHEDULE } from '../../../data/portalData';

interface DashboardViewProps {
  onSelectLoad: (loadId: string) => void;
  onNavigateView: (view: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectLoad,
  onNavigateView
}) => {
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month'>('week');
  const [filteredState, setFilteredState] = useState<string | null>(null);

  const kpis = [
    { title: 'Active Loads', value: '24', change: '+12%', isPositive: true, icon: Truck, color: 'text-brand-orange', bg: 'bg-orange-50' },
    { title: 'Available Loads', value: '186', change: '+8%', isPositive: true, icon: Search, color: 'text-cyan-700', bg: 'bg-cyan-50' },
    { title: 'In Transit Rolling', value: '18', change: 'Live GPS', isPositive: true, icon: MapPin, color: 'text-emerald-700', bg: 'bg-emerald-50' },
    { title: 'Delivered (M-T-D)', value: '42', change: '98.4% On-Time', isPositive: true, icon: CheckCircle2, color: 'text-purple-700', bg: 'bg-purple-50' },
    { title: 'Pending Documents', value: '7', change: 'Action Req', isPositive: false, icon: FileText, color: 'text-amber-700', bg: 'bg-amber-50' },
    { title: 'Average Target RPM', value: '$2.31', change: '+$0.14 vs mkt', isPositive: true, icon: TrendingUp, color: 'text-brand-orange', bg: 'bg-orange-50' },
    { title: 'Weekly Gross Benchmark', value: '$48,720', change: 'Sample Target', isPositive: true, icon: DollarSign, color: 'text-emerald-700', bg: 'bg-emerald-50' },
  ];

  const displayedLoads = filteredState 
    ? PORTAL_SAMPLE_LOADS.filter(l => l.origin.state === filteredState || l.destination.state === filteredState)
    : PORTAL_SAMPLE_LOADS.slice(0, 6);

  return (
    <div className="space-y-6">
      
      {/* Header & Date Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
            Operations Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Your centralized logistics & dispatch command center • Real-time freight coordination
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-semibold">
          <button
            onClick={() => setTimeFilter('today')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              timeFilter === 'today' ? 'bg-brand-orange text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setTimeFilter('week')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              timeFilter === 'week' ? 'bg-brand-orange text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeFilter('month')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              timeFilter === 'month' ? 'bg-brand-orange text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3.5">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 flex flex-col justify-between hover:border-brand-orange/40 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 truncate">{kpi.title}</span>
              <div className={`p-1.5 rounded-lg ${kpi.bg} ${kpi.color}`}>
                <kpi.icon className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <span className="font-display font-black text-xl text-slate-900">{kpi.value}</span>
              <div className="flex items-center gap-1 mt-0.5 text-[10px] font-mono">
                <span className={kpi.isPositive ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                  {kpi.change}
                </span>
              </div>
            </div>

            {/* Mini Sparkline Simulation */}
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${kpi.isPositive ? 'bg-brand-orange' : 'bg-amber-500'}`} 
                style={{ width: `${60 + (idx * 6)}%` }} 
              />
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 2. LIVE US FREIGHT MAP MODULE                                             */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-orange" />
            <h2 className="text-base font-display font-black text-slate-900">National Corridor Telematics Radar</h2>
            {filteredState && (
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-100 text-brand-orange text-xs font-mono font-bold">
                Filtered by {filteredState}
                <button onClick={() => setFilteredState(null)} className="hover:text-slate-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
          <button
            onClick={() => onNavigateView('routes')}
            className="text-xs text-brand-orange font-bold hover:underline flex items-center gap-1"
          >
            <span>Full Map Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <LiveFreightMap 
          onSelectLoad={onSelectLoad} 
          onSelectState={(stateCode) => setFilteredState(stateCode)}
          heightClass="h-[480px]" 
        />
      </div>

      {/* ========================================================================= */}
      {/* 3. HOURLY DISPATCH SCHEDULE & ACTIVE FREIGHT QUEUE                        */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col (8): Active Dispatched Loads Table */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-black text-slate-900 text-sm">Active Managed Loads</h3>
                {filteredState && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-50 text-brand-orange border border-orange-200 font-bold">
                    {filteredState} State Lanes ({displayedLoads.length})
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500">Live operational loads currently monitored by DGW Dispatch</p>
            </div>

            <button
              onClick={() => onNavigateView('load-board')}
              className="text-xs text-brand-orange font-bold hover:underline"
            >
              View All Loads →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[10px] font-mono text-slate-500 uppercase border-y border-slate-200">
                <tr>
                  <th className="p-2.5">Load ID</th>
                  <th className="p-2.5">Lane</th>
                  <th className="p-2.5">Equipment</th>
                  <th className="p-2.5">Agreed Rate</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedLoads.map((load) => (
                  <tr key={load.id} className="hover:bg-orange-50/40 transition-colors">
                    <td className="p-2.5 font-mono font-bold text-brand-orange">{load.loadNumber}</td>
                    <td className="p-2.5 font-semibold text-slate-900">
                      {load.origin.city}, {load.origin.state} → {load.destination.city}, {load.destination.state}
                    </td>
                    <td className="p-2.5 font-mono text-slate-600">{load.equipment}</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">${load.rate.toLocaleString()} (${load.rpm.toFixed(2)}/mi)</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-800">
                        {load.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-2.5 text-right">
                      <button
                        onClick={() => onSelectLoad(load.id)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-brand-orange hover:text-white text-slate-700 transition-colors"
                        title="Inspect Load"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col (4): Today's Hourly Dispatch Pickups */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-700" />
              <h3 className="font-display font-black text-slate-900 text-sm">Today's Schedule</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-bold">
              EST / CST
            </span>
          </div>

          <div className="space-y-3">
            {PORTAL_DISPATCH_SCHEDULE.slice(0, 4).map((slot, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-brand-orange">{slot.time}</span>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${
                    slot.status === 'LOADED' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-800'
                  }`}>
                    {slot.status}
                  </span>
                </div>
                <p className="font-bold text-slate-900">{slot.truckId} • {slot.carrierName}</p>
                <p className="text-slate-500 text-[11px]">{slot.origin} → {slot.destination}</p>
                <p className="text-[10px] text-slate-400 font-mono italic">✓ {slot.milestone}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigateView('dispatch')}
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            Open Dispatch Timeline →
          </button>
        </div>

      </div>

      {/* Operations Disclaimer Notice */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
        <span>
          <strong>Sample Operational Data:</strong> The statistics, rates, and fleet coordinates shown in this dashboard are illustrative sample operational data demonstrating DGW Solutions LLC’s TMS and telematics architecture.
        </span>
      </div>

    </div>
  );
};
