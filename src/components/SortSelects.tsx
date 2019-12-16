import React, {useState} from 'react';
import Analysis from '../Analysis'
import SortPicker from "./SortSelection/SortPicker";
import {Sort} from "../types/Sort";
import {SortType} from "../types/SortType";
import {analysisReady, SortSelectionContext} from "./SortSelectionContext";
import {blankSortMetaData, SortMetaData} from "../types/SortMetadata";
import {SortMetaDataSelector} from "./SortSelection/SortMetaDataSelector";
import {DoSort} from "./SortDoing/DoSort";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {useStyles} from "./dashboard/NavbarContainer";

function SortSelects(props: { children: JSX.Element }) {
    const classes = useStyles();

    const [primarySort, setPrimarySort] = useState<Sort | null>(null);
    const [comparisonSort, setComparisonSort] = useState<Sort | null>(null);
    const [sortType, setSortType] = useState<SortType | null>(null);
    const [sortMetaData, setSortMetaData] = useState<SortMetaData>(blankSortMetaData());

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

    return (
        <Container maxWidth="lg" className={classes.container}>
            <SortSelectionContext.Provider value={context}>
                <Grid container spacing={3} alignItems="stretch">
                    {/* Chart */}
                    <Grid item xs={12}>
                        <SortPicker/>
                    </Grid>
                    <Grid item xs={12}>
                        <SortMetaDataSelector/>
                    </Grid>
                    {props.children}
                </Grid>
            </SortSelectionContext.Provider>
        </Container>
    );
}

export default SortSelects;
