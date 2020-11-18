import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD9Ruu8dHAxPGFDQ6Ah3rUpiXcQcJ4DtLg",
  authDomain: "todo-webapp-c0610.firebaseapp.com",
  databaseURL: "https://todo-webapp-c0610.firebaseio.com",
  projectId: "todo-webapp-c0610",
  storageBucket: "todo-webapp-c0610.appspot.com",
  messagingSenderId: "833251312667",
  appId: "1:833251312667:web:9ac0642596a1a3b80764be",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
