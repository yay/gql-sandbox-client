import React, { type FC } from 'react';
import { NetworkStatus, useLazyQuery, useSuspenseQuery } from '@apollo/client';
import type { DogPhotoData, DogPhotoProps } from './DogPhoto.types';
import { GET_DOG_PHOTO } from './DogPhotoQuery';

export const DogPhotoLazy: FC<DogPhotoProps> = ({ breed }) => {
	// When React renders a component that calls `useQuery`, Apollo Client automatically executes the corresponding query.
	// But what if you want to execute a query in response to a different event, such as a user clicking a button?
	// The `useLazyQuery` hook is perfect for executing queries in response to events besides component rendering.
	// Unlike with `useQuery`, when you call useLazyQuery, it does not immediately execute its associated query.
	// Instead, it returns a query function in its result tuple that you call whenever you're ready to execute the query.
	const [getDogPhoto, { loading, error, data, networkStatus }] =
		useLazyQuery<DogPhotoData>(GET_DOG_PHOTO);

	if (loading) {
		if (networkStatus === NetworkStatus.refetch) {
			return <p>Refetching...</p>;
		}
		return <p>Loading...</p>;
	}
	if (error) return <p>{`Error! ${error}`}</p>;

	return (
		<div>
			{data?.dog?.displayImage ? (
				<img alt={breed} src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
			) : (
				'No dog image data'
			)}
			<p>
				<button type="button" onClick={() => getDogPhoto({ variables: { breed } })}>
					Get dog lazily
				</button>
			</p>
		</div>
	);
};
