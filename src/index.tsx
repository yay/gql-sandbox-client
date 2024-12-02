import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { ApolloClient, ApolloProvider, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { DesignProvider } from './Theme';
import { clientCache } from './client-cache';
import GraphQLPage from './gql';

import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
	uri: 'http://localhost:4000/graphql',
});

const wsLink = new GraphQLWsLink(
	createClient({
		url: 'ws://localhost:4000/subscriptions',
		// connectionParams: {
		// 	authToken: authToken,
		// },
	}),
);

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
	},
	wsLink,
	httpLink,
);

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	link: splitLink,
	cache: clientCache,
	devtools: {
		enabled: true,
	},
});

const routes = [
	{
		name: 'GraphQL',
		path: '/gql',
	},
];

const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout routes={routes} />,
		children: [
			{
				path: 'gql',
				element: <GraphQLPage />,
			},
		],
	},
]);

function Root(props: React.PropsWithChildren<{ strict?: boolean }>) {
	const { strict, children } = props;
	return strict ? <React.StrictMode>{children}</React.StrictMode> : children;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Root strict>
		<DesignProvider>
			<ApolloProvider client={client}>
				<RouterProvider router={router} />
			</ApolloProvider>
		</DesignProvider>
	</Root>,
);
