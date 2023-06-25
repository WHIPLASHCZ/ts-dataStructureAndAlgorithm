// 70. 爬楼梯
// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

/**
 * 
    爬到第n层楼梯，必须先爬到第n-1层或第n-2层楼梯，然后爬到第n层；
    所以，爬到第n层楼梯有多少种方法，取决于爬到第n-1层和第n-2层楼梯有多少种方法；
 */

// 动态规划
var climbStairs = function (n: number) {
  // dp[i]表示：当有i层台阶时，有dp[i]种不同方法爬到楼顶；
  const dp = [0, 1, 2];
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};

// 动态规划-状态压缩
var climbStairs2 = function (n: number) {
  if (n <= 2) return n;
  // dp[i]表示：当有i层台阶时，有dp[i]种不同方法爬到楼顶；
  // const dp = [ 0 , 1 , 2 ];
  let first = 1,
    second = 2;
  for (let i = 3; i <= n; i++) {
    let cur = first + second;
    first = second;
    second = cur;
  }
  return second;
};
