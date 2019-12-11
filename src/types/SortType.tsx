import {databaseRef} from "../firebase";
import {Sort} from "./Sort";

export interface Factor {
    name: string
}

export interface Statement {
    statement: StatementString,
    factors: number[]
}

export type StatementString = string;

export interface SortType {
    id: string,
    distribution: number[],
    factors: Factor[],
    name: string,
    statements: Statement[]
}

export function listenForSortTypes(onUpdate: (_: SortType[]) => void): () => void {
    return databaseRef.collection("sortTypes")
        .onSnapshot(function (querySnapshot) {
            var sortTypes: SortType[] = [];
            querySnapshot.forEach(function (doc) {
                var st = doc.data();
                st.id = doc.id;
                sortTypes.push(st as SortType);
            });
            onUpdate(sortTypes)
        })
}