import {SortType, StatementString} from "./SortType";
import {databaseRef} from "../firebase";
import firebase from "firebase";
import {Map, Record} from 'immutable'

type DocumentReference = firebase.firestore.DocumentReference;


export type Rank = -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4
export const rankOptions: Rank[] = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

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

export interface SortObj {
    note: string,
    result: SortMapping,
    sort: SortType | DocumentReference,
    sortClass: string,
    sortedBy: string,
    sortedOn: any
}

export class Sort extends Record({
    id: undefined as unknown as string,
    note: undefined as unknown as string,
    result: undefined as unknown as SortMapping,
    sort: undefined  as unknown as SortType | DocumentReference,
    sortClass: undefined as unknown as string,
    sortedBy: undefined as unknown as string,
    sortedOn: undefined as unknown as any
}, "Sort"){

    static fromObj(params: {[key: string]: any}) {
        const mandatoryFields = [
            "id",
            "note",
            "result",
            "sort",
            "sortClass",
            "sortedBy",
            "sortedOn"
        ] as string[];
        const optionalFields = [] as string[];
        var constructorObj = {} as {[key: string]: any};
        mandatoryFields.forEach(f => {
            const val = params[f];
            if (val === undefined){
                throw Error(`No value provided for ${f}`)
            }
            constructorObj[f] = val;
        });

        optionalFields.forEach(f => {
            const val = params[f];
            if (val !== undefined){
                constructorObj[f] = val;
            }
        });
        return new Sort(constructorObj);
    }

    rankOf(statement: StatementString): Rank {
        const rank = Map(this.result).reduce((rank, statements, statementRank, ) => {
            const index = statements.indexOf(statement);
            if(index === -1){
                return rank;
            }else{
                return parseInt(statementRank) as Rank
            }
        }, null as null | Rank);

        if (rank == null){
            throw(Error("Key Error"))
        }
        return rank
    }

    name(): string {
        return `${this.sortClass} by ${this.sortedBy} on ${this.sortedOn.toDate().toDateString()} using ${this.sort.id}`;
    }
}

export function asSortMapping(x: StatementString[][]): SortMapping {
    return x.reduce(function (prev: SortMapping, current: StatementString[], i: number) {
        prev[String(i) as Indicies] = current;
        return prev;
    }, {} as SortMapping) as SortMapping
}

export function rankOf(sort: SortObj, statement: StatementString): Rank {
    const rank = Map(sort.result).reduce((rank, statements, statementRank, ) => {
        const index = statements.indexOf(statement);
        if(index === -1){
            return rank;
        }else{
            return parseInt(statementRank) as Rank
        }
    }, null as null | Rank);

    if (rank == null){
        throw(Error("Key Error"))
    }
    return rank
}


export function sortTypeRef(sortTypeId: string): DocumentReference {
    return databaseRef.collection('sortTypes').doc(sortTypeId);
}

export function listenForSortsByType(sortTypeId: string, onUpdate: (_: Sort[]) => void): () => void {
    return (databaseRef.collection("sorts")
        .where("sort", "==", sortTypeRef(sortTypeId))
        .onSnapshot(function (querySnapshot) {
            var sorts: Sort[] = [];
            querySnapshot.forEach(function (doc) {
                var s = doc.data();
                s.id = doc.id;
                sorts.push(Sort.fromObj(s));
            });
            onUpdate(sorts)
        }));
}

export function getSort(id: string, storeFunction: (_: Sort | null) => void): void {
    databaseRef.collection("sorts").doc(id).get().then((doc) => {
        const data = doc.data();
        if (data != undefined) {
            data.id = doc.id;
            storeFunction(Sort.fromObj(data));
        } else {
            storeFunction(null);
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

export function pushSort(sort: SortObj, onComplete: (_: Sort) => void) {
    // Add a new document with a generated id.
    databaseRef.collection("sorts").add(sort)
        .then((ref) => ref.get()
            .then(function (doc) {
                var d = doc.data();
                onComplete(Sort.fromObj({id: doc.id, ...doc.data()}));
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            }));
}

export function sortName(s: SortObj): string {
    return s.sortClass + " by " + s.sortedBy + " on " + s.sortedOn.toDate().toDateString() + " using " + s.sort.id;
}