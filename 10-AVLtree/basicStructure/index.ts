import AVLNode from "./AVLNode";
import BinarySearchTree from "../../05-binaryTree/basicStructure/BST";

class AVLTree<T> extends BinarySearchTree<T> {
  protected root: AVLNode<T> | null = null;
  constructor(root: T | null = null) {
    super();
  }
  protected getNode(val: T) {
    return new AVLNode<T>(val);
  }
  insert(val: T) {
    super.insert(val);
    this.reBalance();
  }
  reBalance(grand: AVLNode<T> | null = this.root) {
    if (!grand || grand.isBalance) return;
    const pivot = grand.getHigherChild();
    if (!pivot) return;
    const current = pivot.getHigherChild();
    if (!current) return;

    // 左右情况
    if (pivot.isLeft) {
      if (current.isRight) {
        pivot.leftRotate();
        const newRoot = grand.rightRotate();
        if (grand == this.root && newRoot) this.root = newRoot;
      } else {
        //左左情况
        grand.rightRotate();
      }
      // 右左情况
    } else {
      if (current.isLeft) {
        pivot.rightRotate();
        const newRoot = grand.leftRotate();
        if (grand == this.root && newRoot) this.root = newRoot;
      } else {
        // 右右情况
        grand.leftRotate();
      }
    }
  }
}
export default AVLTree;
