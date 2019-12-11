import {SortType, StatementString} from "./SortType";
import {databaseRef} from "../firebase";
import firebase from "firebase";
type DocumentReference = firebase.firestore.DocumentReference;


export type Indicies = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

export type SortMapping = {
    "0": StatementString[],
    "1": StatementString[],
    "2": StatementString[],
    "3": StatementString[],
    "4": StatementString[],
    "5": StatementString[],
    "6": StatementString[],
    "7": StatementString[],
    "8": StatementString[]
}

export interface Sort {
    id?: string,
    note: string,
    result: SortMapping,
    sort: SortType | DocumentReference,
    sortClass: string,
    sortedBy: string,
    sortedOn: any
};

export function asSortMapping(x: StatementString[][]): SortMapping {
    return x.reduce(function (prev: SortMapping, current: StatementString[], i: number) {
        prev[String(i) as Indicies] = current;
        return prev;
    }, {} as SortMapping) as SortMapping
}


export function sortTypeRef(sortTypeId: string): DocumentReference {
    return databaseRef.collection('sortTypes').doc(sortTypeId);
}

export function listenForSortsByType(sortTypeId: string, onUpdate: (_: Sort[]) => void): () => void {
    return (databaseRef.collection("sorts")
        .where("sort", "==", sortTypeRef(sortTypeId))
        .onSnapshot(function (querySnapshot) {
            debugger
            var sorts: Sort[] = [];
            querySnapshot.forEach(function (doc) {
                var s = doc.data();
                s.id = doc.id;
                sorts.push(s as Sort);
            });
            onUpdate(sorts)
        }));
}

export function pushSort(sort: Sort, onId: (_: string) => void) {
    // Add a new document with a generated id.
    databaseRef.collection("sorts").add(sort)
        .then(function (docRef) {
            onId(docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

export function sortName(s: Sort): string {
    return s.sort.id + " by " + s.sortedBy + " as a " + s.sortClass + " on " + s.sortedOn.toDate().toDateString();
}