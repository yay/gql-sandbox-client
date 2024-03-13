import React, { FC } from 'react';
import { NetworkStatus, useLazyQuery } from '@apollo/client';
import { DogPhotoQueryData, DogPhotoProps } from './types';
import { GET_DOG_PHOTO } from './queries';
import { Image } from './Image';

/**
 * When React renders a component that calls `useQuery`, Apollo Client automatically executes the corresponding query.
 * But what if you want to execute a query in response to a different event, such as a user clicking a button?
 *
 * The `useLazyQuery` hook is perfect for executing queries in response to events besides component rendering.
 * Unlike with `useQuery`, when you call `useLazyQuery`, it does not immediately execute its associated query.
 * Instead, it returns a tuple containing query function that you call whenever you're ready to execute the query.
 */
export const DogPhotoLazy: FC<DogPhotoProps> = ({ breed }) => {
  const [execute, result] = useLazyQuery<DogPhotoQueryData>(GET_DOG_PHOTO);
  const { loading, error, data, networkStatus } = result;

  if (loading) {
    if (networkStatus === NetworkStatus.refetch) {
      return <p>Refetching...</p>;
    }
    return <p>Loading...</p>;
  }
  if (error) return <p>{`Error! ${error}`}</p>;

  return (
    <div>
      {data?.dog?.displayImage ? <Image src={data.dog.displayImage} /> : 'No dog image data'}
      <p>
        <button onClick={() => execute({ variables: { breed } })}>Get dog lazily</button>
      </p>
    </div>
  );
};
