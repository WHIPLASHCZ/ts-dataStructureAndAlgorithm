import Queue from "../../02-queue/basicStructure/queue01";
class Deque<T> extends Queue<T> {
  addFront(info: T) {
    this.data.unshift(info);
  }
  removeBack() {
    return this.data.pop();
  }
}
