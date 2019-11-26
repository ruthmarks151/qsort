import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import './App.css';
import LikertSort from './LikertSort.js';
import BucketTransposition from './BucketTransposition.js'
import {inventory} from './inventory'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>California Q Sort</h1>
      </header>
      <LikertSort items={inventory.slice(0,9)}/>
      <BucketTransposition />
    </div>
  );
}

export default App;
