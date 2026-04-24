import { useGenerator } from '../src/hooks/useGenerator';
import { renderHook, act } from '@testing-library/react';

describe('useGenerator', () => {
  function* foo() {
    yield 1;
    yield 2;
    yield 3;

    return 4;
  }

  test('initial value is null', () => {
    const { result } = renderHook(() => useGenerator(foo()));
    expect(result.current.iteratorResult).toBeNull();
  });

  test('next updates value correctly', () => {
    const { result } = renderHook(() => useGenerator(foo()));

    act(() => result.current.next());

    expect(result.current.iteratorResult).toEqual({ value: 1, done: false });

    act(() => {
      result.current.next();
    });

    expect(result.current.iteratorResult).toEqual({ value: 2, done: false });
  });

  test('back updates value to previous one', () => {
    const { result } = renderHook(() => useGenerator(foo()));

    act(() => {
      result.current.next();
      result.current.next();
      result.current.next();
    });

    expect(result.current.iteratorResult).toEqual({ value: 3, done: false });

    act(() => {
      result.current.back();
    });

    expect(result.current.iteratorResult).toEqual({ value: 2, done: false });
  });

  test('back returns null if it goes before the first value', () => {
    const { result } = renderHook(() => useGenerator(foo()));

    act(() => {
      result.current.next();
      result.current.back();
      result.current.back();
    });

    expect(result.current.iteratorResult).toBeNull();
  });

  test('next returns final value when generator is done', () => {
    const { result } = renderHook(() => useGenerator(foo()));

    act(() => {
      result.current.next();
      result.current.next();
      result.current.next();
      result.current.next();
    });

    expect(result.current.iteratorResult).toEqual({ value: 4, done: true });
  });

  test('handles empty generator correctly', () => {
    function* emptyGenerator() {}

    const { result } = renderHook(() => useGenerator(emptyGenerator()));

    act(() => {
      result.current.next();
    });

    expect(result.current.iteratorResult).toEqual({ value: undefined, done: true });
  });

  test('next works correctly after back', () => {
    const { result } = renderHook(() => useGenerator(foo()));

    act(() => {
      result.current.next();
      result.current.next();
      result.current.back();
      result.current.next();
    });

    expect(result.current.iteratorResult).toEqual({ value: 2, done: false });
  });

  test('handles generator exceptions', () => {
    function* generatorWithError() {
      yield 1;
      throw new Error('Error');
    }

    const { result } = renderHook(() => useGenerator(generatorWithError()));

    act(() => {
      result.current.next();
    });

    expect(result.current.iteratorResult).toEqual({ value: 1, done: false });

    expect(() => {
      act(() => {
        result.current.next();
      });
    }).toThrow('Error');
  });

  test('save state after re-render', () => {
    const { result, rerender } = renderHook(() => useGenerator(foo()));

    act(() => {
      result.current.next();
    });

    expect(result.current.iteratorResult).toEqual({ value: 1, done: false });

    rerender();

    expect(result.current.iteratorResult).toEqual({ value: 1, done: false });
  });
});
