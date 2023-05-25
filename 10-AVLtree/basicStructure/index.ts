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
    const newNode = super.insert(val);
    this.checkBalance(newNode as AVLNode<T>);
    return newNode;
  }
  remove(val: T) {
    const deletedNode = super.remove(val) as AVLNode<T>;
    if (deletedNode) this.checkBalance(deletedNode as AVLNode<T>);
    return deletedNode;
  }
  checkBalance(node: AVLNode<T>) {
    let trave: AVLNode<T> | null = node.parent;
    while (trave) {
      if (!trave.isBalance) {
        this.reBalance(trave);
        break;
      }
      trave = trave.parent;
    }
  }
  reBalance(grand: AVLNode<T> | null = this.root) {
    if (!grand) return;
    const pivot = grand.getHigherChild();
    if (!pivot) return;
    const current = pivot.getHigherChild();
    if (!current) return;
    let newRoot = null;
    // 左右情况
    if (pivot.isLeft) {
      if (current.isRight) {
        pivot.leftRotate();
        newRoot = grand.rightRotate();
      } else {
        //左左情况
        newRoot = grand.rightRotate();
      }
      // 右左情况
    } else {
      if (current.isLeft) {
        pivot.rightRotate();
        newRoot = grand.leftRotate();
      } else {
        // 右右情况
        newRoot = grand.leftRotate();
      }
    }
    if (newRoot && !newRoot.parent) this.root = newRoot;
  }
}
export default AVLTree;
