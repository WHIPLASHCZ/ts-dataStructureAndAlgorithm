// 递归算法存在大量重复计算；
function fib1(n: number): number {
  if (n == 0) return 0;
  if (n <= 2) return 1;
  return fib1(n - 1) + fib1(n - 2);
}

// 递归算法存在大量重复计算；
function fib2(n: number): number {
  let memo = [0, 1, 1];

  function fib(num: number): number {
    if (num <= 2) return memo[num];
    let res1 = memo[num - 1],
      res2 = memo[num - 2];
    if (res1 == undefined) res1 = memo[num - 1] = fib(num - 1);
    if (res2 == undefined) res2 = memo[num - 2] = fib(num - 2);
    if (memo[num] == undefined) memo[num] = res1 + res2;
    return memo[num];
  }
  return fib(n);
}

// 动态规划
function fib3(n: number) {
  let dp = [0, 1];
  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp[n];
}


// 动态规划-状态压缩
// 只需要维护F(n)、F(n-1)、F(n-2)即可
function fib4(n: number) {
  if (n <= 1) return n;
  let first = 1,
    second = 1,
    third = 1;
  while (n > 2) {
    third = first + second;
    first = second;
    second = third;
    n--;
  }
  return third;
}

// 动态规划-状态压缩
// 只需要维护F(n)、F(n-1)、F(n-2)即可
function fib5(n: number) {
  if (n <= 1) return n;
  let first = 0,
    second = 1,tempFirst = 0;

  for(let i=2;i<=n;i++) {
    tempFirst = first;
    first = second;

    // 当i==n时，second为 fib(n-1)+fib(n-2)之和。
    second = second+tempFirst;
  }
  return second;
}
console.log(fib5(10));
