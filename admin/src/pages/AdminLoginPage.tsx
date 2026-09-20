import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Key, 
  AlertCircle, 
  Loader2, 
  Server, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import { DgwTruckLogo } from '../components/common/DgwTruckLogo';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
  const { signIn, isLoading, authError, clearError, isFirebaseReady, configStatus } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    const result = await signIn(email, password);
    setIsSubmitting(false);

    if (result.success) {
      onLoginSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans select-none">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10">
        
        {/* Brand Header */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0D1624] border border-blue-500/30 shadow-xl shadow-blue-950 p-2 mx-auto">
            <DgwTruckLogo className="w-12 h-12" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              DGW SOLUTIONS <span className="text-blue-400">LLC</span>
            </h1>
            <div className="font-mono text-[11px] text-slate-400 uppercase tracking-widest block mt-1 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>TRUCKING OPERATIONS CONTROL CENTER</span>
            </div>
          </div>
        </div>

        {/* Configuration Notice */}
        {!isFirebaseReady && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <Server className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Firebase Configuration Standby</span>
            </div>
            <p className="text-amber-200/90 leading-relaxed text-[11px]">
              Add your Firebase project API keys to <code>admin/.env.local</code> to authenticate.
            </p>
            {configStatus.missingKeys.length > 0 && (
              <div className="font-mono text-[10px] text-amber-400/80">
                Required: {configStatus.missingKeys.join(', ')}
              </div>
            )}
          </div>
        )}

        {/* Login Form Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1624] border border-[#1E2C3F] shadow-2xl space-y-5">
          
          <div className="flex items-center justify-between border-b border-[#1E2C3F] pb-3.5">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              <span>Operator Authentication</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
              <ShieldCheck className="w-3 h-3" />
              <span>Encrypted Session</span>
            </div>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-slate-300 font-bold">Operator Email *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => {
                    if (authError) clearError();
                    setEmail(e.target.value);
                  }}
                  placeholder="admin@dgwsolutionllc.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111C2B] border border-[#1E2C3F] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-slate-300 font-bold">Password *</label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    if (authError) clearError();
                    setPassword(e.target.value);
                  }}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#111C2B] border border-[#1E2C3F] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-bold text-xs shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting || isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Authenticating Operator...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-blue-200" />
                  <span>Sign In to Control Center</span>
                </>
              )}
            </button>
          </form>

          {/* Security Subtext */}
          <p className="text-[10px] text-slate-500 text-center font-mono leading-relaxed pt-1">
            Restricted access. Authorized DGW Solutions LLC dispatch personnel only.
          </p>

        </div>

      </div>

    </div>
  );
};
