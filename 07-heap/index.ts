import Heap from "./basicStructure/heap";
const h = new Heap<number>(false);
// const arr = [19, 100, 36, 17, 3, 25, 1, 2, 7];
// arr.forEach((item) => h.insert(item));
// console.log(h);
// h.insert(133);
// h.traveAsTree();
// console.log("------------------");

// h.extract();
// h.extract();
// h.extract();
// h.extract();
// h.extract();
// h.extract();
// h.extract();
// h.extract();
// console.log(h);
// h.traveAsTree();

const arr2 = [33, 22, 675, 12, 78, 34, 76];
const arr3 = [9, 11, 20, 56, 23, 45];
// console.log(arr3);
h.traveAsTree(arr2);
h.build_heap(arr2, false);

h.traveAsTree(arr2);
// console.log(
//   getLevelByNodeNum(arr3.length),
//   Math.floor((arr3.length - 1 - 1) / 2)
// );

function getLevelByNodeNum(len: number) {
  let levelNum = 0;
  while (len) {
    len = Math.floor(len / 2);
    levelNum++;
  }
  return levelNum;
}

function getNodeNumByLevel(level: number) {
  return Math.pow(2, level) - 1;
}
