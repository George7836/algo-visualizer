import { useCallback, useRef, useState } from 'react';
import { EnhancedGenerator } from '../utils/generator';

export function useGenerator<Value, Return>(generatorFn: Generator<Value, Return, unknown>) {
  const [value, setValue] = useState<IteratorResult<Value, Return> | null>(null);
  const enhancedGenerator = useRef(new EnhancedGenerator(generatorFn));

  const next = useCallback(() => {
    const val = enhancedGenerator.current.next();
    setValue(val);
  }, []);

  const back = useCallback(() => {
    const val = enhancedGenerator.current.back();
    setValue(val);
  }, []);

  return { value, next, back };
}
