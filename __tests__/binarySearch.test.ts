import { binarySearch, isSortedArray } from '../src/utils/binarySearch';
import { generatorExecutor } from '../src/utils/generatorExecutor';

describe('Binary search', () => {
  test('finds the element in passed array', () => {
    const generator = binarySearch([0, 1, 2, 3, 4, 5, 6, 7, 8], 3);
    expect(generatorExecutor(generator).value).toBe(3);
  });
  test('returns -1 if the element is not found', () => {
    const generator = binarySearch([0, 1, 2, 3, 4, 5, 6, 7, 8], 10);
    expect(generatorExecutor(generator).value).toBe(-1);
  });
  test('returns -1 if passed array is empty', () => {
    const generator = binarySearch([], 2);
    expect(generatorExecutor(generator).value).toBe(-1);
  });
  test('returns true, if an array is sorted', () => {
    expect(isSortedArray([0, 1, 2, 3, 4, 5, 6, 7, 8])).toBe(true);
  });
  test('returns false, if an array is not sorted', () => {
    expect(isSortedArray([3, 2, 7, 1, 5, 4])).toBe(false);
  });
  test('throws an error for unsorted array', () => {
    const generator = binarySearch([3, 2, 7, 1, 5, 4], 2);
    expect(() => generatorExecutor(generator)).toThrow(new Error('Binary search function accepts only sorted arrays'));
  });
});
