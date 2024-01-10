import { assertType, expectTypeOf ,test} from 'vitest'
import { mount } from '../../assets/common'

test('my types work properly', () => {
  expectTypeOf(mount).toBeFunction()
  expectTypeOf(mount).parameter(0).toMatchTypeOf<{ name: string }>() //  验证 mount 函数的第一个参数的类型是否为 { name: string }。
  // @ts-expect-error name is a string       // 这是一个注释，指示 TypeScript 在编译时应该期望一个错误，因为接下来的代码会尝试将一个非字符串值赋给 name。
  assertType(mount({ name: 42 })) // 尝试调用 mount 函数并传递一个对象作为参数，其中 name 的值是 42（一个数字，而不是字符串）。由于前面的注释，TypeScript 应该期望这里有一个类型错误。
})