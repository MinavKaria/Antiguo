import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCw2JvF20aV1uevHpZ6ylOUd5zJ8Ab94_Q",
  authDomain: "antiguo-55988.firebaseapp.com",
  projectId: "antiguo-55988",
  storageBucket: "antiguo-55988.appspot.com",
  messagingSenderId: "932940692198",
  appId: "1:932940692198:web:b3484c4e5afdb841609927",
  measurementId: "G-Y8XHB5NSPT"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const provider = new GithubAuthProvider();

export { auth, googleProvider, provider};