function swap(arr: number[], i: number, j: number): void {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function bubbleSort(arr: number[], ascending = true) {
  const cmp: (n1: number, n2: number) => boolean = ascending
    ? (n1, n2) => n1 > n2
    : (n1, n2) => n1 < n2;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++)
      if (cmp(arr[i], arr[j])) swap(arr, i, j);
    console.log(i, arr);
  }

  return arr;
}

const arr = [];
for (let i = 0; i < 10; i++) arr[i] = Math.round(Math.random() * 200);
console.log(`arr:`, arr);
console.log("\n");
console.log(`sort-arr:`, bubbleSort(arr));

export {};
