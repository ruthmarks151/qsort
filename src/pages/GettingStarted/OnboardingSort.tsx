import React, {useState} from 'react';
import {useStyles} from "../../components/NavbarContainer";
import {qSort} from "../../types/QSort";
import {SortMetaData} from "../../types/SortMetadata";
import {getQSet, QSet} from "../../types/QSet";
import {Container, Grid} from "@material-ui/core";
import SortPicker from "../../components/SortSelection/SortPicker";
import {SortMetaDataSelector} from "../../components/SortSelection/SortMetaDataSelector";
import { SortSelectionContext } from '../../components/SortSelectionContext';
import {DoSort} from "../DoSort/DoSort";
import Loading from "../../components/Loading"
import BigInfoPage from "./BigInfoPage";


export default function OnboardingSort({ideal}:{ideal?: boolean}) {
    const classes = useStyles();

    const [primarySort, setPrimarySort] = useState<qSort | null>(null);
    const [comparisonSort, setComparisonSort] = useState<qSort | null>(null);
    const [sortType, setSortType] = useState<QSet | null>(null);
    const [sortMetaData, setSortMetaData] = useState<SortMetaData>({
        note: "Onboarding sort",
        qSubjectId: (ideal ? "ideal" : "self"),
        sortedBy: "New User",
    });

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

    getQSet("adjective_35",setSortType);

    return (
        <React.Fragment>
            <BigInfoPage
                title={ideal ? "Let's talk ideals" : "Awesome, lets get started"}
                body={ideal ? [
                    "You'll see the same 35 adjectives, and do the same sorting task",
                    "This time however think about how much the adjective applies to an ideal version of yourself"
                ]: [
                    "We're going to show you 35 adjectives one after another that might or might not describe you",
                    "Then you'll select how much you think they apply to you, as you see yourself",
                    "After that we'll ask a few more questions to really refine your self perception"
                ]}
            />
            <Container maxWidth="lg" className={classes.container}>
                <SortSelectionContext.Provider value={context}>
                    <DoSort noSort={<Loading/>}/>
                </SortSelectionContext.Provider>
            </Container>
        </React.Fragment>
    );
}
