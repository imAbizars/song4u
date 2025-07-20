import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const apiKey = process.env.apiKey;
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "song4-a3d97.firebaseapp.com",
  projectId: "song4-a3d97",
  storageBucket: "song4-a3d97.firebasestorage.app",
  messagingSenderId: "953837335128",
  appId: "1:953837335128:web:e372ee3bdf1715b543902d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{db}; 