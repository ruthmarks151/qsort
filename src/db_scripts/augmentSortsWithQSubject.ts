import {databaseRef} from "../firebase";

export default function augmentSortsWithQSubject() {
    databaseRef.collection("qSorts").get().then((qs) =>{
        qs.forEach((doc)=>{
            const {sortClass, ...rest} = doc.data();
            let qSubject = null;
            if ((sortClass as string).toLowerCase().indexOf("ideal") !== -1){
                qSubject = databaseRef.collection("qSubjects").doc("ideal")
            } else if ((sortClass as string).toLowerCase().indexOf("self") !== -1){
                qSubject = databaseRef.collection("qSubjects").doc("self")
            } else if ((sortClass as string).toLowerCase().indexOf("other") !== -1){
                qSubject = databaseRef.collection("qSubjects").doc("other_ryan_marks")
            }


            databaseRef.collection("qSorts").doc(doc.id).set({qSubject, sortClass, ...rest});
            console.log("updated "+doc.id)
        })
    });

}