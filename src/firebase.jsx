import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'; 
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBiXWGQ3ZCI8pXqr_LMxKnWB9RXAny3Lzc",
  authDomain: "maltimart-aa9a4.firebaseapp.com",
  projectId: "maltimart-aa9a4",
  storageBucket: "maltimart-aa9a4.appspot.com",
  messagingSenderId: "443744740667",
  appId: "1:443744740667:web:c4f37a8b349bcde090831e"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app; 