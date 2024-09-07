// This file contains the same code as the Dogs.tsx, but uses types generated from server's
// GraphQL schema, instead of definiting its own types. This allowed to catch a few type safety
// issues not obvious in the Dogs.tsx, such as non-optinal 'breed' parameter for `GET_DOG_PHOTO`
// query and potentially null `data?.dog?.displayImage` in the returned data.

// The queries still have to be manually constructed by the client because only the client
// knows exactly which data it wants to fetch.

import React, { FC, useState } from 'react';
import { DocumentNode, NetworkStatus, gql, useQuery, useLazyQuery } from '@apollo/client';
import { Query, QueryDogArgs } from '../generated/graphql';

type DogsGeneratedTypesProps = {
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

export const DogsGeneratedTypes: FC<DogsGeneratedTypesProps> = ({ onDogSelected }) => {
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

type DogPhotoGeneratedTypesProps = {
  breed?: string;
};

export const DogPhotoGeneratedTypes: FC<DogPhotoGeneratedTypesProps> = ({ breed }) => {
  const { loading, error, data, refetch, networkStatus } = useQuery<Query, QueryDogArgs>(GET_DOG_PHOTO, {
    variables: { breed: breed || '' },
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

export const LazyDogPhotoGeneratedTypes: FC<DogPhotoGeneratedTypesProps> = ({ breed }) => {
  const [getDogPhoto, { loading, error, data, networkStatus }] = useLazyQuery<Query, QueryDogArgs>(GET_DOG_PHOTO);

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
        <button onClick={() => getDogPhoto({ variables: { breed: breed || '' } })}>Get dog lazily</button>
      </p>
    </div>
  );
};

export const DogsGeneratedTypesContainer: FC = () => {
  const [selectedDog, setSelectedDog] = useState<string | undefined>(undefined);

  const onDogSelected: React.ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
    setSelectedDog(target.value);
  };

  return (
    <div>
      <DogsGeneratedTypes onDogSelected={onDogSelected} />
      {selectedDog && (
        <div>
          <p>
            <DogPhotoGeneratedTypes breed={selectedDog} />
          </p>
          <p>
            <LazyDogPhotoGeneratedTypes breed={selectedDog} />
          </p>
        </div>
      )}
    </div>
  );
};
