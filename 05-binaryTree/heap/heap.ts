// 最大堆
class Heap<T> {
  private data: T[] = [];
  public isMaxHeap: boolean = true;
  constructor(isMaxHeap: boolean = true, arr?: T[]) {
    this.isMaxHeap = isMaxHeap;
    if (arr) this.data = arr;
  }
  get length(): number {
    return this.data.length;
  }
  get isEmpty() {
    return !this.length;
  }
  // 完全二叉树的节点个数能除以2多少次，就有多少层。
  private getLevelByNodeNum(arr = this.data) {
    let levelNum = 0,
      len = arr.length;
    while (len >= 1) {
      len /= 2;
      levelNum++;
    }
    return levelNum;
  }
  private swap(i: number, j: number, arr = this.data) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  private getCmpIdxFn(isMaxHeap = this.isMaxHeap, arr = this.data) {
    // return this.data[i] > this.data[j] ? i : j;
    return isMaxHeap
      ? (subject: number, object: number) => {
          if (arr.length < object) return subject;
          return arr[subject] > arr[object] ? subject : object;
        }
      : (subject: number, object: number) => {
          if (arr.length < object) return subject;
          return arr[subject] < arr[object] ? subject : object;
        };
  }
  private getCompareFn(isMaxHeap = this.isMaxHeap, arr = this.data) {
    return isMaxHeap
      ? (subject: number, object: number) => arr[subject] > arr[object]
      : (subject: number, object: number) => arr[subject] < arr[object];
  }
  // 上滤-插入时一般用上滤操作
  private percolateUp(newDataIdx: number = this.length - 1) {
    const cmpFn = this.getCompareFn();
    let fatherIdx = Math.floor((newDataIdx - 1) / 2);
    while (newDataIdx > 0 && cmpFn(newDataIdx, fatherIdx)) {
      this.swap(newDataIdx, fatherIdx);
      newDataIdx = fatherIdx;
      fatherIdx = Math.floor((newDataIdx - 1) / 2);
    }
  }
  // 下滤-删除时一般用下滤操作
  private percolateDown(newDataIdx: number = 0) {
    const cmpFn = this.getCompareFn();
    const idxCmpFn = this.getCmpIdxFn();
    // 仍有左子节点的情况下继续遍历；
    // 因为堆是完全二叉树，若没有左子节点，必没有右子节点；
    while (newDataIdx * 2 + 1 < this.data.length) {
      // 在当前子节点的左右节点中找出较大/较小节点索引
      let maxOrMinSonIdx = idxCmpFn(newDataIdx * 2 + 1, newDataIdx * 2 + 2);
      // 若较大/较小子节点大于自己 则与该子节点换位置;
      if (cmpFn(maxOrMinSonIdx, newDataIdx)) {
        this.swap(newDataIdx, maxOrMinSonIdx);
        newDataIdx = maxOrMinSonIdx;
      } else break;
    }
  }
  insert(value: T) {
    this.data.push(value);
    if (this.length > 1) {
      //   检查是否符合最大/最小堆特性
      //   若不符合，开始上滤操作
      //   从0开始的完全二叉树-第i个节点的父节点：floor((i-1)/2);
      let newDataIdx = this.length - 1;
      this.percolateUp(newDataIdx);
    }
    return true;
  }

  //   删除最大/最小元素 也就是根元素
  extract() {
    if (!this.data.length) return false;
    if (this.data.length == 1) return this.data.pop();
    const ret = this.data[0];
    // 让末尾元素变成根-目前暂时不符合最大/最小堆的规律；
    this.data[0] = this.data.pop()!;
    // 然后从根开始进行下滤操作；
    this.percolateDown();
    return ret;
  }

  peek() {
    return this.data[0];
  }
  build_heap(arr: T[], isMaxHeap = this.isMaxHeap) {
    // // 原地建堆
    // // 每个元素进行下滤操作。
    /*如果从头开始 依次下滤
      因为下滤操作会有上层的值与下层的值 交换位置；
      那么若从头开始依次下滤 会导致有些值被重复操作、有些值没有操作到；(因为下滤会进行值的位置交换；)
     */

    /**
     * 所以正确的处理方式是：
     * 从倒数第一个非叶子节点到根节点为止(叶子节点无子节点不需要下滤) 开始依次下滤操作；
     * 也就相当于 把下面的值慢慢的往上换；
     */
    let levelNum = this.getLevelByNodeNum(arr); //根据节点个数求出完全二叉树的层数

    /* levelNum层的满二叉树，有(2^levelNum)-1个节点;也就是最后一个叶子节点就是第(2^levelNum)-1个；
       完全二叉树的最后一个叶子节点，就是倒数第二层的最后一个； 也就是第(2^(levelNum-1))-1个;
       (2^levelNum)/2 == (2^(levelNum-1)); 
       (2^levelNum)/2 -1 == (2^(levelNum-1))-1;
       floor((2^levelNum)-1)/2) == (2^(levelNum-1))-1;

       arr是一个完全二叉树； 
       2^(levelNum-1)<=arr.length<=(2^levelNum)-1;
       2^(levelNum-2)<=floor(arr.length/2)<=floor(((2^levelNum)-1)/2));
       floor(arr.length/2) <= floor(((2^levelNum)-1)/2) == (2^(levelNum-1))-1
     */

    //最后一个叶子节点就是最后一个节点的父节点，子节点若为i(根节点从1开始)，则父节点下标为floor(i/2);
    let notLeavesNum = Math.floor(arr.length / 2); //非叶子节点个数
    let notLeavesNumIdx = Math.pow(2, levelNum - 1) - 1 - 1; //根据层数求出非叶子节点个数
    console.log(`levelNum - notleavesnum`, levelNum, notLeavesNumIdx + 1);
    let getIdxCmpFn = this.getCmpIdxFn(isMaxHeap, arr);
    let cmpFn = this.getCompareFn(isMaxHeap, arr);

    while (notLeavesNumIdx >= 0) {
      let leftSonIdx = notLeavesNumIdx * 2 + 1,
        rightSonIdx = notLeavesNumIdx * 2 + 2;
      let betterSonIdx = getIdxCmpFn(leftSonIdx, rightSonIdx);
      if (cmpFn(betterSonIdx, notLeavesNumIdx))
        this.swap(betterSonIdx, notLeavesNumIdx, arr);
      notLeavesNumIdx--;
    }
    return new Heap(isMaxHeap, arr);
  }
  traveAsTree(arr = this.data) {
    // 完全二叉树的节点个数能除以2多少次，就有多少层。
    let levelNum = this.getLevelByNodeNum(arr);
    let currentLevelNodeNum = 1;
    for (let i = 0; i < levelNum; i++) {
      let space = " ".repeat(levelNum - i);
      let str = space + space;
      let currentLevel = Math.pow(2, i) - 1,
        j = 0;
      while (j < currentLevelNodeNum && currentLevel + j < arr.length) {
        str += arr[currentLevel + j++] + space;
      }
      currentLevelNodeNum *= 2;
      console.log(str);
      console.log("\n");
    }
  }
}

export default Heap;
