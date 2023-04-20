import { CNode } from "../basicStructure/linkedList";
import LinkedList from "../basicStructure/linkedList";

class CircularLinkedList<T> extends LinkedList<T> {
  constructor(val?: T) {
    super(val);
  }
  get getTail() {
    return this.tail;
  }
  private isTail(node: CNode<T> | null): boolean {
    return node === this.tail;
  }
  private makeLoop() {
    if (this.tail) this.tail.next = this.head;
  }
  // 尾插
  append(value: T): void {
    super.append(value);
    this.makeLoop();
  }
  // 尾删
  pop() {
    const ret = super.pop();
    this.makeLoop();
    return ret;
  }
  //   头删
  shift(): CNode<T> | null {
    const ret = super.shift();
    this.makeLoop();
    return ret;
  }
  // 头插
  unShift(value: T): void {
    super.unShift(value);
    this.makeLoop();
  }
  insert(index: number, value: T): void {
    super.insert(index, value);
    this.makeLoop();
  }
  deleteByIndex(index: number): CNode<T> | null | undefined {
    const ret = super.deleteByIndex(index);
    this.makeLoop();
    return ret;
  }
  deleteByData(data: T): CNode<T> | null | undefined {
    const ret = super.deleteByData(data);
    this.makeLoop();
    return ret;
  }
  trave(cb: (node: CNode<T>, idx: number) => any): void {
    if (!this.head) return;
    let trave = this.head,
      idx = 0;
    while (!this.isTail(trave)) {
      cb(trave, idx++);
      trave = trave.next!;
    }
    cb(trave, idx);
  }
}

export default CircularLinkedList;
