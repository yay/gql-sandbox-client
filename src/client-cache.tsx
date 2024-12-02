import { InMemoryCache, type ReactiveVar, makeVar } from '@apollo/client';
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist';
import { UiMode } from './generated/graphql';

export const clientCache: InMemoryCache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				uiMode: {
					read() {
						return uiModeVar();
					},
				},
			},
		},
	},
});

// The library doesn't support Apollo Client's Reactive Variables.
// await persistCache({
//   cache: clientCache,
//   storage: new LocalStorageWrapper(window.localStorage),
// });

export const uiModeVar: ReactiveVar<UiMode> = makeVar<UiMode>(UiMode.Light);
