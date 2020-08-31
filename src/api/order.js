import request from './../utils/request'

export function orderAdd (params) {
  return request.post('/order/add', params)
}
// 获取确认订单的数据列表
export function confirmOrderInfo (params) {
  return request.post('/order/confirmOrderInfo', params)
}

// 添加地址
export function addressAdd (params) {
  return request.post('/address/add', params)
}

// 更新订单地址
export function updateOrderAddress (params) {
  return request.post('/order/updateAddress', params)
}

// 获取默认地址
export function getDefaultAddress (params) {
  return request.post('/address/defaultAddress', params)
}
// 获取地址列表
export function getAddresslist (params) {
  return request.post('/address/addresslist', params)
}
