import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'webshop-4a611.firebaseapp.com',
  projectId: 'webshop-4a611',
  storageBucket: 'webshop-4a611.appspot.com',
  messagingSenderId: '337577179409',
  appId: '1:337577179409:web:d6e1513b4a2def79c1b4b0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider}