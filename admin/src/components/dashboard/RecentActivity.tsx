import React from 'react';
import type { ActivityItem } from '../../types/admin';
import { 
  Clock, 
  UserPlus, 
  Mail, 
  ShieldCheck, 
  Key, 
  Truck 
} from 'lucide-react';

interface RecentActivityProps {
  activities: ActivityItem[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'lead':
        return <UserPlus className="w-3.5 h-3.5 text-emerald-400" />;
      case 'message':
        return <Mail className="w-3.5 h-3.5 text-purple-400" />;
      case 'system':
        return <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />;
      case 'auth':
        return <Key className="w-3.5 h-3.5 text-blue-400" />;
      case 'dispatch':
        return <Truck className="w-3.5 h-3.5 text-blue-400" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-[#111C2B] border border-[#1E2C3F] space-y-4 shadow-md">
      <div className="flex items-center justify-between border-b border-[#1E2C3F] pb-3">
        <div>
          <h3 className="text-sm font-bold font-display text-white">Live Event Audit Log</h3>
          <p className="text-[11px] text-slate-400">Stream of recent operational updates</p>
        </div>
        <span className="px-2 py-0.5 rounded-md bg-[#0D1624] text-slate-400 border border-[#1E2C3F] text-[10px] font-mono">
          {activities.length} Events
        </span>
      </div>

      <div className="space-y-2.5">
        {activities.map((item) => (
          <div 
            key={item.id}
            className="p-3 rounded-xl bg-[#0D1624] border border-[#1E2C3F] hover:border-blue-500/20 transition-all flex items-start justify-between gap-3"
          >
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-[#111C2B] border border-[#1E2C3F] shrink-0 mt-0.5">
                {getIcon(item.type)}
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white truncate">{item.title}</span>
                  {item.isDemoData && (
                    <span className="px-1.5 py-0.2 rounded bg-slate-800 text-amber-400/90 text-[8px] font-mono border border-amber-500/20 shrink-0">
                      DEMO
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed truncate">
                  {item.description}
                </p>
                <div className="text-[10px] font-mono text-slate-500 truncate">
                  Source: {item.user}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 shrink-0">
              <span>{item.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
