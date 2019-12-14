import {SortType, StatementString} from "./SortType";
import {databaseRef} from "../firebase";
import firebase from "firebase";
import {Map, Record} from 'immutable'

type DocumentSnapshot = firebase.firestore.DocumentSnapshot;
type DocumentReference = firebase.firestore.DocumentReference;


export type Rank = -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4
export const rankOptions: Rank[] = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

export type PileId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export const pileIds = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// SortMapping - The result of a sorting
export type SortMapping = Map<PileId, StatementString[]>;

export interface SortObj {
    note: string,
    result: SortMapping,
    sortTypeId: string,
    sortClass: string,
    sortedBy: string,
    sortedOn: any
}

// Sort - Document
// The result of one Q Sort by a user
export class Sort extends Record({
    id: undefined as unknown as string, // DB ID
    note: undefined as unknown as string, // Note about the sort
    result: undefined as unknown as SortMapping, // The result of the sort
    sortTypeId: undefined  as unknown as string, // ID of the SortType
    sortClass: undefined as unknown as string, // A description of the sort class
    sortedBy: undefined as unknown as string, // The sorter
    sortedOn: undefined as unknown as any // The date of the sort
}, "Sort"){

    constructor(vals: any) {
        super(vals);
        const optionalFields = [] as string[];
        this.toSeq().forEach((value: any, key: string) => {
            if(optionalFields.indexOf(key) === -1 && value === undefined)
                throw Error(`${key} not defined in Sort constructor`);
            return value
        });
    }

    static fromDocumentSnapshot(doc: DocumentSnapshot): Sort | null {
        const data = doc.data();
        if (data === undefined) return null;
        const params: {[key: string]: any} = data;
        params.id = doc.id;
        params.sortTypeId = data.sortType.id;
        return new Sort(params);
    }

    rankOf(statement: StatementString): Rank {
        const rank = Map(this.result).reduce((rank, statements, statementRank, ) => {
            const index = statements.indexOf(statement);
            if(index === -1){
                return rank;
            }else{
                return statementRank as Rank
            }
        }, null as null | Rank);

        if (rank == null){
            throw(Error("Key Error"))
        }
        return rank
    }

    name(): string {
        return `${this.sortClass} by ${this.sortedBy} on ${this.sortedOn.toDate().toDateString()} using ${this.sortTypeId}`;
    }

    group(i: PileId): StatementString[]{
        const starements = this.result.get(i as PileId);
        if (starements === undefined){
            throw(Error("Key Error"))
        }
        return starements
    }
}

export function asSortMapping(x: StatementString[][]): SortMapping {
    return x.reduce(function (prev: SortMapping, current: StatementString[], i: number) {
        return prev.set(i as PileId, current);
    }, Map<PileId, StatementString[]>()) as SortMapping
}

const sortTypeRef = (sortTypeId: string): DocumentReference => {
    return databaseRef.collection('sortTypes').doc(sortTypeId);
};

export function listenForSortsByType(sortTypeId: string, onUpdate: (_: Sort[]) => void): () => void {
    return (databaseRef.collection("sorts")
        .where("sortType", "==", sortTypeRef(sortTypeId))
        .onSnapshot(function (querySnapshot) {
            var sorts: Sort[] = [];
            querySnapshot.forEach(function (doc) {
                const sort = Sort.fromDocumentSnapshot(doc);
                if (sort != null)
                    sorts.push(sort);
            });
            onUpdate(sorts)
        }));
}

export function getSort(id: string, storeFunction: (_: Sort | null) => void): void {
    databaseRef.collection("sorts").doc(id).get().then((doc) => {
        if (doc.exists) {
            storeFunction(Sort.fromDocumentSnapshot(doc));
        } else {
            storeFunction(null);
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

export function pushSort(sort: SortObj, onComplete: (_: Sort) => void) {
    // Add a new document with a generated id.
    const sortParams = sort as {[key: string]: any};
    sortParams["sortType"] = sortTypeRef(sort["sortTypeId"]);
    sortParams["result"] = sort.result.toJS();
    databaseRef.collection("sorts").add(sortParams)
        .then((ref) => ref.get()
            .then(function (doc) {
                const sortRecord = Sort.fromDocumentSnapshot(doc);
                if (sortRecord === null) throw Error("Sort not created, but without error. This is a real problem");
                onComplete(sortRecord);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            }));
}