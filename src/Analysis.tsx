import React, {useState} from 'react';
import Plot, {PlotParams} from 'react-plotly.js';
import {factorMap} from './inventory'
import {SortType, StatementString} from "./types/SortType";
import {Indicies, Sort, sortName} from "./types/Sort";

export type Rank = -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4
const rankOptions: Rank[] = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

function toRankMap(a_list: StatementString[][]): { [key: string]: Rank; }{
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

function applyFactors(keys: StatementString[], rank: { [key: string]: number;}): {[key: string]: number;} {
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
        , [] as SankeyFlow[]).filter(flow => flow.count !== 0 && flow.from !== (flow.to -9));

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
            source: sankeyFlows.map( s => s.from),
            target: sankeyFlows.map( s => s.to),
            value:  sankeyFlows.map( s => s.count),
            label: sankeyFlows.map( s => s.label)
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

export default function Analysis(props: AnalysisProps) {
    const inventory: StatementString[] = props.sortType.statements.map(s => s.statement);

    const shape = props.sortType.distribution;
    const primaryArray = shape.reduce((arr, _, i) => [...arr, props.primarySort.result[String(i) as Indicies]], [] as StatementString[][] );
    const comparisonArray = shape.reduce((arr, _, i) => [...arr, props.comparisonSort.result[String(i) as Indicies]], [] as StatementString[][]);

    //props.set2.reverse()
    const primaryRank = toRankMap(primaryArray);
    const comparisonRank = toRankMap(comparisonArray);

    const rois: {[key: string]: [number, number]} = {
        "Descriptive in both sorts": [4,4],
        "Not Descriptive in both sorts": [-4, -4],
        "Descriptive in primary sort but not comparison sort": [-4, 4],
        "Descriptive in comparison sort but not primary sort": [4, -4],
        "Boring statements": [0, 0]
    };

    const distance = ([x1,y1]: [number | Rank, number | Rank], [x2, y2]: [number | Rank, number | Rank]): number => {
        return ((x1 -x2) * (x1 -x2) + (y1 - y2 * (y1 - y2)));
    }
    const statementToPoint = (s:StatementString): [number, number] => [comparisonRank[s], primaryRank[s]];

    const statementBlocks = <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
        {Object.keys(rois).map(function (statement, index) {
            const p = rois[statement];
            const statements = inventory.slice();
            statements.sort((a, b) => (distance(p, statementToPoint(a)) - distance(p, statementToPoint(b))))
            return <div style={{flexBasis: "30%", margin: "auto"}}>
                <h3>{statement}</h3>
                <ul style={{
                    margin: 'auto',
                    textAlign: 'left'
                }}>
                    {statements.slice(0, 10).map(s => <li>{s}</li>)}
                </ul>
            </div>
        })}
    </div>;

    const sankey = produceSankey(inventory, primaryRank, comparisonRank);

    const movingTerms = inventory.slice();

    movingTerms.sort((a, b) => (Math.abs(Math.abs(primaryRank[a] - comparisonRank[a]) - Math.abs(primaryRank[b] - comparisonRank[b]))));

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
            label: sortName(props.comparisonSort),
            title: sortName(props.comparisonSort),
            range: [-5, 5]
        },
        yaxis: {
            label: sortName(props.primarySort),
            title: sortName(props.primarySort),
            range: [-5, 5]
        },
        title: 'Congruence Plot'
    };
    const factors = (inventory.length == 50 ? [
            <p>{JSON.stringify(applyFactors(inventory, primaryRank))}</p>,
            <p>{JSON.stringify(applyFactors(inventory, comparisonRank))}</p>]
        : (<p>No Correllation</p>))
    return (<div>
        <p>Correlation between sets is {correlation(inventory, primaryArray, comparisonArray)}</p>

        {statementBlocks}

        {factors}

        <Plot data={data} layout={layout}/>

        {sankey}
    </div>)

}
