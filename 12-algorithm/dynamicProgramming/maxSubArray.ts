// 思路：
// 1、确定状态
// 确定状态数组dp， dp[i]表示 以索引i为结尾元素的有最大和的子数组的和；这样方便做状态转移，更容易从上一个状态推导出当前状态。
// 并且因为子数组是连续的，所以当前状态必须和上一个状态进行运算。
// 2、确定状态转移方程
// dp[i] =  Math.max( nums[i] , nums[i] + dp[i-1] );
// 表示的是，当前这个nums[i]首先单独作为一个子数组，它如果加上上一个以i-1为结尾索引的最大子数组的和后结果更大，那么就加上，则相当于上一个子数组中多了一个元素nums[i]；
// 如果它加上上一个以i-1为结尾索引的最大子数组的和反而变小的话，那么就nums[i]独自作为一个子数组的最大和。

// 动态规划
function maxSubArray1(nums: number[]) {
  // dp[i]：以索引i为结尾元素的有最大和的子数组的和；
  let dp = [nums[0]],
    max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], nums[i] + dp[i - 1]);
    max = Math.max(max, dp[i]);
  }

  return max;
}

// 状态压缩
function maxSubArray2(nums: number[]) {
  // dp[i]：以索引i为结尾元素的有最大和的子数组的和；
  let max = nums[0];
  let lastMaxArrSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    let curMaxArrSum = Math.max(nums[i], lastMaxArrSum + nums[i]);
    max = Math.max(curMaxArrSum, max);
    lastMaxArrSum = curMaxArrSum;
  }
  return max;
}
