import Heap from "../../07-heap/basicStructure/heap";
import { swap, sortTest, makeCmpFn } from "./utils";
import { measureSort } from "hy-algokit";

// function heapSort2(arr: number[], ascending = true) {
//   const heap = new Heap(!ascending, arr),
//     ret = new Array(arr.length).fill(0);
//   let i = 0;
//   while (!heap.isEmpty) ret[i++] = heap.extract();
//   return ret;
// }

function heapSort(arr: number[], ascending = true) {
  // 原地建堆
  let heapSize = arr.length - 1;
  const cmp = ascending
    ? (arr: number[], subject: number, object: number) =>
        arr[subject] > arr[object] ? subject : object
    : (arr: number[], subject: number, object: number) =>
        arr[subject] < arr[object] ? subject : object;
  buildHeap(arr, heapSize, cmp);

  while (heapSize >= 1) {
    swap(arr, 0, heapSize);
    percolateDown(arr, 0, --heapSize, cmp);
  }

  return arr;
}

function buildHeap(
  arr: number[],
  endIdx = arr.length - 1,
  idxCmp: (arr: number[], n1: number, n2: number) => number
) {
  let lastNotLeaveNodeIndex = Math.floor((endIdx - 1) / 2);
  while (lastNotLeaveNodeIndex >= 0) {
    percolateDown(arr, lastNotLeaveNodeIndex, endIdx, idxCmp);
    lastNotLeaveNodeIndex--;
  }
  return arr;
}

function percolateDown(
  arr: number[],
  newDataIdx: number = 0,
  endIdx = arr.length - 1,
  idxCmp: (arr: number[], n1: number, n2: number) => number
) {
  while (newDataIdx * 2 + 1 <= endIdx) {
    const leftSonIdx = newDataIdx * 2 + 1,
      rightSonIdx = newDataIdx * 2 + 2;
    let bestSonIdx = leftSonIdx;
    if (rightSonIdx <= endIdx)
      bestSonIdx = idxCmp(arr, rightSonIdx, leftSonIdx);
    if (idxCmp(arr, bestSonIdx, newDataIdx) == bestSonIdx) {
      swap(arr, bestSonIdx, newDataIdx);
      newDataIdx = bestSonIdx;
    } else break;
  }
}

// sortTest(heapSort, false, 21);
measureSort(heapSort, 1000000);
