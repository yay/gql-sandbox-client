import React, { FC, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_DOGS } from './manual/queries';
import { DogsQueryData } from './manual/types';
// import { useGetDogsQuery } from '../generated/graphql';

type DogSelectorProps = {
  onDogSelected: (selection: string) => void;
};

export const DogSelector: FC<DogSelectorProps> = ({ onDogSelected }) => {
  // Get a list of all dog breeds.
  const { loading, error, data } = useQuery<DogsQueryData>(GET_DOGS);
  // const { loading, error, data } = useGetDogsQuery(); // generated hook version
  const dogs = data?.dogs;

  useEffect(() => {
    const firstBreed = dogs?.[0]?.breed;
    if (firstBreed) {
      onDogSelected(firstBreed);
    }
  }, [dogs, onDogSelected]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;
  if (!data) return <div>{'No dogs data'}</div>;

  return (
    <select name="dog" onChange={({ target }) => onDogSelected(target.value)}>
      {dogs?.map((dog) => (
        <option key={dog.id} value={dog.breed}>
          {dog.breed}
        </option>
      ))}
    </select>
  );
};
