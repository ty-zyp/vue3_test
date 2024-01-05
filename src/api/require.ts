import axios from 'axios'
import qs from 'qs'
import abort from './abort'
// import { SignOut2, SignOut3 } from '@/composables/toolApi'


// 设置超时
axios.defaults.timeout = 3 * 60 * 1000
// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = false
// 允许跨域
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.post['Access-Control-Allow-Origin-Type'] = '*'

// 请求拦截器
axios.interceptors.request.use((config) => {
  if (config.url !== '/api/agreement/details')
    config.signal = abort.add({ url: config.url, method: config.method })

  abort.judge({ url: config.url, method: config.method })
  // 数据格式化
  // if (config.method === 'post' || config.method === 'put' || config.method === 'delete')
  //   config.data = qs.parse(config.data)

  // 添加身份验证
  // if (config.url.includes('/user/login')) {
  //   SignOut3()
  // }
  // else if (config.headers.Authorization === undefined) {
  //   const Obj = localStorage.getItem('userToken')
  //   if (Obj) {
  //     const Usetoken = JSON.parse(Obj)
  //     config.headers.Authorization = Usetoken.accessToken
  //     config.headers['Refresh-Token'] = Usetoken.refreshToken
  //   }
  // }
  return config
}, (error) => {
  return Promise.reject(error.data.error.message)
})

