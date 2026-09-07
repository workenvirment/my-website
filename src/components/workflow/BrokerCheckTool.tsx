import React, { useState } from 'react';
import { ShieldCheck, CheckSquare, Square, AlertCircle } from 'lucide-react';
import { BROKER_QUALIFICATION_CHECKLIST } from '../../data/workflowData';

export const BrokerCheckTool: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>([
    'bc-1',
    'bc-2',
    'bc-3',
    'bc-4',
  ]);

  const toggleCheck = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((item) => item !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const handleSelectAll = () => {
    if (checkedIds.length === BROKER_QUALIFICATION_CHECKLIST.length) {
      setCheckedIds([]);
    } else {
      setCheckedIds(BROKER_QUALIFICATION_CHECKLIST.map((item) => item.id));
    }
  };

  const percent = Math.round((checkedIds.length / BROKER_QUALIFICATION_CHECKLIST.length) * 100);

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl text-slate-900 relative overflow-hidden space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 text-[10px] font-mono font-bold uppercase tracking-wider">
              Safety & Credit Screening
            </span>
            <span className="text-xs text-slate-500">Pre-Booking Audit</span>
          </div>
          <h3 className="text-xl font-display font-black text-slate-900 mt-1">Before We Contact A Broker</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Our dispatchers run each broker through this qualification protocol before dialing to safeguard carrier payment and operational terms.
          </p>
        </div>

        {/* Live Audit Score Gauge */}
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 shrink-0">
          <div className="text-right">
            <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold">Vetting Readiness</span>
            <span className={`text-base font-display font-bold ${
              percent === 100 ? 'text-emerald-700' : percent >= 60 ? 'text-brand-orange' : 'text-slate-700'
            }`}>
              {percent}% Verified
            </span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center relative shadow-sm">
            <ShieldCheck className={`w-5 h-5 ${
              percent === 100 ? 'text-emerald-600' : 'text-brand-orange'
            }`} />
          </div>
        </div>
      </div>

      {/* Checklist Interactive Area */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
          <span>Click to verify each checkpoint requirement:</span>
          <button
            onClick={handleSelectAll}
            className="text-brand-orange hover:underline font-bold"
          >
            {checkedIds.length === BROKER_QUALIFICATION_CHECKLIST.length ? 'Uncheck All' : 'Verify All Points'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {BROKER_QUALIFICATION_CHECKLIST.map((item) => {
            const isChecked = checkedIds.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 rounded-2xl text-left transition-all border flex items-start gap-3.5 ${
                  isChecked
                    ? 'bg-orange-50/40 border-brand-orange/40 text-slate-900 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-brand-orange" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-900 text-xs">{item.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">{item.description}</p>
                  <p className="text-brand-orange text-[10px] font-mono font-semibold mt-1">
                    ✓ Verified via: {item.checkPoint}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Safety Notice Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
        <span>
          <strong>Operational Note:</strong> This broker checklist represents standard dispatcher due diligence. Conducting these checks minimizes credit and communication risks but does not constitute an absolute legal guarantee of broker approval or invoice payment.
        </span>
      </div>

    </div>
  );
};
