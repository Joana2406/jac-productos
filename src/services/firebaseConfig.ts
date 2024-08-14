// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcs-a6qDaPXzFzZ7aGmMlRtnSN7be3OyY",
  authDomain: "richi-4d857.firebaseapp.com",
  projectId: "richi-4d857",
  storageBucket: "richi-4d857.appspot.com",
  messagingSenderId: "630423842347",
  appId: "1:630423842347:web:1bb3207910c54e1511046e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();