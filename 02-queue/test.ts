import Queue from "./basicStructure/queue01";
const q = new Queue<string>();

q.inQueue("a");
q.inQueue("b");
q.inQueue("c");
console.log(q.outQueue());
console.log(q.outQueue());
console.log(q.outQueue());
