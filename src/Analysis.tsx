import React from 'react';
import Plot from 'react-plotly.js';
import {factorMap} from './inventory'
import {SortType, StatementString} from "./types/SortType";
import {PileId, Sort} from "./types/Sort";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./components/dashboard/Chart";
import Deposits from "./components/dashboard/Deposits";
import Orders from "./components/dashboard/Orders";
import Title from "./components/dashboard/Title";
import Typography from "@material-ui/core/Typography";
import SortPicker from "./components/SortSelection/SortPicker";
import {SortMetaDataSelector} from "./components/SortSelection/SortMetaDataSelector";
import {analysisReady, ISortSelectionContext, SortSelectionContext} from "./components/SortSelectionContext";
import {NavbarContext, useStyles} from "./components/dashboard/NavbarContainer";

export type Rank = -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4
const rankOptions: Rank[] = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

function toRankMap(a_list: StatementString[][]): { [key: string]: Rank; } {
    return a_list.reduce(function (obj, traits, index) {
        traits.reduce((obj, trait) => {
            obj[trait] = index - 4;
            return obj
        }, obj);
        return obj;
    }, {} as { [key: string]: number; }) as { [key: string]: Rank; };
}

function correlation(keys: StatementString[], set1: StatementString[][], set2: StatementString[][]): number {

    const rank1 = toRankMap(set1);
    const rank2 = toRankMap(set2);

    return keys.reduce((sum, key) => (sum + rank1[key] * rank2[key]), 0) / keys.reduce((sum, key) => (sum + rank1[key] * rank1[key]), 0)
}

function applyFactors(keys: StatementString[], rank: { [key: string]: number; }): { [key: string]: number; } {
    const raw = keys.reduce((factors, key) => {
        // @ts-ignore
        factors[factorMap[key][0]] += parseInt(factorMap[key][1] + "1") * rank[key];
        return factors
    }, {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0});

    return {
        "Extraversion": raw["1"],
        "Agreeableness": raw["2"],
        "Conscientiousness": raw["3"],
        "Emotional Stability": raw["4"],
        "Intellect/Imagination": raw["5"]
    }
}

function produceSankey(inventory: StatementString[], primaryRank: { [key: string]: Rank; }, comparisonRank: { [key: string]: Rank; }) {
    interface SankeyFlow {
        from: number,
        to: number,
        count: number,
        label: string
    }

    const sankeyFlows = rankOptions.reduce(function (list, primaryRankVal) {
            return [...list,
                ...rankOptions.reduce(function (flows, comparisonRankVal) {
                    const matches = inventory.filter((s) => primaryRank[s] === primaryRankVal && comparisonRank[s] === comparisonRankVal);
                    return [...flows, {
                        from: primaryRankVal + 4,
                        to: comparisonRankVal + 13,
                        count: matches.length,
                        label: matches.join("\n")
                    } as SankeyFlow]
                }, [] as SankeyFlow[])]
        }
        , [] as SankeyFlow[]).filter(flow => flow.count !== 0 && flow.from !== (flow.to - 9));

    const data = {
        type: "sankey",
        orientation: "h",
        node: {
            pad: 15,
            thickness: 30,
            line: {
                color: "black",
                width: 0.5
            },
            label: [...rankOptions.map(r => "Primary " + r), ...rankOptions.map(r => "Comparison " + r)],
            color: [...rankOptions, ...rankOptions].map(_ => "blue")
        },

        link: {
            source: sankeyFlows.map(s => s.from),
            target: sankeyFlows.map(s => s.to),
            value: sankeyFlows.map(s => s.count),
            label: sankeyFlows.map(s => s.label)
        }
    };

    const dataArr = [data];

    const layout = {
        title: "Movement Between Sorts",
        font: {
            size: 10
        },
        width: 1000,
        height: 1200,
    };

    // @ts-ignore
    return <Plot data={dataArr} layout={layout}/>
}

export {correlation}

export interface AnalysisProps {
    sortType: SortType;
    primarySort: Sort;
    comparisonSort: Sort;
}


