import React from 'react';
import { 
  X, 
  FileText, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  CreditCard, 
  FileCheck, 
  Truck
} from 'lucide-react';

interface CarrierRequirementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToApply?: () => void;
}

export const CarrierRequirementsModal: React.FC<CarrierRequirementsModalProps> = ({
  isOpen,
  onClose,
  onNavigateToApply
}) => {
  if (!isOpen) return null;

  const requirements = [
    {
      id: 'mc-authority',
      code: 'REQ-01',
      title: 'Active Federal MC / DOT Authority',
      badge: 'MANDATORY',
      badgeColor: 'bg-red-100 text-red-700 border-red-200',
      icon: <Building2 className="w-5 h-5 text-blue-600" />,
      summary: 'Valid Common or Contract Interstate Operating Authority issued by FMCSA.',
      details: [
        'Active MC / FF / DOT Operating Authority for at least 3-6+ months.',
        'Safety rating: Satisfactory or Unrated (conditional ratings subject to review).',
        'Copy of FMCSA Authority Certificate (Form MC-150 / Decision Letter).'
      ]
    },
    {
      id: 'insurance-coi',
      code: 'REQ-02',
      title: 'Certificate of Insurance (COI)',
      badge: 'MANDATORY',
      badgeColor: 'bg-red-100 text-red-700 border-red-200',
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      summary: '$1,000,000 Auto Liability & $100,000 Motor Truck Cargo coverage.',
      details: [
        'Commercial Auto / Truck Liability: $1,000,000 combined single limit.',
        'Motor Truck Cargo: Minimum $100,000 coverage (Reefer breakdown endorsement for refrigerated units).',
        'DGW Solutions LLC listed as Certificate Holder / Information Recipient.',
        'Direct email or dispatch verification from insurance producer/underwriter.'
      ]
    },
    {
      id: 'w9-form',
      code: 'REQ-03',
      title: 'Current Signed W-9 Form',
      badge: 'MANDATORY',
      badgeColor: 'bg-red-100 text-red-700 border-red-200',
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      summary: 'IRS Form W-9 signed and dated within the current calendar year.',
      details: [
        'Accurate Legal Company Name & Registered DBA matching FMCSA records.',
        'Valid Federal Employer Identification Number (EIN) or SSN.',
        'Signed by company owner or authorized corporate officer.'
      ]
    },
    {
      id: 'noa-banking',
      code: 'REQ-04',
      title: 'Factoring Notice of Assignment (NOA) / Voided Check',
      badge: 'REQUIRED FOR BILLING',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: <CreditCard className="w-5 h-5 text-blue-600" />,
      summary: 'Official remittance instructions for rapid freight payment processing.',
      details: [
        'If Factoring: Official Notice of Assignment (NOA) letter from factoring provider.',
        'If Direct ACH: Voided company check or bank confirmation letter for direct deposits.',
        'Rapid billing turnaround upon signed Proof of Delivery (POD) submission.'
      ]
    },
    {
      id: 'dispatcher-agreement',
      code: 'REQ-05',
      title: 'Carrier Profile & Dispatcher Agreement',
      badge: 'DISPATCH SETUP',
      badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
      icon: <FileCheck className="w-5 h-5 text-blue-600" />,
      summary: 'Equipment specifications, driver contact details, and lane preferences.',
      details: [
        'Carrier dispatch service agreement & Limited Power of Attorney (for broker rate cons).',
        'Trailer type, payload capacity, preferred running states & target rate per mile.',
        'Zero forced dispatch — you retain 100% control over every load approval.'
      ]
    }
  ];

  const handleDownloadChecklist = () => {
    // Generate clean printable document
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up blocked. Please allow pop-ups to download the document.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>DGW Solutions LLC - Carrier Onboarding & Requirements Checklist</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; color: #0F172A; padding: 40px; margin: 0 auto; max-width: 800px; line-height: 1.5; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #2563EB; padding-bottom: 20px; margin-bottom: 25px; }
          .brand-title { font-size: 24px; font-weight: 900; color: #1E3A8A; margin: 0; }
          .brand-sub { font-size: 11px; font-weight: 700; color: #2563EB; letter-spacing: 1px; margin-top: 4px; }
          .meta { text-align: right; font-size: 11px; color: #64748B; font-family: monospace; }
          h1 { font-size: 20px; font-weight: 800; color: #0F172A; margin: 15px 0 5px; }
          p.intro { font-size: 13px; color: #475569; margin-bottom: 25px; }
          .req-card { border: 1px solid #E2E8F0; border-radius: 8px; padding: 15px; margin-bottom: 15px; background: #F8FAFC; page-break-inside: avoid; }
          .req-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
          .req-title { font-size: 14px; font-weight: 800; color: #0F172A; }
          .req-code { font-size: 11px; font-weight: 700; background: #DBEAFE; color: #1E40AF; padding: 2px 8px; border-radius: 4px; font-family: monospace; }
          .req-summary { font-size: 12px; font-weight: 600; color: #2563EB; margin-bottom: 8px; }
          ul { margin: 0; padding-left: 20px; font-size: 12px; color: #334155; }
          li { margin-bottom: 4px; }
          .footer { margin-top: 30px; border-top: 1px solid #E2E8F0; padding-top: 15px; display: flex; justify-content: space-between; font-size: 11px; color: #64748B; font-family: monospace; }
          @media print {
            body { padding: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="brand-title">DGW SOLUTIONS LLC</div>
            <div class="brand-sub">DISPATCHING GLOBAL WORLD • LOGISTICS • FREIGHT • GROWTH</div>
          </div>
          <div class="meta">
            <div>CARRIER COMPLIANCE PACKET</div>
            <div>STATUS: OFFICIAL CHECKLIST</div>
          </div>
        </div>

        <h1>Carrier Onboarding &amp; Document Requirements</h1>
        <p class="intro">
          Please ensure all documents listed below are prepared prior to dispatch setup. All documentation should be submitted directly to our onboarding team for rapid carrier verification and load coordination.
        </p>

        ${requirements.map((req) => `
          <div class="req-card">
            <div class="req-header">
              <div class="req-title">${req.title}</div>
              <div class="req-code">${req.code} • ${req.badge}</div>
            </div>
            <div class="req-summary">${req.summary}</div>
            <ul>
              ${req.details.map((d) => `<li>${d}</li>`).join('')}
            </ul>
          </div>
        `).join('')}

        <div class="footer">
          <div>DGW Solutions LLC • Dispatching Global World</div>
          <div>Contact / WhatsApp: +92 341 8341278</div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-slate-900"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/80 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold tracking-wide uppercase">
              <FileCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Carrier Compliance &amp; Onboarding Requirements</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-black text-slate-950 tracking-tight">
              What We Require From Any Carrier
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Complete document checklist required to partner with DGW Solutions LLC for dedicated truck dispatching.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content / Checklist Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {requirements.map((req) => (
            <div 
              key={req.id} 
              className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                    {req.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      {req.code}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-950">
                      {req.title}
                    </h3>
                  </div>
                </div>

                <span className={`self-start sm:self-auto px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${req.badgeColor}`}>
                  {req.badge}
                </span>
              </div>

              <p className="text-xs font-semibold text-blue-700">
                {req.summary}
              </p>

              <div className="grid grid-cols-1 gap-1.5 pt-1">
                {req.details.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Quick Notice Banner */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <p>
              <strong>100% Carrier Protection:</strong> We operate strictly on a <strong>Zero Forced Dispatch</strong> policy. You always approve each rate confirmation before any load is booked.
            </p>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/90 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span>Official Checklist</span>
            <span>•</span>
            <span>Printable &amp; PDF Ready</span>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2.5 w-full sm:w-auto">
            
            {/* Download / Print Button */}
            <button
              onClick={handleDownloadChecklist}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 font-bold text-xs shadow-xs transition-all cursor-pointer w-full sm:w-auto"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>Download / Print Checklist</span>
            </button>

            {/* Start Carrier Onboarding Button */}
            {onNavigateToApply && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToApply();
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1D63ED] hover:bg-[#1550C7] text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer w-full sm:w-auto"
              >
                <Truck className="w-4 h-4 text-white" />
                <span>Submit Carrier Packet</span>
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
