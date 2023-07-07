import { initializeApp}
  from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getFirestore }
  from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore-lite.js";
import { getAuth }
  from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBX4F6Kh0c4D-fwv7KVsR-UXLa57VNzHMA",
  authDomain: "jani-ef760.firebaseapp.com",
  projectId: "jani-ef760",
  storageBucket: "jani-ef760.appspot.com",
  messagingSenderId: "1078123158850",
  appId: "1:1078123158850:web:e7dfc2023d86ae34afbcdb",
  measurementId: "G-Z879M3Z1F5"
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication
const auth = getAuth( app);
// Initialize Cloud Firestore interface
const fsDb = getFirestore();

export { auth, fsDb };