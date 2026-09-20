import React, { useState } from 'react';
import { Settings, Server, CheckCircle2, User } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export const AdminSettingsPage: React.FC = () => {
  const { user, isFirebaseReady } = useAdminAuth();
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#0A1322] border border-[#1B293E] shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 border border-slate-700">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold font-display text-white tracking-tight">
            Platform Settings & Controls
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage system configurations, admin security credentials, and Firestore connection profiles.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Settings saved successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-5 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-[#1B293E] pb-3">
            <User className="w-4 h-4 text-blue-400" />
            <h2 className="text-xs font-bold font-display text-white">Administrator Account</h2>
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-slate-500 text-[10px] font-mono uppercase block">Authenticated Email</span>
              <span className="font-bold text-white">{user?.email || 'admin@dgwsolutionllc.com'}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] font-mono uppercase block">Security Role</span>
              <span className="font-bold text-emerald-400">Super Administrator (Custom Claims Active)</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-[#1B293E] pb-3">
            <Server className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-bold font-display text-white">Firebase & Firestore Status</h2>
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-slate-500 text-[10px] font-mono uppercase block">Database Connection</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {isFirebaseReady ? 'Live Firestore Connected' : 'Configuration Standby'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] font-mono uppercase block">Security Rules</span>
              <span className="font-mono text-slate-300">rules_version = '2' (Role Enforced)</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
