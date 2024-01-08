export function sum(a:number, b:number):number {
  return a + b
}

// compose 函数
export function compose(...funcs:Array<Function>){
    return function anonymous(val:any){
    if(funcs.length===0) return val;
    if(funcs.length===1) return funcs[0](val);
    return funcs.reverse().reduce((N,item)=>{
      return item(N);
    },val)
  }
}
interface User{
  userName: string,
  name: string,
  project: string[],
  coolness?: number,
  favoriteFood?:string
}


const findUser = (userName:string): User | undefined =>{
  const users:User[] = [{
      userName: 'zs',
      name: 'zhangsan',
      project: ['a', 'b'],
      favoriteFood:'nodes'
    },
    {
      userName: 'ls',
      name: 'lisi',
      project: ['c', 'd'],
      favoriteFood:'mifan'
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