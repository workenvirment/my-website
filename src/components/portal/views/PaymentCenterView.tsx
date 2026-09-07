import React from 'react';
import { 
  Download
} from 'lucide-react';
import { SettlementCalculator } from '../../payments/SettlementCalculator';

export const PaymentCenterView: React.FC = () => {
  const paymentRecords = [
    { id: 'inv-101', loadId: 'LD-10482', broker: 'Apex 3PL Global', gross: 1850, method: 'Factoring (Triumph)', fee: 37.00, net: 1813.00, submitted: 'Yesterday', expected: 'Today (~24h)', status: 'FUNDED' },
    { id: 'inv-102', loadId: 'LD-10484', broker: 'Coastline Freight', gross: 1150, method: 'QuickPay (Broker)', fee: 46.00, net: 1104.00, submitted: '2 Days Ago', expected: 'In 2 Days (4-5d)', status: 'PROCESSING' },
    { id: 'inv-103', loadId: 'LD-10480', broker: 'Midwest Intermodal', gross: 2450, method: 'Standard Net 30', fee: 0.00, net: 2450.00, submitted: 'Aug 20', expected: 'Sep 20 (~30d)', status: 'PENDING_NET30' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
              Settlement & Factoring Center
            </h1>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold">
              PAYOUT AUDIT
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Track invoice disbursements across Notice of Assignment (NOA) factoring advances, broker QuickPay, and standard ACH
          </p>
        </div>
      </div>

      {/* Top Settlement Calculator Simulator */}
      <SettlementCalculator />

      {/* Payment Records Ledger Table */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-display font-black text-slate-900 text-sm">Disbursement Activity & Invoices</h3>
            <p className="text-[11px] text-slate-500">Live transaction ledger with signed delivery POD verification</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-mono text-slate-500 uppercase border-y border-slate-200">
              <tr>
                <th className="p-3">Invoice #</th>
                <th className="p-3">Load ID</th>
                <th className="p-3">Broker</th>
                <th className="p-3">Payment Channel</th>
                <th className="p-3">Gross Rate</th>
                <th className="p-3">Est. Fee</th>
                <th className="p-3">Net Disbursement</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paymentRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-slate-900">{rec.id.toUpperCase()}</td>
                  <td className="p-3 font-mono font-bold text-brand-orange">{rec.loadId}</td>
                  <td className="p-3 font-semibold text-slate-800">{rec.broker}</td>
                  <td className="p-3 font-mono text-slate-600">{rec.method}</td>
                  <td className="p-3 font-mono font-bold text-slate-900">${rec.gross.toLocaleString()}</td>
                  <td className="p-3 font-mono text-red-600">-${rec.fee.toFixed(2)}</td>
                  <td className="p-3 font-mono font-bold text-emerald-700 text-sm">${rec.net.toFixed(2)}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      rec.status === 'FUNDED' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-brand-orange'
                    }`}>
                      {rec.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => alert(`Downloading payment remittance advice for ${rec.id}...`)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                      title="Download Remittance"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
