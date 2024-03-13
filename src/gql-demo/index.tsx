import React from 'react';
import { Manual } from './manual/Manual';
import { DogsGeneratedTypesContainer } from './GeneratedTypes';
import { DogsGeneratedHooksContainer } from './GeneratedHooks';
import '../App.css';

export default function Demo() {
  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div className="card">
          <p>Manual</p>
          <Manual />
        </div>
        <div className="card">
          <p>Generated Types</p>
          <DogsGeneratedTypesContainer />
        </div>
        <div className="card">
          <p>Generated Hooks</p>
          <DogsGeneratedHooksContainer />
        </div>
      </div>
    </div>
  );
}
