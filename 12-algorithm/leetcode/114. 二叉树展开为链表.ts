/**
 * 给你二叉树的根结点 root ，请你将它展开为一个单链表：

展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
展开后的单链表应该与二叉树 先序遍历 顺序相同。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/flatten-binary-tree-to-linked-list
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/**
 Do not return anything, modify root in-place instead.
 */
function flatten(root: TreeNode | null): void {
  let stack = [],
    nodes = [];
  while (root || stack.length) {
    while (root) {
      nodes.push(root);
      stack.push(root);
      root = root.left;
    }
    root = stack.pop()!;
    root = root.right;
  }
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].left = null;
    if (nodes[i] && nodes[i + 1]) nodes[i].right = nodes[i + 1];
  }
}
