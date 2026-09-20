import React from 'react';
import { Info, Database } from 'lucide-react';

export const DemoDataNotice: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-200 text-xs">
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
          <Database className="w-4 h-4" />
        </div>
        <div>
          <span className="font-bold text-amber-300 mr-1.5">[DEMO / SIMULATION MODE]</span>
          <span className="text-amber-200/90">
            Metrics, carrier leads, and activity feeds shown below are simulated demo data. Real customer data will display once production Firebase Firestore collections are linked.
          </span>
        </div>
      </div>
      <div className="inline-flex items-center gap-1 font-mono font-bold text-[11px] text-amber-400 shrink-0 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30">
        <Info className="w-3.5 h-3.5" />
        <span>Demo Data Isolated</span>
      </div>
    </div>
  );
};
