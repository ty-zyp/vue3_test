import { describe, expect,test,vi } from 'vitest'
// import { mount } from '@vue/test-utils'
import {
  // sum, compose,
  loadUserData
} from '../../assets/common' // src\components\HelloWorld.vue

// vi.mock('@/assets/common', () => { // mock 某个文件的返回值
// // vi.mock('loadUserData',() => { // mock 某个方法的返回值
//   return { 
//     loadUserData(){
//       return {
//         userName: 'ww',
//         name: 'wangwu',
//         project: ['e', 'f'],
//         coolness: 100,
//         favoriteFood: 'mifan',
//         "snacks": false,
//       }
//     }
//   }
// })


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
describe.skip('common.ts', () => {
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

describe('api-test', () => {
  test('获取接口数据', async () => {
    const result = await loadUserData('ls');
    expect(result).toEqual({
      userName: 'ls',
      name: 'lisi',
      project: ['c', 'd'],
      coolness: 100,
      favoriteFood: 'mifan',
      "snacks": false,
    })
  })
  test('common 2', async () => {
    const zs = await loadUserData('zs');
    const ls = await loadUserData('ls');
    // const ww = await loadUserData('ww');
    expect(zs.coolness).toBe(-1);
    expect(ls.coolness).toBe(100);
    // expect(ww.coolness).toBe(-1);
  })
  // test.fails('common 3', async () => {
  test('common 3', async () => {
    expect(async () => {
      return await loadUserData('ww')
    }).rejects.toThrowError();
  })
  test('common 4', async () => {
    expect(async () => {
      await loadUserData('ww')
    }).rejects.toThrowError('no user found'); // 括号内容只要存在于抛出的内容上及测试通过，如 user 在 no user found 中能找到
  })
  test('common快照-1', async () => {
    const result = await loadUserData('ls');
    expect(result).toMatchSnapshot()
  })
  test('common内联快照-1', async () => {
    const result = await loadUserData('ls');
    expect(result).toMatchInlineSnapshot(`
      {
        "coolness": 100,
        "favoriteFood": "mifan",
        "name": "lisi",
        "project": [
          "c",
          "d",
        ],
        "snacks": false,
        "userName": "ls",
      }
    `)
  })
})