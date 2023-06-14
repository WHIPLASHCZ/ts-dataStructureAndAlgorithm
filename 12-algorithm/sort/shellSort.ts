import { swap, sortTest, makeCmpFn } from "./utils";
import { measureSort } from "hy-algokit";
function shellSort(arr: number[], ascending = true) {
  let gap = Math.floor(arr.length / 2); //间隔 逐渐缩小到1
  const cmp = makeCmpFn(ascending);
  while (gap >= 1) {
    // 每个gap个间隔的元素组成的序列  进行插入排序
    for (let i = gap; i < arr.length; i++) {
      const newCard = arr[i];
      let j = i - gap;
      while (j >= 0 && cmp(newCard, arr[j])) {
        arr[j + gap] = arr[j];
        j -= gap;
      }
      arr[j + gap] = newCard;
    }

    // 缩短间隔
    gap = Math.floor(gap / 2);
  }
  return arr;
}
sortTest(shellSort, false);
measureSort(shellSort, 1000000);
