import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDS3l0Gmyx_Ym4xSmwv4OKinhOZca8mb0",
  authDomain: "telecom-electronics.firebaseapp.com",
  projectId: "telecom-electronics",
  storageBucket: "telecom-electronics.firebasestorage.app",
  messagingSenderId: "949451440107",
  appId: "1:949451440107:web:51f6ba30bccc4a249d63ae",
  measurementId: "G-3W1FVGL1MH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Enable Firestore offline persistence for faster loading
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one tab at a time
    console.warn('Firestore persistence failed: Multiple tabs open');
  } else if (err.code === 'unimplemented') {
    // Browser doesn't support persistence
    console.warn('Firestore persistence not supported');
  }
});

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);

// Initialize Analytics (only in production/browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
