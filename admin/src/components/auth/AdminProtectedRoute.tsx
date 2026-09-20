import React from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ShieldAlert, Loader2 } from 'lucide-react';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  onRedirectToLogin: () => void;
}

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ 
  children, 
  onRedirectToLogin 
}) => {
  const { isAuthenticated, isLoading, user } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#07111F] flex flex-col items-center justify-center p-4 text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
          <span className="font-mono text-xs text-slate-400 tracking-wider uppercase">Verifying Administrator Session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#07111F] flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#0D1624] border border-[#1E2C3F] space-y-6 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-center justify-center text-red-400 mx-auto">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold font-display text-white tracking-tight">Authentication Required</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              You must be signed in with an authorized DGW administrator account to access this management dashboard.
            </p>
          </div>

          <button
            onClick={onRedirectToLogin}
            className="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-lg shadow-blue-900/30 cursor-pointer"
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
