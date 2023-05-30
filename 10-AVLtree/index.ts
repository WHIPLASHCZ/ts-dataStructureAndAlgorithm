import AVLTree from "./basicStructure";
import AVLNode from "./basicStructure/AVLNode";
import { btPrint } from "hy-algokit";
const avl = new AVLTree<number>();
let dltNums = [];
for (let i = 0; i <32; i++) {
  // const a = Math.ceil(Math.random() * 100);
  // if (i % 2 == 0) dltNums.push(a);
  avl.insert(i + 1);
}

// btPrint(avl._root);
// console.log("\n");


avl.remove( 29 );
avl.remove( 27 );
avl.remove( 30 );
avl.remove( 32 );
avl.remove( 31 );
avl.remove( 25 );
avl.remove( 17 );
avl.remove( 19 );
avl.remove( 21 );
avl.remove( 23 );
avl.remove( 22 );
avl.remove( 28 );
// 
// avl.remove( 11 );
// avl.remove( 15 );
// avl.remove( 9 );

btPrint(avl._root);
console.log("\n");

avl.remove( 26 );
btPrint(avl._root);
console.log("\n");
