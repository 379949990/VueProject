import request from './../utils/request'
export function getHomeBannerListData () {
  return request.get('/banner')
}
