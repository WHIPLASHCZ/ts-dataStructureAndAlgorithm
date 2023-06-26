// 普通动态规划
function maxProfit(prices: number[]) {
  // dp[i]：第i天能获取到的最大利润(可能卖出也可能不卖)；
  let dp = [0];
  let minPrice = prices[0];
  for (let i = 1; i < prices.length; i++) {
    let curProfit = prices[i] - minPrice;
    dp[i] = Math.max(dp[i - 1], curProfit);
    minPrice = Math.min(prices[i], minPrice);
  }
  return dp[dp.length - 1];
}

//  动态规划-状态压缩
function maxProfit2(prices: number[]) {
  let minPriceToBuy = prices[0]; //记录最小的买入价格
  let profit = 0; //记录最大卖出价格
  for (let i = 1; i < prices.length; i++) {
    // 如果当天卖出能获取的利润大于之前的最大利润 则记录
    profit = Math.max(prices[i] - minPriceToBuy, profit);
    // 如果当天的价格小于前面的最小价格 则买入 可以到后面再卖出
    minPriceToBuy = Math.min(prices[i], minPriceToBuy);
  }
  return profit;
}
