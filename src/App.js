import React from 'react';
import './App.css';
import LikertSort from './LikertSort.js';
import {inventory, distribution} from './inventory'

function random_item(xs) { return xs[Math.floor(Math.random()*xs.length)]; }

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>California Q Sort</h1>
        <LikertSort items={inventory}/>
      </header>
    </div>
  );
}

export default App;
