// import {StatementString} from "./types/SortType";
import React from "react";
import {QSet} from "../types/QSet";
import {qSort} from "../types/QSort";
import {blankSortMetaData, SortMetaData} from "../types/SortMetadata";

export interface ISortSelectionContext {
    sortType: QSet | null;
    setSortType: (_: QSet | null) => void
    primarySort: qSort | null;
    setPrimarySort: (_: qSort | null) => void;
    comparisonSort: qSort | null;
    setComparisonSort: (_: qSort | null) => void;
    sortMetaData: SortMetaData;
    setSortMetaData: (_: SortMetaData) => void;
}

export function analysisReady(context: ISortSelectionContext): boolean {
    return context.sortType != null && context.primarySort != null && context.comparisonSort != null
}

export const SortSelectionContext = React.createContext<ISortSelectionContext>({
    sortType: null,
    setSortType: (_: QSet | null) => {
    },
    primarySort: null,
    setPrimarySort: (_: qSort | null) => {
    },
    comparisonSort: null,
    setComparisonSort: (_: qSort | null) => {
    },
    sortMetaData: blankSortMetaData(),
    setSortMetaData: (_: SortMetaData) => {
    }
});