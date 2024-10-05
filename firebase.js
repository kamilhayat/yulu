import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {getFirestore}  from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDqcCnuPjTAZvE7M8JTD901VGrc-Tvcox8",
    authDomain: "yuluapp-b19e7.firebaseapp.com",
    projectId: "yuluapp-b19e7",
    storageBucket: "yuluapp-b19e7.appspot.com",
    messagingSenderId: "551692033123",
    appId: "1:551692033123:web:ae8c3f4b752ac4f07dac56",
    measurementId: "G-L6GXB25MS4"
};

export const FIRREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = getAuth(FIRREBASE_APP)
export const FIREBASE_DB = getFirestore(FIRREBASE_APP)
