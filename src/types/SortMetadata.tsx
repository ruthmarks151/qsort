export const blankSortMetaData = () => ({
    note: "",
    qSubjectId: "",
    sortedBy: "",
} as SortMetaData);

export interface SortMetaData {
    note: string;
    qSubjectId: string;
    sortedBy: string;
}