import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Download, 
  Printer, 
  ArrowUpRight
} from 'lucide-react';
import { operationsStore } from '../services/operationsStore';
import type { Load, Trucker, Broker, DocumentRecord } from '../types/admin';

export const AdminReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState('load_activity');
  const [dateRange, setDateRange] = useState('30d');
  const [loads, setLoads] = useState<Load[]>([]);
  const [truckers, setTruckers] = useState<Trucker[]>([]);
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);

  useEffect(() => {
    const syncData = () => {
      setLoads(operationsStore.getLoads());
      setTruckers(operationsStore.getTruckers());
      setBrokers(operationsStore.getBrokers());
      setDocuments(operationsStore.getDocuments());
    };

    syncData();
    const unsub = operationsStore.subscribe(syncData);
    return () => unsub();
  }, []);

  const reportOptions = [
    { id: 'load_activity', label: 'Load & Freight Activity' },
    { id: 'trucker_growth', label: 'Carrier Network Growth' },
    { id: 'broker_growth', label: 'Broker Partner Volume' },
    { id: 'revenue_trends', label: 'Gross Freight Revenue' },
    { id: 'compliance_audit', label: 'Document Expirations' },
    { id: 'dispatch_performance', label: 'On-Time Dispatch Metrics' }
  ];

  // Calculated real metrics
  const totalGrossRevenue = loads.reduce((acc, l) => acc + (Number(l.rate) || 0), 0);
  const totalMiles = loads.reduce((acc, l) => acc + (Number(l.mileage) || 0), 0);
  const averageRPM = totalMiles > 0 ? (totalGrossRevenue / totalMiles).toFixed(2) : '0.00';
  const activeTruckers = truckers.filter((t) => t.status === 'Active').length;
  const utilizationRate = truckers.length > 0 ? Math.round((activeTruckers / truckers.length) * 100) : 0;
  const validDocs = documents.filter((d) => d.status === 'Valid').length;
  const complianceRate = documents.length > 0 ? ((validDocs / documents.length) * 100).toFixed(1) : '0.0';
  const expiringSoonDocs = documents.filter((d) => d.status === 'Expiring Soon').length;

  const hasData = loads.length > 0 || truckers.length > 0 || brokers.length > 0;

  return (
    <div className="space-y-4">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display text-white">Operations & Financial Reports</h1>
            <p className="text-xs text-slate-400">Carrier acquisition rates, freight lane volume, broker revenue breakdown, and compliance health.</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-[#0D1624] hover:bg-[#111C2B] text-slate-200 border border-[#1E2C3F] text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-400" />
            <span>Print Report</span>
          </button>
          <button
            onClick={() => alert('Exporting report data to CSV...')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-900/30 flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-3 rounded-2xl bg-[#0D1624] border border-[#1E2C3F] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-thin">
          {reportOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setReportType(opt.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                reportType === opt.id ? 'bg-blue-600 text-white shadow-xs' : 'bg-[#07111F] border border-[#1E2C3F] text-slate-400 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-xs font-mono">
          {(['7d', '30d', '3m', '6m', '1y'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setDateRange(r)}
              className={`px-2.5 py-1 rounded-lg transition-all uppercase cursor-pointer ${
                dateRange === r ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold' : 'text-slate-500 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0D1624] border border-[#1E2C3F]">
          <span className="text-slate-400 text-xs font-medium">Total Gross Freight Volume</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black text-white font-display">${totalGrossRevenue.toLocaleString()}</span>
            <span className={`text-xs font-mono font-bold flex items-center ${totalGrossRevenue > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
              {totalGrossRevenue > 0 ? <><ArrowUpRight className="w-3 h-3" /> +100%</> : '0%'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 block mt-1">{loads.length} loads booked</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D1624] border border-[#1E2C3F]">
          <span className="text-slate-400 text-xs font-medium">Average Rate Per Mile (RPM)</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black text-white font-display">${averageRPM} / mi</span>
            <span className={`text-xs font-mono font-bold flex items-center ${totalMiles > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
              {totalMiles > 0 ? 'Active' : '0%'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 block mt-1">
            {totalMiles > 0 ? `${totalMiles.toLocaleString()} total dispatch miles` : '0 dispatch miles recorded'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D1624] border border-[#1E2C3F]">
          <span className="text-slate-400 text-xs font-medium">Active Carrier Utilization</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black text-white font-display">{utilizationRate}%</span>
            <span className={`text-xs font-mono font-bold flex items-center ${utilizationRate > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
              {truckers.length > 0 ? 'Live' : '0%'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 block mt-1">
            {truckers.length > 0 ? `${activeTruckers} of ${truckers.length} carriers active` : '0 carriers registered'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D1624] border border-[#1E2C3F]">
          <span className="text-slate-400 text-xs font-medium">Compliance Rate</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black text-white font-display">{complianceRate}%</span>
            <span className={`text-xs font-mono font-bold flex items-center ${documents.length > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
              {documents.length > 0 ? `${validDocs} Valid` : '0%'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 block mt-1">
            {documents.length > 0 ? `${expiringSoonDocs} expiring within 30 days` : '0 compliance documents on file'}
          </span>
        </div>
      </div>

      {/* Large Report Chart Visualizer */}
      <div className="p-5 rounded-2xl bg-[#0D1624] border border-[#1E2C3F] space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1E2C3F] pb-3">
          <div>
            <h3 className="text-sm font-bold font-display text-white">Monthly Trend Analysis</h3>
            <p className="text-xs text-slate-400">Comparing active loads vs revenue generated over the active period.</p>
          </div>
          <span className="text-xs font-mono text-blue-400">DGW Analytics Engine</span>
        </div>

        {/* Visualizer bars */}
        {hasData ? (
          <div className="h-64 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-[#1E2C3F] font-mono text-xs text-slate-500">
            {[
              { label: 'Current Period', loads: loads.length, rev: `$${totalGrossRevenue.toLocaleString()}`, h1: loads.length > 0 ? '80%' : '5%', h2: totalGrossRevenue > 0 ? '75%' : '5%' }
            ].map((item) => (
              <div key={item.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full max-w-xs flex items-end justify-center gap-3 h-48 bg-[#07111F] p-2 rounded-xl">
                  <div 
                    className="w-16 bg-blue-600 hover:bg-blue-500 rounded-t-lg transition-all"
                    style={{ height: item.h1 }}
                    title={`Loads: ${item.loads}`}
                  />
                  <div 
                    className="w-16 bg-emerald-500 hover:bg-emerald-400 rounded-t-lg transition-all"
                    style={{ height: item.h2 }}
                    title={`Revenue: ${item.rev}`}
                  />
                </div>
                <span className="text-[11px] text-slate-400 font-semibold">{item.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center border-b border-[#1E2C3F] text-center p-6">
            <BarChart3 className="w-10 h-10 text-slate-600 opacity-40 mb-2" />
            <p className="text-sm font-semibold text-slate-400">No operational report data available</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              Historical trends will populate automatically once loads are posted and billing cycles are completed.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-600" /> Booked Loads ({loads.length})</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500" /> Gross Freight Volume (${totalGrossRevenue.toLocaleString()})</span>
          </div>
          <span>Report Generated: Live Real-Time</span>
        </div>
      </div>

    </div>
  );
};
