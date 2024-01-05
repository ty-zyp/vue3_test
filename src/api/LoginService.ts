import require from './require'
import { auto, network } from './geteway'


import { vi } from 'vitest';

// 作用：返回两个模拟Promise类型的函数updateAppointOrderState和queryAllGuides
export const BookingService = {
  updateAppointOrderState: vi.fn(() => Promise.resolve(false)),
  queryAllGuides: vi.fn(() => Promise.resolve({
    guiders: [{ name: 'jerryime' }],
    defaultGuider: { name: 'jerryime' },
  })),
}




// 用户的相关接口
export const userlogin = function (data: object) { // 登录接口
  return require({
    url: `${network}/${auto}/user/login`,
    method: 'post',
    data,
  })
}