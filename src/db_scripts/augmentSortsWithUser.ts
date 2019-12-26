import {databaseRef} from "../firebase";


export function augmentSortsWithUser(){
    databaseRef.collection("sorts").get().then((qs) =>{
        qs.forEach((doc)=>{
            const {sortedBy, user, ...rest} = doc.data();
            databaseRef.collection("sorts").doc(doc.id).set({user : (user ? user : (sortedBy === "Ryan Marks") ? "q692OgdJRtViWMGwD4J27irVIcw2" : "Anonymous"), ...rest})
        })
    });

}
