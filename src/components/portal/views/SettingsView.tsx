import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Save,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export const SettingsView: React.FC = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || 'Robert Vance');
  const [email, setEmail] = useState(user?.email || 'dispatch@vancefreight.com');
  const [phone, setPhone] = useState(user?.phone || '(214) 555-8942');
  const [company, setCompany] = useState(user?.companyName || 'Vance Freight Lines LLC');
  const [mc, setMc] = useState(user?.mcNumber || 'MC-994821');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
            Account & Security Settings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your Google Workspace authentication profile, company credentials, and security preferences
          </p>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs border border-red-200 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out Session</span>
        </button>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Profile Card */}
        <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
              alt={user?.name}
              className="w-16 h-16 rounded-full border-2 border-brand-orange object-cover shadow-sm"
            />
            <div>
              <span className="font-display font-black text-slate-900 text-lg">{user?.name}</span>
              <p className="text-xs text-slate-500 font-mono">{user?.companyName} • Role: {user?.role.toUpperCase()}</p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold mt-1 inline-block">
                GOOGLE OAUTH 2.0 CONNECTED
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-700 font-bold block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange font-medium"
              />
            </div>

            <div>
              <label className="text-slate-700 font-bold block mb-1">Google Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange font-medium"
              />
            </div>

            <div>
              <label className="text-slate-700 font-bold block mb-1">Company / Entity Name</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange font-medium"
              />
            </div>

            <div>
              <label className="text-slate-700 font-bold block mb-1">MC Number / DOT</label>
              <input
                type="text"
                value={mc}
                onChange={(e) => setMc(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-slate-700 font-bold block mb-1">Direct Dispatch Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange font-medium"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            {savedNotice ? (
              <span className="text-emerald-700 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Profile preferences updated successfully!</span>
              </span>
            ) : <div />}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold transition-all shadow-glow-orange flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Security & Sessions */}
        <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs">
          <div className="flex items-center gap-2 text-slate-900 font-display font-black text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Security & Authentication Status</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 text-xs block">Single Sign-On (Google Workspace)</span>
              <span className="text-slate-500">OAuth 2.0 Token authenticated • Zero passwords stored on server</span>
            </div>
            <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-bold font-mono text-[10px]">
              ACTIVE
            </span>
          </div>
        </div>

      </form>

    </div>
  );
};