export default function Analysis(p: {} ){
    /*
      sortType={context.sortType!}
      primarySort={context.primarySort!}
      comparisonSort={context.comparisonSort!}
    * */
    const sortSelectionContext = React.useContext<ISortSelectionContext>(SortSelectionContext);
    const classes = useStyles();
    React.useContext(NavbarContext).setTitle("Analysis");
    if (!analysisReady(sortSelectionContext)) return <h1> Select shit</h1>;
    const props = {
        sortType: sortSelectionContext.sortType!,
        primarySort: sortSelectionContext.primarySort!,
        comparisonSort: sortSelectionContext.comparisonSort!
    };


    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const inventory: StatementString[] = props.sortType.statements.map(s => s.statement);

    const shape = props.sortType.distribution;
    const primaryArray = shape.reduce((arr, _, i) => [...arr, props.primarySort.group(i as PileId)], [] as StatementString[][]);
    const comparisonArray = shape.reduce((arr, _, i) => [...arr, props.comparisonSort.group(i as PileId)], [] as StatementString[][]);

    //props.set2.reverse()
    const primaryRank = toRankMap(primaryArray);
    const comparisonRank = toRankMap(comparisonArray);

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

    const statementToPoint = (s: StatementString): [number, number] => [comparisonRank[s], primaryRank[s]];


    const movingTerms = inventory.slice();
    movingTerms.sort((a, b) => (Math.abs(primaryRank[b] - comparisonRank[b]) - Math.abs(primaryRank[a] - comparisonRank[a])));
    // const differenceString = (s:StatementString): string => ("("+primaryRank[s] +" -> " + comparisonRank[s] +") ")
    const differenceString = (s: StatementString): string => {
        const delta = comparisonRank[s] - primaryRank[s];
        return Math.abs(delta) + (delta > 0 ? "↗ " : "↘ ")
    };

    const blockStyle = {flexBasis: "30%", margin: "8px auto auto auto"};
    // <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
    const statementBlocks = <React.Fragment>
        <Grid item xs={12} md={6} lg={4}>
            <Paper className={classes.paper} style={{height: "100%"}}>
                <Title>Significant Movers (3 or More Groupings)</Title>
                <ul style={{
                    margin: 'auto',
                    textAlign: 'left',
                    listStyleType: "none"
                }}>
                    {movingTerms
                        .filter(s => Math.abs(comparisonRank[s] - primaryRank[s]) >= 3)
                        .map(s => <Typography component="li"><b>{differenceString(s)}</b> {s}</Typography>)}
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
                        {statements.slice(0, 10).map(s => <Typography component="li">{s}</Typography>)}
                    </ul>
                </Paper>
            </Grid>

        })}
    </React.Fragment>;

    const sankey = produceSankey(inventory, primaryRank, comparisonRank);

    var trace1 = {
        x: inventory.map((k) => comparisonRank[k]) as number[],
        y: inventory.map((k) => primaryRank[k]) as number[],
        mode: 'markers' as "markers" | "lines+markers",
        type: "scatter" as "scatter" | "bar",
        name: 'Statements',
        text: inventory as string[],
        marker: {size: 12}
    };

    var data = [trace1,
        {
            x: [-5, 5], y: [-5, 5],
            type: "scatter" as "scatter" | "bar",
            mode: 'lines+markers' as "markers" | "lines+markers",
            name: 'Congruence Line'
        }];

    var layout = {
        width: 1000,
        height: 800,
        xaxis: {
            label: props.comparisonSort.name(),
            title: props.comparisonSort.name(),
            range: [-5, 5]
        },
        yaxis: {
            label: props.primarySort.name(),
            title: props.primarySort.name(),
            range: [-5, 5]
        },
        hovermode: 'closest',
        title: 'Congruence Plot'
    };
    const factors = (inventory.length == 50 ? [
            <p>{JSON.stringify(applyFactors(inventory, primaryRank))}</p>,
            <p>{JSON.stringify(applyFactors(inventory, comparisonRank))}</p>]
        : (<p>No Correllation</p>));

    const itemStyle = {height: "100%"};
    return (

                <React.Fragment>
                    {/* Chart */}
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper} style={{height: "100%", textAlign: "center", placeContent: "center"}}>
                            <Typography component="h2" variant="h2">
                                Correlation: {correlation(inventory, primaryArray, comparisonArray).toFixed(3)}
                            </Typography>
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper} style={itemStyle}>
                            {factors}
                        </Paper>
                    </Grid>

                    {statementBlocks}

                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            // @ts-ignore
                            <Plot data={data} layout={layout}/>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            {sankey}
                        </Paper>
                    </Grid>
                </React.Fragment>
            );


}
