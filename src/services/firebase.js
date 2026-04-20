<<<<<<< HEAD
// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

Object.keys(firebaseConfig).forEach(key => {
  if (!firebaseConfig[key]) {
    console.error(`Firebase configuration error: Missing value for ${key}. Check your .env file.`);
  }
});

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
=======
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const fallbackFirebaseConfig = {
  apiKey: 'AIzaSyAi6Mmc3lTe1KoZPcVbrrPYXvE9l7cZjC4',
  authDomain: 'zelda-project-3ae0b.firebaseapp.com',
  projectId: 'zelda-project-3ae0b',
  storageBucket: 'zelda-project-3ae0b.firebasestorage.app',
  messagingSenderId: '640758966050',
  appId: '1:640758966050:web:b92f56a4c07c0c5e51e77b',
}

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || fallbackFirebaseConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || fallbackFirebaseConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || fallbackFirebaseConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || fallbackFirebaseConfig.storageBucket,
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || fallbackFirebaseConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || fallbackFirebaseConfig.appId,
}

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)
>>>>>>> ca7a0c4 (Añado .env al gitignore)
