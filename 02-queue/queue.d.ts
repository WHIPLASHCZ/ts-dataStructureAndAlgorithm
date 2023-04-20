declare interface queue_interface<T> extends IList<T> {
  inQueue: (info: T) => void;
  outQueue: () => T | undefined;
}
