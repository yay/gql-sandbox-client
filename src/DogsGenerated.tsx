import React, { FC, useState } from 'react';
import { DocumentNode, NetworkStatus, gql, useQuery, useLazyQuery } from '@apollo/client';
import { Query } from './generated/graphql';
import { DogPhoto } from './Dogs';

type DogsDogsGeneratedProps = {
  onDogSelected: React.ChangeEventHandler<HTMLSelectElement>;
};

const GET_DOGS: DocumentNode = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

export const DogsGenerated: FC<DogsDogsGeneratedProps> = ({ onDogSelected }) => {
  const { loading, error, data } = useQuery<Query>(GET_DOGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error! ${error.message}`}</p>;
  if (!data || !data.dogs) return <p>{'No dogs data'}</p>;

  return (
    <select name="dog" onChange={onDogSelected}>
      {data.dogs.map((dog) =>
        dog ? (
          <option key={dog.id} value={dog.breed}>
            {dog.breed}
          </option>
        ) : null
      )}
    </select>
  );
};

export const DogsGeneratedContainer: FC = () => {
  const [selectedDog, setSelectedDog] = useState<string | undefined>(undefined);

  const onDogSelected: React.ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
    setSelectedDog(target.value);
  };

  return (
    <div>
      <DogsGenerated onDogSelected={onDogSelected} />
      {selectedDog && (
        <p>
          <DogPhoto breed={selectedDog} />
        </p>
      )}
    </div>
  );
};
