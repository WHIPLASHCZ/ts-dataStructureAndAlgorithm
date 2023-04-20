import Queue from "./basicStructure/queue01";
// 击鼓传花
/*
**
规则：
我们来修改一下这个游戏规则。
几个朋友一起玩一个游戏，围成一圈，开始数数，
数到某个数字的人自动淘汰。最后剩下的这个人会获得胜利，
请问最后剩下的是原来在哪一个位置上的人?

*/

/**
 * 队列先进先出、后端进前端出的结构，适用于模拟环状结构；
 */
function sendFlower<T>(names: T[], outNum = 3) {
  let q = new Queue<T>(),
    i = 0;
  for (let item of names) q.inQueue(item);
  while (q.size > 1) {
    let cur = q.outQueue();
    //没有数到第outNum个数则没有被淘汰 重新入队(队列用于模拟环)
    if (i !== outNum - 1) q.inQueue(cur!);
    i = (i + 1) % outNum;
  }
  return q.outQueue()!;
}

let names: string[] = [
  "why",
  "james",
  "kobe",
  "curry",
  "abc",
  "cba",
  "nba",
  "mba",
];
let ret = sendFlower(names, 4);
console.log(`ret:`, ret);
