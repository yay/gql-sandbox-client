import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { DesignProvider } from './Theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

// To setup TypeScript code generation from a GraphQL schema:
//   npm i -D @graphql-codegen/cli
//            @graphql-codegen/typescript
//            @graphql-codegen/typescript-operations
//   npx graphql-code-generator init

// https://reactrouter.com/en/main/start/tutorial
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
