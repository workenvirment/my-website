import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck,
  Building2, 
  Package, 
  Mail, 
  FileText, 
  Search, 
  BarChart3, 
  Settings, 
  UserPlus, 
  PlusCircle, 
  Send,
  Radio,
  Activity
} from 'lucide-react';
import { DgwTruckLogo } from '../common/DgwTruckLogo';
import { operationsStore } from '../../services/operationsStore';
import { subscribeToCarrierLeads, subscribeToTruckers, subscribeToContactMessages } from '../../services/firestoreService';

interface AdminSidebarProps {
  currentRoute: string;
  onRouteChange: (route: string) => void;
  onOpenQuickAction?: (action: 'add-trucker' | 'add-broker' | 'post-load' | 'send-message') => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  count?: number;
  isAlert?: boolean;
  disabled?: boolean;
  isComingSoon?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentRoute,
  onRouteChange,
  onOpenQuickAction,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const [counts, setCounts] = useState({
    leads: 0,
    truckers: 0,
    brokers: 0,
    loads: 0,
    unreadMessages: 0
  });

  useEffect(() => {
    const updateLocalCounts = () => {
      const truckers = operationsStore.getTruckers();
      const brokers = operationsStore.getBrokers();
      const loads = operationsStore.getLoads();
      const threads = operationsStore.getMessageThreads();
      const unread = threads.reduce((acc, t) => acc + (t.unreadCount > 0 ? 1 : 0), 0);

      setCounts((prev) => ({
        ...prev,
        truckers: truckers.length,
        brokers: brokers.length,
        loads: loads.length,
        unreadMessages: unread
      }));
    };

    updateLocalCounts();
    const unsubStore = operationsStore.subscribe(updateLocalCounts);

    // Direct Firestore real-time subscriptions for leads, truckers & messages
    const unsubLeads = subscribeToCarrierLeads((leadsList) => {
      setCounts((prev) => ({
        ...prev,
        leads: leadsList.length
      }));
    });

    const unsubTruckers = subscribeToTruckers((truckersList) => {
      setCounts((prev) => ({
        ...prev,
        truckers: truckersList.length
      }));
    });

    const unsubMessages = subscribeToContactMessages((msgs) => {
      const unread = msgs.filter((m) => m.status === 'unread').length;
      setCounts((prev) => ({
        ...prev,
        unreadMessages: unread
      }));
    });

    return () => {
      unsubStore();
      unsubLeads();
      unsubTruckers();
      unsubMessages();
    };
  }, []);

