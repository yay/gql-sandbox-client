import React, { useState } from 'react';
import './App.css';
import { DogsContainer } from './Dogs';
import { DisplayLocationsContainer } from './DisplayLocation';
import { DogsGeneratedContainer } from './DogsGenerated';

function App() {
  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div className="card">
          <p>Manual</p>
          <DogsContainer />
        </div>
        <div className="card">
          <p>Generated</p>
          <DogsGeneratedContainer />
        </div>
        {/* <DisplayLocationsContainer /> */}
      </div>
    </div>
  );
}

export default App;
