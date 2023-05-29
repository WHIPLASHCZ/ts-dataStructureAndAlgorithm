import { PrintableNode } from "hy-algokit";

class TreeNode<T> implements printAbleTreeNode<T> {
  public value: T;
  public left: TreeNode<T> | null = null;
  public right: TreeNode<T> | null = null;
  public parent: TreeNode<T> | null = null;
  constructor(
    value: T,
    left: TreeNode<T> | null = null,
    right: TreeNode<T> | null = null,
    parent: TreeNode<T> | null = null
  ) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.parent = parent;
  }
  get isLeft() {
    return this.parent?.left == this;
  }
  get isRight() {
    return this.parent?.right == this;
  }
}

// 如果不为空，满足以下性质:
// 1.非空左子树的所有键值小于其根节点的键值。
// 2.非空右子树的所有键值大于其根节点的键值。
// 3.左、右子树本身也都是二叉搜索树。
// 左小右大；
class BinarySearchTree<T> {
  protected root: TreeNode<T> | null = null;
  constructor(root: T | null = null) {
    if (root) this.root = this.getNode(root);
  }
  get _root() {
    return this.root;
  }
  protected getNode(val: T) {
    return new TreeNode<T>(val);
  }
  protected checkBalance(node: TreeNode<T> | null, isInsert: boolean = true) {}
  insert(val: T) {
    const newNode = this.getNode(val);
    if (!this.root) this.root = newNode;
    else this.insertNode(newNode, this.root);
    return newNode;
  }
  protected insertNode(node: TreeNode<T>, mountPoint: TreeNode<T>) {
    const v = node.value;
    if (!node || !mountPoint) return;
    if (v > mountPoint.value) {
      if (!mountPoint.right)
        (node.parent = mountPoint), (mountPoint.right = node);
      else this.insertNode(node, mountPoint.right);
    } else if (v <= mountPoint.value) {
      if (!mountPoint.left)
        (node.parent = mountPoint), (mountPoint.left = node);
      else this.insertNode(node, mountPoint.left);
    }
  }
  private insertWithNode(node: TreeNode<T>) {
    if (!this.root) this.root = node;
    else this.insertNode(node, this.root);
  }
  // private findParentNode(val: T) {
  //   let root = this.root;
  //   if (!root) return null;
  //   while (root?.right || root?.left) {
  //     if (val > root.value) {
  //       if (!root.right) return root;
  //       root = root.right;
  //     } else if (val < root.value) {
  //       if (!root.left) return root;
  //       root = root.left;
  //     } else break;
  //   }
  //   return root;
  // }
  search(val: T) {
    let trave = this.root;
    while (trave) {
      if (trave.value < val) trave = trave.right;
      else if (trave.value > val) trave = trave.left;
      else return trave;
    }
    return null;
  }
  min(root = this.root) {
    return this.minNode(root)?.value;
  }
  max(root = this.root) {
    return this.maxNode(root)?.value;
  }
  private minNode(root = this.root) {
    if (!root) return null;
    let trave = root;
    while (trave.left) trave = trave.left;
    return trave;
  }
  private maxNode(root = this.root) {
    if (!root) return null;
    let trave = root;
    while (trave.right) trave = trave.right;
    return trave;
  }
  private replaceNode(current: TreeNode<T>, replacement: TreeNode<T> | null) {
    if (replacement) replacement.parent = current.parent;
    if (current == this.root) this.root = replacement;
    else if (current.isLeft) current.parent!.left = replacement;
    else if (current.isRight) current.parent!.right = replacement;
  }
  remove(val: T) {
    /**四种情况：
     * 1、要删除的节点是否存在
     * 2、若删除的节点没有子节点；
     * 3、若删除的节点只有一个节点；
     * 4、若删除的节点有两个节点；
     */
    if (!this.root) return null;
    const trave = this.search(val);
    if (!trave) return null;
    if (!trave.left && !trave.right) {
      // 叶子节点
      this.replaceNode(trave, null);
    } else if (trave.left && trave.right) {
      // 若被删节点两个子节点
      // 方法1：被移除节点的两个子树需要合并为一个子树，然后合并的子树替代被移除节点；
      /**方法1 */
      // const newNode = this.mergeTree(trave.left, trave.right);
      // if (trave == this.root) this.root = newNode;
      // else if (parent && parent?.left == trave) parent.left = newNode;
      // else if (parent?.right == trave) parent.right = newNode;

      // 方法2：找左子树中最大的节点(前驱) 或 右子树中最小的节点(后继)，然后顶替被删除的节点(这样仍然可保持BST左小右大的规律)
      /**方法2 */
      const maxNodeInLeftSonTree = this.maxNode(trave.left)!; //找到前驱节点；
      // 如果前驱/后继节点 有子节点的话 把该子节点替换到前驱/后继节点原来的位置；
      /**
       * 因为BST的特性，所以前驱/后继节点只会有一个子节点。因为前驱/后继节点是左子树最大的/右子树最小的；
       * 所以，前驱节点只可能有左子节点(小于前驱)，后继节点只可能有右子节点(大于后继)。
       */
      const maxNodeInLeftTreePos = maxNodeInLeftSonTree.isLeft
        ? "left"
        : "right";
      if (maxNodeInLeftSonTree.left) {
        // 前驱节点可能有左子节点；若有的话，将其顶替到自己原来的位置，自己顶替到被删除节点的位置。
        maxNodeInLeftSonTree.parent![maxNodeInLeftTreePos] =
          maxNodeInLeftSonTree.left;
        maxNodeInLeftSonTree.left.parent = maxNodeInLeftSonTree.parent;
      } else {
        // 若前驱节点不是被删除节点的左子节点 且前驱节点没有子节点
        // 直接删除前驱节点与其父节点的连接
        maxNodeInLeftSonTree.parent![maxNodeInLeftTreePos] = null;
      }

      // 当前驱/后继节点顶替到被删除节点的位置后，前驱/后继节点需要继承被删除节点的左右子树；
      // 同时，以防万一被删除节点的左/右子树就是前驱/后继节点自身 导致环形引用，所以需要判断再赋值；
      if (maxNodeInLeftSonTree != trave.left) {
        maxNodeInLeftSonTree.left = trave.left;
        if (trave.left) trave.left.parent = maxNodeInLeftSonTree;
      }
      maxNodeInLeftSonTree.right = trave.right;
      trave.right.parent = maxNodeInLeftSonTree;
      // 让前驱/后继节点 顶替到被删除节点trave的位置；
      this.replaceNode(trave, maxNodeInLeftSonTree);

      this.checkBalance(
        maxNodeInLeftSonTree.left || maxNodeInLeftSonTree.right
      );
    } else if (trave.left || trave.right) {
      // 仅一个子节点
      this.replaceNode(trave, trave.left || trave.right);
    }
    this.checkBalance(trave);
    return trave;
  }
  mergeTree(tree1: TreeNode<T>, tree2: TreeNode<T>) {
    const newTree = new BinarySearchTree<T>();
    this.preTrave((node) => newTree.insertWithNode(node as TreeNode<T>), tree1);
    this.preTrave((node) => newTree.insertWithNode(node as TreeNode<T>), tree2);
    return newTree.root;
  }
  // 先序遍历
  preTrave(cb: traveCallback, root: TreeNode<T> = this.root!) {
    if (!root) return;
    const ret = cb(root);
    if (root.left) this.preTrave(cb, root?.left);
    if (root.right) this.preTrave(cb, root?.right);
    return ret;
  }
  // 非递归
  preTrave2(cb: traveCallback) {
    let root = this.root,
      stack = [];
    while (root || stack.length) {
      while (root) {
        cb(root);
        stack.push(root);
        root = root.left;
      }
      root = stack.pop()!;
      root = root.right;
    }
  }
  // 中序遍历
  inTrave(cb: traveCallback, root: TreeNode<T> = this.root!) {
    if (!root) return;
    if (root.left) this.inTrave(cb, root?.left);
    const ret = cb(root);
    if (root.right) this.inTrave(cb, root?.right);
    return ret;
  }
  // 非递归
  inTrave2(cb: traveCallback) {
    let root = this.root,
      stack = [];
    while (root || stack.length) {
      while (root) {
        stack.push(root);
        root = root.left;
      }
      root = stack.pop()!;
      cb(root);
      root = root.right;
    }
  }
  // 后序遍历
  postTrave(cb: traveCallback, root: TreeNode<T> = this.root!) {
    if (!root) return;
    if (root.left) this.postTrave(cb, root?.left);
    if (root.right) this.postTrave(cb, root?.right);
    const ret = cb(root);
    return ret;
  }
  // 非递归
  postTrave2(cb: traveCallback) {
    let root = this.root,
      stack = [],
      lastVisitedNode: TreeNode<T> | null = null;
    while (root || stack.length) {
      while (root) {
        stack.push(root);
        root = root.left;
      }
      root = stack[stack.length - 1];
      if (!root.right || root.right == lastVisitedNode) {
        cb(root);
        lastVisitedNode = root;
        stack.pop();
        root = null;
      } else {
        root = root.right;
      }
    }
  }
  // 层序遍历
  // 逐层遍历
  // levelTrave(cb: traveCallback) {
  //   if (!this.root) return null;
  //   const queue = [this.root]; //队列
  //   for (let node of queue) {
  //     if (node.left) queue.push(node.left);
  //     if (node.right) queue.push(node.right);
  //   }
  //   for (let node of queue) {
  //     cb(node);
  //   }
  // }
  levelTrave(cb: traveCallback) {
    if (!this.root) return null;
    const queue = [this.root]; //队列
    // for (let i = 0; i < queue.length; i++) {
    //   const node = queue[i];
    //   if (node.left) queue.push(node.left);
    //   if (node.right) queue.push(node.right);
    //   if (queue.length) {
    //     cb(queue.shift()!);
    //     i--;
    //   }
    // }
    while (queue.length) {
      const node = queue.shift()!;
      cb(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
}

export default BinarySearchTree;
export { TreeNode };
