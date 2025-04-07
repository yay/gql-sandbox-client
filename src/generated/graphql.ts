import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  score: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  deleteUser?: Maybe<Scalars['String']['output']>;
  updateUser?: Maybe<User>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  uiMode: UiMode;
  users?: Maybe<Array<User>>;
  usersConnection?: Maybe<UserConnection>;
};


export type QueryUsersArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUsersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type ScoreChangedResult = {
  __typename?: 'ScoreChangedResult';
  id: Scalars['ID']['output'];
  score: Scalars['Int']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  scoreChanged: ScoreChangedResult;
};


export type SubscriptionScoreChangedArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export enum UiMode {
  Dark = 'dark',
  Light = 'light',
  System = 'system'
}

export type UpdateUserInput = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  score: Scalars['Int']['output'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  pageInfo: PageInfo;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<User>;
};

export type GetUiModeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUiModeQuery = { __typename?: 'Query', uiMode: UiMode };

export type NamePartsFragment = { __typename?: 'User', firstName: string, lastName: string };

export type NewUserFragment = { __typename?: 'User', id: string, email: string, firstName: string, lastName: string };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', email: string, firstName: string, lastName: string }> | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, score: number }> | null };

export type GetUserInlineFragmentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserInlineFragmentQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', firstName: string, lastName: string, email: string }> | null };

export type GetUsersConnectionQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUsersConnectionQuery = { __typename?: 'Query', usersConnection?: { __typename?: 'UserConnection', edges?: Array<{ __typename?: 'UserEdge', cursor: string, node?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, score: number } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null } } | null };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id: string, firstName: string, lastName: string } | null };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser?: string | null };

export type ScoreChangedSubscriptionVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type ScoreChangedSubscription = { __typename?: 'Subscription', scoreChanged: { __typename?: 'ScoreChangedResult', id: string, score: number } };

export const NamePartsFragmentDoc = gql`
    fragment NameParts on User {
  firstName
  lastName
}
    `;
export const NewUserFragmentDoc = gql`
    fragment NewUser on User {
  id
  email
  firstName
  lastName
}
    `;
export const GetUiModeDocument = gql`
    query getUiMode {
  uiMode @client
}
    `;

/**
 * __useGetUiModeQuery__
 *
 * To run a query within a React component, call `useGetUiModeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUiModeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUiModeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUiModeQuery(baseOptions?: Apollo.QueryHookOptions<GetUiModeQuery, GetUiModeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUiModeQuery, GetUiModeQueryVariables>(GetUiModeDocument, options);
      }
export function useGetUiModeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUiModeQuery, GetUiModeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUiModeQuery, GetUiModeQueryVariables>(GetUiModeDocument, options);
        }
export function useGetUiModeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUiModeQuery, GetUiModeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUiModeQuery, GetUiModeQueryVariables>(GetUiModeDocument, options);
        }
export type GetUiModeQueryHookResult = ReturnType<typeof useGetUiModeQuery>;
export type GetUiModeLazyQueryHookResult = ReturnType<typeof useGetUiModeLazyQuery>;
export type GetUiModeSuspenseQueryHookResult = ReturnType<typeof useGetUiModeSuspenseQuery>;
export type GetUiModeQueryResult = Apollo.QueryResult<GetUiModeQuery, GetUiModeQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($id: ID!) {
  users(id: $id) {
    ...NameParts
    email
  }
}
    ${NamePartsFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    id
    email
    firstName
    lastName
    score
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetUserInlineFragmentDocument = gql`
    query GetUserInlineFragment($id: ID!) {
  users(id: $id) {
    ... on User {
      firstName
      lastName
    }
    email
  }
}
    `;

/**
 * __useGetUserInlineFragmentQuery__
 *
 * To run a query within a React component, call `useGetUserInlineFragmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserInlineFragmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserInlineFragmentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserInlineFragmentQuery(baseOptions: Apollo.QueryHookOptions<GetUserInlineFragmentQuery, GetUserInlineFragmentQueryVariables> & ({ variables: GetUserInlineFragmentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserInlineFragmentQuery, GetUserInlineFragmentQueryVariables>(GetUserInlineFragmentDocument, options);
      }
export function useGetUserInlineFragmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserInlineFragmentQuery, GetUserInlineFragmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserInlineFragmentQuery, GetUserInlineFragmentQueryVariables>(GetUserInlineFragmentDocument, options);
        }
export function useGetUserInlineFragmentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserInlineFragmentQuery, GetUserInlineFragmentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserInlineFragmentQuery, GetUserInlineFragmentQueryVariables>(GetUserInlineFragmentDocument, options);
        }
export type GetUserInlineFragmentQueryHookResult = ReturnType<typeof useGetUserInlineFragmentQuery>;
export type GetUserInlineFragmentLazyQueryHookResult = ReturnType<typeof useGetUserInlineFragmentLazyQuery>;
export type GetUserInlineFragmentSuspenseQueryHookResult = ReturnType<typeof useGetUserInlineFragmentSuspenseQuery>;
export type GetUserInlineFragmentQueryResult = Apollo.QueryResult<GetUserInlineFragmentQuery, GetUserInlineFragmentQueryVariables>;
export const GetUsersConnectionDocument = gql`
    query getUsersConnection($first: Int, $after: String, $last: Int, $before: String) {
  usersConnection(first: $first, after: $after, last: $last, before: $before) {
    edges {
      cursor
      node {
        id
        email
        firstName
        lastName
        score
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
    `;

/**
 * __useGetUsersConnectionQuery__
 *
 * To run a query within a React component, call `useGetUsersConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useGetUsersConnectionQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersConnectionQuery, GetUsersConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersConnectionQuery, GetUsersConnectionQueryVariables>(GetUsersConnectionDocument, options);
      }
export function useGetUsersConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersConnectionQuery, GetUsersConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersConnectionQuery, GetUsersConnectionQueryVariables>(GetUsersConnectionDocument, options);
        }
export function useGetUsersConnectionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersConnectionQuery, GetUsersConnectionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersConnectionQuery, GetUsersConnectionQueryVariables>(GetUsersConnectionDocument, options);
        }
export type GetUsersConnectionQueryHookResult = ReturnType<typeof useGetUsersConnectionQuery>;
export type GetUsersConnectionLazyQueryHookResult = ReturnType<typeof useGetUsersConnectionLazyQuery>;
export type GetUsersConnectionSuspenseQueryHookResult = ReturnType<typeof useGetUsersConnectionSuspenseQuery>;
export type GetUsersConnectionQueryResult = Apollo.QueryResult<GetUsersConnectionQuery, GetUsersConnectionQueryVariables>;
export const CreateUserDocument = gql`
    mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    email
    firstName
    lastName
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    firstName
    lastName
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation deleteUser($id: ID!) {
  deleteUser(id: $id)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const ScoreChangedDocument = gql`
    subscription scoreChanged($id: ID) {
  scoreChanged(userId: $id) {
    id
    score
  }
}
    `;

/**
 * __useScoreChangedSubscription__
 *
 * To run a query within a React component, call `useScoreChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useScoreChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScoreChangedSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useScoreChangedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ScoreChangedSubscription, ScoreChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ScoreChangedSubscription, ScoreChangedSubscriptionVariables>(ScoreChangedDocument, options);
      }
export type ScoreChangedSubscriptionHookResult = ReturnType<typeof useScoreChangedSubscription>;
export type ScoreChangedSubscriptionResult = Apollo.SubscriptionResult<ScoreChangedSubscription>;