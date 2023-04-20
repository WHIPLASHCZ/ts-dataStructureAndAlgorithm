import LinkedList from "./basicStructure/linkedList";
const list = new LinkedList<string>();
list.append("111");
list.append("222");
list.append("444");
list.insert(0, "000");
list.insert(3, "333");
list.insert(1, "zxc");
list.update(1, "cxz");
// list.deleteByIndex(1);
// list.insert(9, "999");
// console.log("zxczxczcx");

console.log(`size:`, list.size);

list.trave((node) => {
  console.log(`node:`, node);
});
console.log(``, list.indexOf("cxz"));

// console.log("zxc");
