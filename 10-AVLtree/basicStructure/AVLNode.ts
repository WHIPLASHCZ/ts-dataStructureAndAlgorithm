import { TreeNode } from "../../05-binaryTree/basicStructure/BST";
class AVLNode<T> extends TreeNode<T> {
  public left: AVLNode<T> | null = null;
  public right: AVLNode<T> | null = null;
  public parent: AVLNode<T> | null = null;
  get depth() {
    let parent = this.parent,
      depth = 1;
    while (parent) {
      depth++;
      parent = parent.parent;
    }
    return depth;
  }
  get isBalance() {
    return Math.abs(this.getBalanceFactor()) <= 1;
  }
  getHeight() {
    const leftHeight: number = this.left ? this.left.getHeight() : 0;
    const rightHeight: number = this.right ? this.right.getHeight() : 0;
    return Math.max(leftHeight, rightHeight) + 1;
  }
  getBalanceFactor() {
    const leftHeight: number = this.left ? this.left.getHeight() : 0;
    const rightHeight: number = this.right ? this.right.getHeight() : 0;
    // 正数且大于1：左侧不平衡，需右旋
    // 负数且小于-1：右侧不平衡，需左旋
    // 0、1、-1：左右基本平衡
    return leftHeight - rightHeight;
  }
  getHigherChild() {
    //   寻找旋转轴点：载不平衡的那个节点的高度更高的那个子树种找；
    const leftHeight: number = this.left ? this.left.getHeight() : 0;
    const rightHeight: number = this.right ? this.right.getHeight() : 0;
    // leftHeight > rightHeight ? this.left : this.right;
    if (leftHeight > rightHeight) return this.left;
    if (rightHeight > leftHeight) return this.right;
    return this.isLeft ? this.left : this.right;
  }
}

export default AVLNode;
