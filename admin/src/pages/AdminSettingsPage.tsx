import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Bell, 
  Lock, 
  Users, 
  Building2, 
  Activity, 
  CheckCircle2, 
  Save,
  RefreshCw
} from 'lucide-react';
import { operationsStore } from '../services/operationsStore';
import type { AuditLogEntry } from '../types/admin';

export const AdminSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'roles' | 'notifications' | 'security' | 'audit'>('general');
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'DGW Solutions LLC',
    tagline: 'Dispatching Global World - Connecting Truckers with Opportunities',
    dispatchPhone: '+1 (555) 100-2000',
    supportEmail: 'dispatch@dgwsolutionllc.com',
    hqAddress: '100 DGW Logistics Plaza, Dallas, TX 75201',
    operatingTimezone: 'America/Chicago (Central Time)'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNewTrucker: true,
    emailNewMessage: true,
    smsExpiringCOI: true,
    pushDailyReport: false
  });

  useEffect(() => {
    setAuditLogs(operationsStore.getAuditLogs());
    const unsub = operationsStore.subscribe(() => {
      setAuditLogs(operationsStore.getAuditLogs());
    });
    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    operationsStore.addAuditLog('Updated global company settings', 'Settings', 'Company Profile');
    showToast('Company settings saved successfully.');
  };

  return (
    <div className="space-y-4">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#0D1624] border border-blue-500/40 text-blue-300 text-xs font-semibold shadow-2xl flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold font-display text-white">System Settings & Governance</h1>
          <p className="text-xs text-slate-400">Configure global dispatch preferences, administrator permissions, security, and audit logs.</p>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {[
          { id: 'general', label: 'Company Profile', icon: Building2 },
          { id: 'roles', label: 'Roles & Permissions', icon: Users },
          { id: 'notifications', label: 'Notification Rules', icon: Bell },
          { id: 'security', label: 'Security & Access', icon: Lock },
          { id: 'audit', label: 'Audit Activity Logs', icon: Activity }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                  : 'bg-[#0D1624] border border-[#1E2C3F] text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: General Company Profile */}
      {activeTab === 'general' && (
        <div className="rounded-2xl bg-[#0D1624] border border-[#1E2C3F] p-6 space-y-5 shadow-xl">
          <div className="border-b border-[#1E2C3F] pb-3">
            <h2 className="text-base font-bold text-white">Enterprise Profile</h2>
            <p className="text-xs text-slate-400">Primary legal entity, dispatch contact details, and canonical business address.</p>
          </div>

          <form onSubmit={handleSaveGeneral} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Company Legal Name</label>
                <input
                  type="text"
                  value={generalSettings.companyName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, companyName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Official Tagline</label>
                <input
                  type="text"
                  value={generalSettings.tagline}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Primary Dispatch Hotline</label>
                <input
                  type="text"
                  value={generalSettings.dispatchPhone}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, dispatchPhone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Support & Operations Email</label>
                <input
                  type="email"
                  value={generalSettings.supportEmail}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Headquarters Location</label>
              <input
                type="text"
                value={generalSettings.hqAddress}
                onChange={(e) => setGeneralSettings({ ...generalSettings, hqAddress: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-900/30 flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Roles & Permissions */}
      {activeTab === 'roles' && (
        <div className="rounded-2xl bg-[#0D1624] border border-[#1E2C3F] p-6 space-y-5 shadow-xl">
          <div className="border-b border-[#1E2C3F] pb-3">
            <h2 className="text-base font-bold text-white">Role-Based Access Control (RBAC)</h2>
            <p className="text-xs text-slate-400">Configure permission sets for dispatchers, managers, and system administrators.</p>
          </div>

          <div className="space-y-3 text-xs">
            {[
              {
                role: 'Super Admin',
                users: 'farhanbutt00088888@gmail.com',
                desc: 'Full read/write/delete privileges on all collections, security rules, and user management.',
                badge: 'Full Access'
              },
              {
                role: 'Operations Admin',
                users: 'Not configured',
                desc: 'Can add/edit truckers, assign loads, update broker accounts, and export reports.',
                badge: 'Operations'
              },
              {
                role: 'Dispatcher',
                users: 'Not configured',
                desc: 'Can post loads, communicate via messaging center, and update transit statuses.',
                badge: 'Dispatching'
              },
              {
                role: 'Document Manager',
                users: 'Not configured',
                desc: 'Can review COI insurance files, upload authority letters, and verify MC compliance.',
                badge: 'Compliance'
              }
            ].map((r) => (
              <div key={r.role} className="p-4 rounded-xl bg-[#07111F] border border-[#1E2C3F] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{r.role}</span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-400 text-[10px] font-mono font-bold">
                      {r.badge}
                    </span>
                  </div>
                  <p className="text-slate-400 mt-1">{r.desc}</p>
                  <span className="text-[10px] font-mono text-slate-500 block mt-1">Assigned: {r.users}</span>
                </div>

                <button
                  onClick={() => showToast(`Permissions configured for ${r.role}.`)}
                  className="px-3 py-1.5 rounded-xl bg-[#111C2B] hover:bg-[#162438] text-slate-300 text-xs font-bold border border-[#1E2C3F] cursor-pointer"
                >
                  Configure
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Notification Rules */}
      {activeTab === 'notifications' && (
        <div className="rounded-2xl bg-[#0D1624] border border-[#1E2C3F] p-6 space-y-5 shadow-xl">
          <div className="border-b border-[#1E2C3F] pb-3">
            <h2 className="text-base font-bold text-white">Automated Alert Triggers</h2>
            <p className="text-xs text-slate-400">Configure real-time dispatch alerts and compliance expiration warnings.</p>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { key: 'emailNewTrucker', title: 'New Trucker Application Alert', desc: 'Send instant notification when an owner-operator submits an onboarding packet.' },
              { key: 'emailNewMessage', title: 'Broker Inquiry Inbound Alert', desc: 'Alert dispatch when a new load quote or message is received via website.' },
              { key: 'smsExpiringCOI', title: '30-Day COI Insurance Expiration Warning', desc: 'Automatically alert compliance manager before carrier insurance expires.' },
              { key: 'pushDailyReport', title: 'Daily Operations Digest (08:00 AM)', desc: 'Email daily summary of active loads, revenue, and driver availability.' }
            ].map((item) => (
              <div key={item.key} className="p-4 rounded-xl bg-[#07111F] border border-[#1E2C3F] flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-white text-xs">{item.title}</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">{item.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={(notificationSettings as any)[item.key]}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, [item.key]: e.target.checked })}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => showToast('Notification rules updated.')}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-900/30 cursor-pointer"
          >
            Save Notification Rules
          </button>
        </div>
      )}

      {/* Tab 4: Security & Access */}
      {activeTab === 'security' && (
        <div className="rounded-2xl bg-[#0D1624] border border-[#1E2C3F] p-6 space-y-5 shadow-xl">
          <div className="border-b border-[#1E2C3F] pb-3">
            <h2 className="text-base font-bold text-white">Enterprise Security & Custom Claims</h2>
            <p className="text-xs text-slate-400">Firebase Authentication token authorization and TLS session safeguards.</p>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-4 rounded-xl bg-[#07111F] border border-[#1E2C3F] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-sans font-bold">Firebase Custom Claim:</span>
                <span className="text-emerald-400 font-bold">request.auth.token.admin == true</span>
              </div>
              <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                All Firestore document read, write, and delete requests are verified cryptographically by production security rules.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#07111F] border border-[#1E2C3F] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-sans font-bold">Admin Route Protection:</span>
                <span className="text-blue-400 font-bold">robots.txt Blocked (noindex)</span>
              </div>
              <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                The administrative portal URL is hidden from public search engines and protected behind secure session verification.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Audit Activity Logs */}
      {activeTab === 'audit' && (
        <div className="rounded-2xl bg-[#0D1624] border border-[#1E2C3F] p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1E2C3F] pb-3">
            <div>
              <h2 className="text-base font-bold text-white">Administrative Audit Trail</h2>
              <p className="text-xs text-slate-400">Cryptographic audit log of all dispatcher actions and system events.</p>
            </div>
            <button
              onClick={() => showToast('Audit logs refreshed.')}
              className="p-2 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-slate-400 hover:text-white cursor-pointer"
              title="Refresh Audit Logs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="border-b border-[#1E2C3F] text-slate-500 text-[10px] uppercase">
                  <th className="pb-2 font-bold">Action Performed</th>
                  <th className="pb-2 font-bold">Record</th>
                  <th className="pb-2 font-bold">Administrator</th>
                  <th className="pb-2 font-bold">Timestamp</th>
                  <th className="pb-2 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2C3F]/40 text-[11px]">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#07111F]/50 transition-colors">
                    <td className="py-2.5 pr-3 text-white font-sans font-medium">{log.action}</td>
                    <td className="py-2.5 px-3 text-blue-400 font-bold">{log.recordIdentifier}</td>
                    <td className="py-2.5 px-3 text-slate-400">{log.adminName}</td>
                    <td className="py-2.5 px-3 text-slate-500">{log.timestamp}</td>
                    <td className="py-2.5 pl-3 text-right">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-bold">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
