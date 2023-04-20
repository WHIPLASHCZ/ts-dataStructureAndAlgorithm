// import { findClosestPrime } from "./tools";
import HashMap from "./basicStructure/hashMap";
const m = new HashMap<number>();

m.set("A", "A".charCodeAt(0));
m.set("B", "B".charCodeAt(0));
m.set("C", "C".charCodeAt(0));
m.set("AA", "AA".charCodeAt(0));
m.set("BB", "BB".charCodeAt(0));
m.set("CC", "CC".charCodeAt(0));
console.log(m);
console.log(`A：`, m.get("A"));
console.log(`B：`, m.get("B"));
console.log(`C：`, m.get("C"));
console.log(`AA：`, m.get("AA"));
console.log(`BB：`, m.get("BB"));
console.log(`CC：`, m.get("CC"));
