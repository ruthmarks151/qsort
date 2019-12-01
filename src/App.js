import React, {useState} from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import './App.css';

import LikertSort from './LikertSort.js';
import BucketTransposition from './BucketTransposition.js'
import {inventory,distribution, sorts} from './inventory'
import BucketAnnealer from './BucketAnnealer.js'
import Analysis, {correlation} from './Analysis.js'
const LIKERT_PHASE = "Likert"
const BUCKETING_PHASE = "Bucketing"
const ANNEALING_PHASE = "Annealing"
const PRESENTATION_PHASE = "Presentation"


function Body(props){
  const [phase, setPhase] = useState( LIKERT_PHASE );//PRESENTATION_PHASE);
  const [likertResults, setLikertResults] = useState(null);
  const [bucketResults, setBucketResults] = useState(null);
  const [results, setResults] = useState(null);

  switch (phase) {
    case LIKERT_PHASE:
      return <LikertSort items={inventory}
                         onComplete={(x) => { setLikertResults(x); setPhase(BUCKETING_PHASE)}}/>
    case BUCKETING_PHASE:
      return <BucketTransposition n={3}
                                  goalDistribution = {distribution}
                                  source = {likertResults}
                                  onComplete={(x) => { console.log(x);
                                                       setBucketResults(x);
                                                       setPhase(ANNEALING_PHASE);
                                                     }}/>
   case ANNEALING_PHASE:
     return <BucketAnnealer sort = { bucketResults } //bucketResults}
                     onComplete={(x) => { console.log(x);
                                          setResults(x);
                                          setPhase(PRESENTATION_PHASE);}}/>
    case PRESENTATION_PHASE:
      console.log(results)
      return (<div>
                // <p>Correlation between Ryan Self/Ideal Assesment {correlation(inventory, sorts['Ryan Self Sort 2019-11-27, annealed'], sorts['Ryan Ideal Sort 2019-11-27, annealed'])}</p>
                // <p>Correlation between Ryan Self no anneal/Ideal Assesment {correlation(inventory, sorts['Ryan Self Sort 2019-11-27, no annealing'], sorts['Ryan Ideal Sort 2019-11-27, annealed'])}</p>
                // <p>Correlation between Ryan Self before/after Anneal {correlation(inventory, sorts['Ryan Self Sort 2019-11-27, annealed'], sorts['Ryan Self Sort 2019-11-27, no annealing'])}</p>
                <br/>
                <p>{JSON.stringify(results)}</p>
              </div>)
    default:
      return <p>Something has gone awry!</p>
  }
}

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>California Q Sort</h1>
      </header>
      <Body/>
      <Analysis keys={inventory} set1={sorts['ryan_self_5']} set2={sorts['ryan_ideal_5']}/>
    </div>
  );
}

export default App;
