import React from 'react';
import './App.css';
import { DogsContainer } from './Dogs';
import { DogsGeneratedTypesContainer } from './DogsGeneratedTypes';
import { DogsGeneratedHooksContainer } from './DogsGeneratedHooks';
import { DisplayLocationsContainer } from '../DisplayLocation';

function App() {
  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div className="card">
          <p>Manual</p>
          <DogsContainer />
        </div>
        <div className="card">
          <p>Generated Types</p>
          <DogsGeneratedTypesContainer />
        </div>
        <div className="card">
          <p>Generated Hooks</p>
          <DogsGeneratedHooksContainer />
        </div>
        {/* <DisplayLocationsContainer /> */}
      </div>
    </div>
  );
}

export default App;
