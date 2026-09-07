import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  ArrowRight, 
  Trash2
} from 'lucide-react';
import { PORTAL_SAMPLE_NOTIFICATIONS } from '../../../data/portalData';
import type { PortalNotification } from '../../../data/portalData';

interface NotificationsViewProps {
  onNavigateView: (view: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({ onNavigateView }) => {
  const [notifications, setNotifications] = useState<PortalNotification[]>(PORTAL_SAMPLE_NOTIFICATIONS);
  const [filterType, setFilterType] = useState<'ALL' | 'URGENT' | 'IMPORTANT' | 'INFO'>('ALL');

  const filteredNotifs = notifications.filter((n) => filterType === 'ALL' || n.type === filterType);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
              Operational Notifications & Alerts
            </h1>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-orange-100 text-brand-orange border border-orange-200 font-bold">
              PRIORITY QUEUE
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time compliance triggers, match notifications, rate confirmation approvals, and factoring disbursements
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={markAllRead}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold"
          >
            Mark All Read
          </button>
          <button
            onClick={clearAll}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 text-xs font-semibold flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {['ALL', 'URGENT', 'IMPORTANT', 'INFO'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              filterType === type
                ? 'bg-brand-orange text-white border-brand-orange shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.map((notif) => (
          <div
            key={notif.id}
            className={`p-5 rounded-3xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs ${
              notif.read ? 'bg-white border-slate-200' : 'bg-orange-50/40 border-brand-orange/40 shadow-sm'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className={`p-2.5 rounded-2xl shrink-0 mt-0.5 ${
                notif.type === 'URGENT' ? 'bg-red-100 text-red-700' :
                notif.type === 'IMPORTANT' ? 'bg-orange-100 text-brand-orange' : 'bg-cyan-100 text-cyan-800'
              }`}>
                {notif.type === 'URGENT' ? <AlertTriangle className="w-5 h-5" /> :
                 notif.type === 'IMPORTANT' ? <Bell className="w-5 h-5" /> : <Info className="w-5 h-5" />}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                    notif.type === 'URGENT' ? 'bg-red-100 text-red-800' :
                    notif.type === 'IMPORTANT' ? 'bg-orange-100 text-brand-orange' : 'bg-cyan-100 text-cyan-800'
                  }`}>
                    {notif.type}
                  </span>
                  <span className="font-bold text-slate-900 text-sm">{notif.title}</span>
                </div>

                <p className="text-slate-600 text-xs leading-relaxed">{notif.message}</p>
                <span className="text-[10px] text-slate-400 font-mono block">{notif.timestamp}</span>
              </div>
            </div>

            {notif.actionUrl && (
              <button
                onClick={() => onNavigateView(notif.actionUrl!.replace('/', ''))}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-brand-orange hover:text-white text-slate-800 font-bold transition-colors shrink-0 flex items-center gap-1.5 self-start sm:self-center"
              >
                <span>Take Action</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}

        {filteredNotifs.length === 0 && (
          <div className="p-12 text-center text-slate-400 text-xs bg-white rounded-3xl border border-slate-200">
            No notifications in this queue.
          </div>
        )}
      </div>

    </div>
  );
};
