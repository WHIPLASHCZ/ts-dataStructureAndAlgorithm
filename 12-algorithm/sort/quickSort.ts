import { swap, sortTest, makeCmpFn } from "./utils";
import { measureSort } from "hy-algokit";

export function quickSort(
  arr: number[],
  ascending = true,
  pivotIdx = arr.length - 1,
  left = 0,
  right = arr.length - 2
) {
  if (pivotIdx - left < 1) return arr;
  /**
   * 快排：
   * pivot为当前序列最后一个数字；
   * 在pivot前面的序列中，用双指针 左侧找比pivot大的，右侧找比pivot小的 然后交换位置；
   * 最后再把pivot交换到中间，以至于pivot左侧都小于等于pivot，其右侧都大于pivot；
   * 然后递归继续上述操作
   */
  const cmpCanEqual = makeCmpFn(ascending, true);
  const cmpCanNotEqual = makeCmpFn(ascending, false);
  // const originLeft = left;
  let leftTraver = left,
    rightTraver = right;
  while (leftTraver <= rightTraver) {
    // arr[left] > arr[pivotIdx] && arr[right] <= arr[pivotIdx]
    if (
      cmpCanNotEqual(arr[pivotIdx], arr[leftTraver]) &&
      cmpCanEqual(arr[rightTraver], arr[pivotIdx])
    ) {
      swap(arr, leftTraver, rightTraver);
      leftTraver++, rightTraver--;
    } else {
      // 若不符合交换规则，则继续找；
      if (cmpCanEqual(arr[leftTraver], arr[pivotIdx])) leftTraver++;
      if (cmpCanNotEqual(arr[pivotIdx], arr[rightTraver])) rightTraver--;
    }
  }

  // pivot前面的所有元素交换完毕后，pivot和left进行换位
  /**
   * 双指针走完后，arr[leftTraver]要么大于arr[pivotIdx]，要么leftTraver==pivotIdx;
   * 在最后一次遍历时：
   * 情况1：leftTraver找到了大于arr[pivotIdx]的元素，但rightTraver没找到小于arr[pivotIdx]的元素：
   *        则，leftTraver停在原地不动；所以遍历完毕后，leftTraver大于arr[pivotIdx]。
   *
   * 情况2：leftTraver找到了大于arr[pivotIdx]的元素，rightTraver也找到比arr[pivotIdx]小的元素：
   *        则它俩交换元素，然后leftTraver后走一步，rightTraver前走一步；
   *        此时leftTraver位置又是交换前那个大于arr[pivotIdx]的那个数字。
   */
  swap(arr, pivotIdx, leftTraver);
  // 递归pivot的前面的序列
  quickSort(arr, ascending, leftTraver - 1, left, leftTraver - 2);

  // 递归pivot的后面的序列
  quickSort(arr, ascending, pivotIdx, leftTraver + 1, right);
  return arr;
}

// sortTest(quickSort, true, 10);
measureSort(quickSort, 1000000);
