import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, signOut } from "firebase/auth"

//Firebase project configuartion
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDE4iP825MCMhQdxd4u_weSYArDwkvAlY",
    authDomain: "bhumiotest.firebaseapp.com",
    projectId: "bhumiotest",
    storageBucket: "bhumiotest.appspot.com",
    messagingSenderId: "430826778163",
    appId: "1:430826778163:web:b34fec27a8f676e7d5bd46"
};

//Initialize app 
const app = initializeApp(firebaseConfig);
//Get authorization info
const auth = getAuth(app)
const db = getFirestore(app)

export {
    auth,
    db,
    signOut
}