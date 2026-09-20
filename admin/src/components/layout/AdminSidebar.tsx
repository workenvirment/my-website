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
  Send
} from 'lucide-react';
import { DgwTruckLogo } from '../common/DgwTruckLogo';
import { operationsStore } from '../../services/operationsStore';
import { subscribeToCarrierLeads } from '../../services/firestoreService';

interface AdminSidebarProps {
  currentRoute: string;
  onRouteChange: (route: string) => void;
  onOpenQuickAction?: (action: 'add-trucker' | 'add-broker' | 'post-load' | 'send-message') => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
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
    const updateCounts = () => {
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

    updateCounts();
    const unsubStore = operationsStore.subscribe(updateCounts);
    const unsubLeads = subscribeToCarrierLeads((leadsList) => {
      setCounts((prev) => ({
        ...prev,
        leads: leadsList.length
      }));
    });

    return () => {
      unsubStore();
      unsubLeads();
    };
  }, []);

  const navItems = [
    { id: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: '/leads', label: 'Carrier Leads', icon: UserCheck, count: counts.leads },
    { id: '/truckers', label: 'Truckers', icon: Users, count: counts.truckers },
    { id: '/brokers', label: 'Brokers', icon: Building2, count: counts.brokers },
    { id: '/loads', label: 'Loads', icon: Package, count: counts.loads },
    { id: '/messages', label: 'Messages', icon: Mail, count: counts.unreadMessages, isAlert: true },
    { id: '/documents', label: 'Documents', icon: FileText },
    { id: '/mc-lookup', label: 'MC Lookup', icon: Search },
    { id: '/reports', label: 'Reports', icon: BarChart3 },
    { id: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (route: string) => {
    onRouteChange(route);
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
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Sidebar Container (205px wide fixed operational sidebar) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-[205px] bg-[#0D1624] border-r border-[#1E2C3F] flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Branding Section (approx 52-55px height) */}
        <div className="h-[52px] px-3 border-b border-[#1E2C3F] flex items-center shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <DgwTruckLogo className="w-7 h-7 shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-1 leading-none">
                <span className="font-display font-black text-white text-[13.5px] tracking-tight truncate">
                  DGW
                </span>
                <span className="text-[11px] font-bold text-slate-300 truncate">
                  Solutions LLC
                </span>
              </div>
              <p className="text-[8.5px] text-blue-400 font-mono tracking-wider uppercase font-semibold truncate mt-0.5">
                Dispatching Global World
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto py-2.5 px-2 space-y-4 scrollbar-thin">
          
          {/* Main Navigation Links */}
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[11.5px] font-semibold transition-all cursor-pointer group ${
                    isActive
                      ? 'bg-[#1E60F2] text-white shadow-md shadow-blue-900/50 font-bold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-[#111C2B]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                    }`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.count !== undefined && (
                    <span className={`px-1.5 py-0.2 rounded text-[9.5px] font-mono font-bold shrink-0 ${
                      isActive
                        ? 'bg-blue-950/70 text-white'
                        : item.isAlert
                          ? 'bg-red-500 text-white shadow-xs'
                          : 'bg-[#152336] text-slate-300'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions Section */}
          <div className="space-y-1 pt-2 border-t border-[#1E2C3F]/60">
            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 font-bold px-2 block mb-1">
              Quick Actions
            </span>

            <div className="space-y-0.5">
              <button
                onClick={() => handleQuickClick('add-trucker')}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-slate-300 hover:text-white hover:bg-[#111C2B] transition-colors cursor-pointer"
              >
                <div className="w-4 h-4 rounded bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                  <UserPlus className="w-2.5 h-2.5" />
                </div>
                <span className="truncate">Add New Trucker</span>
              </button>

              <button
                onClick={() => handleQuickClick('add-broker')}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-slate-300 hover:text-white hover:bg-[#111C2B] transition-colors cursor-pointer"
              >
                <div className="w-4 h-4 rounded bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                  <PlusCircle className="w-2.5 h-2.5" />
                </div>
                <span className="truncate">Add New Broker</span>
              </button>

              <button
                onClick={() => handleQuickClick('post-load')}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-slate-300 hover:text-white hover:bg-[#111C2B] transition-colors cursor-pointer"
              >
                <div className="w-4 h-4 rounded bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                  <PlusCircle className="w-2.5 h-2.5" />
                </div>
                <span className="truncate">Post Load</span>
              </button>

              <button
                onClick={() => handleQuickClick('send-message')}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-slate-300 hover:text-white hover:bg-[#111C2B] transition-colors cursor-pointer"
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
        <div className="p-2.5 border-t border-[#1E2C3F] bg-[#07111F] relative overflow-hidden shrink-0">
          {/* Abstract Electric Blue Glowing Wave Graphic */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg viewBox="0 0 205 100" fill="none" className="w-full h-full">
              <path 
                d="M -10 70 C 30 30, 80 90, 140 40 C 170 15, 200 60, 220 30 L 220 100 L -10 100 Z" 
                fill="url(#blueWaveGrad2)" 
              />
              <path 
                d="M -10 65 C 40 20, 90 80, 150 35 C 180 10, 210 55, 220 25" 
                stroke="#38BDF8" 
                strokeWidth="1.2" 
                fill="none" 
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
            <div className="flex items-center gap-1.5">
              <DgwTruckLogo className="w-5 h-5 shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-white leading-tight truncate">DGW Solutions LLC</p>
                <p className="text-[8px] text-slate-400 font-mono truncate">Dispatching Global World</p>
              </div>
            </div>

            <p className="text-[9px] text-slate-400 leading-tight truncate">
              Connecting Truckers with Opportunities
            </p>

            <div className="flex items-center justify-between pt-1 border-t border-[#1E2C3F]/60 text-[9px] font-mono">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                System Online
              </span>
              <span className="text-slate-500">v2.4 Pro</span>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
};

