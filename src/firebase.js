import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyC2oeUyooyiYclf5AnrrR8-kS5jjbF5HHE",
  authDomain: "webapp23-group4.firebaseapp.com",
  projectId: "webapp23-group4",
  storageBucket: "webapp23-group4.appspot.com",
  messagingSenderId: "997811240977",
  appId: "1:997811240977:web:aa53619ab49317148631b0"
};


firebase.initializeApp(config);

export default firebase.firestore();
