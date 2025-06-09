// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBapcUpVTqpoNiyZYoQbalIy0tP3svLO1A",
  authDomain: "alerta-cidadao-71263.firebaseapp.com",
  projectId: "alerta-cidadao-71263",
  storageBucket: "alerta-cidadao-71263.appspot.com", 
  messagingSenderId: "285250192835",
  appId: "1:285250192835:web:91a400d19309ed3a5ba976",
  measurementId: "G-QXGS6B0PEK",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default { auth }
