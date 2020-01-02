import {qSort} from "../../types/QSort";
import Plot from "react-plotly.js";
import React from "react";
import {Rank} from "./Analysis";

const rankOptions: Rank[] = [-4, -3, -2, -1, 0, 1, 2, 3, 4];


export function Sankey({primarySort, comparisonSort}: { primarySort: qSort, comparisonSort: qSort }) {
    interface SankeyFlow {
        from: number,
        to: number,
        count: number,
        label: string
    }

    const inventory = Object.values(primarySort.qSet.statements).map(s => s.statement);
    const primaryRank = primarySort.asRankMap();
    const comparisonRank = comparisonSort.asRankMap();

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