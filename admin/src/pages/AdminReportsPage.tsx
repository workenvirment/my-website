import React from 'react';
import { BarChart3 } from 'lucide-react';

export const AdminReportsPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0A1322] border border-[#1B293E] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display text-white tracking-tight">
              Operations & Fleet Analytics
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Live operational metrics, carrier lead conversion performance, and dispatch volume reports.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="glass-card p-4 rounded-2xl space-y-2">
          <span className="text-slate-400 text-xs font-medium">Lead Conversion Rate</span>
          <p className="text-3xl font-black font-display text-white">68.4%</p>
          <span className="text-[10px] text-emerald-400 font-mono font-bold">+12% vs prior period</span>
        </div>

        <div className="glass-card p-4 rounded-2xl space-y-2">
          <span className="text-slate-400 text-xs font-medium">Average Response Time</span>
          <p className="text-3xl font-black font-display text-white">14 mins</p>
          <span className="text-[10px] text-blue-400 font-mono font-bold">Fast dispatcher routing</span>
        </div>

        <div className="glass-card p-4 rounded-2xl space-y-2">
          <span className="text-slate-400 text-xs font-medium">Active Fleet Retention</span>
          <p className="text-3xl font-black font-display text-white">94.8%</p>
          <span className="text-[10px] text-emerald-400 font-mono font-bold">Top tier carrier satisfaction</span>
        </div>
      </div>
    </div>
  );
};
