import BinarySearchTree from "./basicStructure/BST";
import { btPrint } from "hy-algokit";

class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  //   在js中，若两个复杂类型进行比较运算，则比较的是该复杂类型的valueOf函数的返回值；
  //   我们重写valueOf，返回当前对象的.age属性，就可以让Person类型对象互相比较时，按age属性的大小比较。
  valueOf() {
    return this.age;
  }
}

const a = new Person("了解过", 12);
const c = new Person("zxc1", 13);
const d = new Person("阿萨德", 11);

const b = new BinarySearchTree<Person>();
b.insert(a), b.insert(c), b.insert(d);
// console.log(b._root?.value);
btPrint(b._root);
