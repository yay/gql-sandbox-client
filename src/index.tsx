import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css'; // Using MUI's <CssBaseline /> instead.

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { DesignProvider } from './Theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { GraphQLDemo } from './gql/GraphQLDemo';
import { MUIDemo } from './mui/MUIDemo';
import { Interview } from './interview/Interview';
import { AppLayout } from './AppLayout';

// DataGrid "license".
setInterval(() => {
  const nag = document.querySelector('.MuiDataGrid-virtualScroller')?.nextSibling as HTMLDivElement | null;
  if (nag) {
    nag.style.display = 'none';
  }
}, 1000);

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
        path: '/mui',
        element: <MUIDemo />,
      },
      {
        path: '/gql',
        element: <GraphQLDemo />,
      },
      {
        path: '/interview',
        element: <Interview />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DesignProvider>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </DesignProvider>
  </React.StrictMode>
);
