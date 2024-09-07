import React from 'react';
import { GraphQLDemo } from './gql/GraphQLDemo';
import { DogsGeneratedTypesContainer } from './gql/DogsGeneratedTypes';
import { DogsGeneratedHooksContainer } from './gql/DogsGeneratedHooks';
// import { DisplayLocationsContainer } from '../DisplayLocation';
import './App.css';

export function GraphQLTest() {
  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div className="card">
          <p>Manual</p>
          <GraphQLDemo />
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
