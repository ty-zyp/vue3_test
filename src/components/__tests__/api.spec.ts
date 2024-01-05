// 测试用例方式1：（全局mock测试）

import { BookingService } from '@/api/LoginService';
import { vi,describe,it,expect } from 'vitest';

vi.mock('@/services/BookingService'); // 全局mock

// describe.skip('mock api', () => {
describe('mock api', () => {
  it('mock async service in global scope', async () => {
    const result = false;
    const res = await BookingService.updateAppointOrderState(); // 不会走真实接口请求
    // console.log(4,res)
    expect(res).toBe(result); //  使用 toBe 方法来验证返回值是否严格等于预期的 result 值（在这个例子中是 false）。
    expect(res).toEqual(result); // 使用 toEqual 方法来验证返回值是否等于预期的 result 值。这个方法会比较对象的结构和值。
    expect(res).toBeFalsy(); //  使用 toBeFalsy 方法来验证返回值是否为假值（例如 false, 0, null, undefined, 和空字符串）。
    expect(BookingService.updateAppointOrderState).toBeCalledTimes(1);
    expect(BookingService.queryAllGuides).toBeCalledTimes(0);
  });
});



// 测试用例方式2：（不使用全局mock）

// import { BookingService } from '@/api/LoginService';
// import { vi,describe,it,expect } from 'vitest';

// describe.skip('mock api', () => {
//   it('mock async service', async () => {
//     const response = true;
//     // 手动模拟指定请求函数，返回一次mock数据
//     // TIPS:该方式也可以覆盖测试用例方式1的数据

//     // 这行代码创建了一个 spy，用于监视 BookingService.updateAppointOrderState 方法。通过使用 mockImplementation 方法，
//     // 你可以提供一个模拟实现，这个实现会替代原来的方法。这里返回了一个解析为 response 的 Promise。
//     const spy = vi.spyOn(BookingService, 'updateAppointOrderState').mockImplementation(() => Promise.resolve(response));

//     const res = await BookingService.updateAppointOrderState(); // 不会走真实接口请求
//     expect(res).toEqual(response);
//     expect(spy).toBeCalledTimes(1);
//     expect(spy.mock.results[0].value).toBe(response);
//   });
// });


beforeEach(async (context) => {
  // extend context
  context.foo = 'bar'
})

it('should work', ({ foo }) => {
  console.log(foo) // 'bar'
})