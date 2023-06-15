import { bubbleSort } from "./bubbleSort";
import { heapSort } from "./heapSort";
import { insertionSort } from "./insertionSort";
import { mergeSort } from "./mergeSort";
import { quickSort } from "./quickSort";
import { shellSort } from "./shellSort";
import { selectionSort } from "./selectionSort";
import { compareSort } from "hy-algokit";
compareSort(
  [
    bubbleSort,

    insertionSort,
    selectionSort,

    shellSort,
    mergeSort,
    heapSort,
    quickSort,
  ],
  100000
);
