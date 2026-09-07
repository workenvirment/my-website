import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from '../components/auth/AuthModal';
import { PortalLayout } from '../components/portal/PortalLayout';
import { LoadBoardView } from '../components/portal/views/LoadBoardView';
import { MyLoadsView } from '../components/portal/views/MyLoadsView';
import { DispatchCenterView } from '../components/portal/views/DispatchCenterView';
import { CarriersDirectoryView } from '../components/portal/views/CarriersDirectoryView';
import { BrokersDirectoryView } from '../components/portal/views/BrokersDirectoryView';
import { EquipmentCenterView } from '../components/portal/views/EquipmentCenterView';
import { DocumentManagerView } from '../components/portal/views/DocumentManagerView';
import { RoutePlannerView } from '../components/portal/views/RoutePlannerView';
import { PaymentCenterView } from '../components/portal/views/PaymentCenterView';
import { MessagesView } from '../components/portal/views/MessagesView';
import { NotificationsView } from '../components/portal/views/NotificationsView';
import { SettingsView } from '../components/portal/views/SettingsView';
import { LoadDetailsDrawer } from '../components/portal/LoadDetailsDrawer';
import { UserDashboardView } from '../components/dashboard/UserDashboardView';
import { CarrierDashboardView } from '../components/dashboard/CarrierDashboardView';
import { OwnerOpDashboardView } from '../components/dashboard/OwnerOpDashboardView';
import { BrokerDashboardView } from '../components/dashboard/BrokerDashboardView';
import { AdminPanel } from '../components/admin/AdminPanel';
import { McSearchSystem } from '../components/mc/McSearchSystem';
import { InteractiveAnalytics } from '../components/analytics/InteractiveAnalytics';
import { SavedItemsManager } from '../components/saved/SavedItemsManager';
import { PORTAL_SAMPLE_LOADS } from '../data/portalData';
import type { PortalLoad } from '../data/portalData';
import { Truck, Building2 } from 'lucide-react';

interface PortalSimulatorPageProps {
  onNavigate?: (path: string) => void;
  initialView?: string;
}

export const PortalSimulatorPage: React.FC<PortalSimulatorPageProps> = ({ 
  onNavigate,
  initialView = 'dashboard'
}) => {
  const { user, isAuthenticated, loginWithGoogle } = useAuth();
  const [currentView, setCurrentView] = useState<string>(initialView);
  const [selectedLoadId, setSelectedLoadId] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    if (initialView) {
      setCurrentView(initialView);
    }
  }, [initialView]);

  const handleNavigateView = (view: string) => {
    setCurrentView(view);
    if (onNavigate) {
      if (['dashboard', 'portal', 'carrier-portal', 'owner-op-portal', 'broker-portal', 'admin-console', 'mc-search', 'saved-items'].includes(view)) {
        onNavigate('/' + view);
      }
    }
  };

  const selectedLoad: PortalLoad | null = selectedLoadId 
    ? PORTAL_SAMPLE_LOADS.find((l) => l.id === selectedLoadId) || PORTAL_SAMPLE_LOADS[0]
    : null;

  // Unauthenticated Welcome State
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[85vh] bg-slate-950 py-16 px-4 flex items-center justify-center text-white">
        <div className="w-full max-w-lg bg-slate-900 rounded-3xl border border-white/10 shadow-2xl p-8 sm:p-10 space-y-8 text-center">
          
          <div className="w-16 h-16 rounded-2xl bg-brand-orange/20 border border-brand-orange/40 text-brand-orange flex items-center justify-center mx-auto shadow-glow-orange">
            <Truck className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full border border-brand-orange/30">
              LOGISTICS COMMAND PLATFORM
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
              DGW Dispatch Command Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
              Sign in with your Google Workspace or email account to enter the full enterprise logistics and dispatch operations platform.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <button
              onClick={() => loginWithGoogle('carrier')}
              className="p-4 rounded-2xl border border-white/10 hover:border-brand-orange hover:bg-brand-orange/10 transition-all space-y-2 group bg-slate-950"
            >
              <div className="p-2 rounded-xl bg-slate-900 text-slate-300 group-hover:bg-brand-orange group-hover:text-white transition-colors w-fit">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white block text-xs">Carrier Fleet</span>
                <span className="text-[10px] text-slate-400">Sign In as Carrier</span>
              </div>
            </button>

            <button
              onClick={() => loginWithGoogle('broker')}
              className="p-4 rounded-2xl border border-white/10 hover:border-brand-orange hover:bg-brand-orange/10 transition-all space-y-2 group bg-slate-950"
            >
              <div className="p-2 rounded-xl bg-slate-900 text-slate-300 group-hover:bg-brand-orange group-hover:text-white transition-colors w-fit">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white block text-xs">Freight Broker</span>
                <span className="text-[10px] text-slate-400">Sign In as Broker</span>
              </div>
            </button>
          </div>

          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => setAuthModalOpen(true)}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover text-white font-bold text-xs shadow-glow-orange flex items-center justify-center gap-2 transition-all"
            >
              <span>Open Full Authentication & Role Selector</span>
            </button>
          </div>

        </div>

        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onSuccessNavigate={onNavigate}
        />
      </div>
    );
  }

  // Render Sub-Views inside Unified PortalLayout
  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
      case 'portal':
        return <UserDashboardView onNavigatePath={onNavigate} />;
      case 'carrier-portal':
      case 'fleet':
        return <CarrierDashboardView />;
      case 'owner-op-portal':
      case 'owner-operator':
        return <OwnerOpDashboardView />;
      case 'broker-portal':
        return <BrokerDashboardView />;
      case 'admin':
      case 'admin-console':
        return <AdminPanel />;
      case 'mc-search':
      case 'mc-lookup':
        return <McSearchSystem onNavigate={onNavigate} />;
      case 'load-board':
        return <LoadBoardView onSelectLoad={(id) => setSelectedLoadId(id)} />;
      case 'my-loads':
        return <MyLoadsView onSelectLoad={(id) => setSelectedLoadId(id)} onNavigateView={setCurrentView} />;
      case 'dispatch':
        return <DispatchCenterView onNavigateView={setCurrentView} onSelectLoad={(id) => setSelectedLoadId(id)} />;
      case 'carriers':
        return <CarriersDirectoryView />;
      case 'brokers':
        return <BrokersDirectoryView />;
      case 'equipment':
        return <EquipmentCenterView />;
      case 'documents':
        return <DocumentManagerView />;
      case 'routes':
        return <RoutePlannerView />;
      case 'payments':
        return <PaymentCenterView />;
      case 'analytics':
        return <InteractiveAnalytics />;
      case 'saved-items':
        return <SavedItemsManager onNavigate={onNavigate} />;
      case 'messages':
        return <MessagesView />;
      case 'notifications':
        return <NotificationsView onNavigateView={setCurrentView} />;
      case 'settings':
      case 'profile':
        return <SettingsView />;
      default:
        return <UserDashboardView onNavigatePath={onNavigate} />;
    }
  };

  return (
    <PortalLayout
      currentView={currentView}
      onNavigateView={handleNavigateView}
      onSelectLoad={(id) => setSelectedLoadId(id)}
    >
      {renderActiveView()}

      {/* Global Load Details Drawer */}
      <LoadDetailsDrawer
        load={selectedLoad}
        onClose={() => setSelectedLoadId(null)}
      />
    </PortalLayout>
  );
};
