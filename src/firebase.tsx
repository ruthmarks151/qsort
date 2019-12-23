import * as firebase from 'firebase';
import {PileId, pileIds, Sort} from "./types/Sort";
import {StatementString} from "./types/SortType";
type DocumentReference = firebase.firestore.DocumentReference;

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

// databaseRef.collection("sorts").get().then((querySnapshot) => {
//     querySnapshot.forEach(function (doc) {
//         const result = doc.data().result as { [key: string]: StatementString[]};
//         (doc.data().sortType as DocumentReference).get().then((st) =>{
//             const stData = st.data();
//             if (stData !== undefined){
//                 const statements = stData.statements;
//                 doc.ref.update({
//                     resultIds: indiciesValues.reduce((res, i) => {
//                         res[i] = result[i].map(s => statements.map((y: {statement: string}) => y.statement).indexOf(s));
//                         return res;
//                     }, {} as {[key: string]: number[]})
//                 })
//             }
//         })
//
//     })
// }).catch(function (error) {
//     console.log("Error getting document:", error);
// });

export {databaseRef, Timestamp};