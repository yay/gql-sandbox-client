import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Dog = {
  __typename?: 'Dog';
  breed: Scalars['String'];
  displayImage?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  images?: Maybe<Array<Maybe<Image>>>;
  subbreeds?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['String'];
  url: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  dog?: Maybe<Dog>;
  dogs?: Maybe<Array<Maybe<Dog>>>;
};


export type QueryDogArgs = {
  breed: Scalars['String'];
};

export type GetDogsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDogsQuery = { __typename?: 'Query', dogs?: Array<{ __typename?: 'Dog', id: string, breed: string } | null> | null };

export type GetDogPhotoQueryVariables = Exact<{
  breed: Scalars['String'];
}>;


export type GetDogPhotoQuery = { __typename?: 'Query', dog?: { __typename?: 'Dog', id: string, displayImage?: string | null } | null };


export const GetDogsDocument = gql`
    query GetDogs {
  dogs {
    id
    breed
  }
}
    `;

/**
 * __useGetDogsQuery__
 *
 * To run a query within a React component, call `useGetDogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDogsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDogsQuery(baseOptions?: Apollo.QueryHookOptions<GetDogsQuery, GetDogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDogsQuery, GetDogsQueryVariables>(GetDogsDocument, options);
      }
export function useGetDogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDogsQuery, GetDogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDogsQuery, GetDogsQueryVariables>(GetDogsDocument, options);
        }
export type GetDogsQueryHookResult = ReturnType<typeof useGetDogsQuery>;
export type GetDogsLazyQueryHookResult = ReturnType<typeof useGetDogsLazyQuery>;
export type GetDogsQueryResult = Apollo.QueryResult<GetDogsQuery, GetDogsQueryVariables>;
export const GetDogPhotoDocument = gql`
    query GetDogPhoto($breed: String!) {
  dog(breed: $breed) {
    id
    displayImage
  }
}
    `;

/**
 * __useGetDogPhotoQuery__
 *
 * To run a query within a React component, call `useGetDogPhotoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDogPhotoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDogPhotoQuery({
 *   variables: {
 *      breed: // value for 'breed'
 *   },
 * });
 */
export function useGetDogPhotoQuery(baseOptions: Apollo.QueryHookOptions<GetDogPhotoQuery, GetDogPhotoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDogPhotoQuery, GetDogPhotoQueryVariables>(GetDogPhotoDocument, options);
      }
export function useGetDogPhotoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDogPhotoQuery, GetDogPhotoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDogPhotoQuery, GetDogPhotoQueryVariables>(GetDogPhotoDocument, options);
        }
export type GetDogPhotoQueryHookResult = ReturnType<typeof useGetDogPhotoQuery>;
export type GetDogPhotoLazyQueryHookResult = ReturnType<typeof useGetDogPhotoLazyQuery>;
export type GetDogPhotoQueryResult = Apollo.QueryResult<GetDogPhotoQuery, GetDogPhotoQueryVariables>;