declare interface linkedList<T> extends IList<T> {}
declare interface NodeItem<T> {
  data: T;
  next: NodeItem<T> | null = null;
}

declare interface DoublyNode<T> extends NodeItem<T> {
  next: DoublyNode<T> | null = null;
  prev: DoublyNode<T> | null = null;
}
