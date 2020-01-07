import React, {useState} from 'react';
import {useStyles} from "../../components/NavbarContainer";
import {getSort, qSort} from "../../types/QSort";
import {SortMetaData} from "../../types/SortMetadata";
import {getQSet, QSet} from "../../types/QSet";
import {Container, Grid} from "@material-ui/core";
import SortPicker from "../../components/SortSelection/SortPicker";
import {SortMetaDataSelector} from "../../components/SortSelection/SortMetaDataSelector";
import {SortSelectionContext} from '../../components/SortSelectionContext';
import {DoSort} from "../DoSort/DoSort";
import Loading from "../../components/Loading"
import BigInfoPage from "./BigInfoPage";
import Analysis from "../Analysis/Analysis";


export default function OnboardingAnalysis() {
    const classes = useStyles();

    const [primarySort, setPrimarySort] = useState<qSort | null>(null);
    const [comparisonSort, setComparisonSort] = useState<qSort | null>(null);
    const [sortType, setSortType] = useState<QSet | null>(null);
    const [sortMetaData, setSortMetaData] = useState<SortMetaData>({
        note: "Onboarding sort",
        qSubjectId: "",
        sortedBy: "New User",
    });

    const context = {
        sortType: sortType,
        setSortType: setSortType,
        primarySort: primarySort,
        setPrimarySort: (_: qSort | null) => {
        },
        comparisonSort: comparisonSort,
        setComparisonSort: (_: qSort | null) => {
        },
        sortMetaData: sortMetaData,
        setSortMetaData: (_: SortMetaData | null) => {
        }
    };

    React.useEffect(() => getQSet("adjective_35", setSortType), []);
    React.useEffect(() => getSort("r5JiAiAsF23WNrG6Ezvb", setPrimarySort), []);
    React.useEffect(() => getSort("XTNyaNK4fPHapqLuOwg8", setComparisonSort), []);
    return (
        <React.Fragment>
            <BigInfoPage
                title={"Here's your results"}
                body={[]}
            />
            <Container maxWidth="lg" className={classes.container}>

                <SortSelectionContext.Provider value={context}>
                    {primarySort && comparisonSort &&
                    <Grid container spacing={3} alignItems="stretch">
                        <Analysis/>
                    </Grid>
                    }
                </SortSelectionContext.Provider>
            </Container>
        </React.Fragment>
    );
}
