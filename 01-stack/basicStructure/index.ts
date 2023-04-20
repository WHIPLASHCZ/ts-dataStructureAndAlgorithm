class Stack<T> implements IStack<T> {
  private stack: Array<T>;
  constructor() {
    this.stack = new Array<T>();
  }
  push(info: T) {
    this.stack.push(info);
  }
  pop() {
    return this.stack.pop();
  }
  peek() {
    return this.stack[this.stack.length - 1];
  }
  clear(): void {
    this.stack = [];
  }
  isEmpty() {
    return !!!this.size;
  }
  get size() {
    return this.stack.length;
  }
}
const s = new Stack<number>();
s.push(1);
console.log(s);

export default Stack;
