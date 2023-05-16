// 基于数组实现
class Queue<T> implements queue_interface<T> {
  protected data: T[] = [];
  inQueue(info: T) {
    this.data.push(info);
  }
  outQueue() {
    return this.data.shift();
  }
  peek() {
    return this.data[0];
  }
  get size() {
    return this.data.length;
  }
  isEmpty() {
    return !this.data.length;
  }
}
export default Queue;
