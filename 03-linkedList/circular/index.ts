import CircularLinkedList from "./circular";
const c = new CircularLinkedList();

c.append("aaa");
c.append("bbb");
c.append("ccc");
c.append("ddd");
c.append("eee");
c.insert(5, "fff");
// c.deleteByData("aaa");
// c.deleteByData("fff");
console.log(c.getTail, c.indexOf("fff"));
c.trave((item, idx) => console.log(item.data));
