export function* binarySearch(array: number[], element: number) {
  if (!array.length) return -1;
  if (!isSortedArray(array)) throw new Error('Binary search function accepts only sorted arrays');

  let start = 0;
  let end = array.length - 1;

  for (let i = 0; i < array.length; i++) {
    const mid = Math.ceil((start + end) / 2);
    const guess = array[mid];

    yield { start, end, mid, guess };

    if (guess === element) {
      return mid;
    } else if (guess > element) {
      end = mid - 1;
      yield { start, end, mid, guess };
    } else {
      start = mid + 1;
      yield { start, end, mid, guess };
    }
  }

  return -1;
}

export function isSortedArray(array: number[]): boolean {
  let prev = null;

  for (const item of array) {
    if (prev === null) {
      prev = item;
      continue;
    }
    if (item < prev) return false;

    prev = item;
  }

  return true;
}
