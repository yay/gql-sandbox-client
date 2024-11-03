import React, { FC } from 'react';
import { NetworkStatus, useQuery } from '@apollo/client';
import { DogPhotoData, DogPhotoProps } from './DogPhoto.types';
import { GET_DOG_PHOTO } from './DogPhotoQuery';

/*
 * Whenever Apollo Client fetches query results from your server,
 * it automatically caches those results locally.
 * This makes later executions of that same query extremely fast.
 * https://www.apollographql.com/docs/react/caching/overview/
 */

export const DogPhoto: FC<DogPhotoProps> = ({ breed }) => {
	// [4] Passing variables. Query options.

	const {
		loading,
		error,
		data,
		startPolling,
		stopPolling,
		refetch,
		networkStatus,
	} = useQuery<DogPhotoData>(GET_DOG_PHOTO, {
		variables: { breed },
		skip: false, // If `true`, the query is not executed. Not available/needed with `useLazyQuery`.
		notifyOnNetworkStatusChange: true,
		errorPolicy: 'none', // default value (treat all GraphQL errors as runtime errors)

		// fetchPolicy: 'network-only', // don't check cache before making a network request
		/**
		 * By default, the useQuery hook checks the Apollo Client cache to see if all the data you requested
		 * is already available locally. If all data is available locally, `useQuery` returns that data
		 * and doesn't query your GraphQL server. This `cache-first` policy is Apollo Client's default fetch policy.
		 */

		// pollInterval: 500, // to start polling right away, without a call to `startPolling`
		/**
		 * Sometimes, you want to make sure that your query's cached data is up to date with your server's data.
		 * Apollo Client supports two strategies for this: polling and refetching.
		 * Polling provides near-real-time synchronization with your server by executing your query periodically
		 * at a specified interval.
		 */
	});

	/**
	 * Refetching enables to refresh query results in response to a particular user action,
	 * as opposed to using a fixed interval.
	 * Click the button and notice that the UI updates with a new dog photo.
	 *
	 * Refetching is an excellent way to guarantee fresh data, but it introduces some complexity with loading state.
	 * If you click the refetch button, you'll see that the component doesn't re-render until the new data arrives.
	 * What if we want to indicate to the user that we're refetching the photo?
	 * The useQuery hook's result object provides fine-grained information about the status of the query
	 * via the `networkStatus` property. To take advantage of this information,
	 * we set the `notifyOnNetworkStatusChange` option to `true`, so our query component re-renders
	 * while a refetch is in flight. Enabling this option also ensures that the value of `loading` updates accordingly,
	 * even if you don't want to use the more fine-grained information provided by the `networkStatus` property.
	 */
	if (loading) {
		if (networkStatus === NetworkStatus.refetch) {
			return <p>Refetching...</p>;
		}
		return <p>Loading...</p>;
	}
	if (error) return <p>{`Error! ${error}`}</p>;
	if (!data) return <p>{'No dog image data'}</p>;

	return (
		<div>
			<img
				alt={breed}
				src={data.dog.displayImage}
				style={{ height: 100, width: 100 }}
			/>
			<p style={{ display: 'flex', gap: 5 }}>
				<button
					type="button"
					onClick={() => {
						refetch();
					}}
				>
					{`Refetch selected breed (${breed})`}
				</button>
				<button
					type="button"
					onClick={() => {
						// Can refetch with a new set of variables:
						refetch({ breed: 'boxer' }); // always refetches a `boxer` instead of the original breed
					}}
				>
					Refetch boxer breed
				</button>
				<button type="button" onClick={() => startPolling(500)}>
					Start polling
				</button>
				<button type="button" onClick={() => stopPolling()}>
					Stop polling
				</button>
			</p>
		</div>
	);
};
