"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHomeBannerlistData = getHomeBannerlistData;
exports.getHomeProlistData = getHomeProlistData;
exports.getProDetailData = getProDetailData;
exports.docheckphone = docheckphone;
exports.dosendmsgcode = dosendmsgcode;
exports.docheckcode = docheckcode;
exports.dosetpassword = dosetpassword;
exports.dosendloginCode = dosendloginCode;
exports.dosmslogin = dosmslogin;
exports.domlogin = domlogin;

var _request = _interopRequireDefault(require("./../utils/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 请求轮播图数据
function getHomeBannerlistData() {
  return _request["default"].get('/banner');
} // 请求商品列表数据


function getHomeProlistData(params) {
  return _request["default"].get('/pro', {
    params: params
  });
} // 请求商品详情数据


function getProDetailData(params) {
  return _request["default"].get('/pro/detail', {
    params: params
  });
} // 验证手机号


function docheckphone(params) {
  return _request["default"].post('/user/docheckphone', params);
} // 发送验证码


function dosendmsgcode(params) {
  return _request["default"].post('/user/dosendmsgcode', params);
} // 验证验证码


function docheckcode(params) {
  return _request["default"].post('/user/docheckcode', params);
} // 注册


function dosetpassword(params) {
  return _request["default"].post('/user/dosetpassword', params);
} // 登录验证码


function dosendloginCode(params) {
  return _request["default"].post('/user/dosendloginCode', params);
} // 短信验证码登录


function dosmslogin(params) {
  return _request["default"].post('/user/dosmslogin', params);
} // 用户名登录


function domlogin(params) {
  return _request["default"].post('/user/domlogin', params);
}