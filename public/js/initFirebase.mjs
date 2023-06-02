import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-lite.js";


const firebaseConfig = {
  apiKey: "AIzaSyC2oeUyooyiYclf5AnrrR8-kS5jjbF5HHE",
  authDomain: "webapp23-group4.firebaseapp.com",
  projectId: "webapp23-group4",
  storageBucket: "webapp23-group4.appspot.com",
  messagingSenderId: "997811240977",
  appId: "1:997811240977:web:aa53619ab49317148631b0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
