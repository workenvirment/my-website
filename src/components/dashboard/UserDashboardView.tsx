import React from 'react';
import { 
  Truck, 
  Search, 
  ShieldCheck, 
  DollarSign, 
  FileText, 
  ArrowRight, 
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { LiveLogisticsMap } from '../map/LiveLogisticsMap';

interface UserDashboardViewProps {
  onNavigatePath?: (path: string) => void;
}

export const UserDashboardView: React.FC<UserDashboardViewProps> = ({ 
  onNavigatePath 
}) => {
  const { user, switchRole } = useAuth();

  return (
    <div className="space-y-8 text-white">
      
      {/* Welcome & Role Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/30 text-xs font-mono font-bold uppercase">
              {user?.role.toUpperCase()} COMMAND PORTAL
            </span>
            <span className="text-xs text-slate-400 font-mono">Status: ACTIVE</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
            Welcome, {user?.name || 'Logistics Operator'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            {user?.companyName} • Denver HQ Operations Gateway (EIN 42-4868007)
          </p>
        </div>

        {/* Quick Role Switcher Buttons */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            SWITCH DASHBOARD PERSONA:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { role: 'carrier', label: 'Carrier Fleet' },
              { role: 'owner-operator', label: 'Owner-Op' },
              { role: 'broker', label: 'Broker Hub' },
              { role: 'admin', label: 'Admin Panel' }
            ].map((r) => (
              <button
                key={r.role}
                onClick={() => switchRole(r.role as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  user?.role === r.role
                    ? 'bg-brand-orange text-white shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Animated KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-3xl bg-slate-900 border border-white/10 space-y-2 hover:border-brand-orange/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">ACTIVE IN-TRANSIT FLEETS</span>
            <div className="p-2 rounded-xl bg-brand-orange/20 text-brand-orange">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-black text-white">186</span>
            <span className="text-xs font-mono text-emerald-400 font-bold">+12 Today</span>
          </div>
          <p className="text-[11px] text-slate-400">Across 48 Continental US States</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-white/10 space-y-2 hover:border-brand-orange/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">SPOT MARKET RPM INDEX</span>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-black text-white">$2.84</span>
            <span className="text-xs font-mono text-emerald-400 font-bold">+4.2%</span>
          </div>
          <p className="text-[11px] text-slate-400">National 7-Day Running Rate</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-white/10 space-y-2 hover:border-brand-orange/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">FMCSA MC VERIFIED</span>
            <div className="p-2 rounded-xl bg-blue-500/20 text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-black text-white">99.98%</span>
            <span className="text-xs font-mono text-cyan-400 font-bold">Gold Tier</span>
          </div>
          <p className="text-[11px] text-slate-400">BIPD $1,000,000 Verified on file</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-white/10 space-y-2 hover:border-brand-orange/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">AVERAGE ON-TIME RATE</span>
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-black text-white">98.4%</span>
            <span className="text-xs font-mono text-emerald-400 font-bold">Top 5%</span>
          </div>
          <p className="text-[11px] text-slate-400">Zero Unexcused Service Delays</p>
        </div>

      </div>

      {/* Live Freight Corridor Telematics Map */}
      <LiveLogisticsMap />

      {/* Quick Access Operational Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Quick Actions Card */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
          <span className="text-xs font-mono uppercase text-brand-orange font-bold block">
            RAPID DISPATCH ACTIONS
          </span>
          <div className="space-y-2 text-xs">
            <button
              onClick={() => onNavigatePath ? onNavigatePath('/mc-lookup') : null}
              className="w-full p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-white/10 text-white font-bold flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-brand-orange" />
                <span>Search MC / DOT Number</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
            </button>

            <button
              onClick={() => onNavigatePath ? onNavigatePath('/load-board') : null}
              className="w-full p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-white/10 text-white font-bold flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-cyan-400" />
                <span>Scan Available Spot Freight</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
            </button>

            <button
              onClick={() => onNavigatePath ? onNavigatePath('/documents') : null}
              className="w-full p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-white/10 text-white font-bold flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Upload Signed POD & BOL</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>

        {/* Live Freight Alert Card */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
              LIVE NETWORK FEED
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>

          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
              <span className="font-bold text-white block">Tender DGW-TN-9942 Approved</span>
              <p className="text-[11px] text-slate-400">Robert Vance confirmed Dallas ➔ Nashville ($2.94/mi).</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
              <span className="font-bold text-white block">Denver HQ Fleet Dispatch</span>
              <p className="text-[11px] text-slate-400">Rocky Mtn Express Unit #512 staged for Salt Lake City haul.</p>
            </div>
          </div>
        </div>

        {/* Corporate Legal Card */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-3 text-xs">
          <span className="text-xs font-mono uppercase text-brand-orange font-bold block">
            CORPORATE COMPLIANCE
          </span>
          <div className="p-3 rounded-2xl bg-slate-950 border border-white/5 space-y-1.5 font-mono text-[11px] text-slate-400">
            <div>ENTITY: <strong className="text-white">DGW SOLUTIONS LLC</strong></div>
            <div>OWNER: <strong className="text-white">SAAD ALTAF (SOLE MBR)</strong></div>
            <div>ADDRESS: <strong className="text-white">9057 E 50TH AVE STE 22C, DENVER CO 80238</strong></div>
            <div>EIN: <strong className="text-brand-orange">42-4868007</strong> (IRS CP575G)</div>
          </div>
        </div>

      </div>

    </div>
  );
};
