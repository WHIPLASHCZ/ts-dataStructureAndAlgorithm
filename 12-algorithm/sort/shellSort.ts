import { swap, sortTest, makeCmpFn } from "./utils";
import { measureSort } from "hy-algokit";
export function shellSort(arr: number[], ascending = true) {
  let gap = Math.floor(arr.length / 2); //间隔 逐渐缩小到1
  const cmp = makeCmpFn(ascending);

  // 外层循环：不断的缩小间隔长度
  while (gap >= 1) {
    // 内层循环：每个gap个间隔的元素组成的序列  进行插入排序
    for (let i = gap; i < arr.length; i++) {
      const newCard = arr[i];
      let j = i - gap; //从当前间隔为gap的序列中 arr[i]左侧的第一个值开始；
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

function shellSort2(arr: number[], ascending = true) {
  let gap = Math.floor(arr.length / 2); //间隔 逐渐缩小到1
  const cmp = makeCmpFn(ascending);
  while (gap >= 1) {
    // 每个gap个间隔的元素组成的序列  进行插入排序
    for (let i = gap; i < arr.length; i++) {
      const newCard = arr[i];
      let j = i; //从当前间隔为gap的序列中 arr[i]左侧的第一个值开始；
      // 因为i从gap开始，外层每次循环 j依次等于gap，gap+1，gap+2，gap+3...gap+n；
      // 内层循环，j每次减去gap，j最小会等于0，1，2，3...n；也就是每次外层循环时的当前间隔为gap的序列的开头；
      while (j >= gap && cmp(newCard, arr[j - gap])) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = newCard;
    }

    // 缩短间隔
    gap = Math.floor(gap / 2);
  }
  return arr;
}
sortTest(shellSort, false);
// sortTest(shellSort2, false);
// measureSort(shellSort, 1000000);
