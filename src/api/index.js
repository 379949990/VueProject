import request from './../utils/request'

// 请求轮播图数据
export function getHomeBannerlistData () {
  return request.get('/banner')
}

// 请求商品列表数据
export function getHomeProlistData (params) {
  return request.get('/pro', { params })
}

// 请求商品详情数据
export function getProDetailData (params) {
  return request.get('/pro/detail', { params })
}

// 验证手机号
export function docheckphone (params) {
  return request.post('/user/docheckphone', params)
}

// 发送验证码
export function dosendmsgcode (params) {
  return request.post('/user/dosendmsgcode', params)
}

// 验证验证码
export function docheckcode (params) {
  return request.post('/user/docheckcode', params)
}

// 注册
export function dosetpassword (params) {
  return request.post('/user/dosetpassword', params)
}

// 登录验证码
export function dosendloginCode (params) {
  return request.post('/user/dosendloginCode', params)
}

// 短信验证码登录
export function dosmslogin (params) {
  return request.post('/user/dosmslogin', params)
}

// 用户名登录
export function domlogin (params) {
  return request.post('/user/domlogin', params)
}
