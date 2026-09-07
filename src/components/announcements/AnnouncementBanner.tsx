import React, { useState } from 'react';
import { AlertTriangle, X, Megaphone } from 'lucide-react';
import { PLATFORM_ANNOUNCEMENTS } from '../../data/announcementsData';

export const AnnouncementBanner: React.FC = () => {
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const activeAnnouncements = PLATFORM_ANNOUNCEMENTS.filter(a => a.active && !dismissedIds.includes(a.id));

  if (activeAnnouncements.length === 0) return null;

  const current = activeAnnouncements[0];

  const handleDismiss = (id: string) => {
    setDismissedIds([...dismissedIds, id]);
  };

  return (
    <div className="relative z-40 bg-gradient-to-r from-amber-600 via-brand-orange to-amber-600 text-white text-xs font-semibold px-4 py-2.5 shadow-md animate-in slide-in-from-top duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 truncate">
          <span className="p-1 rounded-md bg-white/20 text-white shrink-0">
            {current.priority === 'urgent' ? <AlertTriangle className="w-3.5 h-3.5" /> : <Megaphone className="w-3.5 h-3.5" />}
          </span>
          <span className="font-mono text-[10px] uppercase font-bold bg-black/20 px-2 py-0.5 rounded shrink-0">
            {current.priority}
          </span>
          <span className="truncate text-white">
            <strong>{current.title}:</strong> {current.message}
          </span>
        </div>

        <button
          onClick={() => handleDismiss(current.id)}
          className="p-1 hover:bg-black/20 rounded-lg text-white/80 hover:text-white transition-colors shrink-0"
          title="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
