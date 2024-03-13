// This file contains the same code as the Dogs.tsx, but uses types generated from server's
// GraphQL schema, instead of defining its own types. This allowed to catch a few type safety
// issues not obvious in the Dogs.tsx, such as non-optional 'breed' parameter for `GET_DOG_PHOTO`
// query and potentially null `data?.dog?.displayImage` in the returned data.

// The queries still have to be manually constructed by the client because only the client
// knows exactly which data it wants to fetch.

import React, { FC, useState } from 'react';
import { NetworkStatus } from '@apollo/client';
import { useGetDogPhotoLazyQuery, useGetDogPhotoQuery, useGetDogsQuery } from '../generated/graphql';
import { Image } from './manual/Image';

type DogsGeneratedHooksProps = {
  onDogSelected: React.ChangeEventHandler<HTMLSelectElement>;
};

export const GeneratedHooks: FC<DogsGeneratedHooksProps> = ({ onDogSelected }) => {
  const { loading, error, data } = useGetDogsQuery();

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

type DogPhotoGeneratedHooksProps = {
  breed?: string;
};

export const DogPhotoGeneratedHooks: FC<DogPhotoGeneratedHooksProps> = ({ breed }) => {
  const { loading, error, data, refetch, networkStatus } = useGetDogPhotoQuery({
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
      <Image src={data.dog.displayImage} />
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

export const LazyDogPhotoGeneratedHooks: FC<DogPhotoGeneratedHooksProps> = ({ breed }) => {
  const [getDogPhoto, { loading, error, data, networkStatus }] = useGetDogPhotoLazyQuery();

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
        <button onClick={() => getDogPhoto({ variables: { breed: breed || '' } })}>Get dog lazily</button>
      </p>
    </div>
  );
};

export const DogsGeneratedHooksContainer: FC = () => {
  const [selectedDog, setSelectedDog] = useState<string | undefined>(undefined);

  const onDogSelected: React.ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
    setSelectedDog(target.value);
  };

  return (
    <div>
      <GeneratedHooks onDogSelected={onDogSelected} />
      {selectedDog && (
        <div>
          <p>
            <DogPhotoGeneratedHooks breed={selectedDog} />
          </p>
          <p>
            <LazyDogPhotoGeneratedHooks breed={selectedDog} />
          </p>
        </div>
      )}
    </div>
  );
};
