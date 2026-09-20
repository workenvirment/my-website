import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { AdminProtectedRoute } from './components/auth/AdminProtectedRoute';
import { AdminLayout } from './components/layout/AdminLayout';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { Loader2 } from 'lucide-react';

const AdminCarrierLeadsPage = lazy(() => import('./pages/AdminCarrierLeadsPage').then(m => ({ default: m.AdminCarrierLeadsPage })));
const AdminTruckersPage = lazy(() => import('./pages/AdminTruckersPage').then(m => ({ default: m.AdminTruckersPage })));
const AdminBrokersPage = lazy(() => import('./pages/AdminBrokersPage').then(m => ({ default: m.AdminBrokersPage })));
const AdminLoadsPage = lazy(() => import('./pages/AdminLoadsPage').then(m => ({ default: m.AdminLoadsPage })));
const AdminMessagesPage = lazy(() => import('./pages/AdminMessagesPage').then(m => ({ default: m.AdminMessagesPage })));
const AdminDocumentsPage = lazy(() => import('./pages/AdminDocumentsPage').then(m => ({ default: m.AdminDocumentsPage })));
const AdminMCLookupPage = lazy(() => import('./pages/AdminMCLookupPage').then(m => ({ default: m.AdminMCLookupPage })));
const AdminReportsPage = lazy(() => import('./pages/AdminReportsPage').then(m => ({ default: m.AdminReportsPage })));
const AdminSettingsPage = lazy(() => import('./pages/AdminSettingsPage').then(m => ({ default: m.AdminSettingsPage })));

const PageLoader = () => (
  <div className="py-20 flex flex-col items-center justify-center space-y-3 text-slate-400">
    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
    <span className="text-xs font-mono">Loading operations module...</span>
  </div>
);

const AdminRouter: React.FC = () => {
  const { isAuthenticated } = useAdminAuth();
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    try {
      const path = window.location.pathname;
      if (path === '/login') return '/login';
      if (path === '/leads') return '/leads';
      if (path === '/truckers') return '/truckers';
      if (path === '/brokers') return '/brokers';
      if (path === '/loads') return '/loads';
      if (path === '/messages') return '/messages';
      if (path === '/documents') return '/documents';
      if (path === '/mc-lookup') return '/mc-lookup';
      if (path === '/reports') return '/reports';
      if (path === '/settings') return '/settings';
      return '/dashboard';
    } catch {
      return '/dashboard';
    }
  });

  useEffect(() => {
    const handlePopState = () => {
      try {
        const path = window.location.pathname;
        if (path === '/login') setCurrentRoute('/login');
        else if (path === '/leads') setCurrentRoute('/leads');
        else if (path === '/truckers') setCurrentRoute('/truckers');
        else if (path === '/brokers') setCurrentRoute('/brokers');
        else if (path === '/loads') setCurrentRoute('/loads');
        else if (path === '/messages') setCurrentRoute('/messages');
        else if (path === '/documents') setCurrentRoute('/documents');
        else if (path === '/mc-lookup') setCurrentRoute('/mc-lookup');
        else if (path === '/reports') setCurrentRoute('/reports');
        else if (path === '/settings') setCurrentRoute('/settings');
        else setCurrentRoute('/dashboard');
      } catch {
        setCurrentRoute('/dashboard');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: string) => {
    try {
      if (window.location.pathname !== route) {
        window.history.pushState({}, '', route);
      }
      setCurrentRoute(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setCurrentRoute(route);
    }
  };

  // If unauthenticated and on protected route, redirect to login
  useEffect(() => {
    if (!isAuthenticated && currentRoute !== '/login') {
      navigate('/login');
    } else if (isAuthenticated && currentRoute === '/login') {
      navigate('/dashboard');
    }
  }, [isAuthenticated, currentRoute]);

  if (currentRoute === '/login') {
    return <AdminLoginPage onLoginSuccess={() => navigate('/dashboard')} />;
  }

  const handleQuickAction = (action: 'add-trucker' | 'add-broker' | 'post-load' | 'send-message') => {
    if (action === 'add-trucker') navigate('/truckers');
    else if (action === 'add-broker') navigate('/brokers');
    else if (action === 'post-load') navigate('/loads');
    else if (action === 'send-message') navigate('/messages');
  };

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case '/leads':
        return <AdminCarrierLeadsPage onNavigate={navigate} />;
      case '/truckers':
        return <AdminTruckersPage onNavigate={navigate} />;
      case '/brokers':
        return <AdminBrokersPage onNavigate={navigate} />;
      case '/loads':
        return <AdminLoadsPage onNavigate={navigate} />;
      case '/messages':
        return <AdminMessagesPage onNavigate={navigate} />;
      case '/documents':
        return <AdminDocumentsPage onNavigate={navigate} />;
      case '/mc-lookup':
        return <AdminMCLookupPage />;
      case '/reports':
        return <AdminReportsPage />;
      case '/settings':
        return <AdminSettingsPage />;
      case '/dashboard':
      default:
        return <AdminDashboardPage onNavigate={navigate} />;
    }
  };

  return (
    <AdminProtectedRoute onRedirectToLogin={() => navigate('/login')}>
      <AdminLayout 
        currentRoute={currentRoute} 
        onRouteChange={navigate}
        onOpenQuickAction={handleQuickAction}
      >
        <Suspense fallback={<PageLoader />}>
          {renderCurrentPage()}
        </Suspense>
      </AdminLayout>
    </AdminProtectedRoute>
  );
};

export const AdminApp: React.FC = () => {
  return (
    <AdminAuthProvider>
      <AdminRouter />
    </AdminAuthProvider>
  );
};

export default AdminApp;
