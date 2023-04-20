import Heap from "./heap";
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
h.build_heap(arr2, false);
console.log(arr2);
h.traveAsTree(arr2);

function getLevelByNodeNum(len: number) {
  let levelNum = 0;
  while (len >= 1) {
    len /= 2;
    levelNum++;
  }
  return levelNum;
}

function getNodeNumByLevel(level: number) {
  return Math.pow(2, level) - 1;
}