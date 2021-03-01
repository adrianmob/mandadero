import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDaRDLh0TY8zfndLEbd3HCJ44Pt7BtQP28",
  authDomain: "mandadero-f2403.firebaseapp.com",
  projectId: "mandadero-f2403",
  storageBucket: "mandadero-f2403.appspot.com",
  messagingSenderId: "866042130136",
  appId: "1:866042130136:web:db55287a57efe3bb6d31ad",
  measurementId: "G-BP1DHYCFYR",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

export { db, firebase, storage };
