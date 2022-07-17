import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyCEiZJoBu3I96FqB_jPLg4r40rWoH-T3Fc',
    authDomain: 'ridiet-74b8b.firebaseapp.com',
    projectId: 'ridiet-74b8b',
    storageBucket: 'ridiet-74b8b.appspot.com',
    messagingSenderId: '926481746722',
    appId: '1:926481746722:web:ae029aa46080d0c0bc337b',
}

const app = initializeApp(firebaseConfig)

// services used
const auth = getAuth(app)

const db = getFirestore(app)

export { app, auth, db }
