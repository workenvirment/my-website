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
  const { signIn, signInWithGoogle, isLoading, authError, clearError, isFirebaseReady, configStatus } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

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

  const handleGoogleLogin = async () => {
    setIsGoogleSubmitting(true);
    const result = await signInWithGoogle();
    setIsGoogleSubmitting(false);

    if (result.success) {
      onLoginSuccess();
    }
  };

  const isAnyLoading = isLoading || isSubmitting || isGoogleSubmitting;

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans select-none">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10">
        
        {/* Brand Header */}
        <div className="text-center space-y-2.5">
          <div className="flex items-center justify-center mx-auto">
            <img
              src="/dgw-logo.png"
              alt="DGW Solutions LLC"
              width={1024}
              height={512}
              className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
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
              <button onClick={clearError} className="text-slate-400 hover:text-white" aria-label="Dismiss error">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Google Sign In Button */}
          <div>
            <button
              type="button"
              disabled={isAnyLoading}
              onClick={handleGoogleLogin}
              className="w-full h-11 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer border border-slate-200 hover:border-slate-300 disabled:opacity-50 active:scale-[0.99]"
            >
              {isGoogleSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span>Authenticating with Google...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-1">
            <div className="border-t border-[#1B293E] w-full" />
            <span className="bg-[#0A1424] px-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest absolute">
              OR CONTINUE WITH EMAIL
            </span>
          </div>

          {/* Email / Password Form */}
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
              disabled={isAnyLoading}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2 transition-all cursor-pointer border border-blue-400/30 disabled:opacity-50"
            >
              {isSubmitting ? (
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
