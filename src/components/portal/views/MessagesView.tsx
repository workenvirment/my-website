import React, { useState } from 'react';
import { 
  Send, 
  Paperclip, 
  Search, 
  Phone, 
  Truck, 
  AlertCircle
} from 'lucide-react';
import { PORTAL_SAMPLE_CONVERSATIONS, PORTAL_SAMPLE_MESSAGES } from '../../../data/portalData';
import type { PortalMessage } from '../../../data/portalData';

export const MessagesView: React.FC = () => {
  const [activeConvId, setActiveConvId] = useState<string>('conv-1');
  const [messages, setMessages] = useState<Record<string, PortalMessage[]>>(PORTAL_SAMPLE_MESSAGES);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const activeConv = PORTAL_SAMPLE_CONVERSATIONS.find((c) => c.id === activeConvId) || PORTAL_SAMPLE_CONVERSATIONS[0];
  const activeChatList = messages[activeConvId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg: PortalMessage = {
      id: 'msg-' + Date.now(),
      conversationId: activeConvId,
      senderName: 'You (DGW Dispatch)',
      senderRole: 'Dispatcher',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      text: messageInput.trim(),
      timestamp: 'Just now',
      isCurrentUser: true
    };

    setMessages({
      ...messages,
      [activeConvId]: [...activeChatList, newMsg]
    });
    setMessageInput('');

    // Simulate realistic typing response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replyMsg: PortalMessage = {
        id: 'reply-' + Date.now(),
        conversationId: activeConvId,
        senderName: activeConv.title.split(' (')[0],
        senderRole: activeConv.type === 'carrier' ? 'Carrier' : 'Broker',
        senderAvatar: activeConv.avatarUrl,
        text: 'Received loud and clear! Updating status now.',
        timestamp: 'Just now',
        isCurrentUser: false
      };
      setMessages((prev) => ({
        ...prev,
        [activeConvId]: [...(prev[activeConvId] || []), replyMsg]
      }));
    }, 1800);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
              Dispatcher & Carrier Communications
            </h1>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold">
              REAL-TIME DISPATCH
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Direct operational message threads across assigned drivers, freight brokers, and back-office billing
          </p>
        </div>
      </div>

      {/* Main Messaging Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden min-h-[600px]">
        
        {/* Left Col (4): Conversation Threads List */}
        <div className="lg:col-span-4 border-r border-slate-200 flex flex-col bg-slate-50/50">
          
          <div className="p-4 border-b border-slate-200">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-orange"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {PORTAL_SAMPLE_CONVERSATIONS.map((conv) => {
              const isSelected = activeConvId === conv.id;

              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`w-full p-4 text-left transition-colors flex items-start gap-3 ${
                    isSelected ? 'bg-orange-50/70 border-l-4 border-brand-orange' : 'hover:bg-slate-100/70'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={conv.avatarUrl}
                      alt={conv.title}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-xs truncate">{conv.title}</h4>
                      <span className="text-[10px] font-mono text-slate-400">{conv.lastTimestamp}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 font-mono truncate">{conv.subtitle}</p>
                    <p className="text-xs text-slate-600 truncate mt-1">{conv.lastMessage}</p>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Col (8): Active Chat Area */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-white">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={activeConv.avatarUrl}
                  alt={activeConv.title}
                  className="w-10 h-10 rounded-full object-cover border border-brand-orange"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm">{activeConv.title}</h3>
                <span className="text-[11px] text-slate-500 font-mono">{activeConv.subtitle}</span>
              </div>
            </div>

            <button
              onClick={() => alert(`Dialing direct phone line for ${activeConv.title}...`)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Call Contact"
            >
              <Phone className="w-4 h-4 text-brand-orange" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 text-xs bg-slate-50/30">
            {activeChatList.map((msg) => {
              const isMe = msg.isCurrentUser || msg.senderRole === 'Dispatcher';

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isMe ? 'flex-row-reverse' : ''}`}
                >
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                  />

                  <div className={`max-w-md space-y-1 ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                      <span>{msg.senderName}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div className={`p-3.5 rounded-2xl ${
                      isMe 
                        ? 'bg-brand-orange text-white rounded-tr-none shadow-sm' 
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
                    }`}>
                      <p className="leading-relaxed">{msg.text}</p>
                      {msg.loadRef && (
                        <div className="mt-2 pt-1 border-t border-white/20 text-[10px] font-mono flex items-center gap-1">
                          <Truck className="w-3 h-3" />
                          <span>Referenced Load: <strong>{msg.loadRef}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-bounce" />
                <span>{activeConv.title.split(' ')[0]} is typing...</span>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert('Opening file attachment modal (PDF, Rate Con, BOL, POD)...')}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              title="Attach Document"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type dispatch message or share load updates..."
              className="flex-1 px-4 py-2.5 text-xs rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-orange"
            />

            <button
              type="submit"
              className="p-2.5 rounded-2xl bg-brand-orange hover:bg-brand-orange-hover text-white shadow-glow-orange transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

      {/* Messaging Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
        <span>
          <strong>Operational Note:</strong> Demo chat simulation demonstrating multi-party dispatch communications.
        </span>
      </div>

    </div>
  );
};
