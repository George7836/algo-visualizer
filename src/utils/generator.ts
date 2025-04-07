interface GeneratorHistoryManager<Value, Return> {
  add: (element: IteratorResult<Value, Return>) => void;
  getCurrent: () => IteratorResult<Value, Return> | null;
  getNext: () => IteratorResult<Value, Return> | null;
  getPrevious: () => IteratorResult<Value, Return> | null;
  isFinished: () => boolean;
  readonly length: number;
}

class HistoryManager<Value, Return> implements GeneratorHistoryManager<Value, Return> {
  private history: (IteratorResult<Value, Return> | null)[] = [];
  private index = 0;

  add(element: IteratorResult<Value, Return> | null) {
    this.history.push(element);
    this.index = this.length - 1;
  }

  getCurrent() {
    return this.history[this.index];
  }

  getNext() {
    const element = this.history[this.index + 1];

    if (!element) return null;

    this.index += 1;

    return element;
  }

  getPrevious() {
    const element = this.history[this.index - 1];

    if (!element && element !== null) return null;

    this.index -= 1;

    return element;
  }

  isFinished() {
    const lastElement = this.history[this.history.length - 1];
    return !!lastElement?.done;
  }

  get length() {
    return this.history.length;
  }
}

export class EnhancedGenerator<Value, Return, Next> {
  constructor(
    private generator: Generator<Value, Return, Next>,
    private historyManager: HistoryManager<Value, Return> = new HistoryManager(),
  ) {
    this.historyManager.add(null);
  }

  next(...args: [] | [Next]) {
    const nextHistoryValue = this.historyManager.getNext();

    if (nextHistoryValue) return nextHistoryValue;

    if (this.historyManager.isFinished()) return this.historyManager.getCurrent();

    const nextValue = this.generator.next(...args);
    this.historyManager.add(nextValue);

    return nextValue;
  }

  back() {
    return this.historyManager.getPrevious();
  }

  return(value: Return) {
    return this.generator.return(value);
  }

  throw(e: any) {
    return this.generator.throw(e);
  }
}
