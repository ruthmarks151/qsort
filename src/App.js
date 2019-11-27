import React, {useState} from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import './App.css';
import LikertSort from './LikertSort.js';
import BucketTransposition from './BucketTransposition.js'
import {inventory} from './inventory'

const LIKERT_PHASE = "Likert"
const BUCKETING_PHASE = "Bucketing"
const PRESENTATION_PHASE = "Presentation"


function Body(props){
  const [phase, setPhase] = useState(LIKERT_PHASE);
  const [likertResults, setLikertResults] = useState(null);
  const [results, setResults] = useState(null);

  switch (phase) {
    case LIKERT_PHASE:
      return <LikertSort items={inventory.slice(0,4)}
                         onComplete={(x) => { setLikertResults(x); setPhase(BUCKETING_PHASE)}}/>
    case BUCKETING_PHASE:
      return <BucketTransposition n={3}
                                  goalDistribution = {[1,2,1]}
                                  source = {likertResults}
                                  onComplete={(x) => { console.log(x);
                                                       setResults(x);
                                                       setPhase(PRESENTATION_PHASE);
                                                     }}/>
    case PRESENTATION_PHASE:
      console.log(results)
      return <p>{JSON.stringify(results)}</p>
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
    </div>
  );
}

export default App;
