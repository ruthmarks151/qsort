import Plot from "react-plotly.js";
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, LineChart
} from 'recharts';
import Paper from "@material-ui/core/Paper";
import React from "react";
import {StatementString} from "../../types/QSet";
import {PileId, qSort} from "../../types/QSort";
import {useTheme} from "@material-ui/core";

export function OldCongruencePlot(props: { primarySort: qSort, comparisonSort: qSort }) {

    const inventory: StatementString[] = Object.keys(props.primarySort.qSet.statements);

    //props.set2.reverse()
    const primaryRank = props.primarySort.asRankMap();
    const comparisonRank = props.comparisonSort.asRankMap();

    // <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>

    var trace1 = {
        x: inventory.map((k) => comparisonRank[k]) as number[],
        y: inventory.map((k) => primaryRank[k]) as number[],
        mode: 'markers' as "markers" | "lines+markers",
        type: "scatter" as "scatter" | "bar",
        name: 'Statements',
        text: inventory.map((s) => props.primarySort.qSet.statements[s].statement) as string[],
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

    // @ts-ignore
    return <Plot data={data} layout={layout}/>
}

const data = [
    {x: 100, y: 200, z: 200},
    {x: 120, y: 100, z: 260},
    {x: 170, y: 300, z: 400},
    {x: 140, y: 250, z: 280},
    {x: 150, y: 400, z: 500},
    {x: 110, y: 280, z: 200},
];

export default function CongruencePlot(props: { primarySort: qSort, comparisonSort: qSort }) {
    const theme = useTheme();
    const inventory: StatementString[] = Object.keys(props.primarySort.qSet.statements);

    //props.set2.reverse()
    const primaryRank = props.primarySort.asRankMap();
    const comparisonRank = props.comparisonSort.asRankMap();
    const data = inventory.map((k) => {
        return {x: primaryRank[k], y: comparisonRank[k], label: props.primarySort.qSet.statements[k].statement}
    });

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
                margin={{
                    top: 20, right: 20, bottom: 20, left: 20,
                }}
            >
                <CartesianGrid x={0} y={0}/>
                <XAxis type="number" dataKey="x" name="Primary Rank"/>
                <YAxis type="number" dataKey="y" name="Comparison Rank"/>
                <ZAxis type="category" dataKey="label" name="Statement"/>
                <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                <Scatter name="Your Sorts" data={data} fill={theme.palette.primary.main}/>
            </ScatterChart>
        </ResponsiveContainer>
    );
}
