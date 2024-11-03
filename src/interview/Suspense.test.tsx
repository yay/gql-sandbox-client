import { describe, expect, test } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import SuspenseExample, { LOADING_DELAY } from './Suspense';
import '@testing-library/jest-dom/vitest'; // for toBeInTheDocument to work

describe('Suspense', () => {
	test('loading', async () => {
		expect('lol').toBe('lol');
		const { getByText } = render(<SuspenseExample />);
		await waitFor(
			() => {
				expect(getByText('Lazy Component')).toBeInTheDocument();
			},
			{ timeout: LOADING_DELAY + 100 },
		);
	});
});
