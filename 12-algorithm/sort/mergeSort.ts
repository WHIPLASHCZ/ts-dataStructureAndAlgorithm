import { swap, sortTest, makeCmpFn } from "./utils";
import { measureSort } from "hy-algokit";
function mergeSort(arr: number[], ascending = true): number[] {
  //   步骤一:分解(Divide):
  /**
   * 1、如果待排序数组长度为1，认为这个数组已经有序，直接返回;
   * 2、将待排序数组分成两个长度相等的子数组
   */
  if (arr.length == 1) return arr;
  const middle = Math.floor(arr.length / 2);
  const arr1 = arr.slice(0, middle),
    arr2 = arr.slice(middle);
  const sortedArr1 = mergeSort(arr1, ascending);
  const sortedArr2 = mergeSort(arr2, ascending);
  //   步骤二:合并(Merge)∶合并过程中，需要比较每个子数组的元素并将它们有序地合并成一个新的数组:
  /**
    *   1、可以使用两个指针i和j分别指向两个子数组的开头，比较它们的元素大小，并将小的元素插入到新的有序数组中。
        2、如果其中一个子数组已经遍历完，就将另一个子数组的剩余部分直接插入到新的有序数组中。
        3、最后返回这个有序数组。   
 */

  //   步骤三:归并排序的递归终止条件:
  const ret = mergeArr(sortedArr1, sortedArr2, ascending);
  return ret;
}

// 将两个有序数组合并为一个有序数组；
function mergeArr(arr1: number[], arr2: number[], ascending = true) {
  const cmp = makeCmpFn(ascending),
    ret = [];
  let i = 0,
    j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] == arr2[j]) ret.push(arr1[i]), ret.push(arr2[j]), i++, j++;
    else if (cmp(arr1[i], arr2[j])) ret.push(arr1[i]), i++;
    else ret.push(arr2[j]), j++;
  }
  if (i < arr1.length) for (; i < arr1.length; i++) ret.push(arr1[i]);
  else if (j < arr2.length) for (; j < arr2.length; j++) ret.push(arr2[j]);
  return ret;
}
sortTest(mergeSort);
measureSort(mergeSort, 10000);
export {};
