import { describe, it, expect,test } from 'vitest'
// import { mount } from '@vue/test-utils'
import { sum,compose } from '../../assets/common' // src\components\HelloWorld.vue

// 写法一：
// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1,2)).toBe(3)
// })

// const add1 = (x:number) => x + 1;
// const mul3 = (x:number) => x * 3;
// const div2 = (x:number) => x / 2;
// test('compose函数 3 equal 5.5', () => {
//   expect(compose(add1,mul3,div2)(3)).toBe(5.5)
// })

// 写法二：在测试中给it使用 concurrent 来并行运行
// describe('common.ts', () => {
//   test.concurrent('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3)
//   });
//   const add1 = (x:number) => x + 1;
//   const mul3 = (x:number) => x * 3;
//   const div2 = (x:number) => x / 2;
//   test.concurrent('compose函数 3 equal 5.5', () => {
//     expect(compose(add1, mul3, div2)(3)).toBe(5.5)
//   });
// })

// 写法三：在测试中给 describe 使用 concurrent 来并行运行
describe.concurrent('common.ts', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  });
  const add1 = (x:number) => x + 1;
  const mul3 = (x:number) => x * 3;
  const div2 = (x:number) => x / 2;
  test('compose函数 3 equal 5.5', () => {
    expect(compose(add1, mul3, div2)(3)).toBe(5.5)
  });
})