import React, { useState } from 'react';
import { DollarSign, Clock, AlertCircle } from 'lucide-react';

export const SettlementCalculator: React.FC = () => {
  const [grossAmount, setGrossAmount] = useState<number>(8500);
  const factoringFeeRate = 2.0;
  const quickPayFeeRate = 4.0;

  const factorDeduction = (grossAmount * factoringFeeRate) / 100;
  const factorNet = grossAmount - factorDeduction;

  const quickPayDeduction = (grossAmount * quickPayFeeRate) / 100;
  const quickPayNet = grossAmount - quickPayDeduction;

  const standardNet = grossAmount;

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl text-slate-900 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-brand-orange border border-orange-200 text-[10px] font-mono font-bold uppercase tracking-wider">
              Financial Workflow Simulation
            </span>
            <span className="text-xs text-slate-500">Carrier Settlement Comparison</span>
          </div>
          <h3 className="text-xl font-display font-black text-slate-900 mt-1">Understanding Carrier Payment Options</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Test different gross freight values to compare estimated cash flow timing and fee impact across payment channels.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-2xl border border-slate-200">
          <DollarSign className="w-4 h-4 text-emerald-600" />
          <span className="text-xs text-slate-700 font-bold">Interactive Payout Estimator</span>
        </div>
      </div>

      {/* Input Slider / Value Controls */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-xs font-bold text-slate-700">
            Sample Gross Weekly / Load Freight Amount:
          </label>
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-brand-orange text-xl">${grossAmount.toLocaleString()}</span>
            <span className="text-[11px] text-slate-500 font-mono">USD</span>
          </div>
        </div>

        <input
          type="range"
          min="1500"
          max="25000"
          step="250"
          value={grossAmount}
          onChange={(e) => setGrossAmount(Number(e.target.value))}
          className="w-full accent-brand-orange cursor-pointer"
        />

        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          <span>$1,500 (Single Load)</span>
          <span>$8,500 (Weekly Avg)</span>
          <span>$15,000 (Multi-Truck / Reefer)</span>
          <span>$25,000+ (Heavy Haul)</span>
        </div>
      </div>

      {/* Comparative Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Factoring / NOA */}
        <div className="p-5 rounded-2xl bg-orange-50/50 border border-brand-orange/30 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-brand-orange uppercase">FACTORING (NOA)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-brand-orange text-white font-mono font-bold">
                ~24 Hours
              </span>
            </div>
            <h4 className="text-sm font-display font-bold text-slate-900">Factoring Settlement</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Invoices sold to factor. Immediate capital advance for fuel & operating reserves.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Example Fee ({factoringFeeRate}%):</span>
              <span className="text-red-600 font-mono font-bold">-${factorDeduction.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-100 font-bold">
              <span className="text-slate-900">Est. Net Payout:</span>
              <span className="text-emerald-700 text-base font-mono font-black">${factorNet.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-brand-orange" />
            <span>Funds available in ~24 hours</span>
          </div>
        </div>

        {/* Card 2: Broker QuickPay */}
        <div className="p-5 rounded-2xl bg-cyan-50/50 border border-cyan-200 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-800 uppercase">BROKER QUICKPAY</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-700 text-white font-mono font-bold">
                4 – 5 Days
              </span>
            </div>
            <h4 className="text-sm font-display font-bold text-slate-900">Direct Broker QuickPay</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Expedited direct deposit issued by participating brokerages on verified POD.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Example Fee ({quickPayFeeRate}%):</span>
              <span className="text-red-600 font-mono font-bold">-${quickPayDeduction.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-100 font-bold">
              <span className="text-slate-900">Est. Net Payout:</span>
              <span className="text-cyan-800 text-base font-mono font-black">${quickPayNet.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-cyan-700" />
            <span>Funds in ~4 to 5 business days</span>
          </div>
        </div>

        {/* Card 3: Standard Net 30 ACH */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-700 uppercase">STANDARD ACH / CHECK</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-mono font-bold">
                ~30 Days
              </span>
            </div>
            <h4 className="text-sm font-display font-bold text-slate-900">Standard Net 30 Terms</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Full amount paid via standard commercial billing cycle without factoring discount.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Fee Deduction:</span>
              <span className="text-emerald-700 font-mono font-bold">$0.00 (0%)</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-100 font-bold">
              <span className="text-slate-900">Full Net Payout:</span>
              <span className="text-slate-900 text-base font-mono font-black">${standardNet.toLocaleString()}</span>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Standard broker 30-day payout</span>
          </div>
        </div>

      </div>

      {/* Disclaimers Box */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
        <span>
          <strong>Disclaimer:</strong> Example deductions (1–3% factoring, 4–5% QuickPay) and payment timeframes (~24 hours vs 4–5 days vs 30 days) are illustrative estimates for educational comparison. Actual terms and fees are determined exclusively by your contract with your factoring provider or the broker’s specific accounting terms.
        </span>
      </div>

    </div>
  );
};
