import {databaseRef} from "../firebase";
import {Record} from "immutable";

type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

export class Factor extends Record({
    name: undefined as unknown as string
}){
    constructor(props: {name: string | undefined}) {
        if (props.name === undefined) throw Error("No name provided to Factor");
        super(props);
    }
}

export class Statement extends Record({
    statement: undefined as unknown as string,
    factors:  undefined as unknown as number[]
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

export class SortType extends Record({
    id: undefined as unknown as string,
    distribution: undefined as unknown as number[],
    factors: undefined as unknown as Factor[],
    name: undefined as unknown as string,
    statements: undefined as unknown as Statement[]
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