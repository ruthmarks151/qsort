import React, {useState} from 'react';
import Analysis from '../Analysis'
import SortPicker from "./SortSelection/SortPicker";
import {Sort} from "../types/Sort";
import {SortType} from "../types/SortType";
import {analysisReady, SortSelectionContext} from "./SortSelectionContext";
import {blankSortMetaData, SortMetaData} from "../types/SortMetadata";
import {SortMetaDataSelector} from "./SortSelection/SortMetaDataSelector";
import {DoSort} from "./SortDoing/DoSort";

function Body(props: {}) {
    const [primarySort, setPrimarySort] = useState<Sort | null>(null);
    const [comparisonSort, setComparisonSort] = useState<Sort | null>(null);
    const [sortType, setSortType] = useState<SortType | null>(null);
    const [sortMetaData, setSortMetaData] = useState<SortMetaData>(blankSortMetaData());

    const updatePrimarySort = (sort:Sort | null):void => {
        setPrimarySort(sort);
        setSortMetaData(sort != null ? sort as SortMetaData : blankSortMetaData())
    };

    const context = {
        sortType: sortType,
        setSortType: setSortType,
        primarySort: primarySort,
        setPrimarySort: setPrimarySort,
        comparisonSort: comparisonSort,
        setComparisonSort: setComparisonSort,
        sortMetaData: sortMetaData,
        setSortMetaData: setSortMetaData
    };

    return <SortSelectionContext.Provider value={context}>
        <SortPicker/>
        <SortMetaDataSelector/>
        {analysisReady(context)
            ? <Analysis sortType={context.sortType!}
                        primarySort={context.primarySort!}
                        comparisonSort={context.comparisonSort!}/>
            : <DoSort onSortSaved={updatePrimarySort}/>}
    </SortSelectionContext.Provider>
}

export default Body;
