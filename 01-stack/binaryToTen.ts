import Stack from "./basicStructure/index";

function binaryToDec(number: number): string {
  const s = new Stack<number>();
  let ret = "";
  // num 整除 2 从尾到头取余数 就是num的二进制数字 。
  while (number) {
    s.push(number % 2);
    number = Math.floor(number / 2);
  }
  while (!s.isEmpty()) ret += s.pop();
  return ret;
}
// 0 1 10 11 100
console.log(binaryToDec(100));
