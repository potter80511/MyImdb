import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBArPQpXyVmJwSUgazzQ0pyH-wEQBoYpwQ",
  authDomain: "myimdb-450a6.firebaseapp.com",
  databaseURL: "https://myimdb-450a6.firebaseio.com",
  projectId: "myimdb-450a6",
  storageBucket: "myimdb-450a6.appspot.com",
  messagingSenderId: "685352062009",
  appId: "1:685352062009:web:d63c44880ecb4b341551e8",
  measurementId: "G-MGHLWHNGBF"
};

// Initialize Firebase
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();