import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyBSICS5TEzpPOjMBR7FFz2qv6vZcv6A4lA",
  authDomain: "users-d1c7e.firebaseapp.com",
  databaseURL: "https://users-d1c7e-default-rtdb.firebaseio.com",
  projectId: "users-d1c7e",
  storageBucket: "users-d1c7e.appspot.com",
  messagingSenderId: "36329438231",
  appId: "1:36329438231:web:d3c62e4e2c949bf0fdb052",
  measurementId: "G-NBHPEF84WH",

  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = getAuth(app); //returns instance of FB authentication
export default app;
