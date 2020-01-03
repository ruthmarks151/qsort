import React, {useState} from "react";
import {ISortSelectionContext, SortSelectionContext} from "../../components/SortSelectionContext";
import {QSet, StatementString} from "../../types/QSet";
import BucketAnnealer from "./BucketAnnealer";
import {asSortMapping, asStatementPositions, PileId, pushSort, qSort, StatementId} from "../../types/QSort";
import {Timestamp} from "../../firebase";
import BucketTransposition from "./BucketTransposition";
import LikertSort from "./LikertSort";
import {blankSortMetaData, SortMetaData} from "../../types/SortMetadata";
import {Paper} from "@material-ui/core";
import {NavbarContext, useStyles} from "../DashboardBody/NavbarContainer";
import Grid from "@material-ui/core/Grid";
import firebase from "src/firebase";

function sortBody(sortType: QSet | null, primarySort: qSort | null, likertResults: StatementString[][] | null, bucketResults: StatementString[][] | null, sortSelectionContext: ISortSelectionContext, updatePrimarySort: (sort: (qSort | null)) => void, setBucketResults: (value: (((prevState: (StatementString[][] | null)) => (StatementString[][] | null)) | StatementString[][] | null)) => void, setLikertResults: (value: (((prevState: (StatementString[][] | null)) => (StatementString[][] | null)) | StatementString[][] | null)) => void, comparisonSort: qSort | null) {
    if (sortType != null) {
        if (primarySort == null) {
            if (likertResults != null) {
                if (bucketResults != null) {
                    return <BucketAnnealer sort={bucketResults} //bucketResults}
                                           onComplete={(x: StatementString[][]) => {
                                               console.log(x);
                                               pushSort({
                                                   ...sortSelectionContext.sortMetaData,
                                                   result: asSortMapping(x),
                                                   statementPositions: asStatementPositions(sortType, x),
                                                   qSetId: sortType.id,
                                                   sortedOn: Timestamp.now(),
                                                   user: firebase.auth().currentUser?.uid || "Anonymous"
                                               }, updatePrimarySort);
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
            const primaryArray = shape.reduce((arr, _, i) => [...arr, primarySort.group(i as PileId)], [] as StatementId[][]);
            const comparisonArray = shape.reduce((arr, _, i) => [...arr, comparisonSort.group(i as PileId)], [] as StatementId[][]);

            const primaryFits = shape.reduce((fits, fitLen, i) => fits && fitLen === primaryArray[i].length, true);
            const comparisonFits = shape.reduce((fits, fitLen, i) => fits && fitLen === comparisonArray[i].length, true);
            if (!primaryFits) {
                return <h3>The primary isn't the right shape</h3>
            } else if (!comparisonFits) {
                return <h3>The comparison isn't the right shape</h3>
            } else { // Both sorts are finished
                return <h3>Ready for comparison</h3>
            }
        } else {
            return <h3>Step 4: Select a comparison sort</h3>
        }
    } else {
        return <h3>Select a sort type</h3>
    }
}

export function DoSort(props: {}) {
    const sortSelectionContext = React.useContext<ISortSelectionContext>(SortSelectionContext);

    const [likertResults, setLikertResults] = useState<StatementString[][] | null>(null);
    const [bucketResults, setBucketResults] = useState<StatementString[][] | null>(null);

    const sortType = sortSelectionContext.sortType;
    const primarySort = sortSelectionContext.primarySort;
    const comparisonSort = sortSelectionContext.comparisonSort;

    const updatePrimarySort = (sort:qSort | null):void => {
        sortSelectionContext.setPrimarySort(sort);
        sortSelectionContext.setSortMetaData(sort != null ? sort as SortMetaData : blankSortMetaData())
    };
    const classes = useStyles();

    React.useContext(NavbarContext).setTitle("Sorting");

    return <Grid item xs={12}>
        <Paper className={classes.paper} style={{width: "100%", justifyContent: "center", textAlign: "center"}}>
            {sortBody(sortType, primarySort, likertResults, bucketResults, sortSelectionContext, updatePrimarySort, setBucketResults, setLikertResults, comparisonSort)}
        </Paper>
    </Grid>;

}