// 响应拦截器
axios.interceptors.response.use((config) => {
  abort.remove({ url: config.config.url, method: config.config.method })
  // 添加身份验证
  if (config.headers.authorization && config.headers.authorization !== 'null') {
    const Obj = localStorage.getItem('userToken')
    if (Obj) {
      const Usetoken = JSON.parse(Obj)
      Usetoken.accessToken = config.headers.authorization
      Usetoken.refreshToken = config.headers['refresh-token']
      localStorage.setItem('userToken', JSON.stringify(Usetoken))
    }
  }
  if (config.status === 200 || config.status === 204)
    return Promise.resolve(config)

  else
    return Promise.reject(config)
}, (error) => {
  if (axios.isCancel(error))
    return Promise.reject(false)

  if (error.code === 'ECONNABORTED') { // 请求超时
    ElMessage({
      showClose: true,
      grouping: true,
      duration: 0,
      message: `${error.message}!`,
      type: 'error',
    })
  }
  else if (error.response.status) {
    switch (error.response.status) {
      case 400:
        const resData = error.response.data
        if (resData.type === 'application/json') {
          const resData = error.response.data
          const fileReader = new FileReader()
          fileReader.onloadend = () => {
            const jsonData = JSON.parse(fileReader.result)
            if (jsonData.crpHttpStatus == 200) {
              ElMessage({
                showClose: true,
                grouping: true,
                duration: 0,
                message: `${jsonData.returnDesc}!`,
                type: 'error',
              })
            }
            else {
              ElMessage({
                showClose: true,
                grouping: true,
                duration: 0,
                message: `${jsonData}`,
                type: 'error',
              })
            }
          }
          fileReader.readAsText(resData)
        }
        else if (error.response.data.crpHttpStatus == 200) {
          ElMessage({
            showClose: true,
            grouping: true,
            duration: 0,
            message: `${error.response.data.returnDesc}!`,
            type: 'error',
          })
        }
        else {
          if (error.response.data !== 'JWT String argument cannot be null or empty.') {
            ElMessage({
              showClose: true,
              grouping: true,
              // duration:0,
              message: `${error.response.data}`,
              type: 'error',
            })
          }
        }
        break
      case 401: // 未登录 重定向，跳转登录页面
        if (error.response.data.crpHttpStatus == 200) {
          ElMessage({
            showClose: true,
            grouping: true,
            // duration:0,
            message: `${error.response.data.returnDesc}!`,
            type: 'error',
          })
        }
        else {
          ElMessage({
            showClose: true,
            grouping: true,
            // duration:0,
            message: `${error.response.data}`,
            type: 'error',
          })
        }
        break
      case 403:
        const user = reactive(JSON.parse(localStorage.getItem('userInformation')))

        if (error.response.data.crpHttpStatus == 200) { // 没权限
          ElMessage({
            showClose: true,
            grouping: true,
            duration: 0,
            message: `${error.response.request.responseURL}：${error.response.data.returnDesc}`,
            type: 'error',
          })
        }
        else { // token过期，清除本地token和清空vuex中token对象，跳转登录页面
          ElMessage({
            showClose: true,
            grouping: true,
            // duration:0,
            message: `${error.response.status}：The user is authorized, but access is prohibited!`,
            type: 'error',
          })
        }
        break
      case 404: // 资源不存在
        ElMessage({
          showClose: true,
          duration: 0,
          grouping: true,
          message: `${error.response.status}：The network request does not exist!`,
          type: 'error',
        })
        break
      case 406:
        ElMessage({
          showClose: true,
          duration: 0,
          grouping: true,
          message: `${error.response.status}：The format of the request is not available!`,
          type: 'error',
        })
        break
      case 410:
        if (error.response.data.crpHttpStatus == 200) {
          ElMessage({
            showClose: true,
            duration: 0,
            grouping: true,
            message: `${error.response.status}：The requested resource is permanently deleted and will not be available again!`,
            type: 'error',
          })
        }
        else {
          ElMessage({
            showClose: true,
            duration: 0,
            grouping: true,
            message: `${error.response.data}`,
            type: 'error',
          })
        }
        break
      case 422:
        ElMessage({
          showClose: true,
          duration: 0,
          grouping: true,
          message: `${error.response.status}：A validation error occurred while creating an object!`,
          type: 'error',
        })
        break
      case 500:
        if (error.response.data.type && error.response.data.type == 'application/json') {
          const reader = new FileReader()
          reader.onload = function (event) {
            let message
            try{
              message = JSON.parse(reader.result).returnDesc
            }catch(err){
              message = reader.result // 错误信息
            }
            ElMessage({
              showClose: true,
              duration: 0,
              grouping: true,
              message: `${message}!`,
              type: 'error',
            })
          }
          reader.readAsText(error.response.data)
        }
        else if (error.response.data.crpHttpStatus == 200) {
          ElMessage({
            showClose: true,
            duration: 0,
            grouping: true,
            message: `${error.response.data.returnDesc}`,
            type: 'error',
          })
        }
        else if (error.response.data.status == 500) {
          ElMessage({
            showClose: true,
            duration: 0,
            grouping: true,
            message: `${error.response.data.error}`,
            type: 'error',
          })
        }
        else if (error.response.data) {
          ElMessage({
            showClose: true,
            duration: 0,
            grouping: true,
            message: `${error.response.status}：${error.response.data}`,
            type: 'error',
          })
        }
        else {
          ElMessage({
            showClose: true,
            duration: 0,
            grouping: true,
            message: `${error.response.status}：Server exception, please contact the service administrator!`,
            type: 'error',
          })
        }
        break
      case 502:
        ElMessage({
          showClose: true,
          duration: 0,
          grouping: true,
          message: `${error.response.status}：Gateway error!`,
          type: 'error',
        })
        break
      case 503:
        ElMessage({
          showClose: true,
          duration: 0,
          grouping: true,
          message: `${error.response.status}：The service is unavailable and the server is temporarily overloaded or maintained!`,
          type: 'error',
        })
        break
      case 504:
        ElMessage({
          showClose: true,
          duration: 0,
          grouping: true,
          message: `${error.response.status}：The gateway timed out!`,
          type: 'error',
        })
        break
      default:
        ElMessage({
          showClose: true,
          duration: 0,
          grouping: true,
          message: `${error.response.status}：Other errors!`,
          type: 'error',
        })
    }
  }
  else {
    ElMessage({
      grouping: true,
      duration: 0,
      message: 'The message is abnormal, please log in again!',
      type: 'error',
    })
  }
  return Promise.reject(error)
})
// 封装的require请求
export const require = (option) => {
  return new Promise((fulfill, reject) => {
    axios(option).then((res) => {
      fulfill(res)
    }).catch((rej) => {
      if (rej.response)
        reject(rej.response)

      else if (rej.require)
        reject(rej.require)

      else
        reject(rej.message)
    })
  })
}

export default require
