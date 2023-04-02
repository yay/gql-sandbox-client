import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000', // URL of our GraphQL API
  // Generates types like `GetDogsQuery` and `GetDogsQueryVariables`.
  // Adding the 'typescript-react-apollo' plugin also makes it generate hooks like
  // `useGetDogsQuery` and document nodes like `GetDogsDocument`.
  documents: ['src/**/*.tsx'],
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
};

export default config;
