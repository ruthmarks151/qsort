import React from 'react';
import Plot from 'react-plotly.js';
import {factorMap} from '../../inventory'
import {StatementString} from "../../types/QSet";
import {PileId, qSort} from "../../types/QSort";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {analysisReady, ISortSelectionContext, SortSelectionContext} from "../../components/SortSelectionContext";
import {NavbarContext, useStyles} from "../../components/NavbarContainer";
import StatementBlocks from "./StatementBlocks";
import CongruencePlot from "./CongruencePlot"
import {Sankey} from "./Sankey";
import {Factors} from "./Factors";

export type Rank = -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4

function correlation(sort1: qSort, sort2: qSort): number {
    const keys = Object.keys(sort1.qSet.statements);
    const rank1 = sort1.asRankMap();
    const rank2 = sort2.asRankMap();

    return keys.reduce((sum, key) => (sum + rank1[key] * rank2[key]), 0) / keys.reduce((sum, key) => (sum + rank1[key] * rank1[key]), 0)
}

export {correlation}

export default function Analysis(p: {} ){
    /*
      sortType={context.sortType!}
      primarySort={context.primarySort!}
      comparisonSort={context.comparisonSort!}
    * */
    const sortSelectionContext = React.useContext<ISortSelectionContext>(SortSelectionContext);
    const classes = useStyles();
    React.useContext(NavbarContext).setTitle("Analysis");
    if (!analysisReady(sortSelectionContext)) return <h1>Select shit</h1>;
    const props = {
        sortType: sortSelectionContext.sortType!,
        primarySort: sortSelectionContext.primarySort!,
        comparisonSort: sortSelectionContext.comparisonSort!
    };


    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const inventory: StatementString[] = Object.values(props.primarySort.qSet.statements).map(s => s.statement);




    const itemStyle = {height: "100%"};
    return (

                <React.Fragment>
                    {/* CongruenceChart */}
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper} style={{height: "100%", textAlign: "center", placeContent: "center"}}>
                            <Typography component="h2" variant="h2">
                                Correlation: {correlation(props.primarySort, props.comparisonSort).toFixed(3)}
                            </Typography>
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper} style={itemStyle}>
                            <Factors
                                primarySort={props.primarySort}
                                comparisonSort={props.comparisonSort}
                            />
                        </Paper>
                    </Grid>

                    <StatementBlocks
                        primarySort={props.primarySort}
                        comparisonSort={props.comparisonSort}
                    />

                    <Grid item xs={12}>
                        <Paper className={classes.paper} style={{width: "100%", height: "80vh"}}>
                            <CongruencePlot
                                primarySort={props.primarySort}
                                comparisonSort={props.comparisonSort}
                            />
                        </Paper>
                    </Grid>

                    {/*<Grid item xs={12}>*/}
                    {/*    <Paper className={classes.paper}>*/}
                    {/*        <Sankey*/}
                    {/*            primarySort={props.primarySort}*/}
                    {/*            comparisonSort={props.comparisonSort}*/}
                    {/*        />*/}
                    {/*    </Paper>*/}
                    {/*</Grid>*/}
                </React.Fragment>
            );


}
