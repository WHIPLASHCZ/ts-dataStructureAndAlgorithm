class Graph<T> {
  private vertices: T[] = [];
  private adjList: Map<T, T[]> = new Map();
  // 添加顶点
  addVertex(vertex: T): void {
    this.vertices.push(vertex);
    this.adjList.set(vertex, []);
  }
  addEdge(vertex1: T, vertex2: T): void {
    this.adjList.get(vertex1)!.push(vertex2);
    this.adjList.get(vertex2)!.push(vertex1);
  }
  trave() {
    this.adjList.forEach((adjs, vertex) => {
      console.log(`${vertex} -> ${adjs.join(" ")}`);
    });
  }
  // 广度优先
  BFS(callback: (vertex: T) => void) {
    if (!this.vertices.length) return;
    const queue: T[] = [this.vertices[0]],
      visitedMap = new Map();
    while (queue.length) {
      const currentVertex = queue.shift();
      if (visitedMap.has(currentVertex)) continue;
      callback(currentVertex!);
      visitedMap.set(currentVertex, true); //记录当前顶点已被访问过；
      const adjListOfCurrentVertex = this.adjList.get(currentVertex!);
      if (adjListOfCurrentVertex && adjListOfCurrentVertex.length) {
        // 将与当前顶点有联系的其它顶点都入队；
        for (let vertex of adjListOfCurrentVertex) queue.push(vertex);
      }
    }
  }
  // 深度优先
  DFS(callback: (vertex: T) => void) {
    if (!this.vertices.length) return;
    const stack: T[] = [this.vertices[0]],
      stackMap = new Map();
    stackMap.set(stack[0], true);
    /**
     * 深度优先-栈
     * 每次弹出栈顶元素-操作，然后将该栈顶元素的邻接顶点入栈；
     * 然后再取栈顶元素...以此类推；
     * 这相当于，执行i次时，我取的是第i层的第一个顶点/最后一个顶点，而不是像广度优先那样，每层都依次拿出每个顶点；
     * 所以是深度优先的；
     * 当 当前顶点再没有邻接顶点时，当前顶点已经出栈了，则下次循环就是下一个栈顶元素，这就相当于是回溯。
     */

    /**
     * 队列是从最前面取，只能依次一个个的取；
     * 栈是从最后面取，因为每个顶点的所有邻居要先入栈，然后栈取最后一个顶点，取完一个后，这个顶点的所有邻居又要都入栈；
     * 所以用栈的话，每次取顶点是在每个顶点的所有邻居中取一个。
     */
    while (stack.length) {
      const currentVertex = stack.pop()!; //取出栈顶元素
      callback(currentVertex); //操作
      const neighbors = this.adjList.get(currentVertex);
      if (!neighbors || !neighbors.length) continue;
      // 因为栈是先进后出，所以倒序的 将当前顶点的邻接顶点放入栈。最后一个放入的最先出栈。
      for (let i = neighbors.length - 1; i >= 0; i--) {
        if (stackMap.has(neighbors[i])) continue;
        stack.push(neighbors[i]);
        stackMap.set(neighbors[i], true);
      }
    }
  }
}

const graph = new Graph<string>();
const charCodeOfA = "A".charCodeAt(0);
for (let i = 0; i < 26; i++) {
  graph.addVertex(String.fromCharCode(charCodeOfA + i));
}
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");
// graph.trave();
// console.log("\n");

// graph.BFS((ver) => {
//   console.log(ver);
// });

graph.DFS(console.log);
