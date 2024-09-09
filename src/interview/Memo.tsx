import React, { FC, useRef, useState } from 'react';

// https://react.dev/reference/react/memo

const ChildComponentMemo = React.memo(ChildComponent);
// const ChildComponentMemo = myMemo(ChildComponent);

// Q: Will ChildComponent render when parent re-renders?
// A: Yes, even though its props are not changed and no state is present.

// Q: Will ChildComponent render when parent re-renders if we remove its props?
// A: Yes, even though ChildComponent doesn't accept any props and doesn't have any state.
//    With class based components (that are no longer recommended) one could implement
//    the `shouldComponentUpdate` method to prevent unnecessary renders.

// Q: How to prevent ChildComponent from re-rendering?
// A: By using a higher-order component (HOC) React.memo()

// Q: What does React.memo() do?
// A: If your component renders the same result given the same props (idempotent),
//    you can wrap it in a call to React.memo for a performance boost in some cases by memoizing the result.
//
//    This means that React will skip rendering the component, and reuse the last rendered result.
//
//    React.memo only checks for prop changes. If your function component wrapped in React.memo has
// 			- useState,
//    	- useReducer
// 			- useContext
// 		hooks in its implementation, it will still re-render when state or context change.
//
//    By default it will only shallowly compare complex objects in the props object.
//    If you want control over the comparison, you can also provide a custom comparison function as the second argument.
//
//    React.memo(MyComponent, function areEqual(prevProps, nextProps) { });

// Q: Does React still perform diffing when using React.memo?
// A: Yes, it does. Everything beyong the `Render` step is an implementation detail and is outside of our control.
//    1) Render: When a component's state or props change, React initiates a re-render of the component.
//       During this render phase, React creates a new virtual DOM representation of the component's UI
//       based on its updated state and props.
//    2) Diffing: React then compares the new virtual DOM with the previous one to identify the differences.
//    3) Reconciliation: Once React has identified the differences between the new and previous
//       virtual DOM, it constructs a list of minimal changes to apply to the actual DOM.
//    4) Update: Finally, React applies the list of changes to the actual DOM.
//       This is where the visible updates occur on the screen.
//
// 		React implements a heuristic O(n) reconciliation algorithm based on two assumptions:
//    - Two elements of different types will produce different trees.
//    - The developer can hint at which child elements may be stable across different renders with a `key` prop.

// Q: What is a class based equivalent of React.memo()?
// A: React.PureComponent (implements shouldComponentUpdate() with a shallow prop and state comparison)

export default function Memo() {
  return <ParentComponent />;
}

function ParentComponent() {
  const [counter, setCounter] = useState(0);
  const value = 255;

  return (
    <div>
      <p>Parent Render #: {counter}</p>
      <p>
        <button onClick={() => setCounter(counter + 1)}>Increment</button>
      </p>
      <ChildComponent value={value} />
      <ChildComponentMemo value={value} />
    </div>
  );
}

function ChildComponent(props: { value: number }) {
  // Something expensive
  return (
    <div>
      <IncrementCounterOnRender />
      {' '
        .repeat(255)
        .split('')
        .map((v, i) => (
          <div key={i} style={{ backgroundColor: `rgb(${i},${props.value || 0},0)`, height: '1px' }}></div>
        ))}
    </div>
  );
}

function IncrementCounterOnRender() {
  const counter = useRef(0);
  // In Dev mode component's 'constructor' and 'render' and some other methods are invoked twice.
  // https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects

  return (
    <div>
      <p>Render #: {counter.current++}</p>
    </div>
  );
}

// My take at React.memo() implementation (for function components only)
function myMemo(Component: FC, compare: (prev: object, curr: object) => boolean) {
  let prevProps: object;
  let prevResult: React.ReactNode;

  compare =
    compare ||
    function (prevProps, currProps) {
      prevProps = prevProps || {};
      currProps = currProps || {};

      const prevKeys = Object.keys(prevProps);
      const nextKeys = Object.keys(currProps);

      if (prevKeys.length !== nextKeys.length) {
        return false;
      }

      for (const key of prevKeys) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((prevProps as any)[key] !== (currProps as any)[key]) {
          return false;
        }
      }

      return true;
    };

  return function (currProps: object) {
    if (compare(prevProps, currProps) && prevResult !== undefined) {
      return prevResult;
    }
    const result = Component(currProps);
    prevProps = currProps;
    prevResult = result;
    return result;
  };
}
