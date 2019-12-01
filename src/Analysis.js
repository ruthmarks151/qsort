import React, {useState} from 'react';
import Plot from 'react-plotly.js';
import {factorMap} from './inventory.js'

const toRankMap = (a_list) => a_list.reduce(function(obj, traits, index) {
    traits.reduce((obj, trait) => {obj[trait] = index - 4; return obj } ,obj)
    return obj;
}, {});

function correlation(keys, set1, set2){

  const rank1 = toRankMap(set1)
  const rank2 = toRankMap(set2)

  return keys.reduce((sum, key) => (sum + rank1[key] * rank2[key]),0) / keys.reduce((sum, key) => (sum + rank1[key] * rank1[key]), 0)
}

function applyFactors(keys, rank){
  const raw = keys.reduce((factors, key) => {
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

export default function Analysis(props){
  //props.set2.reverse()
  const rank1 = toRankMap(props.set1)
  const rank2 = toRankMap(props.set2)

  const movingTerms = props.keys.slice()

  movingTerms.sort((a,b) => (Math.abs(rank1[a] - rank2[a]) - Math.abs(rank1[b] - rank2[b])) )

var trace1 = {
  x: props.keys.map((k) => rank2[k]),
  y: props.keys.map((k) => rank1[k]),
  mode: 'markers',
  type: 'scatter',
  name: 'Team A',
  text: props.keys,
  marker: { size: 12 }
};

var data = [ trace1,
            { x: [-5, 5], y:[-5, 5],
              type: 'scatter',
              mode: 'lines+markers',
              name: 'Congruence Line'}];

var layout = {
  xaxis: {
    label: "Ideal Rating",
    range: [ -5, 5 ]
  },
  yaxis: {
    label: "Self Rating",
    range: [-5, 5]
  },
  title:'Congruence Plot'
};

  return (<div>
            <p>Correlation between sets is {correlation(props.keys, props.set1, props.set2)}</p>
            <p>{JSON.stringify(movingTerms)}</p>
            <p>{JSON.stringify(applyFactors(props.keys, rank1))}</p>
            <p>{JSON.stringify(applyFactors(props.keys, rank2))}</p>

              <Plot data={data} layout={layout}/>
          </div>)

}
