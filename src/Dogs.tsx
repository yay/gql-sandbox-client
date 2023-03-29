// https://www.apollographql.com/docs/react/data/queries/
// https://www.apollographql.com/docs/react/data/operation-best-practices/
// https://graphql.org/learn/queries/
import React, { FC, useState } from 'react';
import { DocumentNode, NetworkStatus, gql, useQuery, useLazyQuery } from '@apollo/client';

// The query's name `GetDogs` is completely arbitrary and can be anything.
// The name can be omitted altogether, as well as the `query` keyword itself.
// Here `query` is operation type and `GetDogs` is operation name.
// The operation type is either `query`, `mutation`, or `subscription`.
// The operation name is a meaningful and explicit name for your operation.
// It is only required in multi-operation documents, but its use is encouraged
// because it is very helpful for debugging and server-side logging.
const GET_DOGS: DocumentNode = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

type Dog = {
  id: string;
  breed: string;
};

type DogsQueryData = {
  dogs: Dog[];
};

type DogsProps = {
  onDogSelected: React.ChangeEventHandler<HTMLSelectElement>;
};

export const Dogs: FC<DogsProps> = ({ onDogSelected }) => {
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

export const DogsContainer: FC = () => {
  const [selectedDog, setSelectedDog] = useState<string | undefined>(undefined);

  const onDogSelected: React.ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
    setSelectedDog(target.value);
  };

  return (
    <div>
      <Dogs onDogSelected={onDogSelected} />
      {selectedDog && (
        <p>
          <DogPhoto breed={selectedDog} />
        </p>
      )}
    </div>
  );
};

// Sample query:
//
//   query Dog {
//     dog(breed: "african") {
//       id
//       displayImage
//     }
//   }
//

// When we start working with variables, we need to do three things:
// 1) Replace the static value in the query with `$variableName`
// 2) Declare `$variableName` as one of the variables accepted by the query
// 3) Pass `variableName: value` in the separate, transport-specific (usually JSON) variables dictionary

// Whenever Apollo Client fetches query results from your server,
// it automatically caches those results locally.
// This makes later executions of that same query extremely fast.
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

type DogPhotoData = {
  dog: {
    displayImage: string;
  };
};

const DogPhoto: FC<DogPhotoProps> = ({ breed }) => {
  // It wouldn't be a good idea to pass these dynamic arguments directly in the query string,
  // because then our client-side code would need to dynamically manipulate the query string at runtime,
  // and serialize it into a GraphQL-specific format. Instead, GraphQL has a first-class way
  // to factor dynamic values out of the query, and pass them as a separate dictionary.
  // These values are called variables.
  const { loading, error, data, startPolling, stopPolling, refetch, networkStatus } = useQuery<DogPhotoData>(
    GET_DOG_PHOTO,
    {
      variables: { breed },
      skip: false, // If `true`, the query is not executed. Not available with `useLazyQuery`.
      notifyOnNetworkStatusChange: true,
      errorPolicy: 'none', // default value (treat all GraphQL errors as runtime errors)

      // fetchPolicy: 'network-only', // doesn't check cache before making a network request
      // By default, the useQuery hook checks the Apollo Client cache to see if all the data you requested
      // is already available locally. If all data is available locally, `useQuery` returns that data
      // and doesn't query your GraphQL server. This `cache-first` policy is Apollo Client's default fetch policy.

      // pollInterval: 500,
      // Sometimes, you want to make sure that your query's cached data is up to date with your server's data.
      // Apollo Client supports two strategies for this: polling and refetching.
      // Polling provides near-real-time synchronization with your server by executing your query periodically
      // at a specified interval.
    }
  );

  // When React renders a component that calls `useQuery`, Apollo Client automatically executes the corresponding query.
  // But what if you want to execute a query in response to a different event, such as a user clicking a button?
  // The `useLazyQuery` hook is perfect for executing queries in response to events besides component rendering.
  // Unlike with `useQuery`, when you call useLazyQuery, it does not immediately execute its associated query.
  // Instead, it returns a query function in its result tuple that you call whenever you're ready to execute the query.
  const [getDogLazily, { loading: lazyLoading, error: lazyError, data: lazyData }] =
    useLazyQuery<DogPhotoData>(GET_DOG_PHOTO);

  // startPolling(500);

  // Refetching enables you to refresh query results in response to a particular user action,
  // as opposed to using a fixed interval.

  // Click the button and notice that the UI updates with a new dog photo.
  // Refetching is an excellent way to guarantee fresh data, but it introduces some complexity with loading state.
  // If you click the refetch button, you'll see that the component doesn't re-render until the new data arrives.
  // What if we want to indicate to the user that we're refetching the photo?
  // The useQuery hook's result object provides fine-grained information about the status of the query
  // via the `networkStatus` property. To take advantage of this information,
  // we set the `notifyOnNetworkStatusChange` option to `true` so our query component re-renders
  // while a refetch is in flight. Enabling this option also ensures that the value of `loading` updates accordingly,
  // even if you don't want to use the more fine-grained information provided by the `networkStatus` property.

  if (loading) {
    if (networkStatus === NetworkStatus.refetch) {
      return <p>Refetching...</p>;
    }
    return <p>Loading...</p>;
  }
  if (error) return <p>{`Error! ${error}`}</p>;
  if (!data) return <p>{'No dog image data'}</p>;

  return (
    <div>
      <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
      <p>
        <button
          onClick={() => {
            // You call refetch with a new set of variables:
            refetch({ breed: 'african' }); // always refetches an african instead of original breed
          }}
        >
          Refetch new breed!
        </button>
      </p>
      {lazyData && <img src={lazyData.dog.displayImage} style={{ height: 100, width: 100 }} />}
      <p>
        <button onClick={() => getDogLazily({ variables: { breed: 'bulldog' } })}>Get dog lazily</button>
      </p>
    </div>
  );
};
