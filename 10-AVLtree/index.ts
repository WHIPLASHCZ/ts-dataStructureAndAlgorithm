import AVLTree from "./basicStructure";
import AVLNode from "./basicStructure/AVLNode";
import { btPrint } from "hy-algokit";
const avl = new AVLTree();
// avl.insert(5);
// avl.insert(6);
// avl.insert(3);
// avl.insert(2);
// avl.insert(4);
// avl.insert(3.9);
// avl.insert(4.1);
// btPrint(avl._root);
let dltNums = [];
for (let i = 0; i < 15; i++) {
  // const a = Math.ceil(Math.random() * 100);
  // if (i % 2 == 0) dltNums.push(a);
  avl.insert(i + 1);
}
btPrint(avl._root);
console.log("\n");
// for (let dltnum of dltNums) {
//   avl.remove(dltnum);
// }
// avl.remove(21);
// avl.remove(23);
// avl.remove(22);
// avl.remove(25);
// avl.remove(24);
// avl.remove(19);
avl.remove(2);
btPrint(avl._root);
avl.remove(3);
btPrint(avl._root);
avl.remove(4);
btPrint(avl._root);
const a1 = avl.search(1) as AVLNode<number>;
console.log(`is node ${a1?.value} balance:`, a1.isBalance);
console.log("\n");
// avl.reBalance();
// console.log("\n\n");
// btPrint(avl._root);
