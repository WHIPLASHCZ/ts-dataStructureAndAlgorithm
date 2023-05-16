import PriorityQueue from "./basicStructure";
const pq = new PriorityQueue<string>();
pq.enQueue("了解过", 1);
pq.enQueue("林俊杰", 2);
pq.enQueue("周星驰", 3);
pq.enQueue("周星驰1", 6);
pq.enQueue("周星驰2", 4);
pq.traveAsTree();
