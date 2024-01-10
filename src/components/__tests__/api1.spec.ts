
import { vi, describe, it, expect } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils'
import axios from 'axios';
import Axios from '../Axios.vue'

// console.log(0,Axios)

describe('axios-tets', () => {
  it('tets1', async () => {
    const spy = vi.spyOn(axios, 'get') //vi.mock 可以使用 vi.spyOn()监听 axios 的 get 请求来跟踪 mock 执行
    const wrapper = mount(Axios)
    await wrapper.find('button').trigger('click')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('/user')
  })
  it('test2', async () => {
    const wrapper = mount(Axios)
    expect(wrapper.find('span').text()).toContain('李四')
    await wrapper.find('button').trigger('click')
    await flushPromises() // flushPromises方法会刷新所有已解决的 promise 程序
    expect(wrapper.find('span').text()).toContain('张三')
  })
})


// describe('axios-test', () => {
//   it('test1', async () => {
//     const spy = vi.spyOn(axios, 'get');
//     const wrapper = mount(App);
//     console.log(1,await wrapper.find('data-my-attribute="your-value"]'))
//     await wrapper.find('data-my-attribute="your-value"]').trigger('click')
//     expect(spy).toHaveBeenCalledTimes(1);
//     expect(spy).toHaveBeenCalledWith('/user')


//   });
// });




