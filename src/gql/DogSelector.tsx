// https://www.apollographql.com/docs/react/data/queries/
// https://www.apollographql.com/docs/react/data/operation-best-practices/
// https://graphql.org/learn/queries/
import React, { FC } from 'react';
import { DocumentNode, gql, useQuery } from '@apollo/client';

/**
 * [1] Fields.
 *
 * At its simplest, GraphQL is about asking for specific fields on objects.
 * Here `query` is operation type and `GetDogs` is operation name.
 * Both the operation name and the `query` keyword can be omitted, but it's a bad practice.
 * The operation type is either `query`, `mutation`, or `subscription`.
 */
const GET_DOGS: DocumentNode = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

// Manually creating the TypeScript types for the generic `useQuery` method.
type Dog = {
  id: string;
  breed: string;
};

type DogsQueryData = {
  dogs: Dog[];
};

type DogSelectorProps = {
  onDogSelected: React.ChangeEventHandler<HTMLSelectElement>;
};

export const DogSelector: FC<DogSelectorProps> = ({ onDogSelected }) => {
  // Get a list of all dog breeds.
  const { loading, error, data } = useQuery<DogsQueryData>(GET_DOGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error! ${error.message}`}</p>;
  if (!data) return <p>{'No dogs data'}</p>;

  return (
    <select name="dog" onChange={onDogSelected}>
      {data.dogs.map((dog) => (
        <option key={dog.id} value={dog.breed}>
          {dog.breed}
        </option>
      ))}
    </select>
  );
};
