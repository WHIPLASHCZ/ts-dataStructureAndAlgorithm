import { swap, sortTest, makeCmpFn } from "./utils";
import { measureSort } from "hy-algokit";
// function bubbleSort(arr: number[], ascending = true) {
//   const cmp: (n1: number, n2: number) => boolean = ascending
//     ? (n1, n2) => n1 > n2
//     : (n1, n2) => n1 < n2;
//   for (let i = 0; i < arr.length - 1; i++) {
//     for (let j = i + 1; j < arr.length; j++)
//       if (cmp(arr[i], arr[j])) swap(arr, i, j);
//     console.log(i, arr);
//   }
//   return arr;
// }

function bubbleSort(arr: number[], ascending = true) {
  const cmp = makeCmpFn(ascending);
  for (let i = 0; i < arr.length; i++) {
    let isSwaped = false;
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (!cmp(arr[j], arr[j + 1])) {
        swap(arr, j, j + 1);
        isSwaped = true;
      }
    }
    // 若这一轮循环没有进行过一次换位操作，则说明数组已经有序了。
    if (!isSwaped) break;
  }

  return arr;
}

sortTest(bubbleSort);

export {};
