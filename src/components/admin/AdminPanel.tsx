import React, { useState } from 'react';
import { 
  Users, 
  Megaphone, 
  Database, 
  Activity, 
  Search, 
  Trash2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PLATFORM_ANNOUNCEMENTS } from '../../data/announcementsData';
import { INITIAL_ACTIVITY_LOGS } from '../../data/activityLogsData';
import { MC_DATABASE_RECORDS } from '../../data/mcDatabase';
import type { UserProfile, UserRole, AnnouncementItem, ActivityLogItem } from '../../types';

export const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'announcements' | 'mc-database' | 'logs'>('users');

  // User Management State
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [usersList, setUsersList] = useState<UserProfile[]>([
    {
      id: 'usr-saad-01',
      name: 'Saad Altaf',
      email: 'saad.altaf@dgwsolutions.com',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
      role: 'super-admin',
      companyName: 'DGW SOLUTIONS LLC (Sole MBR)',
      phone: '+1 (800) DGW-LOAD',
      status: 'active',
      loginMethod: 'google'
    },
    {
      id: 'usr-vance-101',
      name: 'Robert Vance',
      email: 'robert.vance@vancefreight.com',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      role: 'carrier',
      companyName: 'Vance Freight Logistics LLC',
      mcNumber: 'MC-984210',
      phone: '(214) 555-8942',
      status: 'active',
      loginMethod: 'google'
    },
    {
      id: 'usr-travis-202',
      name: 'Travis Cole',
      email: 'travis.cole@lonestarhotshot.com',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      role: 'owner-operator',
      companyName: 'Lone Star Hotshot Express LLC',
      mcNumber: 'MC-1198302',
      phone: '(432) 555-8910',
      status: 'active',
      loginMethod: 'email'
    },
    {
      id: 'usr-apex-301',
      name: 'Marcus Brody',
      email: 'mbrody@apex3pl.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      role: 'broker',
      companyName: 'Apex 3PL Global Logistics Inc',
      mcNumber: 'MC-894201',
      phone: '(404) 555-3210',
      status: 'active',
      loginMethod: 'google'
    },
    {
      id: 'usr-ops-admin',
      name: 'Elena Rostova',
      email: 'operations@dgwsolutions.com',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      role: 'admin',
      companyName: 'DGW Command Operations HQ',
      phone: '(303) 555-7194',
      status: 'active',
      loginMethod: 'email'
    }
  ]);

  // Announcements State
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(PLATFORM_ANNOUNCEMENTS);
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnMessage, setNewAnnMessage] = useState('');
  const [newAnnPriority, setNewAnnPriority] = useState<'normal' | 'high' | 'urgent'>('normal');

  // Activity Logs State
  const [logs] = useState<ActivityLogItem[]>(INITIAL_ACTIVITY_LOGS);

  // Toggle user status
  const handleToggleUserStatus = (userId: string) => {
    setUsersList(usersList.map(u => {
      if (u.id === userId) {
        return { ...u, status: u.status === 'active' ? 'suspended' : 'active' };
      }
      return u;
    }));
  };

  // Change user role
  const handleChangeUserRole = (userId: string, newRole: UserRole) => {
    setUsersList(usersList.map(u => {
      if (u.id === userId) {
        return { ...u, role: newRole };
      }
      return u;
    }));
  };

  // Delete user
  const handleDeleteUser = (userId: string) => {
    if (userId === 'usr-saad-01') {
      alert('Cannot delete Super Admin account.');
      return;
    }
    setUsersList(usersList.filter(u => u.id !== userId));
  };

  // Add announcement
  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle || !newAnnMessage) return;

    const entry: AnnouncementItem = {
      id: `ann-${Date.now()}`,
      title: newAnnTitle,
      message: newAnnMessage,
      priority: newAnnPriority,
      category: 'Platform Update',
      createdAt: new Date().toLocaleString(),
      author: user?.name || 'Administrator',
      active: true
    };

    setAnnouncements([entry, ...announcements]);
    setNewAnnTitle('');
    setNewAnnMessage('');
  };

  const filteredUsers = usersList.filter(u => {
    const matchQ = !userSearch || 
      u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
      u.email.toLowerCase().includes(userSearch.toLowerCase()) || 
      u.companyName.toLowerCase().includes(userSearch.toLowerCase());
    
    if (!matchQ) return false;
    if (roleFilter !== 'All' && u.role !== roleFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8 text-white">
      
      {/* Header Admin Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/30 text-xs font-mono font-bold uppercase">
              👑 SUPER ADMIN CONTROL PANEL
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Denver HQ Central Console
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
            DGW Platform & Security Administration
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Managing DGW Solutions LLC • Saad Altaf (Sole MBR) • EIN 42-4868007
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap rounded-2xl bg-slate-950 p-1 border border-white/10 text-xs font-bold">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'users' ? 'bg-brand-orange text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Users ({usersList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'announcements' ? 'bg-brand-orange text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>Announcements</span>
          </button>

          <button
            onClick={() => setActiveTab('mc-database')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'mc-database' ? 'bg-brand-orange text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>MC Database ({MC_DATABASE_RECORDS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'logs' ? 'bg-brand-orange text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Audit Logs</span>
          </button>
        </div>
      </div>

      {/* TAB 1: USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search user name, email, or company..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-brand-orange"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Filter Role:</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-bold focus:outline-none focus:border-brand-orange"
              >
                <option value="All">All Roles</option>
                <option value="super-admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="carrier">Carrier</option>
                <option value="owner-operator">Owner Operator</option>
                <option value="broker">Broker</option>
              </select>
            </div>
          </div>

          {/* User Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-white/10">
                <tr>
                  <th className="p-3">User & Company</th>
                  <th className="p-3">Operating Role</th>
                  <th className="p-3">Contact & Phone</th>
                  <th className="p-3">Account Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-950/60 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatarUrl}
                          alt={u.name}
                          className="w-8 h-8 rounded-full border border-white/10 object-cover"
                        />
                        <div>
                          <span className="font-bold text-white block">{u.name}</span>
                          <span className="text-[11px] text-slate-400">{u.companyName}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3">
                      <select
                        value={u.role}
                        onChange={(e) => handleChangeUserRole(u.id, e.target.value as UserRole)}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 border border-white/10 text-brand-orange font-mono font-bold text-xs"
                      >
                        <option value="super-admin">👑 Super Admin</option>
                        <option value="admin">🛠 Admin</option>
                        <option value="carrier">🚛 Carrier</option>
                        <option value="owner-operator">👨‍✈️ Owner Op</option>
                        <option value="dispatcher">📦 Dispatcher</option>
                        <option value="broker">🏢 Broker</option>
                        <option value="standard">👤 Standard</option>
                      </select>
                    </td>

                    <td className="p-3 font-mono">
                      <div className="text-slate-300">{u.email}</div>
                      <div className="text-[10px] text-slate-500">{u.phone || 'N/A'}</div>
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => handleToggleUserStatus(u.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all ${
                          u.status === 'active'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                            : 'bg-red-950 text-red-400 border border-red-500/40'
                        }`}
                      >
                        {u.status === 'active' ? '🟢 ACTIVE' : '🔴 SUSPENDED'}
                      </button>
                    </td>

                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-1.5 rounded-lg bg-slate-950 hover:bg-red-900/40 text-slate-400 hover:text-red-400 transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* TAB 2: ANNOUNCEMENT BROADCAST */}
      {activeTab === 'announcements' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Create Announcement Form */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4 text-xs">
            <span className="font-mono text-brand-orange font-bold uppercase block text-xs">
              BROADCAST PLATFORM ANNOUNCEMENT
            </span>
            <form onSubmit={handleCreateAnnouncement} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Announcement Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Severe Weather Pass Advisory"
                  value={newAnnTitle}
                  onChange={(e) => setNewAnnTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Broadcast Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detailed logistics or safety advisory..."
                  value={newAnnMessage}
                  onChange={(e) => setNewAnnMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Priority Level</label>
                <select
                  value={newAnnPriority}
                  onChange={(e) => setNewAnnPriority(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-brand-orange"
                >
                  <option value="normal">Normal Information</option>
                  <option value="high">High Market Alert</option>
                  <option value="urgent">Urgent Road/Safety Warning</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold transition-all shadow-glow-orange"
              >
                Broadcast to Platform
              </button>
            </form>
          </div>

          {/* Active Announcements List */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
            <span className="font-bold text-sm text-white block">Active System Announcements ({announcements.length})</span>
            <div className="space-y-3">
              {announcements.map((ann) => (
                <div key={ann.id} className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        ann.priority === 'urgent' ? 'bg-red-950 text-red-400 border border-red-500/40' : 'bg-brand-orange/20 text-brand-orange'
                      }`}>
                        {ann.priority.toUpperCase()}
                      </span>
                      <span className="font-bold text-white text-sm">{ann.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{ann.createdAt}</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{ann.message}</p>
                  <div className="text-[10px] text-slate-500 font-mono">Dispatched by: {ann.author}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: MC DATABASE */}
      {activeTab === 'mc-database' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-white">FMCSA Registry Master Database</span>
            <span className="text-xs font-mono text-emerald-400">Direct FMCSA Sync: ACTIVE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {MC_DATABASE_RECORDS.map((rec) => (
              <div key={rec.id} className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{rec.legalName}</span>
                  <span className="font-mono text-brand-orange font-bold text-[10px]">{rec.mcNumber}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {rec.address.city}, {rec.address.state} • {rec.powerUnits} Trucks • {rec.safetyRating}
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>DOT: {rec.dotNumber}</span>
                  <span>BIPD: ${(rec.insurance.bipdOnFile / 1000000).toFixed(1)}M Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT LOGS */}
      {activeTab === 'logs' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
          <span className="font-bold text-sm text-white block">Platform Security & Audit Trail</span>
          <div className="space-y-2.5">
            {logs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{log.userName}</span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-800 text-brand-orange">{log.userRole}</span>
                    <span className="text-slate-400 font-mono">• {log.action}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{log.details}</p>
                </div>
                <div className="text-right text-[10px] font-mono text-slate-500 shrink-0">
                  <div>{log.timestamp}</div>
                  <div>IP: {log.ipAddress}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
