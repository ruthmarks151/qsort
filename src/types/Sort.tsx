import {SortType, StatementString} from "./SortType";
import {databaseRef} from "../firebase";

export type Indicies = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface Sort {
    id: string,
    note: string,
    result: {
        0: StatementString[],
        1: StatementString[],
        2: StatementString[],
        3: StatementString[],
        4: StatementString[],
        5: StatementString[],
        6: StatementString[],
        7: StatementString[],
        8: StatementString[]
    },
    sort: SortType,
    sortClass: string,
    sortedBy: string,
    sortedOn: any
};

export function getSortsOfType(sortTypeId: string): Promise<Array<Sort>> {
    const sortTypeDocRef = databaseRef
        .collection('sortTypes')
        .doc(sortTypeId);

    return new Promise<Array<Sort>>(function (resolve, reject) {
        databaseRef.collection("sorts")
            .where("sort", "==", sortTypeDocRef).get()
            .then(function (querySnapshot) {
                var sorts: Sort[] = [];
                querySnapshot.forEach(function (doc) {
                    var s = doc.data();
                    s.id = doc.id;
                    sorts.push(s as Sort);
                });
                resolve(sorts)
            }).catch(function (error) {
            reject(error);
        });
    });
}

export function sortName(s: Sort): string {
    return s.sort.id + " by " + s.sortedBy + " as a " + s.sortClass + " on " + s.sortedOn.toDate().toDateString();
}