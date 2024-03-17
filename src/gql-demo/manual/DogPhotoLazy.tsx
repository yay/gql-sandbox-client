import React, { FC } from 'react';
import { useLazyQuery } from '@apollo/client';
import { DogPhotoQueryData } from './types';
import { GET_DOG_PHOTO } from './queries';
import { DogPhotoProps } from '../types';
import { DogPhotoTemplate } from '../DogPhotoTemplate';

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

  return (
    <DogPhotoTemplate
      result={result}
      button={{
        text: 'Get dog lazily',
        onClick: () => execute({ variables: { breed } }),
      }}
    />
  );
};
