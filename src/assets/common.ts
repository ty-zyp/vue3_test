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