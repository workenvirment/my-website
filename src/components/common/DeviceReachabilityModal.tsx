import React, { useState } from 'react';
import { Smartphone, Wifi, CheckCircle2, Copy, X } from 'lucide-react';

interface DeviceReachabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeviceReachabilityModal: React.FC<DeviceReachabilityModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Active permanent 24/7 public HTTPS production URL & dynamic QR code
  const publicHttpsUrl = 'https://dgw-solutions-logistics.surge.sh';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&format=svg&data=${encodeURIComponent(publicHttpsUrl)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicHttpsUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5 text-slate-900 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-700 font-mono text-xs font-bold uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <Wifi className="w-4 h-4 text-emerald-600" />
            <span>Active Global HTTPS Deployment</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-black text-slate-950">
            Open on Mobile or Any Network
          </h3>
          <p className="text-xs text-slate-600">
            Scan this QR code with your iPhone or Android camera to instantly view the website live on mobile.
          </p>
        </div>

        {/* QR Code Container */}
        <div className="p-4 rounded-2xl bg-slate-950 text-white flex flex-col items-center justify-center space-y-3 shadow-inner">
          <div className="p-3 bg-white rounded-xl shadow-lg">
            <img 
              src={qrCodeUrl} 
              alt="Scan to open DGW Solutions on Mobile Phone" 
              className="w-40 h-40 object-contain"
            />
          </div>
          <span className="text-[11px] font-mono text-amber-400 font-bold flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Scan with Phone Camera (No App Needed)</span>
          </span>
        </div>

        {/* Public HTTPS URL Link Box */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-300 space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase">
            <span>Public HTTPS URL:</span>
            <span className="text-emerald-700 font-black">SSL Secured 🔒</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <input
              type="text"
              readOnly
              value={publicHttpsUrl}
              className="bg-white px-3 py-2 rounded-xl border border-slate-200 text-slate-900 font-bold text-xs w-full outline-none select-all"
            />
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors shadow-xs"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={publicHttpsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs text-center shadow-md transition-colors"
          >
            Open in New Tab ↗
          </a>
          <button
            onClick={onClose}
            className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
