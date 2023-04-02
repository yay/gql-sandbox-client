import React, { useState } from 'react';
import './App.css';
import { DogsContainer } from './Dogs';
import { DisplayLocationsContainer } from './DisplayLocation';
import { DogsGeneratedContainer } from './DogsGenerated';

function App() {
  return (
    <div className="App">
      <div className="card">
        <div>
          <p>Manual</p>
          <DogsContainer />
        </div>
        <div>
          <p>Generated</p>
          <DogsGeneratedContainer />
        </div>
        {/* <DisplayLocationsContainer /> */}
      </div>
    </div>
  );
}

export default App;
