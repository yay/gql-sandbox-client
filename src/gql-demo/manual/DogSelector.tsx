import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { GET_DOGS } from './queries';
import { DogsQueryData } from './types';

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
