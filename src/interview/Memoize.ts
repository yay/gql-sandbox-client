/* eslint-disable @typescript-eslint/no-explicit-any */

export function memoize(fn: (...args: unknown[]) => unknown) {
  const cache = new Map<unknown, unknown>();
  return (...args: unknown[]): unknown => {
    const input = args[0]; // just taking one argument here
    if (cache.has(input)) {
      console.log('Fetching from cache');
      return cache.get(input);
    } else {
      console.log('Calculating result');
      const output = fn(input);
      cache.set(input, output);
      return output;
    }
  };
}
