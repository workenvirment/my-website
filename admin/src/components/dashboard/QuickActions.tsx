import React from 'react';
import { 
  UserPlus, 
  Mail, 
  RefreshCw, 
  ShieldCheck,
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';
import type { DashboardStats } from '../../types/admin';

interface QuickActionsProps {
  stats?: DashboardStats;
  onActionClick?: (actionName: string) => void;
  onNavigate?: (route: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ 
  stats, 
  onActionClick, 
  onNavigate 
}) => {
  const newLeadsCount = stats?.newLeads ?? 0;
  const unreadMessagesCount = stats?.unreadMessages ?? 0;
  const totalLeadsCount = stats?.totalLeads ?? 0;

  const actions = [
    {
      id: 'review-leads',
      label: 'Carrier Queue',
      description: newLeadsCount > 0 
        ? `${newLeadsCount} new lead${newLeadsCount > 1 ? 's' : ''} pending review` 
        : totalLeadsCount > 0 
          ? `${totalLeadsCount} carrier records in database` 
          : 'No pending carrier leads',
      icon: <UserPlus className="w-4 h-4 text-emerald-400" />,
      btnText: 'View Queue',
      onClick: () => {
        if (onNavigate) {
          onNavigate('/leads');
        } else {
          onActionClick?.('review-leads');
        }
      }
    },
    {
      id: 'unread-messages',
      label: 'Dispatch Messages',
      description: unreadMessagesCount > 0 
        ? `${unreadMessagesCount} unread contact inquir${unreadMessagesCount > 1 ? 'ies' : 'y'}` 
        : 'All inquiries reviewed',
      icon: <Mail className="w-4 h-4 text-purple-400" />,
      btnText: 'Open Feed',
      onClick: () => {
        if (onNavigate) {
          onNavigate('/messages');
        } else {
          onActionClick?.('unread-messages');
        }
      }
    },
    {
      id: 'export-data',
      label: 'Export Records',
      description: 'Download CSV file of active carrier records',
      icon: <FileSpreadsheet className="w-4 h-4 text-blue-400" />,
      btnText: 'Export CSV',
      onClick: () => {
        if (onNavigate) {
          onNavigate('/leads');
        } else {
          onActionClick?.('export-data');
        }
      }
    },
    {
      id: 'verify-seo',
      label: 'Public Web Platform',
      description: 'Check public sitemap & operational routes',
      icon: <ShieldCheck className="w-4 h-4 text-cyan-400" />,
      btnText: 'Visit Live Site',
      onClick: () => {
        window.open('https://dgwsolutionllc.com/', '_blank');
      }
    }
  ];

  return (
    <div className="p-5 rounded-2xl bg-[#111C2B] border border-[#1E2C3F] space-y-4 shadow-md">
      <div className="flex items-center justify-between border-b border-[#1E2C3F] pb-3">
        <div>
          <h3 className="text-sm font-bold font-display text-white">Operations Quick Actions</h3>
          <p className="text-[11px] text-slate-400">Direct shortcuts to critical workflows</p>
        </div>
        <button 
          onClick={() => onActionClick?.('refresh')}
          className="p-1.5 rounded-lg bg-[#0D1624] hover:bg-[#1A283B] text-slate-400 hover:text-white border border-[#1E2C3F] transition-colors cursor-pointer"
          title="Refresh Data Feed"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((act) => (
          <div 
            key={act.id}
            className="p-3.5 rounded-xl bg-[#0D1624] border border-[#1E2C3F] hover:border-blue-500/30 transition-all flex flex-col justify-between space-y-3 group"
          >
            <div className="flex items-start gap-2.5">
              <div className="p-2 rounded-lg bg-[#111C2B] border border-[#1E2C3F] shrink-0">
                {act.icon}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors truncate">
                  {act.label}
                </h4>
                <p className="text-[11px] text-slate-400 leading-tight mt-0.5 line-clamp-2">
                  {act.description}
                </p>
              </div>
            </div>

            <button
              onClick={act.onClick}
              className="w-full py-1.5 px-3 rounded-lg bg-[#111C2B] hover:bg-blue-600/20 text-slate-300 hover:text-blue-200 border border-[#1E2C3F] hover:border-blue-500/30 font-mono font-bold text-[11px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{act.btnText}</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
