import {databaseRef} from "../firebase";


export function copySortTypesToQSets(){
    databaseRef.collection("sortTypes").get().then((qs) =>{
        qs.forEach((doc)=>{
            const {statements, sortCode, ...rest} = doc.data();
            const reformat = (statements as {statement: string}[]).reduce((o, e, i) => {o[`${sortCode} ${i < 99 ? "0" : ""}${i < 9 ? "0" : ""}${i+1}`] = e; return o}, {} as {[key: string]: any});
            databaseRef.collection("qSets").doc(doc.id).set({statements: reformat, id: doc.id, sortCode, ...rest})
        })
    });

}
