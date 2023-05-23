import AVLTree from "./basicStructure";
import { btPrint } from "hy-algokit";
const avl = new AVLTree();
// avl.insert(5);
// avl.insert(6);
// avl.insert(3);
// avl.insert(2);
// avl.insert(4);
// avl.insert(3.9);
// avl.insert(4.1);
btPrint(avl._root);
for (let i = 0; i < 10; i++) {
  avl.insert(Math.ceil(Math.random() * 100));
}
btPrint(avl._root);
// avl.reBalance();
// console.log("\n\n");
// btPrint(avl._root);