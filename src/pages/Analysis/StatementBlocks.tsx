import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Title from "../DashboardBody/Title";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {Rank} from "../../pages/Analysis/Analysis";
import {StatementString} from "../../types/QSet";
import {qSort, StatementId} from "../../types/QSort";
import {inventory} from "../../inventory";
import {useStyles} from "../../components/NavbarContainer";



export default function StatementBlocks({primarySort, comparisonSort}:{primarySort: qSort, comparisonSort: qSort}) {
    const classes = useStyles();

    const primaryRank = primarySort.asRankMap();
    const comparisonRank = comparisonSort.asRankMap();

    const rois: { [key: string]: [number, number] } = {
        "Descriptive in both sorts": [4, 4],
        "Not Descriptive in both sorts": [-4, -4],
        "Descriptive in primary sort but not comparison sort": [-4, 4],
        "Descriptive in comparison sort but not primary sort": [4, -4],
        "Boring statements": [0, 0]
    };

    const distance = ([x1, y1]: [number | Rank, number | Rank], [x2, y2]: [number | Rank, number | Rank]): number => {
        return ((x1 - x2) * (x1 - x2) + (y1 - y2 * (y1 - y2)));
    };

    const statementToPoint = (s: StatementId): [number, number] => [comparisonRank[s], primaryRank[s]];
    const inventory = Object.keys(primarySort.qSet.statements);
    const movingTerms = inventory.slice();
    movingTerms.sort((a, b) => (Math.abs(primaryRank[b] - comparisonRank[b]) - Math.abs(primaryRank[a] - comparisonRank[a])));
    // const differenceString = (s:StatementString): string => ("("+primaryRank[s] +" -> " + comparisonRank[s] +") ")
    const differenceString = (s: StatementId): string => {
        const delta = comparisonRank[s] - primaryRank[s];
        return Math.abs(delta) + (delta > 0 ? "↗ " : "↘ ")
    };

    const blockStyle = {flexBasis: "30%", margin: "8px auto auto auto"};
    const significantMove = Math.floor(primarySort.qSet.distribution.length / 3);
    return <React.Fragment>
        <Grid item xs={12} md={6} lg={4}>
            <Paper className={classes.paper} style={{height: "100%"}}>
                <Title>Significant Movers ({significantMove} or More Groupings)</Title>
                <ul style={{
                    margin: 'auto',
                    textAlign: 'left',
                    listStyleType: "none"
                }}>
                    {movingTerms
                        .filter(s => Math.abs(comparisonRank[s] - primaryRank[s]) >= significantMove)
                        .map(s => <Typography component="li"><b>{differenceString(s)}</b> {primarySort.qSet.statements[s].statement}</Typography>)}
                </ul>
            </Paper>
        </Grid>
        {Object.keys(rois).map(function (statement, index) {
            const p = rois[statement];
            const statements = inventory.slice();
            statements.sort((a, b) => (distance(p, statementToPoint(a)) - distance(p, statementToPoint(b))));
            return <Grid item xs={12} md={6} lg={4}>
                <Paper className={classes.paper} style={{height: "100%"}}>
                    <Title>{statement}</Title>
                    <ul style={{
                        margin: 'auto',
                        textAlign: 'left'
                    }}>
                        {statements.slice(0, 10).map(s => <Typography component="li">{primarySort.qSet.statements[s].statement}</Typography>)}
                    </ul>
                </Paper>
            </Grid>

        })}
    </React.Fragment>
}