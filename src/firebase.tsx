import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAcqxL3VA0zDjCBhFFQyHtZSXrTEyao-4g",
    authDomain: "congruency-app.firebaseapp.com",
    databaseURL: "https://congruency-app.firebaseio.com",
    projectId: "congruency-app",
    storageBucket: "congruency-app.appspot.com",
    messagingSenderId: "492208318797",
    appId: "1:492208318797:web:0a3cbada7b2926c05b2f04",
    measurementId: "G-T86P16XSYG"
};

firebase.initializeApp(firebaseConfig);


const databaseRef = firebase.firestore();
const Timestamp = firebase.firestore.Timestamp;

export {databaseRef, Timestamp};
