export function generatorExecutor<Value, Return>(generatedFn: Generator<Value, Return, unknown>) {
  let genValue: IteratorResult<Value, Return> | null = null;

  while (!genValue?.done) {
    genValue = generatedFn.next();
  }

  return genValue;
}
