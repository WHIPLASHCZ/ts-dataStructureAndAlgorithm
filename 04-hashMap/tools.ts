function findClosestPrime(number: number, toUp: boolean = true) {
  const calc = toUp
    ? (n: number) => ((n += 1) % 2 == 0 ? n + 1 : n)
    : (n: number) => ((n -= 1) % 2 == 0 ? n - 1 : n);
  while (!isPrime(number)) number = calc(number);
  return number;
}

/**
 * 36的因数：
 * 1*36
 * 2*18
 * 3*12
 * 4*9
 * 6*6      //到这里就可以结束判断了，后面的话其实就是两个因数顺序反过来。n的两个因数必然一个大于等于根号n，一个小于等于根号n
 * 9*4
 * 12*3
 * 18*2
 * 36*1
 */
function isPrime(number: number) {
  // 除了1和自身外 不能被任何数整除的，则是质数
  if (number != 2 && number % 2 == 0) return false;
  //   一个数若可以进行因数分解，那么分解时得到的两个数一定是一个小于等于sqrt(n)，一个大于等于sqrt(n)，
  //   据此，上述代码中并不需要遍历到n-1，遍历到sqrt(n)即可，因为若sqrt(n)左侧找不到约数，那么右侧也一定找不到约数。
  let endNum = Math.floor(Math.sqrt(number));
  for (let i = 3; i <= endNum; i++) if (number % i == 0) return false;
  return true;
}

export { findClosestPrime };
