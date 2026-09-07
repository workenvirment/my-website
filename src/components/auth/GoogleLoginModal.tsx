import React, { useState } from 'react';
import { X, Truck, Building2, ShieldCheck, ArrowRight, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface GoogleLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessNavigate?: (path: string) => void;
}

export const GoogleLoginModal: React.FC<GoogleLoginModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccessNavigate 
}) => {
  const { loginWithGoogle, isLoading, authError, clearAuthError, isFirebaseActive } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'carrier' | 'broker'>('carrier');
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [customCompany, setCustomCompany] = useState('');
  const [isAdvanced, setIsAdvanced] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    clearAuthError();
    const success = await loginWithGoogle(selectedRole, {
      name: customName.trim() || undefined,
      email: customEmail.trim() || undefined,
      companyName: customCompany.trim() || undefined,
    });

    if (success) {
      onClose();
      if (onSuccessNavigate) {
        onSuccessNavigate('/portal');
      }
    }
  };

  const handleClose = () => {
    clearAuthError();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white text-slate-900 shadow-2xl p-6 sm:p-8 space-y-5 border border-slate-200">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-brand-orange">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-display font-black text-slate-900">
                Logistics Portal Authentication
              </h3>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                <span>Single Sign-On with Google</span>
                {isFirebaseActive ? (
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-bold">
                    Firebase Live
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded font-bold">
                    Simulation Mode
                  </span>
                )}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert Display */}
        {authError && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block">Authentication Notice</span>
              <p className="text-red-700 mt-0.5">{authError}</p>
            </div>
            <button 
              onClick={clearAuthError}
              className="text-red-500 hover:text-red-700 text-xs font-bold"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 1: Role Selection (Carrier vs Broker) */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
            Select Your Account Role
          </label>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedRole('carrier')}
              className={`p-3.5 rounded-2xl text-left border-2 transition-all flex flex-col justify-between space-y-2 ${
                selectedRole === 'carrier'
                  ? 'border-brand-orange bg-orange-50/50 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${selectedRole === 'carrier' ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Truck className="w-4 h-4" />
                </div>
                {selectedRole === 'carrier' && (
                  <span className="text-[10px] font-mono font-bold text-brand-orange bg-orange-100 px-2 py-0.5 rounded">
                    SELECTED
                  </span>
                )}
              </div>
              <div>
                <span className="font-bold text-slate-900 block text-sm">Carrier / Trucker</span>
                <span className="text-[11px] text-slate-500 block">Driver, Owner-Op & Fleet</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('broker')}
              className={`p-3.5 rounded-2xl text-left border-2 transition-all flex flex-col justify-between space-y-2 ${
                selectedRole === 'broker'
                  ? 'border-brand-orange bg-orange-50/50 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${selectedRole === 'broker' ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Building2 className="w-4 h-4" />
                </div>
                {selectedRole === 'broker' && (
                  <span className="text-[10px] font-mono font-bold text-brand-orange bg-orange-100 px-2 py-0.5 rounded">
                    SELECTED
                  </span>
                )}
              </div>
              <div>
                <span className="font-bold text-slate-900 block text-sm">Broker / 3PL</span>
                <span className="text-[11px] text-slate-500 block">Freight Brokerage & Shipper</span>
              </div>
            </button>
          </div>
        </div>

        {/* Optional Custom Profile Override */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setIsAdvanced(!isAdvanced)}
            className="text-[11px] text-slate-500 hover:text-brand-orange font-semibold underline flex items-center gap-1"
          >
            <span>{isAdvanced ? 'Hide custom Google profile fields' : '+ Customize sign-in details (Name / Company)'}</span>
          </button>

          {isAdvanced && (
            <div className="mt-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs animate-in fade-in">
              <div>
                <label className="text-slate-600 font-semibold block mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder={selectedRole === 'carrier' ? 'e.g. Robert Vance' : 'e.g. Marcus Brody'}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange bg-white"
                />
              </div>
              <div>
                <label className="text-slate-600 font-semibold block mb-1">Google Email Address</label>
                <input
                  type="email"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder={selectedRole === 'carrier' ? 'driver.vance@gmail.com' : 'mbrody@apex3pl.com'}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange bg-white"
                />
              </div>
              <div>
                <label className="text-slate-600 font-semibold block mb-1">Company / Carrier Name</label>
                <input
                  type="text"
                  value={customCompany}
                  onChange={(e) => setCustomCompany(e.target.value)}
                  placeholder={selectedRole === 'carrier' ? 'Vance Freight Logistics LLC' : 'Apex 3PL Global Inc'}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-orange bg-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* Primary Action Button: Continue with Google */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleGoogleSignIn}
            className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3.5 group disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2 text-slate-600">
                <Loader2 className="w-4 h-4 animate-spin text-brand-orange" />
                <span>Connecting to Google Account...</span>
              </div>
            ) : (
              <>
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span className="text-sm">
                  Continue with Google as {selectedRole === 'carrier' ? 'Carrier (Trucker)' : 'Freight Broker'}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-1">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Encrypted OAuth 2.0</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
              <span>Instant Verified Access</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
