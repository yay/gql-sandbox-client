import React, { type FC, startTransition, Suspense } from 'react';
import { NetworkStatus, useSuspenseQuery } from '@apollo/client';
import type { DogPhotoData, DogPhotoProps } from './DogPhoto.types';
import { GET_DOG_PHOTO } from './DogPhotoQuery';

export const DogPhotoSuspense: FC<DogPhotoProps> = ({ breed }) => {
	// [4] Passing variables. Query options.

	const { error, data, refetch, networkStatus } = useSuspenseQuery<DogPhotoData>(GET_DOG_PHOTO, {
		variables: { breed },
		skip: false,
		errorPolicy: 'none',
	});

	if (error) return <p>{`Error! ${error}`}</p>;
	if (!data) return <p>{'No dog image data'}</p>;

	return (
		<Suspense fallback={'Suspense loading dog image...'}>
			<img alt={breed} src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
			<p style={{ display: 'flex', gap: 5 }}>
				<button
					type="button"
					onClick={() => {
						// Error:
						// A component suspended while responding to synchronous input.
						// This will cause the UI to be replaced with a loading indicator.
						// To fix, updates that suspend should be wrapped with `startTransition`.
						startTransition(() => {
							refetch();
						});
					}}
				>
					{`Refetch selected breed (${breed})`}
				</button>
				<button
					type="button"
					onClick={() => {
						// Can refetch with a new set of variables:
						startTransition(() => {
							refetch({ breed: 'boxer' }); // always refetches a `boxer` instead of the original breed
						});
					}}
				>
					Refetch boxer breed
				</button>
			</p>
		</Suspense>
	);
};
