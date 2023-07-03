/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s: string) {
  let middle = 0,
    maxLen = 1,
    start = 0,
    end = 0;
  while (middle < s.length) {
    // 以当前字符为中心的最长回文字串的长度不一定是奇数；
    // 所以，以当前字符为中心找一次最长字串、以当前字符和当前字符右侧第一个字符俩字符为中心找一次最长字串，取较长者；
    let len = Math.max(
      extend(middle, middle, s),
      extend(middle, middle + 1, s)
    );
    if (len > maxLen) {
      maxLen = len;
      //已知长度和中间索引，求回文串开头索引：中间索引 - 长度的一半(向下取整)；
      //若回文串长度为奇数：则len-1为偶数；floor((len - 1) / 2) 求中间点前面有几个元素；
      //若回文串长度为偶数数：则len-1为奇数；floor((len - 1) / 2)求左侧中间点前面有几个元素；
      start = middle - Math.floor((len - 1) / 2);
      end = middle + Math.floor(len / 2);
    }
    middle++;
  }
  return s.slice(start, end + 1);
}

function extend(left: number, right: number, s: string) {
  let l = left,
    r = right;
  while (l >= 0 && r < s.length && s[l] == s[r]) {
    l--, r++;
  }
  return r - (l + 1);
}
