import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  CheckCheck
} from 'lucide-react';
import { PORTAL_SAMPLE_NOTIFICATIONS } from '../../data/portalData';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [notifications, setNotifications] = useState(PORTAL_SAMPLE_NOTIFICATIONS);
  const [filterCategory, setFilterCategory] = useState<'all' | 'unread'>('all');

  if (!isOpen) return null;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDeleteNotif = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleToggleRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const filtered = notifications.filter(n => {
    if (filterCategory === 'unread') return !n.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200 flex justify-end">
      <div className="relative w-full max-w-md bg-slate-900 border-l border-white/10 shadow-2xl h-full flex flex-col text-white animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-orange/20 text-brand-orange">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Operational Notifications</h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {unreadCount} unread system notices
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="p-3 border-b border-white/5 bg-slate-950 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-2.5 py-1 rounded-lg ${filterCategory === 'all' ? 'bg-brand-orange text-white' : 'text-slate-400'}`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilterCategory('unread')}
              className={`px-2.5 py-1 rounded-lg ${filterCategory === 'unread' ? 'bg-brand-orange text-white' : 'text-slate-400'}`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          <button
            onClick={handleMarkAllRead}
            className="text-slate-400 hover:text-brand-orange flex items-center gap-1 text-[11px]"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark All Read</span>
          </button>
        </div>

        {/* Notifications Scroll List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 text-xs">
          {filtered.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-2xl border transition-all space-y-1.5 ${
                n.read 
                  ? 'bg-slate-950/60 border-white/5 opacity-70' 
                  : 'bg-slate-950 border-brand-orange/40 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-bold text-white text-xs">{n.title}</span>
                <span className="text-[10px] text-slate-500 font-mono shrink-0">{n.timestamp}</span>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed">{n.message}</p>

              <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-slate-500">
                <button
                  onClick={() => handleToggleRead(n.id)}
                  className="hover:text-brand-orange text-slate-400"
                >
                  {n.read ? 'Mark Unread' : 'Mark as Read'}
                </button>
                <button
                  onClick={() => handleDeleteNotif(n.id)}
                  className="hover:text-red-400 text-slate-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <Bell className="w-8 h-8 mx-auto opacity-40" />
              <p>No notifications found in this view.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
