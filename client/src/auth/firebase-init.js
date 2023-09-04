import { initializeApp } from 'firebase/app';
import {
    getAuth,
    connectAuthEmulator
} from 'firebase/auth';
// require('dotenv').config();
const firebaseConfig = {
    apiKey: "AIzaSyDkppvd8-D2Ki4khnXbf-ZKUKwEokJwF7U",
    authDomain: "fir-auth-9289c.firebaseapp.com",
    projectId: "fir-auth-9289c",
    storageBucket: "fir-auth-9289c.appspot.com",
    messagingSenderId: "325163216477",
    appId: "1:325163216477:web:1b17ba7bba5fad53fb27b4",
    measurementId: "G-CBS263L79P"
};

function FirebaseInit() {
    const firebaseApp = initializeApp(firebaseConfig);

    const auth = getAuth(firebaseApp);
// simulates auth locally & doesn't mess with production code
    connectAuthEmulator(auth, "http://localhost:9099");
    return auth;
}

export default FirebaseInit;
// Detect auth state
/*
onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log('logged in!');
    } else {
        console.log('No user');
    }
});*/
