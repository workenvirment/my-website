import React, { useState, useEffect, useMemo } from 'react';
import { 
  Mail, 
  Search, 
  Send, 
  Phone, 
  CheckCheck,
  MessageSquare
} from 'lucide-react';
import { operationsStore } from '../services/operationsStore';
import type { MessageThread } from '../types/admin';

interface AdminMessagesPageProps { onNavigate?: (route: string) => void; }

export const AdminMessagesPage: React.FC<AdminMessagesPageProps> = () => {
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string>('');
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-2xl bg-[#0A1322] border border-[#1B293E] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-display text-white tracking-tight">
                Operations Communications Center
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30 text-[10px] font-mono font-bold">
                {threads.length} Threads
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live communications with carrier partners, driver dispatch inquiries, and contact submissions.
            </p>
          </div>
        </div>
      </div>

      {/* Inbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-[560px]">
        {/* Left Col: Threads List */}
        <div className="lg:col-span-4 rounded-2xl bg-[#0A1322] border border-[#1B293E] p-3 flex flex-col justify-between space-y-3">
          <div className="space-y-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search messages, carrier, MC#..."
                className="w-full h-8 pl-8 pr-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="space-y-1 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredThreads.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs font-mono">
                  No conversations found
                </div>
              ) : (
                filteredThreads.map((t) => {
                  const isSelected = activeThread?.id === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setActiveThreadId(t.id);
                        operationsStore.markThreadRead(t.id);
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex items-start gap-2.5 ${
                        isSelected
                          ? 'bg-purple-950/40 border border-purple-500/40 text-white shadow-xs'
                          : 'bg-[#08101C] hover:bg-[#111F33] border border-[#1B293E] text-slate-300'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 ${
                        isSelected
                          ? 'bg-purple-600 text-white'
                          : 'bg-purple-950/60 text-purple-300 border border-purple-800/40'
                      }`}>
                        {t.contactName.slice(0, 1).toUpperCase()}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-bold text-white truncate">{t.contactName}</p>
                          <span className="text-[9px] font-mono text-slate-500 shrink-0">{t.lastMessageTime}</span>
                        </div>

                        {t.mcNumber && (
                          <span className="text-[9px] font-mono text-blue-400 block mt-0.5">
                            {t.mcNumber}
                          </span>
                        )}

                        <p className="text-[10.5px] text-slate-400 truncate mt-0.5">{t.lastMessage}</p>
                      </div>

                      {t.unreadCount > 0 && (
                        <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-2 animate-pulse" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-[#1B293E] text-[10px] font-mono text-slate-500 text-center">
            {threads.length} active channels synced
          </div>
        </div>

        {/* Right Col: Active Chat */}
        <div className="lg:col-span-8 rounded-2xl bg-[#0A1322] border border-[#1B293E] p-4 flex flex-col justify-between">
          {activeThread ? (
            <>
              <div className="flex items-center justify-between border-b border-[#1B293E] pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 text-white font-bold flex items-center justify-center shadow-xs">
                    {activeThread.contactName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold font-display text-white">{activeThread.contactName}</h3>
                      {activeThread.mcNumber && (
                        <span className="text-[9px] font-mono text-blue-400 bg-blue-950/60 px-1.5 py-0.2 rounded border border-blue-800/40">
                          {activeThread.mcNumber}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{activeThread.contactRole} • {activeThread.contactPhone || 'Direct Channel'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {activeThread.contactPhone && (
                    <a
                      href={`tel:${activeThread.contactPhone}`}
                      className="px-3 py-1.5 rounded-xl bg-[#08101C] hover:bg-[#111F33] text-emerald-400 border border-[#1B293E] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="flex-1 py-4 space-y-3 overflow-y-auto max-h-[360px] pr-1 scrollbar-thin">
                {activeThread.messages.map((m) => {
                  const isAdmin = m.sender === 'admin';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-md p-3 rounded-2xl text-xs leading-relaxed ${
                          isAdmin
                            ? 'bg-blue-600 text-white rounded-br-xs shadow-md shadow-blue-950'
                            : 'bg-[#08101C] border border-[#1B293E] text-slate-200 rounded-bl-xs'
                        }`}
                      >
                        <p>{m.text}</p>
                        <div className={`flex items-center gap-1.5 justify-end text-[8.5px] font-mono mt-1 ${
                          isAdmin ? 'text-blue-200' : 'text-slate-500'
                        }`}>
                          <span>{m.timestamp}</span>
                          {isAdmin && <CheckCheck className="w-3 h-3 text-blue-300" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 pb-2 border-t border-[#1B293E] flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
                <span className="text-[9.5px] font-mono text-slate-500 font-bold shrink-0">Templates:</span>
                {[
                  'Load Confirmation: Rate agreed and dispatch instructions sent.',
                  'Inquiry Received: We are reviewing your carrier onboarding packet.',
                  'Please provide your updated Certificate of Insurance (COI).'
                ].map((tpl, i) => (
                  <button
                    key={i}
                    onClick={() => handleApplyTemplate(tpl)}
                    className="px-2 py-1 rounded-lg bg-[#08101C] hover:bg-[#111F33] text-slate-400 hover:text-slate-200 border border-[#1B293E] text-[10px] truncate max-w-[200px] shrink-0 cursor-pointer"
                  >
                    {tpl}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="pt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a dispatch reply or operational update..."
                  className="flex-1 h-10 px-3.5 rounded-xl bg-[#08101C] border border-[#1B293E] text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-purple-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="h-10 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-950 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="py-24 text-center space-y-2 font-mono">
              <MessageSquare className="w-8 h-8 mx-auto text-slate-600 opacity-40" />
              <p className="text-sm font-bold font-sans text-white">Select a conversation</p>
              <p className="text-xs text-slate-500 font-sans">Choose a thread from the left panel to begin dispatch communication.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
