interface TKey {
  url: string
  method: string
}
class PendingStack {
  private pendingMap: Map<string, AbortController[]>
  constructor() {
    this.pendingMap = new Map()
  }

  // 添加接口的 使用map存储key为url+method value:使用数组存储
  public add({ url, method }: TKey): AbortSignal {
    const key = `${url}-${method}`
    const controller = new AbortController()
    const controllerList: AbortController[] = []
    if (this.pendingMap.has(key)) {
      this.pendingMap.get(key)?.push(controller)
    }
    else {
      controllerList.push(controller)
      this.pendingMap.set(key, controllerList)
    }
    return controller.signal
  }

  // 判断接口是否需要取消，每次有重复接口将前一条退出取消
  public judge({ url, method }: TKey) {
    const key = `${url}-${method}`
    const controllerList = this.pendingMap.get(key)
    if (Array.isArray(controllerList) && controllerList.length > 1)
      controllerList?.shift()?.abort()
  }

  // 移除接口
  public remove({ url, method }: TKey) {
    this.pendingMap.delete(`${url}-${method}`)
  }

  // 取消所有接口
  public removeAll() {
    this.pendingMap.forEach((controllerList) => {
      controllerList.shift()?.abort()
    })
    this.pendingMap.clear()
  }
}

export default new PendingStack()
