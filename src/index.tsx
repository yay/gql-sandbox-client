import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { DesignProvider } from './Theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Demo from './gql-demo';

const client = new ApolloClient({
  uri: 'http://localhost:4000', // our Apollo Server URL
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

// https://reactrouter.com/en/main/start/tutorial
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/gql-demo',
    element: <Demo />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <DesignProvider>
        <RouterProvider router={router} />
      </DesignProvider>
    </ApolloProvider>
  </React.StrictMode>
);
