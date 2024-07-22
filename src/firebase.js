// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzgWu5MFE8S5IP_AZhKuY17El1ZxdfiE0",
  authDomain: "video-streaming-app-a5502.firebaseapp.com",
  projectId: "video-streaming-app-a5502",
  storageBucket: "video-streaming-app-a5502.appspot.com",
  messagingSenderId: "1004865818732",
  appId: "1:1004865818732:web:9d9d1373c8197c64420849"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();