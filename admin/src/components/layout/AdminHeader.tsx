import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Menu, 
  LogOut, 
  Settings, 
  ExternalLink,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { operationsStore } from '../../services/operationsStore';
import type { SystemNotification } from '../../types/admin';

interface AdminHeaderProps {
  currentRoute?: string;
  onOpenMobileMenu?: () => void;
  onOpenGlobalSearch?: () => void;
  onNavigate?: (route: string) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentRoute = '/dashboard',
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
    const updateNotifs = () => {
      setNotifications(operationsStore.getNotifications());
    };
    updateNotifs();
    const unsub = operationsStore.subscribe(updateNotifs);
    return () => unsub();
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const handleNotificationClick = (notif: SystemNotification) => {
    operationsStore.markNotificationRead(notif.id);
    setIsNotifOpen(false);
    if (notif.routeLink && onNavigate) {
      onNavigate(notif.routeLink);
    }
  };

  const getPageMeta = (route: string) => {
    switch (route) {
      case '/leads':
        return { title: 'Carrier Leads', category: 'Operations' };
      case '/truckers':
        return { title: 'Fleet Truckers', category: 'Operations' };
      case '/brokers':
        return { title: 'Broker Network', category: 'Operations' };
      case '/loads':
        return { title: 'Load Board', category: 'Operations' };
      case '/messages':
        return { title: 'Communications', category: 'Operations' };
      case '/documents':
        return { title: 'Document Center', category: 'Operations' };
      case '/mc-lookup':
        return { title: 'MC & DOT Registry', category: 'System' };
      case '/reports':
        return { title: 'Operations Analytics', category: 'Analytics' };
      case '/settings':
        return { title: 'Platform Settings', category: 'System' };
      case '/dashboard':
      default:
        return { title: 'Operations Center', category: 'Command' };
    }
  };

  const pageMeta = getPageMeta(currentRoute);

  return (
    <header className="h-[56px] px-3 sm:px-6 bg-[#0A1322]/85 backdrop-blur-md border-b border-[#1B293E] flex items-center justify-between sticky top-0 z-30 transition-all">
      
      {/* Left Area: Mobile Toggle & Breadcrumb / Search */}
      <div className="flex items-center gap-3 min-w-0">
        
        {/* Mobile Hamburger Button */}
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden w-8 h-8 rounded-lg bg-[#111F33] border border-[#1E2E46] text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        {/* Page Title & Breadcrumbs */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold bg-[#111F33] px-2 py-0.5 rounded border border-[#1E2E46]">
            {pageMeta.category}
          </span>
          <span className="text-slate-600 text-xs">/</span>
          <h2 className="text-xs font-bold font-display text-white tracking-tight">
            {pageMeta.title}
          </h2>
        </div>

        {/* Global Search Omnibar */}
        <div 
          onClick={onOpenGlobalSearch}
          className="w-[200px] sm:w-[320px] lg:w-[360px] h-[34px] flex items-center gap-2 px-3 rounded-xl bg-[#08101C] border border-[#1B293E] hover:border-blue-500/40 text-slate-400 hover:text-slate-200 transition-all cursor-pointer shadow-inner group"
        >
          <Search className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors shrink-0" />
          <span className="text-[11px] text-slate-400 flex-1 truncate">
            Search leads, MC#, phone, carrier...
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#111F33] border border-[#1E2E46] text-[9px] font-mono text-slate-400 group-hover:text-slate-200">
            Ctrl + K
          </span>
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        
        {/* Live System Online Status Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>System Online</span>
        </div>

        {/* Notification Bell Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="w-8 h-8 rounded-xl bg-[#08101C] border border-[#1B293E] hover:border-blue-500/40 text-slate-300 hover:text-white transition-all relative flex items-center justify-center cursor-pointer shadow-xs"
            aria-label="View notifications"
          >
            <Bell className="w-3.5 h-3.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-mono font-bold flex items-center justify-center border-2 border-[#0A1322] animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Flyout */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-92 rounded-2xl bg-[#0A1322] border border-[#1B293E] shadow-2xl p-3.5 space-y-2.5 z-50 animate-fade-in-scale">
              <div className="flex items-center justify-between pb-2 border-b border-[#1B293E]">
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

              <div className="max-h-72 overflow-y-auto space-y-1.5 divide-y divide-[#1B293E]/40 scrollbar-thin">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-slate-500 text-xs">
                    No system notifications yet
                  </div>
                ) : (
                  notifications.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => handleNotificationClick(n)}
                      className={`pt-2 p-1.5 rounded-lg transition-colors cursor-pointer flex items-start gap-2.5 ${
                        n.isUnread ? 'bg-blue-600/10 hover:bg-blue-600/15' : 'hover:bg-[#111F33]'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#111F33] border border-[#1E2E46] flex items-center justify-center text-blue-400 shrink-0 text-xs mt-0.5">
                        <Radio className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-bold text-white truncate">{n.title}</p>
                        <p className="text-[10px] text-slate-400 leading-tight line-clamp-2 mt-0.5">{n.description}</p>
                        <span className="text-[8.5px] font-mono text-slate-500 block mt-1">{n.timeAgo}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {onNavigate && (
                <div className="pt-2 border-t border-[#1B293E] text-center">
                  <button
                    onClick={() => {
                      setIsNotifOpen(false);
                      onNavigate('/dashboard');
                    }}
                    className="text-[11px] font-bold text-blue-400 hover:text-blue-300"
                  >
                    View All Activity Feed &rarr;
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
            className="flex items-center gap-2 p-1 pl-1 pr-2.5 rounded-full bg-[#08101C] border border-[#1B293E] hover:border-blue-500/40 transition-all cursor-pointer group shadow-xs"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 border border-blue-400/40 text-white font-bold text-[11px] flex items-center justify-center shadow-xs shrink-0">
              AD
            </div>
            <div className="hidden sm:block text-left pr-0.5 leading-none">
              <span className="text-[11.5px] font-bold text-white block group-hover:text-blue-300">
                Admin
              </span>
              <span className="text-[8.5px] text-slate-400 font-mono block mt-0.5">
                Operations Root
              </span>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-white" />
          </button>

          {/* User Menu Popover */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0A1322] border border-[#1B293E] shadow-2xl p-2 space-y-1 z-50 animate-fade-in-scale">
              <div className="p-2.5 border-b border-[#1B293E] space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Administrator Account</span>
                </div>
                <p className="text-[10px] font-mono text-blue-400 truncate">{user?.email || 'admin@dgwsolutionllc.com'}</p>
              </div>

              {onNavigate && (
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    onNavigate('/settings');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-[#111F33] transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Control Settings</span>
                </button>
              )}

              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-[#111F33] transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-slate-400" />
                <span>Visit Public Site</span>
              </a>

              <div className="pt-1 border-t border-[#1B293E]">
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