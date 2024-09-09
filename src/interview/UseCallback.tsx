import React, { useState, useCallback } from 'react';

// useCallback is useful when passing callbacks to optimized child components
// that rely on reference equality to prevent unnecessary renders.
// Fro example, `shouldComponentUpdate` or `React.memo()`.
// https://react.dev/reference/react/Component#shouldcomponentupdate
//
// useCallback(fn, deps) == useMemo(() => fn, deps)

export default function CallbackComponent() {
  const [counter, setCounter] = useState(0);

  const increment = useCallback(() => setCounter(counter + 1), [counter]);

  return (
    <div>
      <p>Render #: {counter}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
