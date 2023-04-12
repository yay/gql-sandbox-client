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

export type Actor = {
  __typename?: 'Actor';
  movies?: Maybe<Array<Maybe<Movie>>>;
  name: Scalars['String'];
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Director = {
  __typename?: 'Director';
  movies?: Maybe<Array<Maybe<Movie>>>;
  name: Scalars['String'];
};

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

export type Movie = {
  __typename?: 'Movie';
  cast?: Maybe<Array<Maybe<Actor>>>;
  director: Director;
  title: Scalars['String'];
  year?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMovie?: Maybe<Movie>;
};


export type MutationAddMovieArgs = {
  director: Scalars['String'];
  title: Scalars['String'];
  year?: InputMaybe<Scalars['Int']>;
};

export type NetworkingList = {
  __typename?: 'NetworkingList';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  networkingListEntriesData: NetworkingListEntriesData;
};


export type NetworkingListNetworkingListEntriesDataArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<NetworkingListEntriesSort>>;
};

export type NetworkingListEntriesData = {
  __typename?: 'NetworkingListEntriesData';
  data?: Maybe<Array<NetworkingListEntry>>;
  totalCount: Scalars['Int'];
};

export type NetworkingListEntriesSort = {
  field: NetworkingListEntriesSortField;
  order: SortOrder;
};

export enum NetworkingListEntriesSortField {
  CreatedDate = 'CREATED_DATE',
  Location = 'LOCATION',
  Name = 'NAME'
}

export type NetworkingListEntry = {
  __typename?: 'NetworkingListEntry';
  createdDate?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  dog?: Maybe<Dog>;
  dogs?: Maybe<Array<Maybe<Dog>>>;
  getNetworkingList: NetworkingList;
};


export type QueryDogArgs = {
  breed: Scalars['String'];
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type GetDogsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDogsQuery = { __typename?: 'Query', dogs?: Array<{ __typename?: 'Dog', id: string, breed: string } | null> | null };

export type GetDogPhotoQueryVariables = Exact<{
  breed: Scalars['String'];
}>;


export type GetDogPhotoQuery = { __typename?: 'Query', dog?: { __typename?: 'Dog', id: string, displayImage?: string | null } | null };

export type GetNetworkingListQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<NetworkingListEntriesSort> | NetworkingListEntriesSort>;
}>;


export type GetNetworkingListQuery = { __typename?: 'Query', getNetworkingList: { __typename?: 'NetworkingList', id?: string | null, name: string, networkingListEntriesData: { __typename?: 'NetworkingListEntriesData', totalCount: number, data?: Array<{ __typename?: 'NetworkingListEntry', createdDate?: string | null }> | null } } };


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
export const GetNetworkingListDocument = gql`
    query GetNetworkingList($page: Int, $limit: Int, $sort: [NetworkingListEntriesSort!]) {
  getNetworkingList {
    id
    name
    networkingListEntriesData(page: $page, limit: $limit, sort: $sort) {
      data {
        createdDate
      }
      totalCount
    }
  }
}
    `;

/**
 * __useGetNetworkingListQuery__
 *
 * To run a query within a React component, call `useGetNetworkingListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNetworkingListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNetworkingListQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetNetworkingListQuery(baseOptions?: Apollo.QueryHookOptions<GetNetworkingListQuery, GetNetworkingListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNetworkingListQuery, GetNetworkingListQueryVariables>(GetNetworkingListDocument, options);
      }
export function useGetNetworkingListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNetworkingListQuery, GetNetworkingListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNetworkingListQuery, GetNetworkingListQueryVariables>(GetNetworkingListDocument, options);
        }
export type GetNetworkingListQueryHookResult = ReturnType<typeof useGetNetworkingListQuery>;
export type GetNetworkingListLazyQueryHookResult = ReturnType<typeof useGetNetworkingListLazyQuery>;
export type GetNetworkingListQueryResult = Apollo.QueryResult<GetNetworkingListQuery, GetNetworkingListQueryVariables>;