import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  Loader2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    action: () => void;
  };
}

export const LogisticsAiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Hello! I am your DGW AI Dispatch Copilot. I can assist you with carrier MC vetting, calculating deadhead margins, spot RPM trends, or carrier setup packets. How can I help your fleet today?',
      timestamp: 'Just now'
    }
  ]);

  const quickPrompts = [
    { label: '🔍 Vet MC-984210 Safety', query: 'Inspect FMCSA safety and BIPD insurance for MC-984210' },
    { label: '💰 Deadhead Margin: Dallas ➔ Atlanta', query: 'Calculate true RPM for 780 miles from Dallas to Atlanta with 45 deadhead miles' },
    { label: '📈 Southeast Reefer Rate Trends', query: 'What is the current spot market rate for 53ft Reefer outbound Georgia port lanes?' },
    { label: '📄 Required Setup Packet Checklist', query: 'What documents are required for instant broker packet onboarding?' }
  ];

  const handleSendQuery = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Realistic Simulated AI Logic
    setTimeout(() => {
      let reply = '';
      const q = queryText.toLowerCase();

      if (q.includes('984210') || q.includes('vance')) {
        reply = '✅ MC-984210 (Vance Freight Logistics LLC) is ACTIVE & AUTHORIZED by FMCSA with Gold Tier rating. Operating 14 power units with $1,000,000 Auto Liability on file with Great West Casualty and $250,000 Cargo. Zero DOT recordable crashes in 24 months.';
      } else if (q.includes('margin') || q.includes('dallas') || q.includes('deadhead')) {
        reply = '📊 Trip Calculation: Dallas ➔ Atlanta (780 loaded + 45 deadhead = 825 total miles). At $2,400 gross offer, True RPM is $2.91/mile. Estimated fuel burn at $3.65/gal is ~$261, leaving an estimated net earnings pocket of $2,139.';
      } else if (q.includes('reefer') || q.includes('rate') || q.includes('southeast')) {
        reply = '📈 Current Outbound Southeast Reefer Index is surging at $3.22/mile (+$0.38 vs 30-day baseline) due to fresh harvest and Savannah port import volume. Preferred destination corridors: Midwest (IL/IN) and Texas.';
      } else if (q.includes('document') || q.includes('packet') || q.includes('checklist')) {
        reply = '📋 DGW Carrier Packet requires 4 key files: 1) Active Certificate of Insurance ($1M Auto, $250k Cargo), 2) Signed Form W-9 with EIN (42-4868007), 3) FMCSA Operating Authority Certificate, and 4) Factoring Notice of Assignment (NOA).';
      } else {
        reply = `I have analyzed your request regarding "${queryText}". DGW Dispatch Intelligence confirms all active telematics and FMCSA safety verification services are operating at peak 99.98% reliability.`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Widget Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-40 p-3.5 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover text-white font-bold text-xs shadow-glow-orange flex items-center gap-2.5 transition-transform hover:scale-105"
        title="Open DGW AI Logistics Copilot"
      >
        <div className="relative">
          <Bot className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900" />
        </div>
        <span className="hidden sm:inline">DGW AI Copilot</span>
      </button>

      {/* AI Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] max-w-md h-[540px] rounded-3xl bg-slate-900 border border-white/15 shadow-2xl flex flex-col text-white overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Window Header */}
          <div className="p-4 border-b border-white/10 bg-slate-950/90 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-brand-orange to-amber-500 text-white shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>DGW Logistics AI Assistant</span>
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950 border border-emerald-500/30 px-1.5 py-0.2 rounded font-bold">
                    ONLINE
                  </span>
                </h4>
                <p className="text-[10px] text-slate-400 font-mono">
                  FMCSA Intelligence • RPM Estimator • Denver HQ
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-brand-orange text-white rounded-br-none shadow-sm'
                      : 'bg-slate-950 border border-white/10 text-slate-200 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] font-mono text-slate-500 px-1 mt-1">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-slate-400 font-mono text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-brand-orange" />
                <span>Analyzing freight registry...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts Carousel */}
          <div className="p-2 border-t border-white/5 bg-slate-950/60 overflow-x-auto flex gap-1.5 text-[11px] no-scrollbar">
            {quickPrompts.map((qp) => (
              <button
                key={qp.label}
                type="button"
                onClick={() => handleSendQuery(qp.query)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 hover:border-brand-orange text-slate-300 hover:text-white whitespace-nowrap transition-colors shrink-0"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSendQuery(input); }}
            className="p-3 border-t border-white/10 bg-slate-950 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask DGW Copilot (e.g. rate forecast, MC check)..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-orange"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
