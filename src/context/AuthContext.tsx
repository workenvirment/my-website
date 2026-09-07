import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { UserProfile, UserRole } from '../types';
import { 
  isFirebaseConfigured, 
  signInWithGooglePopup, 
  signOutFirebase, 
  subscribeToFirebaseAuthState,
  getFirebaseErrorMessage 
} from '../config/firebase';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isFirebaseActive: boolean;
  authError: string | null;
  loginWithGoogle: (role: UserRole, customData?: Partial<UserProfile>) => Promise<boolean>;
  loginWithEmail: (email: string, pass: string, role?: UserRole) => Promise<boolean>;
  signUpWithEmail: (name: string, email: string, pass: string, role: UserRole, companyName?: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  switchRole: (role: UserRole) => void;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
  logout: () => Promise<void>;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'dgw_auth_user_v2';
const USERS_DB_KEY = 'dgw_registered_users_store';

const DEFAULT_ROLE_PROFILES: Record<UserRole, UserProfile> = {
  'super-admin': {
    id: 'usr-saad-01',
    name: 'Saad Altaf',
    email: 'saad.altaf@dgwsolutions.com',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    role: 'super-admin',
    companyName: 'DGW SOLUTIONS LLC (Sole MBR)',
    phone: '+1 (800) DGW-LOAD',
    address: '9057 E 50TH AVE STE 22C',
    city: 'Denver',
    state: 'CO',
    zip: '80238',
    status: 'active',
    loginMethod: 'google'
  },
  'admin': {
    id: 'usr-ops-admin',
    name: 'Elena Rostova (Operations Admin)',
    email: 'operations@dgwsolutions.com',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    role: 'admin',
    companyName: 'DGW Solutions Operations HQ',
    phone: '(303) 555-7194',
    city: 'Denver',
    state: 'CO',
    status: 'active',
    loginMethod: 'email'
  },
  'carrier': {
    id: 'usr-vance-101',
    name: 'Robert Vance (Fleet Manager)',
    email: 'robert.vance@vancefreight.com',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    role: 'carrier',
    companyName: 'Vance Freight Logistics LLC',
    mcNumber: 'MC-984210',
    dotNumber: 'DOT-3891024',
    phone: '(214) 555-8942',
    equipmentType: '53 FT Dry Van / Reefer',
    truckCount: 14,
    city: 'Dallas',
    state: 'TX',
    status: 'active',
    loginMethod: 'google'
  },
  'owner-operator': {
    id: 'usr-travis-202',
    name: 'Travis Cole (Owner-Operator)',
    email: 'travis.cole@lonestarhotshot.com',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    role: 'owner-operator',
    companyName: 'Lone Star Hotshot Express LLC',
    mcNumber: 'MC-1198302',
    dotNumber: 'DOT-4182901',
    phone: '(432) 555-8910',
    equipmentType: '40 FT Hotshot Gooseneck',
    truckCount: 1,
    city: 'Midland',
    state: 'TX',
    status: 'active',
    loginMethod: 'email'
  },
  'dispatcher': {
    id: 'usr-dispatch-lead',
    name: 'Marcus Brody (Lead Dispatcher)',
    email: 'dispatch.brody@dgwsolutions.com',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    role: 'dispatcher',
    companyName: 'DGW Command Operations',
    phone: '+1 (800) DGW-LOAD',
    city: 'Atlanta',
    state: 'GA',
    status: 'active',
    loginMethod: 'email'
  },
  'broker': {
    id: 'usr-apex-301',
    name: 'Marcus Brody (Senior Broker)',
    email: 'mbrody@apex3pl.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    role: 'broker',
    companyName: 'Apex 3PL Global Logistics Inc',
    mcNumber: 'MC-894201',
    dotNumber: 'DOT-3104928',
    phone: '(404) 555-3210',
    city: 'Atlanta',
    state: 'GA',
    status: 'active',
    loginMethod: 'google'
  },
  'standard': {
    id: 'usr-standard-01',
    name: 'Alex Mercer (Freight Specialist)',
    email: 'alex.mercer@freightlink.com',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    role: 'standard',
    companyName: 'Logistics Partner User',
    phone: '(800) 555-0199',
    status: 'active',
    loginMethod: 'email'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    // Default initial profile is Super Admin / Saad Altaf for instant evaluation
    return DEFAULT_ROLE_PROFILES['super-admin'];
  });

  // Sync user state to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [user]);

  // Sync with live Firebase Auth when active
  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const unsubscribe = subscribeToFirebaseAuthState((fbUser) => {
      if (!fbUser && user && user.loginMethod === 'google' && isFirebaseConfigured) {
        // Handle external signout
      }
    });
    return () => unsubscribe();
  }, [user]);

  const clearAuthError = useCallback(() => {
    setAuthError(null);
  }, []);

  const loginWithGoogle = async (
    role: UserRole, 
    customData?: Partial<UserProfile>
  ): Promise<boolean> => {
    setIsLoading(true);
    setAuthError(null);

    try {
      if (isFirebaseConfigured) {
        const fbUser = await signInWithGooglePopup();
        if (fbUser) {
          const profile: UserProfile = {
            id: fbUser.uid,
            name: fbUser.displayName || customData?.name || DEFAULT_ROLE_PROFILES[role].name,
            email: fbUser.email || customData?.email || DEFAULT_ROLE_PROFILES[role].email,
            avatarUrl: fbUser.photoURL || DEFAULT_ROLE_PROFILES[role].avatarUrl,
            role,
            companyName: customData?.companyName || DEFAULT_ROLE_PROFILES[role].companyName,
            mcNumber: customData?.mcNumber || DEFAULT_ROLE_PROFILES[role].mcNumber,
            dotNumber: customData?.dotNumber || DEFAULT_ROLE_PROFILES[role].dotNumber,
            phone: customData?.phone || fbUser.phoneNumber || DEFAULT_ROLE_PROFILES[role].phone,
            status: 'active',
            loginMethod: 'google'
          };
          setUser(profile);
          setIsLoading(false);
          return true;
        }
      }

      // Safe Demo / Simulation Fallback
      const baseProfile = DEFAULT_ROLE_PROFILES[role] || DEFAULT_ROLE_PROFILES['carrier'];
      const profile: UserProfile = {
        ...baseProfile,
        id: `google-${role}-${Date.now()}`,
        name: customData?.name || baseProfile.name,
        email: customData?.email || baseProfile.email,
        companyName: customData?.companyName || baseProfile.companyName,
        mcNumber: customData?.mcNumber || baseProfile.mcNumber,
        phone: customData?.phone || baseProfile.phone,
        status: 'active',
        loginMethod: 'google'
      };

      setUser(profile);
      setIsLoading(false);
      return true;
    } catch (error: unknown) {
      const msg = getFirebaseErrorMessage(error);
      setAuthError(msg);
      setIsLoading(false);
      return false;
    }
  };

  const loginWithEmail = async (email: string, _pass: string, role: UserRole = 'carrier'): Promise<boolean> => {
    setIsLoading(true);
    setAuthError(null);

    // Simulate safe delay
    await new Promise(r => setTimeout(r, 450));

    if (!email || !email.includes('@')) {
      setAuthError('Please enter a valid business email address.');
      setIsLoading(false);
      return false;
    }

    try {
      const stored = localStorage.getItem(USERS_DB_KEY);
      const registered = stored ? JSON.parse(stored) : [];
      const match = registered.find((u: UserProfile) => u.email.toLowerCase() === email.toLowerCase());

      if (match) {
        setUser({ ...match, lastLogin: new Date().toLocaleString() });
        setIsLoading(false);
        return true;
      }

      // Generate profile from role template
      const base = DEFAULT_ROLE_PROFILES[role] || DEFAULT_ROLE_PROFILES['carrier'];
      const profile: UserProfile = {
        ...base,
        id: `email-${Date.now()}`,
        email,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        loginMethod: 'email',
        status: 'active'
      };

      setUser(profile);
      setIsLoading(false);
      return true;
    } catch {
      setAuthError('Could not process login. Please try again.');
      setIsLoading(false);
      return false;
    }
  };

  const signUpWithEmail = async (
    name: string, 
    email: string, 
    _pass: string, 
    role: UserRole, 
    companyName?: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setAuthError(null);

    await new Promise(r => setTimeout(r, 500));

    if (!name || !email || !email.includes('@')) {
      setAuthError('Please provide your full name and a valid email address.');
      setIsLoading(false);
      return false;
    }

    try {
      const profile: UserProfile = {
        id: `usr-${Date.now()}`,
        name,
        email,
        avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80`,
        role,
        companyName: companyName || `${name} Logistics LLC`,
        phone: '(800) 555-0199',
        status: 'active',
        createdAt: new Date().toLocaleDateString(),
        lastLogin: new Date().toLocaleString(),
        loginMethod: 'email'
      };

      const stored = localStorage.getItem(USERS_DB_KEY);
      const registered = stored ? JSON.parse(stored) : [];
      registered.unshift(profile);
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(registered));

      setUser(profile);
      setIsLoading(false);
      return true;
    } catch {
      setAuthError('Account registration encountered a storage issue.');
      setIsLoading(false);
      return false;
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setAuthError(null);
    await new Promise(r => setTimeout(r, 600));

    if (!email || !email.includes('@')) {
      setAuthError('Please enter a valid email address to receive password reset instructions.');
      setIsLoading(false);
      return false;
    }

    setIsLoading(false);
    return true;
  };

  const switchRole = (role: UserRole) => {
    const template = DEFAULT_ROLE_PROFILES[role];
    if (template) {
      setUser({
        ...template,
        id: `role-switch-${role}-${Date.now()}`
      });
    }
  };

  const updateProfile = (updatedData: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updatedData });
    }
  };

  const logout = async () => {
    try {
      await signOutFirebase();
    } catch {
      // ignore
    }
    setUser(null);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading,
      isFirebaseActive: isFirebaseConfigured,
      authError,
      loginWithGoogle,
      loginWithEmail,
      signUpWithEmail,
      resetPassword,
      switchRole,
      updateProfile,
      logout,
      clearAuthError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
