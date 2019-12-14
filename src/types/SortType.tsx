import {databaseRef} from "../firebase";
import {Record} from "immutable";

type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

// Factor - Map
// An analytic factor computed by a sort of a given SortType i.e.: Big 5 Factors
export class Factor extends Record({
    // Canonical Fields
    name: undefined as unknown as string
}){
    constructor(props: {name: string | undefined}) {
        if (props.name === undefined) throw Error("No name provided to Factor");
        super(props);
    }
}

// Statement - Map
// A statement in a SortType
export class Statement extends Record({
    // Canonical Fields
    statement: undefined as unknown as string, // The statement as presented to the user
    factors:  undefined as unknown as number[] // An array of coeffecients corresponding to the list
}){
    constructor(props: {statement: string | undefined, factors: number[] | undefined}) {
        if (props.statement === undefined) throw Error("No statement string provided to Statement");
        if (props.factors === undefined) throw Error("No factors provided to Statement");
        super(props);
    }
}

export type StatementString = string;

export interface SortTypeObj {
    distribution: number[],
    factors: Factor[],
    name: string,
    statements: Statement[]
}

// SortType - Document
// A type of Q Sort that can be performed
export class SortType extends Record({
    id: undefined as unknown as string, // DocumentID as represented in the DB
    distribution: undefined as unknown as number[],
    // The number of cards in each "pile" in the sort.
    // distribution[0] -> The least representative of the subject
    // distribution[distribution.length] -> The most representative of the subject

    factors: undefined as unknown as Factor[], // The factors calculated by this SortType
    name: undefined as unknown as string, // The name of the SortType
    statements: undefined as unknown as Statement[] // The statements in the SortType as Statements
}){
    constructor(vals: any) {
        super(vals);
        const optionalFields = [] as string[];
        this.toSeq().forEach((value: any, key: string) => {
            if(optionalFields.indexOf(key) === -1 && value === undefined)
                throw Error(`${key} not defined in Sort constructor`);
            return value
        });
    }

    static fromDocumentSnapshot(doc: DocumentSnapshot): SortType | null {
        const data = doc.data();
        if (data === undefined) return null;
        const params: {[key: string]: any} = data;
        params.id = doc.id;
        return new SortType(params);
    }
}

export function listenForSortTypes(onUpdate: (_: SortType[]) => void): () => void {
    return databaseRef.collection("sortTypes")
        .onSnapshot(function (querySnapshot) {
            var sortTypes: SortType[] = [];
            querySnapshot.forEach(function (doc) {
                const sortType = SortType.fromDocumentSnapshot(doc);
                if(sortType != null)
                    sortTypes.push(sortType);
            });
            onUpdate(sortTypes)
        })
}

export function getSortType(sortTypeId: string, onSortType: (_:SortType | null) => void):void {
    databaseRef.collection("sortTypes").doc(sortTypeId).get().then((doc) => {
            onSortType(SortType.fromDocumentSnapshot(doc));
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

}