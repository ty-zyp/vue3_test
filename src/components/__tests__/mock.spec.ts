import { vi,describe,test,expect } from 'vitest';

function timer(callback:Function) {
  setTimeout(() => {
    callback();
  }, 5000);
}

describe('mock function test', () => {
  test('toHaveReturnedWith', async () => {

    const init = { test: 'hello' };
    const mockFn = vi.fn().mockImplementation(() => init);// 定义一个mockFn 的模拟函数，返回值 init
    // const mockFn = vi.fn(() => init);
   
    const aa = await mockFn(); // 返回特定的值
    // console.log(0,aa,vi.fn())
    expect(mockFn).toBeCalledTimes(1); // 是一个测试断言，通常用于验证一个模拟函数（mock function）被调用的次数。
    expect(mockFn).toHaveReturnedWith(init); // 是一个测试断言，用于验证模拟函数（mock function）返回了特定的值。
    // console.log(1,mockFn.mock.results)
    expect(mockFn.mock.results[0].value).toStrictEqual(init); // mockFn 是你创建的模拟函数，而 init 是你期望的返回值。toStrictEqual 断言会检查 mockFn 的返回值是否与 init 严格相等，包括两者的类型和结构。
  });

  test('promise resolve', async () => { // 不要使用toHaveReturnedWith
    // const mockFn = vi.fn().mockImplementation(apples => Promise.resolve(apples + 1));
    const mockFn = vi.fn(apples => Promise.resolve(apples + 1));// 定义一个mockFn 的模拟函数，入参apples，返回值 Promsie格式的apples+1
    expect(mockFn).not.toBeCalled(); //  是一个测试断言，用于验证模拟函数（mock function）是否没有被调用
    expect(mockFn).toBeCalledTimes(0);

    // expect(mockFn.mock.calls.length).toBe(2); // 验证被调用次数  
    // expect(mockFn.mock.calls[0][0]).toBe(1); // 验证第一次调用的参数  
    // expect(mockFn.mock.calls[0][1]).toBe(2); // 验证第一次调用的参数  
    // expect(mockFn.mock.calls[1][0]).toBe(3); // 验证第二次调用的参数  
    // expect(mockFn.mock.calls[1][1]).toBe(4); // 验证第二次调用的参数

    expect(mockFn.mock.calls.length).toBe(0); // 是一个测试断言，断言模拟函数被调用的次数（mockFn.mock.calls.length）是否严格等于给定的值
    // console.log(2,mockFn.mock.calls)
    const val = await mockFn(2);
    // console.log(3,mockFn.mock.calls)
    expect(mockFn).toBeCalledTimes(1);
    expect(val).toBe(3);
    expect(mockFn.mock.results[0].value).toEqual(3);
  });

  test('timers', () => {
    // 当你使用 vi.useFakeTimers()，所有的定时器（如 setTimeout、setInterval 等）将会使用 Vitest 提供的模拟实现，而不是实际的浏览器或 Node.js 定时器。
    // 这使得你可以在测试中更好地控制时间，例如，你可以“快进”时间，立即触发定时器，或者控制定时器的执行顺序。
    // “快进”时间，让定时器立即执行  vi.runAllTimers();  
    // 验证定时器的回调是否被调用   expect(timerCallback).toBeCalled();  
    
    vi.useFakeTimers();
    const mockFn = vi.fn(); // 定义一个模拟函数
    timer(mockFn);
    vi.advanceTimersByTime(5000); // 是一个来自 Vitest 测试框架的方法。这个方法用于“快进”模拟定时器，使其前进特定的时间（以毫秒为单位）。
    expect(mockFn).toBeCalled();  // 判断模拟函数是否被调用
  });
});