import BinarySearchTree from "./basicStructure/BST";
import { btPrint, PrintableNode } from "hy-algokit";
const b = new BinarySearchTree<number>();
const mock = [11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25, 6];
for (let n of mock) {
  b.insert(n);
}

// b.preTrave((node) => {
//   console.log(`node:`, node.value);
// });

// btPrint(b._root);
// console.log('\n');
b.remove(9);
// btPrint(b._root);
// console.log('\n');
b.remove(7);
// btPrint(b._root);
// console.log('\n');
b.remove(11);
// b.insert(20);
// b.insert(30);
// b.insert(18);
// b.insert(15);
// b.insert(19);
// b.insert(36);
b.insert(5.5);
b.insert(2);
btPrint(b._root);
console.log('\n');
b.remove(5);
btPrint(b._root);
console.log('\n');