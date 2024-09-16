/* eslint-disable @typescript-eslint/no-explicit-any */

// Debounce transforms a function, so that it's only called once after a specified timeout.

// Show suggestions for a search query, but only after a visitor has finished typing it.

export function debounce<T extends (...args: any[]) => any>(fn: T, delay = 500): (...args: Parameters<T>) => void {
  let id = 0;
  return (...args: any[]) => {
    clearTimeout(id);
    id = window.setTimeout(() => fn(...args), delay);
  };
}
