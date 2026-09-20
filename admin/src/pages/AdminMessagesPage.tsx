import React, { useState, useEffect, useMemo } from 'react';
import { 
  Mail, 
  Search, 
  Send, 
  Paperclip, 
  Phone, 
  X, 
  CheckCircle2, 
  Users
} from 'lucide-react';
import { operationsStore } from '../services/operationsStore';
import type { MessageThread, ChatMessage } from '../types/admin';

interface AdminMessagesPageProps {
  onNavigate?: (route: string) => void;
}

export const AdminMessagesPage: React.FC<AdminMessagesPageProps> = () => {
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string>('');
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkTemplate, setBulkTemplate] = useState('Load Available: 53ft Dry Van from Chicago, IL to Dallas, TX. Rate: $2,800. Contact DGW dispatch immediately if available.');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const list = operationsStore.getMessageThreads();
    setThreads(list);
    if (list.length > 0 && !activeThreadId) {
      setActiveThreadId(list[0].id);
    }

    const unsub = operationsStore.subscribe(() => {
      const updated = operationsStore.getMessageThreads();
      setThreads(updated);
    });
    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const activeThread = useMemo(() => {
    return threads.find((t) => t.id === activeThreadId) || threads[0] || null;
  }, [threads, activeThreadId]);

  const filteredThreads = useMemo(() => {
    return threads.filter((t) => {
      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      return (
        t.contactName.toLowerCase().includes(q) ||
        t.lastMessage.toLowerCase().includes(q) ||
        (t.mcNumber && t.mcNumber.toLowerCase().includes(q))
      );
    });
  }, [threads, searchTerm]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeThread) return;

    operationsStore.sendMessage(activeThread.id, messageInput.trim());
    setMessageInput('');
  };

  const handleApplyTemplate = (template: string) => {
    setMessageInput(template);
  };

  const handleSendBulk = () => {
    const count = operationsStore.sendBulkMessage(['all'], bulkTemplate);
    showToast(`Broadcast sent to ${count} carriers successfully.`);
    setIsBulkModalOpen(false);
  };

  const quickTemplates = [
    { label: 'Load Available', text: 'Load Available: Immediate dispatch needed for Chicago, IL to Dallas, TX. Rate: $2,800. Let us know if your unit is empty.' },
    { label: 'Document Reminder', text: 'Reminder: Please upload your updated Certificate of Insurance (COI) to avoid dispatch compliance hold.' },
    { label: 'Rate Confirmation', text: 'Rate confirmation has been sent to your registered email. Please sign and return before dispatch.' },
    { label: 'Dispatch Update', text: 'Dock appointment confirmed. Please check in at Door #14 upon arrival at the facility.' }
  ];

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-display text-white">Operations Messaging Center</h1>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 text-[10px] font-mono font-bold">
                {threads.length} Active Channels
              </span>
            </div>
            <p className="text-xs text-slate-400">Direct dispatch communication, load broadcasts, and document reminder alerts.</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsBulkModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-900/30 flex items-center gap-1.5 cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span>Broadcast Message</span>
          </button>
        </div>
      </div>

      {/* 3-Column Messaging Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[650px]">
        
        {/* Left: Conversation List (4 Columns) */}
        <div className="lg:col-span-4 rounded-2xl bg-[#0D1624] border border-[#1E2C3F] flex flex-col overflow-hidden shadow-md">
          <div className="p-3 border-b border-[#1E2C3F]">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#1E2C3F]/40 scrollbar-thin">
            {filteredThreads.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <Mail className="w-8 h-8 mx-auto mb-2 text-slate-600 opacity-40" />
                <p className="text-xs font-semibold text-slate-400">No message channels yet</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Incoming contact messages from the website will automatically appear here.</p>
              </div>
            ) : (
              filteredThreads.map((thread) => {
                const isSelected = activeThread?.id === thread.id;
                return (
                  <div
                    key={thread.id}
                    onClick={() => {
                      setActiveThreadId(thread.id);
                      operationsStore.markThreadRead(thread.id);
                    }}
                    className={`p-3 transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected ? 'bg-blue-600/15 border-l-4 border-l-blue-500' : 'hover:bg-[#111C2B]'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center font-mono text-xs shrink-0 border border-blue-500/30">
                      {thread.contactAvatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-white truncate">{thread.contactName}</p>
                        <span className="text-[10px] font-mono text-slate-500">{thread.lastMessageTime}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{thread.lastMessage}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#07111F] border border-[#1E2C3F] text-slate-400">
                          {thread.contactRole}
                        </span>
                        {thread.unreadCount > 0 && (
                          <span className="px-1.5 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-bold">
                            {thread.unreadCount} New
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Center & Right: Active Thread Chat (8 Columns) */}
        <div className="lg:col-span-8 rounded-2xl bg-[#0D1624] border border-[#1E2C3F] flex flex-col overflow-hidden shadow-md">
          {activeThread ? (
            <>
              {/* Chat Thread Header */}
              <div className="p-3.5 border-b border-[#1E2C3F] bg-[#07111F]/70 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center font-mono text-xs border border-blue-500/30">
                    {activeThread.contactAvatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{activeThread.contactName}</h3>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-[10px] font-mono text-slate-400">{activeThread.mcNumber || 'Direct Channel'} • {activeThread.contactPhone || 'Phone on file'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {activeThread.contactPhone && (
                    <a
                      href={`tel:${activeThread.contactPhone}`}
                      className="p-2 rounded-xl bg-[#111C2B] hover:bg-[#162438] text-slate-300 hover:text-emerald-400 border border-[#1E2C3F] transition-colors"
                      title="Call Contact"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Chat Messages Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin bg-[#07111F]/30">
                {activeThread.messages.map((msg: ChatMessage) => {
                  const isAdmin = msg.sender === 'admin';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 mb-1">
                        <span>{msg.senderName}</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <div
                        className={`max-w-md p-3 rounded-2xl text-xs leading-relaxed ${
                          isAdmin
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30 rounded-br-xs'
                            : 'bg-[#111C2B] border border-[#1E2C3F] text-slate-200 rounded-bl-xs'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Template Chips */}
              <div className="p-2 border-t border-[#1E2C3F] bg-[#07111F]/40 flex items-center gap-2 overflow-x-auto scrollbar-thin">
                <span className="text-[10px] font-mono text-slate-500 shrink-0">Quick Reply:</span>
                {quickTemplates.map((tpl) => (
                  <button
                    key={tpl.label}
                    onClick={() => handleApplyTemplate(tpl.text)}
                    className="px-2.5 py-1 rounded-lg bg-[#111C2B] hover:bg-[#162438] text-slate-300 hover:text-white border border-[#1E2C3F] text-[10px] font-mono shrink-0 transition-colors cursor-pointer"
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>

              {/* Chat Input Box */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-[#1E2C3F] bg-[#07111F]/80 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert('Document attachment integration')}
                  className="p-2.5 rounded-xl bg-[#111C2B] hover:bg-[#162438] text-slate-400 hover:text-white border border-[#1E2C3F] transition-colors cursor-pointer"
                  title="Attach File"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type dispatch message or operational update..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white text-xs focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-900/30 disabled:opacity-40 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-2 p-6 text-center">
              <Mail className="w-10 h-10 opacity-30 text-slate-400 mb-1" />
              <p className="text-sm font-semibold text-slate-400">No active conversation</p>
              <p className="text-xs text-slate-500">Select a message thread or broadcast to carriers.</p>
            </div>
          )}
        </div>

      </div>

      {/* Bulk Broadcast Modal */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#030812]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#0D1624] border border-[#1E2C3F] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#1E2C3F] pb-3">
              <h3 className="text-lg font-bold font-display text-white">Broadcast Fleet Notification</h3>
              <button onClick={() => setIsBulkModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Recipients</label>
                <div className="p-2.5 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-slate-300 font-mono">
                  All Active Carriers in Network ({threads.length} Channels)
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Broadcast Message Content *</label>
                <textarea
                  rows={4}
                  value={bulkTemplate}
                  onChange={(e) => setBulkTemplate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#07111F] border border-[#1E2C3F] text-white focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#1E2C3F]">
              <button
                onClick={() => setIsBulkModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#111C2B] hover:bg-[#162438] text-slate-300 font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSendBulk}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md shadow-blue-900/30 cursor-pointer"
              >
                Send Broadcast
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
