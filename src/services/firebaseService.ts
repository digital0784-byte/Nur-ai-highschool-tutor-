/**
 * Firebase Firestore Data Fetching, Cloud Syncing, & Offline Caching
 * Handles graceful degraded offline operation when Firebase is not connected or user is offline
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;
let authInstance: Auth | null = null;

// Firebase configuration from environment
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'nur-ai-highschool.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'nur-ai-highschool-tutor',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'nur-ai-highschool-tutor.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1234567890',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1234567890:web:abcdef',
};

export const getFirebaseApp = (): FirebaseApp => {
  if (!appInstance) {
    const existing = getApps();
    if (existing.length > 0) {
      appInstance = existing[0];
    } else {
      appInstance = initializeApp(firebaseConfig);
    }
  }
  return appInstance;
};

export const getFirestoreDb = (): Firestore | null => {
  try {
    if (!dbInstance) {
      const app = getFirebaseApp();
      dbInstance = getFirestore(app);
      // Attempt local indexedDb offline persistence
      enableIndexedDbPersistence(dbInstance).catch((err) => {
        if (err.code === 'failed-precondition') {
          console.warn('Firestore offline persistence: multiple tabs open');
        } else if (err.code === 'unimplemented') {
          console.warn('Firestore offline persistence not supported in this browser');
        }
      });
    }
    return dbInstance;
  } catch (err) {
    console.warn('Firebase Firestore not provisioned yet, using local cache:', err);
    return null;
  }
};

export const getFirebaseAuth = (): Auth | null => {
  try {
    if (!authInstance) {
      const app = getFirebaseApp();
      authInstance = getAuth(app);
    }
    return authInstance;
  } catch (err) {
    console.warn('Firebase Auth not provisioned yet, using local auth:', err);
    return null;
  }
};

export const firebaseService = {
  getApp: getFirebaseApp,
  getDb: getFirestoreDb,
  getAuth: getFirebaseAuth,
  
  // Offline fallback storage helpers
  saveLocal<T>(key: string, data: T): void {
    try {
      localStorage.setItem(`nur_ai_${key}`, JSON.stringify(data));
    } catch (e) {
      console.warn('localStorage save failed', e);
    }
  },

  loadLocal<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(`nur_ai_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
};
