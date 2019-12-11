import React, {useState} from 'react';
import Plot from 'react-plotly.js';
import {factorMap} from './inventory'
import {SortType, StatementString} from "./types/SortType";
import {Indicies, Sort, sortName} from "./types/Sort";

export type Rank = -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4

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
        <h3>List items by degree of incongruence:</h3>
        <ul style={{
            width: 400,
            margin: 'auto',
            textAlign: 'left'
        }}>
            {movingTerms.slice(0, 10).map(s => <li>{s}</li>)}
        </ul>

        {factors}

        <Plot data={data} layout={layout}/>
    </div>)

}
