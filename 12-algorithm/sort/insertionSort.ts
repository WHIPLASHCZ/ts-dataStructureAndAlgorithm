import { swap, sortTest, makeCmpFn } from "./utils";
import { measureSort } from "hy-algokit";
/**
 * 1、首先，假设数组的第一个元素已经排好序了，因为它只有一个元素，所以可以认为是有序的。
2、然后，从第二个元素开始，不断与前面的有序数组元素进行比较。
3、如果当前元素小于前面的有序数组元素，则把当前元素插入到前面的合适位置。
4、否则，继续与前面的有序数组元素进行比较。
5、以此类推，直到整个数组都有序。
6、循环步骤2~5，直到最后一个元素。
 */
export function insertionSort(arr: number[], ascending = true) {
  const cmp = makeCmpFn(ascending);
  for (let i = 1; i < arr.length; i++) {
    // arr[i]到arr[len-1]为未排序部分；
    let isInserted = false;
    // arr[i-1]到arr[0]是已排序部分；
    // 用arr[i]去和已排序部分所有数字比较，找到那个比自己大/小的，就将arr[i]插到它后面的位置；
    for (let j = i - 1; j >= 0; j--) {
      if (cmp(arr[j], arr[i])) {
        isInserted = true;
        arr.splice(j + 1, 0, arr.splice(i, 1)[0]);
        break;
      }
    }
    if (!isInserted) {
      if (cmp(arr[i], arr[0])) arr.splice(0, 0, arr.splice(i, 1)[0]);
    }
  }
  return arr;
}

function insertionSort2(arr: number[], ascending = true) {
  const cmp = makeCmpFn(ascending);
  for (let i = 1; i < arr.length; i++) {
    const newCard = arr[i];
    let j = i - 1;
    while (cmp(newCard, arr[j]) && j >= 0) {
      arr[j + 1] = arr[j];
      j--;
    }
    // 如果没进入while循环
    // 那么j初始化等于i-1
    // j+1=i-1+1=i；
    // 所以若没进入while循环 相当于原地赋值，也没错。
    arr[j + 1] = newCard;
  }
  return arr;
}
sortTest(insertionSort2);
