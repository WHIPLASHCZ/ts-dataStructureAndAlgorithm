/**
 * @param {string[]} tokens
 * @return {number}
 */
function evalRPN(tokens: string[]) {
  let map: Record<string, (a: number, b: number) => number> = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => Math.trunc(a / b),
  };
  let stack: number[] = [];
  for (let i = 0; i < tokens.length; i++) {
    if (map[tokens[i]]) {
      let num1 = stack.pop();
      stack.push(map[tokens[i]](stack.pop()!, num1!));
    } else stack.push(Number(tokens[i]));
  }
  return stack[stack.length - 1];
}
