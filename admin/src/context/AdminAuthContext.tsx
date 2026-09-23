import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  type User as FirebaseUser 
} from 'firebase/auth';
import { auth, isFirebaseConfigured, getFirebaseConfigStatus } from '../config/firebase';
import type { AdminUser } from '../types/admin';

interface AdminAuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isFirebaseReady: boolean;
  authError: string | null;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signOutUser: () => Promise<void>;
  clearError: () => void;
  configStatus: { isConfigured: boolean; missingKeys: string[] };
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const configStatus = getFirebaseConfigStatus();

  useEffect(() => {
    // If Firebase is not yet configured in environment variables, mark loading false
    if (!isFirebaseConfigured || !auth) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    const currentAuth = auth;

    // Subscribe to real Firebase auth state changes
    const unsubscribe = onAuthStateChanged(currentAuth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Map to internal AdminUser representation
        // Inspect Custom Claims via getIdTokenResult()
        try {
          const tokenResult = await firebaseUser.getIdTokenResult();
          const isAdmin = tokenResult.claims?.admin === true;

          if (isAdmin) {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Administrator',
              photoURL: firebaseUser.photoURL,
              isAdminAuthorized: true
            });
          } else {
            // User does not possess the required admin custom claim
            setUser(null);
            await firebaseSignOut(currentAuth);
          }
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setAuthError(null);

    // 1. Validation for Firebase configuration
    if (!isFirebaseConfigured || !auth) {
      const errorMsg = 'Firebase Authentication is not yet configured. Please add your Firebase API keys to admin/.env.local to enable admin sign-in.';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }

    const currentAuth = auth;

    // 2. Real Firebase Email/Password Authentication Call
    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(currentAuth, email, password);
      const tokenResult = await userCredential.user.getIdTokenResult(true);
      const isAdmin = tokenResult.claims?.admin === true;

      if (!isAdmin) {
        await firebaseSignOut(currentAuth);
        setUser(null);
        setIsLoading(false);
        const unauthorizedMsg = 'This account is not authorized to access the DGW Admin Portal.';
        setAuthError(unauthorizedMsg);
        return { success: false, error: unauthorizedMsg };
      }
      
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || userCredential.user.email?.split('@')[0] || 'Administrator',
        photoURL: userCredential.user.photoURL,
        isAdminAuthorized: true
      });
      setIsLoading(false);
      return { success: true };
    } catch (err: unknown) {
      setIsLoading(false);
      const firebaseError = err as { code?: string; message?: string };
      let friendlyMessage = 'Authentication failed. Please check your credentials.';

      if (firebaseError.code === 'auth/invalid-credential' || firebaseError.code === 'auth/user-not-found' || firebaseError.code === 'auth/wrong-password') {
        friendlyMessage = 'Invalid email or password.';
      } else if (firebaseError.code === 'auth/too-many-requests') {
        friendlyMessage = 'Access temporarily locked due to multiple failed login attempts. Please try again later.';
      } else if (firebaseError.code === 'auth/user-disabled') {
        friendlyMessage = 'This administrator account has been disabled.';
      } else if (firebaseError.message) {
        friendlyMessage = firebaseError.message;
      }

      setAuthError(friendlyMessage);
      return { success: false, error: friendlyMessage };
    }
  };

  const signInWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    setAuthError(null);

    // 1. Validation for Firebase configuration
    if (!isFirebaseConfigured || !auth) {
      const errorMsg = 'Firebase Authentication is not yet configured. Please add your Firebase API keys to admin/.env.local to enable admin sign-in.';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }

    const currentAuth = auth;

    // 2. Official Firebase Google Authentication Call
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const userCredential = await signInWithPopup(currentAuth, provider);

      // Force refresh token to obtain custom claims
      const tokenResult = await userCredential.user.getIdTokenResult(true);
      const isAdmin = tokenResult.claims?.admin === true;

      if (!isAdmin) {
        // Deny access if user does not have admin == true custom claim
        await firebaseSignOut(currentAuth);
        setUser(null);
        setIsLoading(false);
        const unauthorizedMsg = 'This account is not authorized to access the DGW Admin Portal.';
        setAuthError(unauthorizedMsg);
        return { success: false, error: unauthorizedMsg };
      }

      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || userCredential.user.email?.split('@')[0] || 'Administrator',
        photoURL: userCredential.user.photoURL,
        isAdminAuthorized: true
      });
      setIsLoading(false);
      return { success: true };
    } catch (err: unknown) {
      setIsLoading(false);
      const firebaseError = err as { code?: string; message?: string };

      if (firebaseError.code === 'auth/popup-closed-by-user') {
        return { success: false, error: 'Sign-in window was closed before completing authentication.' };
      }

      let friendlyMessage = 'Google authentication failed. Please try again.';
      if (firebaseError.code === 'auth/popup-blocked') {
        friendlyMessage = 'Sign-in popup was blocked by your browser. Please allow popups for this site.';
      } else if (firebaseError.code === 'auth/account-exists-with-different-credential') {
        friendlyMessage = 'An account already exists with the same email using different sign-in credentials.';
      } else if (firebaseError.code === 'auth/unauthorized-domain') {
        friendlyMessage = 'This domain is not authorized in Firebase OAuth settings.';
      } else if (firebaseError.message) {
        friendlyMessage = firebaseError.message;
      }

      setAuthError(friendlyMessage);
      return { success: false, error: friendlyMessage };
    }
  };

  const signOutUser = async (): Promise<void> => {
    try {
      if (auth && isFirebaseConfigured) {
        await firebaseSignOut(auth);
      }
    } catch (err) {
      console.error('[SignOut Error]:', err);
    } finally {
      setUser(null);
      setAuthError(null);
    }
  };

  const clearError = () => setAuthError(null);

  const value: AdminAuthContextType = {
    user,
    isLoading,
    isAuthenticated: Boolean(user && user.isAdminAuthorized),
    isFirebaseReady: isFirebaseConfigured,
    authError,
    signIn,
    signInWithGoogle,
    signOutUser,
    clearError,
    configStatus
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
