import request from './../utils/request'
export function getHomeBannerlistData () {
  return request.get('/banner')
}
