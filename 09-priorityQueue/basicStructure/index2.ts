import Heap from "../../07-heap/basicStructure/heap";
class PriorityQueue<T> {
  private heap: Heap<T> = new Heap();
  get length(): number {
    return this.heap.length;
  }
  get isEmpty() {
    return !this.heap.length;
  }
  enQueue(value: T): void {
    this.heap.insert(value);
  }
  deQueue() {
    return this.heap.extract();
  }
  traveAsTree() {
    this.heap.traveAsTree();
  }
}
// 该方法 若泛型T为复杂类型，则需要重写该复杂类型的valueOf 来表示该复杂类型的优先级
