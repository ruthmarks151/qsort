import React, {useState, useEffect, useRef} from 'react';
// import * as actions from './actions';
// import {connect} from 'react-redux';

import LikertSort from './LikertSort';
import BucketTransposition from './BucketTransposition'
import {distribution, sorts} from './inventory'
import BucketAnnealer from './BucketAnnealer'
import Analysis, {correlation} from './Analysis'
import {databaseRef, Timestamp} from './firebase.js'
import SortPicker, {useStyles} from "./SortPicker";
import {asSortMapping, getSort, Indicies, pushSort, Sort, sortTypeRef} from "./types/Sort";
import {SortType, StatementString} from "./types/SortType";
import {TextField} from "@material-ui/core";

// import {StatementString} from "./types/SortType";

interface SortMetaData {
    note: string;
    sortClass: string;
    sortedBy: string;
}

function SortMetadata(props: { sortMetaData: SortMetaData, onSortMetaDataChanged: (_: SortMetaData) => void }) {
    const classes = useStyles();

    const sortedByField = useRef(null);
    const sortClassField = useRef(null);
    const noteField = useRef(null);

    const changed = () => {

        if (sortedByField.current != null && sortClassField.current != null && noteField.current != null) {

            props.onSortMetaDataChanged({
                // @ts-ignore
                note: noteField.current.input.value,
                // @ts-ignore
                sortClass: sortClassField.current.input.value,
                // @ts-ignore
                sortedBy: sortedByField.current.input.value,
            })
        }
    };

    const handleChangeFor = (field: "note" | "sortClass" | "sortedBy") => (event: React.ChangeEvent<HTMLInputElement>) => {
        var newMeta = {
            ...props.sortMetaData,
        } as SortMetaData;
        newMeta[field] = event.target.value;
        props.onSortMetaDataChanged(newMeta);
    };

    return (
        <div>
            <TextField className={classes.formControl} id="sorted-by-field" ref={sortedByField} label="Sorted By"
                       variant="outlined" onChange={handleChangeFor("sortedBy")}
                       value={props.sortMetaData.sortedBy}/>
            <TextField className={classes.formControl} id="sort-class-field" ref={sortClassField} label="Sort Class"
                       variant="outlined"
                       onChange={handleChangeFor("sortClass")} value={props.sortMetaData.sortClass}/>
            <TextField className={classes.formControl} id="note-field" ref={noteField} label="Note" variant="outlined"
                       onChange={handleChangeFor("note")}
                       value={props.sortMetaData.note}/>

        </div>
    );
}

interface InvestigatorProps {
    sortType: SortType | null;
    primarySort: Sort | null;
    comparisonSort: Sort | null;
    sortMetaData: SortMetaData;
    onSortSaved: (_: Sort) => void;
}

function Investigator(props: InvestigatorProps) {
    const [likertResults, setLikertResults] = useState<StatementString[][] | null>(null);
    const [bucketResults, setBucketResults] = useState<StatementString[][] | null>(null);

    const sortType = props.sortType;
    const primarySort = props.primarySort;
    const comparisonSort = props.comparisonSort;

    if (sortType != null) {
        if (primarySort == null) {
            if (likertResults != null) {
                if (bucketResults != null) {
                    return <BucketAnnealer sort={bucketResults} //bucketResults}
                                           onComplete={(x: StatementString[][]) => {
                                               console.log(x);
                                               pushSort({
                                                   ...props.sortMetaData,
                                                   result: asSortMapping(x),
                                                   sort: sortTypeRef(sortType.id),
                                                   sortedOn: Timestamp.now()
                                               }, props.onSortSaved);
                                           }}/>;
                } else {
                    return <BucketTransposition sortType={sortType}
                                                source={likertResults}
                                                onComplete={(x) => {
                                                    console.log(x);
                                                    setBucketResults(x);
                                                }}/>;
                }
            } else {
                return <LikertSort sortType={sortType}
                                   onComplete={(x) => {
                                       setLikertResults(x);
                                   }}/>;
            }
        } else if (comparisonSort != null) {
            const shape = sortType.distribution;
            const primaryArray = shape.reduce((arr, _, i) => [...arr, primarySort.result[String(i) as Indicies]], [] as StatementString[][]);
            const comparisonArray = shape.reduce((arr, _, i) => [...arr, comparisonSort.result[String(i) as Indicies]], [] as StatementString[][]);

            const primaryFits = shape.reduce((fits, fitLen, i) => fits && fitLen === primaryArray[i].length, true);
            const comparisonFits = shape.reduce((fits, fitLen, i) => fits && fitLen === comparisonArray[i].length, true);
            if (!primaryFits) {
                return <h3>The primary isn't the right shape</h3>
            } else if (!comparisonFits) {
                return <h3>The comparison isn't the right shape</h3>
            } else { // Both sorts are finished
                return <Analysis sortType={sortType} primarySort={primarySort} comparisonSort={comparisonSort}/>
            }
        } else {
            return <h3>Select a comparison sort</h3>
        }
    } else {
        return <h3>Select a sort type</h3>
    }

}

export interface BodyProps {

}

function Body(props: BodyProps) {
    const blankSortMetaData = {
        note: "",
        sortClass: "",
        sortedBy: "",
    };

    const [primarySort, setPrimarySort] = useState<Sort | null>(null);
    const [comparisonSort, setComparisonSort] = useState<Sort | null>(null);
    const [sortType, setSortType] = useState<SortType | null>(null);
    const [sortMetaData, setSortMetaData] = useState<SortMetaData>(blankSortMetaData);


    const onSortsSelected = (primarySortId: string, comparisonSortId: string) => {
        getSort(primarySortId, (sort) => {
            setPrimarySort(sort);
            setSortMetaData(sort as SortMetaData)
        });
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
        <SortMetadata sortMetaData={sortMetaData} onSortMetaDataChanged={setSortMetaData}/>
        <Investigator sortType={sortType} sortMetaData={sortMetaData} primarySort={primarySort}
                      comparisonSort={comparisonSort} onSortSaved={(sort: Sort) => {
            setPrimarySort(sort);
            setSortMetaData(sort != null ? (sort as SortMetaData) : blankSortMetaData)
        }}/>
    </React.Fragment>
}

export default Body;
