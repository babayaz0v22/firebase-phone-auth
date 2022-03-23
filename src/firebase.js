import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBtolzXxBedPcHWZrn5RZE4veOuUt7la_8",
    authDomain: "phone-authentication-35ebb.firebaseapp.com",
    projectId: "phone-authentication-35ebb",
    storageBucket: "phone-authentication-35ebb.appspot.com",
    messagingSenderId: "467434327570",
    appId: "1:467434327570:web:0052cc76450c701d79d2cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export default app;