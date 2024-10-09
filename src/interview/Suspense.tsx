import React, { useState, useRef, useEffect, lazy, Suspense, ComponentType, Component } from 'react';

// Suspense will automatically switch to fallback when children suspends, and back to children when the data is ready.
// If fallback suspends while rendering, it will activate the closest parent Suspense boundary.

// When the component has loaded, React will retry rendering the suspended tree from scratch. (no state preservation)

// If Suspense was displaying content for the tree, but then it suspended again,
// the fallback will be shown again unless the update causing it was caused by `startTransition` or `useDeferredValue`.

// If React needs to hide the already visible content because it suspended again,
// it will clean up layout Effects in the content tree. When the content is ready to be shown again,
// React will fire the layout Effects again. This ensures that Effects measuring the DOM layout
// don’t try to do this while the content is hidden.

// React includes under-the-hood optimizations like Streaming Server Rendering and Selective Hydration that are integrated with Suspense.
// Read an architectural overview and watch a technical talk to learn more.
// https://github.com/reactwg/react-18/discussions/37
// https://www.youtube.com/watch?v=pj5N-Khihgc

// Only Suspense-enabled data sources will activate the Suspense component. They include:

// Data fetching with Suspense-enabled frameworks like Relay and Next.js
// Lazy-loading component code with lazy
// Reading the value of a Promise with use: https://react.dev/reference/react/use

// `lazy` lets you defer loading component’s code until it is rendered for the first time.
// const SomeComponent = lazy(load)
// Call `lazy` outside your components to declare a lazy-loaded React component:
// import { lazy } from 'react';
// const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
// `lazy` takes a `load` function that returns a Promise.
// React will not call `load` until the first time you attempt to render the returned component.
// After React first calls load, it will wait for it to resolve, and then render the resolved value’s .default as a React component.
// Both the returned Promise and the Promise’s resolved value will be cached, so React will not call load more than once.
// If the Promise rejects, React will throw the rejection reason for the nearest Error Boundary to handle.
// lazy returns a React component you can render in your tree. While the code for the lazy component is still loading,
// attempting to render it will suspend. Use <Suspense> to display a loading indicator while it’s loading.

// This code relies on dynamic import(), which might require support from your bundler or framework.
// Using this pattern requires that the lazy component you’re importing was exported as the default export.

// By default, if your application throws an error during rendering, React will remove its UI from the screen.
// To prevent this, you can wrap a part of your UI into an error boundary.

// There is currently no way to write an error boundary as a function component.
// However, you don’t have to write the error boundary class yourself. For example, you can use react-error-boundary instead.

const LazyComponent = lazy(() => delayPromise(import('./LazyComponent')));

export default function SuspenseExample() {
  return (
    <ErrorBoundary fallback={<p>ErrorBoundary fallback component</p>}>
      <Suspense fallback={<LoadingScreen />}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}

function LoadingScreen() {
  return <div>Loading...</div>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function delayPromise(promise: Promise<{ default: ComponentType<any> }>) {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}

type MySuspenseProps = React.PropsWithChildren<{
  nothing?: string;
}>;

function MySuspense(props: MySuspenseProps) {}

// A class component becomes an error boundary if it defines either (or both) of the lifecycle methods
// `static getDerivedStateFromError()` or `componentDidCatch()`.
// Use static `getDerivedStateFromError()` to render a fallback UI after an error has been thrown.
// Use `componentDidCatch()` to log error information.

type ErrorBoundaryProps = React.PropsWithChildren<{
  fallback?: React.ReactNode;
}>;
type ErrorBoundaryState = {
  hasError: boolean;
  message?: string;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong...</h1>
          <h3>Description: {this.state.message ?? 'No description'}</h3>
          {this.props.fallback}
        </div>
      );
    }
    return this.props.children;
  }
}

// How does suspense work under the hood?

// They use exception for control flow. Suspense throws promise and the thrown promise interrupt the render.
// It's the same principle as ErrorBoundary that catch exceptions.

// Instead of abort like a normal exceptions handler, they resolve the promise then resume the render,
// and it continue in a cycle back and forth between different control flow.
// They don't use exceptions for errors but for control flow (make the render phase interruptible and resumable).

// It's an abuse of exception mechanism (exception are designed for handling errors and stack unwinding, not for control flow).
// Seem V8 made a lot to optimize this.

// An alternative solution was to add algebraic effect in JavaScript:
// https://ocaml.org/manual/5.2/effects.html
// Exceptions are a subset of algebraic effect, so the later is far more general.
// This was left behind because this require new language features and exceptions trick work so no point investigating further.

// The fetchData function initiates a fetch request and returns an object with a read method.
// If the data isn't ready, the read method throws a promise,
// which tells Suspense to display the fallback UI ("Loading data...").
// Once available, read returns the data, and DataComponent renders it.

const fetchData = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any;
  const promise = fetch('/api/data')
    .then((response) => response.json())
    .then((json) => {
      data = json;
    });

  return {
    read() {
      if (!data) {
        throw promise;
      }
      return data;
    },
  };
};

const resource = fetchData();

const App = () => (
  <Suspense fallback={<p>Loading data...</p>}>
    <DataComponent />
  </Suspense>
);

const DataComponent = () => {
  const data = resource.read();
  return (
    <div>
      <h1>Data: {data.value}</h1>
    </div>
  );
};

// You can also nest <Suspense> components to manage rendering order with Suspense:

// const App = () => (
//   <div>
//     <Suspense fallback={<p>Loading user profile...</p>}>
//       <UserProfile />
//       <Suspense fallback={<p>Loading posts...</p>}>
//         <Posts />
//       </Suspense>
//     </Suspense>
//   </div>
// );

// This way, the outer <Suspense> component wraps the UserProfile component,
// displaying a fallback message ("Loading user profile...") while fetching user profile data,
// ensuring its details are shown first. Inside this outer <Suspense>,
// another <Suspense> wraps the Posts component with its fallback message ("Loading posts..."),
// ensuring posts details render only after the user profile details are available.

// Suspense can improve SSR by allowing you to specify which parts of the app should be rendered on the server
// and which should wait until the client has more data.
// This can significantly enhance the performance and SEO of your web application.

// For example, the code below shows an App component that uses <Suspense>
// to specify a fallback UI ("Loading...") while the MainComponent is being loaded.

// import { renderToPipeableStream } from 'react-dom/server';

// const App = () => (
//   <Suspense fallback={<p>Loading...</p>}>
//     <MainComponent />
//   </Suspense>
// );

// // Server-side rendering logic
// const { pipe } = renderToPipeableStream(<App />);

// The renderToPipeableStream function from react-dom/server handles the server-side rendering,
// ensuring that the initial HTML sent to the client is rendered quickly and additional data is loaded progressively.
