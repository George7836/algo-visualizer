import { useCallback, useRef, useState } from 'react';
import { EnhancedGenerator } from '../utils/generator';

export function useGenerator<Value, Return>(generatorFn: Generator<Value, Return, unknown>) {
  const [iteratorResult, setIteratorResult] = useState<IteratorResult<Value, Return> | null>(null);
  const enhancedGenerator = useRef(new EnhancedGenerator(generatorFn));

  const next = useCallback(() => {
    const result = enhancedGenerator.current.next();
    setIteratorResult(result);

    return result;
  }, []);

  const back = useCallback(() => {
    const result = enhancedGenerator.current.back();
    setIteratorResult(result);

    return result;
  }, []);

  return { iteratorResult, next, back };
}
