import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  AlertCircle
} from 'lucide-react';
import { PORTAL_SAMPLE_BROKERS } from '../../../data/portalData';
import type { PortalBroker } from '../../../data/portalData';

export const BrokersDirectoryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBrokers = PORTAL_SAMPLE_BROKERS.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.mcNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
              Freight Broker & 3PL Directory
            </h1>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-200 font-bold">
              CREDIT & BOND VETTING
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified freight brokerages • Days-to-pay tracking, credit scores, and executed Broker Carrier Agreements (BCA)
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search broker name, MC number (e.g. MC-894201), city/state..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-orange"
          />
        </div>
      </div>

      {/* Brokers Table Grid */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-mono text-slate-500 uppercase border-y border-slate-200">
              <tr>
                <th className="p-3">Brokerage Company</th>
                <th className="p-3">MC Number</th>
                <th className="p-3">Location</th>
                <th className="p-3">Credit Score</th>
                <th className="p-3">Days to Pay</th>
                <th className="p-3">Surety Bond ($75k)</th>
                <th className="p-3">BCA Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBrokers.map((broker: PortalBroker) => (
                <tr
                  key={broker.id}
                  className="hover:bg-cyan-50/40 cursor-pointer transition-colors"
                >
                  <td className="p-3">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-900 text-sm block">{broker.name}</span>
                      <span className="text-[11px] text-slate-500 font-mono">Contact: {broker.contactName}</span>
                    </div>
                  </td>

                  <td className="p-3 font-mono font-bold text-cyan-800">{broker.mcNumber}</td>
                  <td className="p-3 font-semibold text-slate-800">{broker.location}</td>

                  <td className="p-3 font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold">
                      {broker.creditScore} / 100
                    </span>
                  </td>

                  <td className="p-3 font-mono text-slate-800 font-bold">{broker.daysToPay} Business Days</td>

                  <td className="p-3">
                    <span className="flex items-center gap-1 text-emerald-700 font-bold font-mono text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Active</span>
                    </span>
                  </td>

                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-800">
                      {broker.bcaStatus}
                    </span>
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => alert(`Broker ${broker.name} audited. Credit score: ${broker.creditScore}/100.`)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-cyan-600 hover:text-white text-slate-700 font-semibold text-xs transition-colors"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vetting Notice Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
        <span>
          <strong>Broker Qualification Standard:</strong> DGW dispatchers verify operating authority, BMC-84 surety bond standing ($75,000 minimum), and historical payment aging before executing any carrier load tenders.
        </span>
      </div>

    </div>
  );
};
