import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA6DxSIjeQDnXQkSDrJNApDkW8N_fB3q34",
  authDomain: "firelucent.firebaseapp.com",
  databaseURL: "https://firelucent-default-rtdb.firebaseio.com",
  projectId: "firelucent",
  storageBucket: "firelucent.appspot.com",
  messagingSenderId: "707707824794",
  appId: "1:707707824794:web:bf19ecb65ce7ae5b350d23",
  measurementId: "G-8LR09JT7ZR",
};

const { FieldValue } = firebase.firestore;

export { firebase, FieldValue };
  
const myApp = firebase.initializeApp(firebaseConfig);

export const auth = myApp.auth();

export const db = myApp.firestore();

export const storage = myApp.storage();

export const facebookProvider = new firebase.auth.FacebookAuthProvider();
