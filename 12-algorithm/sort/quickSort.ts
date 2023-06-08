import { swap, sortTest, makeCmpFn } from "./utils";
import { measureSort } from "hy-algokit";

function quickSort(
  arr: number[],
  ascending = true,
  pivotIdx = arr.length - 1,
  left = 0,
  right = arr.length - 2
) {
  if (pivotIdx - left + 1 < 2) return arr;
  /**
   * 快排：
   * 左侧找比pivot大的，右侧找比pivot小的 然后交换位置；
   * 然后递归继续上述操作
   */
  //   const cmp = makeCmpFn(ascending);
  const originLeft = left;
  while (left <= right) {
    if (arr[left] > arr[pivotIdx] && arr[right] <= arr[pivotIdx]) {
      swap(arr, left, right);
      left++, right--;
    } else {
      if (arr[left] <= arr[pivotIdx]) left++;
      if (arr[right] > arr[pivotIdx]) right--;
    }
  }
  let pivotIdxAfterSwap = pivotIdx;
  if (arr[left] > arr[pivotIdx])
    swap(arr, pivotIdx, left), (pivotIdxAfterSwap = left);
  else if (arr[right] > arr[pivotIdx])
    swap(arr, pivotIdx, right), (pivotIdxAfterSwap = right);
  const beforePivotNum = pivotIdxAfterSwap - originLeft;
  const afterPivotNum = pivotIdx - pivotIdxAfterSwap;
  quickSort(
    arr,
    ascending,
    pivotIdxAfterSwap - 1,
    pivotIdxAfterSwap - beforePivotNum,
    pivotIdxAfterSwap - 2
  );
  quickSort(
    arr,
    ascending,
    pivotIdxAfterSwap + afterPivotNum,
    pivotIdxAfterSwap + 1,
    pivotIdxAfterSwap + afterPivotNum - 1
  );
  return arr;
}
// const arr = [20, 2, 9, 7, 12, 15, 1, 6, 8];
// quickSort(arr);
// console.log(`arr:`, arr);

for (let i = 0; i <= 10; i++) {
  const res = sortTest(quickSort, true, 100);
  if (!res) throw new Error("排序有误");
}
measureSort(quickSort, 100000);
