import { test,it, expect } from 'vitest';
import HelloWorld from '../HelloWorld.vue' //src\components\HelloWorld.vue

it('toUpperCase', async () => {
  console.log('HelloWorld',HelloWorld)
  // const str = 'foobar';
  // const result = str.toLocaleUpperCase()
  // expect(result).toMatchSnapshot() // 此测试在第一次运行时，Vitest 会创建一个快照文件
  // expect(result).toMatchInlineSnapshot(`"FOOBAR"`) // 这允许你直接查看期望输出，而无需跨不同的文件跳转。
  
  // const result = mount(HelloWorld);
  const result = HelloWorld;
  await expect(result).toMatchFileSnapshot('../HelloWorld1.vue') // 会以文件的方式存储

});