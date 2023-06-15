import { swap, sortTest, makeCmpFn } from "./utils";
// 选择排序：相对于冒泡排序，减少了交换的次数。
export function selectionSort(arr: number[], ascending = true) {
  const cmp = makeCmpFn(ascending);
  for (let i = 0; i < arr.length - 1; i++) {
    let maxOrMinIdx = i;
    for (let j = i + 1; j < arr.length; j++)
      if (cmp(arr[j], arr[maxOrMinIdx])) maxOrMinIdx = j;
    if (maxOrMinIdx != i) swap(arr, i, maxOrMinIdx);
  }
  return arr;
}
sortTest(selectionSort, false);
