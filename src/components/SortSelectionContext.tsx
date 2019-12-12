// import {StatementString} from "./types/SortType";
import React from "react";
import {SortType} from "../types/SortType";
import {Sort} from "../types/Sort";
import {blankSortMetaData, SortMetaData} from "../types/SortMetadata";

export interface ISortSelectionContext {
    sortType: SortType | null;
    setSortType: (_: SortType | null) => void
    primarySort: Sort | null;
    setPrimarySort: (_: Sort | null) => void;
    comparisonSort: Sort | null;
    setComparisonSort: (_: Sort | null) => void;
    sortMetaData: SortMetaData;
    setSortMetaData: (_: SortMetaData) => void;
}

export function analysisReady(context: ISortSelectionContext): boolean {
    return context.sortType != null && context.primarySort != null && context.comparisonSort != null
}

export const SortSelectionContext = React.createContext<ISortSelectionContext>({
    sortType: null,
    setSortType: (_: SortType | null) => {
    },
    primarySort: null,
    setPrimarySort: (_: Sort | null) => {
    },
    comparisonSort: null,
    setComparisonSort: (_: Sort | null) => {
    },
    sortMetaData: blankSortMetaData(),
    setSortMetaData: (_: SortMetaData) => {
    }
});