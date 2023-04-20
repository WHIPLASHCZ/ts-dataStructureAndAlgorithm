import hashFunc from "../hashFunc";
import { findClosestPrime } from "../tools";
class HashMap<T = any> {
  // 哈希表底层存储 用数组实现 数组内存元祖键值对。
  private storage: [string, T][][] = [];

  private _length = 7; //   哈希表容量
  private _count = 0; //值的个数
  private static readonly MaxLoadFactor = 0.75; //最大填充因子
  private static readonly MinLoadFactor = 0.25; //最小填充因子
  private static readonly ExpansionMultiple = 2; //扩容/缩容倍数
  private static readonly minSize = 7; //哈希表最小容量
  get length(): number {
    return this._length;
  }
  get count(): number {
    return this._count;
  }
  //   装填因子：数据量 除以 哈希表容量；
  //   一般来说，装填因子大于0.75时，哈希表就该扩容了。
  get loadFactor(): number {
    return this._count / this._length;
  }
  private reSize() {
    // 容量变化后，哈希值也会变化(因为哈希值计算中运用到了哈希表容量这个数字)
    // 所以在扩容缩容时，表内所有值需要重新哈希化。
    if (this.loadFactor >= HashMap.MaxLoadFactor) {
      console.log(`需要扩容`, this._length, this.loadFactor);
      this._length = findClosestPrime(this.length * HashMap.ExpansionMultiple);
      this.reHash();
    } else if (
      this.loadFactor < HashMap.MinLoadFactor &&
      this.length > HashMap.minSize
    ) {
      this._length = Math.max(
        HashMap.minSize,
        findClosestPrime(this.length / HashMap.ExpansionMultiple, false)
      );
      this.reHash();
    }
    // else this._length = Math.max(Math.floor(this._length / 3), 7);
  }
  private reHash() {
    let oldStorage = this.storage;
    this.storage = [];
    oldStorage.forEach((item) => {
      item.length &&
        item.forEach((tuple) => {
          this.set(tuple[0], tuple[1]);
        });
    });
  }
  getValue(key: string) {
    let node = this.get(key);
    if (node) return node[1];
    return undefined;
  }
  //   获取
  get(key: string) {
    let bucket = this.getBucket(key);
    return bucket.find((item) => item[0] == key);
  }
  getBucket(key: string) {
    let hashCode = hashFunc(key, this.length);
    console.log(`hashCode of ${key}:`, hashCode);
    if (!this.storage[hashCode]) this.storage[hashCode] = [];
    return this.storage[hashCode];
  }
  //   插入/修改
  set(key: string, value: T) {
    let bucket = this.getBucket(key);
    if (bucket.length) {
      let data = bucket.find((item) => item[0] == key);
      if (data) data[1] = value;
      else bucket.push([key, value]), this._count++, this.reSize();
    } else bucket.push([key, value]), this._count++, this.reSize();
  }
  delete(key: string) {
    let bucket = this.getBucket(key);
    let idx = bucket.findIndex((item) => item[0] === key);
    let ret = bucket[idx];
    if (ret) {
      bucket.splice(idx, 1);
      this._count--, this.reSize();
    }
    return ret ? ret[1] : undefined;
  }
}

export default HashMap;
