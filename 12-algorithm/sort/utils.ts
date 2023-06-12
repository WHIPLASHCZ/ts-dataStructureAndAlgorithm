type sortFn = (arr: number[], ascending?: boolean) => number[];
export function swap(arr: number[], i: number, j: number): void {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function isSorted(arr: number[], ascending: boolean) {
  if (!arr.length) throw new Error("数组为空");
  const cmp = makeCmpFn(ascending);
  for (let i = 0; i < arr.length - 1; i++)
    if (!cmp(arr[i], arr[i + 1]) && arr[i] != arr[i + 1]) return false;
  return true;
}

export const makeCmpFn = (ascending: boolean, canEqual = false) =>
  ascending
    ? canEqual
      ? (n1: number, n2: number) => n1 <= n2
      : (n1: number, n2: number) => n1 < n2
    : canEqual
    ? (n1: number, n2: number) => n1 >= n2
    : (n1: number, n2: number) => n1 > n2;

export function sortTest(
  sortFn: sortFn,
  ascending: boolean = true,
  len: number = 10
) {
  const testArr = Array.from({ length: len }, () =>
    Math.round(Math.random() * 200)
  );

  console.log(`原数组：`, testArr);
  const sorted = sortFn(testArr, ascending);
  const ret = isSorted(sorted, ascending);
  console.log(`\n`);
  console.log(`排序后数组：`, sorted);
  console.log(`排序后是否有序：`, ret);
  return ret;
}
