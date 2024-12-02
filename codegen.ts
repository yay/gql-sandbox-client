import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'http://localhost:4000/graphql',
	documents: ['src/**/*.{ts,tsx,graphql}'],
	generates: {
		'src/generated/graphql.ts': {
			schema: 'src/client-schema.graphql',
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
		},
	},
};

export default config;
