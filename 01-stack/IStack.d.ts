interface IStack<T> extends IList<T> {
  push: (info: T) => void;
  pop: () => T | undefined;
}
