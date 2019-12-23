import * as functions from 'firebase-functions';
import * as firebase from "firebase";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

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

export const maintainUserSorts = functions.firestore
    .document("sorts/{sort}")
    .onUpdate((change, context) => {
        const newValue = change.after.data();
        const picked = (({note,
            result,
            sortType,
            sortClass,
            sortedBy,
            sortedOn}) => ({note,
            result,
            sortType,
            sortClass,
            sortedBy,
            sortedOn}))(newValue as any);
        console.log(picked.sortType);
        picked.sortType = picked.sortType.toString();
        picked.sortedOn = picked.sortedOn.toString();
        if (newValue !== undefined) {
            return firebase.firestore().doc(`/users/${newValue.user}`).set({
                sorts: { [`${newValue.sortedOn.toDate().toString()} ${newValue.sortClass}`]: picked}
            },{merge: true});
        }
        return 1;
        }
    );