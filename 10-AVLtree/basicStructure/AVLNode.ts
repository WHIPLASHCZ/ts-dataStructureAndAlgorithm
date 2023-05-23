import { TreeNode } from "../../05-binaryTree/basicStructure/BST";
import { btPrint } from "hy-algokit";
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
    // console.log(`getBalanceFactor`);
    const leftHeight: number = this.left ? this.left.getHeight() : 0;
    const rightHeight: number = this.right ? this.right.getHeight() : 0;
    // 正数且大于1：左侧不平衡，需右旋
    // 负数且小于-1：右侧不平衡，需左旋
    // 0、1、-1：左右基本平衡
    // console.log(`getBalanceFactor-done`, leftHeight - rightHeight);
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
  // 右旋转：当左左情况时使用；
  rightRotate() {
    // 找到旋转锚点和当前不平衡节点的父节点；
    const pivot = this.left!;

    // 处理pivot右节点的位置；
    this.left = pivot.right;
    if (pivot.right) pivot.right.parent = this;

    // 处理pivot的位置；
    if (this.parent && this.isLeft) this.parent.left = pivot;
    else if (this.parent && this.isRight) this.parent.right = pivot;
    pivot.parent = this.parent;

    // 处理当前不平衡节点的位置
    pivot.right = this;
    this.parent = pivot;
    return pivot;
  }
  // 左旋转：当右右情况时使用；
  leftRotate() {
    // 找到旋转锚点和当前不平衡节点的父节点；
    const pivot = this.right!;

    // 处理pivot右节点的位置；
    this.right = pivot.left;
    if (pivot.left) pivot.left.parent = this;

    // 处理pivot的位置；
    if (this.parent && this.isLeft) this.parent.left = pivot;
    else if (this.parent && this.isRight) this.parent.right = pivot;
    pivot.parent = this.parent;

    // 处理当前不平衡节点的位置
    pivot.left = this;
    this.parent = pivot;
    return pivot;
  }
}

export default AVLNode;
