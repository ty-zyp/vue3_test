// export function sum(a:number, b:number):number {
//   return a + b
// }

// compose 函数
// export function compose(...funcs:Array<Function>){
//     return function anonymous(val:any){
//     if(funcs.length===0) return val;
//     if(funcs.length===1) return funcs[0](val);
//     return funcs.reverse().reduce((N,item)=>{
//       return item(N);
//     },val)
//   }
// }
interface User{
  userName: string,
  name: string,
  project: string[],
  coolness?: number,
  favoriteFood?: string,
  snacks:boolean
}


const findUser = (userName:string): User | undefined =>{
  const users:User[] = [{
      userName: 'zs',
      name: 'zhangsan',
      project: ['a', 'b'],
      favoriteFood: 'nodes',
      snacks:false
    },
    {
      userName: 'ls',
      name: 'lisi',
      project: ['c', 'd'],
      favoriteFood: 'mifan',
      snacks:false
    }
  ]
  return users.find(user => {
    return user.userName === userName;
  })
}

export const loadUserData = async (userName:string) => {
  const user = await findUser(userName);
  if (!user) {
    throw new Error('no user found');
  }
  user.coolness = userName === 'ls' ? 100 : -1;
  return user;
}



// src/index.ts

// 函数实现
export function add(...args: number[]) {
  return args.reduce((a, b) => a + b, 0)
}

// 源码内的测试套件
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('add', () => {
    expect(add()).toBe(0)
    expect(add(1)).toBe(1)
    expect(add(1, 2, 3)).toBe(6)
  })
}

export const mount = (name:string) => {
  return name;
}