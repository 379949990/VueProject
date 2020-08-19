import request from './../utils/request'

// 请求轮播图数据
export function getHomeBannerlistData () {
  return request.get('/banner')
}

// 请求商品列表数据
export function getHomeProlistData (params) {
  return request.get('/pro', { params })
}
