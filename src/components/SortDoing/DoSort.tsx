import React, {useState} from "react";
import {ISortSelectionContext, SortSelectionContext} from "../SortSelectionContext";
import {StatementString} from "../../types/SortType";
import BucketAnnealer from "./BucketAnnealer";
import {asSortMapping, Indicies, pushSort, Sort} from "../../types/Sort";
import {Timestamp} from "../../firebase";
import BucketTransposition from "./BucketTransposition";
import LikertSort from "./LikertSort";

interface DoSortProps {
    onSortSaved: (_: Sort) => void;
}

export function DoSort(props: DoSortProps) {
    const sortSelectionContext = React.useContext<ISortSelectionContext>(SortSelectionContext);

    const [likertResults, setLikertResults] = useState<StatementString[][] | null>(null);
    const [bucketResults, setBucketResults] = useState<StatementString[][] | null>(null);

    const sortType = sortSelectionContext.sortType;
    const primarySort = sortSelectionContext.primarySort;
    const comparisonSort = sortSelectionContext.comparisonSort;

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
                                                   sortTypeId: sortType.id,
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
            const primaryArray = shape.reduce((arr, _, i) => [...arr, primarySort.group(i as Indicies)], [] as StatementString[][]);
            const comparisonArray = shape.reduce((arr, _, i) => [...arr, comparisonSort.group(i as Indicies)], [] as StatementString[][]);

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