import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
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

    // Subscribe to real Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Map to internal AdminUser representation
        // For production authorization: Custom Claims can be inspected via getIdTokenResult()
        try {
          const tokenResult = await firebaseUser.getIdTokenResult();
          const isAdmin = tokenResult.claims?.admin === true;

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Administrator',
            photoURL: firebaseUser.photoURL,
            isAdminAuthorized: isAdmin
          });
        } catch {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || 'Administrator',
            photoURL: firebaseUser.photoURL,
            isAdminAuthorized: false
          });
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
      const errorMsg = 'Firebase Authentication is not yet configured. Please add your Firebase API keys to .env.local to enable admin sign-in.';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }

    // 2. Real Firebase Authentication Call
    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const tokenResult = await userCredential.user.getIdTokenResult();
      const isAdmin = tokenResult.claims?.admin === true;
      
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || userCredential.user.email?.split('@')[0] || 'Administrator',
        photoURL: userCredential.user.photoURL,
        isAdminAuthorized: isAdmin
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
    isAuthenticated: Boolean(user),
    isFirebaseReady: isFirebaseConfigured,
    authError,
    signIn,
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
