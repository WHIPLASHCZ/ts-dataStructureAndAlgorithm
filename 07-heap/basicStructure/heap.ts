// 最大堆
class Heap<T> {
  private data: T[] = [];
  public isMaxHeap: boolean = true;
  constructor(isMaxHeap: boolean = true, arr?: T[]) {
    this.isMaxHeap = isMaxHeap;
    if (arr) this.data = this.build_heap(arr, this.isMaxHeap);
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
    while (len) {
      len = Math.floor(len / 2);
      levelNum++;
    }
    return levelNum;
  }
  private getLastNotLeafNode(arr: T[]) {
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

    /**
     * 例如一个完全二叉树有4层，那么该树的第四层 可能有一个节点或满节点；
     *  若第四层只有一个节点，则该树共有8个节点，则是2^3;
     *  若第四层有满节点，则该树共有15个节点，则是(2^4)-1;
     *  可以得出，一个有N层的树，那么其节点数量在：2^(N-1) 到 (2^N)-1之间(左闭右闭)；
     *  已知(2^N)需 除以2 N+1次(每次除后向下取整) 得到0；(除以N次后得到1 然后1/2向下取整得0)
     *  所以 2^(N-1) 到 (2^N)-1 之间所有数 都只需除以2 N次(每次除后向下取整) 就能得0。
     */

    /**
     * 所以 已知arr是一个N层的完全二叉树；其长度为len；
     * arr可能有2^(N-1) 到 (2^N)-1 个节点，但这之间的数 都是除以2(每次除后向下取整) N次后为0；
     * 也就是说，arr是一个N层的二叉树；
     * 相当于 len每次做除以2(每次除后向下取整)的操作 就相当于把自己最后一层节点数量减去，得到其余节点数量；
     * 所以，floor(len/2) 可以得到arr的非叶子节点个数。
     * 因为len可能是2^(N-1) 到 (2^N)-1之间的任意正整数，但不管len是这之间的几，它做除以2(每次除后向下取整)的操作 次数都是一样的。
     */

    //最后一个叶子节点就是最后一个节点的父节点，子节点若为i(根节点从1开始)，则父节点下标为floor(i/2);
    let notLeavesNum = Math.floor(arr.length / 2); //非叶子节点个数

    let levelNum = this.getLevelByNodeNum(arr); //根据节点个数求出完全二叉树的层数
    let notLeavesNumIdx = Math.pow(2, levelNum - 1) - 1 - 1; //根据层数求出非叶子节点个数
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
          if (arr.length <= object) return subject;
          if (arr.length <= subject) return object;
          return arr[subject] > arr[object] ? subject : object;
        }
      : (subject: number, object: number) => {
          if (arr.length <= object) return subject;
          if (arr.length <= subject) return object;
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
    let fatherIdx = Math.floor((newDataIdx - 1) / 2); //也可以是Math.floor(newDataIdx / 2) - 1;
    while (newDataIdx > 0 && cmpFn(newDataIdx, fatherIdx)) {
      this.swap(newDataIdx, fatherIdx);
      newDataIdx = fatherIdx;
      fatherIdx = Math.floor((newDataIdx - 1) / 2);
    }
  }
  // 下滤-删除时一般用下滤操作
  private percolateDown(
    newDataIdx: number = 0,
    arr = this.data,
    isMaxHeap = this.isMaxHeap
  ) {
    const cmpFn = this.getCompareFn(isMaxHeap, arr);
    const idxCmpFn = this.getCmpIdxFn(isMaxHeap, arr);
    // 仍有左子节点的情况下继续遍历；
    // 因为堆是完全二叉树，若没有左子节点，必没有右子节点；
    while (newDataIdx * 2 + 1 < arr.length) {
      // 在当前子节点的左右节点中找出较大/较小节点索引
      let maxOrMinSonIdx = idxCmpFn(newDataIdx * 2 + 1, newDataIdx * 2 + 2);
      // 若较大/较小子节点大于自己 则与该子节点换位置;
      if (cmpFn(maxOrMinSonIdx, newDataIdx)) {
        this.swap(newDataIdx, maxOrMinSonIdx, arr);
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
    if (arr.length < 2) return arr;
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
    // let levelNum = this.getLevelByNodeNum(arr); //根据节点个数求出完全二叉树的层数
    // let notLeavesNumIdx = Math.pow(2, levelNum - 1) - 1 - 1; //根据层数求出非叶子节点个数

    //最后一个非叶子节点 也就是最后一个节点的父节点；
    // 求节点i的父节点公式：floor( i/2 ) (当根节点从1开始时);
    // 求节点i的父节点公式：floor( (i-1)/2 ) (当根节点从0开始时，且i是下标);
    /**
     * 因为：
     * 设有两个堆：
     * [1,2,3,4,5]; //从1开始的堆；第i个节点求父节点公式：floor(i/2);
     * [0,1,2,3,4]; //从0开始的堆；第i个节点求父节点公式：floor((i-1)/2); 从0开始的堆相当于前者每项往后挪了一位；
     * 因为从0开始的堆 每个i需要向前挪一位，每一项才能对应上从1开始的堆，对应上之后就可以用和前者一样的求父节点公式；
     * 所以从0开始的堆 第i个节点求父节点 需要先让i向前挪一位也就是(i-1) 然后除以2；
     */
    let lastNotLeaveNodeIdx = Math.floor((arr.length - 1 - 1) / 2); //因为是是0开头的二叉搜索树 所以floor((下标-1)/2)
    // 或者：lastNotLeaveNodeIdx = Math.floor((arr.length) / 2) - 1;
    // 总之因为数组为底层的堆 索引是从0开始，所以需要减一，往前找一位。
    while (lastNotLeaveNodeIdx >= 0) {
      this.percolateDown(lastNotLeaveNodeIdx, arr, isMaxHeap);
      lastNotLeaveNodeIdx--;
    }
    return arr;
  }
  static buildHeap<T>(arr: T[], isMaxHeap: boolean) {
    return this.prototype.build_heap(arr, isMaxHeap);
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
        str += arr[currentLevel + j++]!.valueOf() + space;
      }
      currentLevelNodeNum *= 2;
      console.log(str);
      console.log("\n");
    }
  }
}

export default Heap;
