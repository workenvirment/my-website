import React from 'react';
import type { MetricItem } from '../../types/admin';
import { Users, UserPlus, Mail, Globe, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCardProps {
  metric: MetricItem;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const getIcon = () => {
    switch (metric.id) {
      case 'total-leads':
        return <Users className="w-4 h-4 text-blue-400" />;
      case 'new-leads':
        return <UserPlus className="w-4 h-4 text-emerald-400" />;
      case 'contact-messages':
        return <Mail className="w-4 h-4 text-purple-400" />;
      case 'website-status':
        return <Globe className="w-4 h-4 text-cyan-400" />;
      default:
        return <Users className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#111C2B] border border-[#1E2C3F] hover:border-blue-500/30 transition-all flex flex-col justify-between space-y-3 shadow-md relative overflow-hidden group">
      
      {/* Top Label & Icon */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
          {metric.label}
        </span>
        <div className="p-2 rounded-xl bg-[#0D1624] border border-[#1E2C3F] group-hover:scale-105 transition-transform">
          {getIcon()}
        </div>
      </div>

      {/* Main Metric Value & Trend */}
      <div className="space-y-0.5">
        <div className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
          {metric.value}
        </div>
        <div className="flex items-center gap-1.5 text-[11px]">
          {metric.isPositive ? (
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          ) : (
            <ArrowDownRight className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          )}
          <span className={metric.isPositive ? 'text-emerald-400 font-bold font-mono' : 'text-rose-400 font-bold font-mono'}>
            {metric.change}
          </span>
        </div>
      </div>

      {/* Bottom Period & Live Status */}
      <div className="pt-2.5 border-t border-[#1E2C3F] flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span>{metric.period}</span>
        {metric.isDemoData ? (
          <span className="px-1.5 py-0.2 rounded bg-slate-800 text-amber-400 border border-amber-500/20 text-[8px] font-bold">
            DEMO
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
        )}
      </div>
    </div>
  );
};
