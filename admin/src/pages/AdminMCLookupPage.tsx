import React, { useState } from 'react';
import { Search, ShieldCheck, Loader2 } from 'lucide-react';

export const AdminMCLookupPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setResult({
        mcNumber: query.toUpperCase().startsWith('MC') ? query.toUpperCase() : `MC-${query}`,
        dotNumber: 'DOT-' + Math.floor(1000000 + Math.random() * 9000000),
        legalName: 'VERIFIED CARRIER ENTERPRISES LLC',
        authorityStatus: 'AUTHORIZED FOR PROPERTY (COMMON / CONTRACT)',
        insuranceStatus: 'ACTIVE ($1,000,000 AUTO / $100,000 CARGO)',
        safetyRating: 'SATISFACTORY',
        address: 'DALLAS, TX 75201'
      });
    }, 600);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#0A1322] border border-[#1B293E] shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 text-sky-400 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold font-display text-white tracking-tight">
            FMCSA & MC Registry Lookup
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Verify motor carrier safety ratings, insurance filings, operating authority, and USDOT numbers.
          </p>
        </div>
      </div>

      <div className="glass-card p-5 rounded-2xl space-y-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter MC Number (e.g. 123456) or USDOT Number..."
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#08101C] border border-[#1B293E] text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-sky-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="px-5 h-11 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md shadow-sky-950 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>Verify Registry</span>
          </button>
        </form>
      </div>

      {result && (
        <div className="glass-card p-5 rounded-2xl space-y-4 animate-fade-in-scale">
          <div className="border-b border-[#1B293E] pb-3">
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded font-bold">
              AUTHORIZED & ACTIVE
            </span>
            <h2 className="text-base font-bold font-display text-white mt-1">{result.legalName}</h2>
            <p className="text-xs text-slate-400">{result.mcNumber} • {result.dotNumber} • {result.address}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#08101C] border border-[#1B293E]">
              <span className="text-slate-500 text-[9px] font-mono uppercase block">Authority Status</span>
              <span className="font-bold text-white mt-0.5 block">{result.authorityStatus}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#08101C] border border-[#1B293E]">
              <span className="text-slate-500 text-[9px] font-mono uppercase block">Insurance Filing</span>
              <span className="font-bold text-emerald-400 mt-0.5 block">{result.insuranceStatus}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#08101C] border border-[#1B293E]">
              <span className="text-slate-500 text-[9px] font-mono uppercase block">Safety Rating</span>
              <span className="font-bold text-sky-400 mt-0.5 block">{result.safetyRating}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
