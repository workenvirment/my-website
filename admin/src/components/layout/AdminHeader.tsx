import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Settings, 
  LogOut, 
  Menu, 
  ExternalLink
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { operationsStore } from '../../services/operationsStore';
import type { SystemNotification } from '../../types/admin';

interface AdminHeaderProps {
  onOpenMobileMenu?: () => void;
  onOpenGlobalSearch?: () => void;
  onNavigate?: (route: string) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onOpenMobileMenu,
  onOpenGlobalSearch,
  onNavigate
}) => {
  const { user, signOutUser } = useAdminAuth();
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNotifications(operationsStore.getNotifications());
    const unsub = operationsStore.subscribe(() => {
      setNotifications(operationsStore.getNotifications());
    });
    return () => unsub();
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const handleNotificationClick = (notif: SystemNotification) => {
    operationsStore.markNotificationRead(notif.id);
    setIsNotifOpen(false);
    if (notif.routeLink && onNavigate) {
      onNavigate(notif.routeLink);
    }
  };

  return (
    <header className="h-[50px] bg-[#07111F] border-b border-[#1E2C3F] px-4 sm:px-5 flex items-center justify-between sticky top-0 z-30 shrink-0">
      
      {/* Left: Mobile Menu Toggle & Global Search Field */}
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="p-1.5 rounded-lg bg-[#0D1624] border border-[#1E2C3F] text-slate-400 hover:text-white lg:hidden cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        {/* Global Search Input Box (approx 380-400px wide) */}
        <div 
          onClick={onOpenGlobalSearch}
          className="w-[260px] sm:w-[380px] lg:w-[400px] h-[32px] flex items-center gap-2.5 px-3 rounded-lg bg-[#0D1624] border border-[#1E2C3F] hover:border-blue-500/40 text-slate-400 hover:text-slate-200 transition-all cursor-pointer shadow-inner group"
        >
          <Search className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors shrink-0" />
          <span className="text-[11px] text-slate-400 flex-1 truncate">
            Search truckers, MC#, phone, or company...
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-[#111C2B] border border-[#1E2C3F] text-[9px] font-mono text-slate-400 group-hover:text-slate-200">
            Ctrl + K
          </span>
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-3 sm:gap-3.5">
        
        {/* Notification Bell Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="w-8 h-8 rounded-lg bg-[#0D1624] border border-[#1E2C3F] hover:border-blue-500/40 text-slate-300 hover:text-white transition-all relative flex items-center justify-center cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-3.5 h-3.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-600 text-white text-[8.5px] font-bold flex items-center justify-center border-2 border-[#07111F] animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Flyout */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-1.5 w-80 sm:w-92 rounded-xl bg-[#0D1624] border border-[#1E2C3F] shadow-2xl p-3 space-y-2.5 z-50 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-[#1E2C3F]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">System Notifications</span>
                  <span className="px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-400 text-[9.5px] font-mono font-bold">
                    {unreadCount} New
                  </span>
                </div>
                <button
                  onClick={() => operationsStore.markAllNotificationsRead()}
                  className="text-[10px] text-blue-400 hover:underline cursor-pointer"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-1.5 divide-y divide-[#1E2C3F]/30 scrollbar-thin">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-slate-500 text-xs">
                    No system notifications yet
                  </div>
                ) : (
                  notifications.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => handleNotificationClick(n)}
                      className={`pt-1.5 p-1.5 rounded-lg transition-colors cursor-pointer flex items-start gap-2 ${
                        n.isUnread ? 'bg-blue-600/10 hover:bg-blue-600/15' : 'hover:bg-[#111C2B]'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-md bg-[#111C2B] border border-[#1E2C3F] flex items-center justify-center text-blue-400 shrink-0 text-xs mt-0.5">
                        {n.type === 'trucker' ? '🚛' : n.type === 'broker' ? '🏢' : n.type === 'document' ? '📄' : '💬'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-bold text-white truncate">{n.title}</p>
                        <p className="text-[10px] text-slate-400 leading-tight line-clamp-2 mt-0.5">{n.description}</p>
                        <span className="text-[8.5px] font-mono text-slate-500 block mt-0.5">{n.timeAgo}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {onNavigate && (
                <div className="pt-1.5 border-t border-[#1E2C3F] text-center">
                  <button
                    onClick={() => {
                      setIsNotifOpen(false);
                      onNavigate('/dashboard');
                    }}
                    className="text-[11px] font-bold text-blue-400 hover:text-blue-300"
                  >
                    View All Activity Feed →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Admin Profile Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-1 pl-1 pr-2 rounded-full bg-[#0D1624] border border-[#1E2C3F] hover:border-blue-500/40 transition-all cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-full bg-[#1A2638] border border-[#2D3F58] text-white font-bold text-[11px] flex items-center justify-center shadow-xs shrink-0">
              AD
            </div>
            <div className="hidden sm:block text-left pr-0.5 leading-none">
              <span className="text-[11.5px] font-bold text-white block group-hover:text-blue-300">
                Admin
              </span>
              <span className="text-[8.5px] text-slate-400 font-mono block mt-0.5">
                System Administrator
              </span>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-white" />
          </button>

          {/* User Menu Popover */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0D1624] border border-[#1E2C3F] shadow-2xl p-2 space-y-1 z-50 animate-in fade-in">
              <div className="p-2 border-b border-[#1E2C3F] space-y-0.5">
                <p className="text-xs font-bold text-white">Administrator Account</p>
                <p className="text-[10px] font-mono text-blue-400 truncate">{user?.email || 'admin@dgwsolutionllc.com'}</p>
              </div>

              {onNavigate && (
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    onNavigate('/settings');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-[#111C2B] transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Control Settings</span>
                </button>
              )}

              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-[#111C2B] transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-slate-400" />
                <span>Visit Public Site</span>
              </a>

              <div className="pt-1 border-t border-[#1E2C3F]">
                <button
                  onClick={() => signOutUser()}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer font-bold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out Session</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};
