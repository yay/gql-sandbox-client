import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { DesignProvider } from './Theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { GraphQLDemo } from './gql/GraphQLDemo';
import { MUIDemo } from './mui/MUIDemo';
import { App } from './App';
import { Interview } from './interview/Interview';

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

// https://reactrouter.com/en/main/start/tutorial
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: '',
  },
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
