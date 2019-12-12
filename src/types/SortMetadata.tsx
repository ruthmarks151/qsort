export const blankSortMetaData = () => ({
    note: "",
    sortClass: "",
    sortedBy: "",
} as SortMetaData);

export interface SortMetaData {
    note: string;
    sortClass: string;
    sortedBy: string;
}