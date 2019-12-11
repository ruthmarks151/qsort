import {databaseRef} from "../firebase";

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

export function getSortTypes(): Promise<Array<SortType>>{
    return new Promise<Array<SortType>>(function(resolve, reject) {
        databaseRef.collection("sortTypes")
            .get().then(function (querySnapshot) {
            var sortTypes: SortType[] = [];
            querySnapshot.forEach(function (doc) {
                var st = doc.data();
                st.id = doc.id;
                sortTypes.push(st as SortType);
            });
            resolve(sortTypes)
        }).catch(function(error) {
            reject(error);
        });
    });
}