declare interface treeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  parent: TreeNode<T> | null;
}

declare type traveCallback = (node: treeNode<T>) => void;
declare type printAbleTreeNode<T> = treeNode<T> & PrintableNode;
