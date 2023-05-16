import Heap from "../../07-heap/basicStructure/heap";
class PriorityNode<T> {
  constructor(public priority: number, public value: T) {
    this.priority = priority;
    this.value = value;
  }
  valueOf() {
    return this.priority;
  }
}

class PriorityQueue<T> {
  private heap: Heap<PriorityNode<T>> = new Heap();
  get length(): number {
    return this.heap.length;
  }
  get isEmpty() {
    return !this.heap.length;
  }
  enQueue(value: T, priority: number): void {
    this.heap.insert(new PriorityNode(priority, value));
  }
  deQueue() {
    const oldHead = this.heap.extract();
    return oldHead ? oldHead.value : oldHead;
  }
  traveAsTree() {
    this.heap.traveAsTree();
  }
}

export default PriorityQueue;
