import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

// Public client-side Firebase environment config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

// Check if valid Firebase configuration is provided via environment variables
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.authDomain && 
  firebaseConfig.projectId
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.error('[Firebase Admin Init Error]:', error);
  }
}

export { app, auth, db };

export const getFirebaseConfigStatus = () => {
  return {
    isConfigured: isFirebaseConfigured,
    missingKeys: [
      !firebaseConfig.apiKey && 'VITE_FIREBASE_API_KEY',
      !firebaseConfig.authDomain && 'VITE_FIREBASE_AUTH_DOMAIN',
      !firebaseConfig.projectId && 'VITE_FIREBASE_PROJECT_ID'
    ].filter(Boolean) as string[]
  };
};
