import {databaseRef} from "../firebase";
import firebase from "firebase";
type DocumentReference = firebase.firestore.DocumentReference;
type DocumentData = firebase.firestore.DocumentData;


export function mapResultsToStatementPositions(){
    databaseRef.collection("sorts").get().then((qs) =>{
        qs.forEach((doc)=>{
            const {result, sortType, ...rest} = doc.data();
            const qSet = databaseRef.collection("qSets").doc(sortType.id as string);
            qSet.get().then(snap => {
                const {statements, ...others} = snap.data() as DocumentData;
                const statementPositions = {} as {[key: string]: any};
                for (let [statementCode, {statement, ...x}] of Object.entries(statements) as [string, {statement: string, factors: any[]}][]) {
                    console.log(`${statementCode}: ${statement}`);
                    statementPositions[statementCode] = (Object.entries(result as {[key:string]:string[]}))
                        .reduce((res, [i, list1]) => {
                            return list1.indexOf(statement) !== -1 ? parseInt(i) : res;
                        }, -1)
                }
                console.log(statementPositions);
                databaseRef.collection("qSorts").doc(doc.id).set({result, qSet, statementPositions, ...rest})
            });
        })
    });

}
