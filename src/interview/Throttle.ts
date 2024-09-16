/* eslint-disable @typescript-eslint/no-explicit-any */

// Throttling is a technique used to limit the rate at which a function is called.
// Throttling transforms a function such that
// it can only be called once in a specific interval of time.

// Show suggestions for a search query, but only show them once per 2 seconds
// based on what's been typed in so far. Ensure last call to the search with current input,
// even if the user stopped typing in less than 2 seconds from the last search.

export function naiveThrottle<T extends (...args: any[]) => any>(fn: T, delay = 500): (...args: Parameters<T>) => void {
  let id = 0;
  let waiting = false;
  return (...args: any[]) => {
    if (waiting) {
      return;
    }
    fn(...args);
    waiting = true;
    id = window.setTimeout(() => {
      waiting = false;
    }, delay);
  };
}

export function throttle<T extends (...args: any[]) => any>(fn: T, delay = 500): (...args: Parameters<T>) => void {
  let id = 0;
  let lastCallId = 0;
  let waiting = false;
  return (...args: any[]) => {
    if (waiting) {
      // Do nothing, but ensure last call (same as debounce).
      clearTimeout(lastCallId);
      lastCallId = window.setTimeout(() => fn(...args), delay);
      return;
    }
    fn(...args);
    waiting = true;
    id = window.setTimeout(() => {
      waiting = false;
    }, delay);
  };
}
