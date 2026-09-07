import React, { useState } from 'react';
import { 
  AlertCircle
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
              Operational Fleet Analytics
            </h1>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 font-bold">
              PERFORMANCE INTELLIGENCE
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Lane velocity index, rate-per-mile trends, deadhead ratio analytics, and equipment gross benchmarks
          </p>
        </div>

        <div className="flex items-center p-1 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-semibold">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range as any)}
              className={`px-3 py-1.5 rounded-lg uppercase transition-all ${
                timeRange === range ? 'bg-brand-orange text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400">TOTAL DISPATCHED MILES</span>
          <p className="font-display font-black text-slate-900 text-2xl">18,420 <span className="text-xs text-emerald-700 font-mono font-normal">+14.2%</span></p>
          <span className="text-slate-500 text-[11px] font-mono">Loaded: 16,980 mi • Deadhead: 7.8%</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400">AVERAGE RPM REALIZED</span>
          <p className="font-display font-black text-brand-orange text-2xl">$2.42/mi <span className="text-xs text-emerald-700 font-mono font-normal">+$0.18</span></p>
          <span className="text-slate-500 text-[11px] font-mono">Spot benchmark: $2.24/mi</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400">TOTAL GROSS REVENUE</span>
          <p className="font-display font-black text-emerald-700 text-2xl">$44,576.40</p>
          <span className="text-slate-500 text-[11px] font-mono">24 loads booked & dispatched</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400">ON-TIME DELIVERY RATE</span>
          <p className="font-display font-black text-purple-700 text-2xl">98.4%</p>
          <span className="text-slate-500 text-[11px] font-mono">Broker rating index: 5.0 ★</span>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Weekly Gross Payout Trend */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-display font-black text-slate-900 text-sm">Weekly Gross Payout Volume</h3>
              <p className="text-[11px] text-slate-500">Historical earnings across rolling 6 weeks</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700">+$6,850/wk Avg</span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-52 flex items-end justify-between gap-3 pt-4 px-2">
            {[
              { week: 'Wk 1', amount: 7200, height: '70%' },
              { week: 'Wk 2', amount: 8400, height: '82%' },
              { week: 'Wk 3', amount: 6900, height: '66%' },
              { week: 'Wk 4', amount: 9100, height: '90%' },
              { week: 'Wk 5', amount: 8200, height: '80%' },
              { week: 'Wk 6', amount: 9800, height: '98%' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-mono text-slate-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  ${bar.amount}
                </span>
                <div 
                  className="w-full bg-gradient-to-t from-orange-600 to-amber-400 rounded-t-xl group-hover:brightness-110 transition-all shadow-sm"
                  style={{ height: bar.height }}
                />
                <span className="text-[11px] font-mono text-slate-500">{bar.week}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: RPM by Equipment Category */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-display font-black text-slate-900 text-sm">Realized RPM by Equipment</h3>
              <p className="text-[11px] text-slate-500">Average rate-per-mile across active fleet categories</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            {[
              { name: "53' Refrigerated (Reefer)", rpm: '$2.65', pct: 88, color: 'bg-cyan-600' },
              { name: "48/53' Flatbed (Open Deck)", rpm: '$3.09', pct: 95, color: 'bg-emerald-600' },
              { name: "53' Dry Van Enclosed", rpm: '$2.37', pct: 78, color: 'bg-brand-orange' },
              { name: 'Power Only Tractor', rpm: '$2.40', pct: 80, color: 'bg-purple-600' },
              { name: "26' Straight Box Truck", rpm: '$2.63', pct: 85, color: 'bg-amber-600' },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-800">{item.name}</span>
                  <span className="font-mono font-bold text-slate-900">{item.rpm}/mi</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Analytics Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
        <span>
          <strong>Sample Analytics Data:</strong> Analytics benchmarks and financial charts are simulated operational models designed to demonstrate dispatch reporting tools.
        </span>
      </div>

    </div>
  );
};
