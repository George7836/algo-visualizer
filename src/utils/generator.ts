interface GeneratorHistoryManager<Value, Return> {
  add: (element: IteratorResult<Value, Return>) => void;
  getCurrent: () => IteratorResult<Value, Return>;
  getNext: () => IteratorResult<Value, Return> | undefined;
  getPrevious: () => IteratorResult<Value, Return> | undefined;
  isFinished: () => boolean;
  readonly length: number;
}

class HistoryManager<Value, Return> implements GeneratorHistoryManager<Value, Return> {
  private history: IteratorResult<Value, Return>[] = [];
  private index = 0;

  add(element: IteratorResult<Value, Return>) {
    this.history.push(element);
    this.index = this.length - 1;
  }

  getCurrent() {
    return this.history[this.index];
  }

  getNext() {
    const element = this.history[this.index + 1];

    if (!element) return undefined;

    this.index += 1;

    return element;
  }

  getPrevious() {
    const element = this.history[this.index - 1];

    if (!element) return undefined;

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
  ) {}

  next(...args: [] | [Next]) {
    const nextHistoryValue = this.historyManager.getNext();

    if (nextHistoryValue) return nextHistoryValue;

    if (this.historyManager.isFinished()) return this.historyManager.getCurrent();

    const nextValue = this.generator.next(...args);
    this.historyManager.add(nextValue);

    return nextValue;
  }

  back() {
    const previousValue = this.historyManager.getPrevious();
    if (previousValue) return previousValue;

    return this.historyManager.getCurrent();
  }

  return(value: Return) {
    return this.generator.return(value);
  }

  throw(e: any) {
    return this.generator.throw(e);
  }
}
