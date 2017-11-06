import axios from 'axios'
import qs from 'qs'
import Cache from 'utils/Cache'
import {Toast} from 'antd-mobile'
import Dialog from 'components/Dialog/Dialog'
const port = '.dev'
const IP = 'https://apib2c' + port + '.yifishes.com/android/buyer/cn/v1'
// const IP = 'http://192.168.4.207:8081/b2c/android/buyer/cn/v1'
const IP_USER = 'https://api' + port + '.lanhaitianwang.com/v1'
const IP_PAY = 'https://apipay' + port + '.lanhaitianwang.com/v1'
axios.defaults.baseURL = IP
const toastDuratoin = 1
// const loadingDuratoin = 0.5

/** 与商场服务端交互拦截器配置 start **/
// 设置默认请求拦截器
axios.interceptors.request.use(function (config) {
  // 在请求发出之前进行一些操作
  // Toast.loading('', loadingDuratoin)
  if(Cache.get('user')) {
    config.data.token = Cache.get('user').access_token
  }
  config.data = qs.stringify(config.data)
  // config.headers['Content-Type'] = 'multipart/form-data'
  return config
}, function (err) {
  console.log('请求拦截器出错', err)
  // Toast.hide()
  Toast.fail(err, toastDuratoin)
  return Promise.reject(err)
})

// 设置默认响应拦截器
axios.interceptors.response.use(function (response) {
  // 服务端响应后
  // Toast.hide()
  if (response.status === 200) {
    if (response.data.code === 1) {
      if(response.data.json) {
        return Promise.resolve(response.data.json)
      }
      return Promise.resolve(response.data)
    }
    else if (response.data.code === 300) {
      // Toast.fail(response.data.msg, toastDuratoin)
      // Cache.remove('user')
      !Dialog.isShowing() && Dialog.showAlert()
      return Promise.reject(response.data.msg)
    }
    else if (response.data.code === 11) {
      // 跳转到首页
    }
    else {
      Toast.fail(response.data.msg, toastDuratoin)
      return Promise.reject(response.data.msg)
    }
  }
  else {
    Toast.fail(response, toastDuratoin)
    return Promise.reject(response)
  }
}, function (error) {
  // 服务端无响应
  Toast.fail('不能连接到网络', toastDuratoin)
  return Promise.reject(error)
})
/** 与商场服务端交互拦截器配置 end **/

/** 图片上传拦截器配置 start **/
const caxios = axios.create({
  baseURL: IP_USER
})
// 设置默认请求拦截器
caxios.interceptors.request.use(function (config) {
  // 在请求发出之前进行一些操作
  /* eslint-disable */
  if(Cache.get('user')) {
    config.data.access_token = Cache.get('user').access_token
  }
  config.data.app_key = '94a0748e67'
  /* eslint-disable */
  config.data.device = 0
  config.data = qs.stringify(config.data)
  return config
}, function (err) {
  console.log('请求拦截器出错', err)
  return Promise.reject(err)
})
// 设置默认响应拦截器
caxios.interceptors.response.use(function (response) {
  // 服务端响应后
  if (response.status === 200) {
    if (response.data.code === 200) {
      return Promise.resolve(response.data)
    }
    else {
      Toast.fail(response.data.msg, toastDuratoin)
      return Promise.reject(response.data)
    }
  }
  else {
    return Promise.reject(response)
  }
}, function (error) {
  // 服务端无响应
  return Promise.reject(error)
})
/** 与用户中心服务端交互拦截器配置 end **/

/** 支付中心 start **/
const payaxios = axios.create({
  baseURL: IP_PAY
})
// 设置默认请求拦截器
payaxios.interceptors.request.use(function (config) {
  // 在请求发出之前进行一些操作
  /* eslint-disable */
  if(Cache.get('user')) {
    config.data.access_token = Cache.get('user').access_token  }
    config.data.app_key = '94a0748e67'
    config.data.device = 0
    config.data = qs.stringify(config.data)
  return config
}, function (err) {
  console.log('请求拦截器出错', err)
  return Promise.reject(err)
})
// 设置默认响应拦截器
payaxios.interceptors.response.use(function (response) {
  // 服务端响应后
  if (response.status === 200) {
    if (response.data.code === 200) {
      return Promise.resolve(response.data)
    }
    else {
      Toast.fail(response.data.msg, toastDuratoin)
      return Promise.reject(response.data)
    }
  }
  else {
    return Promise.reject(response)
  }
}, function (error) {
  // 服务端无响应
  return Promise.reject(error)
})
/** 支付中心 end **/

/** 与用户中心服务端交互拦截器配置 start **/
const img = axios.create({
  baseURL: IP
})
// 设置默认请求拦截器
img.interceptors.request.use(function (config) {
  // 在请求发出之前进行一些操作
  /* eslint-disable */
  config.headers['Content-Type'] = 'multipart/form-data'
  return config
}, function (err) {
  console.log('请求拦截器出错', err)
  return Promise.reject(err)
})
// 设置默认响应拦截器
img.interceptors.response.use(function (response) {
  // 服务端响应后
  if (response.status === 200) {
    if (response.data.code === 1) {
      return Promise.resolve(response.data.json)
    }
    else {
      Toast.fail(response.data.msg, toastDuratoin)
      return Promise.reject(response.data.msg)
    }
  }
  else {
    return Promise.reject(response)
  }
}, function (error) {
  // 服务端无响应
  return Promise.reject(error)
})
/** 图片上传拦截器配置 end **/

const http = {
  payCenter: payaxios,
  dataCenter: axios,
  userCenter: caxios,
  img: img
}

export default http
