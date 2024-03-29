// This file has been moved out of the `src` folder not to interfere with the
// `documents: ['src/**/*.tsx']` config inside `codegen.ts`, because the locations query
// specified here cannot be found in the schema.

// https://www.apollographql.com/docs/react/get-started/
import React, { FC } from 'react';
// Apollo Client is a comprehensive state management library for JavaScript that enables you
// to manage both local and remote data with GraphQL. Use it to fetch, cache, and modify application data,
// all while automatically updating your UI.
import { useQuery, gql, ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://flyby-router-demo.herokuapp.com/', // URL of our GraphQL server
  cache: new InMemoryCache(), // cache query results after fetching them
});

// Plain JS Apollo Client query:
client
  .query({
    query: gql`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
  })
  .then((result) => console.log(result));

// `gql` parses query strings into query documents
const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

type QueryData = {
  locations: {
    id: string;
    name: string;
    description: string;
    photo: string;
  }[];
};

export const DisplayLocations: FC = () => {
  // After your ApolloProvider is hooked up, you can start requesting data with useQuery.
  // The useQuery hook is a React hook that shares GraphQL data with your UI.

  // Whenever this component renders, the useQuery hook automatically executes our query
  // and returns a result object containing loading, error, and data properties.

  // Apollo Client automatically tracks a query's loading and error states,
  // which are reflected in the loading and error properties.
  const { loading, error, data } = useQuery<QueryData>(GET_LOCATIONS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error : {error.message}</div>;

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div>
      {data.locations.map(({ id, name, description, photo }) => (
        <div key={id}>
          <h3>{name}</h3>
          <img width="400" height="250" alt="location-reference" src={`${photo}`} />
          <br />
          <b>About this location:</b>
          <div>{description}</div>
          <br />
        </div>
      ))}
    </div>
  );
};

// You connect Apollo Client to React with the ApolloProvider component.
// Similar to React's Context.Provider, ApolloProvider wraps your React app
// and places Apollo Client on the context, enabling you to access it from anywhere
// in your component tree.
export const DisplayLocationsContainer: FC = () => {
  return (
    <ApolloProvider client={client}>
      <DisplayLocations />
    </ApolloProvider>
  );
};
