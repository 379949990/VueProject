import axios from 'axios'
import Router from './../router'

const isDev = process.env.NODE_ENV === 'development'

const request = axios.create({
  baseURL: isDev ? '/api' : 'http://sh2007.wudaxun.top/api'
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  config.headers.common.token = localStorage.getItem('token')
  return config
}, function (error) {
  return Promise.reject(error)
})
// 添加响应拦截器
request.interceptors.response.use(function (response) {
  console.log(response.data)
  if (response.data.code === '10119') {
    Router.push('/login')
    return
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

export default request
