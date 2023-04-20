//内部类：结点类
class myNode<T> {
  public data: T;
  public next: myNode<T> | null;
  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}
//封装链表
class Linklist<T> {
  public head: myNode<T> | null;
  public length: number;
  constructor() {
    this.head = null;
    this.length = 0;
  }
  // //尾插
  append(e: T) {
    var newnode = new myNode(e);
    if (this.length === 0) {
      this.head = newnode;
    } else {
      var current = this.head;
      while (current && current.next != null) {
        current = current.next;
      }
      if (current) current.next = newnode;
    }
    this.length++;
  }
  // 头删
  preDel() {
    if (!this.length) return null;
    let oldhead = this.head;
    this.head = oldhead!.next;
    oldhead!.next = null;
    this.length--;
    return oldhead!.data;
  }
}
// 0,1,···,n-1这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字（
// 删除后从下一个数字开始计数）。求出这个圆圈里剩下的最后一个数字。
// 例如，0、1、2、3、4这5个数字组成一个圆圈，从数字0开始每次删除第3个数字，则删除的前4个数字依次是2、0、4、1，因此最后剩下的数字是3。

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
var lastRemaining = function (n: number, m: number) {
  let queue = new Linklist<number>(),
    i = 0;
  for (let i = 0; i < n; i++) queue.append(i);
  while (queue.length > 1) {
    if (i != m - 1) queue.append(queue.preDel()!);
    i = (i + 1) % m;
  }
  return queue.head!.data;
};

function lastRemaining2(n: number, m: number) {
  let position = 0;
  for (let i = 2; i <= n; i++) {
    position = (position + m) % i;
  }
  return position;
}
