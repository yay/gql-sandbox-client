import React, { useState } from 'react';

export function RandomComponent() {
  const [ value, setValue ] = useState(Math.random());
  const [ counter, setCounter ] = useState(0);

  console.log('RandomComponent render');

  return <>
    <div>Run: {counter}</div>
    <div>{value}</div>
    <button onClick={() => setCounter(counter + 1)}>Increment</button>
  </>;
}
