import * as firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChcodCcIL1zJWnW-L_sKhrHVb6xmJXiow",
  authDomain: "chat-ced49.firebaseapp.com",
  projectId: "chat-ced49",
  storageBucket: "chat-ced49.appspot.com",
  messagingSenderId: "101657070115",
  appId: "1:101657070115:web:b4a7e9bff20db0b7627f96",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
