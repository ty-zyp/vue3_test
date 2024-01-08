import { describe, it, expect,test } from 'vitest'
// import { mount } from '@vue/test-utils'
import { sum,compose, loadUserData} from '../../assets/common' // src\components\HelloWorld.vue

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

describe('api-test', () => {
  test('获取接口数据', async () => {
    const result = await loadUserData('ls');
    expect(result).toEqual({
      userName: 'ls',
      name: 'lisi',
      project: ['c', 'd'],
      coolness: 100,
      favoriteFood: 'mifan'
    })
  })
  test('common 2', async () => {
    const zs = await loadUserData('zs');
    const ls = await loadUserData('ls');
    expect(zs.coolness).toBe(-1);
    expect(ls.coolness).toBe(100);
  })
  // test.fails('common 3', async () => {
  test('common 3', async () => {
    expect(async () => {
      await loadUserData('ss')
    }).rejects.toThrowError();
  })
  test('common 4', async () => {
    expect(async () => {
      await loadUserData('ss')
    }).rejects.toThrowError('no user found'); // 括号内容只要存在于抛出的内容上及测试通过，如 user 在 no user found 中能找到
  })
  test('common快照-1', async () => {
    const result = await loadUserData('ls');
    expect(result).toMatchSnapshot()
  })
})