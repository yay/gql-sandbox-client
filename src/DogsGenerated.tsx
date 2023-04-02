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

const GET_DOG_PHOTO: DocumentNode = gql`
  query GetDogPhoto($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

type DogPhotoProps = {
  breed?: string;
};

export const DogPhotoGenerated: FC<DogPhotoProps> = ({ breed }) => {
  const { loading, error, data, refetch, networkStatus } = useQuery<Query>(GET_DOG_PHOTO, {
    variables: { breed },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    if (networkStatus === NetworkStatus.refetch) {
      return <p>Refetching...</p>;
    }
    return <p>Loading...</p>;
  }
  if (error) return <p>{`Error! ${error}`}</p>;

  if (!data?.dog?.displayImage) return <p>{'No dog image data'}</p>;

  return (
    <div>
      <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
      <p>
        <button
          onClick={() => {
            refetch({ breed: 'african' });
          }}
        >
          Refetch new breed!
        </button>
      </p>
    </div>
  );
};

export const LazyDogPhotoGenerated: FC<DogPhotoProps> = ({ breed }) => {
  const [getDogPhoto, { loading, error, data, networkStatus }] = useLazyQuery<Query>(GET_DOG_PHOTO);

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
        <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
      ) : (
        'No dog image data'
      )}
      <p>
        <button onClick={() => getDogPhoto({ variables: { breed } })}>Get dog lazily</button>
      </p>
    </div>
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
        <div>
          <p>
            <DogPhotoGenerated breed={selectedDog} />
          </p>
          <p>
            <LazyDogPhotoGenerated breed={selectedDog} />
          </p>
        </div>
      )}
    </div>
  );
};
