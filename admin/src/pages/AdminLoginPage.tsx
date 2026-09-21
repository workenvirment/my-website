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
  EyeOff,
  X
} from 'lucide-react';

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
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10">
        
        {/* Brand Header */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-white border border-white/30 shadow-xl shadow-blue-950/40 mx-auto">
            <img
              src="/dgw-logo.png"
              alt="DGW Solutions LLC"
              width={1024}
              height={512}
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              DGW SOLUTIONS <span className="text-blue-400">LLC</span>
            </h1>
            <div className="font-mono text-[10.5px] text-slate-400 uppercase tracking-widest block mt-1 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LOGISTICS OPERATIONS CONTROL CENTER</span>
            </div>
          </div>
        </div>

        {/* Configuration Notice */}
        {!isFirebaseReady && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-1.5">
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

        {/* Authentication Form Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-7 space-y-5 shadow-2xl relative overflow-hidden">
          
          <div className="flex items-center justify-between border-b border-[#1B293E] pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                Administrator Secure Login
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              256-bit SSL
            </span>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 animate-fade-in-scale">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1 text-[11.5px]">
                <p className="font-bold text-red-300">Authentication Failed</p>
                <p className="text-red-300/90 mt-0.5">{authError}</p>
              </div>
              <button onClick={clearError} className="text-slate-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10.5px] font-mono uppercase text-slate-400 font-bold mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dgwsolutionllc.com"
                  className="w-full h-10 pl-9 pr-3 rounded-xl bg-[#08101C] border border-[#1B293E] text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10.5px] font-mono uppercase text-slate-400 font-bold mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-10 pl-9 pr-10 rounded-xl bg-[#08101C] border border-[#1B293E] text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2 transition-all cursor-pointer border border-blue-400/30 disabled:opacity-50"
            >
              {isSubmitting || isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  <span>Authenticate Session</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-[#1B293E] flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>DGW Auth Gateway v2.5</span>
            <span className="text-blue-400">Firebase Custom Claim</span>
          </div>
        </div>
      </div>
    </div>
  );
};
