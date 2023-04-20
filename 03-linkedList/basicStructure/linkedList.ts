export class CNode<T> implements NodeItem<T> {
  public data: T;
  public next: CNode<T> | null;
  constructor(data: T, next: CNode<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList<T> implements linkedList<T> {
  protected head: CNode<T> | null;
  protected listSize: number = 0;
  protected tail: CNode<T> | null;
  constructor(val?: T) {
    this.head = val ? new CNode<T>(val) : null;
    this.tail = this.head;
  }

  get listHead() {
    return this.head;
  }
  get size() {
    return this.listSize;
  }
  //   按索引获取
  protected get(index: number) {
    if (index >= this.size) throw new Error("索引超过链表长度");
    let trave = this.head,
      i = 0;
    while (i < index) {
      trave = trave!.next;
      i++;
    }
    return trave!;
  }
  peek() {
    return this.head ? this.head.data : undefined;
  }
  isEmpty() {
    return !!this.head;
  }
  //   尾插
  append(value: T) {
    const newNode = new CNode<T>(value);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.listSize++;
  }
  //   尾删
  pop() {
    if (!this.head) return;
    const dummy = new CNode<T>(0 as any, this.head);
    let trave: CNode<T> | null = dummy;
    while (trave && trave.next != this.tail) trave = trave.next;
    const ret = this.tail;
    if (this.listSize == 1) this.head = this.tail = null;
    else {
      if (trave) trave.next = null;
      this.tail = trave;
    }
    this.listSize--;
    return ret;
  }
  //   头删
  shift() {
    const ret = this.head;
    if (!this.head) return ret;
    if (this.head == this.tail) this.tail = null;
    this.head = this.head.next;
    this.listSize--;
    return ret;
  }
  //   头插
  unShift(value: T) {
    const newNode = new CNode(value);
    if (!this.head) this.head = this.tail = newNode;
    else {
      let oldHead = this.head;
      this.head = newNode;
      this.head.next = oldHead;
    }
    this.listSize++;
  }
  //   按索引插入 插入后 第index个节点变为插入的节点
  insert(index: number, value: T) {
    if (index < 0 || index > this.listSize) throw new Error("非法索引");
    if (index == 0) return this.unShift(value);
    else if (index == this.listSize) return this.append(value);
    let preNode = this.get(index - 1);
    let newNode = new CNode(value);
    let oldNext = preNode?.next;
    preNode!.next = newNode;
    newNode.next = oldNext || null;
    this.listSize++;
  }
  //   按索引删除
  deleteByIndex(index: number) {
    if (index < 0 || index >= this.listSize) throw new Error("非法索引");
    if (index == 0) return this.shift() || null;
    else if (index == this.listSize - 1) return this.pop();
    let preNode = this.get(index - 1);
    const ret = preNode.next;
    preNode.next = preNode.next?.next || null;
    this.listSize--;
    return ret;
  }

  getData(index: number) {
    return this.get(index).data;
  }
  //   按索引修改
  update(index: number, data: T) {
    let node = this.get(index);
    node.data = data;
  }
  // 按值删除
  deleteByData(data: T) {
    let trave = this.head,
      preNode = this.head;
    if (this.head && this.head.data == data) return this.shift();
    else if (this.tail && this.tail.data == data) return this.pop();
    while (trave && trave.data != data) {
      preNode = trave;
      trave = trave.next;
    }
    if (preNode && trave) {
      preNode.next = trave.next?.next || null;
      this.listSize--;
    }
  }
  indexOf(data: T) {
    let trave = this.head,
      idx = 0;
    while (idx < this.listSize && trave && trave.data != data)
      idx++, (trave = trave.next);
    return idx;
  }
  trave(cb: (node: CNode<T>, idx: number) => any) {
    let trave = this.head,
      i = 0;
    while (trave) {
      cb(trave, i++);
      trave = trave.next;
    }
  }
}
export default LinkedList;
