import React, {useState} from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import './App.css';

import {inventory,distribution, sorts} from './inventory'
import Analysis, {correlation} from './Analysis'

import Body from './Body'
import SortPicker from "./SortPicker";


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
