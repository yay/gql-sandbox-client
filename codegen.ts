import type { CodegenConfig } from '@graphql-codegen/cli';
import type { SchemaASTConfig } from '@graphql-codegen/schema-ast';

const config: CodegenConfig = {
	overwrite: true,
	generates: {
		// Save server schema to a file to be used when the server is down.
		'server-schema.graphql': {
			schema: 'http://localhost:4000/graphql',
			plugins: [
				{
					'schema-ast': {
						includeDirectives: true,
					} satisfies SchemaASTConfig,
				},
			],
		},
		'src/generated/graphql.ts': {
			schema: ['http://localhost:4000/graphql', 'client-schema.graphql'],
			documents: ['src/**/*.{ts,tsx,graphql}'],
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
		},
	},
};

export default config;
