import { DocumentNode, gql } from '@apollo/client';

/**
 * [2] Arguments.
 *
 * In a system like REST, you can only pass a single set of arguments - the query parameters and URL segments
 * in your request. But in GraphQL, every field and nested object can get its own set of arguments,
 * making GraphQL a complete replacement for making multiple API fetches.
 * You can even pass arguments into scalar fields, to implement data transformations once on the server,
 * instead of on every client separately.
 */
export const GET_BOXER_PHOTO: DocumentNode = gql`
  query GetBoxerPhoto {
    dog(breed: "boxer") {
      id
      displayImage
    }
  }
`;

/**
 * [3] Variables.
 *
 * Instead of serializing dynamic arguments into the query string, we can use variables.
 *
 * When we start working with variables, we need to do three things:
 * 1) Replace the static value in the query with `$variableName`
 * 2) Declare `$variableName` as one of the variables accepted by the query
 * 3) Pass `variableName: value` in the separate, transport-specific (usually JSON) variables dictionary
 */
export const GET_DOG_PHOTO: DocumentNode = gql`
  query GetDogPhoto($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;
