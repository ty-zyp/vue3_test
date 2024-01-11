import { expect, test } from "vitest";
import {myTest} from '../../assets/myTest'


test.each([[1, 1, 2],[1, 2, 3],[2, 1, 3]])("add(%i, %i) -> %i", (a, b, expected) => {
  expect(a + b).toBe(expected);
});

// this will return
// ✓ add(1, 1) -> 2
// ✓ add(1, 2) -> 3
// ✓ add(2, 1) -> 3



test('上下文', ({ expect ,skip}) => {
  expect(2 + 2).toBe(4)
  skip()
  expect(2+2).toBe(4)
})


myTest("add item", ({ todos }) => {
  expect(todos.length).toBe(3);

  todos.push(4);
  expect(todos.length).toBe(4);
});

test('toStrictEqual的使用', () => {
  const a: string|number = 5;
  const b:number = 5
  expect({ a: 1, b: [1, 2, 3] }).toStrictEqual({ a: 1, b: [1, 2, 3] })  // true
  expect({ a: 1, b: [1, 2, 3] }).toEqual({ a: 1, b: [1, 2, 3] })  // true
  // expect( {a: undefined, b: 2}).toStrictEqual({b: 2})  // false
  expect({ a: 1, b: [1, 2, 3] }).toEqual({ a: 1, b: [1, 2, 3] })  // true
  expect({ a: undefined, b: 2 }).toEqual({ b: 2 })  // true
  // expect({ a: '', b: 2 }).toEqual({ b: 2 })  // false
  expect({b:1}).toEqual({a:undefined,b:1})  // false
  expect([, 1]).toEqual([undefined, 1])  // false
  expect(a).toStrictEqual(b)  // false
  

  // expect( {a: undefined, b: 2}).toContainEqual({b: 2})  // false
})