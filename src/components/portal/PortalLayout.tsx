import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Truck, 
  Clock, 
  Building2, 
  FileText, 
  DollarSign, 
  Navigation, 
  BarChart3, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Menu,
  Layers
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { CommandPalette } from './CommandPalette';
import { PORTAL_SAMPLE_NOTIFICATIONS } from '../../data/portalData';

interface PortalLayoutProps {
  currentView: string;
  onNavigateView: (view: string) => void;
  children: React.ReactNode;
  onSelectLoad?: (loadId: string) => void;
}

export const PortalLayout: React.FC<PortalLayoutProps> = ({
  currentView,
  onNavigateView,
  children,
  onSelectLoad
}) => {
  const { user, logout, loginWithGoogle } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: 'Live' },
    { id: 'load-board', label: 'Load Board', icon: Search, badge: '186' },
    { id: 'my-loads', label: 'My Loads', icon: Truck, badge: '7' },
    { id: 'dispatch', label: 'Dispatch Center', icon: Clock },
    { id: 'carriers', label: 'Carriers Database', icon: Truck },
    { id: 'brokers', label: 'Broker Directory', icon: Building2 },
    { id: 'equipment', label: 'Equipment & Fleet', icon: Layers },
    { id: 'documents', label: 'Document Center', icon: FileText, badge: '1 Exp' },
    { id: 'payments', label: 'Payment & Factoring', icon: DollarSign },
    { id: 'routes', label: 'Live US Map / Routes', icon: Navigation },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '2' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: '4' },
    { id: 'settings', label: 'Settings & Profile', icon: Settings },
  ];

  const unreadNotifsCount = PORTAL_SAMPLE_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex font-sans">
      
      {/* ========================================================================= */}
      {/* 1. COLLAPSIBLE LEFT SIDEBAR                                               */}
      {/* ========================================================================= */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen z-40 bg-slate-950/85 backdrop-blur-2xl text-white border-r border-white/10 flex flex-col justify-between transition-all duration-300 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            {/* Logo Emblem */}
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-orange to-amber-500 flex items-center justify-center text-white shrink-0 shadow-glow-orange">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-white transform -rotate-45 translate-x-0.5">
                <path d="M12 2L2 22l10-4 10 4L12 2z" />
              </svg>
            </div>

            {!sidebarCollapsed && (
              <div className="flex flex-col truncate animate-in fade-in duration-200">
                <span className="font-display font-black text-sm tracking-tight text-white leading-tight">
                  DGW<span className="text-brand-orange">SOLUTIONS</span>
                </span>
                <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">
                  DISPATCH COMMAND
                </span>
              </div>
            )}
          </div>

          {/* Collapse Toggle Button (Desktop) */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Links List */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 text-xs">
          {navItems.map((item) => {
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigateView(item.id);
                  setMobileSidebarOpen(false);
                }}
                className={`w-full p-2.5 rounded-xl flex items-center gap-3 transition-all group relative ${
                  isActive
                    ? 'bg-brand-orange text-white font-bold shadow-glow-orange'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80 font-medium'
                } ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-brand-orange transition-colors'}`} />
                  {!sidebarCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </div>

                {!sidebarCollapsed && item.badge && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                    isActive ? 'bg-white text-slate-900' : 'bg-slate-800 text-brand-orange'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer User Info & Status */}
        <div className="p-3.5 border-t border-white/10 bg-slate-950/60">
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="relative shrink-0">
                <img
                  src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
                  alt={user?.name || 'User'}
                  className="w-8 h-8 rounded-full border border-brand-orange object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-900" />
              </div>

              {!sidebarCollapsed && (
                <div className="flex flex-col truncate">
                  <span className="font-bold text-xs text-white truncate">{user?.name || 'Robert Vance'}</span>
                  <span className="text-[10px] font-mono text-brand-orange uppercase">{user?.role || 'Carrier'}</span>
                </div>
              )}
            </div>

            {!sidebarCollapsed && (
              <button
                onClick={logout}
                className="p-1.5 rounded-xl hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-slate-950/70 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT AREA                                                      */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Operations Navbar */}
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg px-4 sm:px-6 py-3 flex items-center justify-between gap-4 text-white">
          
          {/* Mobile Hamburger + Global Search Bar */}
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-white/10"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Global Search Bar (Opens Command Palette on click) */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-2xl bg-slate-900/90 hover:bg-slate-900 border border-white/10 text-slate-400 hover:text-slate-200 transition-colors text-xs text-left shadow-inner"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="truncate">Search MC number, load, carrier, broker, ZIP...</span>
              </div>
              <span className="hidden sm:inline font-mono text-[10px] bg-slate-800 px-2 py-0.5 rounded border border-white/10 text-slate-300 font-bold">
                Ctrl + K
              </span>
            </button>
          </div>

          {/* Right Header Operations Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Telematics Indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>LIVE TELEMATICS</span>
            </div>

            {/* Quick Actions Dropdown */}
            <div className="relative">
              <button
                onClick={() => setQuickActionsOpen(!quickActionsOpen)}
                className="px-3 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold transition-all shadow-glow-orange flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Quick Actions</span>
              </button>

              {quickActionsOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-white/15 shadow-2xl p-2 z-50 text-xs text-white animate-in fade-in"
                  onMouseLeave={() => setQuickActionsOpen(false)}
                >
                  <button
                    onClick={() => {
                      onNavigateView('load-board');
                      setQuickActionsOpen(false);
                    }}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-slate-800 text-slate-200 hover:text-white font-semibold flex items-center gap-2"
                  >
                    <Search className="w-4 h-4 text-brand-orange" />
                    <span>Scan Matching Loads</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigateView('documents');
                      setQuickActionsOpen(false);
                    }}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-slate-800 text-slate-200 hover:text-white font-semibold flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>Upload Signed POD / BOL</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigateView('routes');
                      setQuickActionsOpen(false);
                    }}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-slate-800 text-slate-200 hover:text-white font-semibold flex items-center gap-2"
                  >
                    <Navigation className="w-4 h-4 text-emerald-400" />
                    <span>Open US Freight Map</span>
                  </button>
                </div>
              )}
            </div>

            {/* Role Switcher Pill */}
            <div className="hidden xl:flex items-center p-1 rounded-xl bg-slate-900 border border-white/10 text-xs">
              <button
                onClick={() => loginWithGoogle('carrier')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  user?.role === 'carrier' ? 'bg-brand-orange text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Carrier
              </button>
              <button
                onClick={() => loginWithGoogle('broker')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  user?.role === 'broker' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Broker
              </button>
              <button
                onClick={() => loginWithGoogle('admin')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  user?.role === 'admin' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>

            {/* Messages Icon */}
            <button
              onClick={() => onNavigateView('messages')}
              className="relative p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 text-slate-300 hover:text-white border border-white/10 transition-colors"
              title="Dispatcher Messages"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-orange" />
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 text-slate-300 hover:text-white border border-white/10 transition-colors"
                title="Operational Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-mono font-bold flex items-center justify-center">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-900 border border-white/15 shadow-2xl p-4 z-50 text-xs space-y-3 animate-in fade-in text-white"
                  onMouseLeave={() => setNotifDropdownOpen(false)}
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-bold text-white">Notifications ({PORTAL_SAMPLE_NOTIFICATIONS.length})</span>
                    <button 
                      onClick={() => onNavigateView('notifications')} 
                      className="text-brand-orange hover:underline text-[11px]"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {PORTAL_SAMPLE_NOTIFICATIONS.slice(0, 3).map((notif) => (
                      <div key={notif.id} className="p-2.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{notif.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{notif.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-300">{notif.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Click */}
            <button
              onClick={() => onNavigateView('settings')}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-800"
            >
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
                alt={user?.name || 'User'}
                className="w-8 h-8 rounded-full border border-brand-orange object-cover"
              />
            </button>

          </div>
        </header>

        {/* Main Body Dynamic View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>

      </div>

      {/* Global Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigateView={onNavigateView}
        onSelectLoad={onSelectLoad}
      />

    </div>
  );
};
