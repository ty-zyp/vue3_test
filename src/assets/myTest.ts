import { test } from 'vitest'

const todos = []
const archive = []

export const myTest = test.extend({
  // eslint-disable-next-line no-empty-pattern
  todos: async ({}, use) => {
    // 在每次测试函数运行之前设置固定装置
    todos.push(1, 2, 3)

    // 使用固定装置的值
    await use(todos)

    // 在每次测试函数运行之后清除固定装置
    todos.length = 0
  },
  archive,
})

// 在此处可以扩展
export const myTest2 = myTest.extend({
  settings: {
    // ...
  },
})