
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBnmq9ePnXmRUJk6ShVxiqftNA7p0Ge8jM",
  authDomain: "s3-bucket-f2778.firebaseapp.com",
  projectId: "s3-bucket-f2778",
  storageBucket: "s3-bucket-f2778.appspot.com",
  messagingSenderId: "614714322150",
  appId: "1:614714322150:web:935680b546dc66d3761f27",
  measurementId: "G-59W5RGTLDY"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const firestore = firebase.firestore(); 

export { db, auth, storage, firestore };
