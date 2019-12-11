import React, {useState, useEffect} from 'react';
import * as actions from './actions';
import {connect} from 'react-redux';

import LikertSort from './LikertSort';
import BucketTransposition from './BucketTransposition'
import {distribution, sorts} from './inventory'
import BucketAnnealer from './BucketAnnealer'
import Analysis, {correlation} from './Analysis'
import {databaseRef} from './firebase.js'
import SortPicker from "./SortPicker";

// import {StatementString} from "./types/SortType";

const LIKERT_PHASE = "Likert";
const BUCKETING_PHASE = "Bucketing";
const ANNEALING_PHASE = "Annealing";
const PRESENTATION_PHASE = "Presentation";


function Investigator(props) {
    const [phase, setPhase] = useState(LIKERT_PHASE);
    const [likertResults, setLikertResults] = useState(null);
    const [bucketResults, setBucketResults] = useState(null);
    const [results, setResults] = useState(null);

    if (props.sortType == null) {
        return <h3>Select a sort type</h3>
    } else if (props.primarySort == null) {
        switch (phase) {
            case LIKERT_PHASE:
                return <LikertSort sortType={props.sortType}
                                   onComplete={(x) => {
                                       setLikertResults(x);
                                       setPhase(BUCKETING_PHASE)
                                   }}/>;
            case BUCKETING_PHASE:
                return <BucketTransposition n={3}
                                            goalDistribution={distribution}
                                            source={likertResults}
                                            onComplete={(x) => {
                                                console.log(x);
                                                setBucketResults(x);
                                                setPhase(ANNEALING_PHASE);
                                            }}/>;
            case ANNEALING_PHASE:
                return <BucketAnnealer sort={bucketResults} //bucketResults}
                                       onComplete={(x) => {
                                           console.log(x);
                                           setResults(x);
                                           setPhase(PRESENTATION_PHASE);
                                       }}/>;
            default:
                return <p>Something has gone awry with a new sort!</p>
        }
    } else if (props.primarySort != null && props.comparisonSort != null) {

        const shape = props.sortType.distribution;
        const primaryArray = shape.reduce((arr, _, i) => [...arr, props.primarySort.result[i]], []);
        const comparisonArray = shape.reduce((arr, _, i) => [...arr, props.comparisonSort.result[i]], []);

        const primaryFits = shape.reduce((fits, fitLen, i) => fits && fitLen == primaryArray[i].length, true);
        const comparisonFits = shape.reduce((fits, fitLen, i) => fits && fitLen == comparisonArray[i].length, true);
        if (!primaryFits){
            return <p>The primary isn't the right shape</p>
        }else if (!comparisonFits){
            return <p>The comparison isn't the right shape</p>
        } else { // Both sorts are finished

            return <Analysis sortType={props.sortType} primarySort={props.primarySort} comparisonSort={props.comparisonSort}/>
        }
    }else {
        return <p>Something has gone awry big picture!</p>
    }
}

function Body(props) {
    const [primarySort, setPrimarySort] = useState(null);
    const [comparisonSort, setComparisonSort] = useState(null);
    const [sortType, setSortType] = useState(null);

    const onSortsSelected = (primarySortId, comparisonSortId) => {
        const getSort = (id, storeFunction) => {
            databaseRef.collection("sorts").doc(id).get().then((doc) => {
                if (doc.exists) {
                    var d = doc.data();
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

    const onSortTypeSelected = (sortTypeId) => {
        databaseRef.collection("sortTypes").doc(sortTypeId).get().then((doc) => {
            if (doc.exists) {
                var d = doc.data();
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
