import request from './../utils/request'

export function orderAdd (params) {
  return request.post('/order/add', params)
}
// 获取确认订单的数据列表
export function confirmOrderInfo (params) {
  return request.post('/order/confirmOrderInfo', params)
}
