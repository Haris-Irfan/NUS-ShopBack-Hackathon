import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCNs0dmj_xnh1BTd7F-31nZVH385mIYAK4",
  authDomain: "nus-shopback-hackathon.firebaseapp.com",
  projectId: "nus-shopback-hackathon",
  storageBucket: "nus-shopback-hackathon.firebasestorage.app",
  messagingSenderId: "342825868584",
  appId: "1:342825868584:web:605359965b201836ea041d"
};

export const app = initializeApp(firebaseConfig)
export const database = getFirestore(app)

export async function createUser(username : string) {
    try {
        const response = await addDoc(collection(database, "users"), {
            "username" : username,
            "streak" : [],
            "purchases" : [],
            "missions" : []
        })
    } catch (error) {
        console.log("Error", error)
    }
}