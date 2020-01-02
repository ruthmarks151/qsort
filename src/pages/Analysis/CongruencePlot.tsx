import Plot from "react-plotly.js";
import Paper from "@material-ui/core/Paper";
import React from "react";
import {StatementString} from "../../types/QSet";
import {PileId, qSort} from "../../types/QSort";

export default function CongruencePlot(props: {primarySort: qSort, comparisonSort: qSort}) {

    const inventory: StatementString[] = Object.values(props.primarySort.qSet.statements).map(s => s.statement);

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

    // @ts-ignore
    return <Plot data={data} layout={layout}/>
}