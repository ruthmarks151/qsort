import React, {useState, useEffect} from 'react';
// import * as actions from './actions';
// import {connect} from 'react-redux';

import LikertSort from './LikertSort';
import BucketTransposition from './BucketTransposition'
import {distribution, sorts} from './inventory'
import BucketAnnealer from './BucketAnnealer'
import Analysis, {correlation} from './Analysis'
import {databaseRef, Timestamp} from './firebase.js'
import SortPicker from "./SortPicker";
import {asSortMapping, Indicies, pushSort, Sort, sortTypeRef} from "./types/Sort";
import {SortType, StatementString} from "./types/SortType";

// import {StatementString} from "./types/SortType";

interface InvestigatorProps {
    sortType: SortType | null;
    primarySort: Sort | null;
    comparisonSort: Sort | null;
}

function Investigator(props: InvestigatorProps) {
    const [likertResults, setLikertResults] = useState<StatementString[][] | null>(null);
    const [bucketResults, setBucketResults] = useState<StatementString[][] | null>(null);

    const sortType = props.sortType;
    const primarySort = props.primarySort;
    const comparisonSort = props.comparisonSort;

    if (sortType != null) {
        if (primarySort == null) {
            if (likertResults != null){
                if (bucketResults != null){
                    return <BucketAnnealer sort={bucketResults} //bucketResults}
                                           onComplete={(x: StatementString[][]) => {
                                               console.log(x);
                                               pushSort({
                                                   note: "Newly Submitted",
                                                   result: asSortMapping(x),
                                                   sort: sortTypeRef(sortType.id),
                                                   sortClass: "Undefined",
                                                   sortedBy: "Undefined",
                                                   sortedOn: Timestamp.now()
                                               }, (newSortId: string) => alert(newSortId));
                                           }}/>;
                }else {
                    return <BucketTransposition sortType={sortType}
                                                source={likertResults}
                                                onComplete={(x) => {
                                                    console.log(x);
                                                    setBucketResults(x);
                                                }}/>;
                }
            }else {
                return <LikertSort sortType={sortType}
                                   onComplete={(x) => {
                                       setLikertResults(x);
                                   }}/>;
            }
        } else if (comparisonSort != null) {
            const shape = sortType.distribution;
            const primaryArray = shape.reduce((arr, _, i) => [...arr, primarySort.result[String(i) as Indicies]], [] as StatementString[][]);
            const comparisonArray = shape.reduce((arr, _, i) => [...arr, comparisonSort.result[String(i) as Indicies]], []  as StatementString[][]);

            const primaryFits = shape.reduce((fits, fitLen, i) => fits && fitLen === primaryArray[i].length, true);
            const comparisonFits = shape.reduce((fits, fitLen, i) => fits && fitLen === comparisonArray[i].length, true);
            if (!primaryFits){
                return <h3>The primary isn't the right shape</h3>
            }else if (!comparisonFits){
                return <h3>The comparison isn't the right shape</h3>
            } else { // Both sorts are finished
                return <Analysis sortType={sortType} primarySort={primarySort} comparisonSort={comparisonSort}/>
            }
        }else {
            return <h3>Select a comparison sort</h3>
        }
    } else {
        return <h3>Select a sort type</h3>
    }

}

export interface BodyProps {

}

function Body(props: BodyProps) {
    const [primarySort, setPrimarySort] = useState<Sort | null>(null);
    const [comparisonSort, setComparisonSort] = useState<Sort | null>(null);
    const [sortType, setSortType] = useState<SortType | null>(null);

    const onSortsSelected = (primarySortId: string, comparisonSortId: string) => {
        const getSort = (id: string, storeFunction: (_:Sort | null) => void) => {
            databaseRef.collection("sorts").doc(id).get().then((doc) => {
                if (doc.exists) {
                    var d = doc.data() as Sort;
                    d.id = doc.id;
                    storeFunction(d);
                } else {
                    storeFunction(null);
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
        };
        getSort(primarySortId, setPrimarySort);
        getSort(comparisonSortId, setComparisonSort);
    };

    const onSortTypeSelected = (sortTypeId: string) => {
        databaseRef.collection("sortTypes").doc(sortTypeId).get().then((doc) => {
            if (doc.exists) {
                var d = doc.data() as SortType;
                d.id = doc.id;
                setSortType(d);
            } else {
                setSortType(null);
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    };

    return <React.Fragment>
        <SortPicker onSortsSelected={onSortsSelected} onSortTypeSelected={onSortTypeSelected}/>
        <Investigator sortType={sortType} primarySort={primarySort} comparisonSort={comparisonSort}/>
    </React.Fragment>
}

export default Body;
