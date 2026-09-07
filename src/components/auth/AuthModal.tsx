import React, { useState } from 'react';
import { 
  X, 
  Truck, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  Loader2, 
  Mail, 
  Lock, 
  User, 
  Crown, 
  Wrench, 
  Headphones, 
  UserCheck, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup' | 'forgot' | 'roles';
  onSuccessNavigate?: (path: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialMode = 'login',
  onSuccessNavigate 
}) => {
  const { 
    loginWithGoogle, 
    loginWithEmail, 
    signUpWithEmail, 
    resetPassword,
    switchRole,
    isLoading, 
    authError, 
    clearAuthError, 
    isFirebaseActive 
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'roles'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>('carrier');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    clearAuthError();
    setResetSuccess(false);
    onClose();
  };

  const handleGoogleAuth = async () => {
    clearAuthError();
    const ok = await loginWithGoogle(selectedRole);
    if (ok) {
      handleClose();
      if (onSuccessNavigate) onSuccessNavigate('/dashboard');
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();

    if (mode === 'login') {
      const ok = await loginWithEmail(email, password, selectedRole);
      if (ok) {
        handleClose();
        if (onSuccessNavigate) onSuccessNavigate('/dashboard');
      }
    } else if (mode === 'signup') {
      const ok = await signUpWithEmail(fullName, email, password, selectedRole, companyName);
      if (ok) {
        handleClose();
        if (onSuccessNavigate) onSuccessNavigate('/dashboard');
      }
    } else if (mode === 'forgot') {
      const ok = await resetPassword(email);
      if (ok) setResetSuccess(true);
    }
  };

  const handleQuickRoleSwitch = (role: UserRole) => {
    switchRole(role);
    handleClose();
    if (onSuccessNavigate) onSuccessNavigate('/dashboard');
  };

  const roleOptions: { role: UserRole; title: string; subtitle: string; icon: React.FC<{ className?: string }> }[] = [
    { role: 'super-admin', title: 'Saad Altaf (Sole MBR)', subtitle: 'Super Admin • Denver HQ', icon: Crown },
    { role: 'admin', title: 'Operations Admin', subtitle: 'Platform Manager & Control', icon: Wrench },
    { role: 'carrier', title: 'Carrier Fleet', subtitle: '14 Power Units • Vance Lines', icon: Truck },
    { role: 'owner-operator', title: 'Owner Operator', subtitle: '40ft Hotshot • Travis Cole', icon: UserCheck },
    { role: 'dispatcher', title: 'Logistics Dispatcher', subtitle: 'Live Route Coordinator', icon: Headphones },
    { role: 'broker', title: 'Freight Broker', subtitle: 'Apex 3PL Global Operations', icon: Building2 },
    { role: 'standard', title: 'Standard Operator', subtitle: 'General Platform Access', icon: User },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 text-slate-100 shadow-2xl p-6 sm:p-8 space-y-5 border border-white/10 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-orange to-amber-500 flex items-center justify-center text-white shadow-glow-orange shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-white transform -rotate-45 translate-x-0.5">
                <path d="M12 2L2 22l10-4 10 4L12 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-display font-black text-white">
                DGW Command Access
              </h3>
              <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
                <span>Dispatchers Global World LLC</span>
                {isFirebaseActive ? (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                    Firebase OAuth 2.0
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                    Instant Simulation Mode
                  </span>
                )}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex rounded-xl bg-slate-950 p-1 border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => { setMode('login'); clearAuthError(); }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all ${
              mode === 'login' ? 'bg-brand-orange text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); clearAuthError(); }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all ${
              mode === 'signup' ? 'bg-brand-orange text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => { setMode('roles'); clearAuthError(); }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all ${
              mode === 'roles' ? 'bg-brand-orange text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Switch Persona
          </button>
        </div>

        {/* Error Alert Display */}
        {authError && (
          <div className="p-3.5 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block">Security & Authentication Notice</span>
              <p className="text-red-300 mt-0.5">{authError}</p>
            </div>
            <button onClick={clearAuthError} className="text-red-400 hover:text-red-200">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* MODE 1 & 2: SIGN IN / SIGN UP */}
        {(mode === 'login' || mode === 'signup') && (
          <div className="space-y-4">
            
            {/* Quick Google Sign In */}
            <button
              type="button"
              disabled={isLoading}
              onClick={handleGoogleAuth}
              className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-3 group disabled:opacity-60"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-brand-orange" />
                  <span>Connecting to Google Secure Auth...</span>
                </div>
              ) : (
                <>
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue with Google Single Sign-On</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-3 text-slate-500 text-[11px] font-mono">
              <div className="flex-1 h-px bg-white/10" />
              <span>OR USE WORKSPACE EMAIL</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-3 text-xs">
              {mode === 'signup' && (
                <>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold block">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Robert Vance"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold block">Company / Carrier Name</label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Vance Freight Lines LLC"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold block">Business Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-semibold">Password</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-brand-orange hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              {/* Role Selection for Registration */}
              <div className="space-y-1.5 pt-1">
                <label className="text-slate-300 font-semibold block text-[11px] uppercase tracking-wider">
                  Select Operating Role
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('carrier')}
                    className={`p-2.5 rounded-xl text-left border text-xs flex items-center gap-2 transition-all ${
                      selectedRole === 'carrier' ? 'bg-brand-orange/20 border-brand-orange text-white font-bold' : 'bg-slate-950 border-white/10 text-slate-400'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-brand-orange" />
                    <span>Carrier Fleet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('owner-operator')}
                    className={`p-2.5 rounded-xl text-left border text-xs flex items-center gap-2 transition-all ${
                      selectedRole === 'owner-operator' ? 'bg-brand-orange/20 border-brand-orange text-white font-bold' : 'bg-slate-950 border-white/10 text-slate-400'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 text-amber-400" />
                    <span>Owner-Op</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('broker')}
                    className={`p-2.5 rounded-xl text-left border text-xs flex items-center gap-2 transition-all ${
                      selectedRole === 'broker' ? 'bg-brand-orange/20 border-brand-orange text-white font-bold' : 'bg-slate-950 border-white/10 text-slate-400'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    <span>Freight Broker</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('dispatcher')}
                    className={`p-2.5 rounded-xl text-left border text-xs flex items-center gap-2 transition-all ${
                      selectedRole === 'dispatcher' ? 'bg-brand-orange/20 border-brand-orange text-white font-bold' : 'bg-slate-950 border-white/10 text-slate-400'
                    }`}
                  >
                    <Headphones className="w-4 h-4 text-emerald-400" />
                    <span>Dispatcher</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 text-white font-bold text-xs shadow-glow-orange transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign In to Command Center' : 'Create Logistics Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

          </div>
        )}

        {/* MODE 3: FORGOT PASSWORD */}
        {mode === 'forgot' && (
          <div className="space-y-4 text-xs">
            {resetSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Reset Instructions Dispatched</h4>
                <p className="text-slate-300 text-xs">
                  We sent password recovery instructions to <strong>{email}</strong>. Check your inbox and follow the secure link.
                </p>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleEmailAuth} className="space-y-3">
                <p className="text-slate-400 text-xs">
                  Enter your registered work email. We will send you a secure link to reset your logistics platform password.
                </p>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold block">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="driver@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Send Reset Link</span>}
                </button>

                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="w-full py-2 text-slate-400 hover:text-white text-center block text-xs"
                >
                  Cancel and Back to Login
                </button>
              </form>
            )}
          </div>
        )}

        {/* MODE 4: QUICK PERSONA SWITCHER (FOR TESTING & EVALUATION) */}
        {mode === 'roles' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Instant Persona Switcher (High-Fidelity Evaluation)</span>
            </div>
            <p className="text-xs text-slate-400">
              Select any role below to instantly load its tailored operations dashboard and security permissions:
            </p>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {roleOptions.map((opt) => {
                const IconComponent = opt.icon;
                return (
                  <button
                    key={opt.role}
                    type="button"
                    onClick={() => handleQuickRoleSwitch(opt.role)}
                    className="w-full p-3 rounded-2xl bg-slate-950 hover:bg-brand-orange/20 border border-white/10 hover:border-brand-orange/50 transition-all flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-900 border border-white/10 text-brand-orange group-hover:scale-105 transition-transform">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-white text-xs block group-hover:text-brand-orange transition-colors">
                          {opt.title}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-mono">
                          {opt.subtitle}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Security Badges */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>FMCSA & IRS CP575G Compliant</span>
          </div>
          <span className="font-mono">EIN 42-4868007</span>
        </div>

      </div>

    </div>
  );
};
