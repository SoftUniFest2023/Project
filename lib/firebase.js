// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  createUserWithEmailAndPassword as createUser,
  signInWithEmailAndPassword as signIn,
  signInWithPopup as signInPopup,
  GoogleAuthProvider,
  onAuthStateChanged as authStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyA_VfP2NNgWBnn7B_WFIJ3YGSxNFF2RZE0",
  authDomain: "softunifest-e0e23.firebaseapp.com",
  projectId: "softunifest-e0e23",
  storageBucket: "softunifest-e0e23.appspot.com",
  messagingSenderId: "447017395077",
  appId: "1:447017395077:web:a5bdf81299f77ecf0edaec",
  measurementId: "G-CTZ8HE0KXM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  auth,
  createUser,
  signIn,
  signInPopup,
  GoogleAuthProvider,
  authStateChanged,
  signOut,
  doc,
  setDoc,
  getDoc,
  db,
  collection,
  addDoc,
  storage,
  ref,
  uploadBytes,
};
