import React, { useState } from 'react';
import './App.css';
import { DogsContainer } from './Dogs';
import { DisplayLocationsContainer } from './DisplayLocation';

function App() {
  return (
    <div className="App">
      <div className="card">
        <DogsContainer />
        {/* <DisplayLocationsContainer /> */}
      </div>
    </div>
  );
}

export default App;