  const navSections: NavSection[] = [
    {
      title: 'MAIN',
      items: [
        { id: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: '/leads', label: 'Carrier Leads', icon: UserCheck, count: counts.leads },
        { id: '/truckers', label: 'Truckers', icon: Users, count: counts.truckers },
        { id: '/messages', label: 'Messages', icon: Mail, count: counts.unreadMessages, isAlert: counts.unreadMessages > 0 },
      ]
    },
    {
      title: 'OPERATIONS',
      items: [
        { id: '/brokers', label: 'Brokers', icon: Building2, count: counts.brokers },
        { id: '/loads', label: 'Loads', icon: Package, count: counts.loads },
        { id: '/dispatch', label: 'Dispatch', icon: Radio, isComingSoon: true, disabled: true },
        { id: '/documents', label: 'Documents', icon: FileText },
      ]
    },
    {
      title: 'ANALYTICS',
      items: [
        { id: '/reports', label: 'Reports', icon: BarChart3 },
        { id: '/performance', label: 'Performance', icon: Activity, isComingSoon: true, disabled: true },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { id: '/mc-lookup', label: 'MC Lookup', icon: Search },
        { id: '/settings', label: 'Settings', icon: Settings },
      ]
    }
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.disabled) return;
    onRouteChange(item.id);
    if (onCloseMobile) onCloseMobile();
  };

  const handleQuickClick = (action: 'add-trucker' | 'add-broker' | 'post-load' | 'send-message') => {
    if (onOpenQuickAction) {
      onOpenQuickAction(action);
    } else {
      if (action === 'add-trucker') onRouteChange('/truckers');
      if (action === 'add-broker') onRouteChange('/brokers');
      if (action === 'post-load') onRouteChange('/loads');
      if (action === 'send-message') onRouteChange('/messages');
    }
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-[#030812]/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Sidebar Container (215px fixed operational sidebar) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-[215px] bg-[#0A1322] border-r border-[#1B293E] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Top Branding Section */}
        <div className="h-[56px] px-3.5 border-b border-[#1B293E] flex items-center shrink-0 bg-[#08101C]">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src="/dgw-logo.png"
              alt="DGW Solutions LLC"
              width={1024}
              height={512}
              className="h-9 w-auto object-contain shrink-0"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        {/* Scrollable Navigation Sections */}
        <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-4 scrollbar-thin">
          
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 font-bold px-2 block">
                {section.title}
              </span>

              <nav className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentRoute === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item)}
                      disabled={item.disabled}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[11.5px] font-semibold transition-all group ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-950/60 font-bold border border-blue-400/30'
                          : item.disabled
                            ? 'text-slate-500 opacity-60 cursor-not-allowed'
                            : 'text-slate-400 hover:text-slate-100 hover:bg-[#111F33] hover:border-slate-700/50 cursor-pointer border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                          isActive ? 'text-white' : item.disabled ? 'text-slate-600' : 'text-slate-400 group-hover:text-blue-400'
                        }`} />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.isComingSoon ? (
                        <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold tracking-tight bg-slate-800/80 text-slate-400 border border-slate-700/50 shrink-0">
                          SOON
                        </span>
                      ) : item.count !== undefined && item.count > 0 ? (
                        <span className={`px-1.5 py-0.2 rounded text-[9.5px] font-mono font-bold shrink-0 ${
                          isActive
                            ? 'bg-blue-950/80 text-white border border-blue-400/40'
                            : item.isAlert
                              ? 'bg-red-500 text-white shadow-xs animate-pulse'
                              : 'bg-[#15253D] text-slate-300 border border-[#213552]'
                        }`}>
                          {item.count}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}

          {/* Quick Actions Section */}
          <div className="space-y-1.5 pt-2.5 border-t border-[#1B293E]/80">
            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 font-bold px-2 block">
              Quick Actions
            </span>

            <div className="space-y-1">
              <button
                onClick={() => handleQuickClick('add-trucker')}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-slate-300 hover:text-white hover:bg-[#111F33] transition-colors cursor-pointer border border-transparent hover:border-[#1E2E46]"
              >
                <div className="w-4 h-4 rounded bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                  <UserPlus className="w-2.5 h-2.5" />
                </div>
                <span className="truncate">Add New Trucker</span>
              </button>

              <button
                onClick={() => handleQuickClick('add-broker')}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-slate-300 hover:text-white hover:bg-[#111F33] transition-colors cursor-pointer border border-transparent hover:border-[#1E2E46]"
              >
                <div className="w-4 h-4 rounded bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                  <PlusCircle className="w-2.5 h-2.5" />
                </div>
                <span className="truncate">Add New Broker</span>
              </button>

              <button
                onClick={() => handleQuickClick('post-load')}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-slate-300 hover:text-white hover:bg-[#111F33] transition-colors cursor-pointer border border-transparent hover:border-[#1E2E46]"
              >
                <div className="w-4 h-4 rounded bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                  <PlusCircle className="w-2.5 h-2.5" />
                </div>
                <span className="truncate">Post Load</span>
              </button>

              <button
                onClick={() => handleQuickClick('send-message')}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-slate-300 hover:text-white hover:bg-[#111F33] transition-colors cursor-pointer border border-transparent hover:border-[#1E2E46]"
              >
                <div className="w-4 h-4 rounded bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0">
                  <Send className="w-2.5 h-2.5" />
                </div>
                <span className="truncate">Send Message</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Sidebar Footer Section with Wave Art and DGW Logo */}
        <div className="p-3 border-t border-[#1B293E] bg-[#07111F] relative overflow-hidden shrink-0">
          {/* Subtle Ambient Wave Graphic */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg viewBox="0 0 215 100" fill="none" className="w-full h-full">
              <path 
                d="M -10 70 C 30 30, 80 90, 140 40 C 170 15, 200 60, 230 30 L 230 100 L -10 100 Z" 
                fill="url(#blueWaveGrad2)" 
              />
              <defs>
                <linearGradient id="blueWaveGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#07111F" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 space-y-1.5">
            <div className="flex items-center gap-2">
              <DgwTruckLogo className="h-5 w-auto shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-white leading-tight truncate">DGW Solutions LLC</p>
                <p className="text-[8px] text-slate-400 font-mono truncate">Connecting Opportunities</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1.5 border-t border-[#1B293E]/80 text-[9px] font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                System Online
              </span>
              <span className="text-slate-500">v2.5 Pro</span>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
};