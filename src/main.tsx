import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const displayLocationsApolloClient = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

// To setup TypeScript code generation from a GraphQL schema:
//   yarn add -D @graphql-codegen/cli
//               @graphql-codegen/typescript
//               @graphql-codegen/typescript-operations
//   npx graphql-code-generator init

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={displayLocationsApolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
