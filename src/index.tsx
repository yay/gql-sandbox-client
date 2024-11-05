import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Using MUI's <CssBaseline /> instead.

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { DesignProvider } from './Theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { GraphQLDemo } from './gql/GraphQLDemo';
import { MUIDemo } from './mui/MUIDemo';
import { Interview } from './interview/Interview';
import { AppLayout } from './AppLayout';
import Memo from './interview/Memo';
import NoJSX from './interview/NoJSX';
import ProductList from './interview/ProductList';
import EffectComponent from './interview/UseEffect';
import Uncontrolled from './interview/Uncontrolled';
import { Dropzone } from './interview/Dropzone';
import SuspenseExample from './interview/Suspense';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const routes = [
  {
    name: 'Interview',
    path: 'interview',
  },
  {
    name: 'MUI',
    path: '/mui',
  },
  {
    name: 'GraphQL',
    path: '/gql',
  },
];

// https://reactrouter.com/en/main/start/tutorial
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout routes={routes} />,
    children: [
      {
        path: 'mui',
        element: <MUIDemo />,
      },
      {
        path: 'gql',
        element: <GraphQLDemo />,
      },
      {
        path: 'interview',
        element: <Interview />,
        children: [
          {
            path: 'memo',
            element: <Memo />,
          },
          {
            path: 'no-jsx',
            element: <NoJSX />,
          },
          {
            path: 'product-list',
            element: <ProductList />,
          },
          {
            path: 'use-effect',
            element: <EffectComponent />,
          },
          {
            path: 'uncontrolled',
            element: <Uncontrolled />,
          },
          {
            path: 'dropzone',
            element: <Dropzone />,
          },
          {
            path: 'suspense',
            element: <SuspenseExample />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <DesignProvider>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </DesignProvider>
  // </React.StrictMode>
);
