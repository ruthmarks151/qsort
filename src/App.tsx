import React, {useState} from 'react';
import './App.css';

import Body from './components/Body'


function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Q Sorter</h1>
      </header>
      <Body/>
    </div>
  );
}

export default App;
