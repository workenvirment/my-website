import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as fbSignOut, 
  onAuthStateChanged, 
  type Auth, 
  type User as FirebaseUser 
} from 'firebase/auth';

// Safely extract environment variables from Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

// Check if Firebase configuration keys have been provided
export const isFirebaseConfigured: boolean = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'YOUR_FIREBASE_API_KEY'
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;

try {
  if (isFirebaseConfigured) {
    app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    console.info('[Firebase] Initialized successfully with configured project credentials.');
  } else {
    console.info('[Firebase] Running in Mock / Demo Authentication mode. Configure .env with VITE_FIREBASE_* keys to enable live Google Auth.');
  }
} catch (error) {
  console.warn('[Firebase] Initialization caught an error, falling back to safe offline mode:', error);
  app = null;
  auth = null;
  googleProvider = null;
}

export { app, auth, googleProvider };

/**
 * Sign in using Firebase Google Auth Popup with fallback resilience
 */
export async function signInWithGooglePopup(): Promise<FirebaseUser | null> {
  if (!isFirebaseConfigured || !auth || !googleProvider) {
    return null; // Signals caller to use simulated/mock auth
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: unknown) {
    const message = getFirebaseErrorMessage(error);
    console.error('[Firebase Auth Error]:', message, error);
    throw new Error(message);
  }
}

/**
 * Sign out of Firebase safely
 */
export async function signOutFirebase(): Promise<void> {
  if (auth) {
    try {
      await fbSignOut(auth);
    } catch (err) {
      console.warn('[Firebase SignOut Warning]:', err);
    }
  }
}

/**
 * Listen to auth state changes from Firebase
 */
export function subscribeToFirebaseAuthState(callback: (user: FirebaseUser | null) => void): () => void {
  if (!auth) {
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

/**
 * Translates Firebase Auth error codes into clean, actionable user messages
 */
export function getFirebaseErrorMessage(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return 'An unexpected authentication error occurred.';
  }

  const err = error as { code?: string; message?: string };
  const code = err.code || '';

  switch (code) {
    case 'auth/popup-closed-by-user':
      return 'Google sign-in window was closed before completing. Please try again.';
    case 'auth/cancelled-popup-request':
      return 'The sign-in popup was cancelled due to multiple simultaneous requests.';
    case 'auth/popup-blocked':
      return 'The sign-in popup was blocked by your browser. Please allow popups for this site.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized in Firebase Console -> Authentication -> Authorized Domains.';
    case 'auth/operation-not-allowed':
      return 'Google Sign-In is not enabled in your Firebase Project Console.';
    case 'auth/network-request-failed':
      return 'Network connection failed. Please check your internet connection.';
    case 'auth/invalid-api-key':
      return 'Invalid Firebase API Key in configuration. Check your .env file.';
    case 'auth/user-disabled':
      return 'This user account has been disabled by an administrator.';
    default:
      return err.message || 'Authentication failed. Please try again.';
  }
}
