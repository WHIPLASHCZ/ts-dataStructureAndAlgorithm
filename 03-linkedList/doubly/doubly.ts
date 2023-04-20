import { CNode } from "../basicStructure/linkedList";
import LinkedList from "../basicStructure/linkedList";
export class DoublyNodeItem<T> extends CNode<T> implements DoublyNode<T> {
  public data!: T;
  public next!: DoublyNode<T> | null;
  public prev: DoublyNode<T> | null;
  constructor(
    data: T,
    prev: DoublyNode<T> | null = null,
    next: DoublyNode<T> | null = null
  ) {
    super(data, next);
    this.prev = prev;
  }
}

class DoublyLinkedList<T> extends LinkedList<T> {
  protected head: DoublyNode<T> | null;
  protected tail: DoublyNode<T> | null;
  constructor(val?: T) {
    super();
    this.head = val ? new DoublyNodeItem<T>(val) : null;
    this.tail = this.head;
  }
  pop(): CNode<T> | null | undefined {
    if (!this.head) return null;
    const ret = this.tail;
    this.tail!.prev!.next = null;
    this.tail = ret?.prev || null;
    this.listSize--;
    return ret;
  }
  append(value: T): void {
    const newNode = new DoublyNodeItem(value);
    if (!this.tail) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.listSize++;
  }
  shift(): CNode<T> | null {
    if (!this.head) return null;
    const oldHead = this.head;
    this.head = this.head.next;
    if (this.head) this.head.prev = null;
    oldHead.next = null;
    this.listSize--;
    return oldHead;
  }
  unShift(value: T): void {
    const newNode = new DoublyNodeItem(value);
    if (!this.head) this.head = this.tail = newNode;
    else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.listSize++;
  }
  insert(index: number, value: T): void {
    if (index < 0 || index > this.listSize) throw new Error("非法索引");
    if (index == 0) return this.unShift(value);
    else if (index == this.listSize) return this.append(value);
    const newNode = new DoublyNodeItem(value),
      preNode = this.get(index - 1) as DoublyNode<T>;
    const oldNext = preNode?.next;

    preNode!.next = newNode;
    newNode.prev = preNode;

    newNode.next = oldNext || null;
    if (oldNext) oldNext.prev = newNode;
    this.listSize++;
  }
  deleteByIndex(index: number): CNode<T> | null | undefined {
    if (index < 0 || index >= this.listSize) throw new Error("非法索引");
    if (index == 0) return this.shift() || null;
    else if (index == this.listSize - 1) return this.pop();
    const preNode = this.get(index - 1) as DoublyNode<T>;
    const dltNode: DoublyNode<T> | null = preNode.next;
    preNode.next = dltNode!.next;
    if (dltNode?.next) dltNode.next.prev = preNode;
    // dltNode!.prev = null;
    // dltNode!.next = null;
    this.listSize--;
    return dltNode;
  }
  deleteByData(data: T): CNode<T> | null | undefined {
    if (this.head && this.head.data == data) return this.shift();
    else if (this.tail && this.tail.data == data) return this.pop();
    let trave = this.head;
    while (trave && trave.data != data) trave = trave?.next;
    if (trave) {
      const preNode = trave.prev!;
      preNode.next = trave.next;
      if (trave.next) trave.next.prev = preNode;
      // trave.prev = null;
      this.listSize--;
    }
    return trave;
  }

  postTrave(cb: (node: DoublyNode<T>, idx: number) => any) {
    let trave = this.tail,
      idx = this.listSize - 1;
    while (trave) {
      cb(trave, idx--);
      trave = trave.prev;
    }
  }
}

export default DoublyLinkedList;
