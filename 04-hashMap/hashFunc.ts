function hashFunc(key: string, max: number) {
  let hashCode = 0,
    N = 31;
  // let pow=0;
  for (let i = 0; i < key.length; i++) {
    //基础做法 幂连乘
    // ret += key[i].charCodeAt(0) * Math.pow(N, i);

    // 霍纳法则 提取公因式减少乘法次数
    // hashCode为上次的结果，N相当于被提取出来的公因数
    // 初始hashCode为0 则第一次结果为N*0+key[0]=key[0];
    // 第二次为(key[0]*N)+(key[1])
    // 第三次为((key[0]*N+key[1])*N)*key[2])
    // 第四次为( ((key[0]*N+key[1])*N)*key[2])*N )*key[3]
    hashCode = hashCode * N + key[i].charCodeAt(0);
    // 我的做法
    // hashCode += (pow * N || 1) * key[i].charCodeAt(0);
    // pow = pow ? pow * N : N * 1;
  }
  return hashCode % max;
}
export default hashFunc;
