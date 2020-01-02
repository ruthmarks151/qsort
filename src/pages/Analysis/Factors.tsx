import {qSort} from "../../types/QSort";
import {StatementString} from "../../types/QSet";
import React from "react";
import {factorMap} from "../../inventory";


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

export function Factors(props: { primarySort: qSort, comparisonSort: qSort }) {
    const inventory: StatementString[] = Object.values(props.primarySort.qSet.statements).map(s => s.statement);

    //props.set2.reverse()
    const primaryRank = props.primarySort.asRankMap();
    const comparisonRank = props.comparisonSort.asRankMap();

    return (inventory.length === 50 ? <React.Fragment>
        <p>{JSON.stringify(applyFactors(inventory, primaryRank))}</p>,
        <p>{JSON.stringify(applyFactors(inventory, comparisonRank))}</p>]
    </React.Fragment> : (<p>No Correllation</p>));
